"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, BarChart, RefreshCw, Shield } from "lucide-react"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

interface ApiRateLimitingStatsProps {
  data?: any
  isLoading?: boolean
  onRefresh?: () => void
}

export default function ApiRateLimitingStats({ data, isLoading = false, onRefresh }: ApiRateLimitingStatsProps) {
  // Mock data for preview/testing
  const mockData = {
    rateLimitUtilization: {
      overall: 68,
      byEndpoint: [
        { endpoint: "/api/messages", utilization: 82 },
        { endpoint: "/api/customers", utilization: 75 },
        { endpoint: "/api/analytics", utilization: 65 },
        { endpoint: "/api/webhooks", utilization: 45 },
        { endpoint: "/api/templates", utilization: 30 },
      ],
    },
    throttledRequests: {
      total: 1250,
      byClient: [
        { client: "Mobile App", count: 580, percentage: 46.4 },
        { client: "Web Dashboard", count: 320, percentage: 25.6 },
        { client: "Partner API", count: 210, percentage: 16.8 },
        { client: "Integration Services", count: 140, percentage: 11.2 },
      ],
      byEndpoint: [
        { endpoint: "/api/messages/send", count: 420, percentage: 33.6 },
        { endpoint: "/api/customers/search", count: 380, percentage: 30.4 },
        { endpoint: "/api/analytics/reports", count: 250, percentage: 20.0 },
        { endpoint: "/api/webhooks/events", count: 200, percentage: 16.0 },
      ],
    },
    rateLimitBreaches: {
      total: 320,
      trend: "decreasing",
      byTime: [
        { hour: "00:00", count: 12 },
        { hour: "04:00", count: 8 },
        { hour: "08:00", count: 45 },
        { hour: "12:00", count: 78 },
        { hour: "16:00", count: 120 },
        { hour: "20:00", count: 57 },
      ],
    },
  }

  // Use mock data if no data is provided
  const displayData = data || mockData

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Thống kê giới hạn tốc độ API</CardTitle>
            <CardDescription>Phân tích việc sử dụng và vi phạm giới hạn tốc độ API</CardDescription>
          </div>
          {onRefresh && (
            <button onClick={onRefresh} className="p-1 rounded-full hover:bg-gray-100" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="utilization">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="utilization" className="flex-1">
              Mức sử dụng
            </TabsTrigger>
            <TabsTrigger value="throttled" className="flex-1">
              Yêu cầu bị hạn chế
            </TabsTrigger>
            <TabsTrigger value="breaches" className="flex-1">
              Vi phạm
            </TabsTrigger>
          </TabsList>

          <TabsContent value="utilization">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Mức sử dụng tổng thể</h3>
                  <Badge variant={displayData.rateLimitUtilization.overall > 80 ? "destructive" : "outline"}>
                    {displayData.rateLimitUtilization.overall}%
                  </Badge>
                </div>
                <Progress value={displayData.rateLimitUtilization.overall} className="h-2" />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Mức sử dụng theo endpoint</h3>
                <div className="space-y-3">
                  {displayData.rateLimitUtilization.byEndpoint.map((item: any, index: number) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-mono">{item.endpoint}</p>
                        <Badge
                          variant={
                            item.utilization > 80 ? "destructive" : item.utilization > 60 ? "default" : "outline"
                          }
                          className="ml-2"
                        >
                          {item.utilization}%
                        </Badge>
                      </div>
                      <Progress value={item.utilization} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="throttled">
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-amber-50 p-3 rounded-md border border-amber-200">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-medium">Tổng số yêu cầu bị hạn chế</span>
                </div>
                <Badge variant="outline" className="bg-white">
                  {displayData.throttledRequests.total.toLocaleString()}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Theo khách hàng</h3>
                <ResponsiveChartContainer className="h-64">
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center">
                      <BarChart className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Biểu đồ yêu cầu bị hạn chế theo khách hàng</p>
                    </div>
                  </div>
                </ResponsiveChartContainer>
                <div className="space-y-2 mt-3">
                  {displayData.throttledRequests.byClient.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span className="text-sm">{item.client}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">{item.count.toLocaleString()}</span>
                        <Badge variant="outline" className="bg-white">
                          {item.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Theo endpoint</h3>
                <div className="space-y-2">
                  {displayData.throttledRequests.byEndpoint.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span className="text-sm font-mono">{item.endpoint}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">{item.count.toLocaleString()}</span>
                        <Badge variant="outline" className="bg-white">
                          {item.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="breaches">
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-red-50 p-3 rounded-md border border-red-200">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <span className="font-medium block">Tổng số vi phạm giới hạn</span>
                    <span className="text-xs text-muted-foreground">
                      Xu hướng: {displayData.rateLimitBreaches.trend}
                    </span>
                  </div>
                </div>
                <Badge variant="destructive">{displayData.rateLimitBreaches.total.toLocaleString()}</Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Vi phạm theo thời gian</h3>
                <ResponsiveChartContainer className="h-64">
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center">
                      <BarChart className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Biểu đồ vi phạm giới hạn theo thời gian</p>
                    </div>
                  </div>
                </ResponsiveChartContainer>
                <div className="grid grid-cols-6 gap-2 mt-3">
                  {displayData.rateLimitBreaches.byTime.map((item: any, index: number) => (
                    <div key={index} className="text-center p-2 bg-gray-50 rounded-md">
                      <span className="text-xs block">{item.hour}</span>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-medium mb-2">Đề xuất</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-xs flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-2 flex-shrink-0">
                      1
                    </span>
                    <span>Tăng giới hạn tốc độ cho endpoint "/api/messages/send" trong giờ cao điểm</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-xs flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-2 flex-shrink-0">
                      2
                    </span>
                    <span>Triển khai bộ nhớ đệm cho endpoint "/api/customers/search" để giảm số lượng yêu cầu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-xs flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-2 flex-shrink-0">
                      3
                    </span>
                    <span>Xem xét giới hạn tốc độ riêng cho ứng dụng di động để cải thiện trải nghiệm người dùng</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
