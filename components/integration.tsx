"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function Integration() {
  const integrations = [
    { name: "Zalo Cá nhân", logo: "/zalo-logo.png" },
    { name: "Zalo OA", logo: "/placeholder.svg?key=nohsv" },
    { name: "Facebook Messenger", logo: "/facebook-messenger-logo.png" },
    { name: "Telegram", logo: "/telegram-logo.png" },
    { name: "Viber", logo: "/viber-logo.png" },
  ]

  const benefits = [
    "Quản lý tập trung tất cả kênh liên lạc",
    "Phân quyền nhân viên theo từng kênh",
    "Lưu trữ và bảo mật tin nhắn",
    "Gửi tin nhắn chăm sóc (ZNS) tự động",
    "Tích hợp với CRM và các hệ thống khác",
    "Báo cáo hiệu suất theo thời gian thực",
  ]

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tích hợp đa nền tảng <br />
              <span className="text-blue-600">trong một hệ thống duy nhất</span>
            </h2>
            <p className="text-xl text-gray-600">
              Metabot.vn là nền tảng duy nhất tại Việt Nam cho phép doanh nghiệp điều phối và giám sát toàn diện mọi
              hoạt động tư vấn khách hàng qua cả Zalo cá nhân & OA.
            </p>

            <div className="space-y-3 pt-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative w-16 h-16 mb-3">
                      <Image
                        src={integration.logo || "/placeholder.svg"}
                        alt={integration.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm font-medium text-center">{integration.name}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-center text-blue-800 font-medium">
                  Tích hợp API webhook để kết nối với phần mềm nội bộ của doanh nghiệp
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
