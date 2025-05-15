"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Users, Shield, Zap, BarChart, Bot, Layers, Lock } from "lucide-react"
import { motion } from "framer-motion"

export default function Features() {
  const features = [
    {
      icon: <Layers className="h-12 w-12 text-blue-600" />,
      title: "Tích hợp đa kênh",
      description:
        "Kết nối đồng thời Zalo cá nhân, Zalo OA và các ứng dụng OTT khác như Facebook Messenger, Telegram, Viber.",
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Phân quyền & tài khoản",
      description:
        "Phân quyền cho từng nhân viên phụ trách Zalo cá nhân, OA hoặc cả hai với giới hạn truy cập theo giờ, loại tin nhắn.",
    },
    {
      icon: <MessageCircle className="h-12 w-12 text-blue-600" />,
      title: "Quản lý hội thoại",
      description: "Hợp nhất các hội thoại từ nhiều OA và Zalo cá nhân trong một giao diện All-in-one Chatbox.",
    },
    {
      icon: <Bot className="h-12 w-12 text-blue-600" />,
      title: "Gợi ý trả lời AI",
      description: "Gợi ý nội dung dựa trên từ khóa và lịch sử chat giúp nhân viên phản hồi nhanh chóng và chính xác.",
    },
    {
      icon: <Lock className="h-12 w-12 text-blue-600" />,
      title: "Lưu trữ & bảo mật",
      description: "Tự động lưu tin nhắn, không phụ thuộc thiết bị nhân viên với hệ thống bảo mật cao.",
    },
    {
      icon: <BarChart className="h-12 w-12 text-blue-600" />,
      title: "Giám sát hiệu suất",
      description: "Thống kê số lượng trả lời, thời gian phản hồi, chỉ số chất lượng theo từng nhân viên.",
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Kiểm tra vi phạm",
      description: "Quét nội dung tư vấn vi phạm theo từ khóa nhạy cảm, đảm bảo tuân thủ quy định.",
    },
    {
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      title: "Tự động hóa",
      description: "Tích hợp với CRM, landing page, form thu lead, Zalo ZNS và các hệ thống đặt hàng.",
    },
  ]

  return (
    <section id="features" className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tính năng nổi bật</h2>
          <p className="text-xl text-gray-600">
            Metabot.vn cung cấp đầy đủ công cụ để doanh nghiệp quản lý giao tiếp và chăm sóc khách hàng hiệu quả
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
