"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TagFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (tag: any) => void
  tag?: any
}

export default function TagForm({ isOpen, onClose, onSave, tag }: TagFormProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    type: "customer",
    color: "blue",
    group: "",
  })

  // Danh sách nhóm thẻ mẫu
  const tagGroups = [
    "Phân loại khách hàng",
    "Trạng thái hoạt động",
    "Hành vi mua hàng",
    "Thời gian tham gia",
    "Sở thích sản phẩm",
    "Loại chiến dịch",
    "Chiến dịch theo mùa",
    "Khác",
  ]

  // Cập nhật form khi tag thay đổi
  useEffect(() => {
    if (tag) {
      setFormData({
        id: tag.id,
        name: tag.name,
        description: tag.description,
        type: tag.type,
        color: tag.color,
        group: tag.group,
      })
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        type: "customer",
        color: "blue",
        group: "",
      })
    }
  }, [tag])

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Xử lý thay đổi select
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Xử lý lưu
  const handleSave = () => {
    onSave(formData)
  }

  // Danh sách màu
  const colors = [
    { name: "blue", label: "Xanh dương", class: "bg-blue-500" },
    { name: "green", label: "Xanh lá", class: "bg-green-500" },
    { name: "red", label: "Đỏ", class: "bg-red-500" },
    { name: "yellow", label: "Vàng", class: "bg-yellow-500" },
    { name: "purple", label: "Tím", class: "bg-purple-500" },
    { name: "indigo", label: "Chàm", class: "bg-indigo-500" },
    { name: "pink", label: "Hồng", class: "bg-pink-500" },
    { name: "orange", label: "Cam", class: "bg-orange-500" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{tag ? "Chỉnh sửa thẻ" : "Tạo thẻ mới"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên thẻ
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Nhập tên thẻ"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Nhập mô tả thẻ"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Loại thẻ
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn loại thẻ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Thẻ khách hàng</SelectItem>
                <SelectItem value="campaign">Thẻ chiến dịch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group" className="text-right">
              Nhóm thẻ
            </Label>
            <Select value={formData.group} onValueChange={(value) => handleSelectChange("group", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn nhóm thẻ" />
              </SelectTrigger>
              <SelectContent>
                {tagGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Màu sắc</Label>
            <RadioGroup
              value={formData.color}
              onValueChange={(value) => handleSelectChange("color", value)}
              className="col-span-3 flex flex-wrap gap-2"
            >
              {colors.map((color) => (
                <div key={color.name} className="flex items-center space-x-2">
                  <RadioGroupItem value={color.name} id={`color-${color.name}`} className="sr-only" />
                  <Label
                    htmlFor={`color-${color.name}`}
                    className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                      formData.color === color.name ? "ring-2 ring-offset-2 ring-blue-600" : ""
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full ${color.class}`}></span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSave}>{tag ? "Cập nhật" : "Tạo thẻ"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
