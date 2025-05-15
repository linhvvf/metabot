"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CampaignComparisonChartProps {
  selectedCampaigns: string[]
}

export function CampaignComparisonChart({ selectedCampaigns }: CampaignComparisonChartProps) {
  // Giả lập dữ liệu - trong thực tế sẽ lấy từ API dựa trên selectedCampaigns
  const campaignData = {
    names: ["Khuyến mãi mùa hè", "Ra mắt sản phẩm", "Khách hàng thân thiết", "Khuyến mãi cuối năm"],
    metrics: {
      reach: [65000, 48000, 72000, 58000],
      engagement: [12.5, 18.2, 9.7, 14.3],
      conversion: [2.8, 3.5, 1.9, 2.2],
      roi: [320, 480, 210, 290],
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>So sánh hiệu quả chiến dịch</CardTitle>
        <CardDescription>So sánh các chỉ số KPI chính giữa các chiến dịch</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reach">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reach">Tiếp cận</TabsTrigger>
            <TabsTrigger value="engagement">Tương tác</TabsTrigger>
            <TabsTrigger value="conversion">Chuyển đổi</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
          </TabsList>
          <TabsContent value="reach" className="pt-4">
            <div className="h-[300px] w-full">
              <div className="flex flex-col space-y-4">
                {campaignData.names.map((name, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="text-sm font-medium">{campaignData.metrics.reach[index].toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(campaignData.metrics.reach[index] / Math.max(...campaignData.metrics.reach)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="engagement" className="pt-4">
            <div className="h-[300px] w-full">
              <div className="flex flex-col space-y-4">
                {campaignData.names.map((name, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="text-sm font-medium">{campaignData.metrics.engagement[index]}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(campaignData.metrics.engagement[index] / Math.max(...campaignData.metrics.engagement)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="conversion" className="pt-4">
            <div className="h-[300px] w-full">
              <div className="flex flex-col space-y-4">
                {campaignData.names.map((name, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="text-sm font-medium">{campaignData.metrics.conversion[index]}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(campaignData.metrics.conversion[index] / Math.max(...campaignData.metrics.conversion)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="roi" className="pt-4">
            <div className="h-[300px] w-full">
              <div className="flex flex-col space-y-4">
                {campaignData.names.map((name, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="text-sm font-medium">{campaignData.metrics.roi[index]}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(campaignData.metrics.roi[index] / Math.max(...campaignData.metrics.roi)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
