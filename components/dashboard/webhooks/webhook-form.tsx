"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ResponsiveFormLayout, ResponsiveFormSection } from "@/components/ui/responsive-form-layout"
import { Textarea } from "@/components/ui/textarea"

// Danh sách các sự kiện có thể đăng ký
const availableEvents = [
  {
    id: "customer.created",
    name: "Khách hàng mới",
    description: "Kích hoạt khi có khách hàng mới được tạo",
    category: "customer",
  },
  {
    id: "customer.updated",
    name: "Cập nhật khách hàng",
    description: "Kích hoạt khi thông tin khách hàng được cập nhật",
    category: "customer",
  },
  {
    id: "message.created",
    name: "Tin nhắn mới",
    description: "Kích hoạt khi có tin nhắn mới được tạo",
    category: "message",
  },
  {
    id: "message.updated",
    name: "Cập nhật tin nhắn",
    description: "Kích hoạt khi tin nhắn được cập nhật",
    category: "message",
  },
  {
    id: "conversation.created",
    name: "Hội thoại mới",
    description: "Kích hoạt khi có hội thoại mới được tạo",
    category: "conversation",
  },
  {
    id: "conversation.closed",
    name: "Đóng hội thoại",
    description: "Kích hoạt khi hội thoại được đóng",
    category: "conversation",
  },
  {
    id: "campaign.created",
    name: "Chiến dịch mới",
    description: "Kích hoạt khi có chiến dịch mới được tạo",
    category: "campaign",
  },
  {
    id: "campaign.updated",
    name: "Cập nhật chiến dịch",
    description: "Kích hoạt khi chiến dịch được cập nhật",
    category: "campaign",
  },
  {
    id: "campaign.completed",
    name: "Hoàn thành chiến dịch",
    description: "Kích hoạt khi chiến dịch hoàn thành",
    category: "campaign",
  },
  {
    id: "invoice.created",
    name: "Tạo hóa đơn",
    description: "Kích hoạt khi có hóa đơn mới được tạo",
    category: "invoice",
  },
  {
    id: "invoice.paid",
    name: "Thanh toán hóa đơn",
    description: "Kích hoạt khi hóa đơn được thanh toán",
    category: "invoice",
  },
]

// Nhóm các sự kiện theo danh mục
const eventCategories = {
  customer: "Khách hàng",
  message: "Tin nhắn",
  conversation: "Hội thoại",
  campaign: "Chiến dịch",
  invoice: "Hóa đơn",
}

export default function WebhookForm({ webhook, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    events: [],
    secret: "",
    retryCount: "3",
    retryInterval: "60",
    active: true,
  })
  const [activeTab, setActiveTab] = useState("basic")
  const [urlError, setUrlError] = useState("")

  // Nếu đang chỉnh sửa webhook, điền dữ liệu vào form
  useEffect(() => {
    if (webhook) {
      setFormData({
        name: webhook.name || "",
        url: webhook.url || "",
        description: webhook.description || "",
        events: webhook.events || [],
        secret: webhook.secret || "",
        retryCount: webhook.retryCount?.toString() || "3",
        retryInterval: webhook.retryInterval?.toString() || "60",
        active: webhook.status === "active",
      })
    }
  }, [webhook])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Kiểm tra URL
    if (name === "url") {
      try {
        new URL(value)
        setUrlError("")
      } catch (error) {
        if (value) {
          setUrlError("URL không hợp lệ")
        } else {
          setUrlError("")
        }
      }
    }
  }

  const handleEventToggle = (eventId) => {
    setFormData((prev) => {
      const events = prev.events.includes(eventId)
        ? prev.events.filter((id) => id !== eventId)
        : [...prev.events, eventId]
      return { ...prev, events }
    })
  }

  const handleSelectAllEvents = (category) => {
    const categoryEvents = availableEvents.filter((event) => event.category === category).map((event) => event.id)

    const allSelected = categoryEvents.every((eventId) => formData.events.includes(eventId))

    if (allSelected) {
      // Nếu tất cả đã được chọn, bỏ chọn tất cả
      setFormData((prev) => ({
        ...prev,
        events: prev.events.filter((eventId) => !categoryEvents.includes(eventId)),
      }))
    } else {
      // Nếu chưa chọn tất cả, chọn tất cả
      setFormData((prev) => {
        const currentEvents = new Set(prev.events)
        categoryEvents.forEach((eventId) => currentEvents.add(eventId))
        return { ...prev, events: Array.from(currentEvents) }
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Kiểm tra dữ liệu
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên webhook")
      return
    }

    if (!formData.url.trim()) {
      alert("Vui lòng nhập URL webhook")
      return
    }

    try {
      new URL(formData.url)
    } catch (error) {
      alert("URL không hợp lệ")
      return
    }

    if (formData.events.length === 0) {
      alert("Vui lòng chọn ít nhất một sự kiện")
      return
    }

    // Gửi dữ liệu
    onSave({
      ...formData,
      retryCount: Number.parseInt(formData.retryCount),
      retryInterval: Number.parseInt(formData.retryInterval),
      status: formData.active ? "active" : "inactive",
    })
  }

  // Nhóm các sự kiện theo danh mục
  const eventsByCategory = Object.keys(eventCategories).map((category) => ({
    category,
    name: eventCategories[category],
    events: availableEvents.filter((event) => event.category === category),
  }))

  return (
    <form onSubmit={handleSubmit}>
      <ResponsiveFormLayout>
        <ResponsiveFormSection>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên Webhook</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nhập tên webhook"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL Endpoint</Label>
              <Input
                id="url"
                name="url"
                placeholder="https://example.com/webhook"
                value={formData.url}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </ResponsiveFormSection>

        <ResponsiveFormSection>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sự kiện</Label>
              <div className="grid grid-cols-1 gap-2">
                {eventsByCategory.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{category.name}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleSelectAllEvents(category.category)}
                      >
                        {category.events.every((event) => formData.events.includes(event.id))
                          ? "Bỏ chọn tất cả"
                          : "Chọn tất cả"}
                      </Button>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {category.events.map((event) => (
                        <div key={event.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={event.id}
                            checked={formData.events.includes(event.id)}
                            onCheckedChange={() => handleEventToggle(event.id)}
                          />
                          <div className="grid gap-1.5">
                            <Label htmlFor={event.id} className="font-medium cursor-pointer">
                              {event.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResponsiveFormSection>

        <ResponsiveFormSection fullWidth>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Mô tả về webhook này"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </ResponsiveFormSection>

        <ResponsiveFormSection fullWidth>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit">{webhook ? "Cập nhật" : "Tạo"} Webhook</Button>
          </div>
        </ResponsiveFormSection>
      </ResponsiveFormLayout>
    </form>
  )
}
