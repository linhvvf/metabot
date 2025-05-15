/**
 * Các utility function để xử lý việc xuất báo cáo
 */

import { saveAs } from "file-saver"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import "jspdf-autotable"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

// Định dạng xuất báo cáo
export type ExportFormat = "pdf" | "excel" | "csv"

// Cấu hình báo cáo
export interface ReportExportConfig {
  title: string
  subtitle?: string
  filename?: string
  columns: Array<{
    header: string
    accessor: string
    width?: number
  }>
  includeTimestamp?: boolean
  includeLogo?: boolean
  orientation?: "portrait" | "landscape"
}

// Hàm chung để xuất báo cáo
export async function exportReport(data: any[], format: ExportFormat, config: ReportExportConfig) {
  const timestamp = format(new Date(), "dd/MM/yyyy HH:mm", { locale: vi })
  const filename =
    config.filename || `${config.title.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(), "yyyy-MM-dd")}`

  switch (format) {
    case "pdf":
      return exportToPDF(data, config, timestamp)
    case "excel":
      return exportToExcel(data, config, timestamp, false)
    case "csv":
      return exportToExcel(data, config, timestamp, true)
    default:
      throw new Error(`Định dạng không được hỗ trợ: ${format}`)
  }
}

// Xuất báo cáo dạng PDF
function exportToPDF(data: any[], config: ReportExportConfig, timestamp: string) {
  const { title, subtitle, columns, includeLogo, orientation } = config
  const filename = config.filename || `${title.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(), "yyyy-MM-dd")}`

  // Khởi tạo PDF với orientation phù hợp
  const doc = new jsPDF({
    orientation: orientation || "portrait",
    unit: "mm",
    format: "a4",
  })

  // Thêm tiêu đề
  doc.setFontSize(18)
  doc.text(title, 14, 22)

  // Thêm subtitle nếu có
  if (subtitle) {
    doc.setFontSize(12)
    doc.text(subtitle, 14, 30)
  }

  // Thêm timestamp
  if (config.includeTimestamp !== false) {
    doc.setFontSize(10)
    doc.text(`Xuất báo cáo: ${timestamp}`, 14, orientation === "landscape" ? 38 : 40)
  }

  // Thêm logo nếu cần
  if (includeLogo) {
    // Trong thực tế, cần thêm code để thêm logo vào PDF
    // doc.addImage(logoData, 'PNG', 170, 10, 25, 25)
  }

  // Chuẩn bị dữ liệu cho bảng
  const tableColumn = columns.map((col) => col.header)
  const tableRows = data.map((item) => {
    return columns.map((col) => (item[col.accessor] !== undefined ? item[col.accessor] : ""))
  })

  // Thêm bảng vào PDF
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: orientation === "landscape" ? 45 : 50,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  })

  // Lưu file
  doc.save(`${filename}.pdf`)
}

// Xuất báo cáo dạng Excel hoặc CSV
function exportToExcel(data: any[], config: ReportExportConfig, timestamp: string, asCsv: boolean) {
  const { title, subtitle, columns } = config
  const filename = config.filename || `${title.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(), "yyyy-MM-dd")}`

  // Tạo workbook mới
  const wb = XLSX.utils.book_new()

  // Chuẩn bị dữ liệu
  const processedData = data.map((item) => {
    const row: Record<string, any> = {}
    columns.forEach((col) => {
      row[col.header] = item[col.accessor] !== undefined ? item[col.accessor] : ""
    })
    return row
  })

  // Thêm metadata vào đầu nếu không phải CSV
  let exportData = processedData
  if (!asCsv) {
    const metaData = [
      { [columns[0].header]: title },
      subtitle ? { [columns[0].header]: subtitle } : null,
      config.includeTimestamp !== false ? { [columns[0].header]: `Xuất báo cáo: ${timestamp}` } : null,
      { [columns[0].header]: "" }, // Dòng trống
    ].filter(Boolean) as Record<string, any>[]

    exportData = [...metaData, ...processedData]
  }

  // Tạo worksheet
  const ws = XLSX.utils.json_to_sheet(exportData, { skipHeader: true })

  // Thêm worksheet vào workbook
  XLSX.utils.book_append_sheet(wb, ws, "Báo cáo")

  // Xuất file
  if (asCsv) {
    const csv = XLSX.utils.sheet_to_csv(ws)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    saveAs(blob, `${filename}.csv`)
  } else {
    XLSX.writeFile(wb, `${filename}.xlsx`)
  }
}

// Hàm để chuẩn bị dữ liệu báo cáo từ nhiều nguồn
export function prepareReportData(source: string, rawData: any): any[] {
  switch (source) {
    case "conversations":
      return prepareConversationData(rawData)
    case "customers":
      return prepareCustomerData(rawData)
    case "campaigns":
      return prepareCampaignData(rawData)
    case "staff":
      return prepareStaffData(rawData)
    default:
      return rawData
  }
}

// Các hàm helper để chuẩn bị dữ liệu từ các nguồn khác nhau
function prepareConversationData(data: any[]): any[] {
  return data.map((item) => ({
    id: item.id,
    customer: item.customerName,
    channel: item.channel,
    staff: item.assignedTo,
    status: item.status,
    lastMessage: item.lastMessage,
    lastActivity: format(new Date(item.lastActivity), "dd/MM/yyyy HH:mm", { locale: vi }),
    messageCount: item.messageCount,
    duration: item.duration,
  }))
}

function prepareCustomerData(data: any[]): any[] {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    source: item.source,
    tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags,
    lastContact: item.lastContact ? format(new Date(item.lastContact), "dd/MM/yyyy", { locale: vi }) : "",
    status: item.status,
    conversationCount: item.conversationCount,
  }))
}

function prepareCampaignData(data: any[]): any[] {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    status: item.status,
    startDate: item.startDate ? format(new Date(item.startDate), "dd/MM/yyyy", { locale: vi }) : "",
    endDate: item.endDate ? format(new Date(item.endDate), "dd/MM/yyyy", { locale: vi }) : "",
    audience: item.audienceSize,
    reach: item.reach,
    engagement: item.engagement,
    conversion: item.conversion,
    roi: item.roi,
  }))
}

function prepareStaffData(data: any[]): any[] {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
    department: item.department,
    conversations: item.conversationCount,
    responseTime: item.avgResponseTime,
    satisfaction: item.customerSatisfaction,
    status: item.status,
  }))
}
