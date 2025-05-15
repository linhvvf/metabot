"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ReportType, ReportSchedule, ReportCustomization } from "@/lib/pdf-export/types"
import { Loader2, Plus, X } from "lucide-react"

interface ScheduleReportDialogProps {
  isOpen: boolean
  onClose: () => void
  reportType: ReportType
  reportTitle: string
}

export default function ScheduleReportDialog({ isOpen, onClose, reportType, reportTitle }: ScheduleReportDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [schedule, setSchedule] = useState<Partial<ReportSchedule>>({
    name: `${reportTitle} - Báo cáo định kỳ`,
    frequency: "weekly",
    dayOfWeek: 1, // Monday
    dayOfMonth: 1,
    time: "08:00",
    recipients: [""],
    reportType,
    active: true,
    customization: {
      showLogo: true,
      orientation: "portrait",
      includeNotes: true,
      includeStatistics: true,
      includeCharts: true,
      includeTables: true,
      showHeaderOnNewPage: true,
    },
  })

  const handleAddRecipient = () => {
    setSchedule((prev) => ({
      ...prev,
      recipients: [...(prev.recipients || []), ""],
    }))
  }

  const handleRemoveRecipient = (index: number) => {
    setSchedule((prev) => ({
      ...prev,
      recipients: (prev.recipients || []).filter((_, i) => i !== index),
    }))
  }

  const handleRecipientChange = (index: number, value: string) => {
    setSchedule((prev) => ({
      ...prev,
      recipients: (prev.recipients || []).map((email, i) => (i === index ? value : email)),
    }))
  }

  const updateCustomization = (key: keyof ReportCustomization, value: any) => {
    setSchedule((prev) => ({
      ...prev,
      customization: {
        ...(prev.customization || {}),
        [key]: value,
      },
    }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Validate
      if (!schedule.name || !schedule.frequency || !schedule.time) {
        setError("Vui lòng điền đầy đủ thông tin bắt buộc")
        return
      }

      if (!schedule.recipients || schedule.recipients.length === 0 || schedule.recipients.some((email) => !email)) {
        setError("Vui lòng thêm ít nhất một địa chỉ email hợp lệ")
        return
      }

      // API call
      const response = await fetch("/api/reports/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schedule),
      })

      if (!response.ok) {
        throw new Error("Không thể lập lịch báo cáo")
      }

      const result = await response.json()

      if (result.success) {
        onClose()
      } else {
        throw new Error(result.error || "Không thể lập lịch báo cáo")
      }
    } catch (err) {
      console.error("Lỗi khi lập lịch báo cáo:", err)
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi lập lịch báo cáo")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Lập lịch báo cáo - {reportTitle}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="schedule-name">Tên lịch báo cáo</Label>
            <Input
              id="schedule-name"
              value={schedule.name || ""}
              onChange={(e) => setSchedule((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nhập tên cho lịch báo cáo"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Tần suất</Label>
              <Select
                value={schedule.frequency}
                onValueChange={(value: any) => setSchedule((prev) => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tần suất" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Hàng ngày</SelectItem>
                  <SelectItem value="weekly">Hàng tuần</SelectItem>
                  <SelectItem value="monthly">Hàng tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {schedule.frequency === "weekly" && (
              <div className="space-y-2">
                <Label htmlFor="day-of-week">Ngày trong tuần</Label>
                <Select
                  value={schedule.dayOfWeek?.toString()}
                  onValueChange={(value) => setSchedule((prev) => ({ ...prev, dayOfWeek: Number.parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngày" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Chủ nhật</SelectItem>
                    <SelectItem value="1">Thứ hai</SelectItem>
                    <SelectItem value="2">Thứ ba</SelectItem>
                    <SelectItem value="3">Thứ tư</SelectItem>
                    <SelectItem value="4">Thứ năm</SelectItem>
                    <SelectItem value="5">Thứ sáu</SelectItem>
                    <SelectItem value="6">Thứ bảy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {schedule.frequency === "monthly" && (
              <div className="space-y-2">
                <Label htmlFor="day-of-month">Ngày trong tháng</Label>
                <Select
                  value={schedule.dayOfMonth?.toString()}
                  onValueChange={(value) => setSchedule((prev) => ({ ...prev, dayOfMonth: Number.parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngày" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="time">Thời gian</Label>
              <Input
                id="time"
                type="time"
                value={schedule.time || ""}
                onChange={(e) => setSchedule((prev) => ({ ...prev, time: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Người nhận</Label>
            <div className="space-y-2">
              {(schedule.recipients || []).map((email, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => handleRecipientChange(index, e.target.value)}
                    placeholder="email@example.com"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveRecipient(index)}
                    disabled={(schedule.recipients || []).length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" className="mt-2" onClick={handleAddRecipient} size="sm">
                <Plus className="h-4 w-4 mr-2" /> Thêm người nhận
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Định dạng báo cáo</h3>

            <div className="space-y-2">
              <Label htmlFor="orientation">Hướng trang</Label>
              <RadioGroup
                value={schedule.customization?.orientation || "portrait"}
                onValueChange={(value: any) => updateCustomization("orientation", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="portrait" id="portrait-scheduled" />
                  <Label htmlFor="portrait-scheduled">Dọc</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="landscape" id="landscape-scheduled" />
                  <Label htmlFor="landscape-scheduled">Ngang</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="include-charts-scheduled"
                  checked={schedule.customization?.includeCharts !== false}
                  onCheckedChange={(checked) => updateCustomization("includeCharts", checked)}
                />
                <Label htmlFor="include-charts-scheduled">Bao gồm biểu đồ</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="include-tables-scheduled"
                  checked={schedule.customization?.includeTables !== false}
                  onCheckedChange={(checked) => updateCustomization("includeTables", checked)}
                />
                <Label htmlFor="include-tables-scheduled">Bao gồm bảng dữ liệu</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="include-statistics-scheduled"
                  checked={schedule.customization?.includeStatistics !== false}
                  onCheckedChange={(checked) => updateCustomization("includeStatistics", checked)}
                />
                <Label htmlFor="include-statistics-scheduled">Bao gồm thống kê</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-logo-scheduled"
                  checked={schedule.customization?.showLogo !== false}
                  onCheckedChange={(checked) => updateCustomization("showLogo", checked)}
                />
                <Label htmlFor="show-logo-scheduled">Hiển thị logo</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active-scheduled"
              checked={schedule.active !== false}
              onCheckedChange={(checked) => setSchedule((prev) => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active-scheduled">Kích hoạt lịch báo cáo</Label>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Đang xử lý..." : "Lập lịch báo cáo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
