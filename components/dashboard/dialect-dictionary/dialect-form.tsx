"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DialectFormProps {
  isOpen: boolean
  onClose: () => void
  dialect?: any
}

export function DialectForm({ isOpen, onClose, dialect }: DialectFormProps) {
  const [formData, setFormData] = useState({
    term: "",
    meaning: "",
    region: "",
    category: "",
    examples: "",
    standardTerm: "",
  })

  useEffect(() => {
    if (dialect) {
      setFormData({
        term: dialect.term || "",
        meaning: dialect.meaning || "",
        region: dialect.region || "",
        category: dialect.category || "",
        examples: dialect.examples || "",
        standardTerm: dialect.standardTerm || "",
      })
    } else {
      setFormData({
        term: "",
        meaning: "",
        region: "",
        category: "",
        examples: "",
        standardTerm: "",
      })
    }
  }, [dialect])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý lưu dữ liệu
    console.log("Submitting:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{dialect ? "Chỉnh sửa biệt ngữ" : "Thêm biệt ngữ mới"}</DialogTitle>
          <DialogDescription>
            {dialect
              ? "Chỉnh sửa thông tin biệt ngữ trong cơ sở dữ liệu"
              : "Thêm biệt ngữ mới vào cơ sở dữ liệu để cải thiện khả năng phân tích ngôn ngữ"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="term">Biệt ngữ</Label>
              <Input id="term" value={formData.term} onChange={(e) => handleChange("term", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="standardTerm">Từ chuẩn tương đương</Label>
              <Input
                id="standardTerm"
                value={formData.standardTerm}
                onChange={(e) => handleChange("standardTerm", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meaning">Ý nghĩa</Label>
            <Textarea
              id="meaning"
              value={formData.meaning}
              onChange={(e) => handleChange("meaning", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Vùng miền</Label>
              <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Chọn vùng miền" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vùng miền</SelectLabel>
                    <SelectItem value="Miền Bắc">Miền Bắc</SelectItem>
                    <SelectItem value="Miền Trung">Miền Trung</SelectItem>
                    <SelectItem value="Miền Nam">Miền Nam</SelectItem>
                    <SelectItem value="Toàn quốc">Toàn quốc</SelectItem>
                    <SelectItem value="Internet">Internet</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Danh mục</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Danh mục</SelectLabel>
                    <SelectItem value="Ẩm thực">Ẩm thực</SelectItem>
                    <SelectItem value="Xưng hô">Xưng hô</SelectItem>
                    <SelectItem value="Thành ngữ">Thành ngữ</SelectItem>
                    <SelectItem value="Hành động">Hành động</SelectItem>
                    <SelectItem value="Từ vựng">Từ vựng</SelectItem>
                    <SelectItem value="Tiếng lóng">Tiếng lóng</SelectItem>
                    <SelectItem value="Ngôn ngữ mạng">Ngôn ngữ mạng</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="examples">Ví dụ sử dụng</Label>
            <Textarea
              id="examples"
              value={formData.examples}
              onChange={(e) => handleChange("examples", e.target.value)}
              placeholder="Nhập các ví dụ về cách sử dụng biệt ngữ này"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">{dialect ? "Cập nhật" : "Thêm mới"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
