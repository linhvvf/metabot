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
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RecurrenceSettingsProps {
  startDate?: Date
  endDate?: Date
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
  pattern?: string
  onPatternChange: (pattern: string) => void
}

export default function RecurrenceSettings({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  pattern = "daily",
  onPatternChange,
}: RecurrenceSettingsProps) {
  const [time, setTime] = useState("09:00")
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>(["monday", "wednesday", "friday"])
  const [monthlyOption, setMonthlyOption] = useState<"date" | "weekday">("date")
  const [monthDay, setMonthDay] = useState("1")
  const [weekOfMonth, setWeekOfMonth] = useState("first")
  const [weekday, setWeekday] = useState("monday")

  // Xử lý khi chọn/bỏ chọn ngày trong tuần
  const handleDayToggle = (day: string) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== day))
    } else {
      setDaysOfWeek([...daysOfWeek, day])
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ngày bắt đầu</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
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
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Tần suất</Label>
        <RadioGroup defaultValue={pattern} onValueChange={onPatternChange} className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">Hàng ngày</Label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Hàng tuần</Label>
            </div>
            {pattern === "weekly" && (
              <div className="ml-6 mt-2">
                <Label className="mb-2 block">Ngày trong tuần</Label>
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
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Hàng tháng</Label>
            </div>
            {pattern === "monthly" && (
              <div className="ml-6 mt-2 space-y-4">
                <RadioGroup
                  defaultValue={monthlyOption}
                  onValueChange={(val) => setMonthlyOption(val as "date" | "weekday")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="date" id="date-option" />
                    <div className="flex items-center">
                      <Label htmlFor="date-option" className="mr-2">
                        Ngày
                      </Label>
                      <Select value={monthDay} onValueChange={setMonthDay}>
                        <SelectTrigger className="w-16">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 31 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="ml-2">hàng tháng</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="weekday" id="weekday-option" />
                    <div className="flex items-center flex-wrap gap-2">
                      <Label htmlFor="weekday-option" className="mr-2">
                        Vào
                      </Label>
                      <Select value={weekOfMonth} onValueChange={setWeekOfMonth}>
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first">tuần đầu tiên</SelectItem>
                          <SelectItem value="second">tuần thứ hai</SelectItem>
                          <SelectItem value="third">tuần thứ ba</SelectItem>
                          <SelectItem value="fourth">tuần thứ tư</SelectItem>
                          <SelectItem value="last">tuần cuối cùng</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={weekday} onValueChange={setWeekday}>
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monday">thứ Hai</SelectItem>
                          <SelectItem value="tuesday">thứ Ba</SelectItem>
                          <SelectItem value="wednesday">thứ Tư</SelectItem>
                          <SelectItem value="thursday">thứ Năm</SelectItem>
                          <SelectItem value="friday">thứ Sáu</SelectItem>
                          <SelectItem value="saturday">thứ Bảy</SelectItem>
                          <SelectItem value="sunday">Chủ nhật</SelectItem>
                        </SelectContent>
                      </Select>
                      <span>hàng tháng</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Kết thúc</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày kết thúc (tùy chọn)</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={endDate} onSelect={onEndDateChange} initialFocus />
          </PopoverContent>
        </Popover>
        <p className="text-sm text-muted-foreground">
          Nếu không chọn ngày kết thúc, lịch trình sẽ tiếp tục cho đến khi bạn dừng lại thủ công.
        </p>
      </div>
    </div>
  )
}
