import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { goal, audience, tone, additionalInfo, channel } = await req.json()

    // Tạo prompt cho AI
    const prompt = createPrompt(goal, audience, tone, additionalInfo, channel)

    // Gọi API AI để tạo gợi ý tin nhắn
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 800,
    })

    // Phân tích kết quả để tách thành các phiên bản tin nhắn
    const messages = parseMessages(text)

    return Response.json({ messages })
  } catch (error) {
    console.error("Error generating campaign message:", error)
    return Response.json({ error: "Không thể tạo tin nhắn chiến dịch. Vui lòng thử lại sau." }, { status: 500 })
  }
}

function createPrompt(goal: string, audience: string, tone: string, additionalInfo: string, channel: string) {
  // Xác định yêu cầu đặc biệt dựa trên kênh
  let channelSpecific = ""
  if (channel === "zalo") {
    channelSpecific = "Tin nhắn phải ngắn gọn, thân thiện và phù hợp với đặc điểm của Zalo."
  } else if (channel === "facebook") {
    channelSpecific = "Tin nhắn phải tương tác tốt trên Facebook Messenger, có thể sử dụng emoji phù hợp."
  } else if (channel === "multi") {
    channelSpecific = "Tin nhắn phải đủ linh hoạt để hoạt động tốt trên nhiều nền tảng khác nhau."
  }

  // Tạo prompt hoàn chỉnh
  return `Bạn là trợ lý AI của Metabot.vn, một nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh.
Nhiệm vụ của bạn là tạo 3 mẫu tin nhắn khác nhau cho một chiến dịch marketing.

Thông tin chiến dịch:
- Mục tiêu chiến dịch: ${goal}
- Đối tượng khách hàng: ${audience}
- Giọng điệu: ${tone}
- Kênh gửi tin nhắn: ${channel}
- Thông tin bổ sung: ${additionalInfo || "Không có"}

${channelSpecific}

Yêu cầu:
1. Tạo 3 mẫu tin nhắn khác nhau phù hợp với mục tiêu và đối tượng của chiến dịch
2. Mỗi tin nhắn nên có dưới 500 ký tự
3. Tin nhắn nên kết thúc bằng lời kêu gọi hành động (CTA) rõ ràng
4. Sử dụng biến {{name}} để đại diện cho tên khách hàng
5. Các mẫu tin nhắn cần có độ dài và phong cách khác nhau:
   - Mẫu 1: Ngắn gọn, trực tiếp
   - Mẫu 2: Chi tiết, mang tính thông tin
   - Mẫu 3: Sáng tạo, thu hút sự chú ý

Trả về kết quả theo định dạng:
"Mẫu 1: [nội dung tin nhắn 1]

Mẫu 2: [nội dung tin nhắn 2]

Mẫu 3: [nội dung tin nhắn 3]"

Không thêm bất kỳ giải thích nào khác.`
}

function parseMessages(text: string) {
  // Tách văn bản thành các mẫu tin nhắn riêng biệt
  const messages: string[] = []

  // Tìm các mẫu bằng regex
  const regex = /Mẫu \d+:(.*?)(?=Mẫu \d+:|$)/gs
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      messages.push(match[1].trim())
    }
  }

  // Nếu không tìm thấy mẫu theo format, trả về toàn bộ văn bản thành một mẫu
  if (messages.length === 0) {
    return [text.trim()]
  }

  return messages
}
