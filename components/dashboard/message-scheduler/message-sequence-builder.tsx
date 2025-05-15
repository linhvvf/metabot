"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash, ChevronUp, ChevronDown, Settings, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { v4 as uuidv4 } from "uuid"

interface MessageSequenceBuilderProps {
  messages: Array<{ id: string; content: string; delay: number }>
  onChange: (messages: Array<{ id: string; content: string; delay: number }>) => void
  channel?: string
}

export default function MessageSequenceBuilder({ messages, onChange, channel = "zalo" }: MessageSequenceBuilderProps) {
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null)
  const [newMessageContent, setNewMessageContent] = useState("")
  const [newMessageDelay, setNewMessageDelay] = useState(1)
  const [delayUnit, setDelayUnit] = useState("days")

  // Thêm tin nhắn mới vào chuỗi
  const handleAddMessage = () => {
    const newMessage = {
      id: uuidv4(),
      content: newMessageContent,
      delay: newMessageDelay * (delayUnit === "hours" ? 1 : delayUnit === "days" ? 24 : 168), // Chuyển đổi thành giờ
    }
    onChange([...messages, newMessage])
    setNewMessageContent("")
    setNewMessageDelay(1)
    setDelayUnit("days")
  }

  // Xóa tin nhắn khỏi chuỗi
  const handleDeleteMessage = (id: string) => {
    onChange(messages.filter((msg) => msg.id !== id))
    if (activeMessageId === id) {
      setActiveMessageId(null)
    }
  }

  // Di chuyển tin nhắn lên trên
  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newMessages = [...messages]
    const temp = newMessages[index]
    newMessages[index] = newMessages[index - 1]
    newMessages[index - 1] = temp
    onChange(newMessages)
  }

  // Di chuyển tin nhắn xuống dưới
  const handleMoveDown = (index: number) => {
    if (index === messages.length - 1) return
    const newMessages = [...messages]
    const temp = newMessages[index]
    newMessages[index] = newMessages[index + 1]
    newMessages[index + 1] = temp
    onChange(newMessages)
  }

  // Cập nhật nội dung tin nhắn
  const handleUpdateContent = (id: string, content: string) => {
    onChange(messages.map((msg) => (msg.id === id ? { ...msg, content } : msg)))
  }

  // Cập nhật thời gian chờ
  const handleUpdateDelay = (id: string, delayHours: number) => {
    onChange(messages.map((msg) => (msg.id === id ? { ...msg, delay: delayHours } : msg)))
  }

  const formatDelay = (delayHours: number) => {
    if (delayHours < 24) {
      return `${delayHours} giờ`
    } else if (delayHours < 168) {
      const days = Math.floor(delayHours / 24)
      return `${days} ngày`
    } else {
      const weeks = Math.floor(delayHours / 168)
      return `${weeks} tuần`
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Chuỗi tin nhắn ({messages.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Chưa có tin nhắn nào trong chuỗi. Thêm tin nhắn đầu tiên bên phải.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`p-3 hover:bg-muted/50 cursor-pointer relative ${
                          activeMessageId === message.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setActiveMessageId(message.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium text-sm">
                              Tin nhắn {index + 1}
                              {index === 0 && <span className="text-xs ml-1 text-muted-foreground">(Bắt đầu)</span>}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {index === 0 ? "Ngay lập tức" : `Sau ${formatDelay(message.delay)}`}
                            </div>
                            <div className="text-sm mt-1 line-clamp-2">{message.content}</div>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoveUp(index)
                              }}
                              disabled={index === 0}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoveDown(index)
                              }}
                              disabled={index === messages.length - 1}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteMessage(message.id)
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{activeMessageId ? "Chỉnh sửa tin nhắn" : "Thêm tin nhắn mới"}</CardTitle>
            </CardHeader>
            <CardContent>
              {activeMessageId ? (
                // Chỉnh sửa tin nhắn đã chọn
                <div className="space-y-4">
                  {(() => {
                    const activeMessage = messages.find((msg) => msg.id === activeMessageId)
                    if (!activeMessage) return null

                    const activeIndex = messages.findIndex((msg) => msg.id === activeMessageId)

                    return (
                      <>
                        {activeIndex > 0 && (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                              <Label htmlFor="edit-delay">Thời gian chờ sau tin nhắn trước</Label>
                              <div className="flex items-center mt-1.5">
                                <Input
                                  id="edit-delay"
                                  type="number"
                                  min="1"
                                  className="w-20 mr-2"
                                  value={
                                    activeMessage.delay < 24
                                      ? activeMessage.delay
                                      : activeMessage.delay < 168
                                        ? Math.floor(activeMessage.delay / 24)
                                        : Math.floor(activeMessage.delay / 168)
                                  }
                                  onChange={(e) => {
                                    const value = Number.parseInt(e.target.value)
                                    if (isNaN(value) || value < 1) return

                                    let newDelay = value
                                    if (delayUnit === "days") newDelay *= 24
                                    if (delayUnit === "weeks") newDelay *= 168

                                    handleUpdateDelay(activeMessageId, newDelay)
                                  }}
                                />
                                <Select
                                  value={
                                    activeMessage.delay < 24 ? "hours" : activeMessage.delay < 168 ? "days" : "weeks"
                                  }
                                  onValueChange={(value) => {
                                    let currentValue = 0
                                    let multiplier = 1

                                    if (activeMessage.delay < 24) {
                                      currentValue = activeMessage.delay
                                    } else if (activeMessage.delay < 168) {
                                      currentValue = Math.floor(activeMessage.delay / 24)
                                      multiplier = 24
                                    } else {
                                      currentValue = Math.floor(activeMessage.delay / 168)
                                      multiplier = 168
                                    }

                                    const newMultiplier = value === "hours" ? 1 : value === "days" ? 24 : 168
                                    const newDelayHours = ((currentValue * multiplier) / newMultiplier) * newMultiplier

                                    handleUpdateDelay(activeMessageId, newDelayHours)
                                    setDelayUnit(value)
                                  }}
                                >
                                  <SelectTrigger className="w-[110px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="hours">giờ</SelectItem>
                                    <SelectItem value="days">ngày</SelectItem>
                                    <SelectItem value="weeks">tuần</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="edit-content">Nội dung tin nhắn</Label>
                          <Textarea
                            id="edit-content"
                            placeholder="Nhập nội dung tin nhắn..."
                            value={activeMessage.content}
                            onChange={(e) => handleUpdateContent(activeMessageId, e.target.value)}
                            className="min-h-[200px]"
                          />
                          <p className="text-xs text-muted-foreground">
                            Bạn có thể sử dụng các biến {"{name}"}, {"{email}"}, v.v.
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setActiveMessageId(null)}>
                            Quay lại
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">
                                <Settings className="w-4 h-4 mr-2" />
                                Cài đặt nâng cao
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Cài đặt nâng cao</DialogTitle>
                                <DialogDescription>
                                  Thiết lập các điều kiện và tùy chọn nâng cao cho tin nhắn này.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="condition">Điều kiện gửi</Label>
                                  <Select defaultValue="always">
                                    <SelectTrigger id="condition">
                                      <SelectValue placeholder="Chọn điều kiện" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="always">Luôn gửi</SelectItem>
                                      <SelectItem value="if-opened">Nếu mở tin nhắn trước</SelectItem>
                                      <SelectItem value="if-not-opened">Nếu không mở tin nhắn trước</SelectItem>
                                      <SelectItem value="if-clicked">
                                        Nếu nhấp vào liên kết trong tin nhắn trước
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="channel">Kênh gửi</Label>
                                  <Select defaultValue={channel}>
                                    <SelectTrigger id="channel">
                                      <SelectValue placeholder="Chọn kênh" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="zalo">Zalo</SelectItem>
                                      <SelectItem value="facebook">Facebook Messenger</SelectItem>
                                      <SelectItem value="multi">Đa kênh</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Lưu thay đổi</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </>
                    )
                  })()}
                </div>
              ) : (
                // Thêm tin nhắn mới
                <div className="space-y-4">
                  {messages.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="new-delay">Thời gian chờ sau tin nhắn trước</Label>
                        <div className="flex items-center mt-1.5">
                          <Input
                            id="new-delay"
                            type="number"
                            min="1"
                            className="w-20 mr-2"
                            value={newMessageDelay}
                            onChange={(e) => setNewMessageDelay(Number.parseInt(e.target.value) || 1)}
                          />
                          <Select value={delayUnit} onValueChange={setDelayUnit}>
                            <SelectTrigger className="w-[110px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hours">giờ</SelectItem>
                              <SelectItem value="days">ngày</SelectItem>
                              <SelectItem value="weeks">tuần</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="new-content">Nội dung tin nhắn</Label>
                    <Tabs defaultValue="compose">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="compose">Soạn tin nhắn</TabsTrigger>
                        <TabsTrigger value="template">Mẫu có sẵn</TabsTrigger>
                      </TabsList>
                      <TabsContent value="compose" className="pt-4">
                        <Textarea
                          id="new-content"
                          placeholder="Nhập nội dung tin nhắn..."
                          value={newMessageContent}
                          onChange={(e) => setNewMessageContent(e.target.value)}
                          className="min-h-[200px]"
                        />
                      </TabsContent>
                      <TabsContent value="template" className="pt-4">
                        <Select onValueChange={setNewMessageContent}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn mẫu tin nhắn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Xin chào {{name}}, cảm ơn bạn đã đăng ký dịch vụ của chúng tôi! Chúng tôi rất vui mừng được phục vụ bạn.">
                              Chào mừng khách hàng mới
                            </SelectItem>
                            <SelectItem value="Xin chào {{name}}, bạn đã sử dụng dịch vụ của chúng tôi được một tuần rồi! Bạn cảm thấy thế nào? Chúng tôi luôn sẵn sàng hỗ trợ bạn.">
                              Theo dõi sau một tuần
                            </SelectItem>
                            <SelectItem value="Xin chào {{name}}, chúng tôi xin gửi đến bạn mã giảm giá WELCOME20 để được giảm 20% cho lần mua hàng tiếp theo!">
                              Mã giảm giá
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {newMessageContent && (
                          <div className="mt-4 p-3 border rounded-md bg-muted">
                            <p className="text-sm">{newMessageContent}</p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                    <p className="text-xs text-muted-foreground">
                      Bạn có thể sử dụng các biến {"{name}"}, {"{email}"}, v.v.
                    </p>
                  </div>

                  <Button onClick={handleAddMessage} disabled={newMessageContent.trim() === ""}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm vào chuỗi tin nhắn
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
