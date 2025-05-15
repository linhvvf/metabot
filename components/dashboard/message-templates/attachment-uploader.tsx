"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, ImageIcon, File } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface AttachmentUploaderProps {
  onUploadComplete: (file: UploadedFile) => void
}

export interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  url: string
  thumbnailUrl?: string
}

export function AttachmentUploader({ onUploadComplete }: AttachmentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    // Kiểm tra loại tệp
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]

    if (!allowedTypes.includes(file.type)) {
      setUploadError("Loại tệp không được hỗ trợ. Vui lòng tải lên hình ảnh hoặc tài liệu.")
      return
    }

    // Kiểm tra kích thước tệp (giới hạn 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Kích thước tệp vượt quá giới hạn 5MB.")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError(null)

    // Mô phỏng quá trình tải lên
    const simulateUpload = () => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 10
        if (progress > 100) {
          progress = 100
          clearInterval(interval)

          // Tạo URL giả cho tệp đã tải lên
          const fileId = Math.random().toString(36).substring(2, 15)
          const fileUrl = URL.createObjectURL(file)

          // Tạo thumbnail URL cho hình ảnh
          let thumbnailUrl = undefined
          if (file.type.startsWith("image/")) {
            thumbnailUrl = fileUrl
          }

          // Hoàn thành tải lên
          setTimeout(() => {
            setIsUploading(false)
            onUploadComplete({
              id: fileId,
              name: file.name,
              type: file.type,
              size: file.size,
              url: fileUrl,
              thumbnailUrl,
            })
          }, 500)
        }
        setUploadProgress(progress)
      }, 200)
    }

    simulateUpload()
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Card className={`border-2 ${isDragging ? "border-primary border-dashed" : "border-dashed"}`}>
      <CardContent className="p-6">
        <div
          className="flex flex-col items-center justify-center gap-4 text-center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Đang tải lên...</span>
                <span className="text-sm">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Kéo và thả tệp vào đây</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Hỗ trợ JPG, PNG, GIF, PDF, DOC, DOCX, XLS, XLSX (tối đa 5MB)
                </p>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={triggerFileInput}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Chọn hình ảnh
                </Button>
                <Button type="button" variant="outline" onClick={triggerFileInput}>
                  <File className="mr-2 h-4 w-4" />
                  Chọn tệp
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/jpeg,image/png,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              </div>
            </>
          )}

          {uploadError && <div className="text-sm text-destructive mt-2">{uploadError}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
