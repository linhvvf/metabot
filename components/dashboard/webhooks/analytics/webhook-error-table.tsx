"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

export function WebhookErrorTable() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const errors = [
    {
      id: "err-001",
      endpoint: "https://api.example.com/webhook",
      errorCode: 500,
      errorMessage: "Internal Server Error",
      timestamp: "2023-05-10T14:32:15Z",
      eventType: "conversation.created",
      retryCount: 3,
    },
    {
      id: "err-002",
      endpoint: "https://webhook.site/123456",
      errorCode: 408,
      errorMessage: "Request Timeout",
      timestamp: "2023-05-10T13:45:22Z",
      eventType: "customer.updated",
      retryCount: 2,
    },
    {
      id: "err-003",
      endpoint: "https://hooks.zapier.com/abcdef",
      errorCode: 401,
      errorMessage: "Unauthorized",
      timestamp: "2023-05-10T12:18:05Z",
      eventType: "message.sent",
      retryCount: 1,
    },
    {
      id: "err-004",
      endpoint: "https://integrations.company.com/webhook",
      errorCode: 404,
      errorMessage: "Not Found",
      timestamp: "2023-05-10T10:52:37Z",
      eventType: "campaign.completed",
      retryCount: 3,
    },
    {
      id: "err-005",
      endpoint: "https://api.partner.com/incoming",
      errorCode: 429,
      errorMessage: "Too Many Requests",
      timestamp: "2023-05-10T09:14:51Z",
      eventType: "customer.created",
      retryCount: 2,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <AlertCircleIcon className="mr-2 h-5 w-5 text-red-500" />
              Lỗi Webhook gần đây
            </CardTitle>
            <CardDescription>Các lỗi webhook xảy ra trong 7 ngày qua</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Xem tất cả lỗi
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã lỗi</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Loại sự kiện</TableHead>
              <TableHead>Thông báo lỗi</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Số lần thử lại</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errors.map((error) => (
              <TableRow key={error.id}>
                <TableCell>
                  <Badge variant={error.errorCode >= 500 ? "destructive" : "outline"}>{error.errorCode}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs max-w-[200px] truncate">{error.endpoint}</TableCell>
                <TableCell>{error.eventType}</TableCell>
                <TableCell>{error.errorMessage}</TableCell>
                <TableCell>{new Date(error.timestamp).toLocaleString("vi-VN")}</TableCell>
                <TableCell>{error.retryCount}/3</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <ExternalLinkIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
