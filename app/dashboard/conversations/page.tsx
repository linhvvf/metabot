"use client"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  MessageSquare,
  User,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Wand2,
  BarChart2,
} from "lucide-react"
import Image from "next/image"
import AISuggestionPanel from "@/components/dashboard/conversations/ai-suggestion-panel"
import SentimentAnalysisPanel from "@/components/dashboard/conversations/sentiment-analysis-panel"

export default function ConversationsPage() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [showAiSuggestions, setShowAiSuggestions] = useState(false)
  const [showSentimentAnalysis, setShowSentimentAnalysis] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const messageInputRef = useRef(null)

  // Lấy dữ liệu cuộc hội thoại từ mock data
  useEffect(() => {
    if (selectedChat) {
      // Trong thực tế, đây sẽ là một API call để lấy tin nhắn
      setMessages(mockMessages)
    }
  }, [selectedChat])

  const conversations = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "/user-avatar-1.png",
      lastMessage: "Tôi muốn biết thêm về dịch vụ của công ty bạn",
      time: "12:30 PM",
      unread: 2,
      channel: "Zalo",
      status: "online",
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "/diverse-user-avatar-set-2.png",
      lastMessage: "Cảm ơn bạn đã tư vấn cho tôi",
      time: "11:45 AM",
      unread: 0,
      channel: "Zalo OA",
      status: "offline",
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "/diverse-user-avatars-3.png",
      lastMessage: "Tôi cần hỗ trợ về vấn đề thanh toán",
      time: "Yesterday",
      unread: 0,
      channel: "Facebook",
      status: "online",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      avatar: "/user-avatar-4.png",
      lastMessage: "Sản phẩm của bạn có ship về tỉnh không?",
      time: "Yesterday",
      unread: 1,
      channel: "Zalo",
      status: "offline",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      avatar: "/user-avatar-5.png",
      lastMessage: "Tôi muốn đặt lịch hẹn tư vấn",
      time: "2 days ago",
      unread: 0,
      channel: "Zalo OA",
      status: "offline",
    },
  ]

  const mockMessages = [
    {
      id: 1,
      sender: "user",
      content: "Xin chào, tôi muốn biết thêm về dịch vụ của công ty bạn",
      time: "12:30 PM",
    },
    {
      id: 2,
      sender: "agent",
      content:
        "Chào anh/chị, rất vui khi được hỗ trợ. Dịch vụ của chúng tôi bao gồm quản lý giao tiếp đa kênh, tích hợp Zalo cá nhân, Zalo OA và các nền tảng OTT khác.",
      time: "12:32 PM",
    },
    {
      id: 3,
      sender: "user",
      content: "Tôi đang quan tâm đến việc kết nối Zalo OA. Quy trình như thế nào?",
      time: "12:35 PM",
    },
    {
      id: 4,
      sender: "agent",
      content:
        "Để kết nối Zalo OA, anh/chị cần có tài khoản Zalo OA đã được xác thực. Sau đó, trong hệ thống Metabot.vn, anh/chị chọn 'Thêm kết nối mới' > 'Zalo OA' và làm theo hướng dẫn xác thực.",
      time: "12:37 PM",
    },
    {
      id: 5,
      sender: "agent",
      content: "Chúng tôi cũng có thể hỗ trợ anh/chị trong quá trình thiết lập nếu cần.",
      time: "12:38 PM",
    },
    {
      id: 6,
      sender: "user",
      content: "Chi phí sử dụng dịch vụ là bao nhiêu?",
      time: "12:40 PM",
    },
  ]

  // Mock data cho thông tin khách hàng
  const customerInfo = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    tags: ["Tiềm năng", "Quan tâm gói Pro"],
    notes: "Khách hàng quan tâm đến việc kết nối Zalo OA và tích hợp với hệ thống CRM hiện tại.",
  }

  const getChannelBadge = (channel) => {
    switch (channel) {
      case "Zalo":
        return "bg-blue-100 text-blue-800"
      case "Zalo OA":
        return "bg-green-100 text-green-800"
      case "Facebook":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      sender: "agent",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
    setShowAiSuggestions(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleAiSuggestions = () => {
    setShowAiSuggestions(!showAiSuggestions)
    if (showSentimentAnalysis) setShowSentimentAnalysis(false)
  }

  const toggleSentimentAnalysis = () => {
    setShowSentimentAnalysis(!showSentimentAnalysis)
    if (showAiSuggestions) setShowAiSuggestions(false)
  }

  const handleSelectSuggestion = (suggestion) => {
    setNewMessage(suggestion)
    if (messageInputRef.current) {
      messageInputRef.current.focus()
    }
  }

  const handleMessageClick = (message) => {
    if (message.sender === "user") {
      setSelectedMessage(message)
      setShowSentimentAnalysis(true)
      setShowAiSuggestions(false)
    }
  }

  return (
    <div className="h-[calc(100vh-7rem)]">
      <div className="flex h-full rounded-lg overflow-hidden border border-gray-200 bg-white">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Input placeholder="Tìm kiếm hội thoại..." className="h-9" startIcon={<Search className="h-4 w-4" />} />
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Tabs defaultValue="all">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  Tất cả
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Chưa đọc
                </TabsTrigger>
                <TabsTrigger value="assigned" className="flex-1">
                  Đã gán
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedChat === conversation.id ? "bg-blue-50" : ""}`}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={conversation.avatar || "/placeholder.svg"}
                        alt={conversation.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conversation.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getChannelBadge(conversation.channel)}`}>
                        {conversation.channel}
                      </span>
                      {conversation.unread > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="hidden md:flex flex-col flex-1">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={conversations.find((c) => c.id === selectedChat)?.avatar || ""}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conversations.find((c) => c.id === selectedChat)?.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="font-medium">{conversations.find((c) => c.id === selectedChat)?.name}</h3>
                    <div className="flex items-center">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getChannelBadge(conversations.find((c) => c.id === selectedChat)?.channel)}`}
                      >
                        {conversations.find((c) => c.id === selectedChat)?.channel}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div
                        className={`max-w-[80%] ${
                          message.sender === "user" ? "bg-gray-100" : "bg-blue-100"
                        } rounded-lg p-3 cursor-pointer hover:shadow-sm transition-shadow ${
                          selectedMessage && selectedMessage.id === message.id ? "ring-2 ring-blue-300" : ""
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs text-gray-500 text-right mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                {showAiSuggestions && (
                  <AISuggestionPanel
                    message={messages.length > 0 ? messages[messages.length - 1].content : ""}
                    conversation={messages}
                    customerInfo={customerInfo}
                    onSelectSuggestion={handleSelectSuggestion}
                    isVisible={showAiSuggestions}
                  />
                )}

                {showSentimentAnalysis && selectedMessage && (
                  <SentimentAnalysisPanel
                    message={selectedMessage.content}
                    conversation={messages.slice(0, messages.findIndex((m) => m.id === selectedMessage.id) + 1)}
                    isVisible={showSentimentAnalysis}
                  />
                )}

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <div className="relative flex-1">
                    <Input
                      placeholder="Nhập tin nhắn..."
                      className="pr-20"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      ref={messageInputRef}
                    />
                    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={toggleSentimentAnalysis}
                        title="Phân tích cảm xúc"
                      >
                        <BarChart2 className={`h-4 w-4 ${showSentimentAnalysis ? "text-blue-600" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={toggleAiSuggestions}
                        title="Gợi ý AI"
                      >
                        <Wand2 className={`h-4 w-4 ${showAiSuggestions ? "text-blue-600" : ""}`} />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700">Chọn một hội thoại</h3>
                <p className="text-gray-500">Chọn một hội thoại từ danh sách bên trái để bắt đầu chat</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
