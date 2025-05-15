import type { Metadata } from "next"
import { NotificationList } from "@/components/dashboard/notifications/notification-list"
import { NotificationFilters } from "@/components/dashboard/notifications/notification-filters"
import { NotificationSettings } from "@/components/dashboard/notifications/notification-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Thông báo - Metabot.vn",
  description: "Quản lý thông báo của bạn",
}

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Thông báo</h1>
        <p className="text-muted-foreground mt-2">Quản lý và xem tất cả thông báo của bạn</p>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="unread">Chưa đọc</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt thông báo</TabsTrigger>
          </TabsList>
          <NotificationFilters />
        </div>

        <Card>
          <TabsContent value="all" className="m-0">
            <CardHeader className="pb-0">
              <CardTitle>Tất cả thông báo</CardTitle>
              <CardDescription>Danh sách tất cả thông báo của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList filter="all" />
            </CardContent>
          </TabsContent>

          <TabsContent value="unread" className="m-0">
            <CardHeader className="pb-0">
              <CardTitle>Thông báo chưa đọc</CardTitle>
              <CardDescription>Danh sách thông báo bạn chưa đọc</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList filter="unread" />
            </CardContent>
          </TabsContent>

          <TabsContent value="settings" className="m-0">
            <CardHeader className="pb-0">
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>Tùy chỉnh cách bạn nhận thông báo</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
