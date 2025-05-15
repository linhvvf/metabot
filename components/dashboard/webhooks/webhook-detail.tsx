"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Copy, RefreshCw, Calendar, Clock } from "lucide-react"

// Ánh xạ sự kiện sang tên hiển thị
const eventDisplayNames = {
  "customer.created": "Khách hàng mới",
  "customer.updated": "Cập nhật khách hàng",
  "message.created": "Tin nhắn mới",
  "conversation.closed": "Đóng hội thoại",
  "campaign.completed": "Hoàn thành chiến dịch",
  "invoice.created": "Tạo hóa đơn",
  "invoice.paid": "Thanh toán hóa đơn",
  "conversation.created": "Hội thoại mới",
  "message.updated": "Cập nhật tin nhắn",
  "campaign.created": "Chiến dịch mới",
  "campaign.updated": "Cập nhật chiến dịch",
}

export default function WebhookDetail({ webhook }) {
  const { toast } = useToast()

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa kích hoạt"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL đã được sao chép",
      description: "URL webhook đã được sao chép vào clipboard",
    })
  }

  const handleCopySecret = (secret) => {
    if (!secret) return
    navigator.clipboard.writeText(secret)
    toast({
      title: "Secret đã được sao chép",
      description: "Secret webhook đã được sao chép vào clipboard",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-bold">{webhook.name}</h3>
          <p className="text-muted-foreground text-sm">{webhook.description || "Không có mô tả"}</p>
        </div>
        <div className="flex justify-end items-start gap-2">
          {webhook.status === "active" ? (
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
              Đang hoạt động
            </Badge>
          ) : webhook.status === "inactive" ? (
            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              Không hoạt động
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
              Lỗi
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Endpoint URL</h4>
          <Button variant="outline" size="sm" onClick={() => handleCopyUrl(webhook.url)}>
            <Copy className="h-4 w-4 mr-2" />
            Sao chép
          </Button>
        </div>
        <code className="block bg-muted p-2 rounded-md font-mono text-sm">{webhook.url}</code>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Sự kiện đăng ký</h4>
          <div className="flex flex-wrap gap-1">
            {webhook.events && webhook.events.length > 0 ? (
              webhook.events.map((event) => (
                <Badge key={event} variant="secondary">
                  {eventDisplayNames[event] || event}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground text-sm">Không có sự kiện nào</span>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Thông tin thời gian</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Ngày tạo:</span>
              <span>{webhook.createdAt ? formatDate(webhook.createdAt) : "Không có thông tin"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Lần kích hoạt cuối:</span>
              <span>{webhook.lastTriggered ? formatDate(webhook.lastTriggered) : "Chưa kích hoạt"}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Cài đặt nâng cao</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Secret</p>
            <div className="flex items-center gap-2 mt-1">
              <code className="bg-muted p-1 rounded-md font-mono text-sm flex-1 truncate">
                {webhook.secret ? "••••••••••••••••" : "Không có"}
              </code>
              {webhook.secret && (
                <Button variant="outline" size="sm" onClick={() => handleCopySecret(webhook.secret)}>
                  <Copy className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Số lần thử lại</p>
            <p className="text-sm mt-1">{webhook.retryCount || 3} lần</p>
          </div>
          <div>
            <p className="text-sm font-medium">Thời gian giữa các lần thử lại</p>
            <p className="text-sm mt-1">{webhook.retryInterval || 60} giây</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Thống kê hoạt động</h4>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Tổng yêu cầu</p>
            <p className="text-2xl font-bold mt-2">{webhook.stats?.totalRequests || 0}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Thành công</p>
            <p className="text-2xl font-bold mt-2 text-green-600">{webhook.stats?.successfulRequests || 0}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Thất bại</p>
            <p className="text-2xl font-bold mt-2 text-red-600">{webhook.stats?.failedRequests || 0}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Tỷ lệ thành công</p>
            <p className="text-2xl font-bold mt-2">{webhook.successRate || 0}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
