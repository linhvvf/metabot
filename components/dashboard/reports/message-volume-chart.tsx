"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ResponsiveChartContainer } from "@/components/ui/responsive-chart-container"

export default function MessageVolumeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lượng tin nhắn</CardTitle>
        <CardDescription>Số lượng tin nhắn theo thời gian</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveChartContainer aspectRatio={16 / 9} mobileAspectRatio={4 / 3}>
          <Tabs defaultValue="30days" className="mt-2">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="7days">7 ngày</TabsTrigger>
              <TabsTrigger value="30days">30 ngày</TabsTrigger>
              <TabsTrigger value="90days">90 ngày</TabsTrigger>
              <TabsTrigger value="year">Năm</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="h-[300px] relative">
            <Image
              src="/message-volume-chart.png"
              alt="Biểu đồ lượng tin nhắn theo thời gian"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng tin nhắn</p>
              <p className="text-xl font-bold">12,486</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tin nhắn nhận</p>
              <p className="text-xl font-bold">6,241</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tin nhắn gửi</p>
              <p className="text-xl font-bold">6,245</p>
            </div>
          </div>
        </ResponsiveChartContainer>
      </CardContent>
    </Card>
  )
}
