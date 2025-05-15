"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ApiEndpointPerformanceProps {
  dateRange: {
    from: Date
    to: Date
  }
  filters: {
    endpoints: string[]
    statusCodes: string[]
    clients: string[]
  }
}

export default function ApiEndpointPerformance({ dateRange, filters }: ApiEndpointPerformanceProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<string>("requests")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const endpoints = [
    {
      endpoint: "/api/messages",
      requests: 458920,
      avgResponseTime: 145,
      p95ResponseTime: 320,
      errorRate: 0.2,
      successRate: 99.8,
    },
    {
      endpoint: "/api/customers",
      requests: 287450,
      avgResponseTime: 210,
      p95ResponseTime: 450,
      errorRate: 0.5,
      successRate: 99.5,
    },
    {
      endpoint: "/api/campaigns",
      requests: 124680,
      avgResponseTime: 320,
      p95ResponseTime: 680,
      errorRate: 0.8,
      successRate: 99.2,
    },
    {
      endpoint: "/api/reports",
      requests: 98540,
      avgResponseTime: 540,
      p95ResponseTime: 1200,
      errorRate: 1.2,
      successRate: 98.8,
    },
    {
      endpoint: "/api/webhooks",
      requests: 76320,
      avgResponseTime: 180,
      p95ResponseTime: 380,
      errorRate: 0.6,
      successRate: 99.4,
    },
    {
      endpoint: "/api/auth",
      requests: 65480,
      avgResponseTime: 120,
      p95ResponseTime: 250,
      errorRate: 1.5,
      successRate: 98.5,
    },
    {
      endpoint: "/api/settings",
      requests: 43210,
      avgResponseTime: 95,
      p95ResponseTime: 180,
      errorRate: 0.3,
      successRate: 99.7,
    },
    {
      endpoint: "/api/templates",
      requests: 32450,
      avgResponseTime: 230,
      p95ResponseTime: 480,
      errorRate: 0.7,
      successRate: 99.3,
    },
    {
      endpoint: "/api/analytics",
      requests: 28760,
      avgResponseTime: 480,
      p95ResponseTime: 950,
      errorRate: 1.0,
      successRate: 99.0,
    },
    {
      endpoint: "/api/files",
      requests: 18920,
      avgResponseTime: 350,
      p95ResponseTime: 720,
      errorRate: 1.8,
      successRate: 98.2,
    },
  ]

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const filteredEndpoints = endpoints.filter((endpoint) =>
    endpoint.endpoint.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedEndpoints = [...filteredEndpoints].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const formatNumber = (num: number) => {
    return num.toLocaleString("vi-VN")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiệu suất Endpoint</CardTitle>
        <CardDescription>Chi tiết hiệu suất của từng endpoint API</CardDescription>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm endpoint..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" onClick={() => handleSort("endpoint")} className="px-0 font-medium">
                    Endpoint
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("requests")} className="px-0 font-medium">
                    Yêu cầu
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("avgResponseTime")} className="px-0 font-medium">
                    Thời gian TB (ms)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("p95ResponseTime")} className="px-0 font-medium">
                    P95 (ms)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("errorRate")} className="px-0 font-medium">
                    Tỷ lệ lỗi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("successRate")} className="px-0 font-medium">
                    Tỷ lệ thành công
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEndpoints.map((endpoint) => (
                <TableRow key={endpoint.endpoint}>
                  <TableCell className="font-medium">{endpoint.endpoint}</TableCell>
                  <TableCell>{formatNumber(endpoint.requests)}</TableCell>
                  <TableCell>{endpoint.avgResponseTime} ms</TableCell>
                  <TableCell>{endpoint.p95ResponseTime} ms</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={endpoint.errorRate > 1 ? "text-destructive" : ""}>{endpoint.errorRate}%</span>
                      <Progress
                        value={endpoint.errorRate * 10}
                        className="h-2 w-16"
                        indicatorClassName={endpoint.errorRate > 1 ? "bg-destructive" : ""}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{endpoint.successRate}%</span>
                      <Progress value={endpoint.successRate} className="h-2 w-16" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                        <DropdownMenuItem>Xem lỗi</DropdownMenuItem>
                        <DropdownMenuItem>Xuất dữ liệu</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
