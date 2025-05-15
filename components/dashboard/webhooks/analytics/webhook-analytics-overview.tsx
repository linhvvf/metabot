"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, CheckCircle2Icon, ClockIcon } from "lucide-react"

export function WebhookAnalyticsOverview() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const stats = {
    successRate: {
      value: 98.2,
      change: 1.5,
      improved: true,
    },
    averageLatency: {
      value: 245, // ms
      change: 12,
      improved: true,
    },
    deliveryVolume: {
      value: 15842,
      change: 8.3,
      improved: true,
    },
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Tỷ lệ thành công</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="h-5 w-5 text-green-500" />
              <div className="text-2xl font-bold">{stats.successRate.value}%</div>
            </div>
            <div
              className={`flex items-center text-xs ${stats.successRate.improved ? "text-green-500" : "text-red-500"}`}
            >
              {stats.successRate.improved ? (
                <ArrowUpIcon className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="mr-1 h-4 w-4" />
              )}
              {stats.successRate.change}%
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Thời gian phản hồi trung bình</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-blue-500" />
              <div className="text-2xl font-bold">{stats.averageLatency.value} ms</div>
            </div>
            <div
              className={`flex items-center text-xs ${stats.averageLatency.improved ? "text-green-500" : "text-red-500"}`}
            >
              {stats.averageLatency.improved ? (
                <ArrowDownIcon className="mr-1 h-4 w-4" />
              ) : (
                <ArrowUpIcon className="mr-1 h-4 w-4" />
              )}
              {stats.averageLatency.change}%
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Khối lượng gửi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{stats.deliveryVolume.value.toLocaleString()}</div>
            <div
              className={`flex items-center text-xs ${stats.deliveryVolume.improved ? "text-green-500" : "text-red-500"}`}
            >
              {stats.deliveryVolume.improved ? (
                <ArrowUpIcon className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="mr-1 h-4 w-4" />
              )}
              {stats.deliveryVolume.change}%
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
