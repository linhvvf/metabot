"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertCircle, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CampaignPerformanceTrends() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Xu hướng hiệu suất chiến dịch</CardTitle>
            <CardDescription>Phân tích xu hướng hiệu suất chiến dịch marketing trong 90 ngày qua</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Tăng 8.7%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conversion">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="conversion">Tỷ lệ chuyển đổi</TabsTrigger>
            <TabsTrigger value="engagement">Tương tác</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
          </TabsList>
          <TabsContent value="conversion">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/campaign-conversion-trend-chart.png"
                alt="Biểu đồ xu hướng tỷ lệ chuyển đổi chiến dịch"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Tỷ lệ chuyển đổi hiện tại</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">5.8%</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    8.7%
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Tỷ lệ chuyển đổi trung bình</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">4.2%</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Dự đoán tháng tới</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">6.3%</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    8.6%
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="engagement">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/campaign-engagement-trend-chart.png"
                alt="Biểu đồ xu hướng tương tác chiến dịch"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Tỷ lệ tương tác hiện tại</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">18.3%</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    12.4%
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Tỷ lệ tương tác trung bình</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">14.7%</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Dự đoán tháng tới</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">19.5%</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    6.6%
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="roi">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/campaign-roi-trend-chart.png"
                alt="Biểu đồ xu hướng ROI chiến dịch"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">ROI hiện tại</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">320%</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    15.2%
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">ROI trung bình</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">280%</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Dự đoán tháng tới</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">345%</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    7.8%
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-3 bg-muted rounded-md flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Phân tích xu hướng</p>
            <p className="text-sm text-muted-foreground">
              Hiệu suất chiến dịch đang cải thiện đều đặn trong 3 tháng qua. Chiến dịch cá nhân hóa có hiệu suất cao
              nhất, với tỷ lệ chuyển đổi cao hơn 35% so với chiến dịch thông thường. Dự đoán ROI sẽ tiếp tục tăng nhờ
              vào việc tối ưu hóa nội dung và phân khúc khách hàng.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
