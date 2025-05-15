"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function CustomerFilters() {
  const [selectedTags, setSelectedTags] = useState([])
  const [dateRange, setDateRange] = useState([0, 30])

  const availableTags = ["VIP", "Tiềm năng", "Mới", "Đã mua hàng", "Quan tâm", "Chưa liên hệ"]

  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const handleClearFilters = () => {
    setSelectedTags([])
    setDateRange([0, 30])
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
      case "Quan tâm":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "Chưa liên hệ":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="source" className="mb-2 block">
            Nguồn
          </Label>
          <Select>
            <SelectTrigger id="source">
              <SelectValue placeholder="Tất cả nguồn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả nguồn</SelectItem>
              <SelectItem value="zalo">Zalo</SelectItem>
              <SelectItem value="zalo-oa">Zalo OA</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="website">Website</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status" className="mb-2 block">
            Trạng thái
          </Label>
          <Select>
            <SelectTrigger id="status">
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tag" className="mb-2 block">
            Thẻ
          </Label>
          <Select onValueChange={handleAddTag}>
            <SelectTrigger id="tag">
              <SelectValue placeholder="Chọn thẻ" />
            </SelectTrigger>
            <SelectContent>
              {availableTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4">
        <Label className="mb-2 block">Thời gian liên hệ gần nhất (ngày)</Label>
        <div className="px-2">
          <Slider defaultValue={[0, 30]} max={90} step={1} value={dateRange} onValueChange={setDateRange} />
        </div>
        <div className="flex justify-between mt-1 text-sm text-gray-500">
          <span>{dateRange[0]} ngày</span>
          <span>{dateRange[1]} ngày</span>
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="mt-4">
          <Label className="mb-2 block">Thẻ đã chọn</Label>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="outline" className={getTagColor(tag)}>
                {tag}
                <button className="ml-1 hover:text-gray-700" onClick={() => handleRemoveTag(tag)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm" onClick={handleClearFilters}>
          Xóa bộ lọc
        </Button>
        <Button size="sm">Áp dụng</Button>
      </div>
    </div>
  )
}
