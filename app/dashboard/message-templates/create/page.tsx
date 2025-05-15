import type { Metadata } from "next"
import { TemplateEditor } from "@/components/dashboard/message-templates/template-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Tạo mẫu tin nhắn - Metabot.vn",
  description: "Tạo mẫu tin nhắn mới để sử dụng trong chiến dịch marketing và lập lịch tin nhắn tự động",
}

export default function CreateTemplatePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/message-templates">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Tạo mẫu tin nhắn mới</h1>
      </div>

      <TemplateEditor />
    </div>
  )
}
