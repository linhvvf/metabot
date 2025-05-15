"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface ApiStatusCodeDistributionProps {
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

export default function ApiStatusCodeDistribution({ dateRange, filters }: ApiStatusCodeDistributionProps) {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const data = [
    { name: "200 OK", value: 85.2 },
    { name: "201 Created", value: 10.5 },
    { name: "400 Bad Request", value: 2.1 },
    { name: "401 Unauthorized", value: 0.8 },
    { name: "404 Not Found", value: 0.7 },
    { name: "429 Too Many Requests", value: 0.4 },
    { name: "500 Server Error", value: 0.3 },
  ]

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--destructive))",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân phối mã trạng thái</CardTitle>
        <CardDescription>Tỷ lệ phần trăm của các mã trạng thái HTTP</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
