import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import type { ReportConfig, ChartData, TableData } from "./types"

/**
 * Tạo báo cáo PDF với các cấu hình được cung cấp
 */
export async function generatePDF(config: ReportConfig): Promise<Blob> {
  // Khởi tạo tài liệu PDF với orientation (portrait/landscape) từ cấu hình
  const doc = new jsPDF({
    orientation: config.orientation || "portrait",
    unit: "mm",
    format: "a4",
  })

  // Thêm thông tin cơ bản của báo cáo
  addReportHeader(doc, config)

  // Thêm nội dung báo cáo (biểu đồ và bảng)
  let yPosition = config.orientation === "landscape" ? 45 : 50

  // Thêm tóm tắt thống kê nếu có
  if (config.statistics) {
    yPosition = addStatistics(doc, config.statistics, yPosition)
    yPosition += 10
  }

  // Thêm biểu đồ nếu có
  if (config.charts && config.charts.length > 0) {
    for (const chart of config.charts) {
      yPosition = await addChart(doc, chart, yPosition, config)
      yPosition += 10
    }
  }

  // Thêm bảng dữ liệu nếu có
  if (config.tables && config.tables.length > 0) {
    for (const table of config.tables) {
      yPosition = addTable(doc, table, yPosition, config)
      yPosition += 10
    }
  }

  // Thêm ghi chú và kết luận nếu có
  if (config.notes) {
    yPosition = addNotes(doc, config.notes, yPosition)
  }

  // Thêm footer báo cáo
  addReportFooter(doc, config)

  // Trả về blob của tài liệu PDF
  return doc.output("blob")
}

/**
 * Thêm header vào báo cáo PDF
 */
function addReportHeader(doc: jsPDF, config: ReportConfig): void {
  const { title, subtitle, dateRange, logoUrl } = config
  let yPosition = 20

  // Thêm logo nếu có
  if (logoUrl) {
    doc.addImage(logoUrl, "PNG", 14, 10, 25, 25)
    // Nếu có logo, dịch tiêu đề sang phải
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text(title, 45, yPosition)
  } else {
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text(title, 14, yPosition)
  }

  yPosition += 8

  // Thêm subtitle nếu có
  if (subtitle) {
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(subtitle, logoUrl ? 45 : 14, yPosition)
    yPosition += 6
  }

  // Thêm khoảng thời gian báo cáo
  if (dateRange) {
    const dateText = `Khoảng thời gian: ${format(new Date(dateRange.from), "dd/MM/yyyy", { locale: vi })} - ${format(
      new Date(dateRange.to),
      "dd/MM/yyyy",
      { locale: vi },
    )}`
    doc.setFontSize(10)
    doc.text(dateText, logoUrl ? 45 : 14, yPosition)
  }

  // Thêm ngày xuất báo cáo
  const exportDate = `Xuất báo cáo: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: vi })}`
  doc.setFontSize(10)
  doc.text(exportDate, doc.internal.pageSize.getWidth() - 14 - doc.getTextWidth(exportDate), yPosition)

  // Thêm đường kẻ ngang để phân tách header và nội dung
  yPosition += 5
  doc.setDrawColor(200, 200, 200)
  doc.line(14, yPosition, doc.internal.pageSize.getWidth() - 14, yPosition)
}

/**
 * Thêm thống kê vào báo cáo PDF
 */
function addStatistics(doc: jsPDF, statistics: Array<{ label: string; value: string }>, yPosition: number): number {
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Thống kê chính", 14, yPosition)
  yPosition += 8

  // Tạo layout với 2-3 cột tùy thuộc vào số lượng thống kê
  const numStats = statistics.length
  const numCols = numStats <= 2 ? numStats : numStats <= 6 ? 3 : 4
  const colWidth = (doc.internal.pageSize.getWidth() - 28) / numCols

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")

  let currentCol = 0
  let maxColHeight = 0

  for (let i = 0; i < numStats; i++) {
    const stat = statistics[i]
    const xPos = 14 + currentCol * colWidth

    // Hiển thị nhãn thống kê
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text(stat.label, xPos, yPosition)

    // Hiển thị giá trị thống kê
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text(stat.value, xPos, yPosition + 8)

    currentCol++
    if (currentCol >= numCols) {
      currentCol = 0
      yPosition += 20
      maxColHeight = 0
    }
  }

  // Nếu còn cột chưa đầy thì cũng tăng vị trí y
  if (currentCol > 0) {
    yPosition += 20
  }

  return yPosition
}

/**
 * Thêm biểu đồ vào báo cáo PDF
 */
