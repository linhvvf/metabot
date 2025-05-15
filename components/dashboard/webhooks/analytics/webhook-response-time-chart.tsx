"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

export function WebhookResponseTimeChart() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const chartData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        label: "Thời gian phản hồi trung bình (ms)",
        data: [245, 238, 252, 230, 260, 242, 235],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thời gian phản hồi</CardTitle>
        <CardDescription>Thời gian phản hồi trung bình của webhook theo thời gian (ms)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveChartContainer height={300}>
          <div className="h-full w-full">
            {/* Trong thực tế, đây sẽ là một biểu đồ thực sự từ thư viện như Chart.js hoặc Recharts */}
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="text-sm text-muted-foreground">Biểu đồ thời gian phản hồi webhook</div>
              <div className="mt-2 grid grid-cols-7 gap-1 w-full px-4">
                {chartData.datasets[0].data.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-blue-500 w-full"
                      style={{
                        height: `${value / 5}px`,
                      }}
                    ></div>
                    <div className="text-xs mt-1">{chartData.labels[index]}</div>
                    <div className="text-xs font-medium">{value} ms</div>
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
