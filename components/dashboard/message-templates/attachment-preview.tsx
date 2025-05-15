"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Download, Trash2, FileText, FileImage, FileIcon as FilePdf, FileSpreadsheet } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { UploadedFile } from "./attachment-uploader"
import Image from "next/image"

interface AttachmentPreviewProps {
  file: UploadedFile
  onRemove: (fileId: string) => void
}

export function AttachmentPreview({ file, onRemove }: AttachmentPreviewProps) {
  const [previewOpen, setPreviewOpen] = useState(false)

  const getFileIcon = () => {
    if (file.type.startsWith("image/")) {
      return <FileImage className="h-8 w-8 text-blue-500" />
    } else if (file.type === "application/pdf") {
      return <FilePdf className="h-8 w-8 text-red-500" />
    } else if (file.type.includes("spreadsheet") || file.type.includes("excel")) {
      return <FileSpreadsheet className="h-8 w-8 text-green-500" />
    } else {
      return <FileText className="h-8 w-8 text-orange-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = file.url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            {file.thumbnailUrl ? (
              <div
                className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden"
                onClick={() => setPreviewOpen(true)}
              >
                <Image
                  src={file.thumbnailUrl || "/placeholder.svg"}
                  alt={file.name}
                  width={48}
                  height={48}
                  className="object-cover cursor-pointer"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">{getFileIcon()}</div>
            )}

            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate" title={file.name}>
                {file.name}
              </div>
              <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
            </div>

            <div className="flex gap-1">
              {file.type.startsWith("image/") && (
                <Button variant="ghost" size="icon" onClick={() => setPreviewOpen(true)} title="Xem trước">
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={handleDownload} title="Tải xuống">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onRemove(file.id)} title="Xóa">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {file.type.startsWith("image/") && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{file.name}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center">
              <img
                src={file.url || "/placeholder.svg"}
                alt={file.name}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
