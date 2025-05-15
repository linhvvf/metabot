"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"

const permissions = [
  { value: "read:customers", label: "Đọc thông tin khách hàng" },
  { value: "write:customers", label: "Chỉnh sửa thông tin khách hàng" },
  { value: "delete:customers", label: "Xóa khách hàng" },
  { value: "read:conversations", label: "Đọc cuộc hội thoại" },
  { value: "write:conversations", label: "Gửi tin nhắn" },
  { value: "read:campaigns", label: "Đọc chiến dịch" },
  { value: "write:campaigns", label: "Tạo/chỉnh sửa chiến dịch" },
  { value: "read:reports", label: "Xem báo cáo" },
  { value: "read:staff", label: "Xem thông tin nhân viên" },
  { value: "write:staff", label: "Quản lý nhân viên" },
  { value: "read:settings", label: "Xem cài đặt" },
  { value: "write:settings", label: "Thay đổi cài đặt" },
]

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Tên API key phải có ít nhất 3 ký tự",
  }),
  description: z.string().optional(),
  environment: z.enum(["development", "testing", "production"]),
  permissions: z.array(z.string()).min(1, {
    message: "Chọn ít nhất một quyền truy cập",
  }),
  expiresAt: z.date().optional(),
  rateLimit: z.number().min(10).max(10000),
  ipRestriction: z.boolean(),
  allowedIps: z.string().optional(),
})

export function CreateApiKey() {
  const [open, setOpen] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      environment: "development",
      permissions: [],
      rateLimit: 1000,
      ipRestriction: false,
      allowedIps: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would call an API to create the key
    console.log(values)

    // Show success message
    toast({
      title: "API Key đã được tạo",
      description: "API Key mới đã được tạo thành công",
    })

    // Reset form
    form.reset()
    setSelectedPermissions([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tạo API Key mới</CardTitle>
        <CardDescription>Tạo một API key mới để tích hợp với các ứng dụng và dịch vụ của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên API Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên API key" {...field} />
                    </FormControl>
                    <FormDescription>Đặt tên dễ nhớ để phân biệt với các API key khác</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="environment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Môi trường</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn môi trường" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="testing">Testing</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Môi trường mà API key sẽ được sử dụng</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Mô tả mục đích sử dụng của API key này" {...field} />
                    </FormControl>
                    <FormDescription>Mô tả ngắn gọn về mục đích sử dụng của API key</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permissions"
                render={() => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Quyền truy cập</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {selectedPermissions.length > 0
                              ? `${selectedPermissions.length} quyền được chọn`
                              : "Chọn quyền truy cập"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Tìm kiếm quyền..." />
                            <CommandList>
                              <CommandEmpty>Không tìm thấy quyền nào</CommandEmpty>
                              <CommandGroup className="max-h-64 overflow-auto">
                                {permissions.map((permission) => (
                                  <CommandItem
                                    key={permission.value}
                                    value={permission.value}
                                    onSelect={() => {
                                      const isSelected = selectedPermissions.includes(permission.value)
                                      const newSelectedPermissions = isSelected
                                        ? selectedPermissions.filter((p) => p !== permission.value)
                                        : [...selectedPermissions, permission.value]

                                      setSelectedPermissions(newSelectedPermissions)
                                      form.setValue("permissions", newSelectedPermissions)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedPermissions.includes(permission.value) ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {permission.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription>Chọn các quyền truy cập cho API key này</FormDescription>
                    <FormMessage />
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
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date)
                            } else {
                              field.onChange(undefined)
                            }
                          }}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <Button variant="ghost" className="w-full" onClick={() => field.onChange(undefined)}>
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

              <FormField
                control={form.control}
                name="rateLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới hạn tốc độ (requests/phút)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={10}
                        max={10000}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Số lượng requests tối đa cho phép trong 1 phút</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ipRestriction"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Giới hạn IP</FormLabel>
                      <FormDescription>Chỉ cho phép các IP cụ thể truy cập API</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("ipRestriction") && (
                <FormField
                  control={form.control}
                  name="allowedIps"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Danh sách IP được phép</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Nhập danh sách IP được phép, mỗi IP một dòng" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập danh sách các địa chỉ IP được phép sử dụng API key này, mỗi IP một dòng. Có thể sử dụng
                        CIDR notation (ví dụ: 192.168.1.0/24).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Tạo API Key
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
