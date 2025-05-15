"use client"

import { useState } from "react"
import { CalendarIcon, Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Badge } from "@/components/ui/badge"

interface ApiKeyDetailProps {
  apiKey: {
    id: string
    name: string
    key: string
    created: string
    lastUsed: string
    status: string
    environment: string
    permissions: string[]
    rateLimit: number
    expiresAt: string | null
    description?: string
  }
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Tên API key phải có ít nhất 3 ký tự",
  }),
  description: z.string().optional(),
  status: z.boolean(),
  expiresAt: z.date().nullable(),
})

export function ApiKeyDetail({ apiKey }: ApiKeyDetailProps) {
  const [showKey, setShowKey] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: apiKey.name,
      description: apiKey.description || "",
      status: apiKey.status === "active",
      expiresAt: apiKey.expiresAt ? new Date(apiKey.expiresAt) : null,
    },
  })

  const toggleKeyVisibility = () => {
    setShowKey(!showKey)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey.key)
    toast({
      title: "API Key đã được sao chép",
      description: "API Key đã được sao chép vào clipboard",
    })
  }

  const regenerateKey = () => {
    // In a real app, this would call an API to regenerate the key
    toast({
      title: "API Key đã được tạo lại",
      description: "API Key mới đã được tạo thành công",
    })
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would call an API to update the key
    console.log(values)

    toast({
      title: "API Key đã được cập nhật",
      description: "Thông tin API Key đã được cập nhật thành công",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">Chi tiết API Key</h3>
          <Badge
            variant={
              apiKey.environment === "production"
                ? "destructive"
                : apiKey.environment === "development"
                  ? "outline"
                  : "secondary"
            }
          >
            {apiKey.environment}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          ID: {apiKey.id} • Tạo ngày: {formatDate(apiKey.created)} • Sử dụng lần cuối: {formatDate(apiKey.lastUsed)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Input readOnly value={showKey ? apiKey.key : "•".repeat(24)} className="pr-20 font-mono text-sm" />
          <div className="absolute right-0 top-0 flex h-full items-center space-x-1 pr-3">
            <Button variant="ghost" size="icon" onClick={toggleKeyVisibility}>
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showKey ? "Ẩn" : "Hiện"} API key</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCopyKey}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Sao chép API key</span>
            </Button>
          </div>
        </div>
        <Button variant="outline" onClick={regenerateKey}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Tạo lại
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên API Key</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea placeholder="Mô tả mục đích sử dụng của API key này" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Trạng thái</FormLabel>
                  <FormDescription>Bật/tắt API key này</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày hết hạn</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "dd/MM/yyyy") : "Không giới hạn"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={(date) => field.onChange(date)}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                    <div className="p-3 border-t border-border">
                      <Button variant="ghost" className="w-full" onClick={() => field.onChange(null)}>
                        Xóa ngày hết hạn
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormDescription>Ngày API key hết hạn. Để trống nếu không muốn giới hạn thời gian.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Lưu thay đổi</Button>
        </form>
      </Form>
    </div>
  )
}
