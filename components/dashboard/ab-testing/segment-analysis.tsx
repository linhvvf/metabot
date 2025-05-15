"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Crown } from "lucide-react"

interface SegmentAnalysisProps {
  tests: any[]
}

export default function SegmentAnalysis({ tests }: SegmentAnalysisProps) {
  const [selectedMetric, setSelectedMetric] = useState("conversion_rate")

  // Hàm định dạng phần trăm
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`
  }

  // Tạo dữ liệu mô phỏng cho các phân đoạn
  const segments = [
    { id: "new", name: "Khách hàng mới" },
    { id: "returning", name: "Khách hàng quay lại" },
    { id: "vip", name: "Khách hàng VIP" },
    { id: "inactive", name: "Khách hàng không hoạt động" },
    { id: "mobile", name: "Người dùng di động" },
    { id: "desktop", name: "Người dùng máy tính" },
  ]

  // Tạo dữ liệu mô phỏng cho phân tích phân đoạn
  const generateSegmentData = (testId: string, variantId: string, segmentId: string, isWinner = false) => {
    const baseFactor = isWinner ? 1.1 : 1
    let baseValue = 0

    switch (segmentId) {
      case "new":
        baseValue = Math.random() * 0.05 + 0.02
        break
      case "returning":
        baseValue = Math.random() * 0.1 + 0.05
        break
      case "vip":
        baseValue = Math.random() * 0.15 + 0.1
        break
      case "inactive":
        baseValue = Math.random() * 0.03 + 0.01
        break
      case "mobile":
        baseValue = Math.random() * 0.08 + 0.03
        break
      case "desktop":
        baseValue = Math.random() * 0.12 + 0.06
        break
      default:
        baseValue = Math.random() * 0.1 + 0.05
    }

    return {
      testId,
      variantId,
      segmentId,
      open_rate: baseValue * 2 * baseFactor,
      click_rate: baseValue * 1.5 * baseFactor,
      conversion_rate: baseValue * baseFactor,
      response_rate: baseValue * 1.2 * baseFactor,
    }
  }

  // Tìm phiên bản chiến thắng cho mỗi thử nghiệm và phân đoạn
  const getWinningVariantForSegment = (test: any, segmentId: string, metric: string) => {
    if (!test.variants || test.variants.length === 0) return null

    const variantsWithData = test.variants.map((variant: any, index: number) => {
      const data = generateSegmentData(test.id, variant.id, segmentId, false)
      return { variant, data, index }
    })

    // Sắp xếp theo chỉ số được chọn
    variantsWithData.sort((a, b) => b.data[metric] - a.data[metric])

    return variantsWithData[0]
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Phân tích phân đoạn</CardTitle>
          <CardDescription>So sánh hiệu suất của các phiên bản trên các phân đoạn khách hàng khác nhau</CardDescription>
        </div>
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn chỉ số" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open_rate">Tỷ lệ mở</SelectItem>
            <SelectItem value="click_rate">Tỷ lệ nhấp chuột</SelectItem>
            <SelectItem value="conversion_rate">Tỷ lệ chuyển đổi</SelectItem>
            <SelectItem value="response_rate">Tỷ lệ phản hồi</SelectItem>
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

          {tests.map((test) => (
            <TabsContent key={test.id} value={test.id} className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Phân đoạn</TableHead>
                    {test.variants.map((variant: any) => (
                      <TableHead key={variant.id} className="text-center">
                        {variant.name}
                      </TableHead>
                    ))}
                    <TableHead className="text-center">Phiên bản tốt nhất</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {segments.map((segment) => {
                    const winningData = getWinningVariantForSegment(test, segment.id, selectedMetric)
                    if (!winningData) return null

                    return (
                      <TableRow key={segment.id}>
                        <TableCell className="font-medium">{segment.name}</TableCell>
                        {test.variants.map((variant: any, index: number) => {
                          const data = generateSegmentData(test.id, variant.id, segment.id, index === winningData.index)
                          const value = data[selectedMetric]

                          return (
                            <TableCell key={variant.id} className="text-center">
                              {formatPercentage(value)}
                              {index === winningData.index && (
                                <Badge variant="outline" className="ml-2 bg-green-50">
                                  <Crown className="mr-1 h-3 w-3 text-primary" />
                                </Badge>
                              )}
                            </TableCell>
                          )
                        })}
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <Badge variant="outline" className="bg-green-50">
                              <Crown className="mr-1 h-3 w-3 text-primary" />
                              {test.variants[winningData.index].name}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  <strong>Phân tích:</strong> Các phân đoạn khách hàng khác nhau phản ứng khác nhau với các phiên bản
                  tin nhắn. Phiên bản tốt nhất cho mỗi phân đoạn được đánh dấu bằng biểu tượng vương miện.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
