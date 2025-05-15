import Link from "next/link"
import type { Metadata } from "next"
import { GuideVideo } from "@/components/guide/guide-video"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Bắt đầu sử dụng | Hướng dẫn Metabot.vn",
  description: "Hướng dẫn bắt đầu sử dụng hệ thống Metabot.vn",
}

export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Bắt đầu sử dụng</h1>
        <p className="text-xl text-muted-foreground">
          Hướng dẫn từng bước để bắt đầu sử dụng Metabot.vn một cách hiệu quả.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Các bước cơ bản</h2>
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Đăng ký tài khoản</h3>
                  <p className="text-muted-foreground">
                    Truy cập trang chủ Metabot.vn và nhấp vào nút "Đăng ký". Điền thông tin cần thiết và xác nhận email
                    của bạn.
                  </p>
                  <div className="pt-2">
                    <Link href="/register">
                      <Button variant="outline" size="sm">
                        Đăng ký ngay
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">2</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Thiết lập thông tin công ty</h3>
                  <p className="text-muted-foreground">
                    Sau khi đăng nhập, truy cập vào phần Cài đặt &gt; Thông tin công ty để cập nhật thông tin doanh
                    nghiệp của bạn.
                  </p>
                  <div className="pt-2">
                    <Link href="/dashboard/settings">
                      <Button variant="outline" size="sm">
                        Đi đến Cài đặt
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">3</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Kết nối kênh chat</h3>
                  <p className="text-muted-foreground">
                    Kết nối Metabot.vn với các kênh chat như Zalo, Facebook Messenger, Telegram hoặc Viber để bắt đầu
                    quản lý tin nhắn.
                  </p>
                  <div className="pt-2">
                    <Link href="/guide/settings/connections">
                      <Button variant="outline" size="sm">
                        Xem hướng dẫn kết nối
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">4</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Thêm nhân viên</h3>
                  <p className="text-muted-foreground">
                    Mời các thành viên trong đội ngũ của bạn tham gia vào hệ thống và phân quyền cho họ.
                  </p>
                  <div className="pt-2">
                    <Link href="/guide/staff/adding">
                      <Button variant="outline" size="sm">
                        Xem hướng dẫn thêm nhân viên
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">5</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Bắt đầu trò chuyện</h3>
                  <p className="text-muted-foreground">
                    Truy cập vào phần Hội thoại để bắt đầu quản lý và trả lời tin nhắn từ khách hàng.
                  </p>
                  <div className="pt-2">
                    <Link href="/guide/conversations/replying">
                      <Button variant="outline" size="sm">
                        Xem hướng dẫn trả lời tin nhắn
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Video hướng dẫn</h2>
        <GuideVideo
          title="Hướng dẫn thiết lập ban đầu"
          description="Video hướng dẫn chi tiết các bước thiết lập ban đầu cho Metabot.vn"
          videoId="dQw4w9WgXcQ"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Tính năng nổi bật</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start space-x-2">
            <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <h3 className="font-bold">Quản lý hội thoại đa kênh</h3>
              <p className="text-sm text-muted-foreground">
                Quản lý tin nhắn từ nhiều kênh chat khác nhau trong một giao diện duy nhất.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <h3 className="font-bold">AI gợi ý trả lời</h3>
              <p className="text-sm text-muted-foreground">
                Sử dụng AI để tự động gợi ý các câu trả lời phù hợp cho tin nhắn của khách hàng.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <h3 className="font-bold">Chiến dịch marketing</h3>
              <p className="text-sm text-muted-foreground">
                Tạo và quản lý các chiến dịch marketing qua tin nhắn với nhiều tùy chọn nhắm mục tiêu.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <h3 className="font-bold">Báo cáo và phân tích</h3>
              <p className="text-sm text-muted-foreground">
                Xem báo cáo chi tiết về hiệu quả tương tác và chiến dịch marketing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div></div>
        <Link href="/guide/user-interface">
          <Button>
            Tiếp theo: Giao diện người dùng
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
