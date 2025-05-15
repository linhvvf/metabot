"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Shield, Smartphone, Key, LogOut, AlertTriangle } from "lucide-react"

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const { toast } = useToast()

  const handleToggle2FA = (checked) => {
    if (checked) {
      setShowQRCode(true)
    } else {
      setShowQRCode(false)
      setTwoFactorEnabled(false)
      toast({
        title: "Xác thực hai yếu tố",
        description: "Đã tắt xác thực hai yếu tố",
      })
    }
  }

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true)
    setShowQRCode(false)
    toast({
      title: "Xác thực hai yếu tố",
      description: "Đã bật xác thực hai yếu tố thành công",
    })
  }

  const handleLogoutAllSessions = () => {
    toast({
      title: "Đăng xuất",
      description: "Đã đăng xuất khỏi tất cả các phiên",
    })
  }

  // Mock data for active sessions
  const activeSessions = [
    {
      id: 1,
      device: "Chrome trên Windows",
      ip: "192.168.1.1",
      location: "Hồ Chí Minh, Việt Nam",
      lastActive: "2023-05-08T10:30:00",
      current: true,
    },
    {
      id: 2,
      device: "Safari trên iPhone",
      ip: "192.168.1.2",
      location: "Hồ Chí Minh, Việt Nam",
      lastActive: "2023-05-07T15:45:00",
      current: false,
    },
    {
      id: 3,
      device: "Firefox trên MacOS",
      ip: "192.168.1.3",
      location: "Hà Nội, Việt Nam",
      lastActive: "2023-05-06T09:20:00",
      current: false,
    },
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Bảo mật</h3>
        <p className="text-sm text-muted-foreground">Quản lý cài đặt bảo mật và xác thực tài khoản</p>
      </div>
      <Separator />

      <div>
        <h4 className="text-base font-medium mb-4">Xác thực hai yếu tố (2FA)</h4>
        <div className="flex items-start space-x-3 p-4 rounded-md border mb-4">
          <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
          <div className="space-y-1">
            <Label htmlFor="two-factor" className="font-medium">
              Xác thực hai yếu tố
            </Label>
            <p className="text-sm text-muted-foreground">
              Bảo vệ tài khoản của bạn bằng cách yêu cầu mã xác thực bổ sung khi đăng nhập
            </p>
          </div>
        </div>

        {showQRCode && (
          <div className="border rounded-md p-4 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <h5 className="font-medium">Thiết lập xác thực hai yếu tố</h5>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-sm mb-4">
                  1. Tải ứng dụng xác thực như Google Authenticator hoặc Authy trên điện thoại của bạn.
                </p>
                <p className="text-sm mb-4">2. Quét mã QR bên cạnh hoặc nhập mã bí mật vào ứng dụng.</p>
                <p className="text-sm mb-4">3. Nhập mã xác thực từ ứng dụng để hoàn tất thiết lập.</p>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="verification-code">Mã xác thực</Label>
                  <div className="flex gap-2">
                    <Input id="verification-code" placeholder="Nhập mã 6 chữ số" />
                    <Button onClick={handleEnable2FA}>Xác nhận</Button>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                  <Image src="/qr-code.png" alt="QR Code" width={180} height={180} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium mb-1">Mã bí mật</p>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">ABCD EFGH IJKL MNOP</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {twoFactorEnabled && (
          <div className="flex items-center gap-2 p-3 bg-green-50 text-green-800 rounded-md mb-4">
            <Shield className="h-5 w-5" />
            <p className="text-sm font-medium">Xác thực hai yếu tố đang được bật</p>
          </div>
        )}
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Phiên đăng nhập</h4>
        <div className="space-y-4">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-md"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-medium">{session.device}</h5>
                  {session.current && <Badge className="bg-green-100 text-green-800">Hiện tại</Badge>}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>IP: {session.ip}</p>
                  <p>Vị trí: {session.location}</p>
                  <p>Hoạt động gần nhất: {formatDate(session.lastActive)}</p>
                </div>
              </div>
              {!session.current && (
                <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={handleLogoutAllSessions}>
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất tất cả phiên
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Mật khẩu ứng dụng</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Mật khẩu ứng dụng cho phép các ứng dụng không hỗ trợ xác thực hai yếu tố truy cập vào tài khoản của bạn.
        </p>
        <Button>
          <Key className="h-4 w-4 mr-2" />
          Tạo mật khẩu ứng dụng
        </Button>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium text-red-600 mb-4">Khu vực nguy hiểm</h4>
        <div className="border border-red-200 rounded-md p-4 bg-red-50">
          <div className="flex items-start gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-red-600">Đặt lại bảo mật</h5>
              <p className="text-sm text-red-600">
                Đặt lại tất cả cài đặt bảo mật, bao gồm xác thực hai yếu tố và mật khẩu ứng dụng. Bạn sẽ cần xác nhận
                danh tính của mình.
              </p>
            </div>
          </div>
          <Button variant="destructive">Đặt lại bảo mật</Button>
        </div>
      </div>
    </div>
  )
}
