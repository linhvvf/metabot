"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Dữ liệu mẫu cho bộ lọc
const categories = ["Tất cả", "Chào mừng", "Hỗ trợ", "Marketing", "Hướng dẫn", "Giao dịch", "Thanh toán"]

const tags = [
  "Tự động",
  "Khách hàng mới",
  "Khiếu nại",
  "Hỗ trợ khách hàng",
  "Khuyến mãi",
  "Marketing",
  "Sản phẩm",
  "Hướng dẫn",
  "Đơn hàng",
  "Cảm ơn",
  "Nhắc nhở",
  "Thanh toán",
]

const aiModels = ["Tất cả", "GPT-4", "GPT-3.5", "Claude", "Gemini"]

export default function AITemplateFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedModel, setSelectedModel] = useState("Tất cả")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showActiveOnly, setShowActiveOnly] = useState(false)

  // Xử lý chọn/bỏ chọn tag
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Xóa tất cả bộ lọc
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Tất cả")
    setSelectedModel("Tất cả")
    setSelectedTags([])
    setShowActiveOnly(false)
  }

  // Hiển thị các tag đã chọn
  const selectedTagsDisplay = (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedTags.map((tag) => (
        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
          {tag}
          <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
        </Badge>
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm mẫu tin nhắn..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Bộ lọc</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Bộ lọc mẫu tin nhắn</SheetTitle>
                <SheetDescription>Tùy chỉnh bộ lọc để tìm kiếm mẫu tin nhắn phù hợp</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Mô hình AI</h3>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
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

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Thẻ</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`} className="text-sm">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active-only"
                    checked={showActiveOnly}
                    onCheckedChange={(checked) => setShowActiveOnly(checked as boolean)}
                  />
                  <Label htmlFor="active-only">Chỉ hiển thị mẫu đang hoạt động</Label>
                </div>
              </div>

              <SheetFooter>
                <Button variant="outline" onClick={clearFilters}>
                  Xóa bộ lọc
                </Button>
                <SheetClose asChild>
                  <Button>Áp dụng</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {selectedTags.length > 0 && selectedTagsDisplay}
    </div>
  )
}
