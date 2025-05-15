import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { message, conversationContext = [] } = await req.json()

    // Tạo prompt để phân tích ngôn ngữ địa phương
    const prompt = createAnalysisPrompt(message, conversationContext)

    // Gọi API AI để phân tích
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.2,
      maxTokens: 1000,
    })

    // Phân tích kết quả để trích xuất dữ liệu
    const analysis = parseAnalysisResult(text)

    return Response.json(analysis)
  } catch (error) {
    console.error("Error analyzing Vietnamese dialect:", error)
    return Response.json({ error: "Không thể phân tích ngôn ngữ địa phương. Vui lòng thử lại sau." }, { status: 500 })
  }
}

function createAnalysisPrompt(message: string, conversationContext: any[] = []) {
  // Tạo context từ lịch sử hội thoại
  let context = ""
  if (conversationContext.length > 0) {
    context = "Lịch sử hội thoại gần đây:\n"
    // Lấy tối đa 5 tin nhắn gần nhất để có ngữ cảnh
    const recentMessages = conversationContext.slice(-5)

    recentMessages.forEach((msg) => {
      const role = msg.sender === "user" ? "Khách hàng" : "Nhân viên"
      context += `${role}: ${msg.content}\n`
    })
  }

  return `Bạn là chuyên gia phân tích ngôn ngữ Việt Nam với hiểu biết sâu sắc về các phương ngữ vùng miền, biệt ngữ và tiếng lóng trong tiếng Việt hiện đại.

${context}

Hãy phân tích tin nhắn sau của khách hàng: "${message}"

Phân tích và xác định:
1. Phương ngữ vùng miền (nếu có): xác định xem tin nhắn có sử dụng từ ngữ, cách diễn đạt đặc trưng của miền Bắc, miền Trung, miền Nam hay các vùng miền cụ thể khác.
2. Biệt ngữ/tiếng lóng: xác định các từ lóng, biệt ngữ, các từ thông tục hoặc hiện đại được sử dụng.
3. Cách diễn đạt đặc biệt: cách sử dụng từ ngữ, cấu trúc câu đặc trưng.
4. Các từ viết tắt: giải thích các từ viết tắt đặc trưng trong tin nhắn.
5. Ngữ cảnh văn hóa: hiểu biết văn hóa cần thiết để hiểu đúng tin nhắn.
6. Mức độ trang trọng: đánh giá mức độ trang trọng/thân mật trong cách giao tiếp.
7. Gợi ý phản hồi phù hợp: cách phản hồi phù hợp với phong cách ngôn ngữ của khách hàng.

Trả về kết quả theo định dạng JSON chính xác như sau:
{
  "dialectAnalysis": {
    "regionalDialect": {
      "region": "tên vùng miền nếu xác định được hoặc null",
      "confidence": số từ 0 đến 1,
      "dialectFeatures": ["đặc điểm 1", "đặc điểm 2"...],
      "regionalWords": [{"word": "từ vùng miền", "meaning": "giải thích", "standardVietnamese": "từ chuẩn tương đương"}]
    },
    "slang": {
      "detected": true/false,
      "slangWords": [{"word": "từ lóng", "meaning": "ý nghĩa", "context": "ngữ cảnh sử dụng"}],
      "modernExpressions": [{"expression": "cách diễn đạt", "meaning": "ý nghĩa", "origin": "nguồn gốc nếu biết"}]
    },
    "abbreviations": [{"abbr": "từ viết tắt", "fullForm": "dạng đầy đủ", "meaning": "ý nghĩa"}],
    "culturalContext": {
      "references": ["tham chiếu văn hóa 1", "tham chiếu văn hóa 2"...],
      "requiredKnowledge": ["kiến thức cần thiết 1", "kiến thức cần thiết 2"...]
    },
    "formalityLevel": {
      "level": "formal/semi-formal/informal/very-informal",
      "indicators": ["dấu hiệu 1", "dấu hiệu 2"...]
    },
    "expressionStyle": {
      "notable": ["đặc điểm đáng chú ý 1", "đặc điểm đáng chú ý 2"...],
      "specialStructures": ["cấu trúc đặc biệt 1", "cấu trúc đặc biệt 2"...]
    },
    "responseRecommendations": {
      "style": "phong cách phản hồi đề xuất",
      "suggestions": ["gợi ý 1", "gợi ý 2"...],
      "dialectMatchingTips": ["mẹo 1", "mẹo 2"...]
    }
  }
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
    console.error("Error parsing dialect analysis result:", error)
    // Trả về kết quả phân tích mặc định nếu không thể phân tích
    return {
      dialectAnalysis: {
        regionalDialect: {
          region: null,
          confidence: 0,
          dialectFeatures: [],
          regionalWords: [],
        },
        slang: {
          detected: false,
          slangWords: [],
          modernExpressions: [],
        },
        abbreviations: [],
        culturalContext: {
          references: [],
          requiredKnowledge: [],
        },
        formalityLevel: {
          level: "neutral",
          indicators: [],
        },
        expressionStyle: {
          notable: [],
          specialStructures: [],
        },
        responseRecommendations: {
          style: "neutral",
          suggestions: ["Phản hồi một cách lịch sự và rõ ràng"],
          dialectMatchingTips: [],
        },
      },
    }
  }
}
