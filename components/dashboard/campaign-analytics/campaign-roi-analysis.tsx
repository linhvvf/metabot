"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CampaignROIAnalysisProps {
  selectedCampaigns: string[]
}

export function CampaignROIAnalysis({ selectedCampaigns }: CampaignROIAnalysisProps) {
  // Giả lập dữ liệu - trong thực tế sẽ lấy từ API dựa trên selectedCampaigns
  const roiData = [
    {
      campaign: "Khuyến mãi mùa hè 2023",
      cost: 12500000,
      revenue: 52000000,
      roi: 316,
      cpa: 125000,
      cpc: 15000,
      conversionRate: 2.8,
    },
    {
      campaign: "Ra mắt sản phẩm mới",
      cost: 15000000,
      revenue: 87000000,
      roi: 480,
      cpa: 150000,
      cpc: 18000,
      conversionRate: 3.5,
    },
    {
      campaign: "Chiến dịch khách hàng thân thiết",
      cost: 8500000,
      revenue: 26350000,
      roi: 210,
      cpa: 85000,
      cpc: 12000,
      conversionRate: 1.9,
    },
    {
      campaign: "Khuyến mãi cuối năm",
      cost: 10000000,
      revenue: 39000000,
      roi: 290,
      cpa: 100000,
      cpc: 14000,
      conversionRate: 2.2,
    },
    {
      campaign: "Chiến dịch tiếp thị lại",
      cost: 7500000,
      revenue: 46500000,
      roi: 520,
      cpa: 75000,
      cpc: 10000,
      conversionRate: 4.2,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Phân tích ROI</CardTitle>
            <CardDescription>So sánh ROI giữa các chiến dịch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <img
                src="/placeholder.svg?height=300&width=400&query=bar chart showing ROI comparison between campaigns"
                alt="Biểu đồ so sánh ROI giữa các chiến dịch"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chi phí và doanh thu</CardTitle>
            <CardDescription>So sánh chi phí và doanh thu giữa các chiến dịch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <img
                src="/placeholder.svg?height=300&width=400&query=stacked bar chart showing cost and revenue by campaign"
                alt="Biểu đồ so sánh chi phí và doanh thu giữa các chiến dịch"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bảng phân tích ROI chi tiết</CardTitle>
          <CardDescription>Chi tiết các chỉ số ROI cho từng chiến dịch</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chiến dịch</TableHead>
                <TableHead className="text-right">Chi phí</TableHead>
                <TableHead className="text-right">Doanh thu</TableHead>
                <TableHead className="text-right">ROI</TableHead>
                <TableHead className="text-right">CPA</TableHead>
                <TableHead className="text-right">CPC</TableHead>
                <TableHead className="text-right">Tỷ lệ chuyển đổi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roiData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.campaign}</TableCell>
                  <TableCell className="text-right">{(item.cost / 1000000).toFixed(1)}M</TableCell>
                  <TableCell className="text-right">{(item.revenue / 1000000).toFixed(1)}M</TableCell>
                  <TableCell className="text-right">{item.roi}%</TableCell>
                  <TableCell className="text-right">{(item.cpa / 1000).toFixed(0)}K</TableCell>
                  <TableCell className="text-right">{(item.cpc / 1000).toFixed(0)}K</TableCell>
                  <TableCell className="text-right">{item.conversionRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phân tích chi phí theo kênh</CardTitle>
          <CardDescription>Phân tích chi phí và hiệu quả trên từng kênh</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cost">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cost">Chi phí</TabsTrigger>
              <TabsTrigger value="cpa">CPA</TabsTrigger>
              <TabsTrigger value="roi">ROI</TabsTrigger>
            </TabsList>
            <TabsContent value="cost" className="pt-4">
              <div className="h-[300px] w-full">
                <img
                  src="/placeholder.svg?height=300&width=800&query=pie chart showing cost distribution by channel"
                  alt="Biểu đồ phân bổ chi phí theo kênh"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            </TabsContent>
            <TabsContent value="cpa" className="pt-4">
              <div className="h-[300px] w-full">
                <img
                  src="/placeholder.svg?height=300&width=800&query=bar chart showing CPA by channel"
                  alt="Biểu đồ CPA theo kênh"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            </TabsContent>
            <TabsContent value="roi" className="pt-4">
              <div className="h-[300px] w-full">
                <img
                  src="/placeholder.svg?height=300&width=800&query=bar chart showing ROI by channel"
                  alt="Biểu đồ ROI theo kênh"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
