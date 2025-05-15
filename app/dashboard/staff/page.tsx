"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Plus, Download, Search, Filter, Users } from "lucide-react"
import StaffTable from "@/components/dashboard/staff/staff-table"
import StaffFilters from "@/components/dashboard/staff/staff-filters"
import StaffAddModal from "@/components/dashboard/staff/staff-add-modal"
import StaffGroupsModal from "@/components/dashboard/staff/staff-groups-modal"
import { useToast } from "@/hooks/use-toast"

export default function StaffPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isGroupsModalOpen, setIsGroupsModalOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff)
    setIsAddModalOpen(true)
  }

  const handleExportData = () => {
    toast({
      title: "Xuất dữ liệu",
      description: "Đang xuất dữ liệu nhân viên...",
    })
    // Implement export functionality
  }

  const handleAddStaff = () => {
    setSelectedStaff(null)
    setIsAddModalOpen(true)
  }

  const handleManageGroups = () => {
    setIsGroupsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý nhân viên</h1>
          <p className="text-gray-500">Quản lý và phân quyền nhân viên trong hệ thống</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Xuất
          </Button>
          <Button variant="outline" size="sm" onClick={handleManageGroups}>
            <Users className="h-4 w-4 mr-2" />
            Quản lý nhóm
          </Button>
          <Button size="sm" onClick={handleAddStaff}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm nhân viên
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
              <TabsTrigger value="inactive">Không hoạt động</TabsTrigger>
              <TabsTrigger value="admin">Quản trị viên</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm nhân viên..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFilter}
              className={isFilterOpen ? "bg-blue-50 text-blue-600" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isFilterOpen && <StaffFilters />}

        <StaffTable onSelectStaff={handleStaffSelect} searchQuery={searchQuery} />
      </Card>

      {isAddModalOpen && (
        <StaffAddModal staff={selectedStaff} isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      )}

      {isGroupsModalOpen && <StaffGroupsModal isOpen={isGroupsModalOpen} onClose={() => setIsGroupsModalOpen(false)} />}
    </div>
  )
}
