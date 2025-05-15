"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, ChevronLeft, ChevronRight, ExternalLink, RefreshCw } from "lucide-react"

// Mock data cho lịch sử webhook
const mockWebhookHistory = [
  {
    id: "delivery_1",
    webhookId: "wh_1",
    webhookName: "Cập nhật CRM",
    event: "customer.created",
    status: "success",
    statusCode: 200,
    timestamp: "2023-06-20T14:20:00",
    duration: 245,
    requestPayload: {
      event: "customer.created",
      data: {
        id: "cus_123",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0901234567",
        createdAt: "2023-06-20T14:19:55",
      },
    },
    responsePayload: {
      status: "success",
      message: "Customer created successfully",
    },
  },
  {
    id: "delivery_2",
    webhookId: "wh_2",
    webhookName: "Thông báo tin nhắn mới",
    event: "message.created",
    status: "success",
    statusCode: 200,
    timestamp: "2023-06-20T15:45:00",
    duration: 189,
    requestPayload: {
      event: "message.created",
      data: {
        id: "msg_456",
        conversationId: "conv_789",
        sender: {
          id: "cus_123",
          name: "Nguyễn Văn A",
        },
        content: "Xin chào, tôi cần hỗ trợ về sản phẩm",
        createdAt: "2023-06-20T15:44:55",
      },
    },
    responsePayload: {
      status: "success",
      message: "Message received",
    },
  },
  {
    id: "delivery_3",
    webhookId: "wh_3",
    webhookName: "Đồng bộ hóa đơn",
    event: "invoice.created",
    status: "error",
    statusCode: 500,
    timestamp: "2023-06-15T10:10:00",
    duration: 3200,
    error: "Internal Server Error",
    requestPayload: {
      event: "invoice.created",
      data: {
        id: "inv_789",
        customerId: "cus_123",
        amount: 1500000,
        status: "pending",
        createdAt: "2023-06-15T10:09:55",
      },
    },
    responsePayload: {
      error: "Database connection failed",
    },
  },
  {
    id: "delivery_4",
    webhookId: "wh_4",
    webhookName: "Phân tích dữ liệu",
    event: "conversation.closed",
    status: "error",
    statusCode: 404,
    timestamp: "2023-06-19T09:30:00",
    duration: 1500,
    error: "Not Found",
    requestPayload: {
      event: "conversation.closed",
      data: {
        id: "conv_789",
        customerId: "cus_123",
        status: "closed",
        closedAt: "2023-06-19T09:29:55",
      },
    },
    responsePayload: {
      error: "Endpoint not found",
    },
  },
  {
    id: "delivery_5",
    webhookId: "wh_5",
    webhookName: "Tích hợp Slack",
    event: "customer.updated",
    status: "error",
    statusCode: 408,
    timestamp: "2023-06-18T11:15:00",
    duration: 30000,
    error: "Request Timeout",
    requestPayload: {
      event: "customer.updated",
      data: {
        id: "cus_456",
        name: "Trần Thị B",
        email: "tranthib@example.com",
        phone: "0909876543",
        updatedAt: "2023-06-18T11:14:55",
      },
    },
    responsePayload: null,
  },
]

