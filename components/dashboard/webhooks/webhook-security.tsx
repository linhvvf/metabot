"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Copy, RefreshCw, Shield, ShieldCheck } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function WebhookSecurity() {
  const [signingSecret, setSigningSecret] = useState("whsec_abcdefghijklmnopqrstuvwxyz0123456789")
  const [ipWhitelist, setIpWhitelist] = useState("203.0.113.1, 203.0.113.2")
  const [newIp, setNewIp] = useState("")
  const [ipError, setIpError] = useState("")
  const [settings, setSettings] = useState({
    enableSignatureVerification: true,
    enableIpWhitelist: false,
    enableRateLimiting: true,
    rateLimitPerMinute: "60",
    enableRetry: true,
    maxRetries: "3",
    retryInterval: "60",
    logFailedAttempts: true,
    notifyOnFailure: true,
  })
  const { toast } = useToast()

  const handleGenerateNewSecret = () => {
    // Trong thực tế, điều này sẽ gọi API để tạo một khóa bí mật mới
    const newSecret =
      "whsec_" +
      Array(32)
        .fill(0)
        .map(() => Math.random().toString(36).charAt(2))
        .join("")

    setSigningSecret(newSecret)
    toast({
      title: "Khóa bí mật mới đã được tạo",
      description: "Hãy cập nhật khóa này trong các tích hợp của bạn.",
    })
  }

  const handleCopySecret = () => {
    navigator.clipboard.writeText(signingSecret)
    toast({
      title: "Đã sao chép",
      description: "Khóa bí mật đã được sao chép vào clipboard",
    })
  }

  const handleAddIp = () => {
    if (!newIp) {
      setIpError("Vui lòng nhập địa chỉ IP")
      return
    }

    // Kiểm tra định dạng IP
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    if (!ipRegex.test(newIp)) {
      setIpError("Địa chỉ IP không hợp lệ")
      return
    }

    const currentIps = ipWhitelist ? ipWhitelist.split(",").map((ip) => ip.trim()) : []
    if (currentIps.includes(newIp)) {
      setIpError("Địa chỉ IP này đã tồn tại trong danh sách")
      return
    }

    const updatedIpList = [...currentIps, newIp].join(", ")
    setIpWhitelist(updatedIpList)
    setNewIp("")
    setIpError("")
    toast({
      title: "Đã thêm địa chỉ IP",
      description: `Địa chỉ IP ${newIp} đã được thêm vào danh sách cho phép`,
    })
  }

  return (
    <>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Cài đặt bảo mật Webhook</h3>
            <p className="mt-1 text-sm text-gray-600">Quản lý các cài đặt bảo mật cho webhook của bạn.</p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Label htmlFor="signing-secret">Signing Secret</Label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <Input
                      type="text"
                      name="signing-secret"
                      id="signing-secret"
                      className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                      value={signingSecret}
                      readOnly
                    />
                    <Button
                      onClick={handleCopySecret}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md"
                    >
                      <Copy className="h-5 w-5 mr-2" />
                      Sao chép
                    </Button>
                  </div>
                  <Button onClick={handleGenerateNewSecret} variant="secondary" className="mt-2">
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Tạo khóa bí mật mới
                  </Button>
                  <Alert className="mt-4">
                    <Shield className="h-4 w-4" />
                    <AlertTitle>Quan trọng</AlertTitle>
                    <AlertDescription>
                      Khóa bí mật được sử dụng để xác minh rằng các webhook đến từ nguồn đáng tin cậy. Hãy giữ bí mật
                      này an toàn.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                  <Input
                    type="text"
                    name="ip-whitelist"
                    id="ip-whitelist"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={ipWhitelist}
                    readOnly
                  />
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <Input
                      type="text"
                      name="new-ip"
                      id="new-ip"
                      className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                      placeholder="Nhập địa chỉ IP"
                      value={newIp}
                      onChange={(e) => {
                        setNewIp(e.target.value)
                        setIpError("")
                      }}
                    />
                    <Button
                      onClick={handleAddIp}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md"
                    >
                      Thêm IP
                    </Button>
                  </div>
                  {ipError && <p className="mt-2 text-sm text-red-600">{ipError}</p>}
                  <Alert className="mt-4">
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Bảo mật</AlertTitle>
                    <AlertDescription>
                      Chỉ cho phép các địa chỉ IP được liệt kê truy cập vào webhook của bạn.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <Button type="submit">Lưu</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
