"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

export function WebhookEventTypeDistribution() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const eventTypes = [
    { name: "conversation.created", value: 35, color: "#3b82f6" },
    { name: "message.sent", value: 25, color: "#10b981" },
    { name: "customer.updated", value: 15, color: "#f59e0b" },
    { name: "campaign.completed", value: 12, color: "#8b5cf6" },
    { name: "customer.created", value: 8, color: "#ec4899" },
    { name: "Khác", value: 5, color: "#6b7280" },
  ]

  const total = eventTypes.reduce((sum, type) => sum + type.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân phối loại sự kiện</CardTitle>
        <CardDescription>Tỷ lệ các loại sự kiện webhook được gửi</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveChartContainer height={300}>
          <div className="flex h-full">
            <div className="flex-1 flex items-center justify-center">
              {/* Trong thực tế, đây sẽ là một biểu đồ tròn thực sự từ thư viện như Chart.js hoặc Recharts */}
              <div className="relative w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
                <div className="text-lg font-bold">100%</div>
                {/* Giả lập các phần của biểu đồ tròn */}
                {eventTypes.map((type, index) => {
                  const rotation =
                    index === 0 ? 0 : eventTypes.slice(0, index).reduce((sum, t) => sum + (t.value / total) * 360, 0)

                  return (
                    <div
                      key={type.name}
                      className="absolute top-0 left-0 w-full h-full"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((rotation + (type.value / total) * 180) * Math.PI) / 180)}% ${50 - 50 * Math.sin(((rotation + (type.value / total) * 180) * Math.PI) / 180)}%, ${50 + 50 * Math.cos((rotation * Math.PI) / 180)}% ${50 - 50 * Math.sin((rotation * Math.PI) / 180)}%)`,
                        backgroundColor: type.color,
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: "center",
                      }}
                    />
                  )
                })}
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                {eventTypes.map((type) => (
                  <div key={type.name} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: type.color }} />
                    <div className="flex-1 text-sm truncate">{type.name}</div>
                    <div className="text-sm font-medium">{type.value}%</div>
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
