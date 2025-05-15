import type { Metadata } from "next"
import { Suspense } from "react"
import AITemplateList from "@/components/dashboard/ai-templates/ai-template-list"
import AITemplateFilters from "@/components/dashboard/ai-templates/ai-template-filters"
import Loading from "./loading"

export const metadata: Metadata = {
  title: "Quản lý mẫu tin nhắn AI | Metabot.vn",
  description: "Quản lý và tùy chỉnh các mẫu tin nhắn AI cho doanh nghiệp của bạn",
}

export default function AITemplatesPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mẫu tin nhắn AI</h1>
        <p className="text-muted-foreground">
          Quản lý và tùy chỉnh các mẫu tin nhắn AI để tự động hóa giao tiếp với khách hàng
        </p>
      </div>

      <AITemplateFilters />

      <Suspense fallback={<Loading />}>
        <AITemplateList />
      </Suspense>
    </div>
  )
}
