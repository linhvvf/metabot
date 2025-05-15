import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { goal, audience, tone, additionalInfo, channel, variations = 3 } = await req.json()

    // Tạo prompt cho AI
    const prompt = createPrompt(goal, audience, tone, additionalInfo, channel, variations)

    // Gọi API AI để tạo các phiên bản tin nhắn
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.8, // Tăng temperature để tạo nhiều biến thể đa dạng hơn
      maxTokens: 1500,
    })

    // Phân tích kết quả để tách thành các phiên bản tin nhắn
    const messages = parseMessages(text, variations)

    // Tạo ID cho mỗi phiên bản tin nhắn
    const messagesWithIds = messages.map((message, index) => ({
      id: `variant-${index + 1}`,
      content: message,
      name: `Phiên bản ${index + 1}`,
    }))

    return Response.json({ messages: messagesWithIds })
  } catch (error) {
    console.error("Error generating A/B test messages:", error)
    return Response.json({ error: "Không thể tạo tin nhắn cho A/B testing. Vui lòng thử lại sau." }, { status: 500 })
  }
}

function createPrompt(
  goal: string,
  audience: string,
  tone: string,
  additionalInfo: string,
  channel: string,
  variations: number,
) {
  // Xác định yêu cầu đặc biệt dựa trên kênh
  let channelSpecific = ""
  if (channel === "zalo") {
    channelSpecific = "Tin nhắn phải ngắn gọn, thân thiện và phù hợp với đặc điểm của Zalo."
  } else if (channel === "facebook") {
    channelSpecific = "Tin nhắn phải tương tác tốt trên Facebook Messenger, có thể sử dụng emoji phù hợp."
  } else if (channel === "email") {
    channelSpecific = "Tin nhắn phải phù hợp với định dạng email, có thể dài hơn và chi tiết hơn."
  } else if (channel === "sms") {
    channelSpecific = "Tin nhắn phải ngắn gọn, trực tiếp và dưới 160 ký tự."
  } else if (channel === "multi") {
    channelSpecific = "Tin nhắn phải đủ linh hoạt để hoạt động tốt trên nhiều nền tảng khác nhau."
  }

  // Tạo prompt hoàn chỉnh
  return `Bạn là trợ lý AI của Metabot.vn, một nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh.
Nhiệm vụ của bạn là tạo ${variations} phiên bản tin nhắn khác nhau cho một chiến dịch marketing A/B testing.

Thông tin chiến dịch:
- Mục tiêu chiến dịch: ${goal}
- Đối tượng khách hàng: ${audience}
- Giọng điệu: ${tone}
- Kênh gửi tin nhắn: ${channel}
- Thông tin bổ sung: ${additionalInfo || "Không có"}

${channelSpecific}

Yêu cầu:
1. Tạo ${variations} phiên bản tin nhắn khác nhau phù hợp với mục tiêu và đối tượng của chiến dịch
2. Mỗi phiên bản phải có cùng mục tiêu nhưng cách tiếp cận khác nhau
3. Các phiên bản phải đủ khác biệt để có thể kiểm tra hiệu quả của các yếu tố khác nhau:
   - Phiên bản 1: Tập trung vào lợi ích sản phẩm/dịch vụ
   - Phiên bản 2: Tập trung vào tính cấp bách (ví dụ: thời hạn, số lượng có hạn)
   - Phiên bản 3: Tập trung vào câu chuyện hoặc trải nghiệm khách hàng
   ${variations > 3 ? "- Phiên bản 4: Tập trung vào số liệu thống kê hoặc bằng chứng xã hội" : ""}
   ${variations > 4 ? "- Phiên bản 5: Tập trung vào câu hỏi gợi mở để tăng tương tác" : ""}
4. Mỗi tin nhắn nên có dưới 500 ký tự
5. Tin nhắn nên kết thúc bằng lời kêu gọi hành động (CTA) rõ ràng
6. Sử dụng biến {{name}} để đại diện cho tên khách hàng

Trả về kết quả theo định dạng:
"Phiên bản 1: [nội dung tin nhắn 1]

Phiên bản 2: [nội dung tin nhắn 2]

Phiên bản 3: [nội dung tin nhắn 3]"
${variations > 3 ? "\nPhiên bản 4: [nội dung tin nhắn 4]" : ""}
${variations > 4 ? "\nPhiên bản 5: [nội dung tin nhắn 5]" : ""}

Không thêm bất kỳ giải thích nào khác.`
}

function parseMessages(text: string, variations: number) {
  // Tách văn bản thành các phiên bản tin nhắn riêng biệt
  const messages: string[] = []

  // Tìm các phiên bản bằng regex
  const regex = /Phiên bản \d+:(.*?)(?=Phiên bản \d+:|$)/gs
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      messages.push(match[1].trim())
    }
  }

  // Nếu không tìm thấy đủ phiên bản theo format, trả về toàn bộ văn bản thành một phiên bản
  if (messages.length === 0) {
    return [text.trim()]
  }

  // Đảm bảo có đúng số lượng phiên bản yêu cầu
  while (messages.length < variations) {
    // Nếu thiếu phiên bản, sao chép phiên bản đầu tiên và thêm "(Phiên bản thay thế)"
    messages.push(`${messages[0]} (Phiên bản thay thế ${messages.length + 1})`)
  }

  return messages.slice(0, variations)
}
