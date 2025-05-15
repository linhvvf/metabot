"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CalendarIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CampaignScheduleProps {
  campaign: any
}

export default function CampaignSchedule({ campaign }: CampaignScheduleProps) {
  // Dữ liệu mẫu cho lịch sử gửi tin nhắn
  const sendHistory = [
    { id: 1, date: "2023-06-01 09:00:00", count: 250, status: "completed" },
    { id: 2, date: "2023-06-05 09:00:00", count: 300, status: "completed" },
    { id: 3, date: "2023-06-10 09:00:00", count: 280, status: "completed" },
    { id: 4, date: "2023-06-15 09:00:00", count: 270, status: "completed" },
    { id: 5, date: "2023-06-20 09:00:00", count: 0, status: "scheduled" },
  ]

  // Hàm định dạng trạng thái
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Đã hoàn thành</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500">Đã lên lịch</Badge>
      case "failed":
        return <Badge variant="destructive">Thất bại</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin lịch trình</CardTitle>
          <CardDescription>Thông tin về lịch trình gửi tin nhắn trong chiến dịch này</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Ngày bắt đầu</p>
                  <p className="text-sm">{new Date(campaign.startDate).toLocaleDateString("vi-VN")}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Ngày kết thúc</p>
                  <p className="text-sm">{new Date(campaign.endDate).toLocaleDateString("vi-VN")}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Thời gian gửi</p>
                <p className="text-sm">09:00 sáng</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Tần suất</p>
                <p className="text-sm">5 ngày một lần</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử gửi tin nhắn</CardTitle>
          <CardDescription>Lịch sử các lần gửi tin nhắn trong chiến dịch này</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thời gian</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sendHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {new Date(item.date).toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{item.count.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
