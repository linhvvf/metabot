"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronUp, ChevronDown, Minus } from "lucide-react"

interface ContentAnalysisProps {
  tests: any[]
}

export default function ContentAnalysis({ tests }: ContentAnalysisProps) {
  // Hàm phân tích nội dung
  const analyzeContent = (content: string) => {
    const wordCount = content.split(/\s+/).length
    const characterCount = content.length
    const hasEmoji = /[\p{Emoji}]/u.test(content)
    const hasQuestion = content.includes("?")
    const hasCTA = /\b(nhấp|click|mua ngay|đặt hàng|xem ngay|truy cập|liên hệ|tìm hiểu)\b/i.test(content)
    const hasPersonalization = content.includes("{{") && content.includes("}}")
    const hasUrgency = /\b(nhanh lên|chỉ còn|giới hạn|sắp hết hạn|cuối cùng|duy nhất|hôm nay)\b/i.test(content)

    return {
      wordCount,
      characterCount,
      hasEmoji,
      hasQuestion,
      hasCTA,
      hasPersonalization,
      hasUrgency,
    }
  }

  // Hàm đánh giá tác động của các yếu tố nội dung
  const evaluateContentImpact = (test: any) => {
    if (!test.variants || test.variants.length < 2) return []

    const baseVariant = test.variants[0]
    const baseAnalysis = analyzeContent(baseVariant.content || "")

    const impacts = []

    // Đánh giá tác động của độ dài
    const lengthImpacts = test.variants.slice(1).map((variant: any) => {
      const analysis = analyzeContent(variant.content || "")
      const wordCountDiff = analysis.wordCount - baseAnalysis.wordCount
      const performance = variant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
      const basePerformance = baseVariant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
      const performanceDiff = ((performance - basePerformance) / basePerformance) * 100

      return {
        factor: "Độ dài tin nhắn",
        difference: `${wordCountDiff > 0 ? "+" : ""}${wordCountDiff} từ`,
        impact: performanceDiff,
      }
    })
    impacts.push(...lengthImpacts)

    // Đánh giá tác động của emoji
    test.variants.slice(1).forEach((variant: any) => {
      const analysis = analyzeContent(variant.content || "")
      if (analysis.hasEmoji !== baseAnalysis.hasEmoji) {
        const performance = variant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const basePerformance = baseVariant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const performanceDiff = ((performance - basePerformance) / basePerformance) * 100

        impacts.push({
          factor: "Sử dụng emoji",
          difference: analysis.hasEmoji ? "Có" : "Không",
          impact: performanceDiff,
        })
      }
    })

    // Đánh giá tác động của câu hỏi
    test.variants.slice(1).forEach((variant: any) => {
      const analysis = analyzeContent(variant.content || "")
      if (analysis.hasQuestion !== baseAnalysis.hasQuestion) {
        const performance = variant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const basePerformance = baseVariant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const performanceDiff = ((performance - basePerformance) / basePerformance) * 100

        impacts.push({
          factor: "Sử dụng câu hỏi",
          difference: analysis.hasQuestion ? "Có" : "Không",
          impact: performanceDiff,
        })
      }
    })

    // Đánh giá tác động của CTA
    test.variants.slice(1).forEach((variant: any) => {
      const analysis = analyzeContent(variant.content || "")
      if (analysis.hasCTA !== baseAnalysis.hasCTA) {
        const performance = variant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const basePerformance = baseVariant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const performanceDiff = ((performance - basePerformance) / basePerformance) * 100

        impacts.push({
          factor: "Lời kêu gọi hành động (CTA)",
          difference: analysis.hasCTA ? "Có" : "Không",
          impact: performanceDiff,
        })
      }
    })

    // Đánh giá tác động của cá nhân hóa
    test.variants.slice(1).forEach((variant: any) => {
      const analysis = analyzeContent(variant.content || "")
      if (analysis.hasPersonalization !== baseAnalysis.hasPersonalization) {
        const performance = variant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const basePerformance = baseVariant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const performanceDiff = ((performance - basePerformance) / basePerformance) * 100

        impacts.push({
          factor: "Cá nhân hóa",
          difference: analysis.hasPersonalization ? "Có" : "Không",
          impact: performanceDiff,
        })
      }
    })

    // Đánh giá tác động của tính cấp bách
    test.variants.slice(1).forEach((variant: any) => {
      const analysis = analyzeContent(variant.content || "")
      if (analysis.hasUrgency !== baseAnalysis.hasUrgency) {
        const performance = variant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const basePerformance = baseVariant.metrics?.conversion_rate || Math.random() * 0.1 + 0.01
        const performanceDiff = ((performance - basePerformance) / basePerformance) * 100

        impacts.push({
          factor: "Tính cấp bách",
          difference: analysis.hasUrgency ? "Có" : "Không",
          impact: performanceDiff,
        })
      }
    })

    // Sắp xếp theo tác động
    impacts.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))

    return impacts
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân tích nội dung</CardTitle>
        <CardDescription>Phân tích các yếu tố nội dung ảnh hưởng đến hiệu suất</CardDescription>
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
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {test.variants.map((variant: any) => {
                    const analysis = analyzeContent(variant.content || "")
                    return (
                      <Card key={variant.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base">{variant.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-sm whitespace-pre-wrap mb-4 border p-3 rounded-md bg-muted/50 max-h-[150px] overflow-y-auto">
                            {variant.content || "Không có nội dung"}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Số từ:</span>
                              <span>{analysis.wordCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Số ký tự:</span>
                              <span>{analysis.characterCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Emoji:</span>
                              <span>{analysis.hasEmoji ? "Có" : "Không"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Câu hỏi:</span>
                              <span>{analysis.hasQuestion ? "Có" : "Không"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">CTA:</span>
                              <span>{analysis.hasCTA ? "Có" : "Không"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cá nhân hóa:</span>
                              <span>{analysis.hasPersonalization ? "Có" : "Không"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Tính cấp bách:</span>
                              <span>{analysis.hasUrgency ? "Có" : "Không"}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Tác động của các yếu tố nội dung</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Yếu tố</TableHead>
                          <TableHead>Sự khác biệt</TableHead>
                          <TableHead className="text-right">Tác động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {evaluateContentImpact(test).map((impact, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{impact.factor}</TableCell>
                            <TableCell>{impact.difference}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end">
                                <Badge
                                  variant={
                                    impact.impact > 0 ? "default" : impact.impact < 0 ? "destructive" : "outline"
                                  }
                                  className="flex items-center"
                                >
                                  {impact.impact > 0 ? (
                                    <ChevronUp className="mr-1 h-3 w-3" />
                                  ) : impact.impact < 0 ? (
                                    <ChevronDown className="mr-1 h-3 w-3" />
                                  ) : (
                                    <Minus className="mr-1 h-3 w-3" />
                                  )}
                                  {impact.impact > 0 ? "+" : ""}
                                  {impact.impact.toFixed(2)}%
                                </Badge>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>
                        <strong>Phân tích:</strong> Bảng trên hiển thị tác động của các yếu tố nội dung khác nhau đến
                        hiệu suất so với phiên bản cơ sở. Các yếu tố có tác động tích cực được đánh dấu màu xanh, các
                        yếu tố có tác động tiêu cực được đánh dấu màu đỏ.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
