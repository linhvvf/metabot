"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImagePlus, Smile, Link2, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AIMessageGenerator from "./ai-message-generator"

interface MessageEditorProps {
  type: string
  content: string
  onChange: (content: string) => void
  channel?: string
}

export default function MessageEditor({ type, content, onChange, channel }: MessageEditorProps) {
  const [previewMode, setPreviewMode] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")

  // Mẫu tin nhắn có sẵn
  const templates = [
    {
      id: "template-1",
      name: "Chào mừng khách hàng mới",
      content:
        "Xin chào {{name}}, cảm ơn bạn đã đăng ký dịch vụ của chúng tôi! Chúng tôi rất vui mừng được phục vụ bạn.",
    },
    {
      id: "template-2",
      name: "Thông báo khuyến mãi",
      content:
        "Xin chào {{name}}, chúng tôi có ưu đãi đặc biệt dành riêng cho bạn! Giảm 20% cho tất cả sản phẩm từ ngày 01/07 đến 15/07. Đừng bỏ lỡ cơ hội này!",
    },
    {
      id: "template-3",
      name: "Nhắc nhở thanh toán",
      content:
        "Xin chào {{name}}, đây là lời nhắc nhở rằng hóa đơn của bạn sẽ đến hạn vào ngày 15/07. Vui lòng thanh toán để tiếp tục sử dụng dịch vụ.",
    },
  ]

  // Xử lý khi chọn mẫu tin nhắn
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      onChange(template.content)
    }
  }

  // Hiển thị tin nhắn dựa trên loại
  const renderMessageEditor = () => {
    switch (type) {
      case "text":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message-content">Nội dung tin nhắn</Label>
              <Textarea
                id="message-content"
                placeholder="Nhập nội dung tin nhắn của bạn..."
                className="min-h-[200px] resize-none"
                value={content}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm">
                <Smile className="h-4 w-4 mr-2" />
                Emoji
              </Button>
              <Button type="button" variant="outline" size="sm">
                <Link2 className="h-4 w-4 mr-2" />
                Thêm liên kết
              </Button>
              <div className="ml-auto text-xs text-muted-foreground">{content.length}/1000 ký tự</div>
            </div>
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Hình ảnh</Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Kéo thả hình ảnh vào đây hoặc</p>
                <Button type="button" variant="secondary" size="sm">
                  Chọn hình ảnh
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-caption">Chú thích</Label>
              <Textarea
                id="image-caption"
                placeholder="Nhập chú thích cho hình ảnh..."
                className="resize-none"
                value={content}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>
          </div>
        )

      case "template":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-select">Chọn mẫu tin nhắn</Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mẫu tin nhắn" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="space-y-2">
                <Label htmlFor="template-content">Nội dung mẫu</Label>
                <Textarea
                  id="template-content"
                  className="min-h-[150px] resize-none"
                  value={content}
                  onChange={(e) => onChange(e.target.value)}
                />
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  // Hiển thị bản xem trước tin nhắn
  const renderMessagePreview = () => {
    return (
      <div className="p-4 border rounded-md bg-gray-50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xs text-blue-600">MB</span>
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">Metabot.vn</div>
            <div className="bg-white p-3 rounded-lg border mt-1 text-sm">
              {content || "Chưa có nội dung tin nhắn"}

              {type === "image" && (
                <div className="mt-2 bg-gray-200 rounded-md h-32 flex items-center justify-center">
                  <ImagePlus className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit" onClick={() => setPreviewMode(false)}>
            Soạn tin nhắn
          </TabsTrigger>
          <TabsTrigger value="ai" onClick={() => setPreviewMode(false)}>
            <Sparkles className="h-4 w-4 mr-2" />
            AI Gợi ý
          </TabsTrigger>
          <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
            Xem trước
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="pt-4">
          {renderMessageEditor()}
        </TabsContent>
        <TabsContent value="ai" className="pt-4">
          <AIMessageGenerator
            channel={type === "template" ? "multi" : "zalo"}
            onSelectMessage={(message) => onChange(message)}
          />
        </TabsContent>
        <TabsContent value="preview" className="pt-4">
          {renderMessagePreview()}
        </TabsContent>
      </Tabs>
    </div>
  )
}
