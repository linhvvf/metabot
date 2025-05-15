"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Tag, Plus, Upload, Download, Check, X } from "lucide-react"

// Dữ liệu mẫu cho khách hàng
const customerData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    tags: ["VIP", "Đã mua hàng"],
    selected: false,
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    tags: ["Mới"],
    selected: false,
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    tags: ["Không hoạt động"],
    selected: false,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    tags: ["Tiềm năng", "Quan tâm sản phẩm A"],
    selected: false,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    tags: ["Đã mua hàng"],
    selected: false,
  },
]

// Dữ liệu mẫu cho chiến dịch
const campaignData = [
  {
    id: 1,
    name: "Khuyến mãi mùa hè 2023",
    status: "active",
    tags: ["Mùa hè", "Giảm giá đặc biệt"],
    selected: false,
  },
  {
    id: 2,
    name: "Thông báo sản phẩm mới",
    status: "scheduled",
    tags: ["Sản phẩm mới"],
    selected: false,
  },
  {
    id: 3,
    name: "Chăm sóc khách hàng quý 2",
    status: "completed",
    tags: ["Chăm sóc khách hàng"],
    selected: false,
  },
  {
    id: 4,
    name: "Khảo sát ý kiến khách hàng",
    status: "draft",
    tags: [],
    selected: false,
  },
]

// Dữ liệu mẫu cho thẻ
const availableTags = [
  { id: 1, name: "VIP", type: "customer" },
  { id: 2, name: "Tiềm năng", type: "customer" },
  { id: 3, name: "Mới", type: "customer" },
  { id: 4, name: "Đã mua hàng", type: "customer" },
  { id: 5, name: "Không hoạt động", type: "customer" },
  { id: 6, name: "Quan tâm sản phẩm A", type: "customer" },
  { id: 7, name: "Mùa hè", type: "campaign" },
  { id: 8, name: "Giảm giá đặc biệt", type: "campaign" },
  { id: 9, name: "Sản phẩm mới", type: "campaign" },
  { id: 10, name: "Chăm sóc khách hàng", type: "campaign" },
]

