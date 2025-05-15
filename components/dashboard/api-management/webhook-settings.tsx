"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { AlertTriangle, Info, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for webhooks
const mockWebhooks = [
  {
    id: "1",
    name: "New Customer Webhook",
    url: "https://example.com/webhooks/customers",
    events: ["customer.created", "customer.updated"],
    active: true,
    secretKey: "whsec_a1b2c3d4e5f6g7h8i9j0",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Conversation Webhook",
    url: "https://example.com/webhooks/conversations",
    events: ["conversation.created", "message.created"],
    active: true,
    secretKey: "whsec_z9y8x7w6v5u4t3s2r1q0",
    createdAt: "2023-04-20T09:15:00Z",
  },
  {
    id: "3",
    name: "Campaign Webhook",
    url: "https://example.com/webhooks/campaigns",
    events: ["campaign.started", "campaign.completed", "campaign.failed"],
    active: false,
    secretKey: "whsec_j9i8h7g6f5e4d3c2b1a0",
    createdAt: "2023-03-10T16:45:00Z",
  },
]

// Available webhook events
const availableEvents = [
  { id: "customer.created", label: "Khách hàng mới", category: "Khách hàng" },
  { id: "customer.updated", label: "Cập nhật khách hàng", category: "Khách hàng" },
  { id: "customer.deleted", label: "Xóa khách hàng", category: "Khách hàng" },
  { id: "customer.tag_added", label: "Thêm thẻ khách hàng", category: "Khách hàng" },
  { id: "customer.tag_removed", label: "Xóa thẻ khách hàng", category: "Khách hàng" },

  { id: "conversation.created", label: "Cuộc hội thoại mới", category: "Cuộc hội thoại" },
  { id: "conversation.closed", label: "Đóng cuộc hội thoại", category: "Cuộc hội thoại" },
  { id: "message.created", label: "Tin nhắn mới", category: "Cuộc hội thoại" },
  { id: "message.read", label: "Tin nhắn đã đọc", category: "Cuộc hội thoại" },

  { id: "campaign.created", label: "Chiến dịch mới", category: "Chiến dịch" },
  { id: "campaign.started", label: "Bắt đầu chiến dịch", category: "Chiến dịch" },
  { id: "campaign.completed", label: "Hoàn thành chiến dịch", category: "Chiến dịch" },
  { id: "campaign.failed", label: "Chiến dịch thất bại", category: "Chiến dịch" },

  { id: "staff.created", label: "Nhân viên mới", category: "Nhân viên" },
  { id: "staff.updated", label: "Cập nhật nhân viên", category: "Nhân viên" },
  { id: "staff.deleted", label: "Xóa nhân viên", category: "Nhân viên" },
]

