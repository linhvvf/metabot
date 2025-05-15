"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    newMessage: true,
    newCustomer: true,
    systemUpdates: true,
    marketing: false,
    reportSummary: true,
  })

  const [appNotifications, setAppNotifications] = useState({
    newMessage: true,
    newCustomer: true,
    systemUpdates: true,
    taskAssigned: true,
    mentionedInComment: true,
  })

  const { toast } = useToast()

  const handleEmailToggle = (key, checked) => {
    setEmailNotifications((prev) => ({ ...prev, [key]: checked }))
  }

  const handleAppToggle = (key, checked) => {
    setAppNotifications((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSave = () => {
    toast({
      title: "Thành công",
      description: "Đã cập nhật cài đặt thông báo",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông báo</h3>
        <p className="text-sm text-muted-foreground">Quản lý cài đặt thông báo email và ứng dụng</p>
      </div>
      <Separator />

      <div>
        <h4 className="text-base font-medium mb-4">Thông báo email</h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="email-new-message"
              checked={emailNotifications.newMessage}
              onCheckedChange={(checked) => handleEmailToggle("newMessage", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="email-new-message" className="font-medium">
                Tin nhắn mới
              </Label>
              <p className="text-sm text-muted-foreground">Nhận email khi có tin nhắn mới từ khách hàng</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="email-new-customer"
              checked={emailNotifications.newCustomer}
              onCheckedChange={(checked) => handleEmailToggle("newCustomer", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="email-new-customer" className="font-medium">
                Khách hàng mới
              </Label>
              <p className="text-sm text-muted-foreground">Nhận email khi có khách hàng mới đăng ký</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="email-system-updates"
              checked={emailNotifications.systemUpdates}
              onCheckedChange={(checked) => handleEmailToggle("systemUpdates", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="email-system-updates" className="font-medium">
                Cập nhật hệ thống
              </Label>
              <p className="text-sm text-muted-foreground">Nhận email về các cập nhật và bảo trì hệ thống</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="email-report-summary"
              checked={emailNotifications.reportSummary}
              onCheckedChange={(checked) => handleEmailToggle("reportSummary", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="email-report-summary" className="font-medium">
                Báo cáo tổng hợp
              </Label>
              <p className="text-sm text-muted-foreground">Nhận báo cáo tổng hợp hàng tuần qua email</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="email-marketing"
              checked={emailNotifications.marketing}
              onCheckedChange={(checked) => handleEmailToggle("marketing", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="email-marketing" className="font-medium">
                Thông tin marketing
              </Label>
              <p className="text-sm text-muted-foreground">Nhận email về các tính năng mới, khuyến mãi và sự kiện</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Thông báo ứng dụng</h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="app-new-message"
              checked={appNotifications.newMessage}
              onCheckedChange={(checked) => handleAppToggle("newMessage", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="app-new-message" className="font-medium">
                Tin nhắn mới
              </Label>
              <p className="text-sm text-muted-foreground">Hiển thị thông báo khi có tin nhắn mới từ khách hàng</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="app-new-customer"
              checked={appNotifications.newCustomer}
              onCheckedChange={(checked) => handleAppToggle("newCustomer", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="app-new-customer" className="font-medium">
                Khách hàng mới
              </Label>
              <p className="text-sm text-muted-foreground">Hiển thị thông báo khi có khách hàng mới đăng ký</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="app-system-updates"
              checked={appNotifications.systemUpdates}
              onCheckedChange={(checked) => handleAppToggle("systemUpdates", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="app-system-updates" className="font-medium">
                Cập nhật hệ thống
              </Label>
              <p className="text-sm text-muted-foreground">Hiển thị thông báo về các cập nhật và bảo trì hệ thống</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="app-task-assigned"
              checked={appNotifications.taskAssigned}
              onCheckedChange={(checked) => handleAppToggle("taskAssigned", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="app-task-assigned" className="font-medium">
                Công việc được giao
              </Label>
              <p className="text-sm text-muted-foreground">Hiển thị thông báo khi bạn được giao một công việc mới</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch
              id="app-mentioned"
              checked={appNotifications.mentionedInComment}
              onCheckedChange={(checked) => handleAppToggle("mentionedInComment", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="app-mentioned" className="font-medium">
                Được nhắc đến
              </Label>
              <p className="text-sm text-muted-foreground">Hiển thị thông báo khi bạn được nhắc đến trong bình luận</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Tùy chọn gửi</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div>
              <h5 className="font-medium">Tần suất email</h5>
              <p className="text-sm text-muted-foreground">Chọn tần suất nhận email tổng hợp</p>
            </div>
            <select className="border rounded-md p-2">
              <option value="daily">Hàng ngày</option>
              <option value="weekly" selected>
                Hàng tuần
              </option>
              <option value="monthly">Hàng tháng</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-md border">
            <div>
              <h5 className="font-medium">Định dạng email</h5>
              <p className="text-sm text-muted-foreground">Chọn định dạng email bạn muốn nhận</p>
            </div>
            <select className="border rounded-md p-2">
              <option value="html" selected>
                HTML
              </option>
              <option value="text">Văn bản thuần</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>
    </div>
  )
}
