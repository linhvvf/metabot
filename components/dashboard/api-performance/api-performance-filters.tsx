"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarIcon, FilterIcon } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ApiPerformanceFiltersProps {
  dateRange: {
    from: Date
    to: Date
  }
  onDateRangeChange: (range: { from: Date; to: Date }) => void
  filters: {
    endpoints: string[]
    statusCodes: string[]
    clients: string[]
  }
  onFiltersChange: (filters: {
    endpoints: string[]
    statusCodes: string[]
    clients: string[]
  }) => void
}

export default function ApiPerformanceFilters({
  dateRange,
  onDateRangeChange,
  filters,
  onFiltersChange,
}: ApiPerformanceFiltersProps) {
  const [date, setDate] = useState<{
    from: Date
    to: Date
  }>(dateRange)

  // Danh sách mẫu các endpoints, status codes và clients
  const endpoints = ["/api/messages", "/api/customers", "/api/campaigns", "/api/reports", "/api/webhooks", "/api/auth"]

  const statusCodes = [
    "200 OK",
    "201 Created",
    "400 Bad Request",
    "401 Unauthorized",
    "403 Forbidden",
    "404 Not Found",
    "429 Too Many Requests",
    "500 Internal Server Error",
  ]

  const clients = ["Mobile App", "Web Dashboard", "Partner Integration", "Internal Tools", "Public API"]

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newRange =
        !date.from || date.to ? { from: selectedDate, to: selectedDate } : { from: date.from, to: selectedDate }

      if (newRange.from && newRange.to && newRange.from > newRange.to) {
        newRange.to = newRange.from
      }

      setDate(newRange)
      if (newRange.from && newRange.to) {
        onDateRangeChange(newRange)
      }
    }
  }

  const predefinedRanges = [
    {
      label: "Hôm nay",
      value: "today",
      range: () => {
        const today = new Date()
        return { from: today, to: today }
      },
    },
    {
      label: "7 ngày qua",
      value: "7days",
      range: () => {
        const today = new Date()
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(today.getDate() - 7)
        return { from: sevenDaysAgo, to: today }
      },
    },
    {
      label: "30 ngày qua",
      value: "30days",
      range: () => {
        const today = new Date()
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(today.getDate() - 30)
        return { from: thirtyDaysAgo, to: today }
      },
    },
    {
      label: "Tháng này",
      value: "thisMonth",
      range: () => {
        const today = new Date()
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        return { from: firstDayOfMonth, to: today }
      },
    },
  ]

  const handlePredefinedRange = (rangeFunc: () => { from: Date; to: Date }) => {
    const newRange = rangeFunc()
    setDate(newRange)
    onDateRangeChange(newRange)
  }

  const handleFilterChange = (type: "endpoints" | "statusCodes" | "clients", value: string, checked: boolean) => {
    const newFilters = { ...filters }

    if (checked) {
      newFilters[type] = [...newFilters[type], value]
    } else {
      newFilters[type] = newFilters[type].filter((item) => item !== value)
    }

    onFiltersChange(newFilters)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("justify-start text-left font-normal", !date.from && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy", { locale: vi })} - {format(date.to, "dd/MM/yyyy", { locale: vi })}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy", { locale: vi })
              )
            ) : (
              <span>Chọn khoảng thời gian</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <div className="flex gap-2 flex-wrap">
              {predefinedRanges.map((range) => (
                <Button
                  key={range.value}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePredefinedRange(range.range)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
          <Calendar
            mode="range"
            selected={date}
            onSelect={(range) => {
              if (range) {
                setDate(range)
                if (range.from && range.to) {
                  onDateRangeChange(range)
                }
              }
            }}
            onDayClick={handleDateSelect}
            numberOfMonths={2}
            locale={vi}
          />
        </PopoverContent>
      </Popover>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <FilterIcon className="mr-2 h-4 w-4" />
            Bộ lọc
            {(filters.endpoints.length > 0 || filters.statusCodes.length > 0 || filters.clients.length > 0) && (
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                {filters.endpoints.length + filters.statusCodes.length + filters.clients.length}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bộ lọc hiệu suất API</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Endpoints</h3>
              <div className="grid grid-cols-1 gap-2">
                {endpoints.map((endpoint) => (
                  <div key={endpoint} className="flex items-center space-x-2">
                    <Checkbox
                      id={`endpoint-${endpoint}`}
                      checked={filters.endpoints.includes(endpoint)}
                      onCheckedChange={(checked) => handleFilterChange("endpoints", endpoint, checked as boolean)}
                    />
                    <Label htmlFor={`endpoint-${endpoint}`}>{endpoint}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Mã trạng thái</h3>
              <div className="grid grid-cols-2 gap-2">
                {statusCodes.map((code) => (
                  <div key={code} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${code}`}
                      checked={filters.statusCodes.includes(code)}
                      onCheckedChange={(checked) => handleFilterChange("statusCodes", code, checked as boolean)}
                    />
                    <Label htmlFor={`status-${code}`}>{code}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Khách hàng</h3>
              <div className="grid grid-cols-1 gap-2">
                {clients.map((client) => (
                  <div key={client} className="flex items-center space-x-2">
                    <Checkbox
                      id={`client-${client}`}
                      checked={filters.clients.includes(client)}
                      onCheckedChange={(checked) => handleFilterChange("clients", client, checked as boolean)}
                    />
                    <Label htmlFor={`client-${client}`}>{client}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => onFiltersChange({ endpoints: [], statusCodes: [], clients: [] })}>
              Đặt lại
            </Button>
            <Button
              onClick={() => document.querySelector<HTMLButtonElement>('[data-state="open"][aria-controls]')?.click()}
            >
              Áp dụng
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Select defaultValue="15min">
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Độ chi tiết" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1min">1 phút</SelectItem>
          <SelectItem value="5min">5 phút</SelectItem>
          <SelectItem value="15min">15 phút</SelectItem>
          <SelectItem value="1hour">1 giờ</SelectItem>
          <SelectItem value="1day">1 ngày</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
