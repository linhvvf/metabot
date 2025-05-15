"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Search, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

interface ApiErrorTableProps {
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

export default function ApiErrorTable({ dateRange, filters }: ApiErrorTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<string>("timestamp")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Trong thực tế, dữ liệu này sẽ được lấy từ API dựa trên dateRange và filters
  const errors = [
    {
      id: "err-001",
      timestamp: new Date(2023, 4, 10, 14, 32, 15),
      endpoint: "/api/campaigns",
      statusCode: 500,
      errorMessage: "Internal Server Error: Database connection failed",
      clientId: "mobile-app-123",
      requestId: "req-abc-123",
      severity: "high",
    },
    {
      id: "err-002",
      timestamp: new Date(2023, 4, 10, 15, 12, 45),
      endpoint: "/api/customers",
      statusCode: 400,
      errorMessage: "Bad Request: Invalid customer ID format",
      clientId: "web-dashboard-456",
      requestId: "req-def-456",
      severity: "medium",
    },
    {
      id: "err-003",
      timestamp: new Date(2023, 4, 10, 15, 45, 22),
      endpoint: "/api/reports",
      statusCode: 429,
      errorMessage: "Too Many Requests: Rate limit exceeded",
      clientId: "partner-api-789",
      requestId: "req-ghi-789",
      severity: "low",
    },
    {
      id: "err-004",
      timestamp: new Date(2023, 4, 10, 16, 5, 10),
      endpoint: "/api/webhooks",
      statusCode: 401,
      errorMessage: "Unauthorized: Invalid API key",
      clientId: "external-service-012",
      requestId: "req-jkl-012",
      severity: "medium",
    },
    {
      id: "err-005",
      timestamp: new Date(2023, 4, 10, 16, 30, 5),
      endpoint: "/api/files",
      statusCode: 500,
      errorMessage: "Internal Server Error: File storage service unavailable",
      clientId: "mobile-app-123",
      requestId: "req-mno-345",
      severity: "high",
    },
    {
      id: "err-006",
      timestamp: new Date(2023, 4, 10, 17, 12, 33),
      endpoint: "/api/auth",
      statusCode: 403,
      errorMessage: "Forbidden: Insufficient permissions",
      clientId: "web-dashboard-456",
      requestId: "req-pqr-678",
      severity: "medium",
    },
    {
      id: "err-007",
      timestamp: new Date(2023, 4, 10, 17, 45, 18),
      endpoint: "/api/messages",
      statusCode: 404,
      errorMessage: "Not Found: Message ID does not exist",
      clientId: "partner-api-789",
      requestId: "req-stu-901",
      severity: "low",
    },
    {
      id: "err-008",
      timestamp: new Date(2023, 4, 10, 18, 2, 40),
      endpoint: "/api/campaigns",
      statusCode: 422,
      errorMessage: "Unprocessable Entity: Invalid campaign parameters",
      clientId: "mobile-app-123",
      requestId: "req-vwx-234",
      severity: "medium",
    },
    {
      id: "err-009",
      timestamp: new Date(2023, 4, 10, 18, 30, 15),
      endpoint: "/api/analytics",
      statusCode: 500,
      errorMessage: "Internal Server Error: Analytics service timeout",
      clientId: "web-dashboard-456",
      requestId: "req-yz1-567",
      severity: "high",
    },
    {
      id: "err-010",
      timestamp: new Date(2023, 4, 10, 19, 5, 22),
      endpoint: "/api/templates",
      statusCode: 400,
      errorMessage: "Bad Request: Template validation failed",
      clientId: "partner-api-789",
      requestId: "req-234-890",
      severity: "medium",
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

  const filteredErrors = errors.filter(
    (error) =>
      error.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.errorMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.requestId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedErrors = [...filteredErrors].sort((a, b) => {
    if (sortBy === "timestamp") {
      return sortOrder === "asc"
        ? a.timestamp.getTime() - b.timestamp.getTime()
        : b.timestamp.getTime() - a.timestamp.getTime()
    }

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lỗi API gần đây</CardTitle>
        <CardDescription>Danh sách các lỗi API gần đây và chi tiết</CardDescription>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm lỗi..."
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
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("timestamp")} className="px-0 font-medium">
                    Thời gian
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("endpoint")} className="px-0 font-medium">
                    Endpoint
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("statusCode")} className="px-0 font-medium">
                    Mã lỗi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" onClick={() => handleSort("errorMessage")} className="px-0 font-medium">
                    Thông báo lỗi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("clientId")} className="px-0 font-medium">
                    Client ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("severity")} className="px-0 font-medium">
                    Mức độ
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedErrors.map((error) => (
                <TableRow key={error.id}>
                  <TableCell>{format(error.timestamp, "HH:mm:ss, dd/MM/yyyy", { locale: vi })}</TableCell>
                  <TableCell>{error.endpoint}</TableCell>
                  <TableCell>{error.statusCode}</TableCell>
                  <TableCell className="font-medium">{error.errorMessage}</TableCell>
                  <TableCell>{error.clientId}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(error.severity)}>
                      {error.severity === "high" && "Cao"}
                      {error.severity === "medium" && "Trung bình"}
                      {error.severity === "low" && "Thấp"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`#error-details-${error.id}`}>
                        <ExternalLink className="h-4 w-4" />
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
