"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, BarChart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ApiUsageByClientProps {
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

export default function ApiUsageByClient({ dateRange, filters }: ApiUsageByClientProps) {
  const [sortBy, setSortBy] = useState<string>("requests")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const clients = [
    {
      clientId: "mobile-app-123",
      name: "Ứng dụng di động",
      requests: 580000,
      successRate: 99.7,
      avgResponseTime: 165,
      bandwidth: 12.5,
      lastActive: new Date(2023, 5, 10, 14, 32, 15),
    },
    {
      clientId: "web-dashboard-456",
      name: "Bảng điều khiển web",
      requests: 420000,
      successRate: 99.8,
      avgResponseTime: 210,
      bandwidth: 8.2,
      lastActive: new Date(2023, 5, 10, 14, 30, 45),
    },
    {
      clientId: "partner-api-789",
      name: "API đối tác",
      requests: 180000,
      successRate: 99.5,
      avgResponseTime: 230,
      bandwidth: 4.7,
      lastActive: new Date(2023, 5, 10, 14, 25, 10),
    },
    {
      clientId: "internal-tools-012",
      name: "Công cụ nội bộ",
      requests: 120000,
      successRate: 99.9,
      avgResponseTime: 120,
      bandwidth: 3.1,
      lastActive: new Date(2023, 5, 10, 14, 20, 30),
    },
    {
      clientId: "public-api-345",
      name: "API công khai",
      requests: 85000,
      successRate: 98.5,
      avgResponseTime: 280,
      bandwidth: 2.8,
      lastActive: new Date(2023, 5, 10, 14, 15, 20),
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

  const sortedClients = [...clients].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder === "asc" ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime()
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const formatNumber = (num: number) => {
    return num.toLocaleString("vi-VN")
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sử dụng API theo khách hàng</CardTitle>
        <CardDescription>Chi tiết sử dụng API của từng khách hàng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  <Button variant="ghost" onClick={() => handleSort("name")} className="px-0 font-medium">
                    Khách hàng
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
                  <Button variant="ghost" onClick={() => handleSort("successRate")} className="px-0 font-medium">
                    Tỷ lệ thành công
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
                  <Button variant="ghost" onClick={() => handleSort("bandwidth")} className="px-0 font-medium">
                    Băng thông (GB)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("lastActive")} className="px-0 font-medium">
                    Hoạt động gần đây
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedClients.map((client) => (
                <TableRow key={client.clientId}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{client.name}</span>
                      <span className="text-xs text-muted-foreground">{client.clientId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatNumber(client.requests)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          client.successRate < 99
                            ? "text-destructive"
                            : client.successRate < 99.5
                              ? "text-amber-500"
                              : ""
                        }
                      >
                        {client.successRate}%
                      </span>
                      <Progress
                        value={client.successRate}
                        className="h-2 w-16"
                        indicatorClassName={
                          client.successRate < 99
                            ? "bg-destructive"
                            : client.successRate < 99.5
                              ? "bg-amber-500"
                              : undefined
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell>{client.avgResponseTime} ms</TableCell>
                  <TableCell>{client.bandwidth} GB</TableCell>
                  <TableCell>{formatDate(client.lastActive)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`#client-details-${client.clientId}`}>
                        <BarChart className="h-4 w-4" />
                        <span className="sr-only">Xem chi tiết</span>
                      </a>
                    </Button>
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
