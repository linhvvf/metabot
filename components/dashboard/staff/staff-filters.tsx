"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function StaffFilters() {
  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="role" className="mb-2 block">
            Vai trò
          </Label>
          <Select>
            <SelectTrigger id="role">
              <SelectValue placeholder="Tất cả vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              <SelectItem value="admin">Quản trị viên</SelectItem>
              <SelectItem value="manager">Quản lý</SelectItem>
              <SelectItem value="agent">Nhân viên</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="department" className="mb-2 block">
            Phòng ban
          </Label>
          <Select>
            <SelectTrigger id="department">
              <SelectValue placeholder="Tất cả phòng ban" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả phòng ban</SelectItem>
              <SelectItem value="management">Quản lý</SelectItem>
              <SelectItem value="customer-service">CSKH</SelectItem>
              <SelectItem value="sales">Bán hàng</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="technical">Kỹ thuật</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status" className="mb-2 block">
            Trạng thái
          </Label>
          <Select>
            <SelectTrigger id="status">
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4">
        <Label className="mb-2 block">Quyền truy cập</Label>
        <RadioGroup defaultValue="all" className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="font-normal">
              Tất cả
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="conversations" id="conversations" />
            <Label htmlFor="conversations" className="font-normal">
              Hội thoại
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="customers" id="customers" />
            <Label htmlFor="customers" className="font-normal">
              Khách hàng
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reports" id="reports" />
            <Label htmlFor="reports" className="font-normal">
              Báo cáo
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="settings" id="settings" />
            <Label htmlFor="settings" className="font-normal">
              Cài đặt
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm">
          Xóa bộ lọc
        </Button>
        <Button size="sm">Áp dụng</Button>
      </div>
    </div>
  )
}
