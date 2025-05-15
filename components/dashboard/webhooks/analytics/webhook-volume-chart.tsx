"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function WebhookVolumeChart() {
  const [period, setPeriod] = useState("daily")

  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const dailyData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    values: [320, 280, 950, 1100, 980, 760],
  }

  const weeklyData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    values: [2200, 2350, 2100, 2500, 2700, 1800, 1500],
  }

  const monthlyData = {
    labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    values: [8500, 9200, 10100, 9700],
  }

  const data = period === "daily" ? dailyData : period === "weekly" ? weeklyData : monthlyData

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Khối lượng Webhook</CardTitle>
            <CardDescription>Số lượng webhook được gửi theo thời gian</CardDescription>
          </div>
          <Tabs value={period} onValueChange={setPeriod} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Ngày</TabsTrigger>
              <TabsTrigger value="weekly">Tuần</TabsTrigger>
              <TabsTrigger value="monthly">Tháng</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveChartContainer height={350}>
          <div className="h-full w-full">
            {/* Trong thực tế, đây sẽ là một biểu đồ thực sự từ thư viện như Chart.js hoặc Recharts */}
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="text-sm text-muted-foreground">Biểu đồ khối lượng webhook</div>
              <div
                className="mt-2 grid gap-2 w-full px-4"
                style={{ gridTemplateColumns: `repeat(${data.labels.length}, 1fr)` }}
              >
                {data.values.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-purple-500 w-full"
                      style={{
                        height: `${value / 30}px`,
                      }}
                    ></div>
                    <div className="text-xs mt-1">{data.labels[index]}</div>
                    <div className="text-xs font-medium">{value.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResponsiveChartContainer>
      </CardContent>
    </Card>
  )
}
