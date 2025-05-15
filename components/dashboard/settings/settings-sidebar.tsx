"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { User, Building, Link, Shield, Bell, Code, CreditCard, Palette, ChevronRight } from "lucide-react"

const menuItems = [
  {
    id: "account",
    label: "Tài khoản",
    icon: User,
    description: "Quản lý thông tin cá nhân và tùy chọn tài khoản",
  },
  {
    id: "company",
    label: "Công ty",
    icon: Building,
    description: "Cập nhật thông tin công ty và thương hiệu",
  },
  {
    id: "connections",
    label: "Kết nối",
    icon: Link,
    description: "Quản lý kết nối với các nền tảng khác",
  },
  {
    id: "security",
    label: "Bảo mật",
    icon: Shield,
    description: "Cài đặt bảo mật và xác thực hai yếu tố",
  },
  {
    id: "notifications",
    label: "Thông báo",
    icon: Bell,
    description: "Tùy chỉnh thông báo email và ứng dụng",
  },
  {
    id: "api",
    label: "API & Webhooks",
    icon: Code,
    description: "Quản lý API keys và cấu hình webhooks",
  },
  {
    id: "billing",
    label: "Thanh toán",
    icon: CreditCard,
    description: "Quản lý gói dịch vụ và phương thức thanh toán",
  },
  {
    id: "appearance",
    label: "Giao diện",
    icon: Palette,
    description: "Tùy chỉnh giao diện và chủ đề",
  },
]

export default function SettingsSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-full md:w-64 space-y-1">
      {menuItems.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          className={cn(
            "w-full justify-start text-left font-normal h-auto py-3",
            activeTab === item.id ? "bg-muted" : "",
          )}
          onClick={() => setActiveTab(item.id)}
        >
          <div className="flex items-start">
            <item.icon className="h-5 w-5 mr-3 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground hidden md:block">{item.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 opacity-60" />
          </div>
        </Button>
      ))}
    </div>
  )
}
