import type { Metadata } from "next"
import { ApiKeyList } from "@/components/dashboard/api-management/api-key-list"
import { CreateApiKey } from "@/components/dashboard/api-management/create-api-key"
import { ApiDocumentation } from "@/components/dashboard/api-management/api-documentation"
import { ResponsiveTabs } from "@/components/ui/responsive-tabs"

export const metadata: Metadata = {
  title: "API Management | Metabot.vn",
  description: "Quản lý API keys và quyền truy cập cho ứng dụng của bạn",
}

export default function ApiManagementPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý API</h1>
        <p className="text-muted-foreground">
          Tạo và quản lý API keys, thiết lập quyền truy cập và theo dõi việc sử dụng API
        </p>
      </div>

      <ResponsiveTabs
        tabs={[
          {
            value: "keys",
            label: "API Keys",
            content: <ApiKeyList />,
          },
          {
            value: "create",
            label: "Tạo Key",
            content: <CreateApiKey />,
          },
          {
            value: "docs",
            label: "Tài liệu API",
            content: <ApiDocumentation />,
          },
        ]}
        defaultValue="keys"
      />
    </div>
  )
}
