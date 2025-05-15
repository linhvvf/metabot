"use client"

import { useState } from "react"
import { ArrowUpDown, Calendar, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface ApiUsageHistoryProps {
  apiKeyId: string
}

// Mock data for API usage history
const mockApiUsage = [
  {
    id: "req_1",
    timestamp: "2023-06-10T14:22:10Z",
    endpoint: "/api/customers",
    method: "GET",
    status: 200,
    responseTime: 120,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "req_2",
    timestamp: "2023-06-10T14:20:05Z",
    endpoint: "/api/conversations",
    method: "POST",
    status: 201,
    responseTime: 150,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "req_3",
    timestamp: "2023-06-10T14:15:30Z",
    endpoint: "/api/customers/123",
    method: "GET",
    status: 200,
    responseTime: 100,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "req_4",
    timestamp: "2023-06-10T14:10:15Z",
    endpoint: "/api/campaigns",
    method: "GET",
    status: 200,
    responseTime: 130,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "req_5",
    timestamp: "2023-06-10T14:05:20Z",
    endpoint: "/api/reports",
    method: "GET",
    status: 403,
    responseTime: 90,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "req_6",
    timestamp: "2023-06-10T14:00:10Z",
    endpoint: "/api/customers/456",
    method: "PUT",
    status: 200,
    responseTime: 140,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "req_7",
    timestamp: "2023-06-10T13:55:30Z",
    endpoint: "/api/customers/789",
    method: "DELETE",
    status: 404,
    responseTime: 110,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "req_8",
    timestamp: "2023-06-10T13:50:45Z",
    endpoint: "/api/conversations/123",
    method: "GET",
    status: 200,
    responseTime: 125,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "req_9",
    timestamp: "2023-06-10T13:45:20Z",
    endpoint: "/api/settings",
    method: "GET",
    status: 401,
    responseTime: 95,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "req_10",
    timestamp: "2023-06-10T13:40:10Z",
    endpoint: "/api/campaigns/123",
    method: "PUT",
    status: 200,
    responseTime: 135,
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
]

export function ApiUsageHistory({ apiKeyId }: ApiUsageHistoryProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  })
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc"
  }>({
    key: "timestamp",
    direction: "desc",
  })
  const [filterMethod, setFilterMethod] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<number | null>(null)
  const [searchEndpoint, setSearchEndpoint] = useState("")

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    })
  }

  const filteredData = mockApiUsage.filter((item) => {
    const itemDate = new Date(item.timestamp)
    const matchesDateRange = !date || !date.from || (itemDate >= date.from && (!date.to || itemDate <= date.to))

    const matchesMethod = !filterMethod || item.method === filterMethod
    const matchesStatus = filterStatus === null || item.status === filterStatus
    const matchesEndpoint = !searchEndpoint || item.endpoint.toLowerCase().includes(searchEndpoint.toLowerCase())

    return matchesDateRange && matchesMethod && matchesStatus && matchesEndpoint
  })

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a]
    const bValue = b[sortConfig.key as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search by endpoint..."
            value={searchEndpoint}
            onChange={(e) => setSearchEndpoint(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date ? "text-muted-foreground" : "text-foreground",
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterMethod(null)}>All Methods</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterMethod("GET")}>GET</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterMethod("POST")}>POST</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterMethod("PUT")}>PUT</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterMethod("DELETE")}>DELETE</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterStatus(null)}>All Status Codes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus(200)}>200 OK</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus(400)}>400 Bad Request</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus(401)}>401 Unauthorized</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus(403)}>403 Forbidden</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus(404)}>404 Not Found</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus(500)}>500 Internal Server Error</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("timestamp")}>
                Timestamp
                <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
              </TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("endpoint")}>
                Endpoint
                <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                Status
                <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("responseTime")}>
                Response Time (ms)
                <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
              </TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>User Agent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{format(new Date(item.timestamp), "MMM dd, yyyy HH:mm:ss")}</TableCell>
                <TableCell>{item.method}</TableCell>
                <TableCell>{item.endpoint}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status >= 200 && item.status < 300
                        ? "success"
                        : item.status >= 400 && item.status < 500
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.responseTime}</TableCell>
                <TableCell>{item.ip}</TableCell>
                <TableCell className="max-w-[200px] truncate">{item.userAgent}</TableCell>
              </TableRow>
            ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No API usage history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
