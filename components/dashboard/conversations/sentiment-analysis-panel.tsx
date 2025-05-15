"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { SmilePlus, Frown, Meh, AlertTriangle, BarChart2, MessageSquare, RefreshCw, CheckCircle2 } from "lucide-react"

interface SentimentAnalysisPanelProps {
  message: string
  conversation: any[]
  isVisible: boolean
}

type SentimentType = "positive" | "negative" | "neutral" | "mixed"

interface SentimentAnalysis {
  sentiment: SentimentType
  score: number
  emotions: string[]
  dominantEmotion: string
  intensity: "high" | "medium" | "low"
  urgency: "high" | "medium" | "low"
  keywords: string[]
  summary: string
  responseStrategies: string[]
}

export default function SentimentAnalysisPanel({ message, conversation, isVisible }: SentimentAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isVisible && message) {
      analyzeSentiment()
    }
  }, [isVisible, message])

  const analyzeSentiment = async () => {
    if (!message) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/sentiment-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversation,
        }),
      })

      if (!response.ok) {
        throw new Error("Không thể phân tích cảm xúc")
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      console.error("Error analyzing sentiment:", err)
      setError("Không thể phân tích cảm xúc. Vui lòng thử lại sau.")
      toast({
        title: "Lỗi",
        description: "Không thể phân tích cảm xúc. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getSentimentIcon = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "positive":
        return <SmilePlus className="h-5 w-5 text-green-500" />
      case "negative":
        return <Frown className="h-5 w-5 text-red-500" />
      case "neutral":
        return <Meh className="h-5 w-5 text-gray-500" />
      case "mixed":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Meh className="h-5 w-5 text-gray-500" />
    }
  }

  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200"
      case "negative":
        return "bg-red-100 text-red-800 border-red-200"
      case "neutral":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "mixed":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cao</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Trung bình</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Thấp</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không xác định</Badge>
    }
  }

  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case "high":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Cao</Badge>
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Trung bình</Badge>
      case "low":
        return <Badge className="bg-teal-100 text-teal-800 border-teal-200">Thấp</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không xác định</Badge>
    }
  }

  if (!isVisible) return null

  return (
    <Card className={`p-4 mb-4 border ${analysis ? getSentimentColor(analysis.sentiment) : "border-gray-200"}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BarChart2 className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Phân tích cảm xúc</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-xs px-2 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
            onClick={analyzeSentiment}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            Làm mới
          </button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="overview" className="flex-1">
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="emotions" className="flex-1">
            Cảm xúc
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex-1">
            Chiến lược
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-600">
              <p>{error}</p>
              <button
                className="mt-2 text-xs px-2 py-1 rounded bg-white border border-gray-200"
                onClick={analyzeSentiment}
              >
                Thử lại
              </button>
            </div>
          ) : analysis ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${getSentimentColor(analysis.sentiment)} bg-opacity-20`}>
                  {getSentimentIcon(analysis.sentiment)}
                </div>
                <div>
                  <div className="font-medium">
                    Cảm xúc chính:{" "}
                    {analysis.sentiment === "positive"
                      ? "Tích cực"
                      : analysis.sentiment === "negative"
                        ? "Tiêu cực"
                        : analysis.sentiment === "neutral"
                          ? "Trung tính"
                          : "Hỗn hợp"}
                  </div>
                  <div className="text-sm text-gray-600">Điểm số: {analysis.score.toFixed(2)}</div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-md border border-gray-200">
                <div className="text-sm font-medium mb-1">Tóm tắt cảm xúc</div>
                <p className="text-sm">{analysis.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <div className="text-sm font-medium mb-1">Mức độ khẩn cấp</div>
                  <div>{getUrgencyBadge(analysis.urgency)}</div>
                </div>
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <div className="text-sm font-medium mb-1">Cường độ cảm xúc</div>
                  <div>{getIntensityBadge(analysis.intensity)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Chọn một tin nhắn để phân tích cảm xúc</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="emotions">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-600">
              <p>{error}</p>
            </div>
          ) : analysis ? (
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <div className="text-sm font-medium mb-2">Cảm xúc chính</div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
                    {analysis.dominantEmotion}
                  </Badge>
                </div>
              </div>

              <div className="bg-white p-3 rounded-md border border-gray-200">
                <div className="text-sm font-medium mb-2">Tất cả cảm xúc được phát hiện</div>
                <div className="flex flex-wrap gap-2">
                  {analysis.emotions.map((emotion, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1">
                      {emotion}
                    </Badge>
                  ))}
                </div>
              </div>

              {analysis.keywords.length > 0 && (
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <div className="text-sm font-medium mb-2">Từ khóa cảm xúc</div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50 px-2 py-1">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>Chọn một tin nhắn để phân tích cảm xúc</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="strategies">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-600">
              <p>{error}</p>
            </div>
          ) : analysis ? (
            <div className="space-y-2">
              <div className="text-sm font-medium mb-1">Chiến lược phản hồi đề xuất</div>
              {analysis.responseStrategies.map((strategy, index) => (
                <div key={index} className="bg-white p-3 rounded-md border border-gray-200 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{strategy}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>Chọn một tin nhắn để phân tích cảm xúc</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  )
}
