"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function ReportFilters() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="channels">Kênh liên lạc</Label>
            <Select defaultValue="all">
              <SelectTrigger id="channels">
                <SelectValue placeholder="Chọn kênh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả kênh</SelectItem>
                <SelectItem value="zalo">Zalo</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="staff">Nhân viên</Label>
            <Select defaultValue="all">
              <SelectTrigger id="staff">
                <SelectValue placeholder="Chọn nhân viên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nhân viên</SelectItem>
                <SelectItem value="staff1">Nguyễn Văn A</SelectItem>
                <SelectItem value="staff2">Trần Thị B</SelectItem>
                <SelectItem value="staff3">Lê Văn C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Thẻ khách hàng</Label>
            <Select defaultValue="all">
              <SelectTrigger id="tags">
                <SelectValue placeholder="Chọn thẻ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả thẻ</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="new">Khách hàng mới</SelectItem>
                <SelectItem value="returning">Khách hàng quay lại</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái hội thoại</Label>
            <Select defaultValue="all">
              <SelectTrigger id="status">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="open">Đang mở</SelectItem>
                <SelectItem value="closed">Đã đóng</SelectItem>
                <SelectItem value="pending">Đang chờ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <Label>Hiển thị dữ liệu</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="messages" defaultChecked />
                <label
                  htmlFor="messages"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tin nhắn
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="conversations" defaultChecked />
                <label
                  htmlFor="conversations"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hội thoại
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="customers" defaultChecked />
                <label
                  htmlFor="customers"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Khách hàng
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Nhóm theo</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="day" defaultChecked />
                <label
                  htmlFor="day"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ngày
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="channel" />
                <label
                  htmlFor="channel"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Kênh
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="staff-group" />
                <label
                  htmlFor="staff-group"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Nhân viên
                </label>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex items-end">
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1">
                Đặt lại
              </Button>
              <Button className="flex-1">Áp dụng bộ lọc</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
