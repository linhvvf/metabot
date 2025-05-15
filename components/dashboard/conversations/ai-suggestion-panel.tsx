"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Bot, RefreshCw, ThumbsUp, ThumbsDown, Copy } from "lucide-react"

interface AISuggestionPanelProps {
  message: string
  conversation: any[]
  customerInfo: any
  onSelectSuggestion: (suggestion: string) => void
  isVisible: boolean
}

export default function AISuggestionPanel({
  message,
  conversation,
  customerInfo,
  onSelectSuggestion,
  isVisible,
}: AISuggestionPanelProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("suggestions")
  const { toast } = useToast()

  useEffect(() => {
    if (isVisible && message) {
      generateSuggestions()
    }
  }, [isVisible, message])

  const generateSuggestions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/suggest-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversation,
          customerInfo,
        }),
      })

      if (!response.ok) {
        throw new Error("Không thể tạo gợi ý trả lời")
      }

      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (err) {
      console.error("Error generating suggestions:", err)
      setError("Không thể tạo gợi ý trả lời. Vui lòng thử lại sau.")
      toast({
        title: "Lỗi",
        description: "Không thể tạo gợi ý trả lời. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectSuggestion = (suggestion: string) => {
    onSelectSuggestion(suggestion)
    toast({
      title: "Đã chọn gợi ý",
      description: "Gợi ý đã được thêm vào ô nhập tin nhắn",
    })
  }

  const handleCopySuggestion = (suggestion: string) => {
    navigator.clipboard.writeText(suggestion)
    toast({
      title: "Đã sao chép",
      description: "Gợi ý đã được sao chép vào clipboard",
    })
  }

  const handleFeedback = (type: "positive" | "negative") => {
    toast({
      title: type === "positive" ? "Phản hồi tích cực" : "Phản hồi tiêu cực",
      description: "Cảm ơn bạn đã gửi phản hồi về gợi ý AI",
    })
  }

  if (!isVisible) return null

  return (
    <Card className="p-4 mb-4 border-blue-200 bg-blue-50/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bot className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-medium">Gợi ý trả lời từ AI</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={generateSuggestions} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="suggestions">Gợi ý</TabsTrigger>
          <TabsTrigger value="templates">Mẫu câu</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-600">
              <p>{error}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={generateSuggestions}>
                Thử lại
              </Button>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p>Không có gợi ý nào. Vui lòng thử lại.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="bg-white p-3 rounded-md border hover:border-blue-300 transition-colors">
                  <p className="text-sm mb-2">{suggestion}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => handleFeedback("positive")}>
                        <ThumbsUp className="h-3.5 w-3.5 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => handleFeedback("negative")}>
                        <ThumbsDown className="h-3.5 w-3.5 text-gray-500" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7"
                        onClick={() => handleCopySuggestion(suggestion)}
                      >
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Sao chép
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        Sử dụng
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 text-center mt-2">
                Gợi ý được tạo bởi AI và có thể cần chỉnh sửa trước khi gửi
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-md border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">Chào mừng</h4>
                <Badge variant="outline" className="text-xs">
                  Phổ biến
                </Badge>
              </div>
              <p className="text-sm mb-2">Xin chào! Cảm ơn bạn đã liên hệ với Metabot. Tôi có thể giúp gì cho bạn?</p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7"
                  onClick={() =>
                    handleSelectSuggestion("Xin chào! Cảm ơn bạn đã liên hệ với Metabot. Tôi có thể giúp gì cho bạn?")
                  }
                >
                  Sử dụng
                </Button>
              </div>
            </div>

            <div className="bg-white p-3 rounded-md border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">Cảm ơn</h4>
                <Badge variant="outline" className="text-xs">
                  Phổ biến
                </Badge>
              </div>
              <p className="text-sm mb-2">
                Cảm ơn bạn đã chia sẻ thông tin. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.
              </p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7"
                  onClick={() =>
                    handleSelectSuggestion(
                      "Cảm ơn bạn đã chia sẻ thông tin. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.",
                    )
                  }
                >
                  Sử dụng
                </Button>
              </div>
            </div>

            <div className="bg-white p-3 rounded-md border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">Kết thúc</h4>
                <Badge variant="outline" className="text-xs">
                  Phổ biến
                </Badge>
              </div>
              <p className="text-sm mb-2">
                Cảm ơn bạn đã liên hệ với chúng tôi. Nếu có bất kỳ câu hỏi nào khác, đừng ngần ngại liên hệ lại nhé!
              </p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7"
                  onClick={() =>
                    handleSelectSuggestion(
                      "Cảm ơn bạn đã liên hệ với chúng tôi. Nếu có bất kỳ câu hỏi nào khác, đừng ngần ngại liên hệ lại nhé!",
                    )
                  }
                >
                  Sử dụng
                </Button>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="w-full mt-2">
              Xem tất cả mẫu câu
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Tự động gợi ý</h4>
                <p className="text-xs text-gray-500">Tự động hiển thị gợi ý khi nhận tin nhắn mới</p>
              </div>
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="auto-suggest"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Mô hình AI</h4>
                <p className="text-xs text-gray-500">Chọn mô hình AI để tạo gợi ý</p>
              </div>
              <select className="text-sm border rounded p-1">
                <option value="gpt-4o">GPT-4o (Mặc định)</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Số lượng gợi ý</h4>
                <p className="text-xs text-gray-500">Số lượng gợi ý hiển thị mỗi lần</p>
              </div>
              <select className="text-sm border rounded p-1">
                <option value="3">3 gợi ý (Mặc định)</option>
                <option value="1">1 gợi ý</option>
                <option value="5">5 gợi ý</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Ngôn ngữ gợi ý</h4>
                <p className="text-xs text-gray-500">Ngôn ngữ chính cho gợi ý</p>
              </div>
              <select className="text-sm border rounded p-1">
                <option value="vi">Tiếng Việt (Mặc định)</option>
                <option value="en">Tiếng Anh</option>
                <option value="auto">Tự động phát hiện</option>
              </select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
