"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Mail, MessageSquare, Users, Zap, Key, FileText, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    app: {
      messages: true,
      customers: true,
      campaigns: true,
      api: true,
      reports: true,
      system: true,
    },
    email: {
      messages: false,
      customers: true,
      campaigns: true,
      api: true,
      reports: true,
      system: true,
    },
    push: {
      messages: true,
      customers: false,
      campaigns: true,
      api: true,
      reports: false,
      system: true,
    },
  })

  const [pushPermission, setPushPermission] = useState<NotificationPermission | null>(null)

  // Kiểm tra quyền thông báo đẩy
  const checkPushPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Trình duyệt không hỗ trợ",
        description: "Trình duyệt của bạn không hỗ trợ thông báo đẩy",
        variant: "destructive",
      })
      return
    }

    const permission = await Notification.requestPermission()
    setPushPermission(permission)

    if (permission === "granted") {
      toast({
        title: "Đã bật thông báo đẩy",
        description: "Bạn sẽ nhận được thông báo ngay cả khi không mở ứng dụng",
      })
    } else if (permission === "denied") {
      toast({
        title: "Thông báo đẩy bị từ chối",
        description: "Vui lòng cấp quyền thông báo trong cài đặt trình duyệt",
        variant: "destructive",
      })
    }
  }

  const toggleSetting = (channel: keyof typeof settings, type: keyof typeof settings.app) => {
    setSettings((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type],
      },
    }))
  }

  const saveSettings = () => {
    // Trong thực tế, đây sẽ là API call để lưu cài đặt
    toast({
      title: "Đã lưu cài đặt",
      description: "Cài đặt thông báo của bạn đã được cập nhật",
    })
  }

  return (
    <Tabs defaultValue="app">
      <TabsList className="mb-4">
        <TabsTrigger value="app">
          <Bell className="h-4 w-4 mr-2" />
          Trong ứng dụng
        </TabsTrigger>
        <TabsTrigger value="email">
          <Mail className="h-4 w-4 mr-2" />
          Email
        </TabsTrigger>
        <TabsTrigger value="push">
          <AlertCircle className="h-4 w-4 mr-2" />
          Thông báo đẩy
        </TabsTrigger>
      </TabsList>

      <TabsContent value="app">
        <Card>
          <CardHeader>
            <CardTitle>Thông báo trong ứng dụng</CardTitle>
            <CardDescription>Quản lý các thông báo hiển thị trong ứng dụng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <Label htmlFor="app-messages">Tin nhắn mới</Label>
              </div>
              <Switch
                id="app-messages"
                checked={settings.app.messages}
                onCheckedChange={() => toggleSetting("app", "messages")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <Label htmlFor="app-customers">Khách hàng mới</Label>
              </div>
              <Switch
                id="app-customers"
                checked={settings.app.customers}
                onCheckedChange={() => toggleSetting("app", "customers")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-500" />
                <Label htmlFor="app-campaigns">Cập nhật chiến dịch</Label>
              </div>
              <Switch
                id="app-campaigns"
                checked={settings.app.campaigns}
                onCheckedChange={() => toggleSetting("app", "campaigns")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-yellow-500" />
                <Label htmlFor="app-api">Cảnh báo API</Label>
              </div>
              <Switch id="app-api" checked={settings.app.api} onCheckedChange={() => toggleSetting("app", "api")} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-orange-500" />
                <Label htmlFor="app-reports">Báo cáo mới</Label>
              </div>
              <Switch
                id="app-reports"
                checked={settings.app.reports}
                onCheckedChange={() => toggleSetting("app", "reports")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-gray-500" />
                <Label htmlFor="app-system">Thông báo hệ thống</Label>
              </div>
              <Switch
                id="app-system"
                checked={settings.app.system}
                onCheckedChange={() => toggleSetting("app", "system")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>Lưu cài đặt</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="email">
        <Card>
          <CardHeader>
            <CardTitle>Thông báo qua email</CardTitle>
            <CardDescription>Quản lý các thông báo gửi đến email của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <Label htmlFor="email-messages">Tin nhắn mới</Label>
              </div>
              <Switch
                id="email-messages"
                checked={settings.email.messages}
                onCheckedChange={() => toggleSetting("email", "messages")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <Label htmlFor="email-customers">Khách hàng mới</Label>
              </div>
              <Switch
                id="email-customers"
                checked={settings.email.customers}
                onCheckedChange={() => toggleSetting("email", "customers")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-500" />
                <Label htmlFor="email-campaigns">Cập nhật chiến dịch</Label>
              </div>
              <Switch
                id="email-campaigns"
                checked={settings.email.campaigns}
                onCheckedChange={() => toggleSetting("email", "campaigns")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-yellow-500" />
                <Label htmlFor="email-api">Cảnh báo API</Label>
              </div>
              <Switch
                id="email-api"
                checked={settings.email.api}
                onCheckedChange={() => toggleSetting("email", "api")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-orange-500" />
                <Label htmlFor="email-reports">Báo cáo mới</Label>
              </div>
              <Switch
                id="email-reports"
                checked={settings.email.reports}
                onCheckedChange={() => toggleSetting("email", "reports")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-gray-500" />
                <Label htmlFor="email-system">Thông báo hệ thống</Label>
              </div>
              <Switch
                id="email-system"
                checked={settings.email.system}
                onCheckedChange={() => toggleSetting("email", "system")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>Lưu cài đặt</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="push">
        <Card>
          <CardHeader>
            <CardTitle>Thông báo đẩy</CardTitle>
            <CardDescription>Quản lý thông báo đẩy trên trình duyệt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Trạng thái thông báo đẩy</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Thông báo đẩy cho phép bạn nhận thông báo ngay cả khi không mở ứng dụng
              </p>
              <Button onClick={checkPushPermission}>
                {pushPermission === "granted" ? "Đã bật thông báo đẩy" : "Bật thông báo đẩy"}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  <Label htmlFor="push-messages">Tin nhắn mới</Label>
                </div>
                <Switch
                  id="push-messages"
                  checked={settings.push.messages}
                  onCheckedChange={() => toggleSetting("push", "messages")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <Label htmlFor="push-customers">Khách hàng mới</Label>
                </div>
                <Switch
                  id="push-customers"
                  checked={settings.push.customers}
                  onCheckedChange={() => toggleSetting("push", "customers")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <Label htmlFor="push-campaigns">Cập nhật chiến dịch</Label>
                </div>
                <Switch
                  id="push-campaigns"
                  checked={settings.push.campaigns}
                  onCheckedChange={() => toggleSetting("push", "campaigns")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-yellow-500" />
                  <Label htmlFor="push-api">Cảnh báo API</Label>
                </div>
                <Switch
                  id="push-api"
                  checked={settings.push.api}
                  onCheckedChange={() => toggleSetting("push", "api")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-orange-500" />
                  <Label htmlFor="push-reports">Báo cáo mới</Label>
                </div>
                <Switch
                  id="push-reports"
                  checked={settings.push.reports}
                  onCheckedChange={() => toggleSetting("push", "reports")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-gray-500" />
                  <Label htmlFor="push-system">Thông báo hệ thống</Label>
                </div>
                <Switch
                  id="push-system"
                  checked={settings.push.system}
                  onCheckedChange={() => toggleSetting("push", "system")}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>Lưu cài đặt</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
