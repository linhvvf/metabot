import type { Metadata } from "next"
import ABTestingDashboard from "@/components/dashboard/ab-testing/ab-testing-dashboard"

export const metadata: Metadata = {
  title: "A/B Testing - Metabot.vn",
  description: "Quản lý và theo dõi các thử nghiệm A/B cho tin nhắn marketing",
}

export default function ABTestingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">A/B Testing</h2>
          <p className="text-muted-foreground">Tạo và quản lý các thử nghiệm A/B để tối ưu hóa tin nhắn marketing</p>
        </div>
      </div>
      <ABTestingDashboard />
    </div>
  )
}
