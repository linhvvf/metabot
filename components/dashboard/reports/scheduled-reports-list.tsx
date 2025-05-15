"use client"

import { useState, useEffect } from "react"
import type { ReportSchedule, ReportType } from "@/lib/pdf-export/types"

export default function ScheduledReportsList() {
  const [schedules, setSchedules] = useState<ReportSchedule[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteScheduleId, setDeleteScheduleId] = useState<string | null>(null)

  useEffect(() => {
    fetchSchedules()
  }, [])

  const fetchSchedules = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/reports/schedule")
      
      if (!response.ok) {
        throw new Error("Không thể lấy danh sách lịch báo cáo")
      }
      
      const result = await response.json()
      
      if (result.success) {
        setSchedules(result.schedules)
      } else {
        throw new Error(result.error || "Không thể lấy danh sách lịch báo cáo")
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lịch báo cáo:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleScheduleStatus = async (id: string, active: boolean) => {
    try {
      // Trong môi trường thực tế, đây là nơi gọi API để cập nhật trạng thái
      // Cập nhật tạm thời ở client-side
      setSchedules(prev => 
        prev.map(schedule => 
          schedule.id === id ? { ...schedule, active } : schedule
        )
      )
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái lịch báo cáo:", error)
    }
  }

  const deleteSchedule = async () => {
    if (!deleteScheduleId) return
    
    try {
      // Trong môi trường thực tế, đây là nơi gọi API để xóa lịch báo cáo
      // Cập nhật tạm thời ở client-side
      setSchedules(prev => prev.filter(schedule => schedule.id !== deleteScheduleId))
      setDeleteScheduleId(null)
    } catch (error) {
      console.error("Lỗi khi xóa lịch báo cáo:", error)
    }
  }

  const getReportTypeName = (type: ReportType): string => {
    const reportTypeNames: Record<ReportType, string> = {
      overview: "Tổng quan",
      customer: "Khách hàng",
      campaign: "Chiến dịch",
      conversation: "Tin nhắn",
      api_performance: "Hiệu suất API",
      staff_performance: "Hiệu suất nhân viên",
    }
    
    return reportTypeNames[type] || "Không xác định"
  }

  const getFrequencyText = (schedule: ReportSchedule): string => {
    switch (schedule.frequency) {
      case "daily":
        return `Hàng ngày lúc ${schedule.time}`
      case "weekly":
        const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
        return `${days[schedule.dayOfWeek || 0]} hàng tuần lúc ${schedule.time}`
      case "monthly":
        return `Ngày ${schedule.dayOfMonth} hàng tháng lúc ${schedule.time}`
      default:
        return "Không xác định"  hàng tháng lúc ${schedule.time}`
      default:
        return "Không xác định"
    }
  }

  return (
    <Card>
      <CardHeader>\
        <CardTitle>Lịch báo cáo định kỳ</CardTitle>
        <CardDescription>
          Quản lý các báo cáo được lập lịch gửi tự động
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : schedules.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Chưa có lịch báo cáo nào được thiết lập</p>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Tạo lịch báo cáo mới
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên lịch báo cáo</TableHead>
                <TableHead>Loại báo cáo</TableHead>
                <TableHead>Tần suất</TableHead>
                <TableHead>Người nhận</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.name}</TableCell>
                  <TableCell>{getReportTypeName(schedule.reportType)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {getFrequencyText(schedule)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <UserCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                      {schedule.recipients.length} người nhận
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={schedule.active}
                        onCheckedChange={(checked) => toggleScheduleStatus(schedule.id, checked)}
                      />
                      <Badge variant={schedule.active ? "default" : "outline"}>
                        {schedule.active ? "Đang hoạt động" : "Tạm dừng"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem>Tạo bản sao</DropdownMenuItem>
                        <DropdownMenuItem>Chạy ngay</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => setDeleteScheduleId(schedule.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Xóa lịch báo cáo
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <AlertDialog open={!!deleteScheduleId} onOpenChange={() => setDeleteScheduleId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa lịch báo cáo</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa lịch báo cáo này? Hành động này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={deleteSchedule} className="bg-red-600 hover:bg-red-700">
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
