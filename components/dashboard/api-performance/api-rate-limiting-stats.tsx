"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface ApiRateLimitingStatsProps {
  dateRange: {
    from: Date
    to: Date
  }
  filters: {
    endpoints: string[]
    statusCodes: string[]
    clients: string[]
  }
}

export default function ApiRateLimitingStats({ dateRange, filters }: ApiRateLimitingStatsProps) {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const rateLimitData = [
    { time: "00:00", throttled: 120, blocked: 20 },
    { time: "02:00", throttled: 80, blocked: 15 },
    { time: "04:00", throttled: 60, blocked: 10 },
    { time: "06:00", throttled: 90, blocked: 12 },
    { time: "08:00", throttled: 210, blocked: 35 },
    { time: "10:00", throttled: 320, blocked: 50 },
    { time: "12:00", throttled: 280, blocked: 45 },
    { time: "14:00", throttled: 290, blocked: 48 },
    { time: "16:00", throttled: 270, blocked: 42 },
    { time: "18:00", throttled: 230, blocked: 38 },
    { time: "20:00", throttled: 180, blocked: 30 },
    { time: "22:00", throttled: 150, blocked: 25 },
  ]

  const topThrottledClients = [
    { clientId: "mobile-app-123", name: "Ứng dụng di động", throttled: 850, blocked: 120, limit: 1000 },
    { clientId: "partner-api-789", name: "API đối tác", throttled: 620, blocked: 80, limit: 500 },
    { clientId: "public-api-345", name: "API công khai", throttled: 480, blocked: 95, limit: 300 },
    { clientId: "web-dashboard-456", name: "Bảng điều khiển web", throttled: 320, blocked: 45, limit: 800 },
    { clientId: "internal-tools-012", name: "Công cụ nội bộ", throttled: 180, blocked: 20, limit: 1200 },
  ]

  const topThrottledEndpoints = [
    { endpoint: "/api/messages", throttled: 780, blocked: 110, limit: 1000 },
    { endpoint: "/api/customers", throttled: 520, blocked: 75, limit: 800 },
    { endpoint: "/api/campaigns", throttled: 420, blocked: 65, limit: 500 },
    { endpoint: "/api/reports", throttled: 380, blocked: 60, limit: 300 },
    { endpoint: "/api/analytics", throttled: 320, blocked: 50, limit: 200 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê giới hạn tốc độ</CardTitle>
        <CardDescription>Phân tích các yêu cầu bị giới hạn tốc độ và chặn</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="clients">Khách hàng</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ChartContainer
              config={{
                throttled: {
                  label: "Yêu cầu bị giảm tốc",
                  color: "hsl(var(--warning))",
                },
                blocked: {
                  label: "Yêu cầu bị chặn",
                  color: "hsl(var(--destructive))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rateLimitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="throttled" fill="var(--color-throttled)" />
                  <Bar dataKey="blocked" fill="var(--color-blocked)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="clients">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Khách hàng</TableHead>
                    <TableHead>Yêu cầu bị giảm tốc</TableHead>
                    <TableHead>Yêu cầu bị chặn</TableHead>
                    <TableHead>Giới hạn (req/phút)</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topThrottledClients.map((client) => (
                    <TableRow key={client.clientId}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{client.name}</span>
                          <span className="text-xs text-muted-foreground">{client.clientId}</span>
                        </div>
                      </TableCell>
                      <TableCell>{client.throttled}</TableCell>
                      <TableCell>{client.blocked}</TableCell>
                      <TableCell>{client.limit}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            client.throttled > client.limit * 0.8
                              ? "destructive"
                              : client.throttled > client.limit * 0.5
                                ? "warning"
                                : "outline"
                          }
                        >
                          {client.throttled > client.limit * 0.8
                            ? "Nguy hiểm"
                            : client.throttled > client.limit * 0.5
                              ? "Cảnh báo"
                              : "Bình thường"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="endpoints">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Endpoint</TableHead>
                    <TableHead>Yêu cầu bị giảm tốc</TableHead>
                    <TableHead>Yêu cầu bị chặn</TableHead>
                    <TableHead>Giới hạn (req/phút)</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topThrottledEndpoints.map((endpoint) => (
                    <TableRow key={endpoint.endpoint}>
                      <TableCell className="font-medium">{endpoint.endpoint}</TableCell>
                      <TableCell>{endpoint.throttled}</TableCell>
                      <TableCell>{endpoint.blocked}</TableCell>
                      <TableCell>{endpoint.limit}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            endpoint.throttled > endpoint.limit * 0.8
                              ? "destructive"
                              : endpoint.throttled > endpoint.limit * 0.5
                                ? "warning"
                                : "outline"
                          }
                        >
                          {endpoint.throttled > endpoint.limit * 0.8
                            ? "Nguy hiểm"
                            : endpoint.throttled > endpoint.limit * 0.5
                              ? "Cảnh báo"
                              : "Bình thường"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
