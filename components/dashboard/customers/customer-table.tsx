"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Edit, Trash, MessageSquare, Tag, Star, StarOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MobileCardView } from "@/components/ui/mobile-card-view"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for customers
const mockCustomers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    source: "Zalo",
    status: "active",
    tags: ["VIP", "Tiềm năng"],
    lastContact: "2023-05-01T10:30:00",
    avatar: "/placeholder.svg?key=e6uu7",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    source: "Facebook",
    status: "active",
    tags: ["Mới"],
    lastContact: "2023-05-02T14:20:00",
    avatar: "/placeholder.svg?key=uzw6q",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    source: "Zalo OA",
    status: "inactive",
    tags: ["Đã mua hàng"],
    lastContact: "2023-04-25T09:15:00",
    avatar: "/placeholder.svg?key=hdpys",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    source: "Website",
    status: "active",
    tags: ["VIP", "Đã mua hàng"],
    lastContact: "2023-05-03T11:45:00",
    avatar: "/placeholder.svg?key=678zf",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    source: "Zalo",
    status: "inactive",
    tags: ["Tiềm năng"],
    lastContact: "2023-04-20T16:30:00",
    avatar: "/placeholder.svg?key=pfaev",
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    email: "dothif@example.com",
    phone: "0956789012",
    source: "Facebook",
    status: "active",
    tags: ["Mới", "Tiềm năng"],
    lastContact: "2023-05-04T13:10:00",
    avatar: "/placeholder.svg?key=gmbi9",
  },
  {
    id: 7,
    name: "Vũ Văn G",
    email: "vuvang@example.com",
    phone: "0967890123",
    source: "Zalo OA",
    status: "active",
    tags: ["VIP"],
    lastContact: "2023-05-05T10:00:00",
    avatar: "/placeholder.svg?key=kim97",
  },
]

const getSourceColor = (source) => {
  switch (source) {
    case "Zalo":
      return "bg-blue-100 text-blue-800"
    case "Zalo OA":
      return "bg-green-100 text-green-800"
    case "Facebook":
      return "bg-indigo-100 text-indigo-800"
    case "Website":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTagColor = (tag) => {
  switch (tag) {
    case "VIP":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Tiềm năng":
      return "bg-green-100 text-green-800 border-green-200"
    case "Mới":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Đã mua hàng":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function CustomerTable({ onSelectCustomer, searchQuery }) {
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const { toast } = useToast()
  const isMobile = useMobile()

  // Filter customers based on search query
  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  )

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCustomers(filteredCustomers.map((customer) => customer.id))
    } else {
      setSelectedCustomers([])
    }
  }

  const handleSelectCustomer = (customerId, checked) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId])
    } else {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
    }
  }

  const handleDeleteCustomer = (customerId) => {
    toast({
      title: "Xóa khách hàng",
      description: "Đã xóa khách hàng thành công",
    })
    // Implement delete functionality
  }

  const handleMarkAsVIP = (customerId) => {
    toast({
      title: "Đánh dấu VIP",
      description: "Đã đánh dấu khách hàng là VIP",
    })
    // Implement VIP marking functionality
  }

  const handleRemoveVIP = (customerId) => {
    toast({
      title: "Gỡ đánh dấu VIP",
      description: "Đã gỡ đánh dấu VIP khỏi khách hàng",
    })
    // Implement VIP removal functionality
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <>
      {isMobile ? (
        <MobileCardView
          data={filteredCustomers}
          columns={[
            {
              id: "name",
              header: "Tên",
              cell: (customer) => customer.name,
            },
            {
              id: "email",
              header: "Email",
              cell: (customer) => customer.email,
            },
            {
              id: "phone",
              header: "Số điện thoại",
              cell: (customer) => customer.phone,
            },
            {
              id: "source",
              header: "Nguồn",
              cell: (customer) => customer.source,
            },
            {
              id: "tags",
              header: "Thẻ",
              cell: (customer) => (
                <div className="flex flex-wrap gap-1">
                  {customer.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ),
            },
            {
              id: "actions",
              header: "Thao tác",
              isAction: true,
              cell: (customer) => (
                <Button variant="ghost" size="sm" onClick={() => onSelectCustomer(customer)}>
                  Chi tiết
                </Button>
              ),
            },
          ]}
          onRowClick={(customer) => onSelectCustomer(customer)}
        />
      ) : (
        <div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={filteredCustomers.length > 0 && selectedCustomers.length === filteredCustomers.length}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead className="hidden md:table-cell">Nguồn</TableHead>
                  <TableHead className="hidden md:table-cell">Thẻ</TableHead>
                  <TableHead className="hidden md:table-cell">Liên hệ gần nhất</TableHead>
                  <TableHead className="hidden md:table-cell">Trạng thái</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Không tìm thấy khách hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <Checkbox
                          checked={selectedCustomers.includes(customer.id)}
                          onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked)}
                          aria-label={`Select ${customer.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium" onClick={() => onSelectCustomer(customer)}>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                            <AvatarFallback>
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500 hidden md:block">{customer.email}</div>
                            <div className="text-sm text-gray-500 md:hidden">{customer.phone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className={getSourceColor(customer.source)}>
                          {customer.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {customer.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className={getTagColor(tag)}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(customer.lastContact)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={customer.status === "active" ? "default" : "secondary"}
                          className={
                            customer.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {customer.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Mở menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onSelectCustomer(customer)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Nhắn tin
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Tag className="h-4 w-4 mr-2" />
                              Gắn thẻ
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {customer.tags.includes("VIP") ? (
                              <DropdownMenuItem onClick={() => handleRemoveVIP(customer.id)}>
                                <StarOff className="h-4 w-4 mr-2" />
                                Gỡ VIP
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleMarkAsVIP(customer.id)}>
                                <Star className="h-4 w-4 mr-2" />
                                Đánh dấu VIP
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              {selectedCustomers.length > 0
                ? `Đã chọn ${selectedCustomers.length} khách hàng`
                : `Hiển thị ${filteredCustomers.length} khách hàng`}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="outline" size="sm">
                Tiếp
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
