"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  RefreshCw,
  Map,
  MessageSquare,
  Languages,
  Globe,
  BookOpen,
  MessageCircle,
  AlertCircle,
  ThumbsUp,
  Lightbulb,
  ArrowRight,
  ScanSearch,
  MessageSquareText,
  ReplaceAll,
} from "lucide-react"

interface DialectAnalysisPanelProps {
  message: string
  conversation: any[]
  isVisible: boolean
  onResponseSelect?: (response: string) => void
}

interface RegionalWord {
  word: string
  meaning: string
  standardVietnamese: string
}

interface SlangWord {
  word: string
  meaning: string
  context: string
}

interface ModernExpression {
  expression: string
  meaning: string
  origin?: string
}

interface Abbreviation {
  abbr: string
  fullForm: string
  meaning: string
}

type FormalityLevel = "formal" | "semi-formal" | "informal" | "very-informal"

export default function DialectAnalysisPanel({
  message,
  conversation,
  isVisible,
  onResponseSelect,
}: DialectAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isVisible && message) {
      analyzeDialect()
    }
  }, [isVisible, message])

  const analyzeDialect = async () => {
    if (!message) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/vietnamese-dialect-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationContext: conversation,
        }),
      })

      if (!response.ok) {
        throw new Error("Không thể phân tích ngôn ngữ địa phương")
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      console.error("Error analyzing dialect:", err)
      setError("Không thể phân tích ngôn ngữ địa phương. Vui lòng thử lại sau.")
      toast({
        title: "Lỗi",
        description: "Không thể phân tích ngôn ngữ địa phương. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getRegionColor = (region: string | null) => {
    if (!region) return "bg-gray-100 text-gray-800 border-gray-200"

    switch (region.toLowerCase()) {
      case "miền bắc":
      case "bắc bộ":
        return "bg-red-100 text-red-800 border-red-200"
      case "miền trung":
      case "trung bộ":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "miền nam":
      case "nam bộ":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "tây nguyên":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-purple-100 text-purple-800 border-purple-200"
    }
  }

  const getFormalityColor = (level: FormalityLevel) => {
    switch (level) {
      case "formal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "semi-formal":
        return "bg-green-100 text-green-800 border-green-200"
      case "informal":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "very-informal":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getFormalityLabel = (level: FormalityLevel) => {
    switch (level) {
      case "formal":
        return "Trang trọng"
      case "semi-formal":
        return "Lịch sự"
      case "informal":
        return "Thân mật"
      case "very-informal":
        return "Suồng sã"
      default:
        return "Trung tính"
    }
  }

  const getConfidenceBar = (confidence: number) => {
    let color = "bg-red-500"
    if (confidence >= 0.7) color = "bg-green-500"
    else if (confidence >= 0.4) color = "bg-yellow-500"

    return (
      <div className="w-full space-y-1">
        <div className="flex justify-between text-xs">
          <span>Độ tin cậy</span>
          <span>{Math.round(confidence * 100)}%</span>
        </div>
        <Progress value={confidence * 100} className="h-2 bg-gray-100" indicatorClassName={color} />
      </div>
    )
  }

  if (!isVisible) return null

  return (
    <Card className="p-4 mb-4 border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Map className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Phân tích ngôn ngữ địa phương Việt Nam</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-xs px-2 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
            onClick={analyzeDialect}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            Làm mới
          </button>
        </div>
      </div>

      <Tabs defaultValue="regional">
        <TabsList className="mb-4 w-full grid grid-cols-4">
          <TabsTrigger value="regional" className="flex-1">
            Vùng miền
          </TabsTrigger>
          <TabsTrigger value="slang" className="flex-1">
            Biệt ngữ
          </TabsTrigger>
          <TabsTrigger value="culture" className="flex-1">
            Văn hóa
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex-1">
            Gợi ý
          </TabsTrigger>
        </TabsList>

        <TabsContent value="regional">
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
                onClick={analyzeDialect}
              >
                Thử lại
              </button>
            </div>
          ) : analysis?.dialectAnalysis?.regionalDialect ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1">Phương ngữ vùng miền</div>
                  <Badge className={getRegionColor(analysis.dialectAnalysis.regionalDialect.region)}>
                    {analysis.dialectAnalysis.regionalDialect.region || "Không xác định"}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium mb-1">Mức độ trang trọng</div>
                  <Badge className={getFormalityColor(analysis.dialectAnalysis.formalityLevel?.level)}>
                    {getFormalityLabel(analysis.dialectAnalysis.formalityLevel?.level)}
                  </Badge>
                </div>
              </div>

              {analysis.dialectAnalysis.regionalDialect.confidence > 0 && (
                <div className="mb-4">{getConfidenceBar(analysis.dialectAnalysis.regionalDialect.confidence)}</div>
              )}

              {analysis.dialectAnalysis.regionalDialect.dialectFeatures?.length > 0 && (
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <div className="text-sm font-medium mb-2">Đặc điểm phương ngữ</div>
                  <ul className="space-y-1 text-sm">
                    {analysis.dialectAnalysis.regionalDialect.dialectFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.dialectAnalysis.regionalDialect.regionalWords?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Từ ngữ đặc trưng vùng miền</h4>
                  <div className="space-y-2">
                    {analysis.dialectAnalysis.regionalDialect.regionalWords.map((word: RegionalWord, index: number) => (
                      <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                        <div className="flex items-center mb-1">
                          <Badge
                            variant="outline"
                            className={getRegionColor(analysis.dialectAnalysis.regionalDialect.region)}
                          >
                            {word.word}
                          </Badge>
                          {word.standardVietnamese && (
                            <div className="ml-2 flex items-center text-xs text-gray-500">
                              <ReplaceAll className="h-3 w-3 mr-1" />
                              <span>Chuẩn: {word.standardVietnamese}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm">{word.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.dialectAnalysis.expressionStyle?.notable?.length > 0 && (
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <div className="text-sm font-medium mb-2">Cách diễn đạt đáng chú ý</div>
                  <ul className="space-y-1 text-sm">
                    {analysis.dialectAnalysis.expressionStyle.notable.map((expression: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <MessageSquareText className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>{expression}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Chọn một tin nhắn để phân tích phương ngữ vùng miền</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="slang">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-600">
              <p>{error}</p>
            </div>
          ) : analysis?.dialectAnalysis?.slang ? (
            <div className="space-y-4">
              {analysis.dialectAnalysis.slang.slangWords?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Từ lóng/biệt ngữ</h4>
                  <div className="space-y-2">
                    {analysis.dialectAnalysis.slang.slangWords.map((slang: SlangWord, index: number) => (
                      <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                        <div className="mb-1">
                          <Badge variant="secondary">{slang.word}</Badge>
                        </div>
                        <p className="text-sm">{slang.meaning}</p>
                        {slang.context && (
                          <p className="text-xs text-gray-500 mt-1">
                            <span className="font-medium">Ngữ cảnh:</span> {slang.context}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.dialectAnalysis.slang.modernExpressions?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Cách diễn đạt hiện đại</h4>
                  <div className="space-y-2">
                    {analysis.dialectAnalysis.slang.modernExpressions.map(
                      (expression: ModernExpression, index: number) => (
                        <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="mb-1">
                            <Badge variant="outline" className="bg-purple-50">
                              {expression.expression}
                            </Badge>
                          </div>
                          <p className="text-sm">{expression.meaning}</p>
                          {expression.origin && (
                            <p className="text-xs text-gray-500 mt-1">
                              <span className="font-medium">Nguồn gốc:</span> {expression.origin}
                            </p>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {analysis.dialectAnalysis.abbreviations?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Từ viết tắt</h4>
                  <div className="space-y-2">
                    {analysis.dialectAnalysis.abbreviations.map((abbr: Abbreviation, index: number) => (
                      <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="bg-blue-50 font-mono">
                            {abbr.abbr}
                          </Badge>
                          <span className="text-xs text-gray-500">→</span>
                          <span className="text-sm font-medium">{abbr.fullForm}</span>
                        </div>
                        <p className="text-sm">{abbr.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.dialectAnalysis.expressionStyle?.specialStructures?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Cấu trúc câu đặc biệt</h4>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <ul className="space-y-1 text-sm">
                      {analysis.dialectAnalysis.expressionStyle.specialStructures.map(
                        (structure: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <ScanSearch className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{structure}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {!analysis.dialectAnalysis.slang.slangWords?.length &&
                !analysis.dialectAnalysis.slang.modernExpressions?.length &&
                !analysis.dialectAnalysis.abbreviations?.length && (
                  <div className="p-4 bg-gray-50 rounded-md text-center">
                    <Languages className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Không phát hiện biệt ngữ hoặc tiếng lóng đặc trưng trong tin nhắn này.
                    </p>
                  </div>
                )}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>Chọn một tin nhắn để phân tích biệt ngữ và tiếng lóng</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="culture">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-600">
              <p>{error}</p>
            </div>
          ) : analysis?.dialectAnalysis?.culturalContext ? (
            <div className="space-y-4">
              {analysis.dialectAnalysis.culturalContext.references?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Tham chiếu văn hóa</h4>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <ul className="space-y-1 text-sm">
                      {analysis.dialectAnalysis.culturalContext.references.map((reference: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>{reference}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {analysis.dialectAnalysis.culturalContext.requiredKnowledge?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Kiến thức văn hóa cần thiết</h4>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <ul className="space-y-1 text-sm">
                      {analysis.dialectAnalysis.culturalContext.requiredKnowledge.map(
                        (knowledge: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <span>{knowledge}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {analysis.dialectAnalysis.formalityLevel?.indicators?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Dấu hiệu độ trang trọng</h4>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <div className="mb-2 flex items-center">
                      <Badge className={getFormalityColor(analysis.dialectAnalysis.formalityLevel.level)}>
                        {getFormalityLabel(analysis.dialectAnalysis.formalityLevel.level)}
                      </Badge>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {analysis.dialectAnalysis.formalityLevel.indicators.map((indicator: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {!analysis.dialectAnalysis.culturalContext.references?.length &&
                !analysis.dialectAnalysis.culturalContext.requiredKnowledge?.length && (
                  <div className="p-4 bg-gray-50 rounded-md text-center">
                    <Globe className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Không phát hiện tham chiếu văn hóa đặc biệt trong tin nhắn này.
                    </p>
                  </div>
                )}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>Chọn một tin nhắn để phân tích ngữ cảnh văn hóa</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="suggestions">
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
          ) : analysis?.dialectAnalysis?.responseRecommendations ? (
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <div className="text-sm font-medium mb-2">Phong cách phản hồi đề xuất</div>
                <Badge className="mb-2">{analysis.dialectAnalysis.responseRecommendations.style}</Badge>
                {analysis.dialectAnalysis.responseRecommendations.dialectMatchingTips?.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm font-medium mb-1">Mẹo giao tiếp phù hợp</div>
                    <ul className="space-y-1 text-sm">
                      {analysis.dialectAnalysis.responseRecommendations.dialectMatchingTips.map(
                        (tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {analysis.dialectAnalysis.responseRecommendations.suggestions?.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Gợi ý phản hồi</div>
                  {analysis.dialectAnalysis.responseRecommendations.suggestions.map(
                    (suggestion: string, index: number) => (
                      <div
                        key={index}
                        className="bg-blue-50 p-3 rounded-md border border-blue-200 flex items-start gap-2 cursor-pointer hover:bg-blue-100"
                        onClick={() => onResponseSelect && onResponseSelect(suggestion)}
                      >
                        <MessageCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm">{suggestion}</p>
                          <div className="flex justify-end mt-1">
                            <button className="text-xs text-blue-600 flex items-center gap-1">
                              <span>Sử dụng</span> <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>Chọn một tin nhắn để nhận gợi ý phản hồi</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  )
}
