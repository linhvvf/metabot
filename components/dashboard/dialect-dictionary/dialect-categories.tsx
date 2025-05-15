"use client"

import { useState } from "react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Trash2 } from "lucide-react"

// Dữ liệu mẫu
const categoryData = [
  { id: "1", name: "Ẩm thực", count: 12 },
  { id: "2", name: "Xưng hô", count: 8 },
  { id: "3", name: "Thành ngữ", count: 15 },
  { id: "4", name: "Hành động", count: 10 },
  { id: "5", name: "Từ vựng", count: 20 },
  { id: "6", name: "Tiếng lóng", count: 18 },
  { id: "7", name: "Ngôn ngữ mạng", count: 25 },
]

export function DialectCategories() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [newCategoryName, setNewCategoryName] = useState("")

  const handleEdit = (category: any) => {
    setSelectedCategory(category)
    setNewCategoryName(category.name)
    setIsEditDialogOpen(true)
  }

  const handleAddCategory = () => {
    console.log("Adding new category:", newCategoryName)
    setNewCategoryName("")
    setIsAddDialogOpen(false)
  }

  const handleUpdateCategory = () => {
    console.log("Updating category:", selectedCategory?.id, "to", newCategoryName)
    setNewCategoryName("")
    setIsEditDialogOpen(false)
    setSelectedCategory(null)
  }

  const handleDeleteCategory = (category: any) => {
    console.log("Deleting category:", category.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Danh mục biệt ngữ</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm danh mục
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên danh mục</TableHead>
              <TableHead>Số lượng biệt ngữ</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryData.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{category.count}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Chỉnh sửa</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCategory(category)}
                      disabled={category.count > 0}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Xóa</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog thêm danh mục */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
            <DialogDescription>Tạo danh mục mới để phân loại biệt ngữ</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên danh mục</Label>
              <Input id="name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddCategory}>Thêm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog chỉnh sửa danh mục */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
            <DialogDescription>Cập nhật tên danh mục biệt ngữ</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Tên danh mục</Label>
              <Input id="edit-name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleUpdateCategory}>Cập nhật</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
