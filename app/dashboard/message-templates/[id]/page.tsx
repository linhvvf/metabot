import type { Metadata } from "next"
import { TemplateEditor } from "@/components/dashboard/message-templates/template-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface TemplatePageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Chi tiết mẫu tin nhắn - Metabot.vn",
  description: "Xem và chỉnh sửa chi tiết mẫu tin nhắn",
}

export default function TemplatePage({ params }: TemplatePageProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/message-templates">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Chi tiết mẫu tin nhắn</h1>
      </div>

      <TemplateEditor templateId={params.id} />
    </div>
  )
}
