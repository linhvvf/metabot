"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OptimizedChart } from "@/components/ui/optimized-chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApiQuery } from "@/lib/api-client"
import { Skeleton } from "@/components/ui/skeleton"

export function OptimizedCharts() {
  const [activeTab, setActiveTab] = useState("daily")

  // Sử dụng API client tối ưu với caching
  const { data, isLoading } = useApiQuery<any>(
    "/reports/charts",
    { period: activeTab },
    { cacheTime: 5 * 60 * 1000 }, // Cache 5 phút
  )

  // Dữ liệu mẫu khi không có data
  const sampleData = {
    messageVolume: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      datasets: [
        {
          label: "Tin nhắn đến",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "Tin nhắn đi",
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    },
    responseTime: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      datasets: [
        {
          label: "Thời gian phản hồi (phút)",
          data: [12, 19, 3, 5, 2, 3, 9],
        },
      ],
    },
  }

  // Sử dụng dữ liệu từ API hoặc dữ liệu mẫu
  const chartData = data || sampleData

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="daily">Hàng ngày</TabsTrigger>
          <TabsTrigger value="weekly">Hàng tuần</TabsTrigger>
          <TabsTrigger value="monthly">Hàng tháng</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lượng tin nhắn</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <OptimizedChart type="line" data={chartData.messageVolume} height={300} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thời gian phản hồi</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <OptimizedChart type="bar" data={chartData.responseTime} height={300} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
