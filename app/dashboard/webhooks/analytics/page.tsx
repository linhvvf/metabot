import { Suspense } from "react"
import type { Metadata } from "next"
import { WebhookAnalyticsOverview } from "@/components/dashboard/webhooks/analytics/webhook-analytics-overview"
import { WebhookFilters } from "@/components/dashboard/webhooks/analytics/webhook-filters"
import { WebhookSuccessRateChart } from "@/components/dashboard/webhooks/analytics/webhook-success-rate-chart"
import { WebhookResponseTimeChart } from "@/components/dashboard/webhooks/analytics/webhook-response-time-chart"
import { WebhookVolumeChart } from "@/components/dashboard/webhooks/analytics/webhook-volume-chart"
import { WebhookErrorTable } from "@/components/dashboard/webhooks/analytics/webhook-error-table"
import { WebhookEndpointStats } from "@/components/dashboard/webhooks/analytics/webhook-endpoint-stats"
import { WebhookEventTypeDistribution } from "@/components/dashboard/webhooks/analytics/webhook-event-type-distribution"
import { WebhookLatencyDistribution } from "@/components/dashboard/webhooks/analytics/webhook-latency-distribution"
import { WebhookStatsLoading } from "./loading"

export const metadata: Metadata = {
  title: "Webhook Analytics | Metabot.vn",
  description: "Phân tích hiệu suất webhook và thống kê chi tiết",
}

export default function WebhookAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Phân tích Webhook</h1>
        <p className="text-muted-foreground">
          Theo dõi hiệu suất webhook và phân tích các xu hướng để tối ưu hóa tích hợp của bạn
        </p>
      </div>

      <WebhookFilters />

      <Suspense fallback={<WebhookStatsLoading />}>
        <div className="grid gap-6 md:grid-cols-3">
          <WebhookAnalyticsOverview />
        </div>
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<div className="h-[350px] rounded-lg border bg-card animate-pulse" />}>
          <WebhookSuccessRateChart />
        </Suspense>
        <Suspense fallback={<div className="h-[350px] rounded-lg border bg-card animate-pulse" />}>
          <WebhookResponseTimeChart />
        </Suspense>
      </div>

      <Suspense fallback={<div className="h-[350px] rounded-lg border bg-card animate-pulse" />}>
        <WebhookVolumeChart />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<div className="h-[350px] rounded-lg border bg-card animate-pulse" />}>
          <WebhookEventTypeDistribution />
        </Suspense>
        <Suspense fallback={<div className="h-[350px] rounded-lg border bg-card animate-pulse" />}>
          <WebhookLatencyDistribution />
        </Suspense>
      </div>

      <Suspense fallback={<div className="h-[400px] rounded-lg border bg-card animate-pulse" />}>
        <WebhookErrorTable />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] rounded-lg border bg-card animate-pulse" />}>
        <WebhookEndpointStats />
      </Suspense>
    </div>
  )
}
