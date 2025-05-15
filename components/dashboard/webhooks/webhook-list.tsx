"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Edit, Trash2, MoreVertical, Copy, ExternalLink, Clock, AlertTriangle, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import WebhookDetail from "./webhook-detail"

// Mock data cho webhooks
const mockWebhooks = [
  {
    id: "wh_1",
    name: "Cập nhật CRM",
    url: "https://example.com/crm-webhook",
    events: ["customer.created", "customer.updated"],
    status: "active",
    createdAt: "2023-06-15T10:30:00",
    lastTriggered: "2023-06-20T14:20:00",
    successRate: 98,
    authEnabled: true,
  },
  {
    id: "wh_2",
    name: "Thông báo tin nhắn mới",
    url: "https://example.com/message-notification",
    events: ["message.created"],
    status: "active",
    createdAt: "2023-06-10T09:15:00",
    lastTriggered: "2023-06-20T15:45:00",
    successRate: 100,
    authEnabled: true,
  },
  {
    id: "wh_3",
    name: "Đồng bộ hóa đơn",
    url: "https://example.com/invoice-sync",
    events: ["invoice.created", "invoice.paid"],
    status: "inactive",
    createdAt: "2023-05-20T11:30:00",
    lastTriggered: "2023-06-15T10:10:00",
    successRate: 85,
    authEnabled: false,
  },
  {
    id: "wh_4",
    name: "Phân tích dữ liệu",
    url: "https://example.com/analytics-webhook",
    events: ["conversation.closed", "campaign.completed"],
    status: "active",
    createdAt: "2023-06-05T16:45:00",
    lastTriggered: "2023-06-19T09:30:00",
    successRate: 92,
    authEnabled: true,
  },
  {
    id: "wh_5",
    name: "Tích hợp Slack",
    url: "https://hooks.slack.com/services/xxx/yyy/zzz",
    events: ["customer.created", "message.created", "conversation.closed"],
    status: "error",
    createdAt: "2023-06-01T14:20:00",
    lastTriggered: "2023-06-18T11:15:00",
    successRate: 45,
    error: "Connection timeout",
    authEnabled: false,
  },
]

// Ánh xạ sự kiện sang tên hiển thị
const eventDisplayNames = {
  "customer.created": "Khách hàng mới",
  "customer.updated": "Cập nhật khách hàng",
  "message.created": "Tin nhắn mới",
  "conversation.closed": "Đóng hội thoại",
  "campaign.completed": "Hoàn thành chiến dịch",
  "invoice.created": "Tạo hóa đơn",
  "invoice.paid": "Thanh toán hóa đơn",
}

export default function WebhookList({ onEdit, onViewAuth, filters }) {
  const [webhooks, setWebhooks] = useState(mockWebhooks)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [webhookToDelete, setWebhookToDelete] = useState(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedWebhook, setSelectedWebhook] = useState(null)
  const { toast } = useToast()

  const handleToggleStatus = (id, newStatus) => {
    setWebhooks(
      webhooks.map((webhook) =>
        webhook.id === id ? { ...webhook, status: newStatus ? "active" : "inactive" } : webhook,
      ),
    )
    toast({
      title: "Trạng thái webhook đã được cập nhật",
      description: `Webhook đã được ${newStatus ? "kích hoạt" : "vô hiệu hóa"}`,
    })
  }

  const handleToggleAuth = (id, newStatus) => {
    setWebhooks(webhooks.map((webhook) => (webhook.id === id ? { ...webhook, authEnabled: newStatus } : webhook)))
    toast({
      title: "Xác thực webhook đã được cập nhật",
      description: `Xác thực webhook đã được ${newStatus ? "bật" : "tắt"}`,
    })
  }

  const handleDeleteClick = (webhook) => {
    setWebhookToDelete(webhook)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== webhookToDelete.id))
    setDeleteDialogOpen(false)
    toast({
      title: "Webhook đã được xóa",
      description: `Webhook "${webhookToDelete.name}" đã được xóa thành công`,
    })
  }

  const handleViewDetail = (webhook) => {
    setSelectedWebhook(webhook)
    setDetailDialogOpen(true)
  }

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL đã được sao chép",
      description: "URL webhook đã được sao chép vào clipboard",
    })
  }

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

  // Lọc webhooks dựa trên bộ lọc
  const filteredWebhooks = webhooks.filter((webhook) => {
    // Lọc theo trạng thái
    if (filters.status !== "all" && webhook.status !== filters.status) {
      return false
    }

    // Lọc theo sự kiện
    if (filters.event !== "all" && !webhook.events.includes(filters.event)) {
      return false
    }

    // Lọc theo tìm kiếm
    if (
      filters.search &&
      !webhook.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !webhook.url.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Hiển thị trạng thái webhook
  const renderStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Đang hoạt động
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Không hoạt động
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Lỗi
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {filteredWebhooks.length === 0 ? (
        <div className="text-center py-10 border rounded-md">
          <p className="text-muted-foreground">Không tìm thấy webhook nào phù hợp với bộ lọc</p>
        </div>
      ) : (
        filteredWebhooks.map((webhook) => (
          <div key={webhook.id} className="border rounded-md p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{webhook.name}</h3>
                  {renderStatusBadge(webhook.status)}
                  {webhook.authEnabled && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      <Shield className="h-3 w-3 mr-1" />
                      Xác thực
                    </Badge>
                  )}
                  {webhook.status === "error" && (
                    <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {webhook.error}
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-mono text-muted-foreground">{webhook.url}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {webhook.events.map((event) => (
                    <Badge key={event} variant="secondary" className="text-xs">
                      {eventDisplayNames[event] || event}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Kích hoạt gần nhất: {formatDate(webhook.lastTriggered)}
                  </div>
                  <div>
                    Tỷ lệ thành công:
                    <span
                      className={`font-medium ml-1 ${
                        webhook.successRate > 90
                          ? "text-green-600"
                          : webhook.successRate > 70
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {webhook.successRate}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={webhook.status === "active"}
                  onCheckedChange={(checked) => handleToggleStatus(webhook.id, checked)}
                  disabled={webhook.status === "error"}
                />
                <Button variant="outline" size="icon" onClick={() => onEdit(webhook)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleViewDetail(webhook)}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleCopyUrl(webhook.url)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Sao chép URL
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(webhook)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onViewAuth(webhook)}>
                      <Shield className="h-4 w-4 mr-2" />
                      Cài đặt xác thực
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleAuth(webhook.id, !webhook.authEnabled)}>
                      <Shield className="h-4 w-4 mr-2" />
                      {webhook.authEnabled ? "Tắt xác thực" : "Bật xác thực"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(webhook)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Dialog xác nhận xóa webhook */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa webhook</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa webhook "{webhookToDelete?.name}"? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog chi tiết webhook */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết Webhook</DialogTitle>
          </DialogHeader>
          {selectedWebhook && <WebhookDetail webhook={selectedWebhook} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
