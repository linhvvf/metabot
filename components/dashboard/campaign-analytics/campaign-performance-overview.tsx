"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Users, Mail, MousePointer, ShoppingCart } from "lucide-react"

interface CampaignPerformanceOverviewProps {
  selectedCampaigns: string[]
}

export function CampaignPerformanceOverview({ selectedCampaigns }: CampaignPerformanceOverviewProps) {
  // Giả lập dữ liệu - trong thực tế sẽ lấy từ API dựa trên selectedCampaigns
  const metrics = [
    {
      title: "Tổng tiếp cận",
      value: "245,721",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Tỷ lệ mở",
      value: "32.8%",
      change: "+5.2%",
      trend: "up",
      icon: Mail,
    },
    {
      title: "Tỷ lệ nhấp chuột",
      value: "4.6%",
      change: "-0.8%",
      trend: "down",
      icon: MousePointer,
    },
    {
      title: "Tỷ lệ chuyển đổi",
      value: "2.3%",
      change: "+1.1%",
      trend: "up",
      icon: ShoppingCart,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {metric.trend === "up" ? (
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span> so với
              kỳ trước
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
