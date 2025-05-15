"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface CampaignAudienceProps {
  campaign: any
}

export default function CampaignAudience({ campaign }: CampaignAudienceProps) {
  // Dữ liệu mẫu cho phân khúc khách hàng
  const segmentData = [
    { name: "Khách hàng mới", value: 35 },
    { name: "Khách hàng thân thiết", value: 45 },
    { name: "Khách hàng không hoạt động", value: 20 },
  ]

  // Dữ liệu mẫu cho danh sách khách hàng
  const customers = [
    { id: 1, name: "Nguyễn Văn A", phone: "0901234567", email: "nguyenvana@example.com", status: "opened" },
    { id: 2, name: "Trần Thị B", phone: "0912345678", email: "tranthib@example.com", status: "clicked" },
    { id: 3, name: "Lê Văn C", phone: "0923456789", email: "levanc@example.com", status: "delivered" },
    { id: 4, name: "Phạm Thị D", phone: "0934567890", email: "phamthid@example.com", status: "opened" },
    { id: 5, name: "Hoàng Văn E", phone: "0945678901", email: "hoangvane@example.com", status: "clicked" },
  ]

  // Màu sắc cho biểu đồ tròn
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  // Hàm định dạng trạng thái
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "opened":
        return <Badge className="bg-blue-500">Đã mở</Badge>
      case "clicked":
        return <Badge className="bg-green-500">Đã nhấp</Badge>
      case "delivered":
        return <Badge variant="outline">Đã nhận</Badge>
      case "failed":
        return <Badge variant="destructive">Thất bại</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Phân khúc khách hàng</CardTitle>
            <CardDescription>Phân phối khách hàng theo phân khúc</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê đối tượng</CardTitle>
            <CardDescription>Thông tin tổng quan về đối tượng nhận tin nhắn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Tổng số người nhận</p>
                  <p className="text-2xl font-bold">{campaign.audience.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Đã gửi</p>
                  <p className="text-2xl font-bold">{campaign.sent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    ({Math.round((campaign.sent / campaign.audience) * 100)}%)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Đã mở</p>
                  <p className="text-2xl font-bold">{campaign.opened.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    ({Math.round((campaign.opened / campaign.sent) * 100)}%)
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Đã nhấp</p>
                  <p className="text-2xl font-bold">{campaign.clicked.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    ({Math.round((campaign.clicked / campaign.sent) * 100)}%)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
          <CardDescription>Danh sách khách hàng đã nhận tin nhắn trong chiến dịch này</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
