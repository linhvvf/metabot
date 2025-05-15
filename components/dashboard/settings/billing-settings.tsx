"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Download, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"

export default function BillingSettings() {
  const [currentPlan, setCurrentPlan] = useState("professional")
  const { toast } = useToast()

  const handleUpgrade = (plan) => {
    toast({
      title: "Nâng cấp gói dịch vụ",
      description: `Đang chuyển hướng đến trang thanh toán cho gói ${plan}...`,
    })
  }

  const handleDowngrade = () => {
    toast({
      title: "Hạ cấp gói dịch vụ",
      description: "Đang chuyển hướng đến trang xác nhận hạ cấp...",
    })
  }

  const handleDownloadInvoice = (invoiceId) => {
    toast({
      title: "Tải xuống hóa đơn",
      description: "Đang tải xuống hóa đơn...",
    })
  }

  // Mock data for invoices
  const invoices = [
    {
      id: "INV-2023-001",
      date: "2023-05-01",
      amount: 999000,
      status: "paid",
    },
    {
      id: "INV-2023-002",
      date: "2023-04-01",
      amount: 999000,
      status: "paid",
    },
    {
      id: "INV-2023-003",
      date: "2023-03-01",
      amount: 999000,
      status: "paid",
    },
  ]

  // Plans data
  const plans = [
    {
      id: "basic",
      name: "Cơ bản",
      price: "499.000",
      description: "Dành cho doanh nghiệp nhỏ",
      features: [
        "Kết nối 1 tài khoản Zalo cá nhân",
        "Kết nối 1 Zalo OA",
        "Quản lý 3 nhân viên",
        "Lưu trữ tin nhắn 30 ngày",
        "Hỗ trợ kỹ thuật qua email",
      ],
    },
    {
      id: "professional",
      name: "Chuyên nghiệp",
      price: "999.000",
      description: "Dành cho doanh nghiệp vừa",
      features: [
        "Kết nối 5 tài khoản Zalo cá nhân",
        "Kết nối 2 Zalo OA",
        "Quản lý 10 nhân viên",
        "Lưu trữ tin nhắn 90 ngày",
        "Tích hợp Facebook Messenger",
        "Gợi ý trả lời AI",
        "Hỗ trợ kỹ thuật 24/7",
      ],
    },
    {
      id: "enterprise",
      name: "Doanh nghiệp",
      price: "1.999.000",
      description: "Dành cho doanh nghiệp lớn",
      features: [
        "Kết nối không giới hạn Zalo cá nhân",
        "Kết nối không giới hạn Zalo OA",
        "Quản lý không giới hạn nhân viên",
        "Lưu trữ tin nhắn vĩnh viễn",
        "Tích hợp tất cả nền tảng OTT",
        "Gợi ý trả lời AI nâng cao",
        "API tùy chỉnh & webhook",
        "Hỗ trợ kỹ thuật 24/7 ưu tiên",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thanh toán</h3>
        <p className="text-sm text-muted-foreground">Quản lý gói dịch vụ và thông tin thanh toán</p>
      </div>
      <Separator />

      <div>
        <h4 className="text-base font-medium mb-4">Gói dịch vụ hiện tại</h4>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-medium text-blue-800">Gói Chuyên nghiệp</h5>
                <Badge className="bg-blue-100 text-blue-800">Đang sử dụng</Badge>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Chu kỳ thanh toán: Hàng tháng - Gia hạn tiếp theo: 01/06/2023
              </p>
            </div>
            <Button variant="outline" className="bg-white">
              Thay đổi chu kỳ thanh toán
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`border ${currentPlan === plan.id ? "border-blue-500 shadow-md" : ""}`}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-2xl font-bold">{plan.price}đ</span>
                  <span className="text-muted-foreground">/tháng</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {currentPlan === plan.id ? (
                  <Button variant="outline" className="w-full" disabled>
                    Gói hiện tại
                  </Button>
                ) : currentPlan === "enterprise" && plan.id !== "enterprise" ? (
                  <Button variant="outline" className="w-full" onClick={handleDowngrade}>
                    Hạ cấp
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${plan.id === "enterprise" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    Nâng cấp
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Phương thức thanh toán</h4>
        <div className="border rounded-md p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Thẻ tín dụng •••• 4242</p>
                <p className="text-sm text-muted-foreground">Hết hạn: 12/2025</p>
              </div>
            </div>
            <Badge>Mặc định</Badge>
          </div>
        </div>
        <Button variant="outline">Thêm phương thức thanh toán</Button>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Lịch sử thanh toán</h4>
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Mã hóa đơn</th>
                <th className="text-left p-3 font-medium">Ngày</th>
                <th className="text-left p-3 font-medium">Số tiền</th>
                <th className="text-left p-3 font-medium">Trạng thái</th>
                <th className="text-right p-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b">
                  <td className="p-3">{invoice.id}</td>
                  <td className="p-3">{invoice.date}</td>
                  <td className="p-3">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(invoice.amount)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      {invoice.status === "paid" ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-600">Đã thanh toán</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-600">Chưa thanh toán</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Tải xuống
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Thông tin thanh toán</h4>
        <div className="border rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium mb-2">Thông tin công ty</h5>
              <p className="text-sm">Công ty TNHH ABC</p>
              <p className="text-sm">Mã số thuế: 0123456789</p>
              <p className="text-sm">123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">Người liên hệ</h5>
              <p className="text-sm">Nguyễn Văn A</p>
              <p className="text-sm">Email: nguyenvana@example.com</p>
              <p className="text-sm">Điện thoại: 0901234567</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline">Cập nhật thông tin thanh toán</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
