"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ApiRequestVolumeChartProps {
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

export default function ApiRequestVolumeChart({ dateRange, filters }: ApiRequestVolumeChartProps) {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const data = [
    { time: "00:00", success: 8500, error: 120 },
    { time: "02:00", success: 5200, error: 80 },
    { time: "04:00", success: 4000, error: 60 },
    { time: "06:00", success: 6800, error: 90 },
    { time: "08:00", success: 12000, error: 150 },
    { time: "10:00", success: 16500, error: 200 },
    { time: "12:00", success: 14800, error: 180 },
    { time: "14:00", success: 15200, error: 190 },
    { time: "16:00", success: 13800, error: 170 },
    { time: "18:00", success: 11500, error: 140 },
    { time: "20:00", success: 10200, error: 130 },
    { time: "22:00", success: 9000, error: 110 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Số lượng yêu cầu API</CardTitle>
        <CardDescription>Số lượng yêu cầu thành công và thất bại theo thời gian</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            success: {
              label: "Thành công",
              color: "hsl(var(--chart-1))",
            },
            error: {
              label: "Lỗi",
              color: "hsl(var(--destructive))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="success" stackId="a" fill="var(--color-success)" />
              <Bar dataKey="error" stackId="a" fill="var(--color-error)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
