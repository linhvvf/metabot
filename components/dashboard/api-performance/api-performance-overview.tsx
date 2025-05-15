"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApiPerformanceMetrics from "./api-performance-metrics"
import ApiResponseTimeChart from "./api-response-time-chart"
import ApiRequestVolumeChart from "./api-request-volume-chart"
import ApiStatusCodeDistribution from "./api-status-code-distribution"
import ApiEndpointPerformance from "./api-endpoint-performance"
import ApiErrorTable from "./api-error-table"
import ApiPerformanceFilters from "./api-performance-filters"
import ApiLatencyDistribution from "./api-latency-distribution"
import ApiGeographicDistribution from "./api-geographic-distribution"
import ApiUsageByClient from "./api-usage-by-client"
import ApiRateLimitingStats from "./api-rate-limiting-stats"

export default function ApiPerformanceOverview() {
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  })

  const [filters, setFilters] = useState({
    endpoints: [],
    statusCodes: [],
    clients: [],
  })

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hiệu suất API</h2>
          <p className="text-muted-foreground">Theo dõi và phân tích hiệu suất API của Metabot.vn</p>
        </div>
        <ApiPerformanceFilters
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      <ApiPerformanceMetrics dateRange={dateRange} filters={filters} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="errors">Lỗi</TabsTrigger>
          <TabsTrigger value="clients">Khách hàng</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ApiResponseTimeChart dateRange={dateRange} filters={filters} />
            <ApiRequestVolumeChart dateRange={dateRange} filters={filters} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ApiStatusCodeDistribution dateRange={dateRange} filters={filters} />
            <ApiLatencyDistribution dateRange={dateRange} filters={filters} />
          </div>
          <ApiGeographicDistribution dateRange={dateRange} filters={filters} />
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <ApiEndpointPerformance dateRange={dateRange} filters={filters} />
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <ApiErrorTable dateRange={dateRange} filters={filters} />
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <ApiUsageByClient dateRange={dateRange} filters={filters} />
          <ApiRateLimitingStats dateRange={dateRange} filters={filters} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
