import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { message, conversation, customerInfo } = await req.json()

    // Tạo prompt cho AI
    const prompt = createPrompt(message, conversation, customerInfo)

    // Gọi API AI để tạo gợi ý trả lời
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 500,
    })

    // Phân tích kết quả để tách thành các gợi ý riêng biệt
    const suggestions = parseSuggestions(text)

    return Response.json({ suggestions })
  } catch (error) {
    console.error("Error suggesting reply:", error)
    return Response.json({ error: "Không thể tạo gợi ý trả lời. Vui lòng thử lại sau." }, { status: 500 })
  }
}

function createPrompt(message: string, conversation: any[], customerInfo: any) {
  // Tạo context từ thông tin khách hàng
  let customerContext = ""
  if (customerInfo) {
    customerContext = `
Thông tin khách hàng:
- Tên: ${customerInfo.name || "Không có thông tin"}
- Email: ${customerInfo.email || "Không có thông tin"}
- Số điện thoại: ${customerInfo.phone || "Không có thông tin"}
- Nhãn: ${customerInfo.tags?.join(", ") || "Không có nhãn"}
- Ghi chú: ${customerInfo.notes || "Không có ghi chú"}
`
  }

  // Tạo context từ lịch sử hội thoại
  let conversationContext = ""
  if (conversation && conversation.length > 0) {
    conversationContext = "Lịch sử hội thoại gần đây:\n"
    // Chỉ lấy tối đa 5 tin nhắn gần nhất để tránh prompt quá dài
    const recentMessages = conversation.slice(-5)

    recentMessages.forEach((msg) => {
      const role = msg.sender === "user" ? "Khách hàng" : "Nhân viên"
      conversationContext += `${role}: ${msg.content}\n`
    })
  }

  // Tạo prompt hoàn chỉnh
  return `Bạn là trợ lý AI của Metabot.vn, một nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh.
Nhiệm vụ của bạn là gợi ý 3 câu trả lời khác nhau cho tin nhắn của khách hàng.
Câu trả lời phải ngắn gọn, chuyên nghiệp, thân thiện và phù hợp với ngữ cảnh hội thoại.

${customerContext}

${conversationContext}

Tin nhắn mới nhất của khách hàng: "${message}"

Hãy đưa ra 3 gợi ý trả lời khác nhau, mỗi gợi ý bắt đầu bằng "Gợi ý 1:", "Gợi ý 2:", "Gợi ý 3:".
Mỗi gợi ý nên có độ dài và phong cách khác nhau:
- Gợi ý 1: Trả lời ngắn gọn, trực tiếp
- Gợi ý 2: Trả lời đầy đủ, chi tiết
- Gợi ý 3: Trả lời thân thiện, gần gũi

Chỉ trả về 3 gợi ý, không thêm bất kỳ giải thích nào khác.`
}

function parseSuggestions(text: string) {
  // Tách văn bản thành các gợi ý riêng biệt
  const suggestions: string[] = []

  // Tìm các gợi ý bằng regex
  const regex = /Gợi ý \d+:(.*?)(?=Gợi ý \d+:|$)/gs
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      suggestions.push(match[1].trim())
    }
  }

  // Nếu không tìm thấy gợi ý theo format, trả về toàn bộ văn bản
  if (suggestions.length === 0) {
    return [text.trim()]
  }

  return suggestions
}
