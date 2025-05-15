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
import { Search, Calendar, Filter, DownloadCloud } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function ScheduleFilters() {
  const [date, setDate] = useState<Date>()
  const [selectedChannels, setSelectedChannels] = useState(["zalo", "facebook", "multi"])

  const handleCheckedChange = (channel: string, checked: boolean) => {
    if (checked) {
      setSelectedChannels([...selectedChannels, channel])
    } else {
      setSelectedChannels(selectedChannels.filter((c) => c !== channel))
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
      <div className="relative flex-1 w-full md:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Tìm kiếm lịch trình..." className="w-full pl-8" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Kênh
              {selectedChannels.length < 3 ? ` (${selectedChannels.length})` : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Kênh liên lạc</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={selectedChannels.includes("zalo")}
              onCheckedChange={(checked) => handleCheckedChange("zalo", checked)}
            >
              Zalo
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedChannels.includes("facebook")}
              onCheckedChange={(checked) => handleCheckedChange("facebook", checked)}
            >
              Facebook
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedChannels.includes("multi")}
              onCheckedChange={(checked) => handleCheckedChange("multi", checked)}
            >
              Đa kênh
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select defaultValue="all">
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Loại lịch trình" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="one-time">Một lần</SelectItem>
            <SelectItem value="recurring">Định kỳ</SelectItem>
            <SelectItem value="sequence">Chuỗi tin nhắn</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "dd/MM/yyyy", { locale: vi }) : "Ngày"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        <Button variant="outline" size="sm" className="h-9">
          <DownloadCloud className="mr-2 h-4 w-4" />
          Xuất
        </Button>
      </div>
    </div>
  )
}
