"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Mail, MessageSquare, Phone, MapPin, Tag, Plus, X, User, Building, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CustomerDetailModal({ customer, onClose }) {
  const [isEditing, setIsEditing] = useState(false)
  const [customerData, setCustomerData] = useState(customer)
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Thành công",
      description: "Đã cập nhật thông tin khách hàng",
    })
    setIsEditing(false)
    // Implement save functionality
  }

  const handleAddTag = () => {
    // Implement add tag functionality
  }

  const handleRemoveTag = (tag) => {
    // Implement remove tag functionality
  }

  const getTagColor = (tag) => {
    switch (tag) {
      case "VIP":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Tiềm năng":
        return "bg-green-100 text-green-800 border-green-200"
      case "Mới":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Đã mua hàng":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Mock conversation history
  const conversationHistory = [
    {
      id: 1,
      date: "2023-05-05T10:00:00",
      channel: "Zalo",
      content: "Khách hàng hỏi về sản phẩm A",
      agent: "Nhân viên 1",
    },
    {
      id: 2,
      date: "2023-05-03T14:30:00",
      channel: "Zalo",
      content: "Tư vấn về giá cả và chính sách bảo hành",
      agent: "Nhân viên 2",
    },
    {
      id: 3,
      date: "2023-04-28T09:15:00",
      channel: "Facebook",
      content: "Khách hàng phản hồi về chất lượng sản phẩm",
      agent: "Nhân viên 1",
    },
  ]

  // Mock purchase history
  const purchaseHistory = [
    {
      id: "ORD-001",
      date: "2023-04-15T11:20:00",
      amount: 1500000,
      status: "completed",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2023-03-22T09:45:00",
      amount: 850000,
      status: "completed",
      items: 1,
    },
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thông tin khách hàng</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Thông tin</TabsTrigger>
            <TabsTrigger value="conversations">Lịch sử hội thoại</TabsTrigger>
            <TabsTrigger value="purchases">Lịch sử mua hàng</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                    <AvatarFallback>
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-xl font-medium mb-1">{customer.name}</h3>
                  <Badge
                    variant={customer.status === "active" ? "default" : "secondary"}
                    className={
                      customer.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {customer.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                  </Badge>

                  <div className="w-full mt-4 space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{customer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{customer.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                      <Badge variant="outline" className="text-sm">
                        {customer.source}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Liên hệ gần nhất: {formatDate(customer.lastContact)}</span>
                    </div>
                  </div>

                  <div className="w-full mt-4">
                    <div className="flex items-center mb-2">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium">Thẻ</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {customer.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className={getTagColor(tag)}>
                          {tag}
                          {isEditing && (
                            <button className="ml-1 hover:text-gray-700" onClick={() => handleRemoveTag(tag)}>
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="h-6" onClick={handleAddTag}>
                          <Plus className="h-3 w-3 mr-1" />
                          Thêm
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="name"
                            value={customerData.name}
                            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="email"
                            type="email"
                            value={customerData.email}
                            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="phone"
                            value={customerData.phone}
                            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Công ty</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="company"
                            value={customerData.company || ""}
                            onChange={(e) => setCustomerData({ ...customerData, company: e.target.value })}
                            className="pl-9"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                        <Textarea
                          id="address"
                          value={customerData.address || ""}
                          onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                          className="pl-9 min-h-[80px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="website"
                          value={customerData.website || ""}
                          onChange={(e) => setCustomerData({ ...customerData, website: e.target.value })}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Ghi chú</Label>
                      <Textarea
                        id="notes"
                        value={customerData.notes || ""}
                        onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Họ và tên</p>
                        <p className="font-medium">{customer.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{customer.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Số điện thoại</p>
                        <p className="font-medium">{customer.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Công ty</p>
                        <p className="font-medium">{customer.company || "Chưa cập nhật"}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                      <p className="font-medium">{customer.address || "Chưa cập nhật"}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Website</p>
                      <p className="font-medium">
                        {customer.website ? (
                          <a
                            href={customer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {customer.website}
                          </a>
                        ) : (
                          "Chưa cập nhật"
                        )}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Ghi chú</p>
                      <p className="font-medium whitespace-pre-line">{customer.notes || "Chưa có ghi chú"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conversations">
            <div className="space-y-4">
              {conversationHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Chưa có lịch sử hội thoại</div>
              ) : (
                conversationHistory.map((conversation) => (
                  <div key={conversation.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {conversation.channel}
                        </Badge>
                        <span className="text-sm text-gray-500">{formatDate(conversation.date)}</span>
                      </div>
                      <span className="text-sm font-medium">{conversation.agent}</span>
                    </div>
                    <p className="text-gray-700">{conversation.content}</p>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="purchases">
            <div className="space-y-4">
              {purchaseHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Chưa có lịch sử mua hàng</div>
              ) : (
                purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Đơn hàng #{purchase.id}</h4>
                        <span className="text-sm text-gray-500">{formatDate(purchase.date)}</span>
                      </div>
                      <Badge
                        className={
                          purchase.status === "completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : purchase.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {purchase.status === "completed"
                          ? "Hoàn thành"
                          : purchase.status === "pending"
                            ? "Đang xử lý"
                            : "Đã hủy"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm">{purchase.items} sản phẩm</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(purchase.amount)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          {isEditing ? (
            <Button onClick={handleSave}>Lưu thay đổi</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
