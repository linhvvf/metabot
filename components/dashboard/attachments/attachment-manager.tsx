"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Plus,
  FileText,
  FileIcon as FilePdf,
  FileSpreadsheet,
  Trash2,
  Download,
  MoreHorizontal,
} from "lucide-react"
import { AttachmentUploader, type UploadedFile } from "../message-templates/attachment-uploader"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dữ liệu mẫu cho thư viện tệp đính kèm
const sampleAttachments: UploadedFile[] = [
  {
    id: "img1",
    name: "banner-khuyen-mai.jpg",
    type: "image/jpeg",
    size: 245000,
    url: "/promotional-banner.png",
    thumbnailUrl: "/promotional-banner.png",
  },
  {
    id: "img2",
    name: "logo-cong-ty.png",
    type: "image/png",
    size: 125000,
    url: "/generic-company-logo.png",
    thumbnailUrl: "/generic-company-logo.png",
  },
  {
    id: "doc1",
    name: "bang-gia-san-pham-2023.pdf",
    type: "application/pdf",
    size: 520000,
    url: "#",
  },
  {
    id: "doc2",
    name: "huong-dan-su-dung.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 350000,
    url: "#",
  },
  {
    id: "img3",
    name: "san-pham-moi.jpg",
    type: "image/jpeg",
    size: 180000,
    url: "/placeholder.svg?key=qkctw",
    thumbnailUrl: "/placeholder.svg?key=r6ic3",
  },
  {
    id: "sheet1",
    name: "bao-cao-doanh-thu.xlsx",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 420000,
    url: "#",
  },
  {
    id: "img4",
    name: "hinh-anh-san-pham-1.jpg",
    type: "image/jpeg",
    size: 310000,
    url: "/modern-tech-product.png",
    thumbnailUrl: "/modern-tech-product.png",
  },
  {
    id: "img5",
    name: "hinh-anh-san-pham-2.jpg",
    type: "image/jpeg",
    size: 290000,
    url: "/product-display-sleek.png",
    thumbnailUrl: "/product-display-sleek.png",
  },
  {
    id: "doc3",
    name: "chinh-sach-bao-hanh.pdf",
    type: "application/pdf",
    size: 180000,
    url: "#",
  },
  {
    id: "img6",
    name: "banner-website.jpg",
    type: "image/jpeg",
    size: 450000,
    url: "/generic-website-banner.png",
    thumbnailUrl: "/generic-website-banner.png",
  },
  {
    id: "doc4",
    name: "huong-dan-thanh-toan.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 280000,
    url: "#",
  },
  {
    id: "img7",
    name: "logo-mau-trang.png",
    type: "image/png",
    size: 95000,
    url: "/white-logo.png",
    thumbnailUrl: "/white-logo.png",
  },
]

export function AttachmentManager() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [attachments, setAttachments] = useState<UploadedFile[]>(sampleAttachments)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredAttachments = attachments.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "images" && file.type.startsWith("image/")) ||
      (selectedCategory === "documents" && !file.type.startsWith("image/"))

    return matchesSearch && matchesCategory
  })

  const handleUploadComplete = (file: UploadedFile) => {
    setAttachments([file, ...attachments])
    setUploadDialogOpen(false)
  }

  const handleDeleteAttachment = (fileId: string) => {
    setAttachments(attachments.filter((file) => file.id !== fileId))
  }

  const handleDownload = (file: UploadedFile) => {
    const link = document.createElement("a")
    link.href = file.url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Thư viện tệp đính kèm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm tệp..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Loại tệp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="images">Hình ảnh</SelectItem>
                    <SelectItem value="documents">Tài liệu</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tải lên
                </Button>
              </div>
            </div>

            {filteredAttachments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredAttachments.map((file) => (
                  <Card key={file.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col">
                        {file.thumbnailUrl ? (
                          <div className="aspect-video w-full bg-muted overflow-hidden">
                            <img
                              src={file.thumbnailUrl || "/placeholder.svg"}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video w-full bg-muted flex items-center justify-center">
                            {file.type === "application/pdf" ? (
                              <FilePdf className="h-12 w-12 text-red-500" />
                            ) : file.type.includes("spreadsheet") || file.type.includes("excel") ? (
                              <FileSpreadsheet className="h-12 w-12 text-green-500" />
                            ) : (
                              <FileText className="h-12 w-12 text-orange-500" />
                            )}
                          </div>
                        )}

                        <div className="p-3">
                          <div className="font-medium text-sm truncate" title={file.name}>
                            {file.name}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDownload(file)}
                                title="Tải xuống"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleDownload(file)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Tải xuống
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteAttachment(file.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Xóa
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 border rounded-md">
                <div className="text-muted-foreground mb-2">Không tìm thấy tệp đính kèm nào</div>
                <Button variant="outline" onClick={() => setUploadDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tải lên tệp mới
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog tải lên tệp mới */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tải lên tệp đính kèm</DialogTitle>
          </DialogHeader>
          <AttachmentUploader onUploadComplete={handleUploadComplete} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
