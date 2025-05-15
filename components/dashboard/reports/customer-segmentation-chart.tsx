"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function CustomerSegmentationChart() {
  const customerSegments = [
    {
      name: "Khách hàng VIP",
      color: "bg-purple-100 text-purple-800",
      count: 248,
      percentage: "6.5%",
      avgConversations: 8.4,
      avgResponseTime: "2.1 phút",
      satisfaction: "98%",
    },
    {
      name: "Khách hàng thường xuyên",
      color: "bg-blue-100 text-blue-800",
      count: 1245,
      percentage: "32.4%",
      avgConversations: 5.2,
      avgResponseTime: "3.5 phút",
      satisfaction: "92%",
    },
    {
      name: "Khách hàng thỉnh thoảng",
      color: "bg-green-100 text-green-800",
      count: 1842,
      percentage: "47.9%",
      avgConversations: 2.8,
      avgResponseTime: "4.2 phút",
      satisfaction: "85%",
    },
    {
      name: "Khách hàng mới",
      color: "bg-yellow-100 text-yellow-800",
      count: 507,
      percentage: "13.2%",
      avgConversations: 1.2,
      avgResponseTime: "3.8 phút",
      satisfaction: "88%",
    },
  ]

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Phân khúc khách hàng</CardTitle>
            <CardDescription>Phân bố khách hàng theo phân khúc</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <Image
                src="/placeholder.svg?height=300&width=500&query=donut chart showing customer segmentation"
                alt="Biểu đồ phân khúc khách hàng"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {customerSegments.map((segment) => (
                <div key={segment.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge variant="outline" className={segment.color}>
                      {segment.name}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{segment.count}</p>
                    <p className="text-sm text-gray-500">{segment.percentage}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tương tác theo phân khúc</CardTitle>
            <CardDescription>Số lượng tương tác trung bình theo phân khúc</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <Image
                src="/placeholder.svg?height=300&width=500&query=bar chart showing average interactions by customer segment"
                alt="Biểu đồ tương tác theo phân khúc"
                fill
                className="object-contain"
              />
            </div>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Phân khúc</TableHead>
                  <TableHead className="text-right">Hội thoại TB</TableHead>
                  <TableHead className="text-right">Thời gian PH</TableHead>
                  <TableHead className="text-right">Mức độ hài lòng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerSegments.map((segment) => (
                  <TableRow key={segment.name}>
                    <TableCell>
                      <Badge variant="outline" className={segment.color}>
                        {segment.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{segment.avgConversations}</TableCell>
                    <TableCell className="text-right">{segment.avgResponseTime}</TableCell>
                    <TableCell className="text-right">{segment.satisfaction}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Phân tích hành vi khách hàng</CardTitle>
          <CardDescription>Phân tích hành vi và xu hướng của khách hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-4">Thời gian tương tác</h3>
              <div className="h-[300px] relative">
                <Image
                  src="/placeholder.svg?height=300&width=500&query=heatmap showing customer interaction times by hour and day"
                  alt="Biểu đồ thời gian tương tác"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Chu kỳ tương tác</h3>
              <div className="h-[300px] relative">
                <Image
                  src="/placeholder.svg?height=300&width=500&query=line chart showing customer interaction frequency over time"
                  alt="Biểu đồ chu kỳ tương tác"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Phân tích chuyển đổi khách hàng</CardTitle>
          <CardDescription>Phân tích quá trình chuyển đổi giữa các phân khúc khách hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] relative">
            <Image
              src="/placeholder.svg?height=400&width=800&query=sankey diagram showing customer segment transitions"
              alt="Biểu đồ chuyển đổi khách hàng"
              fill
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
