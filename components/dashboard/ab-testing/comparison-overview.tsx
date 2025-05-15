"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, TrendingUp, TrendingDown } from "lucide-react"

interface ComparisonOverviewProps {
  tests: any[]
}

export default function ComparisonOverview({ tests }: ComparisonOverviewProps) {
  // Hàm định dạng phần trăm
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`
  }

  // Tìm phiên bản chiến thắng cho mỗi thử nghiệm
  const getWinningVariant = (test: any) => {
    if (!test.variants || test.variants.length === 0) return null

    // Sắp xếp theo chỉ số chính
    const primaryMetric = test.settings.primaryMetric
    const sortedVariants = [...test.variants].sort((a, b) => {
      // Tạo dữ liệu mô phỏng cho mục đích demo
      const aMetrics = a.metrics || {
        open_rate: Math.random() * 0.3 + 0.1,
        click_rate: Math.random() * 0.2 + 0.05,
        conversion_rate: Math.random() * 0.1 + 0.01,
        response_rate: Math.random() * 0.15 + 0.05,
      }

      const bMetrics = b.metrics || {
        open_rate: Math.random() * 0.3 + 0.1,
        click_rate: Math.random() * 0.2 + 0.05,
        conversion_rate: Math.random() * 0.1 + 0.01,
        response_rate: Math.random() * 0.15 + 0.05,
      }

      return bMetrics[primaryMetric] - aMetrics[primaryMetric]
    })

    return sortedVariants[0]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng quan so sánh</CardTitle>
        <CardDescription>So sánh kết quả tổng quan giữa các thử nghiệm A/B</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="primary-metric" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="primary-metric">Chỉ số chính</TabsTrigger>
            <TabsTrigger value="open-rate">Tỷ lệ mở</TabsTrigger>
            <TabsTrigger value="click-rate">Tỷ lệ nhấp chuột</TabsTrigger>
            <TabsTrigger value="conversion-rate">Tỷ lệ chuyển đổi</TabsTrigger>
          </TabsList>

          <TabsContent value="primary-metric" className="pt-4">
            <div className="space-y-6">
              {tests.map((test) => {
                const winningVariant = getWinningVariant(test)
                if (!winningVariant) return null

                const primaryMetric = test.settings.primaryMetric
                const metricValue = winningVariant.metrics?.[primaryMetric] || Math.random() * 0.3 + 0.1
                const improvement = winningVariant.improvement || (Math.random() > 0.5 ? 1 : -1) * Math.random() * 20

                return (
                  <div key={test.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{test.name}</h3>
                        <Badge variant={test.settings.status === "completed" ? "outline" : "default"}>
                          {test.settings.status === "completed" ? "Đã hoàn thành" : "Đang chạy"}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Chỉ số:{" "}
                        {primaryMetric === "open_rate"
                          ? "Tỷ lệ mở"
                          : primaryMetric === "click_rate"
                            ? "Tỷ lệ nhấp chuột"
                            : primaryMetric === "conversion_rate"
                              ? "Tỷ lệ chuyển đổi"
                              : "Tỷ lệ phản hồi"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Crown className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{winningVariant.name}</p>
                          <p className="text-sm text-muted-foreground">{formatPercentage(metricValue)}</p>
                        </div>
                      </div>

                      {improvement !== 0 && (
                        <Badge variant={improvement > 0 ? "default" : "destructive"} className="ml-auto">
                          {improvement > 0 ? (
                            <TrendingUp className="mr-1 h-3 w-3" />
                          ) : (
                            <TrendingDown className="mr-1 h-3 w-3" />
                          )}
                          {improvement > 0 ? "+" : ""}
                          {improvement.toFixed(1)}%
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Độ tin cậy</span>
                        <span>{winningVariant.confidence || Math.floor(Math.random() * 30) + 70}%</span>
                      </div>
                      <Progress
                        value={winningVariant.confidence || Math.floor(Math.random() * 30) + 70}
                        className="h-1.5"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="open-rate" className="pt-4">
            <div className="space-y-6">
              {tests.map((test) => {
                // Tương tự như trên nhưng chỉ tập trung vào tỷ lệ mở
                const variants = test.variants || []
                const sortedVariants = [...variants].sort((a, b) => {
                  const aMetric = a.metrics?.open_rate || Math.random() * 0.3 + 0.1
                  const bMetric = b.metrics?.open_rate || Math.random() * 0.3 + 0.1
                  return bMetric - aMetric
                })

                const bestVariant = sortedVariants[0]
                if (!bestVariant) return null

                const metricValue = bestVariant.metrics?.open_rate || Math.random() * 0.3 + 0.1

                return (
                  <div key={test.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{test.name}</h3>
                      <span className="text-sm text-muted-foreground">Tỷ lệ mở</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Crown className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{bestVariant.name}</p>
                          <p className="text-sm text-muted-foreground">{formatPercentage(metricValue)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="click-rate" className="pt-4">
            <div className="space-y-6">
              {tests.map((test) => {
                // Tương tự như trên nhưng chỉ tập trung vào tỷ lệ nhấp chuột
                const variants = test.variants || []
                const sortedVariants = [...variants].sort((a, b) => {
                  const aMetric = a.metrics?.click_rate || Math.random() * 0.2 + 0.05
                  const bMetric = b.metrics?.click_rate || Math.random() * 0.2 + 0.05
                  return bMetric - aMetric
                })

                const bestVariant = sortedVariants[0]
                if (!bestVariant) return null

                const metricValue = bestVariant.metrics?.click_rate || Math.random() * 0.2 + 0.05

                return (
                  <div key={test.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{test.name}</h3>
                      <span className="text-sm text-muted-foreground">Tỷ lệ nhấp chuột</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Crown className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{bestVariant.name}</p>
                          <p className="text-sm text-muted-foreground">{formatPercentage(metricValue)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="conversion-rate" className="pt-4">
            <div className="space-y-6">
              {tests.map((test) => {
                // Tương tự như trên nhưng chỉ tập trung vào tỷ lệ chuyển đổi
                const variants = test.variants || []
                const sortedVariants = [...variants].sort((a, b) => {
                  const aMetric = a.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
                  const bMetric = b.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
                  return bMetric - aMetric
                })

                const bestVariant = sortedVariants[0]
                if (!bestVariant) return null

                const metricValue = bestVariant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01

                return (
                  <div key={test.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{test.name}</h3>
                      <span className="text-sm text-muted-foreground">Tỷ lệ chuyển đổi</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Crown className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{bestVariant.name}</p>
                          <p className="text-sm text-muted-foreground">{formatPercentage(metricValue)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
