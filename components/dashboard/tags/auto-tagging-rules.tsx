"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash, AlertCircle } from "lucide-react"

export default function AutoTaggingRules() {
  const [open, setOpen] = useState(false)

  // Mock data for auto-tagging rules
  const rules = [
    {
      id: 1,
      name: "Khách hàng VIP",
      condition: "Tổng chi tiêu > 10,000,000 VND",
      tags: ["VIP", "Khách hàng thân thiết"],
      target: "Khách hàng",
      status: "active",
    },
    {
      id: 2,
      name: "Khiếu nại",
      condition: "Tin nhắn chứa từ khóa: khiếu nại, không hài lòng, thất vọng",
      tags: ["Khiếu nại", "Cần xử lý"],
      target: "Hội thoại",
      status: "active",
    },
    {
      id: 3,
      name: "Quan tâm sản phẩm mới",
      condition: "Tin nhắn chứa từ khóa: sản phẩm mới, ra mắt, khi nào có",
      tags: ["Quan tâm sản phẩm mới", "Tiềm năng"],
      target: "Hội thoại",
      status: "inactive",
    },
    {
      id: 4,
      name: "Khách hàng mới",
      condition: "Thời gian đăng ký < 30 ngày",
      tags: ["Khách hàng mới", "Cần chăm sóc"],
      target: "Khách hàng",
      status: "active",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Quy tắc gắn thẻ tự động</CardTitle>
          <CardDescription>Thiết lập các quy tắc để tự động gắn thẻ cho khách hàng và hội thoại</CardDescription>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm quy tắc mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Thêm quy tắc gắn thẻ tự động</DialogTitle>
              <DialogDescription>Tạo quy tắc để tự động gắn thẻ dựa trên các điều kiện</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rule-name" className="text-right">
                  Tên quy tắc
                </Label>
                <Input id="rule-name" placeholder="Nhập tên quy tắc" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rule-target" className="text-right">
                  Áp dụng cho
                </Label>
                <Select>
                  <SelectTrigger id="rule-target" className="col-span-3">
                    <SelectValue placeholder="Chọn đối tượng áp dụng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Khách hàng</SelectItem>
                    <SelectItem value="conversation">Hội thoại</SelectItem>
                    <SelectItem value="message">Tin nhắn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="rule-condition" className="text-right pt-2">
                  Điều kiện
                </Label>
                <Textarea
                  id="rule-condition"
                  placeholder="Nhập điều kiện cho quy tắc"
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rule-tags" className="text-right">
                  Thẻ áp dụng
                </Label>
                <Input id="rule-tags" placeholder="Nhập thẻ (phân cách bằng dấu phẩy)" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rule-status" className="text-right">
                  Trạng thái
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="rule-status" defaultChecked />
                  <Label htmlFor="rule-status">Kích hoạt</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setOpen(false)}>Lưu quy tắc</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên quy tắc</TableHead>
                <TableHead>Điều kiện</TableHead>
                <TableHead>Thẻ áp dụng</TableHead>
                <TableHead>Áp dụng cho</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.condition}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rule.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{rule.target}</TableCell>
                  <TableCell>
                    <Badge
                      variant={rule.status === "active" ? "default" : "secondary"}
                      className={
                        rule.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {rule.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>Quy tắc được áp dụng theo thứ tự ưu tiên từ trên xuống dưới</span>
          </div>
          <div>Hiển thị 4 / 4 quy tắc</div>
        </div>
      </CardContent>
    </Card>
  )
}
