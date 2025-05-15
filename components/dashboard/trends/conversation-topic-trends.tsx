"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertCircle } from "lucide-react"
import Image from "next/image"

export function ConversationTopicTrends() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Xu hướng chủ đề hội thoại</CardTitle>
            <CardDescription>Phân tích xu hướng chủ đề hội thoại của khách hàng trong 90 ngày qua</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Đang thay đổi
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Xu hướng chủ đề theo thời gian</h3>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/conversation-topic-trend-chart.png"
                alt="Biểu đồ xu hướng chủ đề hội thoại"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Chủ đề nổi bật hiện tại</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">Sản phẩm mới</Badge>
                  <span className="text-sm">28.5%</span>
                </div>
                <Badge variant="outline" className="text-green-600">
                  +12.3%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
                    Hỗ trợ kỹ thuật
                  </Badge>
                  <span className="text-sm">22.1%</span>
                </div>
                <Badge variant="outline" className="text-red-600">
                  -3.7%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                    Khuyến mãi
                  </Badge>
                  <span className="text-sm">18.4%</span>
                </div>
                <Badge variant="outline" className="text-green-600">
                  +5.2%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800">
                    Đặt hàng
                  </Badge>
                  <span className="text-sm">15.7%</span>
                </div>
                <Badge variant="outline" className="text-green-600">
                  +2.8%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800">
                    Phản hồi
                  </Badge>
                  <span className="text-sm">9.3%</span>
                </div>
                <Badge variant="outline" className="text-red-600">
                  -1.5%
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Chủ đề mới nổi</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1 py-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              Chương trình thành viên
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              Ứng dụng di động
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              Thanh toán không tiền mặt
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              Giao hàng nhanh
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              Sản phẩm xanh
            </Badge>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted rounded-md flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Phân tích xu hướng</p>
            <p className="text-sm text-muted-foreground">
              Chủ đề "Sản phẩm mới" đang tăng mạnh, phản ánh sự quan tâm của khách hàng đến dòng sản phẩm mới ra mắt.
              Các chủ đề mới nổi như "Chương trình thành viên" và "Ứng dụng di động" cho thấy khách hàng đang quan tâm
              đến trải nghiệm tích hợp hơn.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
