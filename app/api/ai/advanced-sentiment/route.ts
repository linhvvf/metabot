import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { message, conversation, language = "vi", culturalContext = "vietnam" } = await req.json()

    // Tạo prompt nâng cao cho việc phân tích cảm xúc
    const prompt = createAdvancedPrompt(message, conversation, language, culturalContext)

    // Gọi API AI với model tiên tiến hơn để phân tích cảm xúc
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.2,
      maxTokens: 1000,
    })

    // Phân tích kết quả để trích xuất thông tin cảm xúc
    const analysis = parseAdvancedAnalysisResult(text)

    return Response.json(analysis)
  } catch (error) {
    console.error("Error analyzing advanced sentiment:", error)
    return Response.json({ error: "Không thể phân tích cảm xúc nâng cao. Vui lòng thử lại sau." }, { status: 500 })
  }
}

function createAdvancedPrompt(message: string, conversation: any[] = [], language: string, culturalContext: string) {
  // Tạo context từ lịch sử hội thoại
  let conversationContext = ""
  if (conversation && conversation.length > 0) {
    conversationContext = "Lịch sử hội thoại gần đây:\n"
    // Lấy tối đa 8 tin nhắn gần nhất để có ngữ cảnh đầy đủ hơn
    const recentMessages = conversation.slice(-8)

    recentMessages.forEach((msg) => {
      const role = msg.sender === "user" ? "Khách hàng" : "Nhân viên"
      conversationContext += `${role}: ${msg.content}\n`
    })
  }

  // Xác định bối cảnh văn hóa
  let culturalNotes = ""
  if (culturalContext === "vietnam") {
    culturalNotes = `
Lưu ý về ngữ cảnh văn hóa Việt Nam:
- Người Việt Nam thường giao tiếp gián tiếp và tránh xung đột trực tiếp
- "Vâng" hoặc "dạ" thường là biểu hiện của sự tôn trọng, không phải luôn đồng ý
- Cách xưng hô (anh, chị, em, cô, chú...) có thể ảnh hưởng đến ngữ điệu và cảm xúc
- Sử dụng tiếng lóng, từ địa phương, hoặc emoji có thể có ý nghĩa đặc biệt
- Khách hàng Việt Nam có thể không trực tiếp phàn nàn nhưng thể hiện sự không hài lòng qua cách diễn đạt gián tiếp
`
  }

  // Tạo prompt hoàn chỉnh với phân tích ngữ cảnh văn hóa và ngôn ngữ
  return `Bạn là trợ lý AI chuyên phân tích cảm xúc trong tin nhắn khách hàng với hiểu biết sâu sắc về tâm lý và văn hóa, đặc biệt là văn hóa Việt Nam.
Hãy phân tích cảm xúc, ý định và nhu cầu tiềm ẩn của khách hàng trong tin nhắn sau đây.

${culturalNotes}

${conversationContext}

Tin nhắn cần phân tích: "${message}"

Hãy phân tích và trả về kết quả theo định dạng JSON chính xác như sau:
{
  "sentiment": {
    "primary": "positive/negative/neutral/mixed",
    "score": số điểm từ -1 đến 1 thể hiện mức độ tích cực/tiêu cực,
    "emotions": ["cảm xúc1", "cảm xúc2", ...],
    "dominantEmotion": "cảm xúc chính",
    "intensity": "high/medium/low",
    "confidence": giá trị từ 0 đến 1 thể hiện độ tin cậy của phân tích
  },
  "intent": {
    "primary": "inquiry/complaint/praise/suggestion/request/other",
    "secondary": ["ý định phụ 1", "ý định phụ 2"],
    "urgency": "high/medium/low",
    "confidence": giá trị từ 0 đến 1 thể hiện độ tin cậy của phân tích ý định
  },
  "needs": {
    "explicit": ["nhu cầu rõ ràng 1", "nhu cầu rõ ràng 2", ...],
    "implicit": ["nhu cầu tiềm ẩn 1", "nhu cầu tiềm ẩn 2", ...],
    "priority": "high/medium/low"
  },
  "culturalInsights": {
    "contextualFactors": ["yếu tố ngữ cảnh 1", "yếu tố ngữ cảnh 2"],
    "communicationStyle": "direct/indirect/formal/informal/mixed",
    "localExpressions": ["biểu đạt địa phương 1", "biểu đạt địa phương 2"]
  },
  "languageFeatures": {
    "tone": "formal/informal/friendly/aggressive/neutral/other",
    "complexity": "simple/moderate/complex",
    "keyPhrases": ["cụm từ quan trọng 1", "cụm từ quan trọng 2", ...],
    "sentimentKeywords": ["từ khóa cảm xúc 1", "từ khóa cảm xúc 2", ...]
  },
  "customerProfile": {
    "potentialDemographics": ["demographic 1", "demographic 2"],
    "potentialPersonality": ["personality 1", "personality 2"],
    "communicationPreference": "cách thức giao tiếp ưa thích",
    "confidence": giá trị từ 0 đến 1 thể hiện độ tin cậy của phân tích hồ sơ
  },
  "actionableInsights": {
    "summary": "tóm tắt ngắn gọn về tin nhắn",
    "keyTakeaways": ["insight 1", "insight 2", ...],
    "suggestedResponses": ["đề xuất phản hồi 1", "đề xuất phản hồi 2", ...],
    "suggestedActions": ["hành động đề xuất 1", "hành động đề xuất 2", ..."]
  }
}

Chỉ trả về đúng định dạng JSON như trên, không thêm bất kỳ giải thích hoặc đoạn văn bản nào khác.`
}

function parseAdvancedAnalysisResult(text: string) {
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
    console.error("Error parsing advanced analysis result:", error)
    // Trả về kết quả phân tích mặc định nếu không thể phân tích
    return {
      sentiment: {
        primary: "neutral",
        score: 0,
        emotions: ["không xác định"],
        dominantEmotion: "không xác định",
        intensity: "medium",
        confidence: 0.5,
      },
      intent: {
        primary: "inquiry",
        secondary: [],
        urgency: "medium",
        confidence: 0.5,
      },
      needs: {
        explicit: [],
        implicit: [],
        priority: "medium",
      },
      culturalInsights: {
        contextualFactors: [],
        communicationStyle: "mixed",
        localExpressions: [],
      },
      languageFeatures: {
        tone: "neutral",
        complexity: "moderate",
        keyPhrases: [],
        sentimentKeywords: [],
      },
      customerProfile: {
        potentialDemographics: [],
        potentialPersonality: [],
        communicationPreference: "không xác định",
        confidence: 0.5,
      },
      actionableInsights: {
        summary: "Không thể phân tích sâu tin nhắn này.",
        keyTakeaways: [],
        suggestedResponses: ["Phản hồi một cách chuyên nghiệp và thân thiện."],
        suggestedActions: [],
      },
    }
  }
}
