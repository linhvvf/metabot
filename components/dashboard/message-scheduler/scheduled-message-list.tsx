"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, Clock, Edit, MoreHorizontal, Pause, Play, Trash, RefreshCw, Copy } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Dữ liệu mẫu
const scheduledMessages = [
  {
    id: "sched-001",
    name: "Thông báo nâng cấp dịch vụ",
    description: "Thông báo đến khách hàng về việc nâng cấp dịch vụ",
    status: "pending",
    type: "one-time",
    channel: "zalo",
    recipients: 345,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    scheduledFor: "2023-07-15T09:00:00Z",
    createdAt: "2023-07-01T14:23:00Z",
    createdBy: "Nguyễn Văn A",
    recipientGroups: ["Khách hàng mới", "Khách hàng VIP"],
  },
  {
    id: "sched-002",
    name: "Chúc mừng sinh nhật tháng 7",
    description: "Tin nhắn chúc mừng sinh nhật và mã giảm giá đặc biệt",
    status: "active",
    type: "recurring",
    channel: "multi",
    recipients: 78,
    sent: 45,
    delivered: 43,
    opened: 30,
    clicked: 12,
    scheduledFor: "2023-07-01T08:00:00Z",
    repeatPattern: "monthly",
    nextSchedule: "2023-08-01T08:00:00Z",
    createdAt: "2023-06-25T10:12:00Z",
    createdBy: "Trần Thị B",
    recipientGroups: ["Sinh nhật tháng 7"],
  },
  {
    id: "sched-003",
    name: "Nhắc nhở thanh toán",
    description: "Nhắc nhở khách hàng về việc thanh toán hóa đơn sắp đến hạn",
    status: "active",
    type: "recurring",
    channel: "zalo",
    recipients: 126,
    sent: 126,
    delivered: 120,
    opened: 98,
    clicked: 45,
    scheduledFor: "2023-07-10T09:00:00Z",
    repeatPattern: "weekly",
    nextSchedule: "2023-07-17T09:00:00Z",
    createdAt: "2023-06-28T16:45:00Z",
    createdBy: "Lê Văn C",
    recipientGroups: ["Hóa đơn chưa thanh toán"],
  },
  {
    id: "sched-004",
    name: "Khảo sát hài lòng khách hàng",
    description: "Khảo sát ý kiến khách hàng sau khi sử dụng dịch vụ",
    status: "completed",
    type: "one-time",
    channel: "facebook",
    recipients: 500,
    sent: 500,
    delivered: 470,
    opened: 320,
    clicked: 180,
    scheduledFor: "2023-07-05T10:00:00Z",
    completedAt: "2023-07-05T10:05:32Z",
    createdAt: "2023-06-20T11:30:00Z",
    createdBy: "Phạm Thị D",
    recipientGroups: ["Khách hàng hiện tại"],
  },
  {
    id: "sched-005",
    name: "Thông báo sự kiện ra mắt sản phẩm",
    description: "Thông báo về sự kiện ra mắt sản phẩm mới",
    status: "pending",
    type: "one-time",
    channel: "multi",
    recipients: 1200,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    scheduledFor: "2023-07-20T14:00:00Z",
    createdAt: "2023-07-02T09:15:00Z",
    createdBy: "Hoàng Văn E",
    recipientGroups: ["Tất cả khách hàng"],
  },
  {
    id: "sched-006",
    name: "Chuỗi chào mừng khách hàng mới",
    description: "Chuỗi tin nhắn chào mừng và hướng dẫn cho khách hàng mới",
    status: "active",
    type: "sequence",
    channel: "zalo",
    recipients: 87,
    sent: 87,
    delivered: 85,
    opened: 75,
    clicked: 42,
    currentStep: 2,
    totalSteps: 5,
    startedAt: "2023-07-01T00:00:00Z",
    createdAt: "2023-06-15T13:20:00Z",
    createdBy: "Nguyễn Văn A",
    recipientGroups: ["Khách hàng mới tháng 7"],
  },
]

// Hàm lọc tin nhắn theo trạng thái và loại
const filterMessages = (messages: any[], status?: string, type?: string) => {
  let filtered = [...messages]

  if (status && status !== "all") {
    filtered = filtered.filter((message) => message.status === status)
  }

  if (type && type !== "all") {
    filtered = filtered.filter((message) => message.type === type)
  }

  return filtered
}

