import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import ScheduledMessageList from "@/components/dashboard/message-scheduler/scheduled-message-list"
import ScheduleFilters from "@/components/dashboard/message-scheduler/schedule-filters"

export const metadata: Metadata = {
  title: "Lập lịch tin nhắn | Metabot.vn",
  description: "Lập lịch và tự động hóa việc gửi tin nhắn đến khách hàng",
}

export default function MessageSchedulerPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lập lịch tin nhắn</h2>
          <p className="text-muted-foreground">Lập lịch và tự động hóa việc gửi tin nhắn đến khách hàng của bạn</p>
        </div>
        <Link href="/dashboard/message-scheduler/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tạo lịch trình mới
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
            <TabsTrigger value="pending">Chờ gửi</TabsTrigger>
            <TabsTrigger value="completed">Đã hoàn thành</TabsTrigger>
            <TabsTrigger value="recurring">Định kỳ</TabsTrigger>
          </TabsList>
        </div>

        <ScheduleFilters />

        <TabsContent value="all" className="space-y-4">
          <ScheduledMessageList />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <ScheduledMessageList status="active" />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <ScheduledMessageList status="pending" />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <ScheduledMessageList status="completed" />
        </TabsContent>

        <TabsContent value="recurring" className="space-y-4">
          <ScheduledMessageList type="recurring" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
