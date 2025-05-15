"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, RefreshCw, Trash2, ExternalLink } from "lucide-react"
import Image from "next/image"

// Mock data for connected platforms
const mockConnections = [
  {
    id: 1,
    name: "Zalo Cá nhân",
    type: "zalo_personal",
    status: "connected",
    account: "Nguyễn Văn A",
    connectedAt: "2023-05-01T10:30:00",
    logo: "/zalo-logo.png",
  },
  {
    id: 2,
    name: "Zalo OA",
    type: "zalo_oa",
    status: "connected",
    account: "Công ty ABC",
    connectedAt: "2023-05-02T14:20:00",
    logo: "/placeholder.svg?key=nohsv",
  },
  {
    id: 3,
    name: "Facebook Messenger",
    type: "facebook",
    status: "connected",
    account: "Công ty ABC",
    connectedAt: "2023-05-03T09:15:00",
    logo: "/facebook-messenger-logo.png",
  },
  {
    id: 4,
    name: "Telegram",
    type: "telegram",
    status: "disconnected",
    account: "",
    connectedAt: "",
    logo: "/telegram-logo.png",
  },
  {
    id: 5,
    name: "Viber",
    type: "viber",
    status: "disconnected",
    account: "",
    connectedAt: "",
    logo: "/viber-logo.png",
  },
]

export default function ConnectionSettings() {
  const [connections, setConnections] = useState(mockConnections)
  const { toast } = useToast()

  const handleConnect = (connectionId) => {
    toast({
      title: "Kết nối",
      description: "Đang chuyển hướng đến trang xác thực...",
    })
    // Implement connect functionality
  }

  const handleDisconnect = (connectionId) => {
    toast({
      title: "Ngắt kết nối",
      description: "Đã ngắt kết nối thành công",
    })
    setConnections(
      connections.map((conn) =>
        conn.id === connectionId ? { ...conn, status: "disconnected", account: "", connectedAt: "" } : conn,
      ),
    )
  }

  const handleRefresh = (connectionId) => {
    toast({
      title: "Làm mới",
      description: "Đã làm mới kết nối thành công",
    })
    // Implement refresh functionality
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Kết nối</h3>
        <p className="text-sm text-muted-foreground">Quản lý kết nối với các nền tảng nhắn tin và mạng xã hội</p>
      </div>
      <Separator />

      <div className="space-y-6">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={connection.logo || "/placeholder.svg"}
                  alt={connection.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{connection.name}</h4>
                  <Badge
                    variant={connection.status === "connected" ? "default" : "secondary"}
                    className={
                      connection.status === "connected"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {connection.status === "connected" ? "Đã kết nối" : "Chưa kết nối"}
                  </Badge>
                </div>
                {connection.status === "connected" && (
                  <div className="text-sm text-muted-foreground">
                    <p>Tài khoản: {connection.account}</p>
                    <p>Kết nối lúc: {formatDate(connection.connectedAt)}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {connection.status === "connected" ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleRefresh(connection.id)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Làm mới
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDisconnect(connection.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Ngắt kết nối
                  </Button>
                </>
              ) : (
                <Button onClick={() => handleConnect(connection.id)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Kết nối
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      <div>
        <h3 className="text-lg font-medium mb-4">Cài đặt đồng bộ</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch id="sync-contacts" defaultChecked />
            <div className="space-y-1">
              <Label htmlFor="sync-contacts" className="font-medium">
                Đồng bộ danh bạ
              </Label>
              <p className="text-sm text-muted-foreground">Tự động đồng bộ danh bạ từ các nền tảng được kết nối</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch id="sync-messages" defaultChecked />
            <div className="space-y-1">
              <Label htmlFor="sync-messages" className="font-medium">
                Đồng bộ tin nhắn
              </Label>
              <p className="text-sm text-muted-foreground">Tự động đồng bộ tin nhắn từ các nền tảng được kết nối</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch id="auto-reply" />
            <div className="space-y-1">
              <Label htmlFor="auto-reply" className="font-medium">
                Tự động trả lời
              </Label>
              <p className="text-sm text-muted-foreground">
                Tự động trả lời tin nhắn khi không có nhân viên trực tuyến
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h3 className="text-lg font-medium mb-4">Tích hợp khác</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                  <Image src="/google-calendar-app.png" alt="Google Calendar" width={24} height={24} />
                </div>
                <h4 className="font-medium">Google Calendar</h4>
              </div>
              <Badge variant="outline" className="bg-gray-100">
                Chưa kết nối
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Đồng bộ lịch hẹn với Google Calendar</p>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Kết nối
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                  <Image src="/google-drive-interface.png" alt="Google Drive" width={24} height={24} />
                </div>
                <h4 className="font-medium">Google Drive</h4>
              </div>
              <Badge variant="outline" className="bg-gray-100">
                Chưa kết nối
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Lưu trữ tệp và tài liệu trên Google Drive</p>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Kết nối
            </Button>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Xem tất cả tích hợp
          </Button>
        </div>
      </div>
    </div>
  )
}
