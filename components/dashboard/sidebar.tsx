"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
  Tag,
  Megaphone,
  Zap,
  FileUp,
  Webhook,
  Layers,
  Gauge,
  Code,
  Globe,
  Bell,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Cuộc hội thoại",
      icon: MessageSquare,
      href: "/dashboard/conversations",
      active: pathname === "/dashboard/conversations",
    },
    {
      label: "Khách hàng",
      icon: Users,
      href: "/dashboard/customers",
      active: pathname === "/dashboard/customers",
    },
    {
      label: "Nhân viên",
      icon: Users,
      href: "/dashboard/staff",
      active: pathname === "/dashboard/staff",
    },
    {
      label: "Chiến dịch",
      icon: Megaphone,
      href: "/dashboard/campaigns",
      active: pathname === "/dashboard/campaigns",
    },
    {
      label: "Khách hàng tiềm năng",
      icon: Users,
      href: "/dashboard/leads",
      active: pathname === "/dashboard/leads",
    },
    {
      label: "Lịch hẹn tin nhắn",
      icon: Calendar,
      href: "/dashboard/message-scheduler",
      active: pathname === "/dashboard/message-scheduler",
    },
    {
      label: "Mẫu tin nhắn",
      icon: FileText,
      href: "/dashboard/message-templates",
      active: pathname === "/dashboard/message-templates",
    },
    {
      label: "Mẫu AI",
      icon: Sparkles,
      href: "/dashboard/ai-templates",
      active: pathname === "/dashboard/ai-templates",
    },
    {
      label: "Tệp đính kèm",
      icon: FileUp,
      href: "/dashboard/attachments",
      active: pathname === "/dashboard/attachments",
    },
    {
      label: "Thẻ",
      icon: Tag,
      href: "/dashboard/tags",
      active: pathname === "/dashboard/tags",
    },
    {
      label: "Từ điển biệt ngữ",
      icon: Globe,
      href: "/dashboard/dialect-dictionary",
      active: pathname === "/dashboard/dialect-dictionary",
    },
    {
      label: "A/B Testing",
      icon: Layers,
      href: "/dashboard/ab-testing",
      active: pathname === "/dashboard/ab-testing",
    },
    {
      label: "Webhooks",
      icon: Webhook,
      href: "/dashboard/webhooks",
      active: pathname === "/dashboard/webhooks",
    },
    {
      label: "Quản lý API",
      icon: Code,
      href: "/dashboard/api-management",
      active: pathname === "/dashboard/api-management",
    },
    {
      label: "Hiệu suất API",
      icon: Gauge,
      href: "/dashboard/api-performance",
      active: pathname === "/dashboard/api-performance",
    },
    {
      label: "Báo cáo",
      icon: BarChart3,
      href: "/dashboard/reports",
      active: pathname === "/dashboard/reports",
    },
    {
      label: "Phân tích chiến dịch",
      icon: BarChart3,
      href: "/dashboard/campaign-analytics",
      active: pathname === "/dashboard/campaign-analytics",
    },
    {
      label: "Xu hướng",
      icon: BarChart3,
      href: "/dashboard/trends",
      active: pathname === "/dashboard/trends",
    },
    {
      label: "Thông báo",
      icon: Bell,
      href: "/dashboard/notifications",
      active: pathname === "/dashboard/notifications",
    },
    {
      label: "Cài đặt AI",
      icon: Zap,
      href: "/dashboard/ai-settings",
      active: pathname === "/dashboard/ai-settings",
    },
    {
      label: "Cài đặt",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
    {
      label: "Thanh toán",
      icon: CreditCard,
      href: "/dashboard/billing",
      active: pathname === "/dashboard/billing",
    },
  ]

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          {isOpen ? <MessageSquare className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        </Button>
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isMobile ? "shadow-lg" : "",
          className,
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Zap className="h-5 w-5 text-primary" />
            <span>Metabot.vn</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  route.active ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </>
  )
}

// Đổi tên và export default
export const DashboardSidebar = Sidebar
export default DashboardSidebar
