"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AudienceSelectorProps {
  type: string
  selected: string[]
  onSelect: (selected: string[]) => void
}

// Dữ liệu mẫu cho phân khúc khách hàng
const segments = [
  { id: "segment-1", name: "Khách hàng mới", count: 1250, description: "Khách hàng đăng ký trong 30 ngày qua" },
  { id: "segment-2", name: "Khách hàng thân thiết", count: 3450, description: "Khách hàng có trên 10 lần tương tác" },
  {
    id: "segment-3",
    name: "Khách hàng không hoạt động",
    count: 2800,
    description: "Không hoạt động trong 60 ngày qua",
  },
  { id: "segment-4", name: "Khách hàng tiềm năng", count: 1800, description: "Đã tương tác nhưng chưa chuyển đổi" },
]

// Dữ liệu mẫu cho thẻ khách hàng
const tags = [
  { id: "tag-1", name: "VIP", count: 450, color: "bg-yellow-100 text-yellow-800" },
  { id: "tag-2", name: "Quan tâm sản phẩm A", count: 1250, color: "bg-blue-100 text-blue-800" },
  { id: "tag-3", name: "Đã mua hàng", count: 3200, color: "bg-green-100 text-green-800" },
  { id: "tag-4", name: "Cần chăm sóc", count: 850, color: "bg-red-100 text-red-800" },
  { id: "tag-5", name: "Tiềm năng cao", count: 1100, color: "bg-purple-100 text-purple-800" },
]

// Dữ liệu mẫu cho khách hàng
const customers = [
  {
    id: "cust-1",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@example.com",
    tags: ["VIP", "Đã mua hàng"],
  },
  { id: "cust-2", name: "Trần Thị B", phone: "0912345678", email: "tranthib@example.com", tags: ["Cần chăm sóc"] },
  { id: "cust-3", name: "Lê Văn C", phone: "0923456789", email: "levanc@example.com", tags: ["Quan tâm sản phẩm A"] },
  { id: "cust-4", name: "Phạm Thị D", phone: "0934567890", email: "phamthid@example.com", tags: ["Tiềm năng cao"] },
  { id: "cust-5", name: "Hoàng Văn E", phone: "0945678901", email: "hoangvane@example.com", tags: ["Đã mua hàng"] },
]

export default function AudienceSelector({ type, selected, onSelect }: AudienceSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Xử lý khi chọn/bỏ chọn tất cả
  const handleSelectAll = (items: any[]) => {
    if (selected.length === items.length) {
      onSelect([])
    } else {
      onSelect(items.map((item) => item.id))
    }
  }

  // Xử lý khi chọn/bỏ chọn một mục
  const handleSelectItem = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter((item) => item !== id))
    } else {
      onSelect([...selected, id])
    }
  }

  // Hiển thị bộ chọn dựa trên loại đối tượng
  const renderSelector = () => {
    switch (type) {
      case "all":
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">Tất cả khách hàng</h3>
            <p className="text-muted-foreground mt-2">
              Chiến dịch này sẽ được gửi đến tất cả khách hàng trong hệ thống
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Tổng số khách hàng: <span className="font-medium">12,458</span>
            </p>
          </div>
        )

      case "segment":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm phân khúc..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Lọc</span>
              </Button>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={segments.length > 0 && selected.length === segments.length}
                        onCheckedChange={() => handleSelectAll(segments)}
                      />
                    </TableHead>
                    <TableHead>Tên phân khúc</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead className="text-right">Số lượng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {segments.map((segment) => (
                    <TableRow key={segment.id}>
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(segment.id)}
                          onCheckedChange={() => handleSelectItem(segment.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{segment.name}</TableCell>
                      <TableCell>{segment.description}</TableCell>
                      <TableCell className="text-right">{segment.count.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )

      case "tag":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm thẻ..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Lọc</span>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {tags.map((tag) => (
                <Card key={tag.id} className={`border-l-4 ${selected.includes(tag.id) ? "border-l-blue-500" : ""}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={selected.includes(tag.id)} onCheckedChange={() => handleSelectItem(tag.id)} />
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {tag.name}
                          <Badge className={tag.color}>{tag.count.toLocaleString()}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "custom":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm khách hàng..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
              </Button>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Thêm
              </Button>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={customers.length > 0 && selected.length === customers.length}
                        onCheckedChange={() => handleSelectAll(customers)}
                      />
                    </TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Thẻ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(customer.id)}
                          onCheckedChange={() => handleSelectItem(customer.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return renderSelector()
}
