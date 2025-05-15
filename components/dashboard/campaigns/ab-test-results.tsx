"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, ChevronDown, ChevronUp, Crown, Info, Loader2, TrendingDown, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ABTestResultsProps {
  testData: any
  onEndTest?: (testId: string, winningVariantId: string) => void
}

export default function ABTestResults({ testData, onEndTest }: ABTestResultsProps) {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isEnding, setIsEnding] = useState(false)

  // Tính toán số ngày còn lại
  const calculateDaysRemaining = () => {
    const startDate = new Date(testData.settings.startDate)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + testData.settings.duration)

    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? diffDays : 0
  }

  // Tính toán phần trăm hoàn thành
  const calculateCompletionPercentage = () => {
    const startDate = new Date(testData.settings.startDate)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + testData.settings.duration)

    const today = new Date()
    const totalDuration = testData.settings.duration
    const elapsedDays = Math.min(
      totalDuration,
      Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
    )

    return Math.round((elapsedDays / totalDuration) * 100)
  }

  // Xác định phiên bản chiến thắng
  const determineWinner = () => {
    // Mô phỏng dữ liệu - trong thực tế sẽ lấy từ API
    const variantResults = testData.variants.map((variant: any, index: number) => {
      // Tạo dữ liệu mô phỏng cho mục đích demo
      const baseRate = index === 0 ? 0.25 : index === 1 ? 0.28 : 0.22
      const randomFactor = Math.random() * 0.05

      return {
        ...variant,
        metrics: {
          open_rate: baseRate + randomFactor,
          click_rate: (baseRate + randomFactor) * 0.7,
          conversion_rate: (baseRate + randomFactor) * 0.3,
          response_rate: (baseRate + randomFactor) * 0.5,
        },
        improvement: index === 1 ? 12 : index === 2 ? -8 : 0, // % cải thiện so với phiên bản A
        confidence: index === 1 ? 95 : index === 2 ? 85 : 0, // % độ tin cậy
      }
    })

    // Sắp xếp theo chỉ số chính
    const primaryMetric = testData.settings.primaryMetric
    variantResults.sort((a: any, b: any) => b.metrics[primaryMetric] - a.metrics[primaryMetric])

    return {
      variants: variantResults,
      winner: variantResults[0],
      hasSignificantWinner: variantResults[0].confidence >= 95,
    }
  }

  const results = determineWinner()
  const daysRemaining = calculateDaysRemaining()
  const completionPercentage = calculateCompletionPercentage()
  const isCompleted = completionPercentage >= 100 || testData.settings.status === "completed"

  // Xử lý kết thúc thử nghiệm và chọn phiên bản chiến thắng
  const handleEndTest = (variantId: string) => {
    setIsEnding(true)

    // Mô phỏng API call
    setTimeout(() => {
      if (onEndTest) {
        onEndTest(testData.id, variantId)
      }
      setIsEnding(false)
    }, 1500)
  }

  // Định dạng phần trăm
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{testData.name}</CardTitle>
              <CardDescription>Thử nghiệm A/B cho {testData.variants.length} phiên bản tin nhắn</CardDescription>
            </div>
            <Badge variant={isCompleted ? "default" : "outline"}>{isCompleted ? "Đã hoàn thành" : "Đang chạy"}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isCompleted && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tiến độ thử nghiệm</span>
                <span>{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Ngày bắt đầu: {new Date(testData.settings.startDate).toLocaleDateString("vi-VN")}</span>
                <span>Còn lại: {daysRemaining} ngày</span>
              </div>
            </div>
          )}

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="variants">Chi tiết phiên bản</TabsTrigger>
              <TabsTrigger value="recommendations">Đề xuất</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Phiên bản hiệu quả nhất</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Crown className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{results.winner.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPercentage(results.winner.metrics[testData.settings.primaryMetric])} tỷ lệ{" "}
                          {testData.settings.primaryMetric === "open_rate"
                            ? "mở"
                            : testData.settings.primaryMetric === "click_rate"
                              ? "nhấp chuột"
                              : testData.settings.primaryMetric === "conversion_rate"
                                ? "chuyển đổi"
                                : "phản hồi"}
                        </p>
                      </div>
                    </div>

                    {results.winner.improvement !== 0 && (
                      <div className="mt-4 flex items-center">
                        <Badge variant={results.winner.improvement > 0 ? "default" : "destructive"} className="mr-2">
                          {results.winner.improvement > 0 ? (
                            <TrendingUp className="mr-1 h-3 w-3" />
                          ) : (
                            <TrendingDown className="mr-1 h-3 w-3" />
                          )}
                          {results.winner.improvement > 0 ? "+" : ""}
                          {results.winner.improvement}%
                        </Badge>
                        <span className="text-sm text-muted-foreground">so với phiên bản cơ sở</span>
                      </div>
                    )}

                    {isCompleted ? (
                      <div className="mt-4">
                        <Badge variant="outline" className="bg-green-50">
                          <Check className="mr-1 h-3 w-3" /> Đã chọn làm phiên bản chính thức
                        </Badge>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <Button
                          size="sm"
                          onClick={() => handleEndTest(results.winner.id)}
                          disabled={isEnding || completionPercentage < 50}
                        >
                          {isEnding ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Đang xử lý...
                            </>
                          ) : (
                            "Kết thúc thử nghiệm & chọn phiên bản này"
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Độ tin cậy của kết quả</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Độ tin cậy thống kê</span>
                          <span>{results.winner.confidence}%</span>
                        </div>
                        <Progress
                          value={results.winner.confidence}
                          className="h-2"
                          indicatorClassName={
                            results.winner.confidence >= 95
                              ? "bg-green-500"
                              : results.winner.confidence >= 80
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        />
                      </div>

                      <Alert
                        variant={results.hasSignificantWinner ? "default" : "destructive"}
                        className={results.hasSignificantWinner ? "bg-green-50 border-green-200" : ""}
                      >
                        <Info className="h-4 w-4" />
                        <AlertTitle>
                          {results.hasSignificantWinner ? "Kết quả đáng tin cậy" : "Cần thêm dữ liệu"}
                        </AlertTitle>
                        <AlertDescription>
                          {results.hasSignificantWinner
                            ? "Kết quả có độ tin cậy thống kê cao (>95%). Bạn có thể tự tin chọn phiên bản chiến thắng."
                            : "Kết quả chưa đạt độ tin cậy thống kê cao. Nên tiếp tục thử nghiệm để có kết quả chính xác hơn."}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">So sánh hiệu quả</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Phiên bản</TableHead>
                        <TableHead>Tỷ lệ mở</TableHead>
                        <TableHead>Tỷ lệ nhấp chuột</TableHead>
                        <TableHead>Tỷ lệ chuyển đổi</TableHead>
                        <TableHead>Tỷ lệ phản hồi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.variants.map((variant: any) => (
                        <TableRow key={variant.id}>
                          <TableCell className="font-medium">
                            {variant.name}
                            {variant.id === results.winner.id && (
                              <Badge variant="outline" className="ml-2 bg-green-50">
                                <Crown className="mr-1 h-3 w-3 text-primary" />
                                Tốt nhất
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{formatPercentage(variant.metrics.open_rate)}</TableCell>
                          <TableCell>{formatPercentage(variant.metrics.click_rate)}</TableCell>
                          <TableCell>{formatPercentage(variant.metrics.conversion_rate)}</TableCell>
                          <TableCell>{formatPercentage(variant.metrics.response_rate)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variants" className="space-y-4 pt-4">
              {results.variants.map((variant: any, index: number) => (
                <Card key={variant.id}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {variant.name} {index === 0 ? "(A)" : index === 1 ? "(B)" : ""}
                        {variant.id === results.winner.id && (
                          <Badge variant="outline" className="ml-2 bg-green-50">
                            <Crown className="mr-1 h-3 w-3 text-primary" />
                            Tốt nhất
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center">
                        <Badge variant="outline">
                          Lưu lượng:{" "}
                          {index === 0 ? testData.settings.trafficSplit[0] : testData.settings.trafficSplit[1]}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="space-y-4">
                      <p className="text-sm whitespace-pre-wrap">{variant.content}</p>

                      <Separator />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Tỷ lệ mở</p>
                          <p className="text-lg font-medium">{formatPercentage(variant.metrics.open_rate)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Tỷ lệ nhấp chuột</p>
                          <p className="text-lg font-medium">{formatPercentage(variant.metrics.click_rate)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Tỷ lệ chuyển đổi</p>
                          <p className="text-lg font-medium">{formatPercentage(variant.metrics.conversion_rate)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Tỷ lệ phản hồi</p>
                          <p className="text-lg font-medium">{formatPercentage(variant.metrics.response_rate)}</p>
                        </div>
                      </div>

                      {variant.improvement !== 0 && (
                        <div className="flex items-center">
                          <Badge variant={variant.improvement > 0 ? "default" : "destructive"} className="mr-2">
                            {variant.improvement > 0 ? (
                              <TrendingUp className="mr-1 h-3 w-3" />
                            ) : (
                              <TrendingDown className="mr-1 h-3 w-3" />
                            )}
                            {variant.improvement > 0 ? "+" : ""}
                            {variant.improvement}%
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {variant.improvement > 0 ? "cải thiện" : "giảm"} so với phiên bản cơ sở
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4 pt-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Đề xuất hành động</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="space-y-4">
                    {isCompleted ? (
                      <Alert className="bg-green-50 border-green-200">
                        <Check className="h-4 w-4" />
                        <AlertTitle>Thử nghiệm đã hoàn thành</AlertTitle>
                        <AlertDescription>
                          Phiên bản "{results.winner.name}" đã được chọn làm phiên bản chính thức cho chiến dịch này.
                        </AlertDescription>
                      </Alert>
                    ) : results.hasSignificantWinner ? (
                      <Alert className="bg-green-50 border-green-200">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Đã có kết quả đáng tin cậy</AlertTitle>
                        <AlertDescription>
                          Phiên bản "{results.winner.name}" đang hoạt động tốt hơn với độ tin cậy{" "}
                          {results.winner.confidence}%. Bạn có thể kết thúc thử nghiệm và chọn phiên bản này làm phiên
                          bản chính thức.
                        </AlertDescription>
                      </Alert>
                    ) : completionPercentage < 50 ? (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Thử nghiệm đang chạy</AlertTitle>
                        <AlertDescription>
                          Thử nghiệm cần thêm thời gian để thu thập đủ dữ liệu. Hãy tiếp tục theo dõi kết quả.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Chưa có kết quả rõ ràng</AlertTitle>
                        <AlertDescription>
                          Sự khác biệt giữa các phiên bản chưa đủ lớn để đưa ra kết luận chắc chắn. Bạn có thể tiếp tục
                          thử nghiệm hoặc điều chỉnh nội dung tin nhắn để tạo sự khác biệt rõ ràng hơn.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <h4 className="font-medium">Phân tích nội dung</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronUp className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span className="text-sm">
                            Tin nhắn có đề cập đến lợi ích cụ thể hoạt động tốt hơn tin nhắn chung chung.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ChevronUp className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span className="text-sm">
                            Tin nhắn có tính cấp bách (ví dụ: "Chỉ còn 2 ngày") có tỷ lệ nhấp chuột cao hơn.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ChevronDown className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                          <span className="text-sm">
                            Tin nhắn quá dài có tỷ lệ mở thấp hơn. Nên giữ tin nhắn ngắn gọn và trực tiếp.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Đề xuất cho thử nghiệm tiếp theo</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                          <span className="text-sm">
                            Thử nghiệm với các lời kêu gọi hành động (CTA) khác nhau để xác định loại CTA hiệu quả nhất.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                          <span className="text-sm">
                            Thử nghiệm với các thời điểm gửi tin nhắn khác nhau để xác định thời điểm tốt nhất.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                          <span className="text-sm">
                            Phân đoạn đối tượng nhận tin nhắn để tạo nội dung phù hợp hơn với từng nhóm đối tượng.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
