"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function ResponseTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thời gian phản hồi</CardTitle>
        <CardDescription>Thời gian phản hồi trung bình theo ngày</CardDescription>
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
          <Image src="/response-time-line-chart.png" alt="Biểu đồ thời gian phản hồi" fill className="object-contain" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Thời gian TB</p>
            <p className="text-xl font-bold">4.8 phút</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Nhanh nhất</p>
            <p className="text-xl font-bold">30 giây</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Chậm nhất</p>
            <p className="text-xl font-bold">24 phút</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
