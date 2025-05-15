"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import WebhookList from "@/components/dashboard/webhooks/webhook-list"
import WebhookForm from "@/components/dashboard/webhooks/webhook-form"
import WebhookHistory from "@/components/dashboard/webhooks/webhook-history"
import WebhookSecurity from "@/components/dashboard/webhooks/webhook-security"
import WebhookTester from "@/components/dashboard/webhooks/webhook-tester"
import WebhookFilters from "@/components/dashboard/webhooks/webhook-filters"
import WebhookSignatureSettings from "@/components/dashboard/webhooks/webhook-signature-settings"

export default function WebhooksPage() {
  const [activeTab, setActiveTab] = useState("webhooks")
  const [showWebhookForm, setShowWebhookForm] = useState(false)
  const [editingWebhook, setEditingWebhook] = useState(null)
  const [selectedWebhookId, setSelectedWebhookId] = useState("wh_1")
  const [filters, setFilters] = useState({
    status: "all",
    event: "all",
    search: "",
  })

  const handleCreateWebhook = () => {
    setEditingWebhook(null)
    setShowWebhookForm(true)
    setActiveTab("webhooks")
  }

  const handleEditWebhook = (webhook) => {
    setEditingWebhook(webhook)
    setShowWebhookForm(true)
    setActiveTab("webhooks")
    setSelectedWebhookId(webhook.id)
  }

  const handleViewWebhookAuth = (webhook) => {
    setSelectedWebhookId(webhook.id)
    setActiveTab("authentication")
  }

  const handleCloseForm = () => {
    setShowWebhookForm(false)
    setEditingWebhook(null)
  }

  const handleSaveWebhook = (webhookData) => {
    // Xử lý lưu webhook (sẽ được triển khai khi có API)
    console.log("Webhook saved:", webhookData)
    setShowWebhookForm(false)
    setEditingWebhook(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Webhooks</h1>
          <p className="text-gray-500">Quản lý tích hợp webhooks với các dịch vụ bên ngoài</p>
        </div>
        <Button onClick={handleCreateWebhook}>
          <Plus className="h-4 w-4 mr-2" />
          Tạo Webhook
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="authentication">Xác thực</TabsTrigger>
          <TabsTrigger value="tester">Kiểm tra</TabsTrigger>
        </TabsList>

        <TabsContent value="webhooks" className="space-y-4">
          {showWebhookForm ? (
            <Card className="p-6">
              <WebhookForm webhook={editingWebhook} onSave={handleSaveWebhook} onCancel={handleCloseForm} />
            </Card>
          ) : (
            <>
              <WebhookFilters filters={filters} setFilters={setFilters} />
              <WebhookList onEdit={handleEditWebhook} onViewAuth={handleViewWebhookAuth} filters={filters} />
            </>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-6">
            <WebhookHistory />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <WebhookSecurity />
          </Card>
        </TabsContent>

        <TabsContent value="authentication">
          <Card className="p-6">
            <WebhookSignatureSettings webhookId={selectedWebhookId} />
          </Card>
        </TabsContent>

        <TabsContent value="tester">
          <Card className="p-6">
            <WebhookTester />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
