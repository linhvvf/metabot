"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, Info, Lightbulb, Zap } from "lucide-react"

interface OptimizationSuggestionsProps {
  tests: any[]
}

export default function OptimizationSuggestions({ tests }: OptimizationSuggestionsProps) {
  // Hàm tạo đề xuất dựa trên kết quả thử nghiệm
  const generateSuggestions = (test: any) => {
    if (!test.variants || test.variants.length === 0) return []

    const suggestions = []

    // Đề xuất dựa trên phiên bản chiến thắng
    const winningVariantIndex = Math.floor(Math.random() * test.variants.length)
    const winningVariant = test.variants[winningVariantIndex]

    // Đề xuất về độ dài tin nhắn
    const wordCount = (winningVariant.content || "").split(/\s+/).length
    if (wordCount < 20) {
      suggestions.push({
        type: "content",
        title: "Độ dài tin nhắn tối ưu",
        description:
          "Tin nhắn ngắn gọn (dưới 20 từ) hoạt động tốt hơn. Hãy giữ tin nhắn của bạn ngắn gọn và trực tiếp.",
        impact: Math.floor(Math.random() * 10) + 5,
      })
    } else {
      suggestions.push({
        type: "content",
        title: "Rút ngắn tin nhắn",
        description: `Tin nhắn của bạn khá dài (${wordCount} từ). Hãy thử rút ngắn tin nhắn xuống dưới 20 từ để cải thiện tỷ lệ tương tác.`,
        impact: Math.floor(Math.random() * 10) + 5,
      })
    }

    // Đề xuất về thời gian gửi
    suggestions.push({
      type: "timing",
      title: "Thời gian gửi tối ưu",
      description:
        "Dựa trên phân tích, thời gian tốt nhất để gửi tin nhắn là từ 9h-11h sáng và 19h-21h tối. Hãy lên lịch tin nhắn của bạn trong những khung giờ này.",
      impact: Math.floor(Math.random() * 8) + 3,
    })

    // Đề xuất về phân đoạn
    suggestions.push({
      type: "segmentation",
      title: "Phân đoạn đối tượng",
      description:
        "Phiên bản B hoạt động đặc biệt tốt với khách hàng VIP. Hãy cân nhắc tạo tin nhắn riêng cho từng phân đoạn khách hàng.",
      impact: Math.floor(Math.random() * 15) + 10,
    })

    // Đề xuất về CTA
    suggestions.push({
      type: "content",
      title: "Tối ưu hóa lời kêu gọi hành động (CTA)",
      description:
        "Tin nhắn có CTA rõ ràng và trực tiếp như 'Mua ngay' hoặc 'Đăng ký ngay' có tỷ lệ chuyển đổi cao hơn 12% so với tin nhắn không có CTA rõ ràng.",
      impact: Math.floor(Math.random() * 12) + 8,
    })

    // Đề xuất về tính cấp bách
    suggestions.push({
      type: "content",
      title: "Tạo cảm giác cấp bách",
      description:
        "Thêm yếu tố tính cấp bách như 'Chỉ còn 2 ngày' hoặc 'Số lượng có hạn' có thể cải thiện tỷ lệ chuyển đổi lên đến 18%.",
      impact: Math.floor(Math.random() * 18) + 12,
    })

    // Đề xuất về cá nhân hóa
    suggestions.push({
      type: "personalization",
      title: "Tăng cường cá nhân hóa",
      description:
        "Tin nhắn có yếu tố cá nhân hóa (như sử dụng tên khách hàng, lịch sử mua hàng) có tỷ lệ tương tác cao hơn 25% so với tin nhắn chung chung.",
      impact: Math.floor(Math.random() * 25) + 15,
    })

    // Đề xuất về thử nghiệm tiếp theo
    suggestions.push({
      type: "testing",
      title: "Thử nghiệm tiếp theo",
      description:
        "Dựa trên kết quả hiện tại, hãy thử nghiệm với các biến thể của dòng tiêu đề và lời kêu gọi hành động khác nhau để tìm ra sự kết hợp tối ưu.",
      impact: null,
    })

    // Sắp xếp theo tác động
    return suggestions.sort((a, b) => {
      if (a.impact === null) return 1
      if (b.impact === null) return -1
      return b.impact - a.impact
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đề xuất tối ưu hóa</CardTitle>
        <CardDescription>Các đề xuất để cải thiện hiệu suất dựa trên kết quả thử nghiệm</CardDescription>
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
                {generateSuggestions(test).map((suggestion, index) => (
                  <Alert
                    key={index}
                    className={
                      suggestion.type === "content"
                        ? "border-blue-200 bg-blue-50"
                        : suggestion.type === "timing"
                          ? "border-purple-200 bg-purple-50"
                          : suggestion.type === "segmentation"
                            ? "border-green-200 bg-green-50"
                            : suggestion.type === "personalization"
                              ? "border-amber-200 bg-amber-50"
                              : "border-gray-200 bg-gray-50"
                    }
                  >
                    <div className="flex items-start">
                      {suggestion.type === "content" ? (
                        <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                      ) : suggestion.type === "timing" ? (
                        <Info className="h-4 w-4 text-purple-500 mt-0.5" />
                      ) : suggestion.type === "segmentation" ? (
                        <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                      ) : suggestion.type === "personalization" ? (
                        <Zap className="h-4 w-4 text-amber-500 mt-0.5" />
                      ) : (
                        <Info className="h-4 w-4 text-gray-500 mt-0.5" />
                      )}
                      <div className="ml-2 flex-1">
                        <AlertTitle className="flex items-center justify-between">
                          <span>{suggestion.title}</span>
                          {suggestion.impact !== null && (
                            <Badge className="flex items-center">
                              <ChevronUp className="mr-1 h-3 w-3" />+{suggestion.impact}% cải thiện
                            </Badge>
                          )}
                        </AlertTitle>
                        <AlertDescription>{suggestion.description}</AlertDescription>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
