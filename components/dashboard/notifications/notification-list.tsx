"use client"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, Zap, Key, FileText, AlertCircle, MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

type Notification = {
  id: string
  title: string
  message: string
  type: "message" | "customer" | "campaign" | "api" | "report" | "system"
  read: boolean
  createdAt: Date
  link?: string
}

interface NotificationListProps {
  filter: "all" | "unread"
}

export function NotificationList({ filter }: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
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
      {
        id: "6",
        title: "Cập nhật hệ thống",
        message: "Hệ thống sẽ bảo trì vào ngày 15/06/2023 từ 23:00 - 01:00",
        type: "system",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 ngày trước
      },
      {
        id: "7",
        title: "Tin nhắn mới",
        message: "Bạn có 3 tin nhắn mới từ khách hàng Lê Văn C",
        type: "message",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 ngày trước
        link: "/dashboard/conversations",
      },
    ]

    // Lọc theo trạng thái đã đọc nếu cần
    const filteredNotifications = filter === "unread" ? mockNotifications.filter((n) => !n.read) : mockNotifications

    setNotifications(filteredNotifications)
    setLoading(false)
  }, [filter])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markSelectedAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) =>
        selectedIds.includes(notification.id) ? { ...notification, read: true } : notification,
      ),
    )
    setSelectedIds([])
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((notification) => !selectedIds.includes(notification.id)))
    setSelectedIds([])
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === notifications.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(notifications.map((n) => n.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((i) => i !== id))
    } else {
      setSelectedIds((prev) => [...prev, id])
    }
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "customer":
        return <Users className="h-5 w-5 text-green-500" />
      case "campaign":
        return <Zap className="h-5 w-5 text-purple-500" />
      case "api":
        return <Key className="h-5 w-5 text-yellow-500" />
      case "report":
        return <FileText className="h-5 w-5 text-orange-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  if (loading) {
    return <div className="text-center py-8">Đang tải thông báo...</div>
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {filter === "unread" ? "Không có thông báo chưa đọc" : "Không có thông báo nào"}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedIds.length === notifications.length && notifications.length > 0}
            onCheckedChange={toggleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm cursor-pointer">
            Chọn tất cả
          </label>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={markSelectedAsRead}>
              Đánh dấu đã đọc
            </Button>
            <Button variant="destructive" size="sm" onClick={deleteSelected}>
              Xóa đã chọn
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-1">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start p-4 rounded-lg border ${!notification.read ? "bg-muted/50" : ""}`}
          >
            <Checkbox
              className="mt-1 mr-3"
              checked={selectedIds.includes(notification.id)}
              onCheckedChange={() => toggleSelect(notification.id)}
            />

            <div className="mr-3 mt-1">{getNotificationIcon(notification.type)}</div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">
                    {notification.title}
                    {!notification.read && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Mới
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(notification.createdAt, {
                      addSuffix: true,
                      locale: vi,
                    })}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!notification.read && (
                      <DropdownMenuItem onClick={() => markAsRead(notification.id)}>Đánh dấu đã đọc</DropdownMenuItem>
                    )}
                    {notification.link && (
                      <DropdownMenuItem asChild>
                        <Link href={notification.link}>Xem chi tiết</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-destructive" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa thông báo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {notification.link && (
                <div className="mt-2">
                  <Button variant="link" className="h-auto p-0 text-sm" asChild>
                    <Link href={notification.link}>Xem chi tiết</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
