"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, Copy, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AIMessageGeneratorProps {
  channel: string
  onSelectMessage: (message: string) => void
}

export default function AIMessageGenerator({ channel, onSelectMessage }: AIMessageGeneratorProps) {
  const { toast } = useToast()
  const [goal, setGoal] = useState("")
  const [audience, setAudience] = useState("")
  const [tone, setTone] = useState("professional")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMessages, setGeneratedMessages] = useState<string[]>([])
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  // Xử lý tạo tin nhắn bằng AI
  const handleGenerateMessages = async () => {
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
      const response = await fetch("/api/ai/generate-campaign-message", {
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
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate messages")
      }

      const data = await response.json()
      setGeneratedMessages(data.messages || [])
    } catch (error) {
      console.error("Error generating messages:", error)
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
  const handleCopyMessage = (index: number) => {
    navigator.clipboard.writeText(generatedMessages[index])
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)

    toast({
      title: "Đã sao chép",
      description: "Nội dung tin nhắn đã được sao chép vào clipboard",
    })
  }

  // Xử lý chọn tin nhắn
  const handleSelectMessage = (index: number) => {
    setSelectedMessage(index)
    onSelectMessage(generatedMessages[index])

    toast({
      title: "Đã chọn mẫu tin nhắn",
      description: "Mẫu tin nhắn đã được thêm vào nội dung chiến dịch",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
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
          <Label htmlFor="additional-info">Thông tin bổ sung (tùy chọn)</Label>
          <Textarea
            id="additional-info"
            placeholder="Các thông tin bổ sung về chiến dịch, sản phẩm, dịch vụ,..."
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows={3}
          />
        </div>

        <Button onClick={handleGenerateMessages} disabled={isGenerating || !goal} className="w-full">
          <Wand2 className="mr-2 h-4 w-4" />
          {isGenerating ? "Đang tạo..." : "Tạo tin nhắn bằng AI"}
        </Button>
      </div>

      {generatedMessages.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <h3 className="font-medium">Các mẫu tin nhắn đề xuất</h3>

          <div className="space-y-4">
            {generatedMessages.map((message, index) => (
              <Card key={index} className={selectedMessage === index ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="mb-2 flex justify-between items-center">
                    <h4 className="font-medium text-sm">Mẫu {index + 1}</h4>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleCopyMessage(index)}>
                        {copied === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant={selectedMessage === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSelectMessage(index)}
                      >
                        {selectedMessage === index ? "Đã chọn" : "Chọn"}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
