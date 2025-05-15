import { type NextRequest, NextResponse } from "next/server"
import { type ReportConfig, ReportType } from "@/lib/pdf-export/types"

export async function POST(req: NextRequest) {
  try {
    const { reportType, customization, data, dateRange } = await req.json()

    if (!reportType) {
      return NextResponse.json({ error: "Thiếu loại báo cáo" }, { status: 400 })
    }

    // Trong môi trường thực tế, bạn sẽ gọi service để tạo PDF
    // Ở đây, chúng ta giả định rằng client-side sẽ xử lý việc tạo PDF
    // và chỉ sử dụng API để lấy dữ liệu và cấu hình

    // Tạo cấu hình báo cáo
    const config: ReportConfig = createReportConfig(reportType, customization, dateRange)

    // Nếu không có dữ liệu được gửi lên, lấy dữ liệu từ database
    const reportData = data || (await fetchReportData(reportType, dateRange))

    return NextResponse.json({
      success: true,
      config,
      data: reportData,
    })
  } catch (error) {
    console.error("Lỗi khi tạo báo cáo PDF:", error)
    return NextResponse.json({ error: "Đã xảy ra lỗi khi tạo báo cáo PDF" }, { status: 500 })
  }
}

function createReportConfig(reportType: ReportType, customization: any, dateRange: any): ReportConfig {
  const baseConfig: ReportConfig = {
    title: getReportTitle(reportType),
    subtitle: "Báo cáo chi tiết",
    dateRange,
    orientation: customization?.orientation || "portrait",
    showHeaderOnNewPage: customization?.showHeaderOnNewPage !== false,
    themeColor: {
      primary: [41, 128, 185], // RGB
      secondary: [52, 152, 219],
    },
  }

  if (customization?.showLogo) {
    baseConfig.logoUrl = "/logo.png" // Điều này sẽ được xử lý ở phía client
  }

  if (customization?.primaryColor) {
    // Chuyển đổi hex color thành RGB
    const hex = customization.primaryColor.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)
    baseConfig.themeColor = {
      primary: [r, g, b],
      secondary: [Math.min(r + 20, 255), Math.min(g + 20, 255), Math.min(b + 20, 255)],
    }
  }

  if (customization?.notes) {
    baseConfig.notes = customization.notes
  }

  return baseConfig
}

function getReportTitle(reportType: ReportType): string {
  switch (reportType) {
    case ReportType.OVERVIEW:
      return "Báo cáo tổng quan"
    case ReportType.CUSTOMER:
      return "Báo cáo khách hàng"
    case ReportType.CAMPAIGN:
      return "Báo cáo chiến dịch"
    case ReportType.CONVERSATION:
      return "Báo cáo tin nhắn"
    case ReportType.API_PERFORMANCE:
      return "Báo cáo hiệu suất API"
    case ReportType.STAFF_PERFORMANCE:
      return "Báo cáo hiệu suất nhân viên"
    default:
      return "Báo cáo Metabot.vn"
  }
}

async function fetchReportData(reportType: ReportType, dateRange: any) {
  // Trong thực tế, đây là nơi bạn sẽ truy vấn dữ liệu từ database
  // dựa trên reportType và dateRange

  // Dữ liệu mẫu
  const sampleData = {
    overview: {
      statistics: [
        { label: "Tổng khách hàng", value: "1,234" },
        { label: "Tin nhắn mới", value: "5,678" },
        { label: "Chiến dịch đang chạy", value: "12" },
        { label: "Tỷ lệ tương tác", value: "24.5%" },
      ],
      charts: [
        { title: "Lượng tin nhắn theo thời gian", chartId: "message-volume-chart" },
        { title: "Phân phối kênh liên lạc", chartId: "channel-distribution-chart" },
      ],
      tables: [
        {
          title: "Hiệu suất chiến dịch gần đây",
          columns: [
            { header: "Tên chiến dịch", accessor: "name" },
            { header: "Trạng thái", accessor: "status" },
            { header: "Tỷ lệ mở", accessor: "openRate" },
            { header: "Tỷ lệ nhấp", accessor: "clickRate" },
            { header: "Chuyển đổi", accessor: "conversions" },
          ],
          data: [
            { name: "Khuyến mãi mùa hè", status: "Đang chạy", openRate: "32.5%", clickRate: "12.3%", conversions: 145 },
            {
              name: "Giới thiệu sản phẩm mới",
              status: "Hoàn thành",
              openRate: "45.8%",
              clickRate: "18.7%",
              conversions: 287,
            },
            { name: "Khảo sát khách hàng", status: "Đang chạy", openRate: "28.2%", clickRate: "9.5%", conversions: 52 },
          ],
        },
      ],
    },
    // Thêm dữ liệu mẫu cho các loại báo cáo khác...
  }

  return sampleData[reportType as keyof typeof sampleData] || {}
}
