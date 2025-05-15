"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Phone, Upload, Save } from "lucide-react"

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    position: "Giám đốc",
    avatar: "/placeholder.svg?key=staff1",
  })
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    toast({
      title: "Thành công",
      description: "Đã cập nhật thông tin tài khoản",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông tin tài khoản</h3>
        <p className="text-sm text-muted-foreground">Cập nhật thông tin cá nhân và quản lý tài khoản của bạn</p>
      </div>
      <Separator />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <Avatar className="h-32 w-32 mb-4">
            <AvatarImage src={formData.avatar || "/placeholder.svg"} alt={formData.name} />
            <AvatarFallback>
              {formData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="mb-2">
            <Upload className="h-4 w-4 mr-2" />
            Tải ảnh lên
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Cho phép JPG, GIF hoặc PNG. Kích thước tối đa 1MB.
          </p>
        </div>

        <div className="md:w-2/3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-9"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-9"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-9"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Chức vụ</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h3 className="text-lg font-medium mb-4">Đổi mật khẩu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
            <Input id="current-password" type="password" />
          </div>
          <div></div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button>Cập nhật mật khẩu</Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h3 className="text-lg font-medium mb-4 text-red-600">Xóa tài khoản</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Khi bạn xóa tài khoản, tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
        </p>
        <Button variant="destructive">Xóa tài khoản</Button>
      </div>
    </div>
  )
}
