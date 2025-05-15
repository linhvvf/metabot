"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CampaignFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [channel, setChannel] = useState("")
  const [date, setDate] = useState<Date>()
  const [showFilters, setShowFilters] = useState(false)
  
  const handleReset = () => {
    setSearchTerm("")
    setChannel("")
    setDate(undefined)
  }
  
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm chiến dịch..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-9 w-9 p-0"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Xóa tìm kiếm</span>
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        <Select value={channel} onValueChange={setChannel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tất cả kênh" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả kênh</SelectItem>
            <SelectItem value="zalo">Zalo</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="multi">Đa kênh</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Bộ lọc nâng cao</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Bộ lọc nâng cao</h4>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hiệu suất</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="high">Cao (>50%)</SelectItem>
                    <SelectItem value="medium">Trung bình (25-50%)</SelectItem>
                    <SelectItem value="low">Thấp (<25%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Đối tượng</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="new">Khách hàng mới</SelectItem>
                    <SelectItem value="existing">Khách hàng hiện tại</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Đặt lại
                </Button>
                <Button size="sm" onClick={() => setShowFilters(false)}>
                  Áp dụng
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
