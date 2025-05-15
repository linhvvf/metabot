"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Danh sách các sự kiện webhook
const webhookEvents = [
  { id: "customer.created", name: "Khách hàng mới" },
  { id: "customer.updated", name: "Cập nhật khách hàng" },
  { id: "message.created", name: "Tin nhắn mới" },
  { id: "message.updated", name: "Cập nhật tin nhắn" },
  { id: "conversation.created", name: "Hội thoại mới" },
  { id: "conversation.closed", name: "Đóng hội thoại" },
  { id: "campaign.created", name: "Chiến dịch mới" },
  { id: "campaign.updated", name: "Cập nhật chiến dịch" },
  { id: "campaign.completed", name: "Hoàn thành chiến dịch" },
  { id: "invoice.created", name: "Tạo hóa đơn" },
  { id: "invoice.paid", name: "Thanh toán hóa đơn" },
]

export default function WebhookFilters({ filters, setFilters }) {
  const handleSelectEvent = (value) => {
    setFilters((prev) => ({ ...prev, event: value }))
  }

  const handleSelectStatus = (value) => {
    setFilters((prev) => ({ ...prev, status: value }))
  }

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleResetFilters = () => {
    setFilters({
      status: "all",
      event: "all",
      search: "",
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex-1 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm webhook..."
          className="pl-8"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      <Select value={filters.status} onValueChange={handleSelectStatus}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          <SelectItem value="active">Đang hoạt động</SelectItem>
          <SelectItem value="inactive">Không hoạt động</SelectItem>
          <SelectItem value="error">Lỗi</SelectItem>
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-[180px] justify-start">
            <Filter className="mr-2 h-4 w-4" />
            <span>{filters.event === "all" ? "Sự kiện" : "Đã lọc"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Lọc theo sự kiện</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={filters.event === "all"} onCheckedChange={() => handleSelectEvent("all")}>
            Tất cả sự kiện
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          {webhookEvents.map((event) => (
            <DropdownMenuCheckboxItem
              key={event.id}
              checked={filters.event === event.id}
              onCheckedChange={() => handleSelectEvent(event.id)}
            >
              {event.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        className="md:w-auto w-full"
        size="sm"
        onClick={handleResetFilters}
        disabled={filters.status === "all" && filters.event === "all" && !filters.search}
      >
        Đặt lại bộ lọc
      </Button>
    </div>
  )
}
