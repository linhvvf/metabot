"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Image from "next/image"

export function ChannelUsageTrends() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Xu hướng kênh liên lạc</CardTitle>
            <CardDescription>Phân tích xu hướng sử dụng kênh liên lạc trong 90 ngày qua</CardDescription>
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
            <h3 className="text-sm font-medium mb-2">Xu hướng sử dụng kênh theo thời gian</h3>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/channel-usage-trend-chart.png"
                alt="Biểu đồ xu hướng sử dụng kênh liên lạc"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Phân bố kênh hiện tại</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                  <span className="text-sm font-medium">Zalo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">42.5%</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    8.3%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-indigo-500"></span>
                  <span className="text-sm font-medium">Facebook Messenger</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">28.7%</span>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    3.2%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium">WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">12.3%</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    2.1%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-purple-500"></span>
                  <span className="text-sm font-medium">Viber</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">8.5%</span>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    1.8%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-cyan-500"></span>
                  <span className="text-sm font-medium">Telegram</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">5.2%</span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    1.5%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-gray-500"></span>
                  <span className="text-sm font-medium">Khác</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">2.8%</span>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    0.7%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted rounded-md flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Phân tích xu hướng</p>
            <p className="text-sm text-muted-foreground">
              Zalo đang trở thành kênh liên lạc ưa thích, với tỷ lệ tăng trưởng 8.3% trong 3 tháng qua. Facebook
              Messenger đang giảm dần, trong khi WhatsApp và Telegram đang tăng nhẹ. Xu hướng này phản ánh sự thay đổi
              trong thói quen sử dụng ứng dụng nhắn tin của người dùng Việt Nam.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
