"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Edit, Loader2, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { ExportFormat } from "@/lib/report-export/export-utils"

interface ScheduledReport {
  id: string
  name: string
  source: string
  frequency: string
  format: ExportFormat
  recipients: string[]
  startDate: string
  lastRun?: string
  nextRun: string
  status: "active" | "paused"
  includeAttachment: boolean
  includeSummary: boolean
}

export function ScheduledReportsTable() {
  // Giả lập dữ liệu báo cáo đã lên lịch
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([
    {
      id: "report1",
      name: "Báo cáo hội thoại hàng tuần",
      source: "conversations",
      frequency: "weekly",
      format: "pdf",
      recipients: ["manager@example.com", "team@example.com"],
      startDate: new Date(2023, 0, 15).toISOString(),
      lastRun: new Date(2023, 4, 1).toISOString(),
      nextRun: new Date(2023, 4, 8).toISOString(),
      status: "active",
      includeAttachment: true,
      includeSummary: true,
    },
    {
      id: "report2",
      name: "Báo cáo khách hàng hàng tháng",
      source: "customers",
      frequency: "monthly",
      format: "excel",
      recipients: ["director@example.com"],
      startDate: new Date(2023, 1, 1).toISOString(),
      lastRun: new Date(2023, 4, 1).toISOString(),
      nextRun: new Date(2023, 5, 1).toISOString(),
      status: "active",
      includeAttachment: true,
      includeSummary: false,
    },
    {
      id: "report3",
      name: "Báo cáo chiến dịch hàng ngày",
      source: "campaigns",
      frequency: "daily",
      format: "pdf",
      recipients: ["marketing@example.com"],
      startDate: new Date(2023, 3, 10).toISOString(),
      lastRun: new Date(2023, 4, 1).toISOString(),
      nextRun: new Date(2023, 4, 2).toISOString(),
      status: "paused",
      includeAttachment: true,
      includeSummary: true,
    },
  ])

  const [editingReport, setEditingReport] = useState<ScheduledReport | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Các state cho form chỉnh sửa
  const [editName, setEditName] = useState("")
  const [editFrequency, setEditFrequency] = useState("")
  const [editFormat, setEditFormat] = useState<ExportFormat>("pdf")
  const [editRecipients, setEditRecipients] = useState("")
  const [editStartDate, setEditStartDate] = useState<Date | undefined>(undefined)
  const [editIncludeAttachment, setEditIncludeAttachment] = useState(true)
  const [editIncludeSummary, setEditIncludeSummary] = useState(true)

  const handleEdit = (report: ScheduledReport) => {
    setEditingReport(report)
    setEditName(report.name)
    setEditFrequency(report.frequency)
    setEditFormat(report.format)
    setEditRecipients(report.recipients.join(", "))
    setEditStartDate(new Date(report.startDate))
    setEditIncludeAttachment(report.includeAttachment)
    setEditIncludeSummary(report.includeSummary)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (report: ScheduledReport) => {
    setEditingReport(report)
    setIsDeleteDialogOpen(true)
  }

  const handleToggleStatus = (id: string) => {
    setScheduledReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status: report.status === "active" ? "paused" : "active" } : report,
      ),
    )

    const report = scheduledReports.find((r) => r.id === id)
    if (report) {
      toast({
        title: `Báo cáo ${report.status === "active" ? "tạm dừng" : "kích hoạt"}`,
        description: `Báo cáo "${report.name}" đã được ${report.status === "active" ? "tạm dừng" : "kích hoạt"}.`,
      })
    }
  }

  const handleSaveEdit = async () => {
    if (!editingReport) return

    try {
      setIsSubmitting(true)

      // Kiểm tra dữ liệu đầu vào
      if (!editName || !editFrequency || !editFormat || !editRecipients || !editStartDate) {
        toast({
          title: "Thiếu thông tin",
          description: "Vui lòng điền đầy đủ thông tin bắt buộc",
          variant: "destructive",
        })
        return
      }

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Cập nhật state
      setScheduledReports((prev) =>
        prev.map((report) =>
          report.id === editingReport.id
            ? {
                ...report,
                name: editName,
                frequency: editFrequency,
                format: editFormat,
                recipients: editRecipients.split(",").map((email) => email.trim()),
                startDate: editStartDate.toISOString(),
                includeAttachment: editIncludeAttachment,
                includeSummary: editIncludeSummary,
              }
            : report,
        ),
      )

      toast({
        title: "Cập nhật thành công",
        description: `Báo cáo "${editName}" đã được cập nhật.`,
      })

      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Lỗi khi cập nhật báo cáo:", error)
      toast({
        title: "Cập nhật thất bại",
        description: "Đã xảy ra lỗi khi cập nhật báo cáo. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!editingReport) return

    try {
      setIsSubmitting(true)

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Cập nhật state
      setScheduledReports((prev) => prev.filter((report) => report.id !== editingReport.id))

      toast({
        title: "Xóa thành công",
        description: `Báo cáo "${editingReport.name}" đã được xóa.`,
      })

      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error("Lỗi khi xóa báo cáo:", error)
      toast({
        title: "Xóa thất bại",
        description: "Đã xảy ra lỗi khi xóa báo cáo. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSourceName = (source: string) => {
    switch (source) {
      case "conversations":
        return "Hội thoại"
      case "customers":
        return "Khách hàng"
      case "campaigns":
        return "Chiến dịch"
      case "staff":
        return "Nhân viên"
      default:
        return source
    }
  }

  const getFrequencyName = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "Hàng ngày"
      case "weekly":
        return "Hàng tuần"
      case "monthly":
        return "Hàng tháng"
      default:
        return frequency
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên báo cáo</TableHead>
            <TableHead>Nguồn dữ liệu</TableHead>
            <TableHead>Tần suất</TableHead>
            <TableHead>Định dạng</TableHead>
            <TableHead>Người nhận</TableHead>
            <TableHead>Lần chạy cuối</TableHead>
            <TableHead>Lần chạy tiếp theo</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduledReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.name}</TableCell>
              <TableCell>{getSourceName(report.source)}</TableCell>
              <TableCell>{getFrequencyName(report.frequency)}</TableCell>
              <TableCell className="uppercase">{report.format}</TableCell>
              <TableCell>
                {report.recipients.length > 1
                  ? `${report.recipients[0]} +${report.recipients.length - 1}`
                  : report.recipients[0]}
              </TableCell>
              <TableCell>
                {report.lastRun ? format(new Date(report.lastRun), "dd/MM/yyyy HH:mm", { locale: vi }) : "Chưa chạy"}
              </TableCell>
              <TableCell>{format(new Date(report.nextRun), "dd/MM/yyyy HH:mm", { locale: vi })}</TableCell>
              <TableCell>
                <Badge variant={report.status === "active" ? "default" : "secondary"}>
                  {report.status === "active" ? "Đang hoạt động" : "Tạm dừng"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Mở menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(report)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(report.id)}>
                      {report.status === "active" ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Tạm dừng
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Kích hoạt
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(report)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {scheduledReports.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                Chưa có báo cáo nào được lên lịch
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog chỉnh sửa báo cáo */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa báo cáo</DialogTitle>
            <DialogDescription>Cập nhật thông tin cho báo cáo tự động</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Tên báo cáo</Label>
              <Input id="editName" value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editFrequency">Tần suất</Label>
              <Select value={editFrequency} onValueChange={setEditFrequency}>
                <SelectTrigger id="editFrequency">
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
              <Label htmlFor="editFormat">Định dạng</Label>
              <Select value={editFormat} onValueChange={(value) => setEditFormat(value as ExportFormat)}>
                <SelectTrigger id="editFormat">
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
              <Label htmlFor="editRecipients">Người nhận (email, phân cách bằng dấu phẩy)</Label>
              <Input id="editRecipients" value={editRecipients} onChange={(e) => setEditRecipients(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editStartDate">Ngày bắt đầu</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="editStartDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editStartDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editStartDate ? format(editStartDate, "PPP", { locale: vi }) : "Chọn ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={editStartDate} onSelect={setEditStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Tùy chọn</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="editIncludeAttachment"
                    checked={editIncludeAttachment}
                    onCheckedChange={(checked) => setEditIncludeAttachment(!!checked)}
                  />
                  <Label htmlFor="editIncludeAttachment">Đính kèm file báo cáo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="editIncludeSummary"
                    checked={editIncludeSummary}
                    onCheckedChange={(checked) => setEditIncludeSummary(!!checked)}
                  />
                  <Label htmlFor="editIncludeSummary">Bao gồm tóm tắt trong nội dung email</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveEdit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa báo cáo này không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">{editingReport && <p className="font-medium">{editingReport.name}</p>}</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Xóa báo cáo"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
