"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Bot, Save, Plus, Trash2, Edit, Check, X, Wand2, RefreshCw, Sparkles } from "lucide-react"

export default function AISettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isEditing, setIsEditing] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState(null)
  const [newTemplate, setNewTemplate] = useState({ name: "", content: "", category: "general" })
  const { toast } = useToast()

  // Mock data cho mẫu câu trả lời
  const [replyTemplates, setReplyTemplates] = useState([
    {
      id: 1,
      name: "Chào mừng",
      content: "Xin chào! Cảm ơn bạn đã liên hệ với Metabot. Tôi có thể giúp gì cho bạn?",
      category: "general",
      usageCount: 120,
    },
    {
      id: 2,
      name: "Cảm ơn",
      content: "Cảm ơn bạn đã chia sẻ thông tin. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.",
      category: "general",
      usageCount: 85,
    },
    {
      id: 3,
      name: "Kết thúc",
      content: "Cảm ơn bạn đã liên hệ với chúng tôi. Nếu có bất kỳ câu hỏi nào khác, đừng ngần ngại liên hệ lại nhé!",
      category: "general",
      usageCount: 92,
    },
    {
      id: 4,
      name: "Thông tin sản phẩm",
      content:
        "Metabot.vn là nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh, giúp doanh nghiệp kết nối và quản lý đồng thời Zalo cá nhân, Zalo OA và các nền tảng OTT khác.",
      category: "product",
      usageCount: 67,
    },
    {
      id: 5,
      name: "Báo giá",
      content:
        "Chúng tôi có 3 gói dịch vụ: Cơ bản (499.000đ/tháng), Chuyên nghiệp (999.000đ/tháng) và Doanh nghiệp (1.999.000đ/tháng). Bạn có thể tham khảo chi tiết tại website của chúng tôi.",
      category: "sales",
      usageCount: 54,
    },
  ])

  const handleSaveSettings = () => {
    toast({
      title: "Thành công",
      description: "Đã lưu cài đặt AI",
    })
  }

  const handleAddTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin mẫu câu",
        variant: "destructive",
      })
      return
    }

    const newId = replyTemplates.length > 0 ? Math.max(...replyTemplates.map((t) => t.id)) + 1 : 1

    setReplyTemplates([
      ...replyTemplates,
      {
        id: newId,
        name: newTemplate.name,
        content: newTemplate.content,
        category: newTemplate.category,
        usageCount: 0,
      },
    ])

    setNewTemplate({ name: "", content: "", category: "general" })

    toast({
      title: "Thành công",
      description: "Đã thêm mẫu câu mới",
    })
  }

  const handleEditTemplate = (template) => {
    setEditingTemplateId(template.id)
    setNewTemplate({
      name: template.name,
      content: template.content,
      category: template.category,
    })
  }

  const handleUpdateTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin mẫu câu",
        variant: "destructive",
      })
      return
    }

    setReplyTemplates(
      replyTemplates.map((template) =>
        template.id === editingTemplateId
          ? {
              ...template,
              name: newTemplate.name,
              content: newTemplate.content,
              category: newTemplate.category,
            }
          : template,
      ),
    )

    setEditingTemplateId(null)
    setNewTemplate({ name: "", content: "", category: "general" })

    toast({
      title: "Thành công",
      description: "Đã cập nhật mẫu câu",
    })
  }

  const handleDeleteTemplate = (id) => {
    setReplyTemplates(replyTemplates.filter((template) => template.id !== id))

    toast({
      title: "Thành công",
      description: "Đã xóa mẫu câu",
    })
  }

  const handleCancelEdit = () => {
    setEditingTemplateId(null)
    setNewTemplate({ name: "", content: "", category: "general" })
  }

  // Dummy variables for customer and conversation context
  const customer = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    tags: ["vip", "loyal"],
    notes: "High-value customer",
  }

  const conversation = {
    history: "Customer: Hello\nAgent: Hi there!",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt AI</h1>
        <p className="text-gray-500">Quản lý cài đặt AI gợi ý trả lời và mẫu câu</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="general">Cài đặt chung</TabsTrigger>
          <TabsTrigger value="templates">Mẫu câu trả lời</TabsTrigger>
          <TabsTrigger value="prompts">Tùy chỉnh prompt</TabsTrigger>
          <TabsTrigger value="history">Lịch sử sử dụng</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 text-blue-600 mr-2" />
                Cài đặt AI gợi ý trả lời
              </CardTitle>
              <CardDescription>Tùy chỉnh cách AI gợi ý nội dung trả lời tin nhắn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Bật AI gợi ý trả lời</h3>
                    <p className="text-sm text-gray-500">Cho phép AI gợi ý nội dung trả lời tin nhắn</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="ai-model">Mô hình AI</Label>
                  <select id="ai-model" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="gpt-4o">
                    <option value="gpt-4o">GPT-4o (Mặc định)</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="claude-3">Claude 3</option>
                  </select>
                  <p className="text-xs text-gray-500">
                    Mô hình AI được sử dụng để tạo gợi ý trả lời. Các mô hình khác nhau có thể có chi phí và hiệu suất
                    khác nhau.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suggestion-count">Số lượng gợi ý</Label>
                  <select
                    id="suggestion-count"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="3"
                  >
                    <option value="1">1 gợi ý</option>
                    <option value="2">2 gợi ý</option>
                    <option value="3">3 gợi ý (Mặc định)</option>
                    <option value="4">4 gợi ý</option>
                    <option value="5">5 gợi ý</option>
                  </select>
                  <p className="text-xs text-gray-500">
                    Số lượng gợi ý trả lời được hiển thị mỗi lần. Nhiều gợi ý hơn có thể tăng chi phí API.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Ngôn ngữ mặc định</Label>
                  <select id="language" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="vi">
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">Tiếng Anh</option>
                    <option value="auto">Tự động phát hiện</option>
                  </select>
                  <p className="text-xs text-gray-500">
                    Ngôn ngữ mặc định cho gợi ý trả lời. Chọn "Tự động phát hiện" để AI tự nhận diện ngôn ngữ của khách
                    hàng.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="tone">Giọng điệu</Label>
                  <select
                    id="tone"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="professional"
                  >
                    <option value="professional">Chuyên nghiệp</option>
                    <option value="friendly">Thân thiện</option>
                    <option value="formal">Trang trọng</option>
                    <option value="casual">Thân mật</option>
                  </select>
                  <p className="text-xs text-gray-500">Giọng điệu mặc định cho gợi ý trả lời.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-length">Độ dài tối đa</Label>
                  <select
                    id="max-length"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="medium"
                  >
                    <option value="short">Ngắn (50-100 ký tự)</option>
                    <option value="medium">Vừa (100-200 ký tự)</option>
                    <option value="long">Dài (200-500 ký tự)</option>
                  </select>
                  <p className="text-xs text-gray-500">Độ dài tối đa cho mỗi gợi ý trả lời.</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Tự động gợi ý</h3>
                    <p className="text-sm text-gray-500">Tự động hiển thị gợi ý khi nhận tin nhắn mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sử dụng thông tin khách hàng</h3>
                    <p className="text-sm text-gray-500">Sử dụng thông tin khách hàng để cá nhân hóa gợi ý</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sử dụng lịch sử hội thoại</h3>
                    <p className="text-sm text-gray-500">Sử dụng lịch sử hội thoại để tạo gợi ý phù hợp hơn</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Thu thập phản hồi</h3>
                    <p className="text-sm text-gray-500">Thu thập phản hồi về gợi ý để cải thiện chất lượng</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="h-5 w-5 text-blue-600 mr-2" />
                Mẫu câu trả lời
              </CardTitle>
              <CardDescription>Quản lý các mẫu câu trả lời được sử dụng thường xuyên</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Thêm mẫu câu mới</h3>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Hủy
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm mẫu câu
                      </>
                    )}
                  </Button>
                </div>

                {(isEditing || editingTemplateId) && (
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-name">Tên mẫu câu</Label>
                      <Input
                        id="template-name"
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        placeholder="Ví dụ: Chào mừng"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="template-content">Nội dung</Label>
                      <Textarea
                        id="template-content"
                        value={newTemplate.content}
                        onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                        placeholder="Nhập nội dung mẫu câu..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="template-category">Danh mục</Label>
                      <select
                        id="template-category"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={newTemplate.category}
                        onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                      >
                        <option value="general">Chung</option>
                        <option value="greeting">Chào hỏi</option>
                        <option value="product">Thông tin sản phẩm</option>
                        <option value="support">Hỗ trợ</option>
                        <option value="sales">Bán hàng</option>
                        <option value="closing">Kết thúc</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Hủy
                      </Button>
                      <Button onClick={editingTemplateId ? handleUpdateTemplate : handleAddTemplate}>
                        {editingTemplateId ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Cập nhật
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Lọc theo danh mục</Label>
                    <select className="p-1 border border-gray-300 rounded-md text-sm">
                      <option value="all">Tất cả danh mục</option>
                      <option value="general">Chung</option>
                      <option value="greeting">Chào hỏi</option>
                      <option value="product">Thông tin sản phẩm</option>
                      <option value="support">Hỗ trợ</option>
                      <option value="sales">Bán hàng</option>
                      <option value="closing">Kết thúc</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {replyTemplates.map((template) => (
                    <div key={template.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {template.category === "general"
                              ? "Chung"
                              : template.category === "greeting"
                                ? "Chào hỏi"
                                : template.category === "product"
                                  ? "Thông tin sản phẩm"
                                  : template.category === "support"
                                    ? "Hỗ trợ"
                                    : template.category === "sales"
                                      ? "Bán hàng"
                                      : "Kết thúc"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditTemplate(template)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{template.content}</p>
                      <div className="text-xs text-gray-500">Đã sử dụng: {template.usageCount} lần</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
                Tùy chỉnh prompt
              </CardTitle>
              <CardDescription>Tùy chỉnh prompt được sử dụng để tạo gợi ý trả lời</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">System prompt</Label>
                  <Textarea
                    id="system-prompt"
                    rows={6}
                    defaultValue={`Bạn là trợ lý AI của Metabot.vn, một nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh.
Nhiệm vụ của bạn là gợi ý 3 câu trả lời khác nhau cho tin nhắn của khách hàng.
Câu trả lời phải ngắn gọn, chuyên nghiệp, thân thiện và phù hợp với ngữ cảnh hội thoại.`}
                  />
                  <p className="text-xs text-gray-500">
                    System prompt định nghĩa vai trò và nhiệm vụ của AI. Thay đổi này sẽ ảnh hưởng đến tất cả gợi ý.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suggestion-format">Định dạng gợi ý</Label>
                  <Textarea
                    id="suggestion-format"
                    rows={4}
                    defaultValue={`Hãy đưa ra 3 gợi ý trả lời khác nhau, mỗi gợi ý bắt đầu bằng "Gợi ý 1:", "Gợi ý 2:", "Gợi ý 3:".
Mỗi gợi ý nên có độ dài và phong cách khác nhau:
- Gợi ý 1: Trả lời ngắn gọn, trực tiếp
- Gợi ý 2: Trả lời đầy đủ, chi tiết
- Gợi ý 3: Trả lời thân thiện, gần gũi

Chỉ trả về 3 gợi ý, không thêm bất kỳ giải thích nào khác.`}
                  />
                  <p className="text-xs text-gray-500">
                    Định dạng gợi ý xác định cách AI trả về các gợi ý. Thay đổi này sẽ ảnh hưởng đến cách hiển thị gợi
                    ý.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-context">Bối cảnh khách hàng</Label>
                  <Textarea
                    id="customer-context"
                    rows={4}
                    defaultValue={`Thông tin khách hàng:
- Tên: ${customer.name}
- Email: ${customer.email}
- Số điện thoại: ${customer.phone}
- Nhãn: ${customer.tags}
- Ghi chú: ${customer.notes}`}
                  />
                  <p className="text-xs text-gray-500">
                    Bối cảnh khách hàng xác định thông tin khách hàng được sử dụng trong prompt. Sử dụng các biến{" "}
                    {"{customer.field}"} để tham chiếu đến thông tin khách hàng.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conversation-context">Bối cảnh hội thoại</Label>
                  <Textarea
                    id="conversation-context"
                    rows={4}
                    defaultValue={`Lịch sử hội thoại gần đây:
${conversation.history}`}
                  />
                  <p className="text-xs text-gray-500">
                    Bối cảnh hội thoại xác định cách lịch sử hội thoại được sử dụng trong prompt. Sử dụng biến{" "}
                    {"{conversation.history}"} để tham chiếu đến lịch sử hội thoại.
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu cài đặt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="h-5 w-5 text-blue-600 mr-2" />
                Lịch sử sử dụng
              </CardTitle>
              <CardDescription>Xem lịch sử sử dụng AI gợi ý trả lời</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Thống kê sử dụng</h3>
                  <select className="p-1 border border-gray-300 rounded-md text-sm">
                    <option value="7days">7 ngày qua</option>
                    <option value="30days">30 ngày qua</option>
                    <option value="90days">90 ngày qua</option>
                    <option value="all">Tất cả</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm text-gray-500 mb-1">Tổng số gợi ý</h4>
                    <p className="text-2xl font-bold">1,248</p>
                    <p className="text-xs text-green-600">+12.5% so với kỳ trước</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm text-gray-500 mb-1">Gợi ý được sử dụng</h4>
                    <p className="text-2xl font-bold">856</p>
                    <p className="text-xs text-green-600">+8.2% so với kỳ trước</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm text-gray-500 mb-1">Tỷ lệ sử dụng</h4>
                    <p className="text-2xl font-bold">68.6%</p>
                    <p className="text-xs text-red-600">-2.1% so với kỳ trước</p>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">Biểu đồ sử dụng</h4>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Biểu đồ sử dụng AI gợi ý trả lời</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Lịch sử gần đây</h4>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thời gian
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nhân viên
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Khách hàng
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(Date.now() - i * 3600000).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nhân viên {i}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Khách hàng {i}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Badge
                                variant="outline"
                                className={i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                              >
                                {i % 2 === 0 ? "Đã sử dụng" : "Bỏ qua"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
