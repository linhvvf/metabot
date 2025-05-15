"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface PermissionManagerProps {
  apiKey: {
    id: string
    name: string
    permissions: string[]
  }
}

interface PermissionGroup {
  name: string
  description: string
  permissions: Permission[]
}

interface Permission {
  id: string
  name: string
  description: string
}

// Mock data for permissions
const permissionGroups: PermissionGroup[] = [
  {
    name: "Khách hàng",
    description: "Quyền liên quan đến quản lý khách hàng",
    permissions: [
      {
        id: "read:customers",
        name: "Đọc thông tin khách hàng",
        description: "Cho phép xem danh sách và thông tin chi tiết của khách hàng",
      },
      {
        id: "write:customers",
        name: "Chỉnh sửa thông tin khách hàng",
        description: "Cho phép tạo mới và cập nhật thông tin khách hàng",
      },
      {
        id: "delete:customers",
        name: "Xóa khách hàng",
        description: "Cho phép xóa khách hàng khỏi hệ thống",
      },
    ],
  },
  {
    name: "Cuộc hội thoại",
    description: "Quyền liên quan đến quản lý cuộc hội thoại",
    permissions: [
      {
        id: "read:conversations",
        name: "Đọc cuộc hội thoại",
        description: "Cho phép xem lịch sử cuộc hội thoại",
      },
      {
        id: "write:conversations",
        name: "Gửi tin nhắn",
        description: "Cho phép gửi tin nhắn trong cuộc hội thoại",
      },
      {
        id: "delete:conversations",
        name: "Xóa tin nhắn",
        description: "Cho phép xóa tin nhắn trong cuộc hội thoại",
      },
    ],
  },
  {
    name: "Chiến dịch",
    description: "Quyền liên quan đến quản lý chiến dịch marketing",
    permissions: [
      {
        id: "read:campaigns",
        name: "Đọc chiến dịch",
        description: "Cho phép xem danh sách và thông tin chi tiết của chiến dịch",
      },
      {
        id: "write:campaigns",
        name: "Tạo/chỉnh sửa chiến dịch",
        description: "Cho phép tạo mới và cập nhật thông tin chiến dịch",
      },
      {
        id: "delete:campaigns",
        name: "Xóa chiến dịch",
        description: "Cho phép xóa chiến dịch khỏi hệ thống",
      },
    ],
  },
  {
    name: "Báo cáo",
    description: "Quyền liên quan đến xem và xuất báo cáo",
    permissions: [
      {
        id: "read:reports",
        name: "Xem báo cáo",
        description: "Cho phép xem các báo cáo trong hệ thống",
      },
      {
        id: "export:reports",
        name: "Xuất báo cáo",
        description: "Cho phép xuất báo cáo ra các định dạng khác nhau",
      },
    ],
  },
  {
    name: "Nhân viên",
    description: "Quyền liên quan đến quản lý nhân viên",
    permissions: [
      {
        id: "read:staff",
        name: "Xem thông tin nhân viên",
        description: "Cho phép xem danh sách và thông tin chi tiết của nhân viên",
      },
      {
        id: "write:staff",
        name: "Quản lý nhân viên",
        description: "Cho phép thêm, sửa, xóa thông tin nhân viên",
      },
    ],
  },
  {
    name: "Cài đặt",
    description: "Quyền liên quan đến cài đặt hệ thống",
    permissions: [
      {
        id: "read:settings",
        name: "Xem cài đặt",
        description: "Cho phép xem các cài đặt hệ thống",
      },
      {
        id: "write:settings",
        name: "Thay đổi cài đặt",
        description: "Cho phép thay đổi các cài đặt hệ thống",
      },
    ],
  },
]

export function PermissionManager({ apiKey }: PermissionManagerProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(apiKey.permissions)
  const [searchTerm, setSearchTerm] = useState("")

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId])
    } else {
      setSelectedPermissions(selectedPermissions.filter((id) => id !== permissionId))
    }
  }

  const handleSavePermissions = () => {
    // In a real app, this would call an API to update the permissions
    console.log("Saving permissions:", selectedPermissions)

    toast({
      title: "Quyền truy cập đã được cập nhật",
      description: "Quyền truy cập cho API key đã được cập nhật thành công",
    })
  }

  const filteredPermissionGroups = permissionGroups
    .map((group) => ({
      ...group,
      permissions: group.permissions.filter(
        (permission) =>
          permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          permission.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((group) => group.permissions.length > 0)

  const handleSelectAll = (groupName: string, permissions: Permission[]) => {
    const allPermissionIds = permissions.map((p) => p.id)
    const allSelected = permissions.every((p) => selectedPermissions.includes(p.id))

    if (allSelected) {
      // Deselect all in this group
      setSelectedPermissions(selectedPermissions.filter((id) => !allPermissionIds.includes(id)))
    } else {
      // Select all in this group
      const newPermissions = [...selectedPermissions]
      allPermissionIds.forEach((id) => {
        if (!newPermissions.includes(id)) {
          newPermissions.push(id)
        }
      })
      setSelectedPermissions(newPermissions)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">Quản lý quyền truy cập</h3>
        <p className="text-sm text-muted-foreground">Thiết lập quyền truy cập cho API key: {apiKey.name}</p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm quyền..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {filteredPermissionGroups.map((group) => (
          <div key={group.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">{group.name}</h4>
                <p className="text-xs text-muted-foreground">{group.description}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleSelectAll(group.name, group.permissions)}>
                {group.permissions.every((p) => selectedPermissions.includes(p.id)) ? "Bỏ chọn tất cả" : "Chọn tất cả"}
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.permissions.map((permission) => (
                <div key={permission.id} className="flex items-start space-x-3 rounded-md border p-3">
                  <Checkbox
                    id={permission.id}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked)}
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor={permission.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.name}
                    </label>
                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSavePermissions}>Lưu thay đổi</Button>
    </div>
  )
}
