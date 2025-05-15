"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function CustomerSatisfactionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mức độ hài lòng của khách hàng</CardTitle>
        <CardDescription>Đánh giá của khách hàng sau khi kết thúc hội thoại</CardDescription>
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
            src="/customer-satisfaction-donut-chart.png"
            alt="Biểu đồ mức độ hài lòng của khách hàng"
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto"></div>
            <p className="text-sm font-medium text-gray-500 mt-1">Rất hài lòng</p>
            <p className="text-lg font-bold">68%</p>
          </div>
          <div>
            <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto"></div>
            <p className="text-sm font-medium text-gray-500 mt-1">Hài lòng</p>
            <p className="text-lg font-bold">22%</p>
          </div>
          <div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto"></div>
            <p className="text-sm font-medium text-gray-500 mt-1">Trung bình</p>
            <p className="text-lg font-bold">7%</p>
          </div>
          <div>
            <div className="w-3 h-3 bg-red-500 rounded-full mx-auto"></div>
            <p className="text-sm font-medium text-gray-500 mt-1">Không hài lòng</p>
            <p className="text-lg font-bold">3%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
