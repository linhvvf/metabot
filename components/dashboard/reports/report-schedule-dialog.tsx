"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"
import { vi } from "date-fns/locale"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { ExportFormat } from "@/lib/report-export/export-utils"

interface ReportScheduleDialogProps {
  title: string
  source: string
}

export function ReportScheduleDialog({ title, source }: ReportScheduleDialogProps) {
  const [open, setOpen] = useState(false)
  const [scheduleName, setScheduleName] = useState("")
  const [frequency, setFrequency] = useState("weekly")
  const [format, setFormat] = useState<ExportFormat>("pdf")
  const [recipients, setRecipients] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [includeAttachment, setIncludeAttachment] = useState(true)
  const [includeSummary, setIncludeSummary] = useState(true)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Kiểm tra dữ liệu đầu vào
      if (!scheduleName || !frequency || !format || !recipients || !startDate) {
        toast({
          title: "Thiếu thông tin",
          description: "Vui lòng điền đầy đủ thông tin bắt buộc",
          variant: "destructive",
        })
        return
      }

      // Chuẩn bị dữ liệu để gửi
      const scheduleData = {
        name: scheduleName,
        source,
        frequency,
        format,
        recipients: recipients.split(",").map((email) => email.trim()),
        startDate: startDate.toISOString(),
        includeAttachment,
        includeSummary,
      }

      // Trong thực tế, bạn sẽ gửi dữ liệu này đến API
      console.log("Lên lịch xuất báo cáo:", scheduleData)

      // Giả lập API call thành công
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Lên lịch xuất báo cáo thành công",
        description: `Báo cáo ${scheduleName} sẽ được gửi ${frequency === "daily" ? "hàng ngày" : frequency === "weekly" ? "hàng tuần" : "hàng tháng"}`,
      })

      setOpen(false)
    } catch (error) {
      console.error("Lỗi khi lên lịch xuất báo cáo:", error)
      toast({
        title: "Lên lịch xuất báo cáo thất bại",
        description: "Đã xảy ra lỗi khi lên lịch xuất báo cáo. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Clock className="mr-2 h-4 w-4" />
          Lên lịch báo cáo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Lên lịch xuất báo cáo tự động</DialogTitle>
          <DialogDescription>Thiết lập lịch gửi báo cáo tự động qua email</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="scheduleName">Tên lịch trình</Label>
            <Input
              id="scheduleName"
              placeholder="Báo cáo hàng tuần"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Tần suất</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Chọn tần suất" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Hàng ngày</SelectItem>
                <SelectItem value="weekly">Hàng tuần</SelectItem>
                <SelectItem value="monthly">Hàng tháng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Định dạng</Label>
            <Select value={format} onValueChange={(value) => setFormat(value as ExportFormat)}>
              <SelectTrigger id="format">
                <SelectValue placeholder="Chọn định dạng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipients">Người nhận (email, phân cách bằng dấu phẩy)</Label>
            <Input
              id="recipients"
              placeholder="email1@example.com, email2@example.com"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Ngày bắt đầu</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="startDate"
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: vi }) : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Tùy chọn</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeAttachment"
                  checked={includeAttachment}
                  onCheckedChange={(checked) => setIncludeAttachment(!!checked)}
                />
                <Label htmlFor="includeAttachment">Đính kèm file báo cáo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeSummary"
                  checked={includeSummary}
                  onCheckedChange={(checked) => setIncludeSummary(!!checked)}
                />
                <Label htmlFor="includeSummary">Bao gồm tóm tắt trong nội dung email</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Lên lịch báo cáo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
