"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle } from "lucide-react"
import Image from "next/image"

export function CustomerEngagementTrends() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Xu hướng tương tác khách hàng</CardTitle>
            <CardDescription>Phân tích xu hướng tương tác của khách hàng trong 90 ngày qua</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Tăng 12.5%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement-rate">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="engagement-rate">Tỷ lệ tương tác</TabsTrigger>
            <TabsTrigger value="response-time">Thời gian phản hồi</TabsTrigger>
            <TabsTrigger value="session-duration">Thời lượng phiên</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement-rate">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/customer-engagement-trend-chart.png"
                alt="Biểu đồ xu hướng tỷ lệ tương tác khách hàng"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Tỷ lệ tương tác hiện tại</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">24.8%</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    12.5%
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Tỷ lệ tương tác trung bình</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">18.3%</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Dự đoán tháng tới</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">26.2%</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    5.6%
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phân tích xu hướng</p>
                <p className="text-sm text-muted-foreground">
                  Tỷ lệ tương tác đang tăng đều đặn trong 3 tháng qua. Chiến dịch khuyến mãi vào tháng 7 đã tạo ra đỉnh
                  tương tác cao nhất. Dự đoán tỷ lệ tương tác sẽ tiếp tục tăng trong tháng tới.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="response-time">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/response-time-trend-chart.png"
                alt="Biểu đồ xu hướng thời gian phản hồi"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Thời gian phản hồi hiện tại</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">4.2 phút</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    18.3%
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Thời gian phản hồi trung bình</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">5.8 phút</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Dự đoán tháng tới</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">3.9 phút</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    7.1%
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phân tích xu hướng</p>
                <p className="text-sm text-muted-foreground">
                  Thời gian phản hồi đã giảm đáng kể sau khi triển khai hệ thống AI gợi ý trả lời vào tháng 6. Dự đoán
                  thời gian phản hồi sẽ tiếp tục giảm nhẹ trong tháng tới.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="session-duration">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/session-duration-trend-chart.png"
                alt="Biểu đồ xu hướng thời lượng phiên"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Thời lượng phiên hiện tại</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">8.3 phút</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    9.2%
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Thời lượng phiên trung bình</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">7.1 phút</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Dự đoán tháng tới</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">8.7 phút</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    4.8%
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phân tích xu hướng</p>
                <p className="text-sm text-muted-foreground">
                  Thời lượng phiên đang tăng dần, cho thấy khách hàng tương tác sâu hơn với nội dung. Có sự tương quan
                  giữa thời lượng phiên dài hơn và tỷ lệ chuyển đổi cao hơn.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