async function addChart(doc: jsPDF, chart: ChartData, yPosition: number, config: ReportConfig): Promise<number> {
  // Kiểm tra nếu cần thêm trang mới
  if (yPosition + 100 > doc.internal.pageSize.getHeight() - 20) {
    doc.addPage()
    yPosition = 20

    // Thêm header trang mới nếu cần
    if (config.showHeaderOnNewPage) {
      addReportHeader(doc, config)
      yPosition = config.orientation === "landscape" ? 45 : 50
    }
  }

  // Thêm tiêu đề biểu đồ
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(chart.title, 14, yPosition)
  yPosition += 8

  // Thêm mô tả biểu đồ nếu có
  if (chart.description) {
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(chart.description, 14, yPosition)
    yPosition += 6
  }

  // Thêm hình ảnh biểu đồ
  if (chart.imageUrl) {
    // Tính toán kích thước để giữ tỷ lệ
    const pageWidth = doc.internal.pageSize.getWidth() - 28
    const pageHeight = doc.internal.pageSize.getHeight() - yPosition - 20

    const imgWidth = pageWidth
    let imgHeight = chart.height || 100

    // Đảm bảo không vượt quá chiều cao trang
    if (imgHeight > pageHeight) {
      imgHeight = pageHeight
    }

    doc.addImage(chart.imageUrl, "PNG", 14, yPosition, imgWidth, imgHeight)
    yPosition += imgHeight + 5
  }

  return yPosition
}

/**
 * Thêm bảng dữ liệu vào báo cáo PDF
 */
function addTable(doc: jsPDF, tableData: TableData, yPosition: number, config: ReportConfig): number {
  // Kiểm tra nếu cần thêm trang mới
  if (yPosition + 50 > doc.internal.pageSize.getHeight() - 20) {
    doc.addPage()
    yPosition = 20

    // Thêm header trang mới nếu cần
    if (config.showHeaderOnNewPage) {
      addReportHeader(doc, config)
      yPosition = config.orientation === "landscape" ? 45 : 50
    }
  }

  // Thêm tiêu đề bảng
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(tableData.title, 14, yPosition)
  yPosition += 8

  // Chuẩn bị dữ liệu cho bảng
  const headers = tableData.columns.map((column) => column.header)
  const rows = tableData.data.map((item) => {
    return tableData.columns.map((column) => {
      const value = item[column.accessor as keyof typeof item]
      return value !== undefined ? String(value) : ""
    })
  })

  // Thêm bảng vào PDF sử dụng jspdf-autotable
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: yPosition,
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: config.themeColor?.primary || [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { left: 14, right: 14 },
  })

  // Lấy vị trí y cuối cùng của bảng
  const finalY = (doc as any).lastAutoTable.finalY
  return finalY + 5
}

/**
 * Thêm ghi chú vào báo cáo PDF
 */
function addNotes(doc: jsPDF, notes: string, yPosition: number): number {
  // Kiểm tra nếu cần thêm trang mới
  if (yPosition + 30 > doc.internal.pageSize.getHeight() - 20) {
    doc.addPage()
    yPosition = 20
  }

  // Thêm tiêu đề ghi chú
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Ghi chú", 14, yPosition)
  yPosition += 8

  // Thêm nội dung ghi chú với xuống dòng
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")

  // Xử lý xuống dòng và đảm bảo không vượt quá lề
  const splitNotes = doc.splitTextToSize(notes, doc.internal.pageSize.getWidth() - 28)
  doc.text(splitNotes, 14, yPosition)
  yPosition += splitNotes.length * 5 + 5

  return yPosition
}

/**
 * Thêm footer vào báo cáo PDF
 */
function addReportFooter(doc: jsPDF, config: ReportConfig): void {
  const pageCount = doc.getNumberOfPages()
  const footerText = config.footer || "© Metabot.vn - Báo cáo được tạo tự động"

  // Thêm footer vào tất cả các trang
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)

    // Thêm số trang
    const pageText = `Trang ${i} / ${pageCount}`
    doc.setFontSize(8)
    doc.setTextColor(100)
    doc.text(
      pageText,
      doc.internal.pageSize.getWidth() - 14 - doc.getTextWidth(pageText),
      doc.internal.pageSize.getHeight() - 10,
    )

    // Thêm văn bản footer
    doc.setFontSize(8)
    doc.text(footerText, 14, doc.internal.pageSize.getHeight() - 10)

    // Thêm đường kẻ ngang ở phía trên footer
    doc.setDrawColor(200, 200, 200)
    doc.line(
      14,
      doc.internal.pageSize.getHeight() - 15,
      doc.internal.pageSize.getWidth() - 14,
      doc.internal.pageSize.getHeight() - 15,
    )
  }
}

/**
 * Chuyển đổi biểu đồ HTML (canvas) sang hình ảnh
 */
export async function chartToImage(chartId: string): Promise<string> {
  try {
    const chartElement = document.getElementById(chartId) as HTMLCanvasElement
    if (!chartElement) {
      throw new Error(`Không tìm thấy biểu đồ với ID: ${chartId}`)
    }

    // Chuyển đổi canvas sang base64 image
    const imageData = chartElement.toDataURL("image/png")
    return imageData
  } catch (error) {
    console.error("Lỗi khi chuyển đổi biểu đồ sang hình ảnh:", error)
    throw error
  }
}

/**
 * Tải xuống PDF với tên tệp được cung cấp
 */
export function downloadPDF(pdfBlob: Blob, filename: string): void {
  const link = document.createElement("a")
  link.href = URL.createObjectURL(pdfBlob)
  link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
