"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Shield, Save, Clock } from "lucide-react"
import WebhookSecretManager from "./webhook-secret-manager"
import WebhookAuthenticationGuide from "./webhook-authentication-guide"

interface WebhookSignatureSettingsProps {
  webhookId: string
  initialSettings?: {
    enabled: boolean
    algorithm: string
    secret: string
    timestampValidation: boolean
    timestampTolerance: number
  }
}

export default function WebhookSignatureSettings({
  webhookId,
  initialSettings = {
    enabled: true,
    algorithm: "sha256",
    secret: "",
    timestampValidation: true,
    timestampTolerance: 300,
  },
}: WebhookSignatureSettingsProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSecretChange = (secret: string) => {
    setSettings((prev) => ({ ...prev, secret }))
  }

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Giả lập API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Đã lưu cài đặt",
        description: "Cài đặt xác thực webhook đã được lưu thành công",
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Cài đặt xác thực Webhook
          </CardTitle>
          <CardDescription>
            Cấu hình cài đặt xác thực để đảm bảo tính toàn vẹn và bảo mật cho webhook của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="signature-enabled">Bật xác thực chữ ký</Label>
              <p className="text-sm text-muted-foreground">
                Yêu cầu xác thực chữ ký cho tất cả các webhook gửi đến endpoint này
              </p>
            </div>
            <Switch
              id="signature-enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, enabled: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signature-algorithm">Thuật toán chữ ký</Label>
            <Select
              value={settings.algorithm}
              onValueChange={(algorithm) => setSettings((prev) => ({ ...prev, algorithm }))}
              disabled={!settings.enabled}
            >
              <SelectTrigger id="signature-algorithm">
                <SelectValue placeholder="Chọn thuật toán" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sha256">HMAC-SHA256 (Khuyến nghị)</SelectItem>
                <SelectItem value="sha512">HMAC-SHA512</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              HMAC-SHA256 cung cấp sự cân bằng tốt giữa bảo mật và hiệu suất
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="timestamp-validation">Xác thực timestamp</Label>
              <p className="text-sm text-muted-foreground">
                Ngăn chặn tấn công replay bằng cách xác thực timestamp của webhook
              </p>
            </div>
            <Switch
              id="timestamp-validation"
              checked={settings.timestampValidation}
              onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, timestampValidation: checked }))}
              disabled={!settings.enabled}
            />
          </div>

          {settings.timestampValidation && (
            <div className="space-y-2">
              <Label htmlFor="timestamp-tolerance" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Dung sai timestamp (giây)
              </Label>
              <Input
                id="timestamp-tolerance"
                type="number"
                min="60"
                max="3600"
                value={settings.timestampTolerance}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, timestampTolerance: Number.parseInt(e.target.value) || 300 }))
                }
                disabled={!settings.enabled}
              />
              <p className="text-xs text-muted-foreground">
                Webhook sẽ bị từ chối nếu timestamp của nó khác với thời gian hiện tại quá số giây này (mặc định: 300
                giây = 5 phút)
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Đang lưu..." : "Lưu cài đặt"}
          </Button>
        </CardFooter>
      </Card>

      {settings.enabled && (
        <>
          <WebhookSecretManager
            webhookId={webhookId}
            initialSecret={settings.secret}
            onSecretChange={handleSecretChange}
          />
          <WebhookAuthenticationGuide webhookSecret={settings.secret} />
        </>
      )}
    </div>
  )
}
