import type { Metadata } from "next"
import { DialectList } from "@/components/dashboard/dialect-dictionary/dialect-list"
import { DialectFilters } from "@/components/dashboard/dialect-dictionary/dialect-filters"
import { Button } from "@/components/ui/button"
import { Plus, Settings } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Quản lý từ điển biệt ngữ | Metabot.vn",
  description: "Quản lý cơ sở dữ liệu biệt ngữ, tiếng lóng và phương ngữ vùng miền",
}

export default function DialectDictionaryPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý từ điển biệt ngữ</h1>
        <p className="text-muted-foreground">
          Quản lý cơ sở dữ liệu biệt ngữ, tiếng lóng và phương ngữ vùng miền để cải thiện khả năng phân tích ngôn ngữ
        </p>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <DialectFilters />
          <div className="flex items-center gap-2">
            <Link href="/dashboard/dialect-dictionary/manage">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Quản lý từ điển
              </Button>
            </Link>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm biệt ngữ mới
            </Button>
          </div>
        </div>

        <DialectList />
      </div>
    </div>
  )
}