export default function WebhookHistory() {
  const [history, setHistory] = useState(mockWebhookHistory)
  const [filters, setFilters] = useState({
    status: "all",
    webhook: "all",
    event: "all",
    search: "",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const itemsPerPage = 10

  // Danh sách các webhook duy nhất
  const uniqueWebhooks = Array.from(new Set(history.map((item) => item.webhookId))).map((webhookId) => {
    const webhook = history.find((item) => item.webhookId === webhookId)
    return {
      id: webhookId,
      name: webhook.webhookName,
    }
  })

  // Danh sách các sự kiện duy nhất
  const uniqueEvents = Array.from(new Set(history.map((item) => item.event)))

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
    setCurrentPage(1)
  }

  const handleViewDetail = (delivery) => {
    setSelectedDelivery(delivery)
    setDetailDialogOpen(true)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  const formatDuration = (ms) => {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  // Lọc lịch sử webhook
  const filteredHistory = history.filter((item) => {
    if (filters.status !== "all" && item.status !== filters.status) {
      return false
    }

    if (filters.webhook !== "all" && item.webhookId !== filters.webhook) {
      return false
    }

    if (filters.event !== "all" && item.event !== filters.event) {
      return false
    }

    if (filters.search && !item.webhookName.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    return true
  })

  // Phân trang
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)
  const paginatedHistory = filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Lịch sử Webhook</h3>
        <p className="text-sm text-muted-foreground">Xem lịch sử gửi webhook và trạng thái của chúng</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên webhook..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
        <Select value={filters.webhook} onValueChange={(value) => handleFilterChange("webhook", value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Webhook" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả webhook</SelectItem>
            {uniqueWebhooks.map((webhook) => (
              <SelectItem key={webhook.id} value={webhook.id}>
                {webhook.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.event} onValueChange={(value) => handleFilterChange("event", value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sự kiện" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả sự kiện</SelectItem>
            {uniqueEvents.map((event) => (
              <SelectItem key={event} value={event}>
                {event}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="success">Thành công</SelectItem>
            <SelectItem value="error">Lỗi</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="shrink-0">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Webhook</TableHead>
              <TableHead>Sự kiện</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Thời lượng</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Không tìm thấy dữ liệu lịch sử webhook
                </TableCell>
              </TableRow>
            ) : (
              paginatedHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.webhookName}</div>
                    <div className="text-xs text-muted-foreground">{item.webhookId}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.event}</Badge>
                  </TableCell>
                  <TableCell>
                    {item.status === "success" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Thành công ({item.statusCode})
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                        Lỗi ({item.statusCode})
                      </Badge>
                    )}
                    {item.error && <div className="text-xs text-red-600 mt-1">{item.error}</div>}
                  </TableCell>
                  <TableCell>
                    <div className="whitespace-nowrap">{formatDate(item.timestamp)}</div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`font-mono ${
                        item.duration > 5000 ? "text-amber-600" : item.duration > 10000 ? "text-red-600" : ""
                      }`}
                    >
                      {formatDuration(item.duration)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetail(item)}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến{" "}
            {Math.min(currentPage * itemsPerPage, filteredHistory.length)} trong {filteredHistory.length} kết quả
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Trang {currentPage} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Dialog chi tiết webhook delivery */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết gửi Webhook</DialogTitle>
          </DialogHeader>
          {selectedDelivery && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Webhook</h4>
                  <p>{selectedDelivery.webhookName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Sự kiện</h4>
                  <Badge variant="outline">{selectedDelivery.event}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Thời gian</h4>
                  <p>{formatDate(selectedDelivery.timestamp)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Trạng thái</h4>
                  {selectedDelivery.status === "success" ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Thành công ({selectedDelivery.statusCode})
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                      Lỗi ({selectedDelivery.statusCode})
                    </Badge>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium">Thời lượng</h4>
                  <p
                    className={`font-mono ${
                      selectedDelivery.duration > 5000
                        ? "text-amber-600"
                        : selectedDelivery.duration > 10000
                          ? "text-red-600"
                          : ""
                    }`}
                  >
                    {formatDuration(selectedDelivery.duration)}
                  </p>
                </div>
                {selectedDelivery.error && (
                  <div>
                    <h4 className="text-sm font-medium">Lỗi</h4>
                    <p className="text-red-600">{selectedDelivery.error}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Request Payload</h4>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs max-h-60">
                  {JSON.stringify(selectedDelivery.requestPayload, null, 2)}
                </pre>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Response Payload</h4>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs max-h-60">
                  {selectedDelivery.responsePayload
                    ? JSON.stringify(selectedDelivery.responsePayload, null, 2)
                    : "Không có phản hồi"}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
