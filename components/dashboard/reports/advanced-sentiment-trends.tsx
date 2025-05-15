"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  AlertCircle,
  BarChart2,
  Target,
  Lightbulb,
  CheckCircle2,
  ThumbsUp,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Legend,
  Cell,
} from "recharts"

interface SentimentTrendsAnalysisProps {
  initialData?: any
  isLoading?: boolean
  onRefresh?: () => void
}

export default function AdvancedSentimentTrends({
  initialData,
  isLoading = false,
  onRefresh,
}: SentimentTrendsAnalysisProps) {
  const [period, setPeriod] = useState("month")
  const [comparePrevious, setComparePrevious] = useState(true)
  const [channel, setChannel] = useState("all")

  // Dữ liệu mẫu cho biểu đồ
  const sentimentTrendData = [
    { date: "T1", positive: 65, neutral: 25, negative: 10, mixed: 5 },
    { date: "T2", positive: 62, neutral: 28, negative: 8, mixed: 2 },
    { date: "T3", positive: 60, neutral: 20, negative: 15, mixed: 5 },
    { date: "T4", positive: 58, neutral: 22, negative: 18, mixed: 2 },
    { date: "T5", positive: 64, neutral: 20, negative: 12, mixed: 4 },
    { date: "T6", positive: 68, neutral: 17, negative: 10, mixed: 5 },
    { date: "T7", positive: 72, neutral: 15, negative: 8, mixed: 5 },
    { date: "T8", positive: 75, neutral: 13, negative: 7, mixed: 5 },
    { date: "T9", positive: 70, neutral: 15, negative: 10, mixed: 5 },
    { date: "T10", positive: 72, neutral: 13, negative: 12, mixed: 3 },
    { date: "T11", positive: 75, neutral: 15, negative: 8, mixed: 2 },
    { date: "T12", positive: 78, neutral: 12, negative: 7, mixed: 3 },
    { date: "T13", positive: 80, neutral: 12, negative: 5, mixed: 3 },
    { date: "T14", positive: 82, neutral: 10, negative: 5, mixed: 3 },
    { date: "T15", positive: 80, neutral: 12, negative: 6, mixed: 2 },
  ]

  const channelComparisonData = [
    { name: "Zalo", positive: 75, neutral: 15, negative: 10 },
    { name: "Facebook", positive: 65, neutral: 20, negative: 15 },
    { name: "WhatsApp", positive: 70, neutral: 20, negative: 10 },
    { name: "Telegram", positive: 60, neutral: 25, negative: 15 },
    { name: "SMS", positive: 50, neutral: 30, negative: 20 },
  ]

  const timeSlotData = [
    { name: "Sáng", value: 72, sentiment: "positive" },
    { name: "Trưa", value: 65, sentiment: "positive" },
    { name: "Chiều", value: 68, sentiment: "positive" },
    { name: "Tối", value: 60, sentiment: "mixed" },
    { name: "Đêm", value: 45, sentiment: "negative" },
  ]

  const topicSentimentData = [
    { name: "Sản phẩm mới", positive: 85, neutral: 10, negative: 5 },
    { name: "Giá cả", positive: 40, neutral: 20, negative: 40 },
    { name: "Hỗ trợ KT", positive: 55, neutral: 25, negative: 20 },
    { name: "Giao hàng", positive: 65, neutral: 15, negative: 20 },
    { name: "Trả hàng", positive: 30, neutral: 20, negative: 50 },
  ]

  const emotionShifts = {
    improvingTopics: ["Sản phẩm mới", "Giao diện người dùng", "Chính sách bảo hành"],
    decliningTopics: ["Thời gian phản hồi hỗ trợ kỹ thuật", "Chính sách hoàn tiền"],
    volatileTopics: ["Giá cả", "Thời gian giao hàng"],
    stableTopics: ["Chất lượng sản phẩm", "Thái độ nhân viên", "Hướng dẫn sử dụng"],
  }

  const emotionTriggers = {
    positive: ["Giảm giá và khuyến mãi", "Thời gian phản hồi nhanh", "Sản phẩm mới với tính năng được yêu cầu"],
    negative: ["Lỗi kỹ thuật kéo dài", "Thay đổi giá bất ngờ", "Thời gian chờ hỗ trợ kỹ thuật dài"],
  }

  const customerSegments = [
    {
      segment: "Khách hàng mới",
      dominantEmotion: "mixed",
      score: 0.3,
      topics: ["Giá cả", "Hướng dẫn sử dụng", "Tính năng"],
    },
    {
      segment: "Người dùng trung cấp",
      dominantEmotion: "positive",
      score: 0.7,
      topics: ["Sản phẩm mới", "Cập nhật", "Tương thích"],
    },
    {
      segment: "Khách hàng lâu năm",
      dominantEmotion: "positive",
      score: 0.8,
      topics: ["Ưu đãi đặc biệt", "Chương trình VIP", "Trải nghiệm"],
    },
    {
      segment: "Khách hàng doanh nghiệp",
      dominantEmotion: "positive",
      score: 0.6,
      topics: ["Hỗ trợ doanh nghiệp", "Giải pháp tùy chỉnh", "Giá đặc biệt"],
    },
  ]

  const predictions = {
    nextPeriodTrend: "tích cực tăng",
    sentimentForecast: {
      positive: 82,
      neutral: 11,
      negative: 5,
      mixed: 2,
    },
    riskyAreas: ["Hỗ trợ kỹ thuật vào cuối tuần", "Thời gian phản hồi khiếu nại"],
    opportunityAreas: ["Tăng cường trải nghiệm ứng dụng di động", "Chương trình khách hàng thân thiết"],
  }

  const actionableInsights = {
    summary:
      "Cảm xúc khách hàng có xu hướng tích cực mạnh mẽ, với sự cải thiện đáng kể về trải nghiệm sản phẩm mới. Tuy nhiên, vẫn cần cải thiện thời gian phản hồi hỗ trợ kỹ thuật và làm rõ hơn chính sách giá.",
    keyTakeaways: [
      "Sản phẩm mới được đón nhận tích cực với xu hướng tăng 9.3%",
      "Khách hàng lâu năm có cảm xúc tích cực cao nhất (80%)",
      "Thời điểm buổi sáng có tỷ lệ cảm xúc tích cực cao nhất",
      "Cần cải thiện hỗ trợ kỹ thuật vào cuối tuần",
    ],
    recommendedActions: [
      "Tăng cường nhân viên hỗ trợ kỹ thuật vào cuối tuần",
      "Làm rõ chính sách giá và thông báo trước về các thay đổi",
      "Tạo nội dung hướng dẫn sử dụng phù hợp với khách hàng mới",
      "Phát triển thêm chương trình ưu đãi cho khách hàng lâu năm",
    ],
  }

  // Dữ liệu mẫu COLORS cho các biểu đồ
  const COLORS = {
    positive: "#22c55e",
    neutral: "#94a3b8",
    negative: "#ef4444",
    mixed: "#f59e0b",
  }

  const COLORS_ARRAY = ["#22c55e", "#94a3b8", "#ef4444", "#f59e0b", "#3b82f6", "#a855f7"]

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill="#888">
          {value}%
        </text>
      </g>
    )
  }

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Tích cực</Badge>
      case "negative":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Tiêu cực</Badge>
      case "neutral":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Trung tính</Badge>
      case "mixed":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Hỗn hợp</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không xác định</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Phân tích xu hướng cảm xúc nâng cao</CardTitle>
            <CardDescription>Phân tích chi tiết sự thay đổi cảm xúc khách hàng theo thời gian</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-sm">So sánh với kỳ trước</div>
              <Switch checked={comparePrevious} onCheckedChange={setComparePrevious} />
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Tích cực +5.2%
            </Badge>
            {onRefresh && (
              <button onClick={onRefresh} className="p-1 rounded-full hover:bg-gray-100" disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="text-sm">Khoảng thời gian:</div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Chọn thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="quarter">Quý này</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm">Kênh:</div>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Chọn kênh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả kênh</SelectItem>
                <SelectItem value="zalo">Zalo</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends">
          <TabsList className="mb-4 w-full grid grid-cols-5">
            <TabsTrigger value="trends" className="flex-1">
              Xu hướng
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex-1">
              Theo kênh
            </TabsTrigger>
            <TabsTrigger value="segments" className="flex-1">
              Phân khúc
            </TabsTrigger>
            <TabsTrigger value="shifts" className="flex-1">
              Biến động
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex-1">
              Gợi ý
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4">Xu hướng cảm xúc theo thời gian</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sentimentTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, ""]} labelFormatter={(label) => `Ngày: ${label}`} />
                      <Area
                        type="monotone"
                        dataKey="positive"
                        stackId="1"
                        stroke={COLORS.positive}
                        fill={COLORS.positive}
                        name="Tích cực"
                      />
                      <Area
                        type="monotone"
                        dataKey="neutral"
                        stackId="1"
                        stroke={COLORS.neutral}
                        fill={COLORS.neutral}
                        name="Trung tính"
                      />
                      <Area
                        type="monotone"
                        dataKey="negative"
                        stackId="1"
                        stroke={COLORS.negative}
                        fill={COLORS.negative}
                        name="Tiêu cực"
                      />
                      <Area
                        type="monotone"
                        dataKey="mixed"
                        stackId="1"
                        stroke={COLORS.mixed}
                        fill={COLORS.mixed}
                        name="Hỗn hợp"
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md border">
                  <h3 className="text-sm font-medium mb-4">Cảm xúc theo khung giờ</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeSlotData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, "Tỷ lệ tích cực"]} />
                        <Bar dataKey="value" name="Tỷ lệ cảm xúc tích cực">
                          {timeSlotData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.sentiment as keyof typeof COLORS]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md border">
                  <h3 className="text-sm font-medium mb-4">Cảm xúc theo chủ đề</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={topicSentimentData}
                        margin={{ top: 5, right: 20, left: 70, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                        <Bar dataKey="positive" stackId="a" name="Tích cực" fill={COLORS.positive} />
                        <Bar dataKey="neutral" stackId="a" name="Trung tính" fill={COLORS.neutral} />
                        <Bar dataKey="negative" stackId="a" name="Tiêu cực" fill={COLORS.negative} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4">Dự báo xu hướng cảm xúc</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Xu hướng dự báo:</span>{" "}
                    <Badge className="bg-green-100 text-green-800 border-green-200 ml-2">
                      {predictions.nextPeriodTrend}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-sm">Tích cực</span>
                      </div>
                      <span className="text-sm font-medium">{predictions.sentimentForecast.positive}%</span>
                    </div>
                    <Progress value={predictions.sentimentForecast.positive} className="h-2 bg-gray-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-gray-400 mr-2"></span>
                        <span className="text-sm">Trung tính</span>
                      </div>
                      <span className="text-sm font-medium">{predictions.sentimentForecast.neutral}%</span>
                    </div>
                    <Progress value={predictions.sentimentForecast.neutral} className="h-2 bg-gray-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                        <span className="text-sm">Tiêu cực</span>
                      </div>
                      <span className="text-sm font-medium">{predictions.sentimentForecast.negative}%</span>
                    </div>
                    <Progress value={predictions.sentimentForecast.negative} className="h-2 bg-gray-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                        <span className="text-sm">Hỗn hợp</span>
                      </div>
                      <span className="text-sm font-medium">{predictions.sentimentForecast.mixed}%</span>
                    </div>
                    <Progress value={predictions.sentimentForecast.mixed} className="h-2 bg-gray-100" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-red-600 mb-2">Khu vực rủi ro</div>
                    {predictions.riskyAreas.map((area, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-green-600 mb-2">Khu vực cơ hội</div>
                    {predictions.opportunityAreas.map((area, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="channels">
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4">So sánh cảm xúc theo kênh</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      <Legend />
                      <Bar dataKey="positive" stackId="a" name="Tích cực" fill={COLORS.positive} />
                      <Bar dataKey="neutral" stackId="a" name="Trung tính" fill={COLORS.neutral} />
                      <Bar dataKey="negative" stackId="a" name="Tiêu cực" fill={COLORS.negative} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {channelComparisonData.map((channel, index) => (
                  <div key={index} className="bg-white p-4 rounded-md border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">{channel.name}</h3>
                      <Badge
                        className={
                          channel.positive > 70
                            ? "bg-green-100 text-green-800"
                            : channel.positive > 60
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {channel.positive}% tích cực
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                            <span className="text-sm">Tích cực</span>
                          </div>
                          <span className="text-sm font-medium">{channel.positive}%</span>
                        </div>
                        <Progress value={channel.positive} className="h-2 bg-gray-100" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-gray-400 mr-2"></span>
                            <span className="text-sm">Trung tính</span>
                          </div>
                          <span className="text-sm font-medium">{channel.neutral}%</span>
                        </div>
                        <Progress value={channel.neutral} className="h-2 bg-gray-100" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                            <span className="text-sm">Tiêu cực</span>
                          </div>
                          <span className="text-sm font-medium">{channel.negative}%</span>
                        </div>
                        <Progress value={channel.negative} className="h-2 bg-gray-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="segments">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {customerSegments.map((segment, index) => (
                  <div key={index} className="bg-white p-4 rounded-md border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">{segment.segment}</h3>
                      <div className="flex items-center gap-2">
                        {getSentimentBadge(segment.dominantEmotion)}
                        <span className="text-sm font-medium">{Math.round(segment.score * 100)}%</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm font-medium mb-2">Chủ đề quan tâm</div>
                      <div className="flex flex-wrap gap-2">
                        {segment.topics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="px-2 py-1">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="w-full space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Điểm cảm xúc</span>
                          <span>{Math.round(segment.score * 100)}%</span>
                        </div>
                        <Progress
                          value={segment.score * 100}
                          className="h-2 bg-gray-100"
                          indicatorClassName={
                            segment.score > 0.7 ? "bg-green-500" : segment.score > 0.4 ? "bg-yellow-500" : "bg-red-500"
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4">Phân tích phân khúc khách hàng theo cảm xúc</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={customerSegments.map((s) => ({
                        name: s.segment,
                        score: Math.round(s.score * 100),
                      }))}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, "Điểm cảm xúc"]} />
                      <Bar dataKey="score" name="Điểm cảm xúc" fill="#3b82f6">
                        {customerSegments.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.score > 0.7 ? "#22c55e" : entry.score > 0.4 ? "#f59e0b" : "#ef4444"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shifts">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-md border">
                  <div className="flex items-center gap-2 mb-4">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <h3 className="text-sm font-medium text-green-700">Chủ đề đang cải thiện</h3>
                  </div>
                  <div className="space-y-3">
                    {emotionShifts.improvingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <span className="text-sm">{topic}</span>
                        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                          <ArrowUpRight className="h-3 w-3" />+{Math.floor(Math.random() * 10) + 1}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md border">
                  <div className="flex items-center gap-2 mb-4">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    <h3 className="text-sm font-medium text-red-700">Chủ đề đang suy giảm</h3>
                  </div>
                  <div className="space-y-3">
                    {emotionShifts.decliningTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <span className="text-sm">{topic}</span>
                        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                          <ArrowDownRight className="h-3 w-3" />-{Math.floor(Math.random() * 10) + 1}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-md border">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart2 className="h-4 w-4 text-yellow-500" />
                    <h3 className="text-sm font-medium text-yellow-700">Chủ đề không ổn định</h3>
                  </div>
                  <div className="space-y-3">
                    {emotionShifts.volatileTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <span className="text-sm">{topic}</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Biến động cao</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md border">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <h3 className="text-sm font-medium text-blue-700">Chủ đề ổn định</h3>
                  </div>
                  <div className="space-y-3">
                    {emotionShifts.stableTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <span className="text-sm">{topic}</span>
                        <Badge className="bg-blue-100 text-blue-800">Ổn định</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-md border">
                  <div className="flex items-center gap-2 mb-4">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    <h3 className="text-sm font-medium text-green-700">Yếu tố tạo cảm xúc tích cực</h3>
                  </div>
                  <div className="space-y-3">
                    {emotionTriggers.positive.map((trigger, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 border rounded-md">
                        <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md border">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <h3 className="text-sm font-medium text-red-700">Yếu tố tạo cảm xúc tiêu cực</h3>
                  </div>
                  <div className="space-y-3">
                    {emotionTriggers.negative.map((trigger, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 border rounded-md">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                        <span className="text-sm">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-3">Tổng quan phân tích</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{actionableInsights.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-md border">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <h3 className="text-sm font-medium">Thông tin quan trọng</h3>
                  </div>
                  <div className="space-y-3">
                    {actionableInsights.keyTakeaways.map((insight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-amber-50 border-amber-100 border rounded-md"
                      >
                        <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md border">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-4 w-4 text-green-500" />
                    <h3 className="text-sm font-medium">Hành động đề xuất</h3>
                  </div>
                  <div className="space-y-3">
                    {actionableInsights.recommendedActions.map((action, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-green-50 border-green-100 border rounded-md"
                      >
                        <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <h3 className="text-sm font-medium mb-4">Dự báo cảm xúc theo phân khúc khách hàng</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sentimentTrendData.slice(-8)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="#8884d8"
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#82ca9d"
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="positive"
                        name="Khách hàng mới"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="negative"
                        name="Khách hàng lâu năm"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
