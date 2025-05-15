"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Copy, RefreshCw, Eye, EyeOff, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { generateWebhookSecret } from "@/lib/webhook/signature"

interface WebhookSecretManagerProps {
  webhookId: string
  initialSecret?: string
  onSecretChange?: (secret: string) => void
}

export default function WebhookSecretManager({ webhookId, initialSecret, onSecretChange }: WebhookSecretManagerProps) {
  const [secret, setSecret] = useState(initialSecret || "")
  const [showSecret, setShowSecret] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const { toast } = useToast()

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret)
    toast({
      title: "Đã sao chép",
      description: "Khóa bí mật đã được sao chép vào clipboard",
    })
  }

  const handleGenerateSecret = () => {
    setIsRegenerating(true)

    // Giả lập API call
    setTimeout(() => {
      const newSecret = generateWebhookSecret()
      setSecret(newSecret)
      if (onSecretChange) {
        onSecretChange(newSecret)
      }
      setIsRegenerating(false)
      toast({
        title: "Đã tạo khóa bí mật mới",
        description: "Khóa bí mật mới đã được tạo thành công",
      })
    }, 500)
  }

  const toggleShowSecret = () => {
    setShowSecret(!showSecret)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Khóa bí mật Webhook
        </CardTitle>
        <CardDescription>
          Khóa bí mật này được sử dụng để xác thực webhook và đảm bảo tính toàn vẹn dữ liệu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertTitle>Quan trọng</AlertTitle>
          <AlertDescription>
            Khóa bí mật này chỉ được hiển thị một lần. Hãy lưu trữ nó ở nơi an toàn. Nếu bạn mất khóa bí mật, bạn sẽ cần
            tạo một khóa mới.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-secret">Khóa bí mật</Label>
            <div className="flex">
              <div className="relative flex-grow">
                <Input
                  id="webhook-secret"
                  type={showSecret ? "text" : "password"}
                  value={secret}
                  readOnly
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={toggleShowSecret}
                >
                  {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button variant="outline" onClick={handleCopySecret} className="ml-2">
                <Copy className="h-4 w-4 mr-2" />
                Sao chép
              </Button>
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              onClick={handleGenerateSecret}
              disabled={isRegenerating}
              className="w-full sm:w-auto"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRegenerating ? "animate-spin" : ""}`} />
              {isRegenerating ? "Đang tạo..." : "Tạo khóa bí mật mới"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          Khi bạn tạo khóa bí mật mới, tất cả các webhook sử dụng khóa cũ sẽ không còn hoạt động. Bạn cần cập nhật khóa
          mới trong các tích hợp của mình.
        </p>
      </CardFooter>
    </Card>
  )
}
