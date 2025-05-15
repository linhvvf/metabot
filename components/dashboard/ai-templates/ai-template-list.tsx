"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit, MoreVertical, Copy, Trash, Eye, Plus, MessageSquare, Bot, ShieldCheck, Clock, Tag } from "lucide-react"
import { MobileCardView } from "@/components/ui/mobile-card-view"

// Dữ liệu mẫu cho mẫu tin nhắn AI
const mockTemplates = [
  {
    id: "1",
    name: "Chào mừng khách hàng mới",
    description: "Tin nhắn chào mừng tự động khi khách hàng mới đăng ký",
    category: "Chào mừng",
    tags: ["Tự động", "Khách hàng mới"],
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z",
    usageCount: 245,
    aiModel: "GPT-4",
    isActive: true,
  },
  {
    id: "2",
    name: "Phản hồi khiếu nại",
    description: "Mẫu phản hồi cho các khiếu nại của khách hàng",
    category: "Hỗ trợ",
    tags: ["Khiếu nại", "Hỗ trợ khách hàng"],
    createdAt: "2023-06-10T09:15:00Z",
    updatedAt: "2023-06-12T11:20:00Z",
    usageCount: 78,
    aiModel: "GPT-4",
    isActive: true,
  },
  {
    id: "3",
    name: "Thông báo khuyến mãi",
    description: "Thông báo về các chương trình khuyến mãi mới",
    category: "Marketing",
    tags: ["Khuyến mãi", "Marketing"],
    createdAt: "2023-07-05T16:45:00Z",
    updatedAt: "2023-07-10T13:30:00Z",
    usageCount: 156,
    aiModel: "GPT-3.5",
    isActive: false,
  },
  {
    id: "4",
    name: "Hướng dẫn sử dụng sản phẩm",
    description: "Hướng dẫn chi tiết về cách sử dụng sản phẩm",
    category: "Hướng dẫn",
    tags: ["Sản phẩm", "Hướng dẫn"],
    createdAt: "2023-08-20T08:00:00Z",
    updatedAt: "2023-08-25T10:15:00Z",
    usageCount: 92,
    aiModel: "GPT-4",
    isActive: true,
  },
  {
    id: "5",
    name: "Cảm ơn sau khi mua hàng",
    description: "Tin nhắn cảm ơn sau khi khách hàng hoàn tất đơn hàng",
    category: "Giao dịch",
    tags: ["Đơn hàng", "Cảm ơn"],
    createdAt: "2023-09-12T14:30:00Z",
    updatedAt: "2023-09-15T09:45:00Z",
    usageCount: 310,
    aiModel: "GPT-3.5",
    isActive: true,
  },
  {
    id: "6",
    name: "Nhắc nhở thanh toán",
    description: "Nhắc nhở khách hàng về các khoản thanh toán sắp đến hạn",
    category: "Thanh toán",
    tags: ["Nhắc nhở", "Thanh toán"],
    createdAt: "2023-10-05T11:20:00Z",
    updatedAt: "2023-10-10T15:40:00Z",
    usageCount: 124,
    aiModel: "GPT-4",
    isActive: true,
  },
]

export default function AITemplateList() {
  const router = useRouter()
  const [templates, setTemplates] = useState(mockTemplates)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setTemplateToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (templateToDelete) {
      setTemplates(templates.filter((template) => template.id !== templateToDelete))
      setDeleteDialogOpen(false)
      setTemplateToDelete(null)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Chào mừng":
        return <MessageSquare className="h-4 w-4 mr-1" />
      case "Hỗ trợ":
        return <ShieldCheck className="h-4 w-4 mr-1" />
      case "Marketing":
        return <Tag className="h-4 w-4 mr-1" />
      case "Hướng dẫn":
        return <Bot className="h-4 w-4 mr-1" />
      default:
        return <MessageSquare className="h-4 w-4 mr-1" />
    }
  }

  // Hiển thị cho thiết bị di động
  const mobileView = (
    <div className="md:hidden space-y-4">
      {templates.map((template) => (
        <MobileCardView key={template.id}>
          <div className="flex flex-col space-y-3 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push(`/dashboard/ai-templates/${template.id}`)}>
                    <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" /> Nhân bản
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" /> Xem trước
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDelete(template.id)} className="text-destructive">
                    <Trash className="h-4 w-4 mr-2" /> Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center">
                {getCategoryIcon(template.category)}
                {template.category}
              </Badge>
              {template.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <Bot className="h-3 w-3 mr-1" />
                {template.aiModel}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(template.updatedAt).toLocaleDateString("vi-VN")}
              </div>
            </div>

            <div className="flex justify-between">
              <Badge variant={template.isActive ? "default" : "secondary"}>
                {template.isActive ? "Đang hoạt động" : "Không hoạt động"}
              </Badge>
              <span className="text-sm text-muted-foreground">Đã sử dụng: {template.usageCount} lần</span>
            </div>
          </div>
        </MobileCardView>
      ))}
    </div>
  )

  // Hiển thị cho desktop
  const desktopView = (
    <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push(`/dashboard/ai-templates/${template.id}`)}>
                    <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" /> Nhân bản
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" /> Xem trước
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDelete(template.id)} className="text-destructive">
                    <Trash className="h-4 w-4 mr-2" /> Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="flex items-center">
                {getCategoryIcon(template.category)}
                {template.category}
              </Badge>
              {template.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <Bot className="h-3 w-3 mr-1" />
                {template.aiModel}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(template.updatedAt).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Badge variant={template.isActive ? "default" : "secondary"}>
              {template.isActive ? "Đang hoạt động" : "Không hoạt động"}
            </Badge>
            <span className="text-sm text-muted-foreground">Đã sử dụng: {template.usageCount} lần</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Danh sách mẫu tin nhắn</h2>
        <Button asChild>
          <Link href="/dashboard/ai-templates/create">
            <Plus className="h-4 w-4 mr-2" /> Tạo mẫu mới
          </Link>
        </Button>
      </div>

      {mobileView}
      {desktopView}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa mẫu tin nhắn</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa mẫu tin nhắn này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
