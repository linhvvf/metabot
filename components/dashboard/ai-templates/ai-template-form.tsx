"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, ArrowLeft, Eye } from "lucide-react"
import AITemplateEditor from "./ai-template-editor"
import AITemplateVariables from "./ai-template-variables"
import AITemplatePreview from "./ai-template-preview"

// Dữ liệu mẫu
const categories = ["Chào mừng", "Hỗ trợ", "Marketing", "Hướng dẫn", "Giao dịch", "Thanh toán"]

const aiModels = ["GPT-4", "GPT-3.5", "Claude", "Gemini"]

// Mẫu tin nhắn mặc định
const defaultTemplate = {
  id: "",
  name: "",
  description: "",
  category: "Chào mừng",
  tags: [] as string[],
  content: "",
  variables: [
    { name: "customerName", description: "Tên khách hàng", defaultValue: "Nguyễn Văn A" },
    { name: "companyName", description: "Tên công ty", defaultValue: "Metabot" },
  ],
  aiModel: "GPT-4",
  isActive: true,
}

// Dữ liệu mẫu cho các mẫu tin nhắn hiện có
const mockTemplates = {
  "1": {
    id: "1",
    name: "Chào mừng khách hàng mới",
    description: "Tin nhắn chào mừng tự động khi khách hàng mới đăng ký",
    category: "Chào mừng",
    tags: ["Tự động", "Khách hàng mới"],
    content:
      "Xin chào {{customerName}},\n\nChúng tôi rất vui mừng chào đón bạn đến với {{companyName}}! Cảm ơn bạn đã đăng ký tài khoản.\n\nDưới đây là một số thông tin hữu ích để bạn bắt đầu:\n\n1. Khám phá tính năng của chúng tôi\n2. Cập nhật thông tin cá nhân\n3. Kết nối với đội ngũ hỗ trợ\n\nNếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi.\n\nTrân trọng,\nĐội ngũ {{companyName}}",
    variables: [
      { name: "customerName", description: "Tên khách hàng", defaultValue: "Nguyễn Văn A" },
      { name: "companyName", description: "Tên công ty", defaultValue: "Metabot" },
    ],
    aiModel: "GPT-4",
    isActive: true,
  },
  "2": {
    id: "2",
    name: "Phản hồi khiếu nại",
    description: "Mẫu phản hồi cho các khiếu nại của khách hàng",
    category: "Hỗ trợ",
    tags: ["Khiếu nại", "Hỗ trợ khách hàng"],
    content:
      "Kính gửi {{customerName}},\n\nChúng tôi xin chân thành xin lỗi về vấn đề bạn đã gặp phải với {{productName}}. Tại {{companyName}}, chúng tôi luôn cố gắng cung cấp dịch vụ tốt nhất và chúng tôi rất tiếc khi không đáp ứng được kỳ vọng của bạn.\n\nChúng tôi đang xem xét vấn đề của bạn và sẽ liên hệ lại trong vòng {{responseTime}} giờ tới.\n\nTrân trọng,\nĐội ngũ Hỗ trợ Khách hàng\n{{companyName}}",
    variables: [
      { name: "customerName", description: "Tên khách hàng", defaultValue: "Nguyễn Văn A" },
      { name: "productName", description: "Tên sản phẩm", defaultValue: "Dịch vụ XYZ" },
      { name: "companyName", description: "Tên công ty", defaultValue: "Metabot" },
      { name: "responseTime", description: "Thời gian phản hồi", defaultValue: "24" },
    ],
    aiModel: "GPT-4",
    isActive: true,
  },
}

interface AITemplateFormProps {
  id?: string
}

export default function AITemplateForm({ id }: AITemplateFormProps) {
  const router = useRouter()
  const [template, setTemplate] = useState(defaultTemplate)
  const [newTag, setNewTag] = useState("")
  const [activeTab, setActiveTab] = useState("content")
  const [isSaving, setIsSaving] = useState(false)

  // Nếu có ID, lấy dữ liệu mẫu tin nhắn
  useEffect(() => {
    if (id && mockTemplates[id as keyof typeof mockTemplates]) {
      setTemplate(mockTemplates[id as keyof typeof mockTemplates])
    }
  }, [id])

  // Xử lý thêm tag mới
  const addTag = () => {
    if (newTag && !template.tags.includes(newTag)) {
      setTemplate({
        ...template,
        tags: [...template.tags, newTag],
      })
      setNewTag("")
    }
  }

  // Xử lý xóa tag
  const removeTag = (tagToRemove: string) => {
    setTemplate({
      ...template,
      tags: template.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  // Xử lý thay đổi biến
  const handleVariablesChange = (variables: any[]) => {
    setTemplate({
      ...template,
      variables,
    })
  }

  // Xử lý lưu mẫu tin nhắn
  const handleSave = async () => {
    setIsSaving(true)

    // Giả lập API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Chuyển hướng về trang danh sách
    router.push("/dashboard/ai-templates")
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="gap-2" onClick={() => router.push("/dashboard/ai-templates")}>
        <ArrowLeft className="h-4 w-4" /> Quay lại
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Tên mẫu tin nhắn</Label>
                  <Input
                    id="name"
                    placeholder="Nhập tên mẫu tin nhắn"
                    value={template.name}
                    onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả ngắn gọn về mẫu tin nhắn này"
                    value={template.description}
                    onChange={(e) => setTemplate({ ...template, description: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Select
                    value={template.category}
                    onValueChange={(value) => setTemplate({ ...template, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Thẻ</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Thêm thẻ mới"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Nội dung</TabsTrigger>
                  <TabsTrigger value="variables">Biến động</TabsTrigger>
                  <TabsTrigger value="preview">Xem trước</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <AITemplateEditor
                    value={template.content}
                    onChange={(content) => setTemplate({ ...template, content })}
                    variables={template.variables}
                  />
                </TabsContent>

                <TabsContent value="variables" className="space-y-4">
                  <AITemplateVariables variables={template.variables} onChange={handleVariablesChange} />
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <AITemplatePreview content={template.content} variables={template.variables} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="ai-model">Mô hình AI</Label>
                  <Select
                    value={template.aiModel}
                    onValueChange={(value) => setTemplate({ ...template, aiModel: value })}
                  >
                    <SelectTrigger id="ai-model">
                      <SelectValue placeholder="Chọn mô hình AI" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="active-status">Trạng thái hoạt động</Label>
                  <Switch
                    id="active-status"
                    checked={template.isActive}
                    onCheckedChange={(checked) => setTemplate({ ...template, isActive: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button onClick={handleSave} className="w-full gap-2" disabled={isSaving}>
              <Save className="h-4 w-4" />
              {isSaving ? "Đang lưu..." : "Lưu mẫu tin nhắn"}
            </Button>

            <Button variant="outline" className="w-full gap-2" onClick={() => setActiveTab("preview")}>
              <Eye className="h-4 w-4" />
              Xem trước
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
