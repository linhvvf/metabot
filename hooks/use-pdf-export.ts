"use client"

import { useState } from "react"
import { generatePDF, chartToImage, downloadPDF } from "@/lib/pdf-export/pdf-utils"
import type { ReportConfig, ReportType, ReportCustomization } from "@/lib/pdf-export/types"

export function usePdfExport() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function exportReport(
    reportType: ReportType,
    data: any,
    customization: ReportCustomization,
    dateRange: { from: string; to: string },
  ) {
    try {
      setIsGenerating(true)
      setError(null)

      // 1. Gọi API để lấy cấu hình và dữ liệu báo cáo
      const response = await fetch("/api/reports/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportType,
          customization,
          data,
          dateRange,
        }),
      })

      if (!response.ok) {
        throw new Error("Không thể tạo cấu hình báo cáo")
      }

      const result = await response.json()
      const config: ReportConfig = result.config
      const reportData = result.data

      // 2. Chuẩn bị dữ liệu biểu đồ và bảng
      await prepareReportData(config, reportData, customization)

      // 3. Tạo PDF
      const pdfBlob = await generatePDF(config)

      // 4. Tải xuống PDF
      const filename = `${config.title.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}`
      downloadPDF(pdfBlob, filename)

      return { success: true }
    } catch (err) {
      console.error("Lỗi khi xuất báo cáo PDF:", err)
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi xuất báo cáo PDF")
      return { success: false, error: err instanceof Error ? err.message : "Đã xảy ra lỗi khi xuất báo cáo PDF" }
    } finally {
      setIsGenerating(false)
    }
  }

  async function prepareReportData(config: ReportConfig, data: any, customization: ReportCustomization) {
    // Thêm thống kê nếu được yêu cầu và có sẵn
    if (customization.includeStatistics && data.statistics) {
      config.statistics = data.statistics
    }

    // Thêm biểu đồ nếu được yêu cầu và có sẵn
    if (customization.includeCharts && data.charts && data.charts.length > 0) {
      config.charts = []

      // Chuyển đổi các biểu đồ từ canvas sang hình ảnh
      for (const chart of data.charts) {
        if (chart.chartId) {
          try {
            // Đợi 100ms để đảm bảo biểu đồ đã được render
            await new Promise((resolve) => setTimeout(resolve, 100))
            const imageUrl = await chartToImage(chart.chartId)
            config.charts.push({
              ...chart,
              imageUrl,
              height: 100,
            })
          } catch (error) {
            console.error(`Không thể chuyển đổi biểu đồ ${chart.title} sang hình ảnh:`, error)
          }
        } else if (chart.imageUrl) {
          config.charts.push(chart)
        }
      }
    }

    // Thêm bảng nếu được yêu cầu và có sẵn
    if (customization.includeTables && data.tables && data.tables.length > 0) {
      config.tables = data.tables
    }
  }

  return {
    exportReport,
    isGenerating,
    error,
  }
}
