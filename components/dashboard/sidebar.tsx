"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Calendar,
  Clock,
  Download,
  FileText,
  HelpCircle,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Zap,
  File,
  Paperclip,
  TrendingUp,
  Webhook,
  KeyRound,
  Bell,
} from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      variant: "default",
    },
    {
      title: "Hội thoại",
      icon: MessageSquare,
      href: "/dashboard/conversations",
      variant: "default",
    },
    {
      title: "Khách hàng",
      icon: Users,
      href: "/dashboard/customers",
      variant: "default",
    },
    {
      title: "Nhân viên",
      icon: Users,
      href: "/dashboard/staff",
      variant: "ghost",
    },
    {
      title: "Chiến dịch",
      icon: Zap,
      href: "/dashboard/campaigns",
      variant: "ghost",
    },
    {
      title: "Mẫu tin nhắn",
      icon: File,
      href: "/dashboard/message-templates",
      variant: "ghost",
    },
    {
      title: "Tệp đính kèm",
      icon: Paperclip,
      href: "/dashboard/attachments",
      variant: "ghost",
    },
    {
      title: "Hiệu quả chiến dịch",
      icon: BarChart3,
      href: "/dashboard/campaign-analytics",
      variant: "ghost",
    },
    {
      title: "Phân tích xu hướng",
      icon: TrendingUp,
      href: "/dashboard/trends",
      variant: "ghost",
    },
    {
      title: "Báo cáo",
      icon: FileText,
      href: "/dashboard/reports",
      variant: "ghost",
    },
    {
      title: "Báo cáo tự động",
      icon: Clock,
      href: "/dashboard/reports/scheduled",
      variant: "ghost",
    },
    {
      title: "Xuất báo cáo",
      icon: Download,
      href: "/dashboard/reports/export",
      variant: "ghost",
    },
    {
      title: "Webhooks",
      href: "/dashboard/webhooks",
      icon: Webhook,
      variant: "default",
    },
    {
      title: "Lịch hẹn",
      icon: Calendar,
      href: "/dashboard/calendar",
      variant: "ghost",
    },
    {
      title: "Hướng dẫn sử dụng",
      icon: HelpCircle,
      href: "/guide",
      variant: "ghost",
    },
    {
      title: "Cài đặt",
      icon: Settings,
      href: "/dashboard/settings",
      variant: "ghost",
    },
    {
      title: "API Management",
      href: "/dashboard/api-management",
      icon: KeyRound,
      variant: "default",
    },
    {
      title: "Thông báo",
      href: "/dashboard/notifications",
      icon: Bell,
      variant: "default",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-6 w-6" />
          <span>Metabot.vn</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                route.variant === "default" ? "font-medium" : "font-normal",
                pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <route.icon className="h-4 w-4" />
              <span>{route.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
