"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

interface ContentPerformanceAnalysisProps {
  selectedCampaigns: string[]
}

export function ContentPerformanceAnalysis({ selectedCampaigns }: ContentPerformanceAnalysisProps) {
  // Giả lập dữ liệu - trong thực tế sẽ lấy từ API dựa trên selectedCampaigns
  const contentData = [
    {
      title: "Khuyến mãi mùa hè - Giảm giá 50%",
      type: "Hình ảnh",
      channel: "Facebook",
      engagement: 8.5,
      clickRate: 3.2,
      conversion: 1.8,
    },
    {
      title: "Giới thiệu sản phẩm mới - Video demo",
      type: "Video",
      channel: "Facebook",
      engagement: 12.3,
      clickRate: 4.5,
      conversion: 2.2,
    },
    {
      title: "Ưu đãi đặc biệt cho khách hàng thân thiết",
      type: "Email",
      channel: "Email",
      engagement: 15.8,
      clickRate: 5.7,
      conversion: 3.1,
    },
    {
      title: "Thông báo sự kiện ra mắt sản phẩm",
      type: "Tin nhắn",
      channel: "Zalo",
      engagement: 7.2,
      clickRate: 2.8,
      conversion: 1.5,
    },
    {
      title: "Hướng dẫn sử dụng sản phẩm mới",
      type: "Bài viết",
      channel: "Facebook",
      engagement: 9.5,
      clickRate: 3.8,
      conversion: 1.9,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiệu quả nội dung</CardTitle>
        <CardDescription>Phân tích hiệu quả của các loại nội dung khác nhau</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề nội dung</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Kênh</TableHead>
              <TableHead className="text-right">Tương tác</TableHead>
              <TableHead className="text-right">Tỷ lệ nhấp</TableHead>
              <TableHead className="text-right">Chuyển đổi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.channel}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span>{item.engagement}%</span>
                    <div className="w-24">
                      <Progress value={item.engagement * 5} className="h-2 bg-blue-100" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span>{item.clickRate}%</span>
                    <div className="w-24">
                      <Progress value={item.clickRate * 10} className="h-2 bg-green-100" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span>{item.conversion}%</span>
                    <div className="w-24">
                      <Progress value={item.conversion * 20} className="h-2 bg-purple-100" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
