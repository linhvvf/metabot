"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Edit2, Plus, Save, Trash2 } from "lucide-react"

// Dữ liệu mẫu
const initialCategories = [
  { id: "1", name: "Chào mừng" },
  { id: "2", name: "Tiếp thị" },
  { id: "3", name: "Nhắc nhở" },
  { id: "4", name: "Cảm ơn" },
  { id: "5", name: "Phản hồi" },
]

export function TemplateCategoryManager() {
  const [categories, setCategories] = useState(initialCategories)
  const [isOpen, setIsOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: `new-${Date.now()}`,
        name: newCategoryName.trim(),
      }
      setCategories([...categories, newCategory])
      setNewCategoryName("")
    }
  }

  const updateCategory = (id: string, newName: string) => {
    if (newName.trim()) {
      setCategories(categories.map((cat) => (cat.id === id ? { ...cat, name: newName.trim() } : cat)))
      setEditingCategory(null)
    }
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          Quản lý danh mục
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Quản lý danh mục mẫu tin nhắn</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="flex gap-2">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Tên danh mục mới..."
            />
            <Button type="button" onClick={addCategory}>
              <Plus className="h-4 w-4 mr-1" />
              Thêm
            </Button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-2 border rounded-md">
                {editingCategory === category.id ? (
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      value={category.name}
                      onChange={(e) => {
                        setCategories(
                          categories.map((cat) => (cat.id === category.id ? { ...cat, name: e.target.value } : cat)),
                        )
                      }}
                      autoFocus
                    />
                    <Button type="button" size="sm" onClick={() => updateCategory(category.id, category.name)}>
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span>{category.name}</span>
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" size="sm" onClick={() => setEditingCategory(category.id)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
