"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DialectFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [region, setRegion] = useState("")
  const [category, setCategory] = useState("")

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm biệt ngữ..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Select value={region} onValueChange={setRegion}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Vùng miền" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Vùng miền</SelectLabel>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="north">Miền Bắc</SelectItem>
            <SelectItem value="central">Miền Trung</SelectItem>
            <SelectItem value="south">Miền Nam</SelectItem>
            <SelectItem value="nationwide">Toàn quốc</SelectItem>
            <SelectItem value="internet">Internet</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Danh mục" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Danh mục</SelectLabel>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="food">Ẩm thực</SelectItem>
            <SelectItem value="address">Xưng hô</SelectItem>
            <SelectItem value="idiom">Thành ngữ</SelectItem>
            <SelectItem value="action">Hành động</SelectItem>
            <SelectItem value="vocabulary">Từ vựng</SelectItem>
            <SelectItem value="slang">Tiếng lóng</SelectItem>
            <SelectItem value="internet">Ngôn ngữ mạng</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
