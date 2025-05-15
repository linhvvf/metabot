"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Building, MapPin, Globe, Phone, Mail, Upload, Save } from "lucide-react"
import Image from "next/image"

export default function CompanySettings() {
  const [formData, setFormData] = useState({
    name: "Công ty TNHH ABC",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    website: "https://example.com",
    phone: "028 1234 5678",
    email: "contact@example.com",
    taxId: "0123456789",
    description: "Công ty chuyên cung cấp giải pháp phần mềm cho doanh nghiệp",
    logo: "/generic-company-logo.png",
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
      description: "Đã cập nhật thông tin công ty",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông tin công ty</h3>
        <p className="text-sm text-muted-foreground">Cập nhật thông tin công ty và thương hiệu của bạn</p>
      </div>
      <Separator />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4 border rounded-md flex items-center justify-center overflow-hidden">
            <Image
              src={formData.logo || "/placeholder.svg"}
              alt="Logo công ty"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <Button variant="outline" size="sm" className="mb-2">
            <Upload className="h-4 w-4 mr-2" />
            Tải logo lên
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Cho phép JPG, GIF hoặc PNG. Kích thước tối đa 1MB.
          </p>
        </div>

        <div className="md:w-2/3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Tên công ty</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="company-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-9"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax-id">Mã số thuế</Label>
              <Input id="tax-id" name="taxId" value={formData.taxId} onChange={handleChange} disabled={!isEditing} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-9 min-h-[80px]"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="pl-9"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-phone">Số điện thoại</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="company-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-9"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="company-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-9"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-[100px]"
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
        <h3 className="text-lg font-medium mb-4">Tùy chỉnh thương hiệu</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="primary-color">Màu chính</Label>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-md bg-blue-600"></div>
              <Input id="primary-color" type="text" value="#2563EB" readOnly />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondary-color">Màu phụ</Label>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-md bg-gray-200"></div>
              <Input id="secondary-color" type="text" value="#E5E7EB" readOnly />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="accent-color">Màu nhấn</Label>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-md bg-green-500"></div>
              <Input id="accent-color" type="text" value="#10B981" readOnly />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button>Tùy chỉnh màu sắc</Button>
        </div>
      </div>
    </div>
  )
}