export default function BulkTagManager() {
  const [customers, setCustomers] = useState(customerData)
  const [campaigns, setCampaigns] = useState(campaignData)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("customers")
  const [selectedAction, setSelectedAction] = useState("add")
  const { toast } = useToast()

  // Lọc khách hàng theo từ khóa tìm kiếm
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  )

  // Lọc chiến dịch theo từ khóa tìm kiếm
  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Lọc thẻ theo loại đối tượng
  const filteredTags = availableTags.filter((tag) => tag.type === (activeTab === "customers" ? "customer" : "campaign"))

  // Xử lý chọn tất cả
  const handleSelectAll = (checked: boolean) => {
    if (activeTab === "customers") {
      setCustomers(customers.map((customer) => ({ ...customer, selected: checked })))
    } else {
      setCampaigns(campaigns.map((campaign) => ({ ...campaign, selected: checked })))
    }
  }

  // Xử lý chọn một đối tượng
  const handleSelectItem = (id: number, checked: boolean) => {
    if (activeTab === "customers") {
      setCustomers(customers.map((customer) => (customer.id === id ? { ...customer, selected: checked } : customer)))
    } else {
      setCampaigns(campaigns.map((campaign) => (campaign.id === id ? { ...campaign, selected: checked } : campaign)))
    }
  }

  // Xử lý chọn thẻ
  const handleSelectTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName))
    } else {
      setSelectedTags([...selectedTags, tagName])
    }
  }

  // Xử lý áp dụng thẻ
  const handleApplyTags = () => {
    if (selectedTags.length === 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ít nhất một thẻ để áp dụng",
        variant: "destructive",
      })
      return
    }

    if (activeTab === "customers") {
      const selectedCustomers = customers.filter((customer) => customer.selected)
      if (selectedCustomers.length === 0) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn ít nhất một khách hàng",
          variant: "destructive",
        })
        return
      }

      const updatedCustomers = customers.map((customer) => {
        if (customer.selected) {
          let tags = [...customer.tags]
          if (selectedAction === "add") {
            // Thêm thẻ mới (không trùng lặp)
            selectedTags.forEach((tag) => {
              if (!tags.includes(tag)) {
                tags.push(tag)
              }
            })
          } else {
            // Xóa thẻ
            tags = tags.filter((tag) => !selectedTags.includes(tag))
          }
          return { ...customer, tags }
        }
        return customer
      })

      setCustomers(updatedCustomers)
      toast({
        title: "Thành công",
        description: `Đã ${selectedAction === "add" ? "thêm" : "xóa"} thẻ cho ${selectedCustomers.length} khách hàng`,
      })
    } else {
      const selectedCampaigns = campaigns.filter((campaign) => campaign.selected)
      if (selectedCampaigns.length === 0) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn ít nhất một chiến dịch",
          variant: "destructive",
        })
        return
      }

      const updatedCampaigns = campaigns.map((campaign) => {
        if (campaign.selected) {
          let tags = [...campaign.tags]
          if (selectedAction === "add") {
            // Thêm thẻ mới (không trùng lặp)
            selectedTags.forEach((tag) => {
              if (!tags.includes(tag)) {
                tags.push(tag)
              }
            })
          } else {
            // Xóa thẻ
            tags = tags.filter((tag) => !selectedTags.includes(tag))
          }
          return { ...campaign, tags }
        }
        return campaign
      })

      setCampaigns(updatedCampaigns)
      toast({
        title: "Thành công",
        description: `Đã ${selectedAction === "add" ? "thêm" : "xóa"} thẻ cho ${selectedCampaigns.length} chiến dịch`,
      })
    }

    // Reset selection
    setSelectedTags([])
  }

  // Đếm số đối tượng đã chọn
  const selectedCount =
    activeTab === "customers"
      ? customers.filter((customer) => customer.selected).length
      : campaigns.filter((campaign) => campaign.selected).length

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Khách hàng</TabsTrigger>
          <TabsTrigger value="campaigns">Chiến dịch</TabsTrigger>
        </TabsList>

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Input
              placeholder={`Tìm kiếm ${activeTab === "customers" ? "khách hàng" : "chiến dịch"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-10 w-10"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Xóa tìm kiếm</span>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Nhập
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Xuất
            </Button>
          </div>
        </div>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách khách hàng</CardTitle>
              <CardDescription>Chọn khách hàng để áp dụng thẻ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={customers.length > 0 && customers.every((customer) => customer.selected)}
                          onCheckedChange={handleSelectAll}
                          aria-label="Chọn tất cả"
                        />
                      </TableHead>
                      <TableHead>Tên khách hàng</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Số điện thoại</TableHead>
                      <TableHead>Thẻ hiện tại</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          Không tìm thấy khách hàng nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <Checkbox
                              checked={customer.selected}
                              onCheckedChange={(checked) => handleSelectItem(customer.id, !!checked)}
                              aria-label={`Chọn ${customer.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {customer.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách chiến dịch</CardTitle>
              <CardDescription>Chọn chiến dịch để áp dụng thẻ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={campaigns.length > 0 && campaigns.every((campaign) => campaign.selected)}
                          onCheckedChange={handleSelectAll}
                          aria-label="Chọn tất cả"
                        />
                      </TableHead>
                      <TableHead>Tên chiến dịch</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thẻ hiện tại</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                          Không tìm thấy chiến dịch nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <Checkbox
                              checked={campaign.selected}
                              onCheckedChange={(checked) => handleSelectItem(campaign.id, !!checked)}
                              aria-label={`Chọn ${campaign.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{campaign.name}</TableCell>
                          <TableCell>
                            <Badge
                              variant={campaign.status === "active" ? "default" : "secondary"}
                              className={
                                campaign.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : campaign.status === "scheduled"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : campaign.status === "completed"
                                      ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {campaign.status === "active"
                                ? "Đang hoạt động"
                                : campaign.status === "scheduled"
                                  ? "Đã lên lịch"
                                  : campaign.status === "completed"
                                    ? "Đã hoàn thành"
                                    : "Bản nháp"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {campaign.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Áp dụng thẻ</CardTitle>
          <CardDescription>
            Chọn thẻ để {selectedAction === "add" ? "thêm vào" : "xóa khỏi"} các{" "}
            {activeTab === "customers" ? "khách hàng" : "chiến dịch"} đã chọn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Đã chọn {selectedCount} {activeTab === "customers" ? "khách hàng" : "chiến dịch"}
                </span>
              </div>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn hành động" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Thêm thẻ</SelectItem>
                  <SelectItem value="remove">Xóa thẻ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Chọn thẻ</Label>
              <div className="flex flex-wrap gap-2">
                {filteredTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag.name) ? "" : "hover:bg-muted hover:text-foreground"
                    }`}
                    onClick={() => handleSelectTag(tag.name)}
                  >
                    {selectedTags.includes(tag.name) && <Check className="h-3 w-3 mr-1" />}
                    {tag.name}
                  </Badge>
                ))}
                <Badge variant="outline" className="cursor-pointer border-dashed hover:bg-muted hover:text-foreground">
                  <Plus className="h-3 w-3 mr-1" />
                  Tạo thẻ mới
                </Badge>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleApplyTags} disabled={selectedCount === 0 || selectedTags.length === 0}>
                {selectedAction === "add" ? "Thêm thẻ" : "Xóa thẻ"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
