import { type NextRequest, NextResponse } from "next/server"
import type { ReportSchedule } from "@/lib/pdf-export/types"

export async function POST(req: NextRequest) {
  try {
    const schedule: ReportSchedule = await req.json()

    if (!schedule.reportType || !schedule.frequency || !schedule.name) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    // Trong môi trường thực tế, đây là nơi bạn sẽ lưu lịch báo cáo vào database
    // và thiết lập cron job để tạo và gửi báo cáo theo lịch

    // Giả lập việc lưu lịch báo cáo
    const savedSchedule = {
      id: `schedule-${Date.now()}`,
      ...schedule,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      schedule: savedSchedule,
    })
  } catch (error) {
    console.error("Lỗi khi lập lịch báo cáo:", error)
    return NextResponse.json({ error: "Đã xảy ra lỗi khi lập lịch báo cáo" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Trong môi trường thực tế, đây là nơi bạn sẽ truy vấn danh sách lịch báo cáo từ database

    // Dữ liệu mẫu
    const schedules = [
      {
        id: "schedule-1",
        name: "Báo cáo hàng tuần",
        frequency: "weekly",
        dayOfWeek: 1, // Thứ 2
        time: "08:00",
        recipients: ["manager@example.com", "team@example.com"],
        reportType: "overview",
        customization: {
          showLogo: true,
          orientation: "landscape",
          includeNotes: true,
          includeStatistics: true,
          includeCharts: true,
          includeTables: true,
          showHeaderOnNewPage: true,
        },
        active: true,
        createdAt: "2023-01-15T08:00:00.000Z",
      },
      {
        id: "schedule-2",
        name: "Báo cáo khách hàng hàng tháng",
        frequency: "monthly",
        dayOfMonth: 1,
        time: "09:00",
        recipients: ["sales@example.com"],
        reportType: "customer",
        customization: {
          showLogo: true,
          orientation: "portrait",
          includeNotes: false,
          includeStatistics: true,
          includeCharts: true,
          includeTables: true,
          showHeaderOnNewPage: true,
        },
        active: true,
        createdAt: "2023-02-10T09:00:00.000Z",
      },
    ]

    return NextResponse.json({
      success: true,
      schedules,
    })
  } catch (error) {
    console.error("Lỗi khi lấy danh sách lịch báo cáo:", error)
    return NextResponse.json({ error: "Đã xảy ra lỗi khi lấy danh sách lịch báo cáo" }, { status: 500 })
  }
}
