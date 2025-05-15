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
import { Filter } from "lucide-react"

export function NotificationFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const notificationTypes = [
    { value: "message", label: "Tin nhắn" },
    { value: "customer", label: "Khách hàng" },
    { value: "campaign", label: "Chiến dịch" },
    { value: "api", label: "API" },
    { value: "report", label: "Báo cáo" },
    { value: "system", label: "Hệ thống" },
  ]

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative">
        <Input
          placeholder="Tìm kiếm thông báo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[250px]"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Bộ lọc</span>
            {selectedTypes.length > 0 && (
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                {selectedTypes.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Loại thông báo</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notificationTypes.map((type) => (
            <DropdownMenuCheckboxItem
              key={type.value}
              checked={selectedTypes.includes(type.value)}
              onCheckedChange={() => toggleType(type.value)}
            >
              {type.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
