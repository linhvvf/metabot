"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ApiResponseTimeChartProps {
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

export default function ApiResponseTimeChart({ dateRange, filters }: ApiResponseTimeChartProps) {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const data = [
    { time: "00:00", p50: 120, p90: 180, p99: 250 },
    { time: "02:00", p50: 132, p90: 190, p99: 270 },
    { time: "04:00", p50: 101, p90: 150, p99: 230 },
    { time: "06:00", p50: 134, p90: 200, p99: 290 },
    { time: "08:00", p50: 190, p90: 280, p99: 390 },
    { time: "10:00", p50: 230, p90: 340, p99: 460 },
    { time: "12:00", p50: 220, p90: 330, p99: 440 },
    { time: "14:00", p50: 210, p90: 310, p99: 420 },
    { time: "16:00", p50: 190, p90: 290, p99: 400 },
    { time: "18:00", p50: 180, p90: 270, p99: 380 },
    { time: "20:00", p50: 170, p90: 250, p99: 350 },
    { time: "22:00", p50: 150, p90: 230, p99: 320 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thời gian phản hồi API</CardTitle>
        <CardDescription>Thời gian phản hồi trung bình theo phân vị (ms)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            p50: {
              label: "P50 (Trung vị)",
              color: "hsl(var(--chart-1))",
            },
            p90: {
              label: "P90",
              color: "hsl(var(--chart-2))",
            },
            p99: {
              label: "P99",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="p50"
                stroke="var(--color-p50)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="p90"
                stroke="var(--color-p90)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="p99"
                stroke="var(--color-p99)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
