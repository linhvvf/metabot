"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function WebhookSuccessRateChart() {
  const [view, setView] = useState("line")

  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const chartData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        label: "Tỷ lệ thành công",
        data: [97.8, 98.2, 99.1, 98.5, 97.9, 99.3, 98.7],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
      },
    ],
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tỷ lệ thành công</CardTitle>
            <CardDescription>Phần trăm webhook được gửi thành công theo thời gian</CardDescription>
          </div>
          <Tabs value={view} onValueChange={setView} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="line">Đường</TabsTrigger>
              <TabsTrigger value="bar">Cột</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveChartContainer height={300}>
          <div className="h-full w-full">
            {/* Trong thực tế, đây sẽ là một biểu đồ thực sự từ thư viện như Chart.js hoặc Recharts */}
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="text-sm text-muted-foreground">Biểu đồ tỷ lệ thành công webhook</div>
              <div className="mt-2 grid grid-cols-7 gap-1 w-full px-4">
                {chartData.datasets[0].data.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-green-500 w-full"
                      style={{
                        height: `${(value - 95) * 20}px`,
                        opacity: view === "bar" ? 1 : 0.5,
                      }}
                    ></div>
                    <div className="text-xs mt-1">{chartData.labels[index]}</div>
                    <div className="text-xs font-medium">{value}%</div>
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
