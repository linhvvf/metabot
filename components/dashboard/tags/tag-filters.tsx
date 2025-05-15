"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function TagFilters() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="tag-group">Nhóm thẻ</Label>
            <Select defaultValue="all">
              <SelectTrigger id="tag-group">
                <SelectValue placeholder="Chọn nhóm thẻ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nhóm</SelectItem>
                <SelectItem value="customer">Khách hàng</SelectItem>
                <SelectItem value="conversation">Hội thoại</SelectItem>
                <SelectItem value="campaign">Chiến dịch</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-status">Trạng thái</Label>
            <Select defaultValue="all">
              <SelectTrigger id="tag-status">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-sort">Sắp xếp theo</Label>
            <Select defaultValue="usage">
              <SelectTrigger id="tag-sort">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usage">Mức độ sử dụng</SelectItem>
                <SelectItem value="name">Tên thẻ</SelectItem>
                <SelectItem value="created">Ngày tạo</SelectItem>
                <SelectItem value="updated">Ngày cập nhật</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-search">Tìm kiếm</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input id="tag-search" placeholder="Tìm kiếm thẻ..." className="pl-8" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" className="mr-2">
            Đặt lại
          </Button>
          <Button>Áp dụng bộ lọc</Button>
        </div>
      </CardContent>
    </Card>
  )
}
