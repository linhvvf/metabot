"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, BarChart, Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import ABTestSetup from "@/components/dashboard/campaigns/ab-test-setup"
import ABTestResults from "@/components/dashboard/campaigns/ab-test-results"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Dữ liệu mẫu cho các thử nghiệm A/B
const mockTests = [
  {
    id: "test-1",
    name: "Thử nghiệm khuyến mãi tháng 7",
    campaignId: "campaign-1",
    goal: "Giới thiệu khuyến mãi giảm giá 20% cho khách hàng hiện tại",
    audience: "Khách hàng hiện tại đã mua hàng trong 3 tháng qua",
    tone: "friendly",
    channel: "zalo",
    additionalInfo: "Khuyến mãi áp dụng từ 01/07 đến 15/07",
    variants: [
      {
        id: "variant-1",
        name: "Phiên bản 1",
        content:
          "Xin chào {{name}}, chúng tôi có ưu đãi đặc biệt dành riêng cho bạn! Giảm 20% cho tất cả sản phẩm từ ngày 01/07 đến 15/07. Đừng bỏ lỡ cơ hội này! Truy cập ngay để xem chi tiết.",
      },
      {
        id: "variant-2",
        name: "Phiên bản 2",
        content:
          "{{name}} thân mến, NHANH TAY LÊN! Chỉ còn 2 tuần để bạn nhận ưu đãi giảm 20% cho tất cả sản phẩm. Khuyến mãi kết thúc vào 15/07. Đặt hàng ngay hôm nay!",
      },
    ],
    settings: {
      duration: 7,
      trafficSplit: [50, 50],
      autoOptimize: true,
      primaryMetric: "click_rate",
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 ngày trước
      status: "running",
    },
  },
  {
    id: "test-2",
    name: "Thử nghiệm chào mừng khách hàng mới",
    campaignId: "campaign-2",
    goal: "Chào mừng khách hàng mới đăng ký và giới thiệu các tính năng của sản phẩm",
    audience: "Khách hàng mới đăng ký trong 7 ngày qua",
    tone: "professional",
    channel: "email",
    additionalInfo: "Cần giới thiệu các tính năng chính và hướng dẫn bắt đầu",
    variants: [
      {
        id: "variant-1",
        name: "Phiên bản 1",
        content:
          "Kính chào {{name}}, Cảm ơn bạn đã đăng ký dịch vụ của chúng tôi. Chúng tôi rất vui mừng được chào đón bạn! Hãy khám phá các tính năng chính của sản phẩm tại đây và bắt đầu trải nghiệm ngay hôm nay.",
      },
      {
        id: "variant-2",
        name: "Phiên bản 2",
        content:
          "Chào mừng {{name}}! Bạn đã sẵn sàng khám phá sản phẩm của chúng tôi chưa? Dưới đây là 3 bước đơn giản để bắt đầu: 1. Thiết lập tài khoản, 2. Khám phá tính năng chính, 3. Tùy chỉnh theo nhu cầu. Bắt đầu ngay!",
      },
      {
        id: "variant-3",
        name: "Phiên bản 3",
        content:
          "{{name}} thân mến, Chào mừng bạn đến với gia đình chúng tôi! Hãy dành 5 phút để xem video hướng dẫn này và khám phá cách sản phẩm của chúng tôi có thể giúp bạn. Nhấp vào đây để bắt đầu!",
      },
    ],
    settings: {
      duration: 14,
      trafficSplit: [33, 67],
      autoOptimize: true,
      primaryMetric: "open_rate",
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 ngày trước
      status: "completed",
    },
  },
]

