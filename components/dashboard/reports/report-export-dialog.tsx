"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, FileSpreadsheet, FileDown, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { ExportFormat, ReportExportConfig } from "@/lib/report-export/export-utils"

interface ReportExportDialogProps {
  title: string
  subtitle?: string
  source: string
  data?: any[]
  columns: Array<{
    header: string
    accessor: string
    width?: number
  }>
  filters?: any
}

export function ReportExportDialog({ title, subtitle, source, data, columns, filters }: ReportExportDialogProps) {
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState<ExportFormat>("pdf")
  const [filename, setFilename] = useState("")
  const [includeTimestamp, setIncludeTimestamp] = useState(true)
  const [includeLogo, setIncludeLogo] = useState(true)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [isExporting, setIsExporting] = useState(false)
  const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map((col) => col.accessor))

  const handleExport = async () => {
    try {
      setIsExporting(true)

      // Lọc các cột được chọn
      const filteredColumns = columns.filter((col) => selectedColumns.includes(col.accessor))

      // Cấu hình báo cáo
      const config: ReportExportConfig = {
        title,
        subtitle,
        filename: filename || undefined,
        columns: filteredColumns,
        includeTimestamp,
        includeLogo,
        orientation,
      }

      // Gọi API để xuất báo cáo
      const response = await fetch("/api/reports/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source,
          format,
          config,
          filters,
          data,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Đã xảy ra lỗi khi xuất báo cáo")
      }

      toast({
        title: "Xuất báo cáo thành công",
        description: `Báo cáo đã được xuất dưới dạng ${format.toUpperCase()}`,
      })

      setOpen(false)
    } catch (error) {
      console.error("Lỗi khi xuất báo cáo:", error)
      toast({
        title: "Xuất báo cáo thất bại",
        description: "Đã xảy ra lỗi khi xuất báo cáo. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const toggleColumnSelection = (accessor: string) => {
    setSelectedColumns((prev) =>
      prev.includes(accessor) ? prev.filter((col) => col !== accessor) : [...prev, accessor],
    )
  }

  const formatIcons = {
    pdf: <FileText className="h-4 w-4" />,
    excel: <FileSpreadsheet className="h-4 w-4" />,
    csv: <FileDown className="h-4 w-4" />,
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Xuất báo cáo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Xuất báo cáo</DialogTitle>
          <DialogDescription>Chọn định dạng và tùy chỉnh báo cáo của bạn</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Định dạng xuất</Label>
            <RadioGroup
              value={format}
              onValueChange={(value) => setFormat(value as ExportFormat)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Excel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center">
                  <FileDown className="mr-2 h-4 w-4" />
                  CSV
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filename">Tên file (tùy chọn)</Label>
            <Input
              id="filename"
              placeholder={`${title.toLowerCase().replace(/\s+/g, "-")}`}
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </div>

          {format === "pdf" && (
            <div className="space-y-2">
              <Label htmlFor="orientation">Hướng trang</Label>
              <Select value={orientation} onValueChange={(value) => setOrientation(value as "portrait" | "landscape")}>
                <SelectTrigger id="orientation">
                  <SelectValue placeholder="Chọn hướng trang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Dọc</SelectItem>
                  <SelectItem value="landscape">Ngang</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Tùy chọn</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeTimestamp"
                  checked={includeTimestamp}
                  onCheckedChange={(checked) => setIncludeTimestamp(!!checked)}
                />
                <Label htmlFor="includeTimestamp">Bao gồm thời gian xuất báo cáo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeLogo"
                  checked={includeLogo}
                  onCheckedChange={(checked) => setIncludeLogo(!!checked)}
                />
                <Label htmlFor="includeLogo">Bao gồm logo công ty</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Chọn cột hiển thị</Label>
            <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-2">
              {columns.map((column) => (
                <div key={column.accessor} className="flex items-center space-x-2">
                  <Checkbox
                    id={`col-${column.accessor}`}
                    checked={selectedColumns.includes(column.accessor)}
                    onCheckedChange={() => toggleColumnSelection(column.accessor)}
                  />
                  <Label htmlFor={`col-${column.accessor}`}>{column.header}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleExport} disabled={isExporting || selectedColumns.length === 0}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xuất...
              </>
            ) : (
              <>
                {formatIcons[format]}
                <span className="ml-2">Xuất {format.toUpperCase()}</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
