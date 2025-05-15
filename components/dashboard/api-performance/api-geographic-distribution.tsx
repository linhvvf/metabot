"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

interface ApiGeographicDistributionProps {
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

export default function ApiGeographicDistribution({ dateRange, filters }: ApiGeographicDistributionProps) {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const data = [
    { region: "Việt Nam", requests: 680000, avgLatency: 120 },
    { region: "Singapore", requests: 240000, avgLatency: 180 },
    { region: "Nhật Bản", requests: 120000, avgLatency: 220 },
    { region: "Hàn Quốc", requests: 85000, avgLatency: 210 },
    { region: "Hoa Kỳ", requests: 65000, avgLatency: 320 },
    { region: "Châu Âu", requests: 45000, avgLatency: 350 },
    { region: "Úc", requests: 25000, avgLatency: 280 },
    { region: "Khác", requests: 40000, avgLatency: 290 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân phối địa lý</CardTitle>
        <CardDescription>Số lượng yêu cầu và độ trễ trung bình theo khu vực địa lý</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            requests: {
              label: "Số lượng yêu cầu",
              color: "hsl(var(--chart-1))",
            },
            avgLatency: {
              label: "Băng thông",
            },
          }}
        ></ChartContainer>
      </CardContent>
    </Card>
  )
}
