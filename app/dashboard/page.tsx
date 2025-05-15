"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, ArrowUpRight, ArrowDownRight, Clock, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Xem tổng quan về hoạt động của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Xuất báo cáo</Button>
          <Button>Tạo chiến dịch mới</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng tin nhắn</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+12.5% so với tuần trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+8.2% so với tuần trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thời gian phản hồi</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2 phút</div>
            <div className="flex items-center text-xs text-red-500 mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>+1.5 phút so với tuần trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ giải quyết</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.4%</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+2.1% so với tuần trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích</TabsTrigger>
          <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Hoạt động theo kênh</CardTitle>
                <CardDescription>Số lượng tin nhắn theo từng kênh trong 30 ngày qua</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] relative">
                  <Image
                    src="/placeholder.svg?height=300&width=600&query=bar chart showing message activity by channel"
                    alt="Biểu đồ hoạt động theo kênh"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Phân bổ khách hàng</CardTitle>
                <CardDescription>Phân bổ khách hàng theo kênh liên lạc</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] relative">
                  <Image
                    src="/placeholder.svg?height=300&width=400&query=pie chart showing customer distribution by channel"
                    alt="Biểu đồ phân bổ khách hàng"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Tin nhắn gần đây</CardTitle>
                <CardDescription>Các cuộc hội thoại mới nhất từ khách hàng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative">
                        <Image
                          src={`/placeholder.svg?height=40&width=40&query=user avatar ${i}`}
                          alt="Avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Khách hàng {i}</p>
                          <span className="text-xs text-gray-500">12:3{i} PM</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          Tôi muốn biết thêm về dịch vụ của công ty bạn. Bạn có thể tư vấn giúp tôi không?
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Zalo</span>
                          <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
                            Chưa xử lý
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất nhân viên</CardTitle>
                <CardDescription>Xếp hạng nhân viên theo số lượng hội thoại đã xử lý</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative">
                          <Image
                            src={`/placeholder.svg?height=32&width=32&query=employee avatar ${i}`}
                            alt="Avatar"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Nhân viên {i}</p>
                          <p className="text-xs text-gray-500">{120 - i * 10} tin nhắn</p>
                        </div>
                      </div>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${100 - i * 15}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
