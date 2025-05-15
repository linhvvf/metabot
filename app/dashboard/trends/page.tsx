"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/dashboard/reports/date-range-picker"
import { TrendFilters } from "@/components/dashboard/trends/trend-filters"
import { CustomerEngagementTrends } from "@/components/dashboard/trends/customer-engagement-trends"
import { ConversationTopicTrends } from "@/components/dashboard/trends/conversation-topic-trends"
import { CampaignPerformanceTrends } from "@/components/dashboard/trends/campaign-performance-trends"
import { ChannelUsageTrends } from "@/components/dashboard/trends/channel-usage-trends"
import { SentimentTrends } from "@/components/dashboard/trends/sentiment-trends"
import { TrendDataTable } from "@/components/dashboard/trends/trend-data-table"
import { PredictiveAnalysis } from "@/components/dashboard/trends/predictive-analysis"
import { Download, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrendsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 90)),
    to: new Date(),
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Phân tích xu hướng</h1>
          <p className="text-muted-foreground">Phân tích xu hướng dựa trên dữ liệu chiến dịch và khách hàng</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DatePickerWithRange className="w-[250px]" />
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <TrendFilters />

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="engagement">Tương tác</TabsTrigger>
          <TabsTrigger value="topics">Chủ đề</TabsTrigger>
          <TabsTrigger value="campaigns">Chiến dịch</TabsTrigger>
          <TabsTrigger value="channels">Kênh liên lạc</TabsTrigger>
          <TabsTrigger value="sentiment">Cảm xúc</TabsTrigger>
        </TabsList>
        <TabsContent value="engagement">
          <CustomerEngagementTrends />
        </TabsContent>
        <TabsContent value="topics">
          <ConversationTopicTrends />
        </TabsContent>
        <TabsContent value="campaigns">
          <CampaignPerformanceTrends />
        </TabsContent>
        <TabsContent value="channels">
          <ChannelUsageTrends />
        </TabsContent>
        <TabsContent value="sentiment">
          <SentimentTrends />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrendDataTable />
        <PredictiveAnalysis />
      </div>
    </div>
  )
}
