"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportScheduleDialog } from "@/components/dashboard/reports/report-schedule-dialog"
import { ScheduledReportsTable } from "@/components/dashboard/reports/scheduled-reports-table"
import { Clock, Download, History } from "lucide-react"

export default function ScheduledReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Báo cáo tự động</h1>
          <p className="text-gray-500">Quản lý các báo cáo được lên lịch tự động</p>
        </div>
        <div className="flex gap-2">
          <ReportScheduleDialog title="Báo cáo mới" source="conversations" />
          <Button variant="default">
            <Download className="mr-2 h-4 w-4" />
            Xuất lịch trình
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Đang hoạt động
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <History className="mr-2 h-4 w-4" />
            Lịch sử
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo đã lên lịch</CardTitle>
              <CardDescription>Danh sách các báo cáo được lên lịch gửi tự động</CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduledReportsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử báo cáo</CardTitle>
              <CardDescription>Lịch sử các báo cáo đã được gửi</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Chức năng này sẽ được cập nhật trong phiên bản tiếp theo
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
