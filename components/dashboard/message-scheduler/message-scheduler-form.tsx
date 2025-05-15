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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import ScheduleSettings from "@/components/dashboard/campaigns/schedule-settings"
import AudienceSelector from "@/components/dashboard/campaigns/audience-selector"
import MessageEditor from "@/components/dashboard/campaigns/message-editor"
import RecurrenceSettings from "@/components/dashboard/message-scheduler/recurrence-settings"
import MessageSequenceBuilder from "@/components/dashboard/message-scheduler/message-sequence-builder"

// Định nghĩa schema validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên lịch trình phải có ít nhất 2 ký tự",
  }),
  description: z.string().optional(),
  channel: z.string({
    required_error: "Vui lòng chọn kênh gửi tin nhắn",
  }),
  messageType: z.enum(["text", "image", "template"], {
    required_error: "Vui lòng chọn loại tin nhắn",
  }),
  scheduleType: z.enum(["one-time", "recurring", "sequence"], {
    required_error: "Vui lòng chọn loại lịch trình",
  }),
  audienceType: z.enum(["all", "segment", "tag", "custom"], {
    required_error: "Vui lòng chọn đối tượng nhận tin nhắn",
  }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  recurrencePattern: z.enum(["daily", "weekly", "monthly"]).optional(),
  enableReminderResend: z.boolean().default(false),
})

export default function MessageSchedulerForm() {
  const [activeTab, setActiveTab] = useState("info")
  const [messageContent, setMessageContent] = useState("")
  const [selectedAudience, setSelectedAudience] = useState<string[]>([])
  const [sequenceMessages, setSequenceMessages] = useState<Array<{ id: string; content: string; delay: number }>>([])

  // Khởi tạo form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      channel: "",
      messageType: "text",
      scheduleType: "one-time",
      audienceType: "all",
      recurrencePattern: "daily",
      enableReminderResend: false,
    },
  })

  // Xử lý khi submit form
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    console.log("Message content:", messageContent)
    console.log("Selected audience:", selectedAudience)
    console.log("Sequence messages:", sequenceMessages)

    // Thêm logic lưu lịch trình ở đây
    alert("Lịch trình đã được tạo thành công!")
  }

  // Kiểm tra xem tab hiện tại đã hoàn thành chưa
  const isTabComplete = (tab: string) => {
    switch (tab) {
      case "info":
        return form.watch("name") && form.watch("channel") && form.watch("scheduleType")
      case "message":
        if (form.watch("scheduleType") === "sequence") {
          return sequenceMessages.length > 0
        }
        return messageContent.length > 0
      case "audience":
        return selectedAudience.length > 0 || form.watch("audienceType") === "all"
      case "schedule":
        if (form.watch("scheduleType") === "one-time") {
          return !!form.watch("startDate")
        }
        if (form.watch("scheduleType") === "recurring") {
          return !!form.watch("startDate") && !!form.watch("recurrencePattern")
        }
        return true
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
                <CardTitle>Thông tin lịch trình</CardTitle>
                <CardDescription>Nhập thông tin cơ bản về lịch trình tin nhắn của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên lịch trình</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên lịch trình" {...field} />
                      </FormControl>
                      <FormDescription>Tên lịch trình sẽ giúp bạn dễ dàng nhận biết và quản lý</FormDescription>
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
                        <Textarea placeholder="Mô tả ngắn về lịch trình này" className="resize-none" {...field} />
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
                      <FormDescription>Chọn kênh bạn muốn gửi tin nhắn trong lịch trình này</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="scheduleType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Loại lịch trình</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="one-time" />
                            </FormControl>
                            <FormLabel className="font-normal">Một lần</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="recurring" />
                            </FormControl>
                            <FormLabel className="font-normal">Định kỳ</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="sequence" />
                            </FormControl>
                            <FormLabel className="font-normal">Chuỗi tin nhắn tự động</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-blue-50 p-4 rounded-md flex items-start mt-4">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Gợi ý:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>
                        Sử dụng <strong>Một lần</strong> cho tin nhắn gửi theo ngày và giờ cụ thể
                      </li>
                      <li>
                        Sử dụng <strong>Định kỳ</strong> cho tin nhắn gửi lặp lại theo chu kỳ
                      </li>
                      <li>
                        Sử dụng <strong>Chuỗi tin nhắn</strong> cho chuỗi tin nhắn theo trình tự
                      </li>
                    </ul>
                  </div>
                </div>
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
                <CardDescription>Soạn nội dung tin nhắn bạn muốn gửi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("scheduleType") !== "sequence" ? (
                  <>
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
                  </>
                ) : (
                  <MessageSequenceBuilder
                    messages={sequenceMessages}
                    onChange={setSequenceMessages}
                    channel={form.watch("channel")}
                  />
                )}

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
                <CardDescription>Chọn đối tượng khách hàng bạn muốn gửi tin nhắn</CardDescription>
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
                <CardTitle>Cài đặt lịch trình</CardTitle>
                <CardDescription>Thiết lập thời gian gửi tin nhắn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("scheduleType") === "one-time" && (
                  <div className="space-y-4">
                    <ScheduleSettings
                      type="scheduled"
                      startDate={form.watch("startDate")}
                      endDate={undefined}
                      onStartDateChange={(date) => form.setValue("startDate", date)}
                      onEndDateChange={() => {}}
                    />
                  </div>
                )}

                {form.watch("scheduleType") === "recurring" && (
                  <div className="space-y-4">
                    <RecurrenceSettings
                      startDate={form.watch("startDate")}
                      endDate={form.watch("endDate")}
                      onStartDateChange={(date) => form.setValue("startDate", date)}
                      onEndDateChange={(date) => form.setValue("endDate", date)}
                      pattern={form.watch("recurrencePattern")}
                      onPatternChange={(pattern) => form.setValue("recurrencePattern", pattern as any)}
                    />
                  </div>
                )}

                {form.watch("scheduleType") === "sequence" && (
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded-md">
                      <p className="text-sm text-amber-800">
                        Chuỗi tin nhắn sẽ được kích hoạt tự động khi người dùng được thêm vào đối tượng nhận tin. Mỗi
                        tin nhắn sẽ được gửi theo thời gian chờ đã thiết lập.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="startDate"
                      render={() => (
                        <FormItem>
                          <FormLabel>Ngày bắt đầu chuỗi tin nhắn</FormLabel>
                          <ScheduleSettings
                            type="scheduled"
                            startDate={form.watch("startDate")}
                            endDate={undefined}
                            onStartDateChange={(date) => form.setValue("startDate", date)}
                            onEndDateChange={() => {}}
                          />
                          <FormDescription>
                            Chuỗi tin nhắn sẽ bắt đầu gửi từ ngày này cho các khách hàng hiện có. Khách hàng mới sẽ nhận
                            được chuỗi tin nhắn ngay khi họ được thêm vào.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <Separator className="my-4" />

                {form.watch("scheduleType") !== "sequence" && (
                  <FormField
                    control={form.control}
                    name="enableReminderResend"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Gửi lại cho người chưa mở</FormLabel>
                          <FormDescription>Tự động gửi lại tin nhắn cho người chưa mở sau 48 giờ</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("audience")}>
                  Quay lại
                </Button>
                <Button type="submit">Tạo lịch trình</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
