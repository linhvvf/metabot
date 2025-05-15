"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

export function WebhookLatencyDistribution() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const latencyRanges = [
    { range: "< 100ms", count: 3245, percentage: 20 },
    { range: "100-200ms", count: 6578, percentage: 42 },
    { range: "200-300ms", count: 3890, percentage: 25 },
    { range: "300-500ms", count: 1560, percentage: 10 },
    { range: "> 500ms", count: 569, percentage: 3 },
  ]

  const maxPercentage = Math.max(...latencyRanges.map((r) => r.percentage))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân phối độ trễ</CardTitle>
        <CardDescription>Phân phối thời gian phản hồi của webhook</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveChartContainer height={300}>
          <div className="h-full w-full">
            <div className="flex flex-col h-full justify-end">
              <div className="grid grid-cols-5 gap-2 h-[200px]">
                {latencyRanges.map((range) => (
                  <div key={range.range} className="flex flex-col items-center justify-end">
                    <div
                      className="w-full bg-blue-500 rounded-t-sm"
                      style={{
                        height: `${(range.percentage / maxPercentage) * 100}%`,
                        opacity: range.range === "> 500ms" ? 0.7 : range.range === "300-500ms" ? 0.8 : 1,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {latencyRanges.map((range) => (
                  <div key={range.range} className="flex flex-col items-center">
                    <div className="text-xs">{range.range}</div>
                    <div className="text-xs font-medium">{range.percentage}%</div>
                    <div className="text-xs text-muted-foreground">({range.count})</div>
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
