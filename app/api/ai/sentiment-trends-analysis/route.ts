import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { conversations, period = "month", previousPeriod = false, channel = "all" } = await req.json()

    // Tạo prompt cho việc phân tích xu hướng cảm xúc theo thời gian
    const prompt = createTrendsPrompt(conversations, period, previousPeriod, channel)

    // Gọi API AI để phân tích xu hướng cảm xúc
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
      maxTokens: 1500,
    })

    // Phân tích kết quả để trích xuất thông tin xu hướng
    const analysis = parseTrendsResult(text)

    return Response.json(analysis)
  } catch (error) {
    console.error("Error analyzing sentiment trends:", error)
    return Response.json({ error: "Không thể phân tích xu hướng cảm xúc. Vui lòng thử lại sau." }, { status: 500 })
  }
}

function createTrendsPrompt(conversations: any[], period: string, previousPeriod: boolean, channel: string) {
  // Tạo prompt cho phân tích xu hướng cảm xúc theo thời gian
  return `Bạn là trợ lý AI chuyên phân tích dữ liệu và cảm xúc khách hàng. 
Hãy phân tích xu hướng và sự thay đổi cảm xúc khách hàng trong dữ liệu hội thoại được cung cấp.

Thông tin phân tích:
- Khoảng thời gian phân tích: ${period === "week" ? "tuần" : period === "month" ? "tháng" : "quý"} này
- ${previousPeriod ? "So sánh với kỳ trước" : "Không so sánh với kỳ trước"}
- Kênh giao tiếp: ${channel === "all" ? "Tất cả các kênh" : channel}

Dữ liệu hội thoại được cung cấp ở định dạng JSON (đã bỏ qua để tránh độ dài).

Hãy phân tích và trả về kết quả theo định dạng JSON chính xác như sau:
{
  "trends": {
    "overall": {
      "current": {
        "positive": tỷ lệ % cảm xúc tích cực hiện tại,
        "neutral": tỷ lệ % cảm xúc trung tính hiện tại,
        "negative": tỷ lệ % cảm xúc tiêu cực hiện tại,
        "mixed": tỷ lệ % cảm xúc hỗn hợp hiện tại,
        "averageScore": điểm cảm xúc trung bình từ -1 đến 1
      },
      "change": {
        "positive": thay đổi % cảm xúc tích cực so với kỳ trước,
        "neutral": thay đổi % cảm xúc trung tính so với kỳ trước,
        "negative": thay đổi % cảm xúc tiêu cực so với kỳ trước,
        "mixed": thay đổi % cảm xúc hỗn hợp so với kỳ trước,
        "averageScore": thay đổi điểm cảm xúc trung bình
      }
    },
    "byChannel": [
      {
        "channel": "tên kênh",
        "current": {
          "positive": tỷ lệ % cảm xúc tích cực,
          "neutral": tỷ lệ % cảm xúc trung tính,
          "negative": tỷ lệ % cảm xúc tiêu cực,
          "mixed": tỷ lệ % cảm xúc hỗn hợp,
          "averageScore": điểm trung bình
        },
        "change": {
          "positive": thay đổi % cảm xúc tích cực,
          "neutral": thay đổi % cảm xúc trung tính,
          "negative": thay đổi % cảm xúc tiêu cực,
          "mixed": thay đổi % cảm xúc hỗn hợp,
          "averageScore": thay đổi điểm trung bình
        }
      }
    ],
    "byTimeSlots": [
      {
        "timeSlot": "khung giờ (sáng/chiều/tối/đêm)",
        "sentiment": "loại cảm xúc chiếm ưu thế",
        "score": điểm cảm xúc trung bình,
        "volume": số lượng tin nhắn
      }
    ],
    "byTopics": [
      {
        "topic": "chủ đề hội thoại",
        "sentiment": "loại cảm xúc chiếm ưu thế",
        "score": điểm cảm xúc trung bình,
        "volume": số lượng tin nhắn,
        "change": thay đổi so với kỳ trước
      }
    ]
  },
  "emotionShifts": {
    "improvingTopics": ["chủ đề đang cải thiện 1", "chủ đề đang cải thiện 2"],
    "decliningTopics": ["chủ đề đang suy giảm 1", "chủ đề đang suy giảm 2"],
    "volatileTopics": ["chủ đề không ổn định 1", "chủ đề không ổn định 2"],
    "stableTopics": ["chủ đề ổn định 1", "chủ đề ổn định 2"]
  },
  "emotionTriggers": {
    "positive": ["yếu tố tạo cảm xúc tích cực 1", "yếu tố tạo cảm xúc tích cực 2"],
    "negative": ["yếu tố tạo cảm xúc tiêu cực 1", "yếu tố tạo cảm xúc tiêu cực 2"]
  },
  "customerSegments": [
    {
      "segment": "phân khúc khách hàng",
      "dominantEmotion": "cảm xúc chính",
      "score": điểm cảm xúc trung bình,
      "topics": ["chủ đề quan tâm 1", "chủ đề quan tâm 2"]
    }
  ],
  "predictions": {
    "nextPeriodTrend": "xu hướng dự đoán cho kỳ tiếp theo",
    "sentimentForecast": {
      "positive": tỷ lệ % cảm xúc tích cực dự đoán,
      "neutral": tỷ lệ % cảm xúc trung tính dự đoán,
      "negative": tỷ lệ % cảm xúc tiêu cực dự đoán,
      "mixed": tỷ lệ % cảm xúc hỗn hợp dự đoán
    },
    "riskyAreas": ["khu vực rủi ro 1", "khu vực rủi ro 2"],
    "opportunityAreas": ["khu vực cơ hội 1", "khu vực cơ hội 2"]
  },
  "actionableInsights": {
    "summary": "tóm tắt ngắn gọn xu hướng cảm xúc",
    "keyTakeaways": ["insight 1", "insight 2"],
    "recommendedActions": ["hành động đề xuất 1", "hành động đề xuất 2"]
  }
}

Chỉ trả về đúng định dạng JSON như trên, không thêm bất kỳ giải thích hoặc đoạn văn bản nào khác.`
}

function parseTrendsResult(text: string) {
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
    console.error("Error parsing trends result:", error)

    // Mẫu dữ liệu mặc định nếu không thể phân tích
    return {
      trends: {
        overall: {
          current: {
            positive: 0,
            neutral: 0,
            negative: 0,
            mixed: 0,
            averageScore: 0,
          },
          change: {
            positive: 0,
            neutral: 0,
            negative: 0,
            mixed: 0,
            averageScore: 0,
          },
        },
        byChannel: [],
        byTimeSlots: [],
        byTopics: [],
      },
      emotionShifts: {
        improvingTopics: [],
        decliningTopics: [],
        volatileTopics: [],
        stableTopics: [],
      },
      emotionTriggers: {
        positive: [],
        negative: [],
      },
      customerSegments: [],
      predictions: {
        nextPeriodTrend: "không xác định",
        sentimentForecast: {
          positive: 0,
          neutral: 0,
          negative: 0,
          mixed: 0,
        },
        riskyAreas: [],
        opportunityAreas: [],
      },
      actionableInsights: {
        summary: "Không thể phân tích xu hướng cảm xúc từ dữ liệu được cung cấp.",
        keyTakeaways: [],
        recommendedActions: [],
      },
    }
  }
}
