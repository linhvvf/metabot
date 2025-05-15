"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface ChannelPerformanceAnalyticsProps {
  selectedCampaigns: string[]
}

export function ChannelPerformanceAnalytics({ selectedCampaigns }: ChannelPerformanceAnalyticsProps) {
  // Giả lập dữ liệu - trong thực tế sẽ lấy từ API dựa trên selectedCampaigns
  const channelData = {
    reach: [
      { channel: "Facebook", value: 42, color: "bg-blue-500" },
      { channel: "Zalo", value: 28, color: "bg-blue-400" },
      { channel: "Email", value: 15, color: "bg-blue-300" },
      { channel: "SMS", value: 8, color: "bg-blue-200" },
      { channel: "Khác", value: 7, color: "bg-blue-100" },
    ],
    engagement: [
      { channel: "Facebook", value: 38, color: "bg-green-500" },
      { channel: "Zalo", value: 32, color: "bg-green-400" },
      { channel: "Email", value: 18, color: "bg-green-300" },
      { channel: "SMS", value: 5, color: "bg-green-200" },
      { channel: "Khác", value: 7, color: "bg-green-100" },
    ],
    conversion: [
      { channel: "Facebook", value: 35, color: "bg-purple-500" },
      { channel: "Zalo", value: 25, color: "bg-purple-400" },
      { channel: "Email", value: 28, color: "bg-purple-300" },
      { channel: "SMS", value: 7, color: "bg-purple-200" },
      { channel: "Khác", value: 5, color: "bg-purple-100" },
    ],
    roi: [
      { channel: "Facebook", value: 32, color: "bg-orange-500" },
      { channel: "Zalo", value: 22, color: "bg-orange-400" },
      { channel: "Email", value: 35, color: "bg-orange-300" },
      { channel: "SMS", value: 6, color: "bg-orange-200" },
      { channel: "Khác", value: 5, color: "bg-orange-100" },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiệu quả theo kênh</CardTitle>
        <CardDescription>Phân tích hiệu quả chiến dịch trên các kênh khác nhau</CardDescription>
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
            <div className="space-y-4">
              {channelData.reach.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.channel}</span>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className={item.color} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="engagement" className="pt-4">
            <div className="space-y-4">
              {channelData.engagement.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.channel}</span>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className={item.color} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="conversion" className="pt-4">
            <div className="space-y-4">
              {channelData.conversion.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.channel}</span>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className={item.color} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="roi" className="pt-4">
            <div className="space-y-4">
              {channelData.roi.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.channel}</span>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className={item.color} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
