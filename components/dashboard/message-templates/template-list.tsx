"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { TemplatePreviewDialog } from "./template-preview-dialog"
import { DeleteTemplateDialog } from "./delete-template-dialog"

// Dữ liệu mẫu
const templates = [
  {
    id: "1",
    title: "Chào mừng khách hàng mới",
    category: "Chào mừng",
    content:
      "Xin chào {{tên_khách_hàng}}, chúng tôi rất vui mừng được chào đón bạn đến với dịch vụ của chúng tôi. Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ.",
    updatedAt: "2023-05-10T10:30:00Z",
    channels: ["zalo", "messenger"],
    variables: ["tên_khách_hàng"],
  },
  {
    id: "2",
    title: "Thông báo khuyến mãi",
    category: "Tiếp thị",
    content:
      "Xin chào {{tên_khách_hàng}}, chúng tôi có chương trình khuyến mãi đặc biệt dành cho bạn. Nhập mã {{mã_khuyến_mãi}} để được giảm 20% cho đơn hàng tiếp theo.",
    updatedAt: "2023-05-15T14:20:00Z",
    channels: ["email", "sms"],
    variables: ["tên_khách_hàng", "mã_khuyến_mãi"],
  },
  {
    id: "3",
    title: "Nhắc nhở cuộc hẹn",
    category: "Nhắc nhở",
    content:
      "Xin chào {{tên_khách_hàng}}, đây là lời nhắc nhở về cuộc hẹn của bạn vào {{thời_gian_hẹn}} ngày {{ngày_hẹn}}. Vui lòng xác nhận tham dự hoặc sắp xếp lại lịch nếu cần.",
    updatedAt: "2023-05-18T09:15:00Z",
    channels: ["zalo", "sms"],
    variables: ["tên_khách_hàng", "thời_gian_hẹn", "ngày_hẹn"],
  },
  {
    id: "4",
    title: "Cảm ơn sau khi mua hàng",
    category: "Cảm ơn",
    content:
      "Cảm ơn {{tên_khách_hàng}} đã mua hàng tại cửa hàng chúng tôi. Chúng tôi hy vọng bạn hài lòng với sản phẩm. Đơn hàng {{mã_đơn_hàng}} của bạn đang được xử lý.",
    updatedAt: "2023-05-20T16:45:00Z",
    channels: ["email", "messenger"],
    variables: ["tên_khách_hàng", "mã_đơn_hàng"],
  },
  {
    id: "5",
    title: "Hỏi đánh giá sản phẩm",
    category: "Phản hồi",
    content:
      "Xin chào {{tên_khách_hàng}}, chúng tôi rất mong nhận được đánh giá của bạn về sản phẩm {{tên_sản_phẩm}}. Ý kiến của bạn sẽ giúp chúng tôi cải thiện dịch vụ tốt hơn.",
    updatedAt: "2023-05-22T11:30:00Z",
    channels: ["email", "zalo"],
    variables: ["tên_khách_hàng", "tên_sản_phẩm"],
  },
  {
    id: "6",
    title: "Thông báo khuyến mãi cuối tuần",
    category: "Tiếp thị",
    content:
      "Xin chào {{tên_khách_hàng}}, chúng tôi có chương trình khuyến mãi cuối tuần với nhiều ưu đãi hấp dẫn. Ghé thăm cửa hàng để biết thêm chi tiết.",
    updatedAt: "2023-05-24T13:10:00Z",
    channels: ["sms", "messenger"],
    variables: ["tên_khách_hàng"],
  },
]

export function TemplateList() {
  const [previewTemplate, setPreviewTemplate] = useState<(typeof templates)[0] | null>(null)
  const [deleteTemplate, setDeleteTemplate] = useState<(typeof templates)[0] | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{template.category}</Badge>
                    <span className="text-xs">Cập nhật: {formatDate(template.updatedAt)}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground line-clamp-3">{template.content}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {template.channels.map((channel) => (
                  <Badge key={channel} variant="secondary" className="text-xs">
                    {channel}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPreviewTemplate(template)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Xem
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(template.content)}>
                  <Copy className="h-4 w-4 mr-1" />
                  Sao chép
                </Button>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/message-templates/${template.id}`}>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4 mr-1" />
                    Sửa
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => setDeleteTemplate(template)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Xóa
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {previewTemplate && (
        <TemplatePreviewDialog
          template={previewTemplate}
          open={!!previewTemplate}
          onOpenChange={() => setPreviewTemplate(null)}
        />
      )}

      {deleteTemplate && (
        <DeleteTemplateDialog
          template={deleteTemplate}
          open={!!deleteTemplate}
          onOpenChange={() => setDeleteTemplate(null)}
        />
      )}
    </>
  )
}
