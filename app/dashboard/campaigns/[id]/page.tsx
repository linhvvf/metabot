import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart, Edit, Pause, Play, Trash } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import CampaignOverview from "@/components/dashboard/campaigns/campaign-overview"
import CampaignMessages from "@/components/dashboard/campaigns/campaign-messages"
import CampaignAudience from "@/components/dashboard/campaigns/campaign-audience"
import CampaignSchedule from "@/components/dashboard/campaigns/campaign-schedule"

export const metadata: Metadata = {
  title: "Chi tiết chiến dịch | Metabot.vn",
  description: "Xem chi tiết và quản lý chiến dịch marketing",
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  // Trong thực tế, bạn sẽ lấy dữ liệu chiến dịch từ API dựa trên params.id
  const campaign = {
    id: params.id,
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
    createdAt: "2023-05-25",
    createdBy: "Nguyễn Văn A",
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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard/campaigns">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Quay lại</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{campaign.name}</h2>
            <p className="text-muted-foreground">{campaign.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/campaigns/${campaign.id}/analytics`}>
            <Button variant="outline">
              <BarChart className="mr-2 h-4 w-4" />
              Phân tích
            </Button>
          </Link>
          <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
          </Link>
          {campaign.status === "active" ? (
            <Button variant="outline">
              <Pause className="mr-2 h-4 w-4" />
              Tạm dừng
            </Button>
          ) : (
            <Button variant="outline">
              <Play className="mr-2 h-4 w-4" />
              Tiếp tục
            </Button>
          )}
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Xóa
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trạng thái</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              {getStatusBadge(campaign.status)}
              <div className="mt-2 text-2xl font-bold">{campaign.progress}%</div>
              <Progress value={campaign.progress} className="h-2 mt-2 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hiệu suất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Đã gửi</span>
                <span className="text-2xl font-bold">
                  {campaign.sent}/{campaign.audience}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Đã mở</span>
                <span className="text-2xl font-bold">{campaign.opened}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round((campaign.opened / campaign.sent) * 100)}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Thông tin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Kênh:</span>
                <span>{getChannelBadge(campaign.channel)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Ngày tạo:</span>
                <span className="text-sm">{new Date(campaign.createdAt).toLocaleDateString("vi-VN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Người tạo:</span>
                <span className="text-sm">{campaign.createdBy}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="messages">Nội dung</TabsTrigger>
          <TabsTrigger value="audience">Đối tượng</TabsTrigger>
          <TabsTrigger value="schedule">Lịch trình</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <CampaignOverview campaign={campaign} />
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <CampaignMessages campaign={campaign} />
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <CampaignAudience campaign={campaign} />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <CampaignSchedule campaign={campaign} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
