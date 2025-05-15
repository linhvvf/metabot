"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Edit2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CustomerTagManager() {
  const [tags, setTags] = useState([
    { id: 1, name: "VIP", color: "yellow" },
    { id: 2, name: "Tiềm năng", color: "green" },
    { id: 3, name: "Mới", color: "blue" },
    { id: 4, name: "Đã mua hàng", color: "purple" },
    { id: 5, name: "Quan tâm", color: "pink" },
    { id: 6, name: "Chưa liên hệ", color: "red" },
  ])
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState("blue")
  const [editingTagId, setEditingTagId] = useState(null)
  const [editingTagName, setEditingTagName] = useState("")
  const { toast } = useToast()

  const colors = [
    { name: "gray", class: "bg-gray-100 text-gray-800 border-gray-200" },
    { name: "red", class: "bg-red-100 text-red-800 border-red-200" },
    { name: "yellow", class: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    { name: "green", class: "bg-green-100 text-green-800 border-green-200" },
    { name: "blue", class: "bg-blue-100 text-blue-800 border-blue-200" },
    { name: "indigo", class: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    { name: "purple", class: "bg-purple-100 text-purple-800 border-purple-200" },
    { name: "pink", class: "bg-pink-100 text-pink-800 border-pink-200" },
  ]

  const getTagColorClass = (colorName) => {
    return colors.find((c) => c.name === colorName)?.class || colors[0].class
  }

  const handleAddTag = () => {
    if (newTagName.trim() === "") {
      toast({
        title: "Lỗi",
        description: "Tên thẻ không được để trống",
        variant: "destructive",
      })
      return
    }

    if (tags.some((tag) => tag.name.toLowerCase() === newTagName.toLowerCase())) {
      toast({
        title: "Lỗi",
        description: "Thẻ này đã tồn tại",
        variant: "destructive",
      })
      return
    }

    const newTag = {
      id: tags.length + 1,
      name: newTagName,
      color: newTagColor,
    }

    setTags([...tags, newTag])
    setNewTagName("")
    toast({
      title: "Thành công",
      description: `Đã thêm thẻ "${newTagName}"`,
    })
  }

  const handleDeleteTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId))
    toast({
      title: "Thành công",
      description: "Đã xóa thẻ",
    })
  }

  const handleEditTag = (tag) => {
    setEditingTagId(tag.id)
    setEditingTagName(tag.name)
  }

  const handleSaveEdit = (tagId) => {
    if (editingTagName.trim() === "") {
      toast({
        title: "Lỗi",
        description: "Tên thẻ không được để trống",
        variant: "destructive",
      })
      return
    }

    if (tags.some((tag) => tag.id !== tagId && tag.name.toLowerCase() === editingTagName.toLowerCase())) {
      toast({
        title: "Lỗi",
        description: "Thẻ này đã tồn tại",
        variant: "destructive",
      })
      return
    }

    setTags(tags.map((tag) => (tag.id === tagId ? { ...tag, name: editingTagName } : tag)))
    setEditingTagId(null)
    toast({
      title: "Thành công",
      description: "Đã cập nhật thẻ",
    })
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
      <h3 className="font-medium mb-3">Quản lý thẻ</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <Label htmlFor="new-tag" className="mb-2 block">
            Tên thẻ mới
          </Label>
          <div className="flex gap-2">
            <Input
              id="new-tag"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Nhập tên thẻ..."
            />
            <Button onClick={handleAddTag}>
              <Plus className="h-4 w-4 mr-1" />
              Thêm
            </Button>
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Màu sắc</Label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`w-6 h-6 rounded-full border ${
                  newTagColor === color.name ? "ring-2 ring-offset-2 ring-blue-500" : "ring-0"
                }`}
                style={{
                  backgroundColor: `var(--${color.name}-100, #f3f4f6)`,
                }}
                onClick={() => setNewTagColor(color.name)}
                aria-label={`Màu ${color.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Label className="mb-2 block">Thẻ hiện có</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center justify-between p-2 border rounded-md bg-white">
              {editingTagId === tag.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input value={editingTagName} onChange={(e) => setEditingTagName(e.target.value)} className="h-8" />
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleSaveEdit(tag.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Badge variant="outline" className={getTagColorClass(tag.color)}>
                    {tag.name}
                  </Badge>
                  <div className="flex items-center">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEditTag(tag)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteTag(tag.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
