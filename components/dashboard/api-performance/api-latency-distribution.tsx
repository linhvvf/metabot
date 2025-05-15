"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ApiLatencyDistributionProps {
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

export default function ApiLatencyDistribution({ dateRange, filters }: ApiLatencyDistributionProps) {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const data = [
    { range: "0-50ms", count: 32 },
    { range: "50-100ms", count: 28 },
    { range: "100-200ms", count: 18 },
    { range: "200-300ms", count: 12 },
    { range: "300-500ms", count: 6 },
    { range: "500ms-1s", count: 3 },
    { range: ">1s", count: 1 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân phối độ trễ</CardTitle>
        <CardDescription>Phân phối thời gian phản hồi API theo khoảng thời gian</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "Phần trăm yêu cầu",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="count" fill="var(--color-count)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
