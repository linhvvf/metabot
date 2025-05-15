"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw } from "lucide-react"

interface Variable {
  name: string
  description: string
  defaultValue: string
}

interface AITemplatePreviewProps {
  content: string
  variables: Variable[]
}

export default function AITemplatePreview({ content, variables }: AITemplatePreviewProps) {
  const [previewContent, setPreviewContent] = useState("")
  const [customValues, setCustomValues] = useState<Record<string, string>>({})

  // Khởi tạo giá trị mặc định cho các biến
  useEffect(() => {
    const initialValues: Record<string, string> = {}
    variables.forEach((variable) => {
      initialValues[variable.name] = variable.defaultValue
    })
    setCustomValues(initialValues)
  }, [variables])

  // Cập nhật nội dung xem trước khi có thay đổi
  useEffect(() => {
    let processedContent = content

    // Thay thế các biến bằng giá trị tương ứng
    Object.entries(customValues).forEach(([name, value]) => {
      const regex = new RegExp(`{{${name}}}`, "g")
      processedContent = processedContent.replace(regex, value)
    })

    setPreviewContent(processedContent)
  }, [content, customValues])

  // Xử lý thay đổi giá trị biến
  const handleValueChange = (name: string, value: string) => {
    setCustomValues({
      ...customValues,
      [name]: value,
    })
  }

  // Reset về giá trị mặc định
  const resetToDefaults = () => {
    const defaultValues: Record<string, string> = {}
    variables.forEach((variable) => {
      defaultValues[variable.name] = variable.defaultValue
    })
    setCustomValues(defaultValues)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Xem trước mẫu tin nhắn</h3>
        <Button variant="outline" size="sm" className="gap-2" onClick={resetToDefaults}>
          <RefreshCw className="h-4 w-4" />
          Đặt lại giá trị mặc định
        </Button>
      </div>

      {variables.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {variables.map((variable) => (
                <div key={variable.name} className="space-y-2">
                  <Label htmlFor={`preview-${variable.name}`}>{variable.description}</Label>
                  <Input
                    id={`preview-${variable.name}`}
                    value={customValues[variable.name] || ""}
                    onChange={(e) => handleValueChange(variable.name, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Kết quả xem trước</h4>
            <div className="p-4 border rounded-md bg-muted/50 whitespace-pre-wrap">
              {previewContent || <span className="text-muted-foreground italic">Chưa có nội dung để hiển thị</span>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
