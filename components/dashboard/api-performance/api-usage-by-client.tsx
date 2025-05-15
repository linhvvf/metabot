"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"
import { Badge } from "@/components/ui/badge"
import { BarChart, RefreshCw, Users } from "lucide-react"

interface ApiUsageByClientProps {
  data?: any
  isLoading?: boolean
  onRefresh?: () => void
}

export default function ApiUsageByClient({ data, isLoading = false, onRefresh }: ApiUsageByClientProps) {
  // Mock data for preview/testing
  const mockData = {
    topClients: [
      { name: "Mobile App", requests: 45600, bandwidth: 1250 },
      { name: "Web Dashboard", requests: 32400, bandwidth: 890 },
      { name: "Partner API", requests: 18900, bandwidth: 520 },
      { name: "Internal Tools", requests: 12300, bandwidth: 340 },
      { name: "Integration Services", requests: 8700, bandwidth: 240 },
    ],
    clientDistribution: {
      byRequests: [
        { name: "Mobile App", value: 38 },
        { name: "Web Dashboard", value: 27 },
        { name: "Partner API", value: 16 },
        { name: "Internal Tools", value: 10 },
        { name: "Integration Services", value: 7 },
        { name: "Others", value: 2 },
      ],
      byBandwidth: [
        { name: "Mobile App", value: 42 },
        { name: "Web Dashboard", value: 30 },
        { name: "Partner API", value: 14 },
        { name: "Internal Tools", value: 8 },
        { name: "Integration Services", value: 5 },
        { name: "Others", value: 1 },
      ],
    },
    clientGrowth: [
      { name: "Mobile App", growth: 12.5 },
      { name: "Web Dashboard", growth: 8.3 },
      { name: "Partner API", growth: 15.7 },
      { name: "Internal Tools", growth: -2.1 },
      { name: "Integration Services", growth: 22.4 },
    ],
  }

  // Use mock data if no data is provided
  const displayData = data || mockData

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sử dụng API theo khách hàng</CardTitle>
            <CardDescription>Phân tích lưu lượng API theo ứng dụng khách hàng</CardDescription>
          </div>
          {onRefresh && (
            <button onClick={onRefresh} className="p-1 rounded-full hover:bg-gray-100" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="top-clients">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="top-clients" className="flex-1">
              Khách hàng hàng đầu
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex-1">
              Phân phối
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex-1">
              Tăng trưởng
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top-clients">
            <div className="space-y-4">
              {displayData.topClients.map((client: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.bandwidth.toLocaleString()} MB sử dụng</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{client.requests.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">yêu cầu</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="distribution">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Phân phối theo yêu cầu</h3>
                <ResponsiveChartContainer className="h-64">
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center">
                      <BarChart className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Biểu đồ phân phối theo yêu cầu</p>
                    </div>
                  </div>
                </ResponsiveChartContainer>
                <div className="flex flex-wrap gap-2 mt-3">
                  {displayData.clientDistribution.byRequests.map((item: any, index: number) => (
                    <Badge key={index} variant="outline" className="px-2 py-1">
                      {item.name}: {item.value}%
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Phân phối theo băng thông</h3>
                <ResponsiveChartContainer className="h-64">
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center">
                      <BarChart className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Biểu đồ phân phối theo băng thông</p>
                    </div>
                  </div>
                </ResponsiveChartContainer>
                <div className="flex flex-wrap gap-2 mt-3">
                  {displayData.clientDistribution.byBandwidth.map((item: any, index: number) => (
                    <Badge key={index} variant="outline" className="px-2 py-1">
                      {item.name}: {item.value}%
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="growth">
            <div className="space-y-4">
              {displayData.clientGrowth.map((client: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">So với tháng trước</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${client.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {client.growth >= 0 ? "+" : ""}
                      {client.growth}%
                    </p>
                    <p className="text-xs text-muted-foreground">tăng trưởng</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
