import type { Metadata } from "next"
import { TemplateList } from "@/components/dashboard/message-templates/template-list"
import { TemplateFilters } from "@/components/dashboard/message-templates/template-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Quản lý mẫu tin nhắn - Metabot.vn",
  description: "Tạo và quản lý các mẫu tin nhắn để sử dụng trong chiến dịch marketing và lập lịch tin nhắn tự động",
}

export default function MessageTemplatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Quản lý mẫu tin nhắn</h1>
        <p className="text-muted-foreground">
          Tạo và quản lý các mẫu tin nhắn để sử dụng trong chiến dịch marketing và lập lịch tin nhắn tự động
        </p>
      </div>

      <div className="flex items-center justify-between">
        <TemplateFilters />
        <Link href="/dashboard/message-templates/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tạo mẫu tin nhắn
          </Button>
        </Link>
      </div>

      <TemplateList />
    </div>
  )
}
