"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { DialectForm } from "./dialect-form"
import { DialectDeleteDialog } from "./dialect-delete-dialog"

// Dữ liệu mẫu
const dialectData = [
  {
    id: "1",
    term: "Xí muội",
    meaning: "Trái mận muối",
    region: "Miền Nam",
    category: "Ẩm thực",
    examples: "Đi ăn xí muội không?",
    standardTerm: "Ô mai",
    createdAt: "2023-05-15",
    updatedAt: "2023-05-15",
  },
  {
    id: "2",
    term: "Nhô",
    meaning: "Từ xưng hô thể hiện sự tôn trọng",
    region: "Miền Trung",
    category: "Xưng hô",
    examples: "Nhô đi mô rứa?",
    standardTerm: "Anh/Chị",
    createdAt: "2023-05-16",
    updatedAt: "2023-05-16",
  },
  {
    id: "3",
    term: "Bỏ bù",
    meaning: "Bỏ qua, không quan tâm",
    region: "Miền Bắc",
    category: "Thành ngữ",
    examples: "Thôi bỏ bù chuyện đấy đi",
    standardTerm: "Bỏ qua",
    createdAt: "2023-05-17",
    updatedAt: "2023-05-17",
  },
  {
    id: "4",
    term: "Tạt qua",
    meaning: "Ghé qua nhanh",
    region: "Miền Nam",
    category: "Hành động",
    examples: "Tạt qua nhà tao chút",
    standardTerm: "Ghé qua",
    createdAt: "2023-05-18",
    updatedAt: "2023-05-18",
  },
  {
    id: "5",
    term: "Chiện",
    meaning: "Chuyện, câu chuyện",
    region: "Miền Trung",
    category: "Từ vựng",
    examples: "Có chiện chi rứa?",
    standardTerm: "Chuyện",
    createdAt: "2023-05-19",
    updatedAt: "2023-05-19",
  },
]

// Màu sắc cho các vùng miền
const regionColors: Record<string, string> = {
  "Miền Bắc": "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "Miền Trung": "bg-amber-100 text-amber-800 hover:bg-amber-200",
  "Miền Nam": "bg-green-100 text-green-800 hover:bg-green-200",
  "Toàn quốc": "bg-purple-100 text-purple-800 hover:bg-purple-200",
  Internet: "bg-pink-100 text-pink-800 hover:bg-pink-200",
}

export function DialectList() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedDialect, setSelectedDialect] = useState<any>(null)

  const handleEdit = (dialect: any) => {
    setSelectedDialect(dialect)
    setIsFormOpen(true)
  }

  const handleDelete = (dialect: any) => {
    setSelectedDialect(dialect)
    setIsDeleteDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Biệt ngữ</TableHead>
              <TableHead className="w-[300px]">Ý nghĩa</TableHead>
              <TableHead>Vùng miền</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Từ chuẩn</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dialectData.map((dialect) => (
              <TableRow key={dialect.id}>
                <TableCell className="font-medium">{dialect.term}</TableCell>
                <TableCell>{dialect.meaning}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={regionColors[dialect.region] || "bg-gray-100 text-gray-800"}>
                    {dialect.region}
                  </Badge>
                </TableCell>
                <TableCell>{dialect.category}</TableCell>
                <TableCell>{dialect.standardTerm}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(dialect)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(dialect)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Hiển thị 1-5 của 42 biệt ngữ</div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <DialectForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedDialect(null)
        }}
        dialect={selectedDialect}
      />

      <DialectDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedDialect(null)
        }}
        dialect={selectedDialect}
      />
    </>
  )
}
