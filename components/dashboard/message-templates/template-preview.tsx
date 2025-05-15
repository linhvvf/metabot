"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Paperclip } from "lucide-react"
import { AttachmentPreview } from "./attachment-preview"
import type { UploadedFile } from "./attachment-uploader"

interface TemplatePreviewProps {
  title: string
  content: string
  variables: string[]
  attachments?: UploadedFile[]
}

export function TemplatePreview({ title, content, variables, attachments = [] }: TemplatePreviewProps) {
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    Object.fromEntries(variables.map((v) => [v, ""])),
  )

  const handleVariableChange = (variable: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [variable]: value,
    }))
  }

  const previewContent = content.replace(
    /\{\{(.*?)\}\}/g,
    (_, variable) => variableValues[variable] || `{{${variable}}}`,
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4">Xem trước tin nhắn</h3>

          {variables.length > 0 && (
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-medium">Điền giá trị cho các biến để xem trước:</h4>
              <div className="grid gap-3">
                {variables.map((variable) => (
                  <div key={variable} className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor={`preview-${variable}`} className="text-right">
                      {variable}:
                    </Label>
                    <Input
                      id={`preview-${variable}`}
                      value={variableValues[variable]}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      className="col-span-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border rounded-md p-4">
            <div className="font-medium mb-2">{title || "Tin nhắn chưa có tiêu đề"}</div>
            <div className="whitespace-pre-wrap">{previewContent || "Tin nhắn chưa có nội dung"}</div>

            {attachments.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <Paperclip className="h-4 w-4" />
                  <span className="text-sm font-medium">Tệp đính kèm ({attachments.length})</span>
                </div>
                <div className="grid gap-2">
                  {attachments.map((file) => (
                    <AttachmentPreview
                      key={file.id}
                      file={file}
                      onRemove={() => {}} // Trong chế độ xem trước, không cho phép xóa
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
