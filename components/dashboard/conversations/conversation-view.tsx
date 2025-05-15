"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import SentimentAnalysisPanel from "./sentiment-analysis-panel"
import AiSuggestionPanel from "./ai-suggestion-panel"
import AdvancedSentimentAnalysis from "./advanced-sentiment-analysis"
import { Send, BarChart2, Brain, Lightbulb, PanelRightOpen, PanelRightClose, MessageSquare } from "lucide-react"
import { DialectAnalysisPanel } from "./dialect-analysis-panel"

export function ConversationView({ conversation = null, showAnalysis = true }) {
  const [message, setMessage] = useState("")
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [activeTab, setActiveTab] = useState("basic")
  const [showAiPanel, setShowAiPanel] = useState(true)
  const [showSentimentPanel, setShowSentimentPanel] = useState(true)
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(showAnalysis)
  const [showDialectAnalysis, setShowDialectAnalysis] = useState(false)

  const mockConversation = {
    id: "conv123",
    customer: {
      id: "cust456",
      name: "Nguyễn Văn A",
      avatar: "/user-avatar-1.png",
    },
    agent: {
      id: "agent789",
      name: "Trần Thị B",
      avatar: "/female-manager-avatar.png",
    },
    messages: [
      {
        id: "msg1",
        content: "Chào bạn, tôi muốn hỏi về sản phẩm X mới ra mắt có những tính năng gì vậy?",
        timestamp: "2023-11-01T09:30:00Z",
        sender: "user",
      },
      {
        id: "msg2",
        content:
          "Chào anh Nguyễn Văn A, em rất vui được hỗ trợ anh. Sản phẩm X mới của chúng tôi có các tính năng như A, B, C và đặc biệt là tính năng D mà khách hàng rất yêu thích.",
        timestamp: "2023-11-01T09:32:00Z",
        sender: "agent",
      },
      {
        id: "msg3",
        content: "Tính năng D hoạt động như thế nào vậy? Tôi thấy khá thú vị.",
        timestamp: "2023-11-01T09:33:00Z",
        sender: "user",
      },
      {
        id: "msg4",
        content:
          "Dạ, tính năng D cho phép anh tự động hóa quy trình làm việc và tiết kiệm đến 40% thời gian. Anh chỉ cần thiết lập một lần và hệ thống sẽ tự động xử lý mọi thứ.",
        timestamp: "2023-11-01T09:34:00Z",
        sender: "agent",
      },
      {
        id: "msg5",
        content: "Nghe có vẻ tốt đấy. Còn giá cả thì sao? Có gói dùng thử không?",
        timestamp: "2023-11-01T09:35:00Z",
        sender: "user",
      },
    ],
    channel: "zalo",
    status: "active",
    created_at: "2023-11-01T09:30:00Z",
    updated_at: "2023-11-01T09:35:00Z",
  }

  const currentConversation = conversation || mockConversation

  const handleSendMessage = () => {
    if (!message.trim()) return
    // Xử lý gửi tin nhắn ở đây
    setMessage("")
  }

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg)
  }

  const handleUseSuggestion = (suggestion) => {
    setMessage(suggestion)
  }

  const handleDialectAnalysisToggle = () => {
    setShowDialectAnalysis((prev) => !prev)
  }

  return (
    <div className="flex h-[calc(100vh-130px)]">
      <div className={`flex flex-col flex-1 ${showAnalysisPanel ? "border-r" : ""}`}>
        <Card className="rounded-none border-0 flex-1">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img
                    src={currentConversation.customer.avatar || "/placeholder.svg"}
                    alt={currentConversation.customer.name}
                  />
                </Avatar>
                <div>
                  <div className="font-medium">{currentConversation.customer.name}</div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-xs">
                      {currentConversation.channel}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Button variant="ghost" size="icon" onClick={() => setShowAnalysisPanel(!showAnalysisPanel)}>
                  {showAnalysisPanel ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
                    onClick={() => handleSelectMessage(msg)}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "user" ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                      } ${selectedMessage?.id === msg.id ? "ring-2 ring-ring ring-offset-1" : ""}`}
                    >
                      <p>{msg.content}</p>
                      <div
                        className={`text-xs mt-1 ${msg.sender === "user" ? "text-muted-foreground" : "text-primary-foreground/80"}`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 min-h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAnalysisPanel && (
        <div className="w-[450px] flex flex-col">
          <div className="p-3 border-b">
            <Tabs
              defaultValue="ai"
              onValueChange={(value) => {
                if (value === "sentiment") {
                  setShowSentimentPanel(true)
                  setShowAiPanel(false)
                } else if (value === "ai") {
                  setShowSentimentPanel(false)
                  setShowAiPanel(true)
                } else if (value === "both") {
                  setShowSentimentPanel(true)
                  setShowAiPanel(true)
                }
              }}
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="ai">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Gợi ý AI
                </TabsTrigger>
                <TabsTrigger value="sentiment">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Phân tích
                </TabsTrigger>
                <TabsTrigger value="both">
                  <Brain className="h-4 w-4 mr-2" />
                  Tất cả
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="flex-1 p-4">
            {showAiPanel && (
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  <h3 className="text-sm font-medium">Gợi ý trả lời thông minh</h3>
                </div>
                <AiSuggestionPanel
                  message={selectedMessage?.content}
                  conversation={currentConversation.messages}
                  isVisible={!!selectedMessage}
                  onUseSuggestion={handleUseSuggestion}
                />
              </div>
            )}

            {showSentimentPanel && (
              <>
                <div className="mb-2">
                  <Tabs defaultValue="advanced" onValueChange={setActiveTab}>
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="basic">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Cơ bản
                      </TabsTrigger>
                      <TabsTrigger value="advanced">
                        <Brain className="h-4 w-4 mr-2" />
                        Nâng cao
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {activeTab === "basic" ? (
                  <SentimentAnalysisPanel
                    message={selectedMessage?.content}
                    conversation={currentConversation.messages}
                    isVisible={!!selectedMessage}
                  />
                ) : (
                  <AdvancedSentimentAnalysis
                    message={selectedMessage?.content}
                    conversation={currentConversation.messages}
                    isVisible={!!selectedMessage}
                    onInsightSelect={handleUseSuggestion}
                  />
                )}
              </>
            )}
            {showDialectAnalysis && (
              <DialectAnalysisPanel
                message={selectedMessage?.content || ""}
                conversation={currentConversation.messages}
                isVisible={showDialectAnalysis}
                onResponseSelect={handleUseSuggestion}
              />
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
