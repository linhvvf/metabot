"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Cta() {
  return (
    <section id="contact" className="w-full py-20 bg-blue-600">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sẵn sàng nâng cao hiệu quả chăm sóc khách hàng?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Đăng ký dùng thử miễn phí 14 ngày và trải nghiệm sức mạnh của nền tảng quản lý giao tiếp đa kênh hàng đầu
            Việt Nam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/register">
                Dùng thử miễn phí
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700" asChild>
              <Link href="#demo">Xem demo</Link>
            </Button>
          </div>
          <p className="mt-6 text-blue-200 text-sm">Không cần thẻ tín dụng. Hủy bất kỳ lúc nào.</p>
        </motion.div>
      </div>
    </section>
  )
}
