"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react"

interface ApiPerformanceMetricsProps {
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

export default function ApiPerformanceMetrics({ dateRange, filters }: ApiPerformanceMetricsProps) {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const metrics = [
    {
      title: "Thời gian phản hồi TB",
      value: "187ms",
      description: "12% thấp hơn tuần trước",
      trend: "down",
    },
    {
      title: "Tỷ lệ thành công",
      value: "99.8%",
      description: "0.2% cao hơn tuần trước",
      trend: "up",
    },
    {
      title: "Tổng số yêu cầu",
      value: "1.2M",
      description: "8% cao hơn tuần trước",
      trend: "up",
    },
    {
      title: "Thời gian hoạt động",
      value: "99.99%",
      description: "Không thay đổi so với tuần trước",
      trend: "neutral",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            {metric.trend === "up" && <ArrowUpIcon className="h-4 w-4 text-emerald-500" />}
            {metric.trend === "down" && <ArrowDownIcon className="h-4 w-4 text-emerald-500" />}
            {metric.trend === "neutral" && <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
