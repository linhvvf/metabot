"use client"

import { useState } from "react"
import { CalendarIcon, RefreshCwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export function WebhookFilters() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [webhookType, setWebhookType] = useState<string>("all")
  const [dateRange, setDateRange] = useState<string>("7d")

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chọn khoảng thời gian" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="24h">24 giờ qua</SelectItem>
          <SelectItem value="7d">7 ngày qua</SelectItem>
          <SelectItem value="30d">30 ngày qua</SelectItem>
          <SelectItem value="90d">90 ngày qua</SelectItem>
          <SelectItem value="custom">Tùy chỉnh</SelectItem>
        </SelectContent>
      </Select>

      {dateRange === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      )}

      <Select value={webhookType} onValueChange={setWebhookType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Loại webhook" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả webhook</SelectItem>
          <SelectItem value="conversation">Cuộc hội thoại</SelectItem>
          <SelectItem value="customer">Khách hàng</SelectItem>
          <SelectItem value="campaign">Chiến dịch</SelectItem>
          <SelectItem value="staff">Nhân viên</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon">
        <RefreshCwIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
