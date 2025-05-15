"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, ImageIcon, FileText, FileIcon as FilePdf, FileSpreadsheet } from "lucide-react"
import { AttachmentUploader, type UploadedFile } from "./attachment-uploader"
import { AttachmentPreview } from "./attachment-preview"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AttachmentLibraryProps {
  selectedAttachments: UploadedFile[]
  onAttachmentsChange: (attachments: UploadedFile[]) => void
}

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
    url: "/placeholder.svg?key=wm0i5",
    thumbnailUrl: "/placeholder.svg?key=i45r0",
  },
  {
    id: "sheet1",
    name: "bao-cao-doanh-thu.xlsx",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 420000,
    url: "#",
  },
]

export function AttachmentLibrary({ selectedAttachments, onAttachmentsChange }: AttachmentLibraryProps) {
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [libraryAttachments] = useState<UploadedFile[]>(sampleAttachments)

  const filteredAttachments = libraryAttachments.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAttachmentSelect = (file: UploadedFile) => {
    // Kiểm tra xem tệp đã được chọn chưa
    if (!selectedAttachments.some((attachment) => attachment.id === file.id)) {
      onAttachmentsChange([...selectedAttachments, file])
    }
    setLibraryOpen(false)
  }

  const handleRemoveAttachment = (fileId: string) => {
    onAttachmentsChange(selectedAttachments.filter((file) => file.id !== fileId))
  }

  const handleUploadComplete = (file: UploadedFile) => {
    onAttachmentsChange([...selectedAttachments, file])
    setUploadDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Tệp đính kèm</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setLibraryOpen(true)}>
              <FileText className="mr-2 h-4 w-4" />
              Thư viện
            </Button>
            <Button variant="outline" size="sm" onClick={() => setUploadDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tải lên
            </Button>
          </div>
        </div>

        {selectedAttachments.length > 0 ? (
          <div className="grid gap-2">
            {selectedAttachments.map((file) => (
              <AttachmentPreview key={file.id} file={file} onRemove={handleRemoveAttachment} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="text-muted-foreground mb-2">Chưa có tệp đính kèm</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setLibraryOpen(true)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Chọn từ thư viện
                </Button>
                <Button variant="outline" size="sm" onClick={() => setUploadDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tải lên tệp mới
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog thư viện tệp đính kèm */}
      <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thư viện tệp đính kèm</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm tệp..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setUploadDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Tải lên
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="images">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Hình ảnh
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="mr-2 h-4 w-4" />
                  Tài liệu
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredAttachments.map((file) => (
                    <Card
                      key={file.id}
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleAttachmentSelect(file)}
                    >
                      <CardContent className="p-3">
                        <div className="flex flex-col gap-2">
                          {file.thumbnailUrl ? (
                            <div className="aspect-video w-full bg-muted rounded overflow-hidden">
                              <img
                                src={file.thumbnailUrl || "/placeholder.svg"}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video w-full bg-muted rounded flex items-center justify-center">
                              {file.type === "application/pdf" ? (
                                <FilePdf className="h-12 w-12 text-red-500" />
                              ) : file.type.includes("spreadsheet") || file.type.includes("excel") ? (
                                <FileSpreadsheet className="h-12 w-12 text-green-500" />
                              ) : (
                                <FileText className="h-12 w-12 text-orange-500" />
                              )}
                            </div>
                          )}

                          <div>
                            <div className="font-medium text-sm truncate" title={file.name}>
                              {file.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {file.size < 1024
                                ? `${file.size} B`
                                : file.size < 1048576
                                  ? `${(file.size / 1024).toFixed(1)} KB`
                                  : `${(file.size / 1048576).toFixed(1)} MB`}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="images" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredAttachments
                    .filter((file) => file.type.startsWith("image/"))
                    .map((file) => (
                      <Card
                        key={file.id}
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleAttachmentSelect(file)}
                      >
                        <CardContent className="p-3">
                          <div className="flex flex-col gap-2">
                            <div className="aspect-video w-full bg-muted rounded overflow-hidden">
                              <img
                                src={file.thumbnailUrl || "/placeholder.svg"}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div>
                              <div className="font-medium text-sm truncate" title={file.name}>
                                {file.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {file.size < 1024
                                  ? `${file.size} B`
                                  : file.size < 1048576
                                    ? `${(file.size / 1024).toFixed(1)} KB`
                                    : `${(file.size / 1048576).toFixed(1)} MB`}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredAttachments
                    .filter((file) => !file.type.startsWith("image/"))
                    .map((file) => (
                      <Card
                        key={file.id}
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleAttachmentSelect(file)}
                      >
                        <CardContent className="p-3">
                          <div className="flex flex-col gap-2">
                            <div className="aspect-video w-full bg-muted rounded flex items-center justify-center">
                              {file.type === "application/pdf" ? (
                                <FilePdf className="h-12 w-12 text-red-500" />
                              ) : file.type.includes("spreadsheet") || file.type.includes("excel") ? (
                                <FileSpreadsheet className="h-12 w-12 text-green-500" />
                              ) : (
                                <FileText className="h-12 w-12 text-orange-500" />
                              )}
                            </div>

                            <div>
                              <div className="font-medium text-sm truncate" title={file.name}>
                                {file.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {file.size < 1024
                                  ? `${file.size} B`
                                  : file.size < 1048576
                                    ? `${(file.size / 1024).toFixed(1)} KB`
                                    : `${(file.size / 1048576).toFixed(1)} MB`}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

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
