"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"

// Các ví dụ payload cho các loại sự kiện khác nhau
const payloadExamples = {
  "customer.created": {
    event: "customer.created",
    timestamp: new Date().toISOString(),
    data: {
      id: "cus_123456",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      createdAt: new Date().toISOString(),
      tags: ["new", "website"],
      source: "website",
      attributes: {
        company: "ABC Corp",
        position: "CEO",
      },
    },
  },
  "customer.updated": {
    event: "customer.updated",
    timestamp: new Date().toISOString(),
    data: {
      id: "cus_123456",
      name: "Nguyễn Văn A",
      email: "updated_email@example.com",
      phone: "0901234567",
      updatedAt: new Date().toISOString(),
      tags: ["returning", "website"],
      changes: {
        email: {
          previous: "nguyenvana@example.com",
          current: "updated_email@example.com",
        },
        tags: {
          previous: ["new", "website"],
          current: ["returning", "website"],
        },
      },
    },
  },
  "message.created": {
    event: "message.created",
    timestamp: new Date().toISOString(),
    data: {
      id: "msg_123456",
      conversationId: "conv_123456",
      sender: {
        id: "cus_123456",
        name: "Nguyễn Văn A",
        type: "customer",
      },
      content: "Xin chào, tôi cần hỗ trợ về sản phẩm",
      type: "text",
      channel: "facebook",
      createdAt: new Date().toISOString(),
      attachments: [],
    },
  },
  "conversation.created": {
    event: "conversation.created",
    timestamp: new Date().toISOString(),
    data: {
      id: "conv_123456",
      customerId: "cus_123456",
      customerName: "Nguyễn Văn A",
      assignedTo: null,
      channel: "facebook",
      subject: null,
      status: "open",
      priority: "normal",
      createdAt: new Date().toISOString(),
      tags: [],
    },
  },
  "conversation.closed": {
    event: "conversation.closed",
    timestamp: new Date().toISOString(),
    data: {
      id: "conv_123456",
      customerId: "cus_123456",
      customerName: "Nguyễn Văn A",
      assignedTo: {
        id: "staff_123456",
        name: "Nhân viên hỗ trợ",
      },
      channel: "facebook",
      status: "closed",
      closedAt: new Date().toISOString(),
      closedBy: {
        id: "staff_123456",
        name: "Nhân viên hỗ trợ",
      },
      resolution: "resolved",
      duration: 3600, // seconds
    },
  },
  "campaign.created": {
    event: "campaign.created",
    timestamp: new Date().toISOString(),
    data: {
      id: "camp_123456",
      name: "Chiến dịch khuyến mãi mùa hè",
      type: "promotional",
      status: "draft",
      createdBy: {
        id: "staff_123456",
        name: "Nhân viên marketing",
      },
      createdAt: new Date().toISOString(),
      scheduledAt: null,
      audienceSize: 1000,
      channels: ["facebook", "zalo"],
    },
  },
  "campaign.completed": {
    event: "campaign.completed",
    timestamp: new Date().toISOString(),
    data: {
      id: "camp_123456",
      name: "Chiến dịch khuyến mãi mùa hè",
      type: "promotional",
      status: "completed",
      completedAt: new Date().toISOString(),
      metrics: {
        sent: 980,
        delivered: 950,
        opened: 500,
        clicked: 200,
        responded: 50,
      },
      duration: 86400, // seconds
    },
  },
  "invoice.created": {
    event: "invoice.created",
    timestamp: new Date().toISOString(),
    data: {
      id: "inv_123456",
      customerId: "cus_123456",
      customerName: "Nguyễn Văn A",
      amount: 1500000,
      tax: 150000,
      total: 1650000,
      currency: "VND",
      status: "pending",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      items: [
        {
          id: "item_1",
          name: "Gói dịch vụ cao cấp",
          quantity: 1,
          unitPrice: 1500000,
          amount: 1500000,
        },
      ],
    },
  },
  "invoice.paid": {
    event: "invoice.paid",
    timestamp: new Date().toISOString(),
    data: {
      id: "inv_123456",
      customerId: "cus_123456",
      customerName: "Nguyễn Văn A",
      amount: 1500000,
      tax: 150000,
      total: 1650000,
      currency: "VND",
      status: "paid",
      paidAt: new Date().toISOString(),
      paymentMethod: "bank_transfer",
      transactionId: "txn_123456",
    },
  },
}

export default function WebhookPayloadExamples({ selectedEvents = [] }) {
  const [activeEvent, setActiveEvent] = useState(selectedEvents[0] || "customer.created")
  const { toast } = useToast()

  // Nếu không có sự kiện nào được chọn hoặc sự kiện đang hiển thị không còn trong danh sách
  const availableEvents = selectedEvents.length > 0 ? selectedEvents : Object.keys(payloadExamples)

  if (availableEvents.length > 0 && !availableEvents.includes(activeEvent)) {
    setActiveEvent(availableEvents[0])
  }

  const handleCopyPayload = (event) => {
    const payload = JSON.stringify(payloadExamples[event], null, 2)
    navigator.clipboard.writeText(payload)
    toast({
      title: "Đã sao chép",
      description: "Payload đã được sao chép vào clipboard",
    })
  }

  return (
    <div className="border rounded-md">
      <Tabs value={activeEvent} onValueChange={setActiveEvent} className="w-full">
        <div className="p-1 bg-muted/50 border-b overflow-x-auto">
          <TabsList className="inline-flex h-9">
            {availableEvents.map((event) => (
              <TabsTrigger key={event} value={event} className="text-xs px-3">
                {event}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {availableEvents.map((event) => (
          <TabsContent key={event} value={event} className="p-0">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-7 w-7 p-0"
                onClick={() => handleCopyPayload(event)}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <pre className="bg-muted/50 p-4 text-xs font-mono overflow-auto rounded-md max-h-96">
                {JSON.stringify(payloadExamples[event], null, 2)}
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
