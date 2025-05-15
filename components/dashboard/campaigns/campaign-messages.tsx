"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Copy } from "lucide-react"

interface CampaignMessagesProps {
  campaign: any
}

export default function CampaignMessages({ campaign }: CampaignMessagesProps) {
  // Dữ liệu mẫu cho nội dung tin nhắn
  const message = {
    type: "text",
    content:
      "Xin chào {{name}}, chúng tôi có ưu đãi đặc biệt dành riêng cho bạn! Giảm 20% cho tất cả sản phẩm từ ngày 01/07 đến 15/07. Đừng bỏ lỡ cơ hội này! Truy cập ngay: https://example.com/promo",
    variables: ["name"],
    links: ["https://example.com/promo"],
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Nội dung tin nhắn</CardTitle>
          <CardDescription>Nội dung tin nhắn được gửi trong chiến dịch này</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs text-blue-600">MB</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Metabot.vn</div>
                <div className="bg-gray-100 p-4 rounded-lg mt-1 text-sm whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Sao chép
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Biến động</CardTitle>
            <CardDescription>Các biến động được sử dụng trong tin nhắn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {message.variables.map((variable) => (
                <div key={variable} className="flex items-center justify-between p-2 border rounded-md">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{"{{" + variable + "}}"}</code>
                  <Badge variant="outline">Biến động</Badge>
                </div>
              ))}
              {message.variables.length === 0 && (
                <p className="text-sm text-muted-foreground">Không có biến động nào được sử dụng</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liên kết</CardTitle>
            <CardDescription>Các liên kết được sử dụng trong tin nhắn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {message.links.map((link) => (
                <div key={link} className="flex items-center justify-between p-2 border rounded-md">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm truncate max-w-[200px]"
                  >
                    {link}
                  </a>
                  <Badge variant="outline">Liên kết</Badge>
                </div>
              ))}
              {message.links.length === 0 && (
                <p className="text-sm text-muted-foreground">Không có liên kết nào được sử dụng</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
