"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function TagUsageStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê sử dụng thẻ</CardTitle>
        <CardDescription>Phân tích mức độ sử dụng thẻ trong hệ thống</CardDescription>
        <Tabs defaultValue="30days" className="mt-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="7days">7 ngày</TabsTrigger>
            <TabsTrigger value="30days">30 ngày</TabsTrigger>
            <TabsTrigger value="90days">90 ngày</TabsTrigger>
            <TabsTrigger value="year">Năm</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          <Image
            src="/placeholder.svg?height=300&width=600&query=bar chart showing tag usage statistics"
            alt="Biểu đồ thống kê sử dụng thẻ"
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Tổng số thẻ</p>
            <p className="text-xl font-bold">124</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Thẻ đang hoạt động</p>
            <p className="text-xl font-bold">98</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Thẻ phổ biến nhất</p>
            <p className="text-xl font-bold">VIP</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Thẻ mới trong tháng</p>
            <p className="text-xl font-bold">12</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
