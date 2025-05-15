"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, MessageCircle, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { OptimizedImage } from "@/components/ui/optimized-image"

export default function Hero() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              <Zap size={16} className="mr-1" aria-hidden="true" />
              <span>Nền tảng CRM đa kênh hàng đầu Việt Nam</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Quản lý giao tiếp & chăm sóc khách hàng đa kênh
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Kết nối và quản lý đồng thời Zalo cá nhân, Zalo Official Account (OA) và các ứng dụng OTT khác trên một
              nền tảng duy nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Dùng thử miễn phí
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Tìm hiểu thêm</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-xs"
                    aria-hidden="true"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">1,000+ doanh nghiệp</span> đang sử dụng Metabot.vn
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="/dashboard-chat-analytics.png"
                alt="Giao diện quản lý tin nhắn đa kênh Metabot.vn"
                fill
                className="object-cover"
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-10 w-10 text-blue-600" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-gray-900">Quản lý tin nhắn đa kênh</h3>
                    <p className="text-sm text-gray-600">
                      Tất cả tin nhắn từ Zalo, Facebook, Telegram trong một giao diện
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
