import type { Metadata } from "next"
import AITemplateForm from "@/components/dashboard/ai-templates/ai-template-form"

export const metadata: Metadata = {
  title: "Tạo mẫu tin nhắn AI | Metabot.vn",
  description: "Tạo mẫu tin nhắn AI mới cho doanh nghiệp của bạn",
}

export default function CreateAITemplatePage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Tạo mẫu tin nhắn AI</h1>
        <p className="text-muted-foreground">Tạo mẫu tin nhắn AI mới để tự động hóa giao tiếp với khách hàng</p>
      </div>

      <AITemplateForm />
    </div>
  )
}
