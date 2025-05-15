import type { Metadata } from "next"
import { AttachmentManager } from "@/components/dashboard/attachments/attachment-manager"

export const metadata: Metadata = {
  title: "Quản lý tệp đính kèm - Metabot.vn",
  description: "Quản lý tệp đính kèm cho tin nhắn và chiến dịch",
}

export default function AttachmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Quản lý tệp đính kèm</h1>
        <p className="text-muted-foreground mt-1">Quản lý tệp đính kèm cho tin nhắn và chiến dịch</p>
      </div>

      <AttachmentManager />
    </div>
  )
}
