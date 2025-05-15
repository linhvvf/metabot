import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { message, conversation } = await req.json()

    // Tạo prompt cho việc phân tích cảm xúc
    const prompt = createPrompt(message, conversation)

    // Gọi API AI để phân tích cảm xúc
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
      maxTokens: 500,
    })

    // Phân tích kết quả để trích xuất thông tin cảm xúc
    const analysis = parseAnalysisResult(text)

    return Response.json(analysis)
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    return Response.json({ error: "Không thể phân tích cảm xúc. Vui lòng thử lại sau." }, { status: 500 })
  }
}

function createPrompt(message: string, conversation: any[] = []) {
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
  return `Bạn là trợ lý AI chuyên phân tích cảm xúc trong tin nhắn khách hàng. 
Hãy phân tích cảm xúc của khách hàng trong tin nhắn sau đây.

${conversationContext}

Tin nhắn cần phân tích: "${message}"

Hãy phân tích và trả về kết quả theo định dạng JSON chính xác như sau:
{
  "sentiment": "positive/negative/neutral/mixed",
  "score": số điểm từ -1 đến 1 thể hiện mức độ tích cực/tiêu cực,
  "emotions": ["cảm xúc1", "cảm xúc2", ...],
  "dominantEmotion": "cảm xúc chính",
  "intensity": "high/medium/low",
  "urgency": "high/medium/low",
  "keywords": ["từ khóa cảm xúc 1", "từ khóa cảm xúc 2",...],
  "summary": "tóm tắt ngắn về cảm xúc của khách hàng",
  "responseStrategies": ["chiến lược phản hồi 1", "chiến lược phản hồi 2", "chiến lược phản hồi 3"]
}

Chỉ trả về đúng định dạng JSON như trên, không thêm bất kỳ giải thích hoặc đoạn văn bản nào khác.`
}

function parseAnalysisResult(text: string) {
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
    console.error("Error parsing analysis result:", error)
    // Trả về kết quả phân tích mặc định nếu không thể phân tích
    return {
      sentiment: "neutral",
      score: 0,
      emotions: ["không xác định"],
      dominantEmotion: "không xác định",
      intensity: "medium",
      urgency: "medium",
      keywords: [],
      summary: "Không thể phân tích cảm xúc từ tin nhắn này.",
      responseStrategies: ["Phản hồi một cách chuyên nghiệp và thân thiện."],
    }
  }
}
