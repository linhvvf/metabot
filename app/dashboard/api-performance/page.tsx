import type { Metadata } from "next"
import ApiPerformanceOverview from "@/components/dashboard/api-performance/api-performance-overview"

export const metadata: Metadata = {
  title: "Hiệu suất API | Metabot.vn",
  description: "Theo dõi và phân tích hiệu suất API của Metabot.vn",
}

export default function ApiPerformancePage() {
  return <ApiPerformanceOverview />
}
