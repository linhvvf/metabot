"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Crown, TrendingUp, TrendingDown } from "lucide-react"

interface MetricsComparisonProps {
  tests: any[]
}

export default function MetricsComparison({ tests }: MetricsComparisonProps) {
  const [displayMode, setDisplayMode] = useState<"table" | "relative">("table")

  // Hàm định dạng phần trăm
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`
  }

  // Tạo dữ liệu mô phỏng cho các biến thể
  const generateMetricsForVariant = (variant: any, isWinner = false) => {
    const baseFactor = isWinner ? 1.1 : 1
    return {
      open_rate: variant.metrics?.open_rate || (Math.random() * 0.2 + 0.15) * baseFactor,
      click_rate: variant.metrics?.click_rate || (Math.random() * 0.15 + 0.05) * baseFactor,
      conversion_rate: variant.metrics?.conversion_rate || (Math.random() * 0.08 + 0.02) * baseFactor,
      response_rate: variant.metrics?.response_rate || (Math.random() * 0.12 + 0.08) * baseFactor,
      bounce_rate: variant.metrics?.bounce_rate || (Math.random() * 0.3 + 0.2) * (isWinner ? 0.9 : 1),
      avg_session_duration: variant.metrics?.avg_session_duration || (Math.random() * 120 + 60) * baseFactor,
    }
  }

  // Tìm phiên bản chiến thắng cho mỗi thử nghiệm
  const getWinningVariantIndex = (test: any) => {
    if (!test.variants || test.variants.length === 0) return -1

    // Sắp xếp theo chỉ số chính
    const primaryMetric = test.settings.primaryMetric
    const sortedVariants = [...test.variants]
      .map((v, i) => ({ variant: v, index: i }))
      .sort((a, b) => {
        const aMetrics = a.variant.metrics || generateMetricsForVariant(a.variant)
        const bMetrics = b.variant.metrics || generateMetricsForVariant(b.variant)

        return bMetrics[primaryMetric] - aMetrics[primaryMetric]
      })

    return sortedVariants[0].index
  }

  // Tính toán sự khác biệt tương đối
  const calculateRelativeDifference = (value: number, baseValue: number) => {
    if (baseValue === 0) return 0
    return ((value - baseValue) / baseValue) * 100
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>So sánh chi tiết các chỉ số</CardTitle>
          <CardDescription>So sánh chi tiết các chỉ số hiệu suất giữa các phiên bản</CardDescription>
        </div>
        <Select value={displayMode} onValueChange={(value) => setDisplayMode(value as "table" | "relative")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chế độ hiển thị" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Giá trị tuyệt đối</SelectItem>
            <SelectItem value="relative">Giá trị tương đối</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={tests[0]?.id} className="w-full">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tests.length}, 1fr)` }}>
            {tests.map((test) => (
              <TabsTrigger key={test.id} value={test.id}>
                {test.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {tests.map((test) => {
            const winningVariantIndex = getWinningVariantIndex(test)

            return (
              <TabsContent key={test.id} value={test.id} className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Chỉ số</TableHead>
                      {test.variants.map((variant: any, index: number) => (
                        <TableHead key={variant.id} className="text-center">
                          {variant.name}
                          {index === winningVariantIndex && (
                            <Badge variant="outline" className="ml-2 bg-green-50">
                              <Crown className="mr-1 h-3 w-3 text-primary" />
                              Tốt nhất
                            </Badge>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Tỷ lệ mở</TableCell>
                      {test.variants.map((variant: any, index: number) => {
                        const metrics =
                          variant.metrics || generateMetricsForVariant(variant, index === winningVariantIndex)
                        const baseValue =
                          test.variants[0].metrics?.open_rate || generateMetricsForVariant(test.variants[0]).open_rate
                        const value = metrics.open_rate
                        const diff = index > 0 ? calculateRelativeDifference(value, baseValue) : 0

                        return (
                          <TableCell key={variant.id} className="text-center">
                            {displayMode === "table" ? (
                              formatPercentage(value)
                            ) : (
                              <div className="flex items-center justify-center">
                                {index === 0 ? (
                                  "Cơ sở"
                                ) : (
                                  <>
                                    <Badge variant={diff > 0 ? "default" : "destructive"} className="mr-2">
                                      {diff > 0 ? (
                                        <TrendingUp className="mr-1 h-3 w-3" />
                                      ) : (
                                        <TrendingDown className="mr-1 h-3 w-3" />
                                      )}
                                      {diff > 0 ? "+" : ""}
                                      {diff.toFixed(2)}%
                                    </Badge>
                                  </>
                                )}
                              </div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tỷ lệ nhấp chuột</TableCell>
                      {test.variants.map((variant: any, index: number) => {
                        const metrics =
                          variant.metrics || generateMetricsForVariant(variant, index === winningVariantIndex)
                        const baseValue =
                          test.variants[0].metrics?.click_rate || generateMetricsForVariant(test.variants[0]).click_rate
                        const value = metrics.click_rate
                        const diff = index > 0 ? calculateRelativeDifference(value, baseValue) : 0

                        return (
                          <TableCell key={variant.id} className="text-center">
                            {displayMode === "table" ? (
                              formatPercentage(value)
                            ) : (
                              <div className="flex items-center justify-center">
                                {index === 0 ? (
                                  "Cơ sở"
                                ) : (
                                  <>
                                    <Badge variant={diff > 0 ? "default" : "destructive"} className="mr-2">
                                      {diff > 0 ? (
                                        <TrendingUp className="mr-1 h-3 w-3" />
                                      ) : (
                                        <TrendingDown className="mr-1 h-3 w-3" />
                                      )}
                                      {diff > 0 ? "+" : ""}
                                      {diff.toFixed(2)}%
                                    </Badge>
                                  </>
                                )}
                              </div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tỷ lệ chuyển đổi</TableCell>
                      {test.variants.map((variant: any, index: number) => {
                        const metrics =
                          variant.metrics || generateMetricsForVariant(variant, index === winningVariantIndex)
                        const baseValue =
                          test.variants[0].metrics?.conversion_rate ||
                          generateMetricsForVariant(test.variants[0]).conversion_rate
                        const value = metrics.conversion_rate
                        const diff = index > 0 ? calculateRelativeDifference(value, baseValue) : 0

                        return (
                          <TableCell key={variant.id} className="text-center">
                            {displayMode === "table" ? (
                              formatPercentage(value)
                            ) : (
                              <div className="flex items-center justify-center">
                                {index === 0 ? (
                                  "Cơ sở"
                                ) : (
                                  <>
                                    <Badge variant={diff > 0 ? "default" : "destructive"} className="mr-2">
                                      {diff > 0 ? (
                                        <TrendingUp className="mr-1 h-3 w-3" />
                                      ) : (
                                        <TrendingDown className="mr-1 h-3 w-3" />
                                      )}
                                      {diff > 0 ? "+" : ""}
                                      {diff.toFixed(2)}%
                                    </Badge>
                                  </>
                                )}
                              </div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tỷ lệ phản hồi</TableCell>
                      {test.variants.map((variant: any, index: number) => {
                        const metrics =
                          variant.metrics || generateMetricsForVariant(variant, index === winningVariantIndex)
                        const baseValue =
                          test.variants[0].metrics?.response_rate ||
                          generateMetricsForVariant(test.variants[0]).response_rate
                        const value = metrics.response_rate
                        const diff = index > 0 ? calculateRelativeDifference(value, baseValue) : 0

                        return (
                          <TableCell key={variant.id} className="text-center">
                            {displayMode === "table" ? (
                              formatPercentage(value)
                            ) : (
                              <div className="flex items-center justify-center">
                                {index === 0 ? (
                                  "Cơ sở"
                                ) : (
                                  <>
                                    <Badge variant={diff > 0 ? "default" : "destructive"} className="mr-2">
                                      {diff > 0 ? (
                                        <TrendingUp className="mr-1 h-3 w-3" />
                                      ) : (
                                        <TrendingDown className="mr-1 h-3 w-3" />
                                      )}
                                      {diff > 0 ? "+" : ""}
                                      {diff.toFixed(2)}%
                                    </Badge>
                                  </>
                                )}
                              </div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tỷ lệ thoát</TableCell>
                      {test.variants.map((variant: any, index: number) => {
                        const metrics =
                          variant.metrics || generateMetricsForVariant(variant, index === winningVariantIndex)
                        const baseValue =
                          test.variants[0].metrics?.bounce_rate ||
                          generateMetricsForVariant(test.variants[0]).bounce_rate
                        const value = metrics.bounce_rate
                        const diff = index > 0 ? calculateRelativeDifference(value, baseValue) : 0

                        return (
                          <TableCell key={variant.id} className="text-center">
                            {displayMode === "table" ? (
                              formatPercentage(value)
                            ) : (
                              <div className="flex items-center justify-center">
                                {index === 0 ? (
                                  "Cơ sở"
                                ) : (
                                  <>
                                    <Badge variant={diff < 0 ? "default" : "destructive"} className="mr-2">
                                      {diff < 0 ? (
                                        <TrendingDown className="mr-1 h-3 w-3" />
                                      ) : (
                                        <TrendingUp className="mr-1 h-3 w-3" />
                                      )}
                                      {diff > 0 ? "+" : ""}
                                      {diff.toFixed(2)}%
                                    </Badge>
                                  </>
                                )}
                              </div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Thời lượng phiên trung bình</TableCell>
                      {test.variants.map((variant: any, index: number) => {
                        const metrics =
                          variant.metrics || generateMetricsForVariant(variant, index === winningVariantIndex)
                        const baseValue =
                          test.variants[0].metrics?.avg_session_duration ||
                          generateMetricsForVariant(test.variants[0]).avg_session_duration
                        const value = metrics.avg_session_duration
                        const diff = index > 0 ? calculateRelativeDifference(value, baseValue) : 0

                        return (
                          <TableCell key={variant.id} className="text-center">
                            {displayMode === "table" ? (
                              `${value.toFixed(0)} giây`
                            ) : (
                              <div className="flex items-center justify-center">
                                {index === 0 ? (
                                  "Cơ sở"
                                ) : (
                                  <>
                                    <Badge variant={diff > 0 ? "default" : "destructive"} className="mr-2">
                                      {diff > 0 ? (
                                        <TrendingUp className="mr-1 h-3 w-3" />
                                      ) : (
                                        <TrendingDown className="mr-1 h-3 w-3" />
                                      )}
                                      {diff > 0 ? "+" : ""}
                                      {diff.toFixed(2)}%
                                    </Badge>
                                  </>
                                )}
                              </div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}
