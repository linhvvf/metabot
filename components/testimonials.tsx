"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      content:
        "Metabot.vn giúp chúng tôi quản lý hàng nghìn cuộc hội thoại Zalo mỗi ngày. Việc tích hợp cả Zalo cá nhân và Zalo OA giúp tiết kiệm thời gian và nâng cao hiệu quả chăm sóc khách hàng.",
      author: "Nguyễn Văn A",
      position: "Giám đốc kinh doanh, Công ty ABC",
      avatar: "/business-person-avatar.png",
    },
    {
      content:
        "Tính năng phân quyền và giám sát hiệu suất giúp tôi dễ dàng quản lý đội ngũ tư vấn viên. Báo cáo thời gian thực giúp tôi nắm bắt tình hình và đưa ra quyết định nhanh chóng.",
      author: "Trần Thị B",
      position: "Quản lý CSKH, Công ty XYZ",
      avatar: "/female-manager-avatar.png",
    },
    {
      content:
        "Chúng tôi đã tăng 40% tỷ lệ chuyển đổi sau khi sử dụng Metabot.vn. Khả năng tự động hóa và tích hợp với CRM giúp quy trình bán hàng trở nên mượt mà và hiệu quả hơn.",
      author: "Lê Văn C",
      position: "CEO, Startup DEF",
      avatar: "/ceo-avatar.png",
    },
  ]

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Khách hàng nói gì về chúng tôi</h2>
          <p className="text-xl text-gray-600">
            Hàng nghìn doanh nghiệp đã tin tưởng và sử dụng Metabot.vn để nâng cao hiệu quả chăm sóc khách hàng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="h-10 w-10 text-blue-200 mb-4" />
                  <p className="text-gray-700 flex-grow mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
