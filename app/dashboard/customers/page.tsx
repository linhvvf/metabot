"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Plus, Download, Upload, Search, Filter, MoreHorizontal } from "lucide-react"
import CustomerTable from "@/components/dashboard/customers/customer-table"
import CustomerFilters from "@/components/dashboard/customers/customer-filters"
import CustomerTagManager from "@/components/dashboard/customers/customer-tag-manager"
import CustomerDetailModal from "@/components/dashboard/customers/customer-detail-modal"
import { useToast } from "@/hooks/use-toast"

export default function CustomersPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
    if (isTagManagerOpen) setIsTagManagerOpen(false)
  }

  const toggleTagManager = () => {
    setIsTagManagerOpen(!isTagManagerOpen)
    if (isFilterOpen) setIsFilterOpen(false)
  }

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer)
  }

  const handleCloseModal = () => {
    setSelectedCustomer(null)
  }

  const handleExportData = () => {
    toast({
      title: "Xuất dữ liệu",
      description: "Đang xuất dữ liệu khách hàng...",
    })
    // Implement export functionality
  }

  const handleImportData = () => {
    toast({
      title: "Nhập dữ liệu",
      description: "Đang nhập dữ liệu khách hàng...",
    })
    // Implement import functionality
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý khách hàng</h1>
          <p className="text-gray-500">Quản lý và theo dõi thông tin khách hàng của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Xuất
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportData}>
            <Upload className="h-4 w-4 mr-2" />
            Nhập
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Thêm khách hàng
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
              <TabsTrigger value="vip">VIP</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm khách hàng..."
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
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTagManager}
              className={isTagManagerOpen ? "bg-blue-50 text-blue-600" : ""}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isFilterOpen && <CustomerFilters />}
        {isTagManagerOpen && <CustomerTagManager />}

        <CustomerTable onSelectCustomer={handleCustomerSelect} searchQuery={searchQuery} />
      </Card>

      {selectedCustomer && <CustomerDetailModal customer={selectedCustomer} onClose={handleCloseModal} />}
    </div>
  )
}
