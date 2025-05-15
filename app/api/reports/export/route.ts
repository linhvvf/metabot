import { type NextRequest, NextResponse } from "next/server"
import {
  exportReport,
  prepareReportData,
  type ExportFormat,
  type ReportExportConfig,
} from "@/lib/report-export/export-utils"

export async function POST(req: NextRequest) {
  try {
    const { source, format, config, filters, data } = await req.json()

    if (!source || !format || !config) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    // Kiểm tra định dạng xuất hợp lệ
    if (!["pdf", "excel", "csv"].includes(format)) {
      return NextResponse.json({ error: "Định dạng xuất không hợp lệ" }, { status: 400 })
    }

    // Nếu đã có dữ liệu được gửi lên, sử dụng nó
    let reportData = data

    // Nếu không có dữ liệu, lấy dữ liệu từ nguồn tương ứng
    if (!reportData) {
      // Trong thực tế, đây là nơi bạn sẽ truy vấn dữ liệu từ database
      // dựa trên source và filters
      reportData = await fetchReportData(source, filters)
    }

    // Chuẩn bị dữ liệu báo cáo
    const processedData = prepareReportData(source, reportData)

    // Xuất báo cáo với định dạng được chỉ định
    await exportReport(processedData, format as ExportFormat, config as ReportExportConfig)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lỗi khi xuất báo cáo:", error)
    return NextResponse.json({ error: "Đã xảy ra lỗi khi xuất báo cáo" }, { status: 500 })
  }
}

// Hàm giả lập để lấy dữ liệu báo cáo
// Trong thực tế, đây là nơi bạn sẽ truy vấn dữ liệu từ database
async function fetchReportData(source: string, filters: any) {
  // Giả lập dữ liệu cho mục đích demo
  // Trong thực tế, bạn sẽ truy vấn dữ liệu từ database dựa trên source và filters

  // Mẫu dữ liệu cho các nguồn khác nhau
  const sampleData = {
    conversations: [
      {
        id: "conv1",
        customerName: "Nguyễn Văn A",
        channel: "Zalo",
        assignedTo: "Trần Thị B",
        status: "Đang mở",
        lastMessage: "Cảm ơn bạn đã hỗ trợ!",
        lastActivity: new Date().toISOString(),
        messageCount: 12,
        duration: "45 phút",
      },
      // Thêm dữ liệu mẫu khác...
    ],
    customers: [
      {
        id: "cust1",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0901234567",
        source: "Website",
        tags: ["VIP", "Khách hàng mới"],
        lastContact: new Date().toISOString(),
        status: "Đang hoạt động",
        conversationCount: 5,
      },
      // Thêm dữ liệu mẫu khác...
    ],
    campaigns: [
      {
        id: "camp1",
        name: "Khuyến mãi mùa hè 2023",
        status: "Đang chạy",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        audienceSize: 5000,
        reach: 3500,
        engagement: "12.5%",
        conversion: "2.8%",
        roi: "320%",
      },
      // Thêm dữ liệu mẫu khác...
    ],
    staff: [
      {
        id: "staff1",
        name: "Trần Thị B",
        email: "tranthib@example.com",
        role: "Nhân viên hỗ trợ",
        department: "Chăm sóc khách hàng",
        conversationCount: 428,
        avgResponseTime: "3.2 phút",
        customerSatisfaction: "96%",
        status: "Đang hoạt động",
      },
      // Thêm dữ liệu mẫu khác...
    ],
  }

  return sampleData[source as keyof typeof sampleData] || []
}
