"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Copy, Edit, Loader2, Trash, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ABTestSetupProps {
  onSave: (testData: any) => void
  campaignId?: string
}

export default function ABTestSetup({ onSave, campaignId }: ABTestSetupProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [testName, setTestName] = useState("")
  const [goal, setGoal] = useState("")
  const [audience, setAudience] = useState("")
  const [tone, setTone] = useState("professional")
  const [channel, setChannel] = useState("zalo")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [variations, setVariations] = useState(3)
  const [testDuration, setTestDuration] = useState(7)
  const [trafficSplit, setTrafficSplit] = useState<number[]>([50, 50])
  const [autoOptimize, setAutoOptimize] = useState(true)
  const [primaryMetric, setPrimaryMetric] = useState("open_rate")
  const [generatedVariants, setGeneratedVariants] = useState<any[]>([])
  const [editingVariant, setEditingVariant] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")

  // Xử lý tạo các phiên bản tin nhắn bằng AI
  const handleGenerateVariants = async () => {
    if (!goal) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng nhập mục tiêu chiến dịch để tạo tin nhắn",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/ai/ab-test-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          audience,
          tone,
          additionalInfo,
          channel,
          variations,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate messages")
      }

      const data = await response.json()
      setGeneratedVariants(data.messages || [])
      setStep(2)
    } catch (error) {
      console.error("Error generating variants:", error)
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể tạo tin nhắn. Vui lòng thử lại sau.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Xử lý sao chép tin nhắn
  const handleCopyVariant = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Đã sao chép",
      description: "Nội dung tin nhắn đã được sao chép vào clipboard",
    })
  }

  // Xử lý chỉnh sửa phiên bản
  const handleEditVariant = (index: number, content: string) => {
    setEditingVariant(index)
    setEditContent(content)
  }

  // Lưu phiên bản đã chỉnh sửa
  const handleSaveEdit = (index: number) => {
    const updatedVariants = [...generatedVariants]
    updatedVariants[index] = {
      ...updatedVariants[index],
      content: editContent,
    }
    setGeneratedVariants(updatedVariants)
    setEditingVariant(null)
    setEditContent("")
  }

  // Xóa phiên bản
  const handleDeleteVariant = (index: number) => {
    const updatedVariants = [...generatedVariants]
    updatedVariants.splice(index, 1)
    setGeneratedVariants(updatedVariants)
  }

  // Thêm phiên bản mới
  const handleAddVariant = () => {
    const newVariant = {
      id: `variant-${generatedVariants.length + 1}`,
      name: `Phiên bản ${generatedVariants.length + 1}`,
      content: "",
    }
    setGeneratedVariants([...generatedVariants, newVariant])
    setEditingVariant(generatedVariants.length)
    setEditContent("")
  }

  // Xử lý lưu thiết lập A/B testing
  const handleSaveTest = () => {
    if (!testName) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng nhập tên cho thử nghiệm A/B",
      })
      return
    }

    if (generatedVariants.length < 2) {
      toast({
        variant: "destructive",
        title: "Thiếu phiên bản",
        description: "Cần ít nhất 2 phiên bản tin nhắn để thực hiện A/B testing",
      })
      return
    }

    // Tạo dữ liệu thử nghiệm A/B
    const testData = {
      id: `test-${Date.now()}`,
      name: testName,
      campaignId,
      goal,
      audience,
      tone,
      channel,
      additionalInfo,
      variants: generatedVariants,
      settings: {
        duration: testDuration,
        trafficSplit,
        autoOptimize,
        primaryMetric,
        startDate: new Date(),
        status: "scheduled",
      },
    }

    onSave(testData)
    toast({
      title: "Đã lưu thử nghiệm A/B",
      description: "Thử nghiệm A/B đã được thiết lập thành công",
    })
  }

  // Điều chỉnh phân chia lưu lượng
  const handleTrafficSplitChange = (value: number[]) => {
    // Đảm bảo tổng là 100%
    const firstValue = value[0]
    setTrafficSplit([firstValue, 100 - firstValue])
  }

  return (
    <div className="space-y-6">
      <Tabs value={`step-${step}`} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="step-1" onClick={() => setStep(1)} disabled={isGenerating}>
            1. Thiết lập thử nghiệm
          </TabsTrigger>
          <TabsTrigger
            value="step-2"
            onClick={() => setStep(2)}
            disabled={generatedVariants.length === 0 || isGenerating}
          >
            2. Cấu hình & Phiên bản
          </TabsTrigger>
        </TabsList>

        <TabsContent value="step-1" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Thiết lập thử nghiệm A/B</CardTitle>
              <CardDescription>
                Tạo nhiều phiên bản tin nhắn khác nhau để kiểm tra hiệu quả của từng phiên bản
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-name">Tên thử nghiệm</Label>
                <Input
                  id="test-name"
                  placeholder="Nhập tên thử nghiệm A/B"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-goal">Mục tiêu chiến dịch</Label>
                <Input
                  id="campaign-goal"
                  placeholder="Ví dụ: Giới thiệu sản phẩm mới, khuyến mãi đặc biệt, thu thập phản hồi,..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience-description">Mô tả đối tượng khách hàng</Label>
                <Input
                  id="audience-description"
                  placeholder="Ví dụ: Khách hàng hiện tại, khách hàng tiềm năng, doanh nghiệp nhỏ,..."
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Giọng điệu</Label>
                <RadioGroup value={tone} onValueChange={setTone} className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional">Chuyên nghiệp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friendly" id="friendly" />
                    <Label htmlFor="friendly">Thân thiện</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="casual" id="casual" />
                    <Label htmlFor="casual">Thân mật</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formal" id="formal" />
                    <Label htmlFor="formal">Trang trọng</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="persuasive" id="persuasive" />
                    <Label htmlFor="persuasive">Thuyết phục</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Kênh gửi tin nhắn</Label>
                <Select value={channel} onValueChange={setChannel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kênh gửi tin nhắn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zalo">Zalo</SelectItem>
                    <SelectItem value="facebook">Facebook Messenger</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="multi">Đa kênh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">Thông tin bổ sung (tùy chọn)</Label>
                <Textarea
                  id="additional-info"
                  placeholder="Các thông tin bổ sung về chiến dịch, sản phẩm, dịch vụ,..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Số lượng phiên bản</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[variations]}
                    min={2}
                    max={5}
                    step={1}
                    onValueChange={(value) => setVariations(value[0])}
                    className="flex-1"
                  />
                  <span className="w-8 text-center">{variations}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateVariants} disabled={isGenerating || !goal} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Tạo phiên bản tin nhắn
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="step-2" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình thử nghiệm</CardTitle>
              <CardDescription>Thiết lập các thông số cho thử nghiệm A/B</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Thời gian chạy thử nghiệm</Label>
                <Select
                  value={testDuration.toString()}
                  onValueChange={(value) => setTestDuration(Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thời gian chạy thử nghiệm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 ngày</SelectItem>
                    <SelectItem value="7">7 ngày</SelectItem>
                    <SelectItem value="14">14 ngày</SelectItem>
                    <SelectItem value="30">30 ngày</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Phân chia lưu lượng</Label>
                  <span className="text-sm text-muted-foreground">
                    {trafficSplit[0]}% / {trafficSplit[1]}%
                  </span>
                </div>
                <Slider value={[trafficSplit[0]]} min={10} max={90} step={5} onValueChange={handleTrafficSplitChange} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Phiên bản A: {trafficSplit[0]}%</span>
                  <span>Phiên bản B: {trafficSplit[1]}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Chỉ số đánh giá chính</Label>
                <Select value={primaryMetric} onValueChange={setPrimaryMetric}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chỉ số đánh giá chính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open_rate">Tỷ lệ mở</SelectItem>
                    <SelectItem value="click_rate">Tỷ lệ nhấp chuột</SelectItem>
                    <SelectItem value="conversion_rate">Tỷ lệ chuyển đổi</SelectItem>
                    <SelectItem value="response_rate">Tỷ lệ phản hồi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Tự động tối ưu hóa</Label>
                  <p className="text-sm text-muted-foreground">
                    Tự động chọn phiên bản hiệu quả nhất sau khi có đủ dữ liệu
                  </p>
                </div>
                <Switch checked={autoOptimize} onCheckedChange={setAutoOptimize} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Các phiên bản tin nhắn</CardTitle>
              <CardDescription>Xem và chỉnh sửa các phiên bản tin nhắn cho thử nghiệm A/B</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedVariants.map((variant, index) => (
                <Card key={variant.id} className="border-muted">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {variant.name} {index === 0 ? "(A)" : index === 1 ? "(B)" : ""}
                      </CardTitle>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopyVariant(variant.content)}
                          title="Sao chép"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditVariant(index, variant.content)}
                          title="Chỉnh sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {generatedVariants.length > 2 && (
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteVariant(index)} title="Xóa">
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    {editingVariant === index ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={5}
                          className="resize-none"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingVariant(null)
                              setEditContent("")
                            }}
                          >
                            Hủy
                          </Button>
                          <Button variant="default" size="sm" onClick={() => handleSaveEdit(index)}>
                            Lưu
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{variant.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="w-full" onClick={handleAddVariant}>
                Thêm phiên bản mới
              </Button>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveTest} className="w-full">
                <Check className="mr-2 h-4 w-4" />
                Lưu thử nghiệm A/B
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
