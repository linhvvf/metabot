"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/ui/color-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Save, Trash, Users, MessageSquare, BarChart } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"

export default function TagDetail({ tagId }: { tagId?: string }) {
  const [color, setColor] = useState("#22c55e")

  // Mock data for a tag
  const tag = {
    id: "1",
    name: "VIP",
    description: "Khách hàng VIP có tổng chi tiêu trên 10 triệu đồng",
    color: "#22c55e",
    group: "customer",
    status: "active",
    createdAt: "2023-01-15T10:30:00",
    updatedAt: "2023-04-22T14:20:00",
    createdBy: "Nguyễn Văn A",
    usageCount: 248,
  }

  // Mock data for tag usage
  const taggedItems = [
    {
      id: 1,
      type: "customer",
      name: "Trần Văn B",
      email: "tranvanb@example.com",
      avatar: "/user-avatar-1.png",
      addedAt: "2023-05-01T10:30:00",
      addedBy: "Nguyễn Văn A",
    },
    {
      id: 2,
      type: "customer",
      name: "Lê Thị C",
      email: "lethic@example.com",
      avatar: "/diverse-user-avatar-set-2.png",
      addedAt: "2023-05-02T14:20:00",
      addedBy: "Trần Thị D",
    },
    {
      id: 3,
      type: "customer",
      name: "Phạm Văn E",
      email: "phamvane@example.com",
      avatar: "/diverse-user-avatars-3.png",
      addedAt: "2023-04-25T09:15:00",
      addedBy: "Nguyễn Văn A",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết thẻ</CardTitle>
          <CardDescription>Xem và chỉnh sửa thông tin thẻ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tag-name">Tên thẻ</Label>
                <Input id="tag-name" defaultValue={tag.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tag-description">Mô tả</Label>
                <Textarea id="tag-description" defaultValue={tag.description} rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tag-group">Nhóm thẻ</Label>
                <Select defaultValue={tag.group}>
                  <SelectTrigger id="tag-group">
                    <SelectValue placeholder="Chọn nhóm thẻ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Khách hàng</SelectItem>
                    <SelectItem value="conversation">Hội thoại</SelectItem>
                    <SelectItem value="campaign">Chiến dịch</SelectItem>
                    <SelectItem value="custom">Tùy chỉnh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Màu sắc</Label>
                <div className="flex items-center gap-4">
                  <ColorPicker color={color} onChange={setColor} />
                  <div className="flex-1">
                    <Input value={color} readOnly />
                  </div>
                  <Badge
                    className="ml-2"
                    style={{
                      backgroundColor: `${color}20`,
                      color: color,
                      borderColor: `${color}40`,
                    }}
                  >
                    {tag.name}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tag-status">Trạng thái</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="tag-status" defaultChecked={tag.status === "active"} />
                  <Label htmlFor="tag-status">{tag.status === "active" ? "Đang hoạt động" : "Không hoạt động"}</Label>
                </div>
              </div>

              <div className="pt-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Thông tin</AlertTitle>
                  <AlertDescription>
                    Thẻ này đang được sử dụng bởi {tag.usageCount} khách hàng. Thay đổi sẽ ảnh hưởng đến tất cả các mục
                    đã được gắn thẻ.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Xóa thẻ
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Lưu thay đổi
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phân tích sử dụng thẻ</CardTitle>
          <CardDescription>Thống kê về việc sử dụng thẻ trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stats">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stats">Thống kê</TabsTrigger>
              <TabsTrigger value="items">Danh sách đã gắn thẻ</TabsTrigger>
              <TabsTrigger value="history">Lịch sử thay đổi</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3 mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tổng số mục đã gắn thẻ</p>
                        <p className="text-2xl font-bold">{tag.usageCount}</p>
                      </div>
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Hội thoại đã gắn thẻ</p>
                        <p className="text-2xl font-bold">42</p>
                      </div>
                      <MessageSquare className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tỷ lệ chuyển đổi</p>
                        <p className="text-2xl font-bold">24.8%</p>
                      </div>
                      <BarChart className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="h-[300px] relative mt-6">
                <Image
                  src="/placeholder.svg?height=300&width=800&query=line chart showing tag usage over time"
                  alt="Biểu đồ sử dụng thẻ theo thời gian"
                  fill
                  className="object-contain"
                />
              </div>
            </TabsContent>

            <TabsContent value="items">
              <div className="rounded-md border mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Ngày gắn thẻ</TableHead>
                      <TableHead>Người gắn thẻ</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taggedItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                              <AvatarFallback>
                                {item.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.type === "customer" ? "Khách hàng" : "Hội thoại"}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(item.addedAt).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>{item.addedBy}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4 mr-2" />
                            Gỡ thẻ
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">Hiển thị 3 / {tag.usageCount} mục</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Trước
                  </Button>
                  <Button variant="outline" size="sm">
                    Tiếp
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="rounded-md border mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hành động</TableHead>
                      <TableHead>Người thực hiện</TableHead>
                      <TableHead>Ngày thực hiện</TableHead>
                      <TableHead>Chi tiết thay đổi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Cập nhật thẻ</TableCell>
                      <TableCell>Nguyễn Văn A</TableCell>
                      <TableCell>22/04/2023</TableCell>
                      <TableCell>Thay đổi màu sắc từ #3b82f6 thành #22c55e</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cập nhật thẻ</TableCell>
                      <TableCell>Trần Thị B</TableCell>
                      <TableCell>15/03/2023</TableCell>
                      <TableCell>Cập nhật mô tả thẻ</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tạo thẻ</TableCell>
                      <TableCell>Nguyễn Văn A</TableCell>
                      <TableCell>15/01/2023</TableCell>
                      <TableCell>Tạo thẻ mới với tên "VIP"</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
