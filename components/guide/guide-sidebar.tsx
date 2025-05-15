"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function GuideSidebar() {
  const pathname = usePathname()

  const guides = [
    {
      title: "Tổng quan",
      items: [
        {
          title: "Giới thiệu",
          href: "/guide",
        },
        {
          title: "Bắt đầu sử dụng",
          href: "/guide/getting-started",
        },
        {
          title: "Giao diện người dùng",
          href: "/guide/user-interface",
        },
      ],
    },
    {
      title: "Quản lý hội thoại",
      items: [
        {
          title: "Tổng quan hội thoại",
          href: "/guide/conversations/overview",
        },
        {
          title: "Trả lời tin nhắn",
          href: "/guide/conversations/replying",
        },
        {
          title: "Sử dụng AI gợi ý",
          href: "/guide/conversations/ai-suggestions",
        },
        {
          title: "Phân tích cảm xúc",
          href: "/guide/conversations/sentiment-analysis",
        },
      ],
    },
    {
      title: "Quản lý khách hàng",
      items: [
        {
          title: "Thêm khách hàng mới",
          href: "/guide/customers/adding",
        },
        {
          title: "Quản lý thông tin khách hàng",
          href: "/guide/customers/managing",
        },
        {
          title: "Phân loại và gắn thẻ",
          href: "/guide/customers/tagging",
        },
        {
          title: "Khách hàng tiềm năng",
          href: "/guide/customers/leads",
        },
      ],
    },
    {
      title: "Chiến dịch marketing",
      items: [
        {
          title: "Tạo chiến dịch mới",
          href: "/guide/campaigns/creating",
        },
        {
          title: "Lên lịch chiến dịch",
          href: "/guide/campaigns/scheduling",
        },
        {
          title: "Phân tích hiệu quả",
          href: "/guide/campaigns/analytics",
        },
        {
          title: "A/B Testing",
          href: "/guide/campaigns/ab-testing",
        },
      ],
    },
    {
      title: "Lập lịch tin nhắn",
      items: [
        {
          title: "Tin nhắn tự động",
          href: "/guide/message-scheduler/automated",
        },
        {
          title: "Tin nhắn định kỳ",
          href: "/guide/message-scheduler/recurring",
        },
        {
          title: "Chuỗi tin nhắn",
          href: "/guide/message-scheduler/sequences",
        },
      ],
    },
    {
      title: "Báo cáo và phân tích",
      items: [
        {
          title: "Báo cáo tổng quan",
          href: "/guide/reports/overview",
        },
        {
          title: "Báo cáo hiệu quả chiến dịch",
          href: "/guide/reports/campaign-analytics",
        },
        {
          title: "Xuất báo cáo",
          href: "/guide/reports/exporting",
        },
        {
          title: "Báo cáo tự động",
          href: "/guide/reports/scheduled",
        },
      ],
    },
    {
      title: "Quản lý nhân viên",
      items: [
        {
          title: "Thêm nhân viên mới",
          href: "/guide/staff/adding",
        },
        {
          title: "Phân quyền nhân viên",
          href: "/guide/staff/permissions",
        },
        {
          title: "Nhóm nhân viên",
          href: "/guide/staff/groups",
        },
      ],
    },
    {
      title: "Cài đặt hệ thống",
      items: [
        {
          title: "Cài đặt tài khoản",
          href: "/guide/settings/account",
        },
        {
          title: "Kết nối kênh chat",
          href: "/guide/settings/connections",
        },
        {
          title: "Cài đặt AI",
          href: "/guide/settings/ai",
        },
        {
          title: "Tích hợp API",
          href: "/guide/settings/api",
        },
      ],
    },
  ]

  return (
    <div className="w-full">
      <div className="space-y-6">
        {guides.map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">{section.title}</h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex w-full items-center rounded-md p-2 hover:underline",
                    pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
