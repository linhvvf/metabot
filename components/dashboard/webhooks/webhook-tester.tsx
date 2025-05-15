"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Clock, CheckCircle2, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Danh sách các sự kiện có sẵn
const availableEvents = [
  {
    id: "customer.created",
    name: "Khách hàng mới",
    template: {
      event: "customer.created",
      data: {
        id: "cus_123456",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0901234567",
        createdAt: new Date().toISOString(),
      },
    },
  },
  {
    id: "message.created",
    name: "Tin nhắn mới",
    template: {
      event: "message.created",
      data: {
        id: "msg_123456",
        conversationId: "conv_123456",
        sender: {
          id: "cus_123456",
          name: "Nguyễn Văn A",
        },
        content: "Xin chào, tôi cần hỗ trợ về sản phẩm",
        createdAt: new Date().toISOString(),
      },
    },
  },
  {
    id: "conversation.closed",
    name: "Đóng hội thoại",
    template: {
      event: "conversation.closed",
      data: {
        id: "conv_123456",
        customerId: "cus_123456",
        status: "closed",
        closedBy: {
          id: "staff_123456",
          name: "Nhân viên hỗ trợ",
        },
        closedAt: new Date().toISOString(),
      },
    },
  },
]

export default function WebhookTester() {
  const [url, setUrl] = useState("")
  const [event, setEvent] = useState("")
  const [payload, setPayload] = useState("")
  const [secret, setSecret] = useState("")
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState(null)
  const { toast } = useToast()

  const setTemplateForEvent = (eventId) => {
    const selectedEvent = availableEvents.find((e) => e.id === eventId)
    if (selectedEvent) {
      setEvent(eventId)
      setPayload(JSON.stringify(selectedEvent.template, null, 2))
    }
  }

  const handleTest = async () => {
    if (!url) {
      toast({
        title: "URL không được để trống",
        description: "Vui lòng nhập URL webhook",
        variant: "destructive",
      })
      return
    }

    try {
      // Kiểm tra URL
      new URL(url)
    } catch (error) {
      toast({
        title: "URL không hợp lệ",
        description: "Vui lòng nhập URL webhook hợp lệ",
        variant: "destructive",
      })
      return
    }

    if (!payload) {
      toast({
        title: "Payload không được để trống",
        description: "Vui lòng nhập dữ liệu payload",
        variant: "destructive",
      })
      return
    }

    try {
      JSON.parse(payload)
    } catch (error) {
      toast({
        title: "Payload không hợp lệ",
        description: "Vui lòng nhập JSON hợp lệ",
        variant: "destructive",
      })
      return
    }

    // Giả lập gửi webhook
    setTesting(true)
    setResult(null)

    // Giả lập thời gian xử lý
    setTimeout(() => {
      // Trong thực tế, đây sẽ là một HTTP request thực tế đến server
      const success = Math.random() > 0.3 // 70% cơ hội thành công

      const mockResult = {
        success,
        timestamp: new Date().toISOString(),
        duration: Math.floor(Math.random() * 500) + 100, // 100-600ms
        statusCode: success ? 200 : 500,
        response: success
          ? { success: true, message: "Webhook received successfully" }
          : { error: "Internal Server Error" },
      }

      setResult(mockResult)
      setTesting(false)

      toast({
        title: success ? "Webhook gửi thành công" : "Webhook gửi thất bại",
        description: success
          ? `Nhận được phản hồi với mã trạng thái: ${mockResult.statusCode}`
          : `Lỗi với mã trạng thái: ${mockResult.statusCode}`,
        variant: success ? "default" : "destructive",
      })
    }, 1500)
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "-"
    return new Date(timestamp).toLocaleString("vi-VN")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Kiểm tra Webhook</h3>
        <p className="text-sm text-muted-foreground">
          Công cụ này cho phép bạn kiểm tra các webhook bằng cách gửi payload mẫu đến URL của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL Webhook</Label>
            <Input
              id="webhook-url"
              placeholder="https://example.com/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">URL của webhook để gửi dữ liệu</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-type">Loại sự kiện</Label>
            <Select value={event} onValueChange={setTemplateForEvent}>
              <SelectTrigger id="event-type">
                <SelectValue placeholder="Chọn loại sự kiện" />
              </SelectTrigger>
              <SelectContent>
                {availableEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Chọn một loại sự kiện để tải mẫu payload tương ứng</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secret">Secret (tùy chọn)</Label>
            <Input
              id="secret"
              placeholder="Khóa bí mật của webhook"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Khóa bí mật được sử dụng để tạo chữ ký cho payload webhook</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payload">Payload</Label>
            <Textarea
              id="payload"
              placeholder={`{\n  "event": "example.event",\n  "data": {}\n}`}
              className="font-mono text-sm h-52"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">JSON payload để gửi đến webhook</p>
          </div>

          <Button onClick={handleTest} disabled={testing}>
            <Send className="h-4 w-4 mr-2" />
            {testing ? "Đang gửi..." : "Gửi webhook"}
          </Button>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Kết quả kiểm tra</h4>

          {!result && !testing && (
            <div className="border rounded-md p-6 text-center">
              <p className="text-muted-foreground">Kết quả kiểm tra sẽ hiển thị ở đây</p>
            </div>
          )}

          {testing && (
            <div className="border rounded-md p-6 flex flex-col items-center justify-center">
              <div className="animate-spin">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-4">Đang gửi webhook...</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <Alert variant={result.success ? "default" : "destructive"}>
                {result.success ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{result.success ? "Webhook gửi thành công" : "Webhook gửi thất bại"}</AlertTitle>
                <AlertDescription>
                  {result.success
                    ? `Thành công với mã trạng thái: ${result.statusCode}`
                    : `Lỗi với mã trạng thái: ${result.statusCode}`}
                </AlertDescription>
              </Alert>

              <div className="border rounded-md p-4 space-y-4">
                <div>
                  <p className="text-sm font-medium">Thời gian</p>
                  <p className="text-sm">{formatTime(result.timestamp)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Thời lượng</p>
                  <p className="text-sm">{result.duration}ms</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phản hồi</p>
                  <pre className="bg-muted p-2 rounded-md text-xs font-mono mt-1 max-h-40 overflow-auto">
                    {JSON.stringify(result.response, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          <div className="border rounded-md p-4">
            <h4 className="font-medium text-sm mb-2">Mẹo kiểm tra webhook</h4>
            <ul className="text-sm space-y-2">
              <li>
                • Sử dụng dịch vụ như{" "}
                <a href="https://webhook.site" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  webhook.site
                </a>{" "}
                để nhận và kiểm tra webhook.
              </li>
              <li>• Đảm bảo URL webhook của bạn có thể truy cập được từ internet.</li>
              <li>• Webhook của bạn nên trả về mã trạng thái 200 để xác nhận đã nhận được.</li>
              <li>• Xử lý webhook một cách bất đồng bộ để tránh timeout.</li>
              <li>• Xác thực chữ ký webhooks để đảm bảo an toàn.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
