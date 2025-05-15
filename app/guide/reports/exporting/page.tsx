import Link from "next/link"
import type { Metadata } from "next"
import { GuideVideo } from "@/components/guide/guide-video"
import { GuideFAQ } from "@/components/guide/guide-faq"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Xuất báo cáo | Hướng dẫn Metabot.vn",
  description: "Hướng dẫn xuất báo cáo dưới dạng PDF, Excel hoặc CSV",
}

export default function ExportingReportsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Xuất báo cáo</h1>
        <p className="text-xl text-muted-foreground">
          Hướng dẫn xuất báo cáo dưới dạng PDF, Excel hoặc CSV từ hệ thống Metabot.vn.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Các định dạng xuất báo cáo</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Định dạng phù hợp để chia sẻ và in ấn báo cáo với bố cục chuyên nghiệp.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Excel</h3>
                <p className="text-sm text-muted-foreground">
                  Định dạng .xlsx cho phép phân tích dữ liệu nâng cao và tùy chỉnh báo cáo.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">CSV</h3>
                <p className="text-sm text-muted-foreground">
                  Định dạng đơn giản để tích hợp với các công cụ phân tích dữ liệu khác.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Cách xuất báo cáo</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">1. Xuất báo cáo thủ công</h3>
            <p className="text-muted-foreground">
              Bạn có thể xuất báo cáo thủ công từ các trang báo cáo trong hệ thống.
            </p>
            <div className="mt-4 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p>Truy cập trang báo cáo (Báo cáo chi tiết hoặc Báo cáo hiệu quả chiến dịch)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p>Nhấp vào nút "Xuất báo cáo" ở góc trên bên phải của trang</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p>Chọn định dạng xuất (PDF, Excel hoặc CSV) từ hộp thoại xuất báo cáo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">4</span>
                    </div>
                    <div>
                      <p>Tùy chỉnh các tùy chọn báo cáo (tên file, cột hiển thị, v.v.)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">5</span>
                    </div>
                    <div>
                      <p>Nhấp "Xuất [ĐỊNH DẠNG]" để tải xuống báo cáo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">2. Lên lịch báo cáo tự động</h3>
            <p className="text-muted-foreground">Bạn có thể thiết lập báo cáo tự động gửi theo lịch trình định kỳ.</p>
            <div className="mt-4 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p>Truy cập trang báo cáo và nhấp vào nút "Lên lịch báo cáo"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p>Điền tên lịch trình và chọn tần suất (hàng ngày, hàng tuần, hàng tháng)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p>Chọn định dạng xuất và nhập danh sách email người nhận</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">4</span>
                    </div>
                    <div>
                      <p>Thiết lập ngày bắt đầu và các tùy chọn khác</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-primary">5</span>
                    </div>
                    <div>
                      <p>Nhấp "Lên lịch báo cáo" để hoàn tất</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Tùy chỉnh báo cáo</h2>
        <p className="text-muted-foreground">Metabot.vn cho phép bạn tùy chỉnh báo cáo theo nhiều cách khác nhau:</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Chọn cột dữ liệu</h3>
              <p className="text-sm text-muted-foreground">
                Bạn có thể chọn các cột dữ liệu cụ thể để hiển thị trong báo cáo, giúp tập trung vào thông tin quan
                trọng nhất.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Tùy chỉnh tên file</h3>
              <p className="text-sm text-muted-foreground">
                Đặt tên file báo cáo theo ý muốn để dễ dàng phân loại và tìm kiếm sau này.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Hướng trang (PDF)</h3>
              <p className="text-sm text-muted-foreground">
                Chọn hướng trang dọc hoặc ngang cho báo cáo PDF, tùy thuộc vào loại dữ liệu và cách trình bày.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Bao gồm logo công ty</h3>
              <p className="text-sm text-muted-foreground">
                Thêm logo công ty vào báo cáo PDF để tạo báo cáo chuyên nghiệp và nhất quán với thương hiệu.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Video hướng dẫn</h2>
        <GuideVideo
          title="Hướng dẫn xuất báo cáo và lên lịch báo cáo tự động"
          description="Video hướng dẫn chi tiết cách xuất báo cáo và thiết lập báo cáo tự động"
          videoId="dQw4w9WgXcQ"
        />
      </div>

      <GuideFAQ
        items={[
          {
            question: "Tôi có thể xuất báo cáo cho một khoảng thời gian tùy chỉnh không?",
            answer:
              "Có, bạn có thể sử dụng bộ lọc ngày tháng trên trang báo cáo để chọn khoảng thời gian cụ thể trước khi xuất báo cáo.",
          },
          {
            question: "Báo cáo PDF có thể chứa bao nhiêu trang?",
            answer:
              "Không có giới hạn cụ thể về số trang trong báo cáo PDF, nhưng chúng tôi khuyến nghị giới hạn dữ liệu để báo cáo không quá dài và khó đọc.",
          },
          {
            question: "Tôi có thể tùy chỉnh giao diện của báo cáo PDF không?",
            answer:
              "Hiện tại, bạn có thể tùy chỉnh một số yếu tố như logo công ty, hướng trang và các cột dữ liệu. Chúng tôi đang phát triển thêm tùy chọn tùy chỉnh giao diện trong các phiên bản tới.",
          },
          {
            question: "Báo cáo tự động sẽ được gửi vào thời điểm nào trong ngày?",
            answer:
              "Báo cáo tự động mặc định sẽ được gửi vào 8:00 sáng theo múi giờ của bạn. Bạn có thể thay đổi thời gian này trong cài đặt lên lịch báo cáo.",
          },
        ]}
      />

      <div className="flex justify-between">
        <Link href="/guide/reports/overview">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại: Báo cáo tổng quan
          </Button>
        </Link>
        <Link href="/guide/reports/scheduled">
          <Button>
            Tiếp theo: Báo cáo tự động
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
