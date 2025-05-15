import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CampaignForm from "@/components/dashboard/campaigns/campaign-form"

export const metadata: Metadata = {
  title: "Tạo chiến dịch mới | Metabot.vn",
  description: "Tạo chiến dịch marketing mới và gửi tin nhắn hàng loạt",
}

export default function CreateCampaignPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center">
        <Link href="/dashboard/campaigns">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Quay lại</span>
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tạo chiến dịch mới</h2>
          <p className="text-muted-foreground">Tạo chiến dịch marketing mới và gửi tin nhắn hàng loạt đến khách hàng</p>
        </div>
      </div>

      <CampaignForm />
    </div>
  )
}
