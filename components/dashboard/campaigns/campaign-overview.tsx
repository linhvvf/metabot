"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface CampaignOverviewProps {
  campaign: any
}

export default function CampaignOverview({ campaign }: CampaignOverviewProps) {
  // Dữ liệu mẫu cho biểu đồ hiệu suất
  const performanceData = [
    { name: "Đã gửi", value: campaign.sent },
    { name: "Đã nhận", value: campaign.delivered },
    { name: "Đã mở", value: campaign.opened },
    { name: "Đã nhấp", value: campaign.clicked },
  ]

  // Dữ liệu mẫu cho biểu đồ tương tác theo ngày
  const dailyData = [
    { name: "01/06", opened: 45, clicked: 20 },
    { name: "02/06", opened: 52, clicked: 23 },
    { name: "03/06", opened: 48, clicked: 25 },
    { name: "04/06", opened: 70, clicked: 40 },
    { name: "05/06", opened: 60, clicked: 35 },
    { name: "06/06", opened: 85, clicked: 50 },
    { name: "07/06", opened: 75, clicked: 42 },
  ]

  // Dữ liệu mẫu cho biểu đồ phân phối thiết bị
  const deviceData = [
    { name: "Di động", value: 65 },
    { name: "Máy tính", value: 25 },
    { name: "Tablet", value: 10 },
  ]

  // Màu sắc cho biểu đồ tròn
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Hiệu suất chiến dịch</CardTitle>
          <CardDescription>Số lượng tin nhắn đã gửi, đã nhận, đã mở và đã nhấp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={performanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tương tác theo ngày</CardTitle>
          <CardDescription>Số lượng tin nhắn đã mở và đã nhấp theo ngày</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dailyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="opened" fill="#3b82f6" name="Đã mở" />
                <Bar dataKey="clicked" fill="#10b981" name="Đã nhấp" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phân phối thiết bị</CardTitle>
          <CardDescription>Tỷ lệ người dùng mở tin nhắn theo loại thiết bị</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
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
    </div>
  )
}
