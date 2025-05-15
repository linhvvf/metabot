"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy } from "lucide-react"

interface TemplatePreviewDialogProps {
  template: {
    id: string
    title: string
    category: string
    content: string
    variables: string[]
    channels: string[]
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TemplatePreviewDialog({ template, open, onOpenChange }: TemplatePreviewDialogProps) {
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    Object.fromEntries(template.variables.map((v) => [v, ""])),
  )

  const handleVariableChange = (variable: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [variable]: value,
    }))
  }

  const previewContent = template.content.replace(
    /\{\{(.*?)\}\}/g,
    (_, variable) => variableValues[variable] || `{{${variable}}}`,
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Xem trước mẫu tin nhắn</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg">{template.title}</h3>
            <div className="flex gap-2 items-center mt-1">
              <Badge variant="outline">{template.category}</Badge>
              <div className="flex flex-wrap gap-1">
                {template.channels.map((channel) => (
                  <Badge key={channel} variant="secondary" className="text-xs">
                    {channel}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {template.variables.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Thông tin biến</h4>
              <div className="grid gap-3">
                {template.variables.map((variable) => (
                  <div key={variable} className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor={variable} className="text-right">
                      {variable}:
                    </Label>
                    <Input
                      id={variable}
                      value={variableValues[variable]}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      className="col-span-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-medium">Nội dung tin nhắn</h4>
            <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">{previewContent}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => navigator.clipboard.writeText(previewContent)}>
            <Copy className="h-4 w-4 mr-2" />
            Sao chép nội dung
          </Button>
          <Button onClick={() => onOpenChange(false)}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