export default function ABTestingDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("active")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [tests, setTests] = useState(mockTests)

  // Lọc các thử nghiệm theo trạng thái
  const activeTests = tests.filter((test) => test.settings.status === "running")
  const completedTests = tests.filter((test) => test.settings.status === "completed")

  // Xử lý lưu thử nghiệm mới
  const handleSaveTest = (testData: any) => {
    setTests([...tests, testData])
    setIsCreateDialogOpen(false)
    toast({
      title: "Đã tạo thử nghiệm A/B",
      description: "Thử nghiệm A/B đã được tạo thành công",
    })
  }

  // Xử lý kết thúc thử nghiệm
  const handleEndTest = (testId: string, winningVariantId: string) => {
    const updatedTests = tests.map((test) => {
      if (test.id === testId) {
        return {
          ...test,
          settings: {
            ...test.settings,
            status: "completed",
            endDate: new Date(),
            winningVariantId,
          },
        }
      }
      return test
    })
    setTests(updatedTests)
    toast({
      title: "Thử nghiệm đã kết thúc",
      description: "Phiên bản chiến thắng đã được chọn làm phiên bản chính thức",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="active" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Đang chạy ({activeTests.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              Đã hoàn thành ({completedTests.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/ab-testing/compare" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              So sánh thử nghiệm
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tạo thử nghiệm mới
          </Button>
        </div>
      </div>

      <TabsContent value="active" className="space-y-4 mt-0">
        {activeTests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Không có thử nghiệm đang chạy</p>
              <p className="text-muted-foreground text-center mb-6">
                Bạn chưa có thử nghiệm A/B nào đang chạy. Hãy tạo thử nghiệm mới để tối ưu hóa tin nhắn marketing.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Tạo thử nghiệm mới
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {activeTests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{test.name}</CardTitle>
                      <CardDescription>
                        {test.variants.length} phiên bản •{" "}
                        {test.channel === "zalo"
                          ? "Zalo"
                          : test.channel === "facebook"
                            ? "Facebook"
                            : test.channel === "email"
                              ? "Email"
                              : "Đa kênh"}
                      </CardDescription>
                    </div>
                    <Badge>Đang chạy</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tiến độ</span>
                      <span>
                        {Math.min(
                          100,
                          Math.round(
                            ((new Date().getTime() - new Date(test.settings.startDate).getTime()) /
                              (test.settings.duration * 24 * 60 * 60 * 1000)) *
                              100,
                          ),
                        )}
                        %
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              ((new Date().getTime() - new Date(test.settings.startDate).getTime()) /
                                (test.settings.duration * 24 * 60 * 60 * 1000)) *
                                100,
                            ),
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Bắt đầu: {new Date(test.settings.startDate).toLocaleDateString("vi-VN")}</span>
                      <span>
                        Còn lại:{" "}
                        {Math.max(
                          0,
                          test.settings.duration -
                            Math.floor(
                              (new Date().getTime() - new Date(test.settings.startDate).getTime()) /
                                (24 * 60 * 60 * 1000),
                            ),
                        )}{" "}
                        ngày
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("active")}>
                    <BarChart className="mr-2 h-4 w-4" />
                    Xem kết quả
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {activeTests.length > 0 && (
          <div className="space-y-6 mt-6">
            <Separator />
            <h3 className="text-lg font-medium">Chi tiết thử nghiệm</h3>
            {activeTests.map((test) => (
              <ABTestResults key={test.id} testData={test} onEndTest={handleEndTest} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4 mt-0">
        {completedTests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Không có thử nghiệm đã hoàn thành</p>
              <p className="text-muted-foreground text-center mb-6">
                Bạn chưa có thử nghiệm A/B nào đã hoàn thành. Hãy tạo thử nghiệm mới để tối ưu hóa tin nhắn marketing.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Tạo thử nghiệm mới
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {completedTests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{test.name}</CardTitle>
                      <CardDescription>
                        {test.variants.length} phiên bản •{" "}
                        {test.channel === "zalo"
                          ? "Zalo"
                          : test.channel === "facebook"
                            ? "Facebook"
                            : test.channel === "email"
                              ? "Email"
                              : "Đa kênh"}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Đã hoàn thành</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Phiên bản chiến thắng: {test.variants[1].name}</p>
                        <p className="text-xs text-muted-foreground">Cải thiện 12% so với phiên bản cơ sở</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Thời gian chạy: {new Date(test.settings.startDate).toLocaleDateString("vi-VN")} -{" "}
                      {new Date(
                        new Date(test.settings.startDate).getTime() + test.settings.duration * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("completed")}>
                    <BarChart className="mr-2 h-4 w-4" />
                    Xem kết quả
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {completedTests.length > 0 && (
          <div className="space-y-6 mt-6">
            <Separator />
            <h3 className="text-lg font-medium">Chi tiết thử nghiệm</h3>
            {completedTests.map((test) => (
              <ABTestResults key={test.id} testData={test} />
            ))}
          </div>
        )}
      </TabsContent>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tạo thử nghiệm A/B mới</DialogTitle>
            <DialogDescription>
              Tạo nhiều phiên bản tin nhắn khác nhau để kiểm tra hiệu quả của từng phiên bản
            </DialogDescription>
          </DialogHeader>
          <ABTestSetup onSave={handleSaveTest} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
