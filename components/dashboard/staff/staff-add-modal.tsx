"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Phone, Building, Upload } from "lucide-react"

export default function StaffAddModal({ staff, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "agent",
    department: "",
    status: "active",
    avatar: "",
  })
  const [activeTab, setActiveTab] = useState("info")
  const { toast } = useToast()

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        role: staff.role || "agent",
        department: staff.department || "",
        status: staff.status || "active",
        avatar: staff.avatar || "",
      })
    }
  }, [staff])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked ? "active" : "inactive" }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast({
      title: staff ? "Cập nhật nhân viên" : "Thêm nhân viên",
      description: staff ? "Đã cập nhật thông tin nhân viên thành công" : "Đã thêm nhân viên mới thành công",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{staff ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="permissions">Phân quyền</TabsTrigger>
            <TabsTrigger value="channels">Kênh liên lạc</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={formData.avatar || "/placeholder.svg"} alt={formData.name} />
                  <AvatarFallback>
                    {formData.name
                      ? formData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()
                      : "NV"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" type="button">
                  <Upload className="h-4 w-4 mr-2" />
                  Tải ảnh lên
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Phòng ban</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleSelectChange("department", value)}
                    >
                      <SelectTrigger id="department" className="pl-9">
                        <SelectValue placeholder="Chọn phòng ban" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Quản lý">Quản lý</SelectItem>
                        <SelectItem value="CSKH">CSKH</SelectItem>
                        <SelectItem value="Bán hàng">Bán hàng</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Quản trị viên</SelectItem>
                      <SelectItem value="manager">Quản lý</SelectItem>
                      <SelectItem value="agent">Nhân viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="block mb-2">
                    Trạng thái
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="status"
                      checked={formData.status === "active"}
                      onCheckedChange={(checked) => handleSwitchChange("status", checked)}
                    />
                    <Label htmlFor="status" className="font-normal">
                      {formData.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                    </Label>
                  </div>
                </div>
              </div>

              {!staff && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Input id="password" name="password" type="password" className="pl-3" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" className="pl-3" />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={() => onClose()}>
                  Hủy
                </Button>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("permissions")}>
                    Tiếp theo
                  </Button>
                  <Button type="submit">{staff ? "Cập nhật" : "Thêm nhân viên"}</Button>
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="permissions">
            <StaffPermissions
              onBack={() => setActiveTab("info")}
              onNext={() => setActiveTab("channels")}
              onSave={handleSubmit}
            />
          </TabsContent>

          <TabsContent value="channels">
            <StaffChannels onBack={() => setActiveTab("permissions")} onSave={handleSubmit} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function StaffPermissions({ onBack, onNext, onSave }) {
  const [permissions, setPermissions] = useState({
    dashboard: true,
    conversations: true,
    customers: true,
    reports: false,
    settings: false,
    staff: false,
  })

  const [accessLevels, setAccessLevels] = useState({
    conversations: "read_write",
    customers: "read_write",
    reports: "read",
    settings: "none",
    staff: "none",
  })

  const handlePermissionChange = (permission, checked) => {
    setPermissions((prev) => ({ ...prev, [permission]: checked }))
  }

  const handleAccessLevelChange = (section, value) => {
    setAccessLevels((prev) => ({ ...prev, [section]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Quyền truy cập</h3>
        <div className="space-y-4">
          {Object.entries(permissions).map(([key, value]) => (
            <div key={key} className="flex items-start space-x-3 p-3 rounded-md border">
              <Switch
                id={`permission-${key}`}
                checked={value}
                onCheckedChange={(checked) => handlePermissionChange(key, checked)}
              />
              <div className="space-y-1">
                <Label htmlFor={`permission-${key}`} className="font-medium">
                  {key === "dashboard"
                    ? "Dashboard"
                    : key === "conversations"
                      ? "Hội thoại"
                      : key === "customers"
                        ? "Khách hàng"
                        : key === "reports"
                          ? "Báo cáo"
                          : key === "settings"
                            ? "Cài đặt"
                            : "Nhân viên"}
                </Label>
                <p className="text-sm text-gray-500">
                  {key === "dashboard"
                    ? "Xem tổng quan và thống kê"
                    : key === "conversations"
                      ? "Quản lý và trả lời hội thoại"
                      : key === "customers"
                        ? "Xem và quản lý khách hàng"
                        : key === "reports"
                          ? "Xem báo cáo và phân tích"
                          : key === "settings"
                            ? "Thay đổi cài đặt hệ thống"
                            : "Quản lý nhân viên và phân quyền"}
                </p>
              </div>

              {value && key !== "dashboard" && (
                <div className="ml-auto">
                  <Select value={accessLevels[key]} onValueChange={(value) => handleAccessLevelChange(key, value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Mức độ truy cập" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Chỉ đọc</SelectItem>
                      <SelectItem value="read_write">Đọc & Ghi</SelectItem>
                      <SelectItem value="full">Toàn quyền</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Quay lại
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onNext}>
            Tiếp theo
          </Button>
          <Button type="button" onClick={onSave}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  )
}

function StaffChannels({ onBack, onSave }) {
  const [channels, setChannels] = useState({
    zalo_personal: true,
    zalo_oa: true,
    facebook: false,
    telegram: false,
    viber: false,
  })

  const [timeRestrictions, setTimeRestrictions] = useState({
    restricted: false,
    startTime: "08:00",
    endTime: "17:00",
    workDays: ["1", "2", "3", "4", "5"],
  })

  const handleChannelChange = (channel, checked) => {
    setChannels((prev) => ({ ...prev, [channel]: checked }))
  }

  const handleTimeRestrictionChange = (checked) => {
    setTimeRestrictions((prev) => ({ ...prev, restricted: checked }))
  }

  const handleWorkDayChange = (day, checked) => {
    setTimeRestrictions((prev) => ({
      ...prev,
      workDays: checked ? [...prev.workDays, day] : prev.workDays.filter((d) => d !== day),
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Kênh liên lạc được phép</h3>
        <div className="space-y-4">
          {Object.entries(channels).map(([key, value]) => (
            <div key={key} className="flex items-start space-x-3 p-3 rounded-md border">
              <Switch
                id={`channel-${key}`}
                checked={value}
                onCheckedChange={(checked) => handleChannelChange(key, checked)}
              />
              <div className="space-y-1">
                <Label htmlFor={`channel-${key}`} className="font-medium">
                  {key === "zalo_personal"
                    ? "Zalo Cá nhân"
                    : key === "zalo_oa"
                      ? "Zalo OA"
                      : key === "facebook"
                        ? "Facebook Messenger"
                        : key === "telegram"
                          ? "Telegram"
                          : "Viber"}
                </Label>
                <p className="text-sm text-gray-500">
                  {key === "zalo_personal"
                    ? "Truy cập và quản lý tin nhắn Zalo cá nhân"
                    : key === "zalo_oa"
                      ? "Truy cập và quản lý tin nhắn Zalo OA"
                      : key === "facebook"
                        ? "Truy cập và quản lý tin nhắn Facebook Messenger"
                        : key === "telegram"
                          ? "Truy cập và quản lý tin nhắn Telegram"
                          : "Truy cập và quản lý tin nhắn Viber"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="time-restriction"
            checked={timeRestrictions.restricted}
            onCheckedChange={handleTimeRestrictionChange}
          />
          <Label htmlFor="time-restriction" className="font-medium">
            Giới hạn thời gian truy cập
          </Label>
        </div>

        {timeRestrictions.restricted && (
          <div className="space-y-4 pl-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Thời gian bắt đầu</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={timeRestrictions.startTime}
                  onChange={(e) => setTimeRestrictions((prev) => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">Thời gian kết thúc</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={timeRestrictions.endTime}
                  onChange={(e) => setTimeRestrictions((prev) => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ngày làm việc</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "1", label: "T2" },
                  { value: "2", label: "T3" },
                  { value: "3", label: "T4" },
                  { value: "4", label: "T5" },
                  { value: "5", label: "T6" },
                  { value: "6", label: "T7" },
                  { value: "0", label: "CN" },
                ].map((day) => (
                  <div key={day.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${day.value}`}
                      checked={timeRestrictions.workDays.includes(day.value)}
                      onCheckedChange={(checked) => handleWorkDayChange(day.value, checked)}
                    />
                    <Label htmlFor={`day-${day.value}`} className="font-normal">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Quay lại
        </Button>
        <Button type="button" onClick={onSave}>
          Lưu
        </Button>
      </div>
    </div>
  )
}
