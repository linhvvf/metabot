import Link from "next/link"
import type { Metadata } from "next"
import { GuideFAQ } from "@/components/guide/guide-faq"
import { GuideVideo } from "@/components/guide/guide-video"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, MessageSquare, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Hướng dẫn sử dụng | Metabot.vn",
  description: "Hướng dẫn sử dụng chi tiết cho hệ thống Metabot.vn",
}

export default function GuidePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Hướng dẫn sử dụng Metabot.vn</h1>
        <p className="text-xl text-muted-foreground">
          Chào mừng bạn đến với trang hướng dẫn sử dụng Metabot.vn. Tại đây, bạn sẽ tìm thấy tất cả thông tin cần thiết
          để sử dụng hiệu quả hệ thống của chúng tôi.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bắt đầu sử dụng</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Làm quen với hệ thống</div>
            <p className="text-xs text-muted-foreground pt-1">Hướng dẫn cơ bản để bắt đầu sử dụng Metabot.vn</p>
            <div className="mt-4">
              <Link href="/guide/getting-started">
                <Button variant="outline" size="sm" className="w-full">
                  Xem hướng dẫn
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quản lý hội thoại</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tương tác với khách hàng</div>
            <p className="text-xs text-muted-foreground pt-1">Hướng dẫn quản lý và trả lời tin nhắn hiệu quả</p>
            <div className="mt-4">
              <Link href="/guide/conversations/overview">
                <Button variant="outline" size="sm" className="w-full">
                  Xem hướng dẫn
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quản lý khách hàng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Thông tin khách hàng</div>
            <p className="text-xs text-muted-foreground pt-1">Hướng dẫn quản lý thông tin và phân loại khách hàng</p>
            <div className="mt-4">
              <Link href="/guide/customers/managing">
                <Button variant="outline" size="sm" className="w-full">
                  Xem hướng dẫn
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Video hướng dẫn</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <GuideVideo
            title="Giới thiệu tổng quan Metabot.vn"
            description="Video giới thiệu tổng quan về các tính năng chính của Metabot.vn"
            videoId="dQw4w9WgXcQ"
          />
          <GuideVideo
            title="Hướng dẫn thiết lập ban đầu"
            description="Các bước cần thiết để thiết lập hệ thống Metabot.vn"
            videoId="dQw4w9WgXcQ"
          />
        </div>
      </div>

      <GuideFAQ
        title="Câu hỏi thường gặp"
        description="Các câu hỏi thường gặp khi sử dụng Metabot.vn"
        items={[
          {
            question: "Làm thế nào để kết nối Metabot.vn với Zalo OA?",
            answer:
              "Để kết nối Metabot.vn với Zalo OA, bạn cần truy cập vào phần Cài đặt > Kết nối kênh chat > Zalo và làm theo hướng dẫn. Bạn sẽ cần cung cấp thông tin xác thực từ tài khoản Zalo OA của bạn.",
          },
          {
            question: "Làm thế nào để tạo chiến dịch marketing mới?",
            answer:
              "Để tạo chiến dịch marketing mới, bạn cần truy cập vào mục Chiến dịch từ sidebar, sau đó nhấp vào nút 'Tạo chiến dịch mới'. Điền thông tin chiến dịch, chọn đối tượng khách hàng, soạn nội dung tin nhắn và lên lịch gửi.",
          },
          {
            question: "Làm thế nào để sử dụng tính năng AI gợi ý trả lời?",
            answer:
              "Để sử dụng tính năng AI gợi ý trả lời, khi bạn đang xem một hội thoại, bạn sẽ thấy nút 'Gợi ý trả lời' bên cạnh ô nhập tin nhắn. Nhấp vào nút này, AI sẽ phân tích nội dung hội thoại và đưa ra các gợi ý trả lời phù hợp.",
          },
          {
            question: "Làm thế nào để xuất báo cáo hiệu quả chiến dịch?",
            answer:
              "Để xuất báo cáo hiệu quả chiến dịch, truy cập vào mục Hiệu quả chiến dịch từ sidebar, chọn chiến dịch cần xuất báo cáo, sau đó nhấp vào nút 'Xuất báo cáo' ở góc trên bên phải. Chọn định dạng xuất (PDF, Excel hoặc CSV) và tùy chỉnh các tùy chọn báo cáo theo nhu cầu.",
          },
          {
            question: "Làm thế nào để phân quyền cho nhân viên?",
            answer:
              "Để phân quyền cho nhân viên, truy cập vào mục Nhân viên từ sidebar, chọn nhân viên cần phân quyền, sau đó nhấp vào nút 'Chỉnh sửa' hoặc biểu tượng ba chấm để mở menu tùy chọn. Chọn 'Phân quyền' và thiết lập các quyền phù hợp cho nhân viên đó.",
          },
        ]}
      />
    </div>
  )
}
