"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, Search } from "lucide-react"

const categories = [
  { label: "Chào mừng", value: "chào mừng" },
  { label: "Tiếp thị", value: "tiếp thị" },
  { label: "Nhắc nhở", value: "nhắc nhở" },
  { label: "Cảm ơn", value: "cảm ơn" },
  { label: "Phản hồi", value: "phản hồi" },
]

const channels = [
  { label: "Zalo", value: "zalo" },
  { label: "Messenger", value: "messenger" },
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
]

export function TemplateFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const toggleChannel = (value: string) => {
    setSelectedChannels((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <div className="flex gap-2 items-center">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Tìm kiếm mẫu tin nhắn..." className="w-[250px] pl-9" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-2">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
            {(selectedCategories.length > 0 || selectedChannels.length > 0) && (
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                {selectedCategories.length + selectedChannels.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Danh mục</DropdownMenuLabel>
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.value}
              checked={selectedCategories.includes(category.value)}
              onCheckedChange={() => toggleCategory(category.value)}
            >
              {category.label}
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Kênh gửi</DropdownMenuLabel>
          {channels.map((channel) => (
            <DropdownMenuCheckboxItem
              key={channel.value}
              checked={selectedChannels.includes(channel.value)}
              onCheckedChange={() => toggleChannel(channel.value)}
            >
              {channel.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
