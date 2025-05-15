"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

interface ScheduleSettingsProps {
  type: string
  startDate?: Date
  endDate?: Date
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
}

export default function ScheduleSettings({
  type,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: ScheduleSettingsProps) {
  const [time, setTime] = useState("09:00")
  const [frequency, setFrequency] = useState("daily")
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>(["monday", "wednesday", "friday"])

  // Xử lý khi chọn/bỏ chọn ngày trong tuần
  const handleDayToggle = (day: string) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== day))
    } else {
      setDaysOfWeek([...daysOfWeek, day])
    }
  }

  // Hiển thị cài đặt dựa trên loại lịch trình
  const renderScheduleSettings = () => {
    switch (type) {
      case "now":
        return (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Chiến dịch sẽ được gửi ngay sau khi tạo</p>
          </div>
        )

      case "scheduled":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ngày gửi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={onStartDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Thời gian</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                Chiến dịch sẽ được gửi vào lúc {time} ngày{" "}
                {startDate ? format(startDate, "dd/MM/yyyy", { locale: vi }) : "..."}
              </p>
            </div>
          </div>
        )

      case "recurring":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tần suất</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tần suất" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                    <SelectItem value="monthly">Hàng tháng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Thời gian</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
            </div>

            {frequency === "weekly" && (
              <div className="space-y-2">
                <Label>Ngày trong tuần</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "monday", label: "T2" },
                    { value: "tuesday", label: "T3" },
                    { value: "wednesday", label: "T4" },
                    { value: "thursday", label: "T5" },
                    { value: "friday", label: "T6" },
                    { value: "saturday", label: "T7" },
                    { value: "sunday", label: "CN" },
                  ].map((day) => (
                    <div key={day.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={day.value}
                        checked={daysOfWeek.includes(day.value)}
                        onCheckedChange={() => handleDayToggle(day.value)}
                      />
                      <label
                        htmlFor={day.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {day.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ngày bắt đầu</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={onStartDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Ngày kết thúc</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={onEndDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return renderScheduleSettings()
}
