"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, X, Edit2, Check, Users, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for groups
const mockGroups = [
  {
    id: 1,
    name: "Quản trị viên",
    description: "Nhóm có toàn quyền trên hệ thống",
    members: [1],
    permissions: ["all"],
  },
  {
    id: 2,
    name: "Quản lý CSKH",
    description: "Quản lý nhóm chăm sóc khách hàng",
    members: [2, 5],
    permissions: ["conversations", "customers", "reports"],
  },
  {
    id: 3,
    name: "Nhân viên CSKH",
    description: "Nhân viên chăm sóc khách hàng",
    members: [3, 6],
    permissions: ["conversations"],
  },
  {
    id: 4,
    name: "Nhân viên bán hàng",
    description: "Nhân viên phòng bán hàng",
    members: [4],
    permissions: ["conversations", "customers"],
  },
]

// Mock data for staff members
const mockStaff = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "admin",
    avatar: "/placeholder.svg?key=staff1",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    role: "manager",
    avatar: "/placeholder.svg?key=staff2",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    role: "agent",
    avatar: "/placeholder.svg?key=staff3",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    role: "agent",
    avatar: "/placeholder.svg?key=staff4",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    role: "manager",
    avatar: "/placeholder.svg?key=staff5",
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    email: "dothif@example.com",
    role: "agent",
    avatar: "/placeholder.svg?key=staff6",
  },
]

