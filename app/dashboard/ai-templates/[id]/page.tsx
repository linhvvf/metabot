import type { Metadata } from "next"
import { notFound } from "next/navigation"
import AITemplateForm from "@/components/dashboard/ai-templates/ai-template-form"

interface AITemplatePageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Chi tiết mẫu tin nhắn AI | Metabot.vn",
  description: "Xem và chỉnh sửa chi tiết mẫu tin nhắn AI",
}

export default function AITemplatePage({ params }: AITemplatePageProps) {
  // Trong thực tế, bạn sẽ lấy dữ liệu từ API dựa trên ID
  // Đây là dữ liệu mẫu
  const templateId = params.id

  // Kiểm tra ID không hợp lệ
  if (templateId === "invalid") {
    notFound()
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Chỉnh sửa mẫu tin nhắn AI</h1>
        <p className="text-muted-foreground">Chỉnh sửa và cập nhật mẫu tin nhắn AI của bạn</p>
      </div>

      <AITemplateForm id={templateId} />
    </div>
  )
}
