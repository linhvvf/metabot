"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import TestSelector from "@/components/dashboard/ab-testing/test-selector"
import ComparisonOverview from "@/components/dashboard/ab-testing/comparison-overview"
import MetricsComparison from "@/components/dashboard/ab-testing/metrics-comparison"
import SegmentAnalysis from "@/components/dashboard/ab-testing/segment-analysis"
import TimeSeriesAnalysis from "@/components/dashboard/ab-testing/time-series-analysis"
import ContentAnalysis from "@/components/dashboard/ab-testing/content-analysis"
import OptimizationSuggestions from "@/components/dashboard/ab-testing/optimization-suggestions"
import ComparisonExport from "@/components/dashboard/ab-testing/comparison-export"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

// Dữ liệu mẫu cho các thử nghiệm A/B
const mockTests = [
  {
    id: "test-1",
    name: "Thử nghiệm khuyến mãi tháng 7",
    campaignId: "campaign-1",
    goal: "Giới thiệu khuyến mãi giảm giá 20% cho khách hàng hiện tại",
    audience: "Khách hàng hiện tại đã mua hàng trong 3 tháng qua",
    tone: "friendly",
    channel: "zalo",
    additionalInfo: "Khuyến mãi áp dụng từ 01/07 đến 15/07",
    variants: [
      {
        id: "variant-1",
        name: "Phiên bản A",
        content:
          "Xin chào {{name}}, chúng tôi có ưu đãi đặc biệt dành riêng cho bạn! Giảm 20% cho tất cả sản phẩm từ ngày 01/07 đến 15/07. Đừng bỏ lỡ cơ hội này! Truy cập ngay để xem chi tiết.",
      },
      {
        id: "variant-2",
        name: "Phiên bản B",
        content:
          "{{name}} thân mến, NHANH TAY LÊN! Chỉ còn 2 tuần để bạn nhận ưu đãi giảm 20% cho tất cả sản phẩm. Khuyến mãi kết thúc vào 15/07. Đặt hàng ngay hôm nay!",
      },
    ],
    settings: {
      duration: 7,
      trafficSplit: [50, 50],
      autoOptimize: true,
      primaryMetric: "click_rate",
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 ngày trước
      status: "running",
    },
  },
  {
    id: "test-2",
    name: "Thử nghiệm chào mừng khách hàng mới",
    campaignId: "campaign-2",
    goal: "Chào mừng khách hàng mới đăng ký và giới thiệu các tính năng của sản phẩm",
    audience: "Khách hàng mới đăng ký trong 7 ngày qua",
    tone: "professional",
    channel: "email",
    additionalInfo: "Cần giới thiệu các tính năng chính và hướng dẫn bắt đầu",
    variants: [
      {
        id: "variant-1",
        name: "Phiên bản A",
        content:
          "Kính chào {{name}}, Cảm ơn bạn đã đăng ký dịch vụ của chúng tôi. Chúng tôi rất vui mừng được chào đón bạn! Hãy khám phá các tính năng chính của sản phẩm tại đây và bắt đầu trải nghiệm ngay hôm nay.",
      },
      {
        id: "variant-2",
        name: "Phiên bản B",
        content:
          "Chào mừng {{name}}! Bạn đã sẵn sàng khám phá sản phẩm của chúng tôi chưa? Dưới đây là 3 bước đơn giản để bắt đầu: 1. Thiết lập tài khoản, 2. Khám phá tính năng chính, 3. Tùy chỉnh theo nhu cầu. Bắt đầu ngay!",
      },
      {
        id: "variant-3",
        name: "Phiên bản C",
        content:
          "{{name}} thân mến, Chào mừng bạn đến với gia đình chúng tôi! Hãy dành 5 phút để xem video hướng dẫn này và khám phá cách sản phẩm của chúng tôi có thể giúp bạn. Nhấp vào đây để bắt đầu!",
      },
    ],
    settings: {
      duration: 14,
      trafficSplit: [33, 33, 34],
      autoOptimize: true,
      primaryMetric: "open_rate",
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 ngày trước
      status: "completed",
    },
  },
  {
    id: "test-3",
    name: "Thử nghiệm tin nhắn nhắc nhở",
    campaignId: "campaign-3",
    goal: "Nhắc nhở khách hàng về sản phẩm đã xem nhưng chưa mua",
    audience: "Khách hàng đã xem sản phẩm nhưng chưa mua trong 3 ngày qua",
    tone: "casual",
    channel: "zalo",
    additionalInfo: "Tập trung vào việc tạo cảm giác cấp bách",
    variants: [
      {
        id: "variant-1",
        name: "Phiên bản A",
        content:
          "Xin chào {{name}}, chúng tôi nhận thấy bạn đã xem sản phẩm {{product_name}} gần đây. Sản phẩm này vẫn đang chờ bạn trong giỏ hàng. Hoàn tất đơn hàng ngay hôm nay!",
      },
      {
        id: "variant-2",
        name: "Phiên bản B",
        content:
          "{{name}} ơi! Sản phẩm {{product_name}} đang cực hot và sắp hết hàng. Chúng tôi đã giữ nó trong giỏ hàng của bạn, nhưng chỉ trong 24 giờ thôi. Mua ngay kẻo lỡ!",
      },
    ],
    settings: {
      duration: 10,
      trafficSplit: [50, 50],
      autoOptimize: true,
      primaryMetric: "conversion_rate",
      startDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 ngày trước
      status: "running",
    },
  },
]

export default function ABTestingComparison() {
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const maxSelections = 3

  const handleSelectTest = (testId: string) => {
    setSelectedTests((prev) => {
      if (prev.includes(testId)) {
        return prev.filter((id) => id !== testId)
      } else {
        if (prev.length >= maxSelections) {
          return prev
        }
        return [...prev, testId]
      }
    })
  }

  const filteredTests = mockTests.filter((test) => selectedTests.includes(test.id))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TestSelector
          tests={mockTests}
          selectedTests={selectedTests}
          onSelectTest={handleSelectTest}
          maxSelections={maxSelections}
        />

        {selectedTests.length > 0 && <ComparisonExport tests={filteredTests} />}
      </div>

      {selectedTests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Info className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Chọn thử nghiệm để so sánh</p>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Hãy chọn tối đa {maxSelections} thử nghiệm A/B để so sánh chi tiết kết quả và hiệu suất.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {selectedTests.length === 1 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Chỉ một thử nghiệm được chọn</AlertTitle>
              <AlertDescription>
                Bạn đã chọn một thử nghiệm. Để so sánh, hãy chọn thêm thử nghiệm khác (tối đa {maxSelections} thử
                nghiệm).
              </AlertDescription>
            </Alert>
          )}

          <ComparisonOverview tests={filteredTests} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricsComparison tests={filteredTests} />
            <SegmentAnalysis tests={filteredTests} />
          </div>

          <TimeSeriesAnalysis tests={filteredTests} />
          <ContentAnalysis tests={filteredTests} />
          <OptimizationSuggestions tests={filteredTests} />
        </div>
      )}
    </div>
  )
}
