import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { conversations } = await req.json()

    // Tạo prompt cho việc phân tích tổng quan cảm xúc
    const prompt = createOverviewPrompt(conversations)

    // Gọi API AI để phân tích tổng quan cảm xúc
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
      maxTokens: 1000,
    })

    // Phân tích kết quả để trích xuất thông tin cảm xúc
    const analysis = parseOverviewResult(text)

    return Response.json(analysis)
  } catch (error) {
    console.error("Error analyzing sentiment overview:", error)
    return Response.json({ error: "Không thể tạo báo cáo tổng quan cảm xúc. Vui lòng thử lại sau." }, { status: 500 })
  }
}

function createOverviewPrompt(conversations: any[]) {
  // Chuẩn bị dữ liệu hội thoại để phân tích
  let conversationsData = ""

  conversations.forEach((conv, index) => {
    conversationsData += `Hội thoại ${index + 1}:\n`

    // Thêm thông tin khách hàng nếu có
    if (conv.customer) {
      conversationsData += `Khách hàng: ${conv.customer.name || "Không rõ"}\n`
    }

    // Thêm nội dung tin nhắn
    if (conv.messages && conv.messages.length > 0) {
      conv.messages.forEach((msg) => {
        const role = msg.sender === "user" ? "Khách hàng" : "Nhân viên"
        conversationsData += `${role}: ${msg.content}\n`
      })
    }

    conversationsData += "\n---\n\n"
  })

  // Tạo prompt hoàn chỉnh
  return `Bạn là trợ lý AI chuyên phân tích cảm xúc trong hội thoại khách hàng.
Hãy phân tích tổng quan cảm xúc trong tất cả các hội thoại sau đây.

${conversationsData}

Hãy phân tích và trả về kết quả theo định dạng JSON chính xác như sau:
{
  "overview": {
    "positiveSentiment": tỷ lệ phần trăm tin nhắn tích cực,
    "neutralSentiment": tỷ lệ phần trăm tin nhắn trung tính,
    "negativeSentiment": tỷ lệ phần trăm tin nhắn tiêu cực,
    "mixedSentiment": tỷ lệ phần trăm tin nhắn hỗn hợp,
    "avgSentimentScore": điểm cảm xúc trung bình từ -1 đến 1
  },
  "commonEmotions": ["cảm xúc phổ biến 1", "cảm xúc phổ biến 2", ...],
  "topIssues": ["vấn đề chính 1", "vấn đề chính 2", ...],
  "summary": "tóm tắt ngắn về xu hướng cảm xúc của khách hàng",
  "actionableInsights": ["insight 1", "insight 2", ...],
  "recommendedActions": ["hành động đề xuất 1", "hành động đề xuất 2", ...]
}

Chỉ trả về đúng định dạng JSON như trên, không thêm bất kỳ giải thích hoặc đoạn văn bản nào khác.`
}

function parseOverviewResult(text: string) {
  try {
    // Tìm và trích xuất phần JSON từ phản hồi
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const jsonString = jsonMatch[0]
      const analysis = JSON.parse(jsonString)
      return analysis
    }

    // Nếu không tìm thấy JSON, thử parse toàn bộ văn bản
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing overview result:", error)
    // Trả về kết quả phân tích mặc định nếu không thể phân tích
    return {
      overview: {
        positiveSentiment: 0,
        neutralSentiment: 0,
        negativeSentiment: 0,
        mixedSentiment: 0,
        avgSentimentScore: 0,
      },
      commonEmotions: [],
      topIssues: [],
      summary: "Không thể phân tích tổng quan cảm xúc từ dữ liệu được cung cấp.",
      actionableInsights: [],
      recommendedActions: [],
    }
  }
}