// Hàm định dạng trạng thái
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500">Đang hoạt động</Badge>
    case "pending":
      return <Badge className="bg-blue-500">Chờ gửi</Badge>
    case "completed":
      return (
        <Badge variant="outline" className="text-gray-500">
          Đã hoàn thành
        </Badge>
      )
    case "paused":
      return (
        <Badge variant="outline" className="text-yellow-500">
          Tạm dừng
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

// Hàm định dạng loại lịch trình
const getTypeBadge = (type: string) => {
  switch (type) {
    case "one-time":
      return (
        <Badge variant="outline" className="bg-slate-100 text-slate-800 hover:bg-slate-100">
          Một lần
        </Badge>
      )
    case "recurring":
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          Định kỳ
        </Badge>
      )
    case "sequence":
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          Chuỗi tin nhắn
        </Badge>
      )
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

// Hàm định dạng kênh
const getChannelBadge = (channel: string) => {
  switch (channel) {
    case "zalo":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Zalo
        </Badge>
      )
    case "facebook":
      return (
        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
          Facebook
        </Badge>
      )
    case "multi":
      return (
        <Badge variant="outline" className="bg-pink-100 text-pink-800 hover:bg-pink-100">
          Đa kênh
        </Badge>
      )
    default:
      return <Badge variant="outline">{channel}</Badge>
  }
}

interface ScheduledMessageListProps {
  status?: string
  type?: string
}

export default function ScheduledMessageList({ status, type }: ScheduledMessageListProps) {
  const [messages, setMessages] = useState(filterMessages(scheduledMessages, status, type))

  // Xử lý xóa lịch trình
  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id))
  }

  // Xử lý dừng/tiếp tục lịch trình
  const handleTogglePause = (id: string) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, status: message.status === "active" ? "paused" : "active" } : message,
      ),
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {messages.map((message) => (
        <Card key={message.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{message.name}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2">{message.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/dashboard/message-scheduler/${message.id}`} className="flex w-full items-center">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Nhân bản</span>
                  </DropdownMenuItem>
                  {message.status === "active" && (
                    <DropdownMenuItem onClick={() => handleTogglePause(message.id)}>
                      <Pause className="mr-2 h-4 w-4" />
                      <span>Tạm dừng</span>
                    </DropdownMenuItem>
                  )}
                  {message.status === "paused" && (
                    <DropdownMenuItem onClick={() => handleTogglePause(message.id)}>
                      <Play className="mr-2 h-4 w-4" />
                      <span>Tiếp tục</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(message.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Xóa</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {getStatusBadge(message.status)}
              {getTypeBadge(message.type)}
              {getChannelBadge(message.channel)}
            </div>

            <div className="flex items-center mb-4">
              <div className="flex -space-x-2 mr-3">
                {message.recipientGroups.length > 0 && (
                  <>
                    <Avatar className="border-2 border-background h-6 w-6">
                      <AvatarFallback className="text-xs">KH</AvatarFallback>
                    </Avatar>
                    {message.recipientGroups.length > 1 && (
                      <Avatar className="border-2 border-background h-6 w-6">
                        <AvatarFallback className="text-xs">VIP</AvatarFallback>
                      </Avatar>
                    )}
                  </>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{message.recipients.toLocaleString()} người nhận</span>
            </div>

            {(message.status === "active" || message.status === "completed") && message.type !== "sequence" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiến độ</span>
                  <span className="font-medium">
                    {message.recipients > 0 ? Math.round((message.sent / message.recipients) * 100) : 0}%
                  </span>
                </div>
                <Progress
                  value={message.recipients > 0 ? (message.sent / message.recipients) * 100 : 0}
                  className="h-2"
                />

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Đã gửi</span>
                    <span className="font-medium">
                      {message.sent}/{message.recipients}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Đã mở</span>
                    <span className="font-medium">
                      {message.opened} ({message.sent ? Math.round((message.opened / message.sent) * 100) : 0}%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {message.type === "sequence" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bước</span>
                  <span className="font-medium">
                    {message.currentStep}/{message.totalSteps}
                  </span>
                </div>
                <Progress
                  value={message.totalSteps > 0 ? (message.currentStep / message.totalSteps) * 100 : 0}
                  className="h-2"
                />
              </div>
            )}

            {message.status === "pending" && (
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Đã lên lịch:{" "}
                  {new Date(message.scheduledFor).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}

            {message.type === "recurring" && message.status !== "completed" && (
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <RefreshCw className="h-4 w-4 mr-1" />
                <span>
                  {message.repeatPattern === "daily" && "Hàng ngày"}
                  {message.repeatPattern === "weekly" && "Hàng tuần"}
                  {message.repeatPattern === "monthly" && "Hàng tháng"}
                  {" • "}
                  Tiếp theo: {new Date(message.nextSchedule).toLocaleDateString("vi-VN")}
                </span>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>Tạo: {new Date(message.createdAt).toLocaleDateString("vi-VN")}</span>
              </div>
              <Link href={`/dashboard/message-scheduler/${message.id}`}>
                <Button variant="ghost" size="sm">
                  Chi tiết
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
