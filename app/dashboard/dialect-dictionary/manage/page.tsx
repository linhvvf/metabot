import type { Metadata } from "next"
import { DialectCategories } from "@/components/dashboard/dialect-dictionary/dialect-categories"
import { DialectBulkImport } from "@/components/dashboard/dialect-dictionary/dialect-bulk-import"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Quản lý danh mục biệt ngữ | Metabot.vn",
  description: "Quản lý danh mục và nhập dữ liệu hàng loạt cho từ điển biệt ngữ",
}

export default function DialectDictionaryManagePage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/dialect-dictionary">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý từ điển biệt ngữ</h1>
          </div>
          <p className="text-muted-foreground">Quản lý danh mục và nhập dữ liệu hàng loạt cho từ điển biệt ngữ</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất dữ liệu
          </Button>
          <DialectBulkImport />
        </div>
      </div>

      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Danh mục</TabsTrigger>
          <TabsTrigger value="regions">Vùng miền</TabsTrigger>
          <TabsTrigger value="statistics">Thống kê</TabsTrigger>
        </TabsList>
        <TabsContent value="categories" className="space-y-6 pt-4">
          <DialectCategories />
        </TabsContent>
        <TabsContent value="regions" className="space-y-6 pt-4">
          <div className="rounded-md border p-6">
            <h3 className="text-lg font-medium mb-4">Quản lý vùng miền</h3>
            <p className="text-muted-foreground">Tính năng đang được phát triển. Sẽ sớm được cập nhật.</p>
          </div>
        </TabsContent>
        <TabsContent value="statistics" className="space-y-6 pt-4">
          <div className="rounded-md border p-6">
            <h3 className="text-lg font-medium mb-4">Thống kê từ điển biệt ngữ</h3>
            <p className="text-muted-foreground">Tính năng đang được phát triển. Sẽ sớm được cập nhật.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
