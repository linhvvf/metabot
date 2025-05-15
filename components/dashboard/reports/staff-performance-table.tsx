"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

export default function StaffPerformanceTable() {
  const staffMembers = [
    {
      name: "Nguyễn Văn A",
      avatar: "/user-avatar-1.png",
      conversations: 428,
      messages: 1845,
      responseTime: "3.2 phút",
      satisfaction: 96,
      resolution: 94,
    },
    {
      name: "Trần Thị B",
      avatar: "/diverse-user-avatar-set-2.png",
      conversations: 385,
      messages: 1642,
      responseTime: "3.8 phút",
      satisfaction: 92,
      resolution: 91,
    },
    {
      name: "Lê Văn C",
      avatar: "/diverse-user-avatars-3.png",
      conversations: 342,
      messages: 1485,
      responseTime: "4.1 phút",
      satisfaction: 90,
      resolution: 88,
    },
    {
      name: "Phạm Thị D",
      avatar: "/user-avatar-4.png",
      conversations: 312,
      messages: 1354,
      responseTime: "4.5 phút",
      satisfaction: 88,
      resolution: 85,
    },
    {
      name: "Hoàng Văn E",
      avatar: "/user-avatar-5.png",
      conversations: 287,
      messages: 1245,
      responseTime: "4.8 phút",
      satisfaction: 85,
      resolution: 82,
    },
  ]

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất nhân viên</CardTitle>
            <CardDescription>So sánh hiệu suất giữa các nhân viên</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] relative">
              <Image
                src="/placeholder.svg?height=400&width=600&query=radar chart comparing staff performance metrics"
                alt="Biểu đồ hiệu suất nhân viên"
                fill
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Khối lượng công việc</CardTitle>
            <CardDescription>Phân bố khối lượng công việc giữa các nhân viên</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] relative">
              <Image
                src="/placeholder.svg?height=400&width=600&query=pie chart showing workload distribution among staff members"
                alt="Biểu đồ phân bố khối lượng công việc"
                fill
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Bảng xếp hạng nhân viên</CardTitle>
          <CardDescription>Chi tiết hiệu suất của từng nhân viên</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân viên</TableHead>
                <TableHead className="text-right">Hội thoại</TableHead>
                <TableHead className="text-right">Tin nhắn</TableHead>
                <TableHead className="text-right">Thời gian PH</TableHead>
                <TableHead>Mức độ hài lòng</TableHead>
                <TableHead>Tỷ lệ giải quyết</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffMembers.map((staff) => (
                <TableRow key={staff.name}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 relative">
                        <Image
                          src={staff.avatar || "/placeholder.svg"}
                          alt={staff.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{staff.conversations}</TableCell>
                  <TableCell className="text-right">{staff.messages}</TableCell>
                  <TableCell className="text-right">{staff.responseTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Progress value={staff.satisfaction} className="h-2 mr-2" />
                      <span>{staff.satisfaction}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Progress value={staff.resolution} className="h-2 mr-2" />
                      <span>{staff.resolution}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Xu hướng hiệu suất theo thời gian</CardTitle>
          <CardDescription>Hiệu suất của nhân viên theo thời gian</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] relative">
            <Image
              src="/placeholder.svg?height=400&width=800&query=line chart showing staff performance trends over time"
              alt="Biểu đồ xu hướng hiệu suất"
              fill
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
