"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2Icon, XCircleIcon, ClockIcon } from "lucide-react"

export function WebhookEndpointStats() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const endpoints = [
    {
      id: "ep-001",
      url: "https://api.example.com/webhook",
      successRate: 99.2,
      averageLatency: 215,
      volume: 5842,
      status: "active",
    },
    {
      id: "ep-002",
      url: "https://webhook.site/123456",
      successRate: 97.8,
      averageLatency: 312,
      volume: 3254,
      status: "active",
    },
    {
      id: "ep-003",
      url: "https://hooks.zapier.com/abcdef",
      successRate: 95.5,
      averageLatency: 278,
      volume: 2187,
      status: "active",
    },
    {
      id: "ep-004",
      url: "https://integrations.company.com/webhook",
      successRate: 100,
      averageLatency: 198,
      volume: 1965,
      status: "active",
    },
    {
      id: "ep-005",
      url: "https://api.partner.com/incoming",
      successRate: 92.3,
      averageLatency: 345,
      volume: 1598,
      status: "inactive",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê theo Endpoint</CardTitle>
        <CardDescription>Hiệu suất của từng endpoint webhook</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endpoint</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Tỷ lệ thành công</TableHead>
              <TableHead>Thời gian phản hồi</TableHead>
              <TableHead>Khối lượng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {endpoints.map((endpoint) => (
              <TableRow key={endpoint.id}>
                <TableCell className="font-mono text-xs max-w-[300px] truncate">{endpoint.url}</TableCell>
                <TableCell>
                  <Badge variant={endpoint.status === "active" ? "outline" : "secondary"}>
                    {endpoint.status === "active" ? "Hoạt động" : "Không hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {endpoint.successRate >= 98 ? (
                      <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                    ) : endpoint.successRate < 95 ? (
                      <XCircleIcon className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckCircle2Icon className="h-4 w-4 text-yellow-500" />
                    )}
                    <div className="w-[100px]">
                      <div className="text-xs font-medium">{endpoint.successRate}%</div>
                      <Progress value={endpoint.successRate} className="h-1" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-blue-500" />
                    <span>{endpoint.averageLatency} ms</span>
                  </div>
                </TableCell>
                <TableCell>{endpoint.volume.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
