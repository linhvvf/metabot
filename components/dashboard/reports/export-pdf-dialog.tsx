"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { ReportType, ReportCustomization } from "@/lib/pdf-export/types"
import { usePdfExport } from "@/hooks/use-pdf-export"
import { Loader2 } from "lucide-react"

interface ExportPdfDialogProps {
  isOpen: boolean
  onClose: () => void
  reportType: ReportType
  reportTitle: string
  data: any
  dateRange: { from: string; to: string }
}

export default function ExportPdfDialog({
  isOpen,
  onClose,
  reportType,
  reportTitle,
  data,
  dateRange,
}: ExportPdfDialogProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [customization, setCustomization] = useState<ReportCustomization>({
    showLogo: true,
    orientation: "portrait",
    includeNotes: true,
    includeStatistics: true,
    includeCharts: true,
    includeTables: true,
    showHeaderOnNewPage: true,
    primaryColor: "#2980b9",
  })

  const { exportReport, isGenerating, error } = usePdfExport()

  const handleExport = async () => {
    const result = await exportReport(reportType, data, customization, dateRange)
    if (result.success) {
      onClose()
    }
  }

  const updateCustomization = (key: keyof ReportCustomization, value: any) => {
    setCustomization((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Xuất báo cáo PDF - {reportTitle}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Cài đặt cơ bản</TabsTrigger>
            <TabsTrigger value="content">Nội dung</TabsTrigger>
            <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orientation">Hướng trang</Label>
                  <RadioGroup
                    defaultValue={customization.orientation}
                    onValueChange={(value) => updateCustomization("orientation", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="portrait" id="portrait" />
                      <Label htmlFor="portrait">Dọc</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="landscape" id="landscape" />
                      <Label htmlFor="landscape">Ngang</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary-color">Màu chủ đạo</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={customization.primaryColor}
                      onChange={(e) => updateCustomization("primaryColor", e.target.value)}
                      className="w-10 h-10 p-1"
                    />
                    <Input
                      value={customization.primaryColor}
                      onChange={(e) => updateCustomization("primaryColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-logo"
                  checked={customization.showLogo}
                  onCheckedChange={(checked) => updateCustomization("showLogo", checked)}
                />
                <Label htmlFor="show-logo">Hiển thị logo công ty</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-header-new-page"
                  checked={customization.showHeaderOnNewPage}
                  onCheckedChange={(checked) => updateCustomization("showHeaderOnNewPage", checked)}
                />
                <Label htmlFor="show-header-new-page">Hiển thị tiêu đề trên mỗi trang</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="include-statistics"
                  checked={customization.includeStatistics}
                  onCheckedChange={(checked) => updateCustomization("includeStatistics", checked)}
                />
                <Label htmlFor="include-statistics">Bao gồm thống kê tổng quan</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="include-charts"
                  checked={customization.includeCharts}
                  onCheckedChange={(checked) => updateCustomization("includeCharts", checked)}
                />
                <Label htmlFor="include-charts">Bao gồm biểu đồ</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="include-tables"
                  checked={customization.includeTables}
                  onCheckedChange={(checked) => updateCustomization("includeTables", checked)}
                />
                <Label htmlFor="include-tables">Bao gồm bảng dữ liệu</Label>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="include-notes"
                    checked={customization.includeNotes}
                    onCheckedChange={(checked) => updateCustomization("includeNotes", checked)}
                  />
                  <Label htmlFor="include-notes">Thêm ghi chú</Label>
                </div>

                {customization.includeNotes && (
                  <Textarea
                    value={customization.notes || ""}
                    onChange={(e) => updateCustomization("notes", e.target.value)}
                    placeholder="Nhập ghi chú của bạn ở đây..."
                    className="min-h-[100px]"
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="text-sm text-muted-foreground mb-4">
              <p>Cài đặt nâng cao sẽ được cung cấp trong các phiên bản tới.</p>
              <p>Các tính năng sẽ bao gồm:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Tùy chỉnh footer</li>
                <li>Bảo mật PDF với mật khẩu</li>
                <li>Thêm watermark</li>
                <li>Tùy chỉnh font chữ</li>
                <li>Thêm siêu liên kết</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleExport} disabled={isGenerating}>
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isGenerating ? "Đang tạo PDF..." : "Xuất PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
