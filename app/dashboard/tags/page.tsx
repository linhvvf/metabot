import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import TagList from "@/components/dashboard/tags/tag-list"
import TagGroups from "@/components/dashboard/tags/tag-groups"
import TagFilters from "@/components/dashboard/tags/tag-filters"
import AutoTaggingRules from "@/components/dashboard/tags/auto-tagging-rules"
import TagUsageStats from "@/components/dashboard/tags/tag-usage-stats"
import BulkTagManager from "@/components/dashboard/tags/bulk-tag-manager"

export const metadata: Metadata = {
  title: "Quản lý thẻ | Metabot.vn",
  description: "Quản lý thẻ cho khách hàng và chiến dịch",
}

export default function TagsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý thẻ</h2>
          <p className="text-muted-foreground">Tạo và quản lý thẻ để phân loại khách hàng và chiến dịch</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tạo thẻ mới
        </Button>
      </div>

      <TagFilters />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tất cả thẻ</TabsTrigger>
          <TabsTrigger value="customer">Thẻ khách hàng</TabsTrigger>
          <TabsTrigger value="campaign">Thẻ chiến dịch</TabsTrigger>
          <TabsTrigger value="groups">Nhóm thẻ</TabsTrigger>
          <TabsTrigger value="auto">Gán thẻ tự động</TabsTrigger>
          <TabsTrigger value="stats">Thống kê sử dụng</TabsTrigger>
          <TabsTrigger value="bulk">Quản lý hàng loạt</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <TagList type="all" />
        </TabsContent>

        <TabsContent value="customer" className="space-y-4">
          <TagList type="customer" />
        </TabsContent>

        <TabsContent value="campaign" className="space-y-4">
          <TagList type="campaign" />
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <TagGroups />
        </TabsContent>

        <TabsContent value="auto" className="space-y-4">
          <AutoTaggingRules />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <TagUsageStats />
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <BulkTagManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
