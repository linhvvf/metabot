"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Variable } from "lucide-react"

interface AITemplateVariable {
  name: string
  description: string
  defaultValue: string
}

interface AITemplateEditorProps {
  value: string
  onChange: (value: string) => void
  variables: AITemplateVariable[]
}

export default function AITemplateEditor({ value, onChange, variables }: AITemplateEditorProps) {
  const [cursorPosition, setCursorPosition] = useState(0)

  // Xử lý chèn biến vào vị trí con trỏ
  const insertVariable = (variableName: string) => {
    const before = value.substring(0, cursorPosition)
    const after = value.substring(cursorPosition)
    const newValue = `${before}{{${variableName}}}${after}`
    onChange(newValue)
  }

  // Lưu vị trí con trỏ khi người dùng click vào textarea
  const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setCursorPosition(target.selectionStart || 0)
  }

  // Lưu vị trí con trỏ khi người dùng di chuyển con trỏ
  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setCursorPosition(target.selectionStart || 0)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Nội dung mẫu tin nhắn</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Variable className="h-4 w-4" />
              Chèn biến
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Chọn biến để chèn</h4>
              <p className="text-sm text-muted-foreground">Biến sẽ được thay thế bằng dữ liệu thực khi gửi tin nhắn</p>
              <div className="grid gap-2 mt-2">
                {variables.map((variable) => (
                  <Button
                    key={variable.name}
                    variant="outline"
                    className="justify-start gap-2 text-left"
                    onClick={() => insertVariable(variable.name)}
                  >
                    <span className="font-mono text-xs">{`{{${variable.name}}}`}</span>
                    <span className="text-muted-foreground text-xs">{variable.description}</span>
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={handleTextareaClick}
        onSelect={handleTextareaSelect}
        placeholder="Nhập nội dung mẫu tin nhắn ở đây..."
        className="min-h-[300px] font-mono text-sm"
      />

      <div className="text-xs text-muted-foreground">
        <p>Sử dụng cú pháp {"{{tên_biến}}"} để chèn biến động vào mẫu tin nhắn.</p>
        <p>
          Ví dụ: Xin chào {"{{customerName}}"}, cảm ơn bạn đã liên hệ với {"{{companyName}}"}
        </p>
      </div>
    </div>
  )
}
