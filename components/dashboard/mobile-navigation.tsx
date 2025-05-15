"use client"

import { useState } from "react"
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
  Menu,
  MessageSquare,
  Settings,
  Users,
  Zap,
  File,
  Paperclip,
  TrendingUp,
  Webhook,
  KeyRound,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function MobileNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

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
  ]

  const marketingRoutes = [
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
  ]

  const analyticsRoutes = [
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
  ]

  const systemRoutes = [
    {
      title: "Webhooks",
      href: "/dashboard/webhooks",
      icon: Webhook,
      variant: "default",
    },
    {
      title: "API Management",
      href: "/dashboard/api-management",
      icon: KeyRound,
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
  ]

  const NavItem = ({ route, onClick }) => (
    <Link
      href={route.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
        route.variant === "default" ? "font-medium" : "font-normal",
        pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted",
      )}
      onClick={onClick}
    >
      <route.icon className="h-4 w-4" />
      <span>{route.title}</span>
    </Link>
  )

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Mở menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] max-w-[300px] p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-5 w-5" />
              <span>Metabot.vn</span>
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Đóng menu</span>
            </Button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-3.5rem)] pb-10">
            <div className="px-2 py-2">
              {routes.map((route) => (
                <NavItem key={route.href} route={route} onClick={() => setOpen(false)} />
              ))}
            </div>

            <Accordion type="single" collapsible className="px-2">
              <AccordionItem value="marketing" className="border-0">
                <AccordionTrigger className="py-2 px-3 text-sm font-medium hover:no-underline">
                  Marketing
                </AccordionTrigger>
                <AccordionContent className="pb-1 pt-0 px-0">
                  {marketingRoutes.map((route) => (
                    <NavItem key={route.href} route={route} onClick={() => setOpen(false)} />
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="analytics" className="border-0">
                <AccordionTrigger className="py-2 px-3 text-sm font-medium hover:no-underline">
                  Phân tích
                </AccordionTrigger>
                <AccordionContent className="pb-1 pt-0 px-0">
                  {analyticsRoutes.map((route) => (
                    <NavItem key={route.href} route={route} onClick={() => setOpen(false)} />
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="system" className="border-0">
                <AccordionTrigger className="py-2 px-3 text-sm font-medium hover:no-underline">
                  Hệ thống
                </AccordionTrigger>
                <AccordionContent className="pb-1 pt-0 px-0">
                  {systemRoutes.map((route) => (
                    <NavItem key={route.href} route={route} onClick={() => setOpen(false)} />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
