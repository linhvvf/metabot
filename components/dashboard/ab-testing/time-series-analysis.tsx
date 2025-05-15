"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface TimeSeriesAnalysisProps {
  tests: any[]
}

export default function TimeSeriesAnalysis({ tests }: TimeSeriesAnalysisProps) {
  const [selectedMetric, setSelectedMetric] = useState("conversion_rate")
  const [timeFrame, setTimeFrame] = useState("daily")

  // Hàm lấy hình ảnh biểu đồ dựa trên loại chỉ số
  const getChartImage = (metric: string) => {
    switch (metric) {
      case "open_rate":
        return "/customer-engagement-trend-chart.png"
      case "click_rate":
        return "/response-time-trend-chart.png"
      case "conversion_rate":
        return "/campaign-conversion-trend-chart.png"
      case "response_rate":
        return "/session-duration-trend-chart.png"
      default:
        return "/customer-engagement-trend-chart.png"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Phân tích theo thời gian</CardTitle>
          <CardDescription>So sánh hiệu suất của các phiên bản theo thời gian</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn chỉ số" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open_rate">Tỷ lệ mở</SelectItem>
              <SelectItem value="click_rate">Tỷ lệ nhấp chuột</SelectItem>
              <SelectItem value="conversion_rate">Tỷ lệ chuyển đổi</SelectItem>
              <SelectItem value="response_rate">Tỷ lệ phản hồi</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Theo giờ</SelectItem>
              <SelectItem value="daily">Theo ngày</SelectItem>
              <SelectItem value="weekly">Theo tuần</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={tests[0]?.id} className="w-full">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tests.length}, 1fr)` }}>
            {tests.map((test) => (
              <TabsTrigger key={test.id} value={test.id}>
                {test.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {tests.map((test) => (
            <TabsContent key={test.id} value={test.id} className="pt-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image
                  src={getChartImage(selectedMetric) || "/placeholder.svg"}
                  alt={`Biểu đồ phân tích theo thời gian cho ${test.name}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  <strong>Phân tích:</strong> Biểu đồ trên hiển thị hiệu suất của các phiên bản theo thời gian. Có thể
                  thấy phiên bản B có xu hướng cải thiện hiệu suất theo thời gian, trong khi phiên bản A duy trì hiệu
                  suất ổn định. Điều này có thể do người dùng dần quen thuộc hơn với nội dung của phiên bản B.
                </p>
                <p className="mt-2">
                  <strong>Đề xuất:</strong> Nên tiếp tục theo dõi hiệu suất của phiên bản B trong thời gian dài hơn để
                  xác nhận xu hướng cải thiện này có bền vững hay không.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
