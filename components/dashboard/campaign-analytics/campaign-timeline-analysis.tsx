"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CampaignTimelineAnalysisProps {
  selectedCampaigns: string[]
}

export function CampaignTimelineAnalysis({ selectedCampaigns }: CampaignTimelineAnalysisProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Phân tích theo thời gian</CardTitle>
          <CardDescription>Hiệu quả chiến dịch theo thời gian</CardDescription>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 ngày qua</SelectItem>
            <SelectItem value="30days">30 ngày qua</SelectItem>
            <SelectItem value="90days">90 ngày qua</SelectItem>
            <SelectItem value="year">Năm nay</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reach">Tiếp cận</TabsTrigger>
            <TabsTrigger value="engagement">Tương tác</TabsTrigger>
            <TabsTrigger value="conversion">Chuyển đổi</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
          </TabsList>
          <TabsContent value="reach" className="pt-4">
            <div className="h-[300px] w-full">
              <img
                src="/campaign-reach-over-time-chart.png"
                alt="Biểu đồ tiếp cận theo thời gian"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </TabsContent>
          <TabsContent value="engagement" className="pt-4">
            <div className="h-[300px] w-full">
              <img
                src="/campaign-engagement-line-chart.png"
                alt="Biểu đồ tương tác theo thời gian"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </TabsContent>
          <TabsContent value="conversion" className="pt-4">
            <div className="h-[300px] w-full">
              <img
                src="/campaign-conversion-chart.png"
                alt="Biểu đồ chuyển đổi theo thời gian"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </TabsContent>
          <TabsContent value="roi" className="pt-4">
            <div className="h-[300px] w-full">
              <img
                src="/campaign-roi-line-chart.png"
                alt="Biểu đồ ROI theo thời gian"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
