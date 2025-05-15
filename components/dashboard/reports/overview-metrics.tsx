"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, MessageSquare, Users, Clock, CheckCircle } from "lucide-react"

export default function OverviewMetrics() {
  const metrics = [
    {
      title: "Tổng tin nhắn",
      value: "12,486",
      change: "+12.5%",
      trend: "up",
      description: "so với kỳ trước",
      icon: MessageSquare,
    },
    {
      title: "Khách hàng tương tác",
      value: "3,842",
      change: "+8.2%",
      trend: "up",
      description: "so với kỳ trước",
      icon: Users,
    },
    {
      title: "Thời gian phản hồi TB",
      value: "4.8 phút",
      change: "-15.3%",
      trend: "down",
      description: "so với kỳ trước",
      icon: Clock,
    },
    {
      title: "Tỷ lệ giải quyết",
      value: "94.7%",
      change: "+2.1%",
      trend: "up",
      description: "so với kỳ trước",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div
              className={`flex items-center text-xs ${metric.trend === "up" ? "text-green-500" : "text-red-500"} mt-1`}
            >
              {metric.trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              <span>
                {metric.change} {metric.description}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
