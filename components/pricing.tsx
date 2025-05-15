"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

export default function Pricing() {
  const plans = [
    {
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
      popular: false,
    },
    {
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
      popular: true,
    },
    {
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
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bảng giá dịch vụ</h2>
          <p className="text-xl text-gray-600">Lựa chọn gói dịch vụ phù hợp với nhu cầu của doanh nghiệp bạn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={plan.popular ? "md:-mt-4 md:mb-4" : ""}
            >
              <Card
                className={`h-full border-none shadow-lg hover:shadow-xl transition-shadow ${plan.popular ? "border-2 border-blue-500 relative" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Phổ biến nhất
                  </div>
                )}
                <CardHeader className={`${plan.popular ? "bg-blue-50" : ""}`}>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}đ</span>
                    <span className="text-gray-600">/tháng</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Đăng ký ngay
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Cần giải pháp tùy chỉnh?{" "}
            <a href="#contact" className="text-blue-600 font-medium">
              Liên hệ với chúng tôi
            </a>{" "}
            để được tư vấn.
          </p>
        </div>
      </div>
    </section>
  )
}
