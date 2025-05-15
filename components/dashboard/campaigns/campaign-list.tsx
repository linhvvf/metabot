"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, Clock, Edit, MoreHorizontal, Pause, Play, Trash, Users, BarChart, Copy } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

// Dữ liệu mẫu
const campaignData = [
  {
    id: "camp-001",
    name: "Khuyến mãi mùa hè 2023",
    description: "Chương trình khuyến mãi đặc biệt cho mùa hè với nhiều ưu đãi hấp dẫn",
    status: "active",
    channel: "zalo",
    audience: 1250,
    sent: 1100,
    delivered: 980,
    opened: 720,
    clicked: 350,
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    progress: 88,
  },
  {
    id: "camp-002",
    name: "Thông báo sản phẩm mới",
    description: "Giới thiệu dòng sản phẩm mới ra mắt tháng 7/2023",
    status: "scheduled",
    channel: "facebook",
    audience: 2500,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    startDate: "2023-07-15",
    endDate: "2023-07-30",
    progress: 0,
  },
  {
    id: "camp-003",
    name: "Chăm sóc khách hàng quý 2",
    description: "Chiến dịch chăm sóc và thu thập phản hồi từ khách hàng",
    status: "completed",
    channel: "multi",
    audience: 3200,
    sent: 3200,
    delivered: 3050,
    opened: 2100,
    clicked: 980,
    startDate: "2023-04-01",
    endDate: "2023-06-30",
    progress: 100,
  },
  {
    id: "camp-004",
    name: "Khảo sát ý kiến khách hàng",
    description: "Thu thập ý kiến khách hàng về trải nghiệm sử dụng dịch vụ",
    status: "draft",
    channel: "zalo",
    audience: 5000,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    startDate: "",
    endDate: "",
    progress: 0,
  },
  {
    id: "camp-005",
    name: "Thông báo nâng cấp dịch vụ",
    description: "Thông báo về việc nâng cấp hệ thống và các tính năng mới",
    status: "active",
    channel: "multi",
    audience: 8500,
    sent: 4200,
    delivered: 4000,
    opened: 2800,
    clicked: 1200,
    startDate: "2023-06-15",
    endDate: "2023-07-15",
    progress: 49,
  },
]

// Hàm lọc chiến dịch theo trạng thái
const filterCampaigns = (campaigns: any[], status?: string) => {
  if (!status || status === "all") return campaigns
  return campaigns.filter((campaign) => campaign.status === status)
}

// Hàm định dạng trạng thái
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500">Đang hoạt động</Badge>
    case "scheduled":
      return <Badge className="bg-blue-500">Đã lên lịch</Badge>
    case "completed":
      return (
        <Badge variant="outline" className="text-gray-500">
          Đã hoàn thành
        </Badge>
      )
    case "draft":
      return <Badge variant="outline">Bản nháp</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

// Hàm định dạng kênh
const getChannelBadge = (channel: string) => {
  switch (channel) {
    case "zalo":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Zalo
        </Badge>
      )
    case "facebook":
      return (
        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
          Facebook
        </Badge>
      )
    case "multi":
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          Đa kênh
        </Badge>
      )
    default:
      return <Badge variant="outline">{channel}</Badge>
  }
}

interface CampaignListProps {
  status?: string
}

export default function CampaignList({ status }: CampaignListProps) {
  const [campaigns, setCampaigns] = useState(filterCampaigns(campaignData, status))

  // Xử lý xóa chiến dịch
  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
  }

  // Xử lý dừng/tiếp tục chiến dịch
  const handleTogglePause = (id: string) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status: campaign.status === "active" ? "paused" : "active" } : campaign,
      ),
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2">{campaign.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/dashboard/campaigns/${campaign.id}`} className="flex w-full items-center">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/dashboard/campaigns/${campaign.id}/analytics`} className="flex w-full items-center">
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>Phân tích</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Nhân bản</span>
                  </DropdownMenuItem>
                  {campaign.status === "active" && (
                    <DropdownMenuItem onClick={() => handleTogglePause(campaign.id)}>
                      <Pause className="mr-2 h-4 w-4" />
                      <span>Tạm dừng</span>
                    </DropdownMenuItem>
                  )}
                  {campaign.status === "paused" && (
                    <DropdownMenuItem onClick={() => handleTogglePause(campaign.id)}>
                      <Play className="mr-2 h-4 w-4" />
                      <span>Tiếp tục</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(campaign.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Xóa</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {getStatusBadge(campaign.status)}
              {getChannelBadge(campaign.channel)}
            </div>

            {(campaign.status === "active" || campaign.status === "completed") && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiến độ</span>
                  <span className="font-medium">{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Đã gửi</span>
                    <span className="font-medium">
                      {campaign.sent}/{campaign.audience}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Đã mở</span>
                    <span className="font-medium">
                      {campaign.opened} ({campaign.sent ? Math.round((campaign.opened / campaign.sent) * 100) : 0}%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {campaign.status === "scheduled" && (
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Bắt đầu: {new Date(campaign.startDate).toLocaleDateString("vi-VN")}</span>
              </div>
            )}

            {campaign.status === "draft" && (
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Users className="h-4 w-4 mr-1" />
                <span>Đối tượng: {campaign.audience.toLocaleString()} người</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {campaign.startDate ? (
                  <span>
                    {new Date(campaign.startDate).toLocaleDateString("vi-VN")}
                    {campaign.endDate && ` - ${new Date(campaign.endDate).toLocaleDateString("vi-VN")}`}
                  </span>
                ) : (
                  <span>Chưa lên lịch</span>
                )}
              </div>
              <Link href={`/dashboard/campaigns/${campaign.id}`}>
                <Button variant="ghost" size="sm">
                  Chi tiết
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
