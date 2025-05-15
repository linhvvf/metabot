"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

type Notification = {
  id: string
  title: string
  message: string
  type: "message" | "customer" | "campaign" | "api" | "report" | "system"
  read: boolean
  createdAt: Date
  link?: string
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Giả lập dữ liệu thông báo
  useEffect(() => {
    // Trong thực tế, đây sẽ là API call để lấy thông báo
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Tin nhắn mới",
        message: "Bạn có tin nhắn mới từ khách hàng Nguyễn Văn A",
        type: "message",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 phút trước
        link: "/dashboard/conversations",
      },
      {
        id: "2",
        title: "Khách hàng mới",
        message: "Khách hàng mới Trần Thị B vừa đăng ký",
        type: "customer",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 phút trước
        link: "/dashboard/customers",
      },
      {
        id: "3",
        title: "Chiến dịch hoàn thành",
        message: "Chiến dịch 'Khuyến mãi mùa hè' đã hoàn thành",
        type: "campaign",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 giờ trước
        link: "/dashboard/campaigns",
      },
      {
        id: "4",
        title: "Cảnh báo API",
        message: "API key của bạn đã sử dụng 80% quota trong tháng này",
        type: "api",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 giờ trước
        link: "/dashboard/api-management",
      },
      {
        id: "5",
        title: "Báo cáo mới",
        message: "Báo cáo hiệu quả chiến dịch tháng 5 đã sẵn sàng",
        type: "report",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 ngày trước
        link: "/dashboard/reports",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
    setLoading(false)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
      case "customer":
        return <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
      case "campaign":
        return <div className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
      case "api":
        return <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
      case "report":
        return <div className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500 mr-2" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Thông báo</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllAsRead}>
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">Đang tải...</div>
          ) : notifications.length > 0 ? (
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start p-3 ${!notification.read ? "bg-muted/50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <Link href={notification.link || "#"} className="w-full" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center w-full">
                      {getNotificationIcon(notification.type)}
                      <span className="font-medium">{notification.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 ml-4">{notification.message}</p>
                    <div className="text-xs text-muted-foreground mt-1 ml-4">
                      {formatDistanceToNow(notification.createdAt, {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          ) : (
            <div className="p-4 text-center text-muted-foreground">Không có thông báo nào</div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <Link href="/dashboard/notifications">Xem tất cả thông báo</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
