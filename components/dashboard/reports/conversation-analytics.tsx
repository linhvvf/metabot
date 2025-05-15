"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function ConversationAnalytics() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Phân bố hội thoại</CardTitle>
            <CardDescription>Phân bố hội thoại theo trạng thái</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] relative">
              <Image
                src="/conversation-distribution-donut-chart.png"
                alt="Biểu đồ phân bố hội thoại"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Đã giải quyết</span>
                </div>
                <span className="font-medium">2,845</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">Đang xử lý</span>
                </div>
                <span className="font-medium">421</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Bị bỏ qua</span>
                </div>
                <span className="font-medium">124</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thời lượng hội thoại</CardTitle>
            <CardDescription>Thời gian trung bình của hội thoại</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] relative">
              <Image
                src="/conversation-duration-distribution.png"
                alt="Biểu đồ thời lượng hội thoại"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Thời lượng TB</span>
                <span className="font-medium">18 phút</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hội thoại ngắn nhất</span>
                <span className="font-medium">45 giây</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hội thoại dài nhất</span>
                <span className="font-medium">2.5 giờ</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tin nhắn mỗi hội thoại</CardTitle>
            <CardDescription>Số lượng tin nhắn trung bình mỗi hội thoại</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] relative">
              <Image
                src="/messages-per-conversation-line-chart.png"
                alt="Biểu đồ tin nhắn mỗi hội thoại"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tin nhắn TB/Hội thoại</span>
                <span className="font-medium">8.4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tin nhắn khách hàng</span>
                <span className="font-medium">3.7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tin nhắn nhân viên</span>
                <span className="font-medium">4.7</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Phân tích nội dung hội thoại</CardTitle>
          <CardDescription>Các chủ đề và từ khóa phổ biến trong hội thoại</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-4">Chủ đề phổ biến</h3>
              <div className="h-[300px] relative">
                <Image src="/popular-conversation-topics.png" alt="Biểu đồ chủ đề phổ biến" fill className="object-contain" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Phân loại hội thoại</h3>
              <div className="h-[300px] relative">
                <Image
                  src="/conversation-categories-pie-chart.png"
                  alt="Biểu đồ phân loại hội thoại"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Hỗ trợ kỹ thuật
                  </Badge>
                  <p className="text-lg font-bold mt-1">42%</p>
                </div>
                <div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Thông tin sản phẩm
                  </Badge>
                  <p className="text-lg font-bold mt-1">28%</p>
                </div>
                <div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Khiếu nại
                  </Badge>
                  <p className="text-lg font-bold mt-1">15%</p>
                </div>
                <div>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">
                    Khác
                  </Badge>
                  <p className="text-lg font-bold mt-1">15%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Xu hướng hội thoại theo thời gian</CardTitle>
          <CardDescription>Số lượng hội thoại theo ngày và trạng thái</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] relative">
            <Image src="/conversation-trends-chart.png" alt="Biểu đồ xu hướng hội thoại" fill className="object-contain" />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
