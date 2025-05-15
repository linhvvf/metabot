"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { SmilePlus, Frown, Meh, AlertTriangle, ThumbsUp, RefreshCw } from "lucide-react"

interface SentimentOverviewProps {
  data?: any
  isLoading?: boolean
  onRefresh?: () => void
}

export function SentimentOverview({ data, isLoading = false, onRefresh }: SentimentOverviewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for preview/testing
  const mockData = {
    overview: {
      positiveSentiment: 45,
      neutralSentiment: 30,
      negativeSentiment: 15,
      mixedSentiment: 10,
      avgSentimentScore: 0.35,
    },
    commonEmotions: ["Hài lòng", "Quan tâm", "Thắc mắc", "Lo lắng", "Phấn khích"],
    topIssues: ["Câu hỏi về giá cả", "Vấn đề kỹ thuật", "Yêu cầu hỗ trợ", "Phàn nàn về dịch vụ"],
    summary:
      "Khách hàng nhìn chung có cảm xúc tích cực về dịch vụ. Có một số vấn đề liên quan đến giá cả và hỗ trợ kỹ thuật cần được cải thiện.",
    actionableInsights: [
      "Cảm xúc tích cực thường liên quan đến trải nghiệm khách hàng và giao diện người dùng",
      "Phản hồi tiêu cực chủ yếu liên quan đến vấn đề giá cả và kỹ thuật",
      "Khách hàng doanh nghiệp thường có nhiều câu hỏi về tính năng nâng cao",
    ],
    recommendedActions: [
      "Cập nhật tài liệu kỹ thuật để giải quyết các câu hỏi thường gặp",
      "Đào tạo thêm cho nhân viên về cách xử lý phàn nàn về giá cả",
      "Cải thiện thời gian phản hồi cho các vấn đề kỹ thuật",
    ],
  }

  // Use mock data if no data is provided
  const displayData = data || mockData

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tổng quan cảm xúc khách hàng</CardTitle>
            <CardDescription>Phân tích cảm xúc từ các cuộc hội thoại với khách hàng</CardDescription>
          </div>
          {onRefresh && (
            <button onClick={onRefresh} className="p-1 rounded-full hover:bg-gray-100" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="overview" className="flex-1">
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex-1">
              Phân tích
            </TabsTrigger>
            <TabsTrigger value="actions" className="flex-1">
              Đề xuất
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Phân bố cảm xúc</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <SmilePlus className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Tích cực</span>
                    </div>
                    <span className="text-sm font-medium">{displayData.overview.positiveSentiment}%</span>
                  </div>
                  <Progress value={displayData.overview.positiveSentiment} className="h-2 bg-gray-100" />
                </div>

                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Meh className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">Trung tính</span>
                    </div>
                    <span className="text-sm font-medium">{displayData.overview.neutralSentiment}%</span>
                  </div>
                  <Progress value={displayData.overview.neutralSentiment} className="h-2 bg-gray-100" />
                </div>

                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Frown className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">Tiêu cực</span>
                    </div>
                    <span className="text-sm font-medium">{displayData.overview.negativeSentiment}%</span>
                  </div>
                  <Progress value={displayData.overview.negativeSentiment} className="h-2 bg-gray-100" />
                </div>

                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm">Hỗn hợp</span>
                    </div>
                    <span className="text-sm font-medium">{displayData.overview.mixedSentiment}%</span>
                  </div>
                  <Progress value={displayData.overview.mixedSentiment} className="h-2 bg-gray-100" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium mb-3">Điểm cảm xúc trung bình</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="text-xs text-red-600">-1.0</div>
                    <div className="text-xs text-gray-600">0.0</div>
                    <div className="text-xs text-green-600">+1.0</div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div
                      style={{
                        width: `${((displayData.overview.avgSentimentScore + 1) / 2) * 100}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    ></div>
                  </div>
                  <div className="text-center mt-2">
                    <Badge className="bg-white border font-normal text-xs">
                      {displayData.overview.avgSentimentScore.toFixed(2)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium mb-3">Cảm xúc phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {displayData.commonEmotions.map((emotion: string, index: number) => (
                    <Badge key={index} variant="outline" className="px-2 py-1">
                      {emotion}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium mb-3">Vấn đề chính</h3>
                <div className="space-y-2">
                  {displayData.topIssues.map((issue: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <span className="h-5 w-5 text-xs flex items-center justify-center rounded-full bg-gray-100 mr-2">
                        {index + 1}
                      </span>
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Tóm tắt</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{displayData.summary}</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium mb-3">Phân tích chi tiết</h3>
                <div className="space-y-3">
                  {displayData.actionableInsights.map((insight: string, index: number) => (
                    <div key={index} className="flex items-start bg-white p-3 rounded-md border">
                      <ThumbsUp className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions">
            <div>
              <h3 className="text-sm font-medium mb-3">Hành động đề xuất</h3>
              <div className="space-y-3">
                {displayData.recommendedActions.map((action: string, index: number) => (
                  <div key={index} className="bg-white p-3 rounded-md border flex items-start">
                    <div className="h-5 w-5 text-xs flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-2 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Export component as named export
export default function SentimentOverviewComponent(props: SentimentOverviewProps) {
  return <SentimentOverview {...props} />
}
