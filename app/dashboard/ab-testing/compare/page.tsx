import type { Metadata } from "next"
import ABTestingComparison from "@/components/dashboard/ab-testing/ab-testing-comparison"

export const metadata: Metadata = {
  title: "So sánh A/B Testing - Metabot.vn",
  description: "So sánh chi tiết kết quả các thử nghiệm A/B để tối ưu hóa chiến dịch marketing",
}

export default function ABTestingComparePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">So sánh A/B Testing</h2>
          <p className="text-muted-foreground">
            So sánh chi tiết kết quả giữa các thử nghiệm A/B để tối ưu hóa chiến dịch marketing
          </p>
        </div>
      </div>
      <ABTestingComparison />
    </div>
  )
}
