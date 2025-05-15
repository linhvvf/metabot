"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingUp } from "lucide-react"
import Image from "next/image"

export function PredictiveAnalysis() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Phân tích dự đoán</CardTitle>
            <CardDescription>Dự đoán xu hướng trong 30 ngày tới dựa trên dữ liệu lịch sử</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Độ tin cậy 92%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/predictive-analysis-chart.png"
            alt="Biểu đồ phân tích dự đoán"
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="mt-4 space-y-4">
          <div className="p-3 bg-muted rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Dự đoán tương tác khách hàng</p>
              <p className="text-sm text-muted-foreground">
                Tỷ lệ tương tác khách hàng dự kiến sẽ tăng 5.6% trong 30 ngày tới, đạt mức 26.2%. Điều này chủ yếu do
                chiến dịch khuyến mãi mùa hè sắp tới và việc triển khai tính năng mới trên ứng dụng.
              </p>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Dự đoán hiệu suất chiến dịch</p>
              <p className="text-sm text-muted-foreground">
                Tỷ lệ chuyển đổi chiến dịch dự kiến sẽ tăng 8.6% trong 30 ngày tới, đạt mức 6.3%. Chiến dịch cá nhân hóa
                và chiến dịch tái kích hoạt sẽ có hiệu suất cao nhất.
              </p>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Dự đoán xu hướng kênh liên lạc</p>
              <p className="text-sm text-muted-foreground">
                Zalo dự kiến sẽ tiếp tục tăng trưởng, đạt 45.8% thị phần trong 30 ngày tới. Facebook Messenger sẽ tiếp
                tục giảm nhẹ, trong khi WhatsApp và Telegram sẽ tăng trưởng ổn định.
              </p>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Cảnh báo xu hướng</p>
              <p className="text-sm text-muted-foreground">
                Phát hiện khả năng giảm tương tác trên kênh Viber trong 30 ngày tới. Khuyến nghị xem xét chiến lược nội
                dung và tần suất gửi tin nhắn trên kênh này.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
