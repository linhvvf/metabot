import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { customers, criteria } = await req.json()

    // Tạo prompt cho AI
    const prompt = createPrompt(customers, criteria)

    // Gọi API AI để phân tích khách hàng tiềm năng
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.4,
      maxTokens: 1500,
    })

    // Phân tích kết quả để lấy thông tin phân loại
    const analysis = parseAnalysis(text)

    return Response.json({ analysis })
  } catch (error) {
    console.error("Error analyzing leads:", error)
    return Response.json({ error: "Không thể phân tích khách hàng tiềm năng. Vui lòng thử lại sau." }, { status: 500 })
  }
}

function createPrompt(customers: any[], criteria: any) {
  // Tạo danh sách khách hàng dưới dạng văn bản
  const customersList = customers
    .map(
      (customer, index) => `
Khách hàng ${index + 1}:
- ID: ${customer.id}
- Tên: ${customer.name}
- Email: ${customer.email || "Không có"}
- Số điện thoại: ${customer.phone || "Không có"}
- Nguồn: ${customer.source || "Không xác định"}
- Trạng thái: ${customer.status || "Không xác định"}
- Thẻ hiện tại: ${customer.tags?.join(", ") || "Không có"}
- Lần liên hệ cuối: ${customer.lastContact || "Không xác định"}
- Số lần tương tác: ${customer.interactionCount || 0}
- Giá trị đơn hàng trung bình: ${customer.averageOrderValue || 0} VND
- Tổng giá trị đơn hàng: ${customer.totalOrderValue || 0} VND
- Số đơn hàng: ${customer.orderCount || 0}
- Thời gian phản hồi trung bình: ${customer.averageResponseTime || "Không xác định"}
- Tỷ lệ mở email: ${customer.emailOpenRate || "Không xác định"}
- Tỷ lệ click: ${customer.clickRate || "Không xác định"}
- Ghi chú: ${customer.notes || "Không có"}
`,
    )
    .join("\n")

  // Tạo tiêu chí phân loại dưới dạng văn bản
  const criteriaText = `
Tiêu chí phân loại:
- Mức độ tương tác: ${criteria.interactionWeight || 5}/10
- Giá trị đơn hàng: ${criteria.orderValueWeight || 5}/10
- Tần suất mua hàng: ${criteria.purchaseFrequencyWeight || 5}/10
- Thời gian từ lần tương tác cuối: ${criteria.recencyWeight || 5}/10
- Tỷ lệ phản hồi: ${criteria.responseRateWeight || 5}/10
`

  // Tạo prompt hoàn chỉnh
  return `Bạn là trợ lý AI của Metabot.vn, một nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh.
Nhiệm vụ của bạn là phân tích và phân loại khách hàng tiềm năng dựa trên dữ liệu được cung cấp.

${criteriaText}

Dưới đây là danh sách khách hàng cần phân tích:
${customersList}

Yêu cầu:
1. Phân loại mỗi khách hàng thành một trong ba nhóm: "Tiềm năng cao", "Tiềm năng trung bình", hoặc "Tiềm năng thấp"
2. Đề xuất 1-3 thẻ (tags) phù hợp cho mỗi khách hàng dựa trên dữ liệu
3. Đưa ra lý do ngắn gọn cho việc phân loại
4. Đề xuất chiến lược tiếp cận phù hợp cho mỗi khách hàng

Trả về kết quả theo định dạng JSON như sau:
{
  "leads": [
    {
      "id": [ID khách hàng],
      "category": "[Tiềm năng cao/Tiềm năng trung bình/Tiềm năng thấp]",
      "suggestedTags": ["tag1", "tag2", ...],
      "reason": "[Lý do phân loại]",
      "approach": "[Chiến lược tiếp cận]"
    },
    ...
  ],
  "summary": {
    "highPotential": [số lượng],
    "mediumPotential": [số lượng],
    "lowPotential": [số lượng]
  }
}

Chỉ trả về JSON, không thêm bất kỳ giải thích nào khác.`
}

function parseAnalysis(text: string) {
  try {
    // Tìm và trích xuất phần JSON từ văn bản
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    // Nếu không tìm thấy JSON, trả về lỗi
    return { error: "Không thể phân tích kết quả từ AI" }
  } catch (error) {
    console.error("Error parsing analysis:", error)
    return { error: "Lỗi khi phân tích kết quả từ AI" }
  }
}
