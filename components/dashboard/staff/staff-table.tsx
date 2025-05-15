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
import { MoreHorizontal, Edit, Trash, Key, UserX, UserCheck, ShieldAlert } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for staff members
const mockStaff = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    role: "admin",
    department: "Quản lý",
    status: "active",
    permissions: ["all"],
    lastActive: "2023-05-08T10:30:00",
    avatar: "/placeholder.svg?key=staff1",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    role: "manager",
    department: "CSKH",
    status: "active",
    permissions: ["customers", "conversations", "reports"],
    lastActive: "2023-05-08T09:15:00",
    avatar: "/placeholder.svg?key=staff2",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    role: "agent",
    department: "CSKH",
    status: "active",
    permissions: ["conversations"],
    lastActive: "2023-05-08T11:45:00",
    avatar: "/placeholder.svg?key=staff3",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    role: "agent",
    department: "Bán hàng",
    status: "inactive",
    permissions: ["conversations", "customers"],
    lastActive: "2023-05-05T14:20:00",
    avatar: "/placeholder.svg?key=staff4",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    role: "manager",
    department: "Bán hàng",
    status: "active",
    permissions: ["customers", "conversations", "reports"],
    lastActive: "2023-05-08T08:30:00",
    avatar: "/placeholder.svg?key=staff5",
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    email: "dothif@example.com",
    phone: "0956789012",
    role: "agent",
    department: "CSKH",
    status: "active",
    permissions: ["conversations"],
    lastActive: "2023-05-07T16:45:00",
    avatar: "/placeholder.svg?key=staff6",
  },
]

const getRoleBadge = (role) => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800"
    case "manager":
      return "bg-blue-100 text-blue-800"
    case "agent":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getRoleLabel = (role) => {
  switch (role) {
    case "admin":
      return "Quản trị viên"
    case "manager":
      return "Quản lý"
    case "agent":
      return "Nhân viên"
    default:
      return role
  }
}

export default function StaffTable({ onSelectStaff, searchQuery }) {
  const [selectedStaff, setSelectedStaff] = useState([])
  const { toast } = useToast()

  // Filter staff based on search query
  const filteredStaff = mockStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.phone.includes(searchQuery),
  )

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStaff(filteredStaff.map((staff) => staff.id))
    } else {
      setSelectedStaff([])
    }
  }

  const handleSelectStaff = (staffId, checked) => {
    if (checked) {
      setSelectedStaff([...selectedStaff, staffId])
    } else {
      setSelectedStaff(selectedStaff.filter((id) => id !== staffId))
    }
  }

  const handleDeleteStaff = (staffId) => {
    toast({
      title: "Xóa nhân viên",
      description: "Đã xóa nhân viên thành công",
    })
    // Implement delete functionality
  }

  const handleDeactivateStaff = (staffId) => {
    toast({
      title: "Vô hiệu hóa tài khoản",
      description: "Đã vô hiệu hóa tài khoản nhân viên",
    })
    // Implement deactivate functionality
  }

  const handleActivateStaff = (staffId) => {
    toast({
      title: "Kích hoạt tài khoản",
      description: "Đã kích hoạt tài khoản nhân viên",
    })
    // Implement activate functionality
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
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={filteredStaff.length > 0 && selectedStaff.length === filteredStaff.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Nhân viên</TableHead>
              <TableHead className="hidden md:table-cell">Vai trò</TableHead>
              <TableHead className="hidden md:table-cell">Phòng ban</TableHead>
              <TableHead className="hidden md:table-cell">Hoạt động gần nhất</TableHead>
              <TableHead className="hidden md:table-cell">Trạng thái</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Không tìm thấy nhân viên nào
                </TableCell>
              </TableRow>
            ) : (
              filteredStaff.map((staff) => (
                <TableRow key={staff.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedStaff.includes(staff.id)}
                      onCheckedChange={(checked) => handleSelectStaff(staff.id, checked)}
                      aria-label={`Select ${staff.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium" onClick={() => onSelectStaff(staff)}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                        <AvatarFallback>
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {staff.name}
                          {staff.role === "admin" && <ShieldAlert className="h-4 w-4 text-purple-600 inline ml-1" />}
                        </div>
                        <div className="text-sm text-gray-500 hidden md:block">{staff.email}</div>
                        <div className="text-sm text-gray-500 md:hidden">{staff.phone}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className={getRoleBadge(staff.role)}>
                      {getRoleLabel(staff.role)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{staff.department}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(staff.lastActive)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={staff.status === "active" ? "default" : "secondary"}
                      className={
                        staff.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {staff.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
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
                        <DropdownMenuItem onClick={() => onSelectStaff(staff)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="h-4 w-4 mr-2" />
                          Phân quyền
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {staff.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleDeactivateStaff(staff.id)}>
                            <UserX className="h-4 w-4 mr-2" />
                            Vô hiệu hóa
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateStaff(staff.id)}>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Kích hoạt
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteStaff(staff.id)}>
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
          {selectedStaff.length > 0
            ? `Đã chọn ${selectedStaff.length} nhân viên`
            : `Hiển thị ${filteredStaff.length} nhân viên`}
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
  )
}
