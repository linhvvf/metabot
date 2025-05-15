"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Copy, Eye, EyeOff, Plus, RefreshCw, Trash2, Code } from "lucide-react"

// Mock data for API keys
const mockApiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "sk_prod_2023_XXXXXXXXXXXXXXXXXXXX",
    createdAt: "2023-04-15T10:30:00",
    lastUsed: "2023-05-08T09:15:00",
  },
  {
    id: 2,
    name: "Development API Key",
    key: "sk_dev_2023_XXXXXXXXXXXXXXXXXXXX",
    createdAt: "2023-04-20T14:45:00",
    lastUsed: "2023-05-07T16:20:00",
  },
]

// Mock data for webhooks
const mockWebhooks = [
  {
    id: 1,
    name: "New Message Webhook",
    url: "https://example.com/webhooks/new-message",
    events: ["message.created"],
    active: true,
    createdAt: "2023-04-18T11:30:00",
  },
  {
    id: 2,
    name: "Customer Events",
    url: "https://example.com/webhooks/customers",
    events: ["customer.created", "customer.updated"],
    active: true,
    createdAt: "2023-04-25T09:45:00",
  },
]

export default function ApiSettings() {
  const [apiKeys, setApiKeys] = useState(mockApiKeys)
  const [webhooks, setWebhooks] = useState(mockWebhooks)
  const [showKeys, setShowKeys] = useState({})
  const [newApiKeyName, setNewApiKeyName] = useState("")
  const [newWebhookData, setNewWebhookData] = useState({
    name: "",
    url: "",
    events: [],
  })
  const [showNewApiKeyForm, setShowNewApiKeyForm] = useState(false)
  const [showNewWebhookForm, setShowNewWebhookForm] = useState(false)
  const { toast } = useToast()

  const toggleShowKey = (keyId) => {
    setShowKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "Đã sao chép",
      description: "API key đã được sao chép vào clipboard",
    })
  }

  const handleCreateApiKey = () => {
    if (!newApiKeyName.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên cho API key",
        variant: "destructive",
      })
      return
    }

    const newKey = {
      id: apiKeys.length + 1,
      name: newApiKeyName,
      key: `sk_${Math.random().toString(36).substring(2, 15)}_XXXXXXXXXXXXXXXXXXXX`,
      createdAt: new Date().toISOString(),
      lastUsed: null,
    }

    setApiKeys([...apiKeys, newKey])
    setNewApiKeyName("")
    setShowNewApiKeyForm(false)
    toast({
      title: "Thành công",
      description: "Đã tạo API key mới",
    })
  }

  const handleDeleteApiKey = (keyId) => {
    setApiKeys(apiKeys.filter((key) => key.id !== keyId))
    toast({
      title: "Thành công",
      description: "Đã xóa API key",
    })
  }

  const handleCreateWebhook = () => {
    if (!newWebhookData.name.trim() || !newWebhookData.url.trim() || newWebhookData.events.length === 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin webhook",
        variant: "destructive",
      })
      return
    }

    const newWebhook = {
      id: webhooks.length + 1,
      name: newWebhookData.name,
      url: newWebhookData.url,
      events: newWebhookData.events,
      active: true,
      createdAt: new Date().toISOString(),
    }

    setWebhooks([...webhooks, newWebhook])
    setNewWebhookData({
      name: "",
      url: "",
      events: [],
    })
    setShowNewWebhookForm(false)
    toast({
      title: "Thành công",
      description: "Đã tạo webhook mới",
    })
  }

  const handleToggleWebhook = (webhookId, active) => {
    setWebhooks(webhooks.map((webhook) => (webhook.id === webhookId ? { ...webhook, active } : webhook)))
    toast({
      title: "Thành công",
      description: active ? "Đã kích hoạt webhook" : "Đã vô hiệu hóa webhook",
    })
  }

  const handleDeleteWebhook = (webhookId) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== webhookId))
    toast({
      title: "Thành công",
      description: "Đã xóa webhook",
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa sử dụng"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleWebhookEventChange = (event, checked) => {
    if (checked) {
      setNewWebhookData({
        ...newWebhookData,
        events: [...newWebhookData.events, event],
      })
    } else {
      setNewWebhookData({
        ...newWebhookData,
        events: newWebhookData.events.filter((e) => e !== event),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API & Webhooks</h3>
        <p className="text-sm text-muted-foreground">
          Quản lý API keys và cấu hình webhooks để tích hợp với các hệ thống khác
        </p>
      </div>
      <Separator />

      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-medium">API Keys</h4>
          <Button
            variant={showNewApiKeyForm ? "secondary" : "default"}
            size="sm"
            onClick={() => setShowNewApiKeyForm(!showNewApiKeyForm)}
          >
            {showNewApiKeyForm ? (
              "Hủy"
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" /> Tạo API key
              </>
            )}
          </Button>
        </div>

        {showNewApiKeyForm && (
          <div className="border rounded-md p-4 mb-4">
            <h5 className="font-medium mb-4">Tạo API key mới</h5>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key-name">Tên API key</Label>
                <Input
                  id="api-key-name"
                  placeholder="Ví dụ: Production API Key"
                  value={newApiKeyName}
                  onChange={(e) => setNewApiKeyName(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleCreateApiKey}>Tạo API key</Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {apiKeys.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Chưa có API key nào. Hãy tạo API key mới để bắt đầu.
            </div>
          ) : (
            apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="border rounded-md p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h5 className="font-medium">{apiKey.name}</h5>
                    <div className="flex items-center mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {showKeys[apiKey.id]
                          ? apiKey.key
                          : apiKey.key.replace(/(?<=^.{10}).*(?=.{5}$)/, "•".repeat(15))}
                      </code>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleShowKey(apiKey.id)}>
                        {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopyKey(apiKey.key)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span>Tạo lúc: {formatDate(apiKey.createdAt)}</span>
                      <span className="mx-2">•</span>
                      <span>Sử dụng gần nhất: {formatDate(apiKey.lastUsed)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Làm mới
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteApiKey(apiKey.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-medium">Webhooks</h4>
          <Button
            variant={showNewWebhookForm ? "secondary" : "default"}
            size="sm"
            onClick={() => setShowNewWebhookForm(!showNewWebhookForm)}
          >
            {showNewWebhookForm ? (
              "Hủy"
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" /> Tạo webhook
              </>
            )}
          </Button>
        </div>

        {showNewWebhookForm && (
          <div className="border rounded-md p-4 mb-4">
            <h5 className="font-medium mb-4">Tạo webhook mới</h5>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-name">Tên webhook</Label>
                <Input
                  id="webhook-name"
                  placeholder="Ví dụ: New Message Webhook"
                  value={newWebhookData.name}
                  onChange={(e) => setNewWebhookData({ ...newWebhookData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://example.com/webhooks/endpoint"
                  value={newWebhookData.url}
                  onChange={(e) => setNewWebhookData({ ...newWebhookData, url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Sự kiện</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {[
                    { id: "message.created", label: "Tin nhắn mới" },
                    { id: "message.updated", label: "Cập nhật tin nhắn" },
                    { id: "customer.created", label: "Khách hàng mới" },
                    { id: "customer.updated", label: "Cập nhật khách hàng" },
                    { id: "conversation.created", label: "Hội thoại mới" },
                    { id: "conversation.closed", label: "Đóng hội thoại" },
                  ].map((event) => (
                    <div key={event.id} className="flex items-center space-x-2">
                      <Switch
                        id={`event-${event.id}`}
                        checked={newWebhookData.events.includes(event.id)}
                        onCheckedChange={(checked) => handleWebhookEventChange(event.id, checked)}
                      />
                      <Label htmlFor={`event-${event.id}`} className="font-normal">
                        {event.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleCreateWebhook}>Tạo webhook</Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {webhooks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Chưa có webhook nào. Hãy tạo webhook mới để bắt đầu.
            </div>
          ) : (
            webhooks.map((webhook) => (
              <div key={webhook.id} className="border rounded-md p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{webhook.name}</h5>
                      <Badge
                        variant={webhook.active ? "default" : "secondary"}
                        className={
                          webhook.active
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {webhook.active ? "Đang hoạt động" : "Không hoạt động"}
                      </Badge>
                    </div>
                    <p className="text-sm font-mono mt-1">{webhook.url}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline" className="bg-blue-50 text-blue-800">
                          {event}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">Tạo lúc: {formatDate(webhook.createdAt)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`webhook-active-${webhook.id}`}
                        checked={webhook.active}
                        onCheckedChange={(checked) => handleToggleWebhook(webhook.id, checked)}
                      />
                      <Label htmlFor={`webhook-active-${webhook.id}`} className="font-normal">
                        {webhook.active ? "Đang hoạt động" : "Không hoạt động"}
                      </Label>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteWebhook(webhook.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Tài liệu API</h4>
        <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-5 w-5 text-blue-600" />
            <h5 className="font-medium">Tài liệu API</h5>
          </div>
          <p className="text-sm mb-4">
            Tham khảo tài liệu API của chúng tôi để tìm hiểu cách tích hợp Metabot.vn với các ứng dụng và dịch vụ của
            bạn.
          </p>
          <div className="flex flex-col md:flex-row gap-2">
            <Button variant="outline">Xem tài liệu API</Button>
            <Button variant="outline">Tải xuống SDK</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
