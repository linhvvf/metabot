import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CampaignList from "@/components/dashboard/campaigns/campaign-list"
import CampaignFilters from "@/components/dashboard/campaigns/campaign-filters"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Chiến dịch Marketing | Metabot.vn",
  description: "Quản lý chiến dịch marketing và gửi tin nhắn hàng loạt",
}

export default function CampaignsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Chiến dịch Marketing</h2>
          <p className="text-muted-foreground">
            Tạo và quản lý các chiến dịch marketing, gửi tin nhắn hàng loạt đến khách hàng
          </p>
        </div>
        <Link href="/dashboard/campaigns/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tạo chiến dịch mới
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
            <TabsTrigger value="scheduled">Đã lên lịch</TabsTrigger>
            <TabsTrigger value="completed">Đã hoàn thành</TabsTrigger>
            <TabsTrigger value="draft">Bản nháp</TabsTrigger>
          </TabsList>
        </div>

        <CampaignFilters />

        <TabsContent value="all" className="space-y-4">
          <CampaignList />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <CampaignList status="active" />
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <CampaignList status="scheduled" />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <CampaignList status="completed" />
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <CampaignList status="draft" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
