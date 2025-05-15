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
import { Edit, MoreHorizontal, Trash, Copy, Tag, Users, BarChart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import TagForm from "./tag-form"
import TagDetail from "./tag-detail"

// Dữ liệu mẫu cho thẻ
const tagData = [
  {
    id: "tag-001",
    name: "VIP",
    description: "Khách hàng VIP có giá trị cao",
    type: "customer",
    color: "yellow",
    count: 128,
    createdAt: "2023-05-15",
    updatedAt: "2023-06-10",
    group: "Phân loại khách hàng",
  },
  {
    id: "tag-002",
    name: "Tiềm năng",
    description: "Khách hàng có khả năng chuyển đổi cao",
    type: "customer",
    color: "green",
    count: 256,
    createdAt: "2023-05-16",
    updatedAt: "2023-06-12",
    group: "Phân loại khách hàng",
  },
  {
    id: "tag-003",
    name: "Không hoạt động",
    description: "Khách hàng không hoạt động trong 30 ngày qua",
    type: "customer",
    color: "red",
    count: 89,
    createdAt: "2023-05-18",
    updatedAt: "2023-06-15",
    group: "Trạng thái hoạt động",
  },
  {
    id: "tag-004",
    name: "Khuyến mãi mùa hè",
    description: "Chiến dịch khuyến mãi mùa hè 2023",
    type: "campaign",
    color: "blue",
    count: 3,
    createdAt: "2023-06-01",
    updatedAt: "2023-06-01",
    group: "Chiến dịch theo mùa",
  },
  {
    id: "tag-005",
    name: "Sản phẩm mới",
    description: "Chiến dịch giới thiệu sản phẩm mới",
    type: "campaign",
    color: "purple",
    count: 5,
    createdAt: "2023-06-05",
    updatedAt: "2023-06-05",
    group: "Loại chiến dịch",
  },
  {
    id: "tag-006",
    name: "Đã mua hàng",
    description: "Khách hàng đã mua hàng ít nhất một lần",
    type: "customer",
    color: "indigo",
    count: 342,
    createdAt: "2023-05-20",
    updatedAt: "2023-06-18",
    group: "Hành vi mua hàng",
  },
  {
    id: "tag-007",
    name: "Mới",
    description: "Khách hàng mới trong 7 ngày qua",
    type: "customer",
    color: "blue",
    count: 78,
    createdAt: "2023-06-10",
    updatedAt: "2023-06-10",
    group: "Thời gian tham gia",
  },
  {
    id: "tag-008",
    name: "Giảm giá đặc biệt",
    description: "Chiến dịch giảm giá đặc biệt cho khách hàng thân thiết",
    type: "campaign",
    color: "pink",
    count: 2,
    createdAt: "2023-06-12",
    updatedAt: "2023-06-12",
    group: "Loại chiến dịch",
  },
  {
    id: "tag-009",
    name: "Quan tâm sản phẩm A",
    description: "Khách hàng đã thể hiện sự quan tâm đến sản phẩm A",
    type: "customer",
    color: "orange",
    count: 156,
    createdAt: "2023-05-25",
    updatedAt: "2023-06-20",
    group: "Sở thích sản phẩm",
  },
]

// Hàm lọc thẻ theo loại
const filterTags = (tags: any[], type?: string) => {
  if (!type || type === "all") return tags
  return tags.filter((tag) => tag.type === type)
}

// Hàm lấy màu cho thẻ
const getTagColor = (color: string) => {
  switch (color) {
    case "yellow":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "green":
      return "bg-green-100 text-green-800 border-green-200"
    case "red":
      return "bg-red-100 text-red-800 border-red-200"
    case "blue":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "purple":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "indigo":
      return "bg-indigo-100 text-indigo-800 border-indigo-200"
    case "pink":
      return "bg-pink-100 text-pink-800 border-pink-200"
    case "orange":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Hàm lấy màu cho loại thẻ
const getTypeColor = (type: string) => {
  switch (type) {
    case "customer":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "campaign":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

interface TagListProps {
  type?: string
}

export default function TagList({ type }: TagListProps) {
  const [tags, setTags] = useState(filterTags(tagData, type))
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<any>(null)
  const [selectedTag, setSelectedTag] = useState<any>(null)
  const { toast } = useToast()

  // Xử lý xóa thẻ
  const handleDelete = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id))
    toast({
      title: "Đã xóa thẻ",
      description: "Thẻ đã được xóa thành công",
    })
  }

  // Xử lý chỉnh sửa thẻ
  const handleEdit = (tag: any) => {
    setEditingTag(tag)
    setIsFormOpen(true)
  }

  // Xử lý nhân bản thẻ
  const handleDuplicate = (tag: any) => {
    const newTag = {
      ...tag,
      id: `tag-${Date.now()}`,
      name: `${tag.name} (bản sao)`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    setTags([...tags, newTag])
    toast({
      title: "Đã nhân bản thẻ",
      description: "Thẻ đã được nhân bản thành công",
    })
  }

  // Xử lý lưu thẻ
  const handleSave = (tag: any) => {
    if (editingTag) {
      setTags(tags.map((t) => (t.id === tag.id ? tag : t)))
      toast({
        title: "Đã cập nhật thẻ",
        description: "Thẻ đã được cập nhật thành công",
      })
    } else {
      const newTag = {
        ...tag,
        id: `tag-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        count: 0,
      }
      setTags([...tags, newTag])
      toast({
        title: "Đã tạo thẻ",
        description: "Thẻ mới đã được tạo thành công",
      })
    }
    setIsFormOpen(false)
    setEditingTag(null)
  }

  // Xử lý xem chi tiết thẻ
  const handleViewDetails = (tag: any) => {
    setSelectedTag(tag)
  }

  // Xử lý đóng chi tiết thẻ
  const handleCloseDetails = () => {
    setSelectedTag(null)
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <Card key={tag.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{tag.name}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">{tag.description}</CardDescription>
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
                    <DropdownMenuItem onClick={() => handleViewDetails(tag)}>
                      <Tag className="mr-2 h-4 w-4" />
                      <span>Xem chi tiết</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(tag)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(tag)}>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Nhân bản</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(tag.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Xóa</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className={getTypeColor(tag.type)}>
                  {tag.type === "customer" ? "Khách hàng" : "Chiến dịch"}
                </Badge>
                <Badge variant="outline" className={getTagColor(tag.color)}>
                  {tag.group}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{tag.count} đối tượng</span>
                </div>
                <span className="text-muted-foreground">
                  Cập nhật: {new Date(tag.updatedAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-3">
              <div className="flex justify-between items-center w-full">
                <Button variant="ghost" size="sm" onClick={() => handleViewDetails(tag)}>
                  <BarChart className="h-4 w-4 mr-1" />
                  Thống kê
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(tag)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Chỉnh sửa
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Form tạo/chỉnh sửa thẻ */}
      <TagForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingTag(null)
        }}
        onSave={handleSave}
        tag={editingTag}
      />

      {/* Chi tiết thẻ */}
      {selectedTag && <TagDetail tag={selectedTag} onClose={handleCloseDetails} />}
    </div>
  )
}
