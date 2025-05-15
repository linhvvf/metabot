"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function GuideSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Mô phỏng dữ liệu tìm kiếm - trong thực tế sẽ lấy từ API hoặc tệp JSON
  const searchData = [
    {
      group: "Tổng quan",
      items: [
        { title: "Giới thiệu", href: "/guide" },
        { title: "Bắt đầu sử dụng", href: "/guide/getting-started" },
        { title: "Giao diện người dùng", href: "/guide/user-interface" },
      ],
    },
    {
      group: "Quản lý hội thoại",
      items: [
        { title: "Tổng quan hội thoại", href: "/guide/conversations/overview" },
        { title: "Trả lời tin nhắn", href: "/guide/conversations/replying" },
        { title: "Sử dụng AI gợi ý", href: "/guide/conversations/ai-suggestions" },
      ],
    },
    // Thêm các nhóm khác tương tự
  ]

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Tìm kiếm hướng dẫn...</span>
        <span className="sr-only">Tìm kiếm hướng dẫn</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Tìm kiếm hướng dẫn..." />
        <CommandList>
          <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
          {searchData.map((group) => (
            <CommandGroup key={group.group} heading={group.group}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => {
                    router.push(item.href)
                    setOpen(false)
                  }}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
