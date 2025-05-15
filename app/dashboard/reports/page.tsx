"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import DateRangePicker from "@/components/dashboard/reports/date-range-picker"
import ReportFilters from "@/components/dashboard/reports/report-filters"
import OverviewMetrics from "@/components/dashboard/reports/overview-metrics"
import MessageVolumeChart from "@/components/dashboard/reports/message-volume-chart"
import ResponseTimeChart from "@/components/dashboard/reports/response-time-chart"
import CustomerSatisfactionChart from "@/components/dashboard/reports/customer-satisfaction-chart"
import ChannelPerformance from "@/components/dashboard/reports/channel-performance"
import ConversationAnalytics from "@/components/dashboard/reports/conversation-analytics"
import StaffPerformanceTable from "@/components/dashboard/reports/staff-performance-table"
import CustomerSegmentationChart from "@/components/dashboard/reports/customer-segmentation-chart"
import SentimentOverview from "@/components/dashboard/reports/sentiment-overview"
import { ReportExportDialog } from "@/components/dashboard/reports/report-export-dialog"
import { ReportScheduleDialog } from "@/components/dashboard/reports/report-schedule-dialog"
import { Clock } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })

  // Cấu hình cột cho báo cáo
  const reportColumns = [
    { header: "Kênh", accessor: "channel" },
    { header: "Tin nhắn", accessor: "messages" },
    { header: "Hội thoại", accessor: "conversations" },
    { header: "Thời gian phản hồi", accessor: "responseTime" },
    { header: "Mức độ hài lòng", accessor: "satisfaction" },
    { header: "Tỷ lệ giải quyết", accessor: "resolutionRate" },
    { header: "Thời gian", accessor: "period" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Báo cáo chi tiết</h1>
        <div className="flex flex-wrap gap-2">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <ReportExportDialog
            title="Báo cáo tổng quan"
            subtitle="Báo cáo hiệu suất hội thoại và kênh liên lạc"
            source="conversations"
            columns={reportColumns}
          />
          <ReportScheduleDialog title="Báo cáo tổng quan" source="conversations" />
          <Button variant="outline" asChild>
            <Link href="/dashboard/reports/scheduled">
              <Clock className="mr-2 h-4 w-4" />
              Báo cáo tự động
            </Link>
          </Button>
        </div>
      </div>

      <ReportFilters />

      <OverviewMetrics />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MessageVolumeChart />
        <ResponseTimeChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomerSatisfactionChart />
        <SentimentOverview />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChannelPerformance />
        <ConversationAnalytics />
      </div>

      <StaffPerformanceTable />

      <CustomerSegmentationChart />
    </div>
  )
}
