"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Variable {
  name: string
  description: string
  defaultValue: string
}

interface AITemplateVariablesProps {
  variables: Variable[]
  onChange: (variables: Variable[]) => void
}

export default function AITemplateVariables({ variables, onChange }: AITemplateVariablesProps) {
  const [newVariable, setNewVariable] = useState<Variable>({
    name: "",
    description: "",
    defaultValue: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  // Xử lý thêm biến mới
  const handleAddVariable = () => {
    if (editIndex !== null) {
      // Cập nhật biến hiện có
      const updatedVariables = [...variables]
      updatedVariables[editIndex] = newVariable
      onChange(updatedVariables)
    } else {
      // Thêm biến mới
      onChange([...variables, newVariable])
    }

    // Reset form
    setNewVariable({
      name: "",
      description: "",
      defaultValue: "",
    })
    setEditIndex(null)
    setIsDialogOpen(false)
  }

  // Xử lý xóa biến
  const handleDeleteVariable = (index: number) => {
    const updatedVariables = [...variables]
    updatedVariables.splice(index, 1)
    onChange(updatedVariables)
  }

  // Xử lý chỉnh sửa biến
  const handleEditVariable = (index: number) => {
    setNewVariable(variables[index])
    setEditIndex(index)
    setIsDialogOpen(true)
  }

  // Kiểm tra form hợp lệ
  const isFormValid = () => {
    return (
      newVariable.name.trim() !== "" && newVariable.description.trim() !== "" && newVariable.defaultValue.trim() !== ""
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Biến động</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm biến
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editIndex !== null ? "Chỉnh sửa biến" : "Thêm biến mới"}</DialogTitle>
              <DialogDescription>Biến động sẽ được thay thế bằng dữ liệu thực khi gửi tin nhắn</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="var-name">Tên biến</Label>
                <Input
                  id="var-name"
                  placeholder="Ví dụ: customerName"
                  value={newVariable.name}
                  onChange={(e) => setNewVariable({ ...newVariable, name: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Tên biến không nên chứa khoảng trắng hoặc ký tự đặc biệt
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="var-description">Mô tả</Label>
                <Input
                  id="var-description"
                  placeholder="Ví dụ: Tên khách hàng"
                  value={newVariable.description}
                  onChange={(e) => setNewVariable({ ...newVariable, description: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="var-default">Giá trị mặc định</Label>
                <Input
                  id="var-default"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={newVariable.defaultValue}
                  onChange={(e) => setNewVariable({ ...newVariable, defaultValue: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Giá trị mặc định sẽ được sử dụng khi không có dữ liệu thực
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddVariable} disabled={!isFormValid()}>
                {editIndex !== null ? "Cập nhật" : "Thêm biến"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {variables.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên biến</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Giá trị mặc định</TableHead>
                <TableHead className="w-[100px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variables.map((variable, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">
                    {"{{"}
                    {variable.name}
                    {"}}"}
                  </TableCell>
                  <TableCell>{variable.description}</TableCell>
                  <TableCell>{variable.defaultValue}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditVariable(index)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteVariable(index)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border rounded-md p-6 text-center">
          <p className="text-muted-foreground">Chưa có biến nào được thêm vào. Nhấn "Thêm biến" để bắt đầu.</p>
        </div>
      )}
    </div>
  )
}
