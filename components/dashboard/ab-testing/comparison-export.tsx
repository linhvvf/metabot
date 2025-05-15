"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Loader2 } from "lucide-react"

interface ComparisonExportProps {
  tests: any[]
}

export default function ComparisonExport({ tests }: ComparisonExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState("pdf")
  const [sections, setSections] = useState({
    overview: true,
    metrics: true,
    segments: true,
    timeSeries: true,
    content: true,
    suggestions: true,
  })

  const handleExport = () => {
    setIsExporting(true)

    // Mô phỏng quá trình xuất báo cáo
    setTimeout(() => {
      setIsExporting(false)

      // Mô phỏng tải xuống
      const link = document.createElement("a")
      link.href = "#"
      link.download = `ab-testing-comparison-${new Date().toISOString().split("T")[0]}.${exportFormat}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 2000)
  }

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Xuất báo cáo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xuất báo cáo so sánh</DialogTitle>
          <DialogDescription>
            Chọn định dạng và nội dung bạn muốn đưa vào báo cáo so sánh A/B testing.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="format">Định dạng báo cáo</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger id="format">
                <SelectValue placeholder="Chọn định dạng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="xlsx">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Nội dung báo cáo</Label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="overview" checked={sections.overview} onCheckedChange={() => toggleSection("overview")} />
                <Label htmlFor="overview" className="cursor-pointer">
                  Tổng quan so sánh
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="metrics" checked={sections.metrics} onCheckedChange={() => toggleSection("metrics")} />
                <Label htmlFor="metrics" className="cursor-pointer">
                  So sánh chi tiết các chỉ số
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="segments" checked={sections.segments} onCheckedChange={() => toggleSection("segments")} />
                <Label htmlFor="segments" className="cursor-pointer">
                  Phân tích phân đoạn
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="timeSeries"
                  checked={sections.timeSeries}
                  onCheckedChange={() => toggleSection("timeSeries")}
                />
                <Label htmlFor="timeSeries" className="cursor-pointer">
                  Phân tích theo thời gian
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="content" checked={sections.content} onCheckedChange={() => toggleSection("content")} />
                <Label htmlFor="content" className="cursor-pointer">
                  Phân tích nội dung
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="suggestions"
                  checked={sections.suggestions}
                  onCheckedChange={() => toggleSection("suggestions")}
                />
                <Label htmlFor="suggestions" className="cursor-pointer">
                  Đề xuất tối ưu hóa
                </Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xuất...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Xuất báo cáo
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
