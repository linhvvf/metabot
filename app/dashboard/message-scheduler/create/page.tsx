import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import MessageSchedulerForm from "@/components/dashboard/message-scheduler/message-scheduler-form"

export const metadata: Metadata = {
  title: "Tạo lịch trình tin nhắn | Metabot.vn",
  description: "Tạo lịch trình gửi tin nhắn tự động đến khách hàng",
}

export default function CreateSchedulePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center">
        <Link href="/dashboard/message-scheduler">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Quay lại</span>
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tạo lịch trình tin nhắn</h2>
          <p className="text-muted-foreground">Tạo lịch trình gửi tin nhắn tự động đến khách hàng của bạn</p>
        </div>
      </div>

      <MessageSchedulerForm />
    </div>
  )
}
