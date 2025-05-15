/**
 * Cấu hình báo cáo PDF
 */
export interface ReportConfig {
  title: string
  subtitle?: string
  dateRange?: {
    from: string
    to: string
  }
  logoUrl?: string
  orientation?: "portrait" | "landscape"
  themeColor?: {
    primary: number[]
    secondary: number[]
  }
  showHeaderOnNewPage?: boolean
  footer?: string
  statistics?: Array<{
    label: string
    value: string
  }>
  charts?: ChartData[]
  tables?: TableData[]
  notes?: string
  watermark?: {
    text: string
    opacity: number
  }
}

/**
 * Dữ liệu biểu đồ
 */
export interface ChartData {
  title: string
  description?: string
  imageUrl?: string
  chartId?: string
  height?: number
}

/**
 * Dữ liệu bảng
 */
export interface TableData {
  title: string
  columns: Array<{
    header: string
    accessor: string
  }>
  data: Record<string, any>[]
}

/**
 * Loại báo cáo
 */
export enum ReportType {
  OVERVIEW = "overview",
  CUSTOMER = "customer",
  CAMPAIGN = "campaign",
  CONVERSATION = "conversation",
  API_PERFORMANCE = "api_performance",
  STAFF_PERFORMANCE = "staff_performance",
}

/**
 * Cấu hình tùy chỉnh báo cáo
 */
export interface ReportCustomization {
  showLogo: boolean
  orientation: "portrait" | "landscape"
  includeNotes: boolean
  includeStatistics: boolean
  includeCharts: boolean
  includeTables: boolean
  showHeaderOnNewPage: boolean
  primaryColor?: string
  notes?: string
}

/**
 * Tùy chọn đặt lịch báo cáo
 */
export interface ReportSchedule {
  frequency: "daily" | "weekly" | "monthly"
  dayOfWeek?: number // 0-6, 0 là Chủ nhật
  dayOfMonth?: number // 1-31
  time: string // "HH:MM"
  recipients: string[]
  reportType: ReportType
  customization: ReportCustomization
  name: string
  active: boolean
}
