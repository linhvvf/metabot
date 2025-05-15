"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Info, Users } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import MessageEditor from "@/components/dashboard/campaigns/message-editor"
import AudienceSelector from "@/components/dashboard/campaigns/audience-selector"
import ScheduleSettings from "@/components/dashboard/campaigns/schedule-settings"

// Định nghĩa schema validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên chiến dịch phải có ít nhất 2 ký tự",
  }),
  description: z.string().optional(),
  channel: z.string({
    required_error: "Vui lòng chọn kênh gửi tin nhắn",
  }),
  messageType: z.enum(["text", "image", "template"], {
    required_error: "Vui lòng chọn loại tin nhắn",
  }),
  audienceType: z.enum(["all", "segment", "tag", "custom"], {
    required_error: "Vui lòng chọn đối tượng nhận tin nhắn",
  }),
  scheduleType: z.enum(["now", "scheduled", "recurring"], {
    required_error: "Vui lòng chọn thời gian gửi tin nhắn",
  }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  enableTracking: z.boolean().default(true),
})

export default function CampaignForm() {
  const [activeTab, setActiveTab] = useState("info")
  const [messageContent, setMessageContent] = useState("")
  const [selectedAudience, setSelectedAudience] = useState<string[]>([])

  // Khởi tạo form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      channel: "",
      messageType: "text",
      audienceType: "all",
      scheduleType: "now",
      enableTracking: true,
    },
  })

  // Xử lý khi submit form
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    console.log("Message content:", messageContent)
    console.log("Selected audience:", selectedAudience)

    // Thêm logic lưu chiến dịch ở đây
    alert("Chiến dịch đã được tạo thành công!")
  }

  // Kiểm tra xem tab hiện tại đã hoàn thành chưa
  const isTabComplete = (tab: string) => {
    switch (tab) {
      case "info":
        return form.watch("name") && form.watch("channel")
      case "message":
        return messageContent.length > 0
      case "audience":
        return selectedAudience.length > 0 || form.watch("audienceType") === "all"
      case "schedule":
        return true // Luôn cho phép lưu lịch trình
      default:
        return false
    }
  }

  // Chuyển đến tab tiếp theo
  const goToNextTab = () => {
    if (activeTab === "info") setActiveTab("message")
    else if (activeTab === "message") setActiveTab("audience")
    else if (activeTab === "audience") setActiveTab("schedule")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info" data-state={isTabComplete("info") ? "complete" : "incomplete"}>
              Thông tin
              {isTabComplete("info") && <Check className="ml-2 h-4 w-4 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="message" data-state={isTabComplete("message") ? "complete" : "incomplete"}>
              Nội dung
              {isTabComplete("message") && <Check className="ml-2 h-4 w-4 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="audience" data-state={isTabComplete("audience") ? "complete" : "incomplete"}>
              Đối tượng
              {isTabComplete("audience") && <Check className="ml-2 h-4 w-4 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="schedule" data-state={isTabComplete("schedule") ? "complete" : "incomplete"}>
              Lịch trình
              {isTabComplete("schedule") && <Check className="ml-2 h-4 w-4 text-green-500" />}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chiến dịch</CardTitle>
                <CardDescription>Nhập thông tin cơ bản về chiến dịch marketing của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên chiến dịch</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên chiến dịch" {...field} />
                      </FormControl>
                      <FormDescription>Tên chiến dịch sẽ giúp bạn dễ dàng nhận biết và quản lý</FormDescription>
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
                        <Textarea placeholder="Mô tả ngắn về chiến dịch này" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kênh gửi tin nhắn</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kênh gửi tin nhắn" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="zalo">Zalo</SelectItem>
                          <SelectItem value="facebook">Facebook Messenger</SelectItem>
                          <SelectItem value="multi">Đa kênh</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Chọn kênh bạn muốn gửi tin nhắn trong chiến dịch này</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Lưu bản nháp
                </Button>
                <Button type="button" onClick={goToNextTab} disabled={!isTabComplete("info")}>
                  Tiếp theo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="message" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nội dung tin nhắn</CardTitle>
                <CardDescription>Soạn nội dung tin nhắn bạn muốn gửi trong chiến dịch này</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="messageType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Loại tin nhắn</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="text" />
                            </FormControl>
                            <FormLabel className="font-normal">Tin nhắn văn bản</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="image" />
                            </FormControl>
                            <FormLabel className="font-normal">Tin nhắn có hình ảnh</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="template" />
                            </FormControl>
                            <FormLabel className="font-normal">Mẫu tin nhắn có sẵn</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <MessageEditor
                  type={form.watch("messageType")}
                  content={messageContent}
                  onChange={setMessageContent}
                  channel={form.watch("channel")}
                />

                <div className="bg-blue-50 p-4 rounded-md flex items-start mt-4">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Mẹo:</p>
                    <p>Bạn có thể sử dụng các biến động để cá nhân hóa tin nhắn:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>{"{{name}}"} - Tên khách hàng</li>
                      <li>{"{{phone}}"} - Số điện thoại</li>
                      <li>{"{{email}}"} - Email</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("info")}>
                  Quay lại
                </Button>
                <Button type="button" onClick={goToNextTab} disabled={!isTabComplete("message")}>
                  Tiếp theo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Đối tượng nhận tin nhắn</CardTitle>
                <CardDescription>Chọn đối tượng khách hàng bạn muốn gửi tin nhắn trong chiến dịch này</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="audienceType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Loại đối tượng</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="all" />
                            </FormControl>
                            <FormLabel className="font-normal">Tất cả khách hàng</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="segment" />
                            </FormControl>
                            <FormLabel className="font-normal">Phân khúc khách hàng</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="tag" />
                            </FormControl>
                            <FormLabel className="font-normal">Theo thẻ khách hàng</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="custom" />
                            </FormControl>
                            <FormLabel className="font-normal">Tùy chỉnh</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <AudienceSelector
                  type={form.watch("audienceType")}
                  selected={selectedAudience}
                  onSelect={setSelectedAudience}
                />

                <div className="flex items-center justify-between bg-muted p-4 rounded-md mt-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">Tổng số người nhận:</span>
                  </div>
                  <span className="text-sm font-bold">
                    {form.watch("audienceType") === "all"
                      ? "12,458"
                      : selectedAudience.length > 0
                        ? selectedAudience.length.toLocaleString()
                        : "0"}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("message")}>
                  Quay lại
                </Button>
                <Button type="button" onClick={goToNextTab} disabled={!isTabComplete("audience")}>
                  Tiếp theo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lịch trình gửi tin nhắn</CardTitle>
                <CardDescription>Thiết lập thời gian gửi tin nhắn trong chiến dịch này</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="scheduleType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Thời gian gửi</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="now" />
                            </FormControl>
                            <FormLabel className="font-normal">Gửi ngay</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="scheduled" />
                            </FormControl>
                            <FormLabel className="font-normal">Lên lịch gửi</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="recurring" />
                            </FormControl>
                            <FormLabel className="font-normal">Gửi định kỳ</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <ScheduleSettings
                  type={form.watch("scheduleType")}
                  startDate={form.watch("startDate")}
                  endDate={form.watch("endDate")}
                  onStartDateChange={(date) => form.setValue("startDate", date)}
                  onEndDateChange={(date) => form.setValue("endDate", date)}
                />

                <Separator className="my-4" />

                <FormField
                  control={form.control}
                  name="enableTracking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Theo dõi hiệu suất</FormLabel>
                        <FormDescription>Theo dõi tỷ lệ mở, nhấp chuột và chuyển đổi của chiến dịch</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("audience")}>
                  Quay lại
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" type="button">
                    Lưu bản nháp
                  </Button>
                  <Button type="submit">{form.watch("scheduleType") === "now" ? "Gửi ngay" : "Tạo chiến dịch"}</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
