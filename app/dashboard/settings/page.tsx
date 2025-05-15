"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import SettingsSidebar from "@/components/dashboard/settings/settings-sidebar"
import AccountSettings from "@/components/dashboard/settings/account-settings"
import CompanySettings from "@/components/dashboard/settings/company-settings"
import ConnectionSettings from "@/components/dashboard/settings/connection-settings"
import SecuritySettings from "@/components/dashboard/settings/security-settings"
import ApiSettings from "@/components/dashboard/settings/api-settings"
import BillingSettings from "@/components/dashboard/settings/billing-settings"
import AppearanceSettings from "@/components/dashboard/settings/appearance-settings"
import NotificationSettings from "@/components/dashboard/settings/notification-settings"
import { useSearchParams } from "next/navigation"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "account"
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-gray-500">Quản lý tài khoản, kết nối và cài đặt hệ thống</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1">
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="account" className="mt-0">
                <AccountSettings />
              </TabsContent>
              <TabsContent value="company" className="mt-0">
                <CompanySettings />
              </TabsContent>
              <TabsContent value="connections" className="mt-0">
                <ConnectionSettings />
              </TabsContent>
              <TabsContent value="security" className="mt-0">
                <SecuritySettings />
              </TabsContent>
              <TabsContent value="notifications" className="mt-0">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="api" className="mt-0">
                <ApiSettings />
              </TabsContent>
              <TabsContent value="billing" className="mt-0">
                <BillingSettings />
              </TabsContent>
              <TabsContent value="appearance" className="mt-0">
                <AppearanceSettings />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
