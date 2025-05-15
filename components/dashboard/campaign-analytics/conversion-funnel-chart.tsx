"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ConversionFunnelChartProps {
  selectedCampaigns: string[]
}

export function ConversionFunnelChart({ selectedCampaigns }: ConversionFunnelChartProps) {
  // Giả lập dữ liệu - trong thực tế sẽ lấy từ API dựa trên selectedCampaigns
  const funnelData = [
    { stage: "Tiếp cận", value: 100000, percent: "100%" },
    { stage: "Mở", value: 32000, percent: "32%" },
    { stage: "Nhấp chuột", value: 4800, percent: "4.8%" },
    { stage: "Xem trang đích", value: 3600, percent: "3.6%" },
    { stage: "Chuyển đổi", value: 1200, percent: "1.2%" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phễu chuyển đổi</CardTitle>
        <CardDescription>Phân tích tỷ lệ chuyển đổi qua các giai đoạn của chiến dịch</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelData.map((stage, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{stage.stage}</span>
                <div className="text-sm text-right">
                  <span className="font-medium">{stage.value.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-2">({stage.percent})</span>
                </div>
              </div>
              <div className="h-8 w-full rounded-md bg-gray-100 overflow-hidden relative">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: stage.percent,
                    opacity: 1 - index * 0.15,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
