import type { Metadata } from "next"
import AdvancedSentimentTrends from "@/components/dashboard/reports/advanced-sentiment-trends"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SentimentOverview } from "@/components/dashboard/reports/sentiment-overview"

export const metadata: Metadata = {
  title: "Phân tích cảm xúc | Metabot.vn",
  description: "Phân tích cảm xúc khách hàng nâng cao bằng AI",
}

export default function SentimentAnalysisPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Phân tích cảm xúc</h2>
          <p className="text-muted-foreground">
            Tổng quan và phân tích chi tiết cảm xúc của khách hàng từ các cuộc hội thoại
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="trends">Xu hướng</TabsTrigger>
          <TabsTrigger value="detailed">Chi tiết</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <SentimentOverview />

          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Cảm xúc tích cực</CardTitle>
                <CardDescription>Tỷ lệ tin nhắn có cảm xúc tích cực</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">68.5%</div>
                <p className="text-xs text-muted-foreground">+5.2% so với kỳ trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Cảm xúc tiêu cực</CardTitle>
                <CardDescription>Tỷ lệ tin nhắn có cảm xúc tiêu cực</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">9.2%</div>
                <p className="text-xs text-muted-foreground">-1.5% so với kỳ trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Xu hướng chung</CardTitle>
                <CardDescription>Xu hướng cảm xúc trong 30 ngày qua</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">Tăng</div>
                <p className="text-xs text-muted-foreground">Cảm xúc tích cực đang tăng lên</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <AdvancedSentimentTrends />
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phân tích cảm xúc theo từng cuộc hội thoại</CardTitle>
              <CardDescription>Chọn một cuộc hội thoại để xem phân tích cảm xúc chi tiết</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Vui lòng chọn một cuộc hội thoại để xem phân tích chi tiết.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
