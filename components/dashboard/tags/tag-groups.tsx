"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash, Tag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Dữ liệu mẫu cho nhóm thẻ
const groupData = [
  {
    id: "group-001",
    name: "Phân loại khách hàng",
    description: "Phân loại khách hàng theo giá trị và tiềm năng",
    tagCount: 3,
    tags: ["VIP", "Tiềm năng", "Mới"],
  },
  {
    id: "group-002",
    name: "Trạng thái hoạt động",
    description: "Phân loại khách hàng theo trạng thái hoạt động",
    tagCount: 2,
    tags: ["Đang hoạt động", "Không hoạt động"],
  },
  {
    id: "group-003",
    name: "Hành vi mua hàng",
    description: "Phân loại khách hàng theo hành vi mua hàng",
    tagCount: 3,
    tags: ["Đã mua hàng", "Giỏ hàng bị bỏ", "Mua hàng thường xuyên"],
  },
  {
    id: "group-004",
    name: "Thời gian tham gia",
    description: "Phân loại khách hàng theo thời gian tham gia",
    tagCount: 3,
    tags: ["Mới", "Trung bình", "Lâu dài"],
  },
  {
    id: "group-005",
    name: "Sở thích sản phẩm",
    description: "Phân loại khách hàng theo sở thích sản phẩm",
    tagCount: 3,
    tags: ["Quan tâm sản phẩm A", "Quan tâm sản phẩm B", "Quan tâm sản phẩm C"],
  },
  {
    id: "group-006",
    name: "Loại chiến dịch",
    description: "Phân loại chiến dịch theo loại",
    tagCount: 3,
    tags: ["Giảm giá đặc biệt", "Sản phẩm mới", "Chăm sóc khách hàng"],
  },
  {
    id: "group-007",
    name: "Chiến dịch theo mùa",
    description: "Phân loại chiến dịch theo mùa",
    tagCount: 4,
    tags: ["Mùa xuân", "Mùa hè", "Mùa thu", "Mùa đông"],
  },
]

export default function TagGroups() {
  const [groups, setGroups] = useState(groupData)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Lọc nhóm theo từ khóa tìm kiếm
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Xử lý xóa nhóm
  const handleDelete = (id: string) => {
    setGroups(groups.filter((group) => group.id !== id))
    toast({
      title: "Đã xóa nhóm thẻ",
      description: "Nhóm thẻ đã được xóa thành công",
    })
  }

  // Xử lý chỉnh sửa nhóm
  const handleEdit = (group: any) => {
    setEditingGroup(group)
    setIsFormOpen(true)
  }

  // Xử lý tạo nhóm mới
  const handleCreate = () => {
    setEditingGroup(null)
    setIsFormOpen(true)
  }

  // Xử lý lưu nhóm
  const handleSave = (formData: any) => {
    if (editingGroup) {
      setGroups(groups.map((group) => (group.id === formData.id ? { ...formData } : group)))
      toast({
        title: "Đã cập nhật nhóm thẻ",
        description: "Nhóm thẻ đã được cập nhật thành công",
      })
    } else {
      const newGroup = {
        ...formData,
        id: `group-${Date.now()}`,
        tagCount: 0,
        tags: [],
      }
      setGroups([...groups, newGroup])
      toast({
        title: "Đã tạo nhóm thẻ",
        description: "Nhóm thẻ mới đã được tạo thành công",
      })
    }
    setIsFormOpen(false)
    setEditingGroup(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Tìm kiếm nhóm thẻ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-10 w-10"
              onClick={() => setSearchQuery("")}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Xóa tìm kiếm</span>
            </Button>
          )}
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo nhóm mới
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{group.tagCount} thẻ trong nhóm</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end p-4 pt-0">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(group)}>
                <Edit className="h-4 w-4 mr-1" />
                Chỉnh sửa
              </Button>
              <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDelete(group.id)}>
                <Trash className="h-4 w-4 mr-1" />
                Xóa
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Form tạo/chỉnh sửa nhóm thẻ */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingGroup ? "Chỉnh sửa nhóm thẻ" : "Tạo nhóm thẻ mới"}</DialogTitle>
          </DialogHeader>
          <GroupForm
            group={editingGroup}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingGroup(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface GroupFormProps {
  group?: any
  onSave: (formData: any) => void
  onCancel: () => void
}

function GroupForm({ group, onSave, onCancel }: GroupFormProps) {
  const [formData, setFormData] = useState({
    id: group?.id || "",
    name: group?.name || "",
    description: group?.description || "",
  })

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Xử lý lưu
  const handleSave = () => {
    onSave(formData)
  }

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Tên nhóm
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3"
            placeholder="Nhập tên nhóm thẻ"
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
            placeholder="Nhập mô tả nhóm thẻ"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button onClick={handleSave}>{group ? "Cập nhật" : "Tạo nhóm"}</Button>
      </DialogFooter>
    </>
  )
}