export default function StaffGroupsModal({ isOpen, onClose }) {
  const [groups, setGroups] = useState(mockGroups)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")
  const { toast } = useToast()

  const handleAddGroup = () => {
    if (newGroupName.trim() === "") {
      toast({
        title: "Lỗi",
        description: "Tên nhóm không được để trống",
        variant: "destructive",
      })
      return
    }

    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      description: newGroupDescription,
      members: [],
      permissions: [],
    }

    setGroups([...groups, newGroup])
    setNewGroupName("")
    setNewGroupDescription("")
    toast({
      title: "Thành công",
      description: `Đã thêm nhóm "${newGroupName}"`,
    })
  }

  const handleDeleteGroup = (groupId) => {
    setGroups(groups.filter((group) => group.id !== groupId))
    toast({
      title: "Thành công",
      description: "Đã xóa nhóm",
    })
  }

  const handleEditGroup = (group) => {
    setSelectedGroup(group)
    setIsEditing(true)
    setNewGroupName(group.name)
    setNewGroupDescription(group.description)
  }

  const handleSaveEdit = () => {
    if (newGroupName.trim() === "") {
      toast({
        title: "Lỗi",
        description: "Tên nhóm không được để trống",
        variant: "destructive",
      })
      return
    }

    setGroups(
      groups.map((group) =>
        group.id === selectedGroup.id ? { ...group, name: newGroupName, description: newGroupDescription } : group,
      ),
    )
    setIsEditing(false)
    setSelectedGroup(null)
    setNewGroupName("")
    setNewGroupDescription("")
    toast({
      title: "Thành công",
      description: "Đã cập nhật nhóm",
    })
  }

  const handleSelectGroup = (group) => {
    setSelectedGroup(group)
    setIsEditing(false)
  }

  const handleAddMember = (groupId, memberId) => {
    setGroups(
      groups.map((group) => (group.id === groupId ? { ...group, members: [...group.members, memberId] } : group)),
    )
    toast({
      title: "Thành công",
      description: "Đã thêm thành viên vào nhóm",
    })
  }

  const handleRemoveMember = (groupId, memberId) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...group, members: group.members.filter((id) => id !== memberId) } : group,
      ),
    )
    toast({
      title: "Thành công",
      description: "Đã xóa thành viên khỏi nhóm",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quản lý nhóm nhân viên</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="groups" className="mt-4">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="groups">Danh sách nhóm</TabsTrigger>
            <TabsTrigger value="members">Thành viên</TabsTrigger>
          </TabsList>

          <TabsContent value="groups">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 border-r pr-4">
                <div className="mb-4">
                  <Label htmlFor="group-search" className="mb-2 block">
                    Tìm kiếm nhóm
                  </Label>
                  <Input id="group-search" placeholder="Tên nhóm..." />
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className={`p-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                        selectedGroup?.id === group.id ? "bg-blue-50 border-blue-200" : ""
                      }`}
                      onClick={() => handleSelectGroup(group)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{group.name}</div>
                        <Badge>{group.members.length} thành viên</Badge>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{group.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Label htmlFor="new-group" className="mb-2 block">
                    Thêm nhóm mới
                  </Label>
                  <div className="space-y-2">
                    <Input
                      id="new-group"
                      placeholder="Tên nhóm"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                    />
                    <Input
                      placeholder="Mô tả (tùy chọn)"
                      value={newGroupDescription}
                      onChange={(e) => setNewGroupDescription(e.target.value)}
                    />
                    <Button onClick={handleAddGroup} className="w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Thêm nhóm
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                {selectedGroup ? (
                  <div>
                    {isEditing ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Chỉnh sửa nhóm</h3>
                        <div className="space-y-2">
                          <Label htmlFor="edit-group-name">Tên nhóm</Label>
                          <Input
                            id="edit-group-name"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-group-description">Mô tả</Label>
                          <Input
                            id="edit-group-description"
                            value={newGroupDescription}
                            onChange={(e) => setNewGroupDescription(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditing(false)
                              setNewGroupName("")
                              setNewGroupDescription("")
                            }}
                          >
                            Hủy
                          </Button>
                          <Button onClick={handleSaveEdit}>
                            <Check className="h-4 w-4 mr-1" />
                            Lưu
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">{selectedGroup.name}</h3>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditGroup(selectedGroup)}>
                              <Edit2 className="h-4 w-4 mr-1" />
                              Chỉnh sửa
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteGroup(selectedGroup.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Xóa
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{selectedGroup.description}</p>

                        <div className="mb-6">
                          <h4 className="font-medium mb-2">Quyền của nhóm</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedGroup.permissions.includes("all") ? (
                              <Badge className="bg-purple-100 text-purple-800 border-purple-200">Toàn quyền</Badge>
                            ) : (
                              selectedGroup.permissions.map((permission) => (
                                <Badge key={permission} className="bg-blue-100 text-blue-800 border-blue-200">
                                  {permission === "conversations"
                                    ? "Hội thoại"
                                    : permission === "customers"
                                      ? "Khách hàng"
                                      : permission === "reports"
                                        ? "Báo cáo"
                                        : permission === "settings"
                                          ? "Cài đặt"
                                          : permission}
                                </Badge>
                              ))
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Thành viên ({selectedGroup.members.length})</h4>
                            <Button variant="outline" size="sm">
                              <UserPlus className="h-4 w-4 mr-1" />
                              Thêm thành viên
                            </Button>
                          </div>

                          <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {selectedGroup.members.length === 0 ? (
                              <p className="text-gray-500 text-center py-4">Chưa có thành viên nào trong nhóm này</p>
                            ) : (
                              selectedGroup.members.map((memberId) => {
                                const member = mockStaff.find((s) => s.id === memberId)
                                return (
                                  <div
                                    key={memberId}
                                    className="flex items-center justify-between p-2 border rounded-md"
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                        <AvatarFallback>
                                          {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .substring(0, 2)
                                            .toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">{member.name}</div>
                                        <div className="text-xs text-gray-500">{member.email}</div>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => handleRemoveMember(selectedGroup.id, memberId)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <Users className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">Chọn một nhóm</h3>
                    <p className="text-gray-500 text-center mt-2">
                      Chọn một nhóm từ danh sách bên trái để xem chi tiết và quản lý thành viên
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Danh sách nhân viên</h3>
                <div className="relative w-64">
                  <Input placeholder="Tìm kiếm nhân viên..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockStaff.map((staff) => (
                  <div key={staff.id} className="border rounded-md p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
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
                        <div className="font-medium">{staff.name}</div>
                        <div className="text-sm text-gray-500">{staff.email}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <Badge
                        variant="outline"
                        className={
                          staff.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : staff.role === "manager"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {staff.role === "admin" ? "Quản trị viên" : staff.role === "manager" ? "Quản lý" : "Nhân viên"}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Thuộc nhóm:</h4>
                      <div className="flex flex-wrap gap-1">
                        {groups
                          .filter((group) => group.members.includes(staff.id))
                          .map((group) => (
                            <Badge key={group.id} variant="outline">
                              {group.name}
                            </Badge>
                          ))}
                        {!groups.some((group) => group.members.includes(staff.id)) && (
                          <span className="text-sm text-gray-500">Chưa thuộc nhóm nào</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
