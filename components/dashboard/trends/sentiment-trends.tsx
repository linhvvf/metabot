"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SentimentTrends() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Xu hướng cảm xúc khách hàng</CardTitle>
            <CardDescription>Phân tích xu hướng cảm xúc khách hàng trong 90 ngày qua</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Tích cực +5.2%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overall">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overall">Tổng quan</TabsTrigger>
            <TabsTrigger value="by-channel">Theo kênh</TabsTrigger>
            <TabsTrigger value="by-topic">Theo chủ đề</TabsTrigger>
          </TabsList>
          <TabsContent value="overall">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/sentiment-trend-chart.png"
                alt="Biểu đồ xu hướng cảm xúc khách hàng"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Cảm xúc tích cực</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">68.5%</p>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    5.2%
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Cảm xúc trung tính</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">22.3%</p>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    3.7%
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Cảm xúc tiêu cực</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">9.2%</p>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    1.5%
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="by-channel">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/sentiment-by-channel-chart.png"
                alt="Biểu đồ xu hướng cảm xúc theo kênh"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                  <span className="text-sm font-medium">Zalo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">72.5% tích cực</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    6.8%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-indigo-500"></span>
                  <span className="text-sm font-medium">Facebook Messenger</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">65.2% tích cực</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    3.1%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium">WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">70.8% tích cực</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    4.5%
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="by-topic">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/sentiment-by-topic-chart.png"
                alt="Biểu đồ xu hướng cảm xúc theo chủ đề"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">Sản phẩm mới</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">82.5% tích cực</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    9.3%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
                    Hỗ trợ kỹ thuật
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">58.7% tích cực</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    2.1%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                    Khuyến mãi
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">75.3% tích cực</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    5.7%
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
              Cảm xúc tích cực đang tăng đều đặn trong 3 tháng qua, đặc biệt là đối với chủ đề "Sản phẩm mới" và trên
              kênh Zalo. Cải thiện thời gian phản hồi và chất lượng hỗ trợ kỹ thuật đã góp phần làm giảm cảm xúc tiêu
              cực. Dự đoán cảm xúc tích cực sẽ tiếp tục tăng trong tháng tới.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
