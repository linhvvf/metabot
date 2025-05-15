"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AudienceResponseAnalyticsProps {
  selectedCampaigns: string[]
}

export function AudienceResponseAnalytics({ selectedCampaigns }: AudienceResponseAnalyticsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Phân tích đối tượng</CardTitle>
          <CardDescription>Phân tích phản hồi của các nhóm đối tượng khác nhau</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <img
              src="/audience-segmentation-pie-chart.png"
              alt="Biểu đồ phân tích đối tượng"
              className="h-full w-full object-cover rounded-md"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hiệu quả theo nhóm tuổi</CardTitle>
          <CardDescription>Phân tích hiệu quả chiến dịch theo độ tuổi</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="engagement">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="engagement">Tương tác</TabsTrigger>
              <TabsTrigger value="conversion">Chuyển đổi</TabsTrigger>
              <TabsTrigger value="roi">ROI</TabsTrigger>
            </TabsList>
            <TabsContent value="engagement" className="pt-4">
              <div className="h-[250px] w-full">
                <img
                  src="/placeholder.svg?height=250&width=400&query=bar chart showing engagement by age group"
                  alt="Biểu đồ tương tác theo độ tuổi"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            </TabsContent>
            <TabsContent value="conversion" className="pt-4">
              <div className="h-[250px] w-full">
                <img
                  src="/placeholder.svg?height=250&width=400&query=bar chart showing conversion by age group"
                  alt="Biểu đồ chuyển đổi theo độ tuổi"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            </TabsContent>
            <TabsContent value="roi" className="pt-4">
              <div className="h-[250px] w-full">
                <img
                  src="/placeholder.svg?height=250&width=400&query=bar chart showing ROI by age group"
                  alt="Biểu đồ ROI theo độ tuổi"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hiệu quả theo vị trí địa lý</CardTitle>
          <CardDescription>Phân tích hiệu quả chiến dịch theo khu vực</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <img
              src="/placeholder.svg?height=300&width=400&query=map chart showing campaign performance by region in Vietnam"
              alt="Bản đồ hiệu quả chiến dịch theo khu vực"
              className="h-full w-full object-cover rounded-md"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hiệu quả theo hành vi</CardTitle>
          <CardDescription>Phân tích hiệu quả chiến dịch theo hành vi người dùng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <img
              src="/placeholder.svg?height=300&width=400&query=radar chart showing campaign performance by user behavior"
              alt="Biểu đồ hiệu quả chiến dịch theo hành vi người dùng"
              className="h-full w-full object-cover rounded-md"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
