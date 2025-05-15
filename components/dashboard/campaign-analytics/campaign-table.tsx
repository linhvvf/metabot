"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

interface CampaignTableProps {
  selectedCampaigns: string[]
}

export function CampaignTable({ selectedCampaigns }: CampaignTableProps) {
  // Giả lập dữ liệu - trong thực tế sẽ lấy từ API dựa trên selectedCampaigns
  const campaigns = [
    {
      id: "camp1",
      name: "Khuyến mãi mùa hè 2023",
      status: "active",
      reach: 65000,
      reachChange: 12.5,
      engagement: 12.5,
      engagementChange: 5.2,
      conversion: 2.8,
      conversionChange: -0.8,
      roi: 320,
      roiChange: 15.3,
      cost: 12500000,
      revenue: 52000000,
    },
    {
      id: "camp2",
      name: "Ra mắt sản phẩm mới",
      status: "active",
      reach: 48000,
      reachChange: 8.3,
      engagement: 18.2,
      engagementChange: 7.5,
      conversion: 3.5,
      conversionChange: 1.2,
      roi: 480,
      roiChange: 22.7,
      cost: 15000000,
      revenue: 87000000,
    },
    {
      id: "camp3",
      name: "Chiến dịch khách hàng thân thiết",
      status: "completed",
      reach: 72000,
      reachChange: -2.1,
      engagement: 9.7,
      engagementChange: 0,
      conversion: 1.9,
      conversionChange: -1.5,
      roi: 210,
      roiChange: -5.8,
      cost: 8500000,
      revenue: 26350000,
    },
    {
      id: "camp4",
      name: "Khuyến mãi cuối năm",
      status: "scheduled",
      reach: 58000,
      reachChange: 0,
      engagement: 14.3,
      engagementChange: 0,
      conversion: 2.2,
      conversionChange: 0,
      roi: 290,
      roiChange: 0,
      cost: 10000000,
      revenue: 39000000,
    },
    {
      id: "camp5",
      name: "Chiến dịch tiếp thị lại",
      status: "active",
      reach: 32000,
      reachChange: 18.7,
      engagement: 22.5,
      engagementChange: 9.8,
      conversion: 4.2,
      conversionChange: 2.1,
      roi: 520,
      roiChange: 28.5,
      cost: 7500000,
      revenue: 46500000,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Đang chạy</Badge>
      case "completed":
        return <Badge variant="outline">Đã kết thúc</Badge>
      case "scheduled":
        return <Badge variant="secondary">Lên lịch</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />
    } else if (change < 0) {
      return <ArrowDownRight className="h-4 w-4 text-red-500" />
    } else {
      return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bảng so sánh chiến dịch</CardTitle>
        <CardDescription>So sánh chi tiết các chỉ số KPI giữa các chiến dịch</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên chiến dịch</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Tiếp cận</TableHead>
              <TableHead className="text-right">Tương tác</TableHead>
              <TableHead className="text-right">Chuyển đổi</TableHead>
              <TableHead className="text-right">ROI</TableHead>
              <TableHead className="text-right">Chi phí</TableHead>
              <TableHead className="text-right">Doanh thu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span>{campaign.reach.toLocaleString()}</span>
                    <div className="ml-2 flex items-center">
                      {getChangeIndicator(campaign.reachChange)}
                      <span
                        className={`text-xs ${campaign.reachChange > 0 ? "text-green-500" : campaign.reachChange < 0 ? "text-red-500" : "text-gray-400"}`}
                      >
                        {campaign.reachChange !== 0 ? `${Math.abs(campaign.reachChange)}%` : "-"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span>{campaign.engagement}%</span>
                    <div className="ml-2 flex items-center">
                      {getChangeIndicator(campaign.engagementChange)}
                      <span
                        className={`text-xs ${campaign.engagementChange > 0 ? "text-green-500" : campaign.engagementChange < 0 ? "text-red-500" : "text-gray-400"}`}
                      >
                        {campaign.engagementChange !== 0 ? `${Math.abs(campaign.engagementChange)}%` : "-"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span>{campaign.conversion}%</span>
                    <div className="ml-2 flex items-center">
                      {getChangeIndicator(campaign.conversionChange)}
                      <span
                        className={`text-xs ${campaign.conversionChange > 0 ? "text-green-500" : campaign.conversionChange < 0 ? "text-red-500" : "text-gray-400"}`}
                      >
                        {campaign.conversionChange !== 0 ? `${Math.abs(campaign.conversionChange)}%` : "-"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span>{campaign.roi}%</span>
                    <div className="ml-2 flex items-center">
                      {getChangeIndicator(campaign.roiChange)}
                      <span
                        className={`text-xs ${campaign.roiChange > 0 ? "text-green-500" : campaign.roiChange < 0 ? "text-red-500" : "text-gray-400"}`}
                      >
                        {campaign.roiChange !== 0 ? `${Math.abs(campaign.roiChange)}%` : "-"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{(campaign.cost / 1000000).toFixed(1)}M</TableCell>
                <TableCell className="text-right">{(campaign.revenue / 1000000).toFixed(1)}M</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
