"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, Info, Plus, Save, Trash2, Paperclip } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TemplatePreview } from "./template-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AttachmentLibrary } from "./attachment-library"
import type { UploadedFile } from "./attachment-uploader"

const formSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  category: z.string().min(1, "Danh mục là bắt buộc"),
  channels: z.array(z.string()).min(1, "Chọn ít nhất một kênh gửi"),
  content: z.string().min(1, "Nội dung là bắt buộc"),
})

interface TemplateEditorProps {
  templateId?: string
}

// Dữ liệu mẫu cho demo
const templateData = {
  id: "1",
  title: "Chào mừng khách hàng mới",
  category: "Chào mừng",
  content:
    "Xin chào {{tên_khách_hàng}}, chúng tôi rất vui mừng được chào đón bạn đến với dịch vụ của chúng tôi. Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ.",
  channels: ["zalo", "messenger"],
  variables: ["tên_khách_hàng"],
  attachments: [] as UploadedFile[],
}

export function TemplateEditor({ templateId }: TemplateEditorProps) {
  const [variables, setVariables] = useState<string[]>([])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [attachments, setAttachments] = useState<UploadedFile[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      channels: [],
      content: "",
    },
  })

  // Nếu có templateId, tải dữ liệu mẫu tin nhắn
  useEffect(() => {
    if (templateId) {
      // Mô phỏng việc tải dữ liệu
      form.reset({
        title: templateData.title,
        category: templateData.category,
        channels: templateData.channels,
        content: templateData.content,
      })
      setVariables(templateData.variables)
      setAttachments(templateData.attachments)
    }
  }, [templateId, form])

  // Khi nội dung thay đổi, cập nhật danh sách biến
  useEffect(() => {
    const content = form.watch("content")
    const matches = content.match(/\{\{(.*?)\}\}/g) || []
    const extractedVariables = matches.map((match) => match.slice(2, -2))

    // Chỉ thêm biến mới nếu chưa có trong danh sách
    const newVariables = extractedVariables.filter((variable) => !variables.includes(variable))

    if (newVariables.length > 0) {
      setVariables((prev) => [...prev, ...newVariables])
    }
  }, [form.watch("content"), variables])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Thêm biến và tệp đính kèm vào dữ liệu gửi đi
    const dataToSubmit = {
      ...values,
      variables,
      attachments,
    }
    console.log(dataToSubmit)
    // Thực hiện lưu mẫu tin nhắn
  }

  const categories = [
    { label: "Chào mừng", value: "Chào mừng" },
    { label: "Tiếp thị", value: "Tiếp thị" },
    { label: "Nhắc nhở", value: "Nhắc nhở" },
    { label: "Cảm ơn", value: "Cảm ơn" },
    { label: "Phản hồi", value: "Phản hồi" },
    { label: "Khác", value: "Khác" },
  ]

  const availableChannels = [
    { label: "Zalo", value: "zalo" },
    { label: "Messenger", value: "messenger" },
    { label: "Email", value: "email" },
    { label: "SMS", value: "sms" },
  ]

  const addVariable = (variable: string) => {
    if (!variables.includes(variable) && variable.trim() !== "") {
      setVariables([...variables, variable])
    }
  }

  const removeVariable = (variable: string) => {
    setVariables(variables.filter((v) => v !== variable))
  }

  const insertVariable = (variable: string) => {
    const contentField = form.getValues("content")
    const textarea = document.getElementById("content") as HTMLTextAreaElement

    if (textarea) {
      const startPos = textarea.selectionStart
      const endPos = textarea.selectionEnd
      const newContent = contentField.substring(0, startPos) + `{{${variable}}}` + contentField.substring(endPos)

      form.setValue("content", newContent)

      // Đặt lại vị trí con trỏ sau biến
      setTimeout(() => {
        textarea.focus()
        const newCursorPos = startPos + variable.length + 4 // +4 for the {{ and }}
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tiêu đề mẫu tin nhắn</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập tiêu đề..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Danh mục</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn danh mục" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="channels"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between">
                              <FormLabel>Kênh gửi</FormLabel>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Chọn các kênh tin nhắn phù hợp với mẫu này</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {availableChannels.map((channel) => (
                                <Badge
                                  key={channel.value}
                                  variant={field.value.includes(channel.value) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    const newValue = field.value.includes(channel.value)
                                      ? field.value.filter((c) => c !== channel.value)
                                      : [...field.value, channel.value]
                                    form.setValue("channels", newValue)
                                  }}
                                >
                                  {channel.label}
                                </Badge>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="editor">
                <TabsList className="mb-4">
                  <TabsTrigger value="editor">Soạn thảo</TabsTrigger>
                  <TabsTrigger value="preview">Xem trước</TabsTrigger>
                  <TabsTrigger value="attachments" className="flex items-center">
                    <Paperclip className="mr-2 h-4 w-4" />
                    Tệp đính kèm
                    {attachments.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {attachments.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <Card>
                    <CardContent className="pt-6">
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between">
                              <FormLabel>Nội dung tin nhắn</FormLabel>
                              <div className="text-xs text-muted-foreground">
                                Sử dụng <code>{"{{biến}}  "}</code> để chèn biến động
                              </div>
                            </div>
                            <FormControl>
                              <Textarea
                                id="content"
                                placeholder="Nhập nội dung tin nhắn..."
                                className="min-h-[200px] font-mono"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="preview">
                  <TemplatePreview
                    title={form.getValues("title")}
                    content={form.getValues("content")}
                    variables={variables}
                    attachments={attachments}
                  />
                </TabsContent>
                <TabsContent value="attachments">
                  <AttachmentLibrary selectedAttachments={attachments} onAttachmentsChange={setAttachments} />
                </TabsContent>
              </Tabs>

              <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen} className="border rounded-md">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="text-sm font-medium">Cài đặt nâng cao</h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isAdvancedOpen ? "transform rotate-180" : ""}`}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0 space-y-4">
                    <div>
                      <Label>Lập lịch gửi</Label>
                      <div className="text-sm text-muted-foreground mt-1">
                        Tính năng lập lịch gửi tin nhắn mẫu sẽ được phát triển trong phiên bản tới.
                      </div>
                    </div>

                    <div>
                      <Label>Điều kiện gửi</Label>
                      <div className="text-sm text-muted-foreground mt-1">
                        Tính năng thiết lập điều kiện gửi tin nhắn mẫu sẽ được phát triển trong phiên bản tới.
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex gap-4">
                <Button type="submit" className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Lưu mẫu tin nhắn
                </Button>
                {templateId && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full md:w-auto text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa mẫu tin nhắn
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Quản lý biến</h3>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input id="new-variable" placeholder="Tên biến mới..." />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById("new-variable") as HTMLInputElement
                          if (input.value) {
                            addVariable(input.value)
                            input.value = ""
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {variables.length > 0 ? (
                        variables.map((variable) => (
                          <div
                            key={variable}
                            className="flex items-center justify-between py-2 px-3 bg-muted rounded-md"
                          >
                            <span className="font-mono text-sm">{variable}</span>
                            <div className="flex gap-2">
                              <Button type="button" variant="ghost" size="sm" onClick={() => insertVariable(variable)}>
                                Chèn
                              </Button>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeVariable(variable)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          Chưa có biến nào được sử dụng trong mẫu tin nhắn này
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Các biến hệ thống</h3>
                  <div className="space-y-2">
                    {["ngày_hiện_tại", "giờ_hiện_tại", "tên_công_ty", "số_điện_thoại_công_ty", "email_công_ty"].map(
                      (sysVar) => (
                        <div key={sysVar} className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
                          <span className="font-mono text-sm">{sysVar}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => insertVariable(sysVar)}>
                            Chèn
                          </Button>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