export function WebhookSettings() {
  const [webhooks, setWebhooks] = useState(mockWebhooks)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [webhookToDelete, setWebhookToDelete] = useState(null)

  // Form state for new webhook
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    events: [],
    active: true,
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleAddWebhook = () => {
    if (!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0) {
      toast({
        title: "Thông tin không đầy đủ",
        description: "Vui lòng điền đầy đủ thông tin webhook.",
        variant: "destructive",
      })
      return
    }

    // Validate URL
    try {
      new URL(newWebhook.url)
    } catch (e) {
      toast({
        title: "URL không hợp lệ",
        description: "Vui lòng nhập một URL hợp lệ.",
        variant: "destructive",
      })
      return
    }

    const newId = (webhooks.length + 1).toString()
    const secretKey = `whsec_${Math.random().toString(36).substring(2, 15)}`

    setWebhooks([
      ...webhooks,
      {
        ...newWebhook,
        id: newId,
        secretKey,
        createdAt: new Date().toISOString(),
      },
    ])

    setShowAddDialog(false)

    // Reset form
    setNewWebhook({
      name: "",
      url: "",
      events: [],
      active: true,
    })

    toast({
      title: "Webhook đã được tạo",
      description: "Webhook mới đã được tạo thành công.",
    })
  }

  const handleDeleteWebhook = (id) => {
    setWebhookToDelete(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== webhookToDelete))
    setShowDeleteDialog(false)
    setWebhookToDelete(null)
    toast({
      title: "Webhook đã bị xóa",
      description: "Webhook đã được xóa thành công.",
    })
  }

  const toggleWebhookStatus = (id) => {
    setWebhooks(webhooks.map((webhook) => (webhook.id === id ? { ...webhook, active: !webhook.active } : webhook)))

    const webhook = webhooks.find((w) => w.id === id)
    toast({
      title: `Webhook đã ${!webhook.active ? "được kích hoạt" : "bị vô hiệu hóa"}`,
      description: `Webhook đã ${!webhook.active ? "được kích hoạt" : "bị vô hiệu hóa"} thành công.`,
    })
  }

  // Group events by category
  const eventsByCategory = availableEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = []
    }
    acc[event.category].push(event)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Webhooks</h2>
          <p className="text-sm text-muted-foreground">
            Cấu hình webhooks để nhận thông báo về các sự kiện trong hệ thống.
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm Webhook
        </Button>
      </div>

      <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded text-sm text-blue-600">
        <Info className="h-4 w-4 mr-2" />
        <span>
          Webhooks cho phép ứng dụng của bạn nhận thông báo thời gian thực về các sự kiện xảy ra trong Metabot.
        </span>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Sự kiện</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  Không có webhook nào
                </TableCell>
              </TableRow>
            ) : (
              webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell className="font-medium">{webhook.name}</TableCell>
                  <TableCell className="font-mono text-xs truncate max-w-[200px]">{webhook.url}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.length > 3 ? (
                        <>
                          {webhook.events.slice(0, 2).map((event) => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                          <Badge variant="outline" className="text-xs">
                            +{webhook.events.length - 2} khác
                          </Badge>
                        </>
                      ) : (
                        webhook.events.map((event) => (
                          <Badge key={event} variant="outline" className="text-xs">
                            {event}
                          </Badge>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={webhook.active ? "success" : "secondary"}>
                      {webhook.active ? "Hoạt động" : "Vô hiệu hóa"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(webhook.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleWebhookStatus(webhook.id)}>
                          {webhook.active ? "Vô hiệu hóa" : "Kích hoạt"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(webhook.secretKey)
                            toast({
                              title: "Đã sao chép",
                              description: "Secret key đã được sao chép vào clipboard.",
                            })
                          }}
                        >
                          Sao chép secret key
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteWebhook(webhook.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa webhook
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm Webhook mới</DialogTitle>
            <DialogDescription>Tạo một webhook mới để nhận thông báo về các sự kiện trong hệ thống.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="webhook-name">Tên Webhook</Label>
              <Input
                id="webhook-name"
                placeholder="VD: New Customer Webhook"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="webhook-url">URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://example.com/webhooks/customers"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">URL mà Metabot sẽ gửi các sự kiện webhook đến.</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Label>Sự kiện</Label>
              <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
                <div className="space-y-4">
                  {Object.entries(eventsByCategory).map(([category, events]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium">{category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {events.map((event) => (
                          <div key={event.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={event.id}
                              checked={newWebhook.events.includes(event.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewWebhook({
                                    ...newWebhook,
                                    events: [...newWebhook.events, event.id],
                                  })
                                } else {
                                  setNewWebhook({
                                    ...newWebhook,
                                    events: newWebhook.events.filter((e) => e !== event.id),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={event.id} className="font-normal">
                              {event.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="webhook-active"
                checked={newWebhook.active}
                onCheckedChange={(checked) => setNewWebhook({ ...newWebhook, active: checked })}
              />
              <Label htmlFor="webhook-active">Kích hoạt webhook ngay</Label>
            </div>

            <div className="flex items-center p-2 bg-amber-50 dark:bg-amber-950/30 rounded text-sm text-amber-600">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Một secret key sẽ được tạo tự động khi bạn tạo webhook. Hãy lưu trữ nó ở nơi an toàn.</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddWebhook}>Tạo Webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa Webhook</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa webhook này không? Hành động này không thể hoàn tác và ứng dụng của bạn sẽ không
              nhận được thông báo về các sự kiện nữa.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Xóa Webhook
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
