"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Filter, RefreshCw, BarChart4, PieChart, TrendingUp, Share2, Clock } from "lucide-react"
import { DatePickerWithRange } from "@/components/dashboard/reports/date-range-picker"
import { CampaignPerformanceOverview } from "@/components/dashboard/campaign-analytics/campaign-performance-overview"
import { CampaignComparisonChart } from "@/components/dashboard/campaign-analytics/campaign-comparison-chart"
import { ChannelPerformanceAnalytics } from "@/components/dashboard/campaign-analytics/channel-performance-analytics"
import { AudienceResponseAnalytics } from "@/components/dashboard/campaign-analytics/audience-response-analytics"
import { ConversionFunnelChart } from "@/components/dashboard/campaign-analytics/conversion-funnel-chart"
import { CampaignROIAnalysis } from "@/components/dashboard/campaign-analytics/campaign-roi-analysis"
import { CampaignFilters } from "@/components/dashboard/campaign-analytics/campaign-filters"
import { CampaignTable } from "@/components/dashboard/campaign-analytics/campaign-table"
import { CampaignTimelineAnalysis } from "@/components/dashboard/campaign-analytics/campaign-timeline-analysis"
import { ContentPerformanceAnalysis } from "@/components/dashboard/campaign-analytics/content-performance-analysis"
import { ReportExportDialog } from "@/components/dashboard/reports/report-export-dialog"
import { ReportScheduleDialog } from "@/components/dashboard/reports/report-schedule-dialog"
import Link from "next/link"

export default function CampaignAnalyticsClient() {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])

  // Cấu hình cột cho báo cáo
  const reportColumns = [
    { header: "Tên chiến dịch", accessor: "name" },
    { header: "Trạng thái", accessor: "status" },
    { header: "Tiếp cận", accessor: "reach" },
    { header: "Tương tác", accessor: "engagement" },
    { header: "Chuyển đổi", accessor: "conversion" },
    { header: "ROI", accessor: "roi" },
    { header: "Chi phí", accessor: "cost" },
    { header: "Doanh thu", accessor: "revenue" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Báo cáo hiệu quả chiến dịch</h1>
          <p className="text-gray-500">Phân tích chi tiết hiệu quả các chiến dịch marketing</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <DatePickerWithRange />
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <ReportExportDialog
            title="Báo cáo hiệu quả chiến dịch"
            subtitle="Phân tích chi tiết hiệu quả các chiến dịch marketing"
            source="campaigns"
            columns={reportColumns}
          />
          <ReportScheduleDialog title="Báo cáo hiệu quả chiến dịch" source="campaigns" />
          <Button variant="outline" asChild>
            <Link href="/dashboard/reports/scheduled">
              <Clock className="mr-2 h-4 w-4" />
              Báo cáo tự động
            </Link>
          </Button>
        </div>
      </div>

      {showFilters && <CampaignFilters onCampaignsSelected={setSelectedCampaigns} />}

      <CampaignPerformanceOverview selectedCampaigns={selectedCampaigns} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            <span>Tổng quan</span>
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>Kênh</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Đối tượng</span>
          </TabsTrigger>
          <TabsTrigger value="roi" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>ROI</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <CampaignComparisonChart selectedCampaigns={selectedCampaigns} />
            <ConversionFunnelChart selectedCampaigns={selectedCampaigns} />
          </div>
          <CampaignTimelineAnalysis selectedCampaigns={selectedCampaigns} />
          <CampaignTable selectedCampaigns={selectedCampaigns} />
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <ChannelPerformanceAnalytics selectedCampaigns={selectedCampaigns} />
          <ContentPerformanceAnalysis selectedCampaigns={selectedCampaigns} />
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <AudienceResponseAnalytics selectedCampaigns={selectedCampaigns} />
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <CampaignROIAnalysis selectedCampaigns={selectedCampaigns} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
