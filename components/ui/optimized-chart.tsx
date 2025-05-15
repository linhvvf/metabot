"use client"

import { useState, useEffect } from "react"
import { LazyComponent } from "./lazy-component"
import { useIntersectionObserver } from "@/lib/performance-utils"

interface OptimizedChartProps {
  data: any
  type: "line" | "bar" | "pie" | "doughnut" | "radar" | "polarArea" | "bubble" | "scatter"
  options?: any
  height?: number
  width?: number
  className?: string
}

// Wrapper component để lazy load Chart.js
export function OptimizedChart(props: OptimizedChartProps) {
  return (
    <LazyComponent
      importFunc={() => import("./chart-component")}
      props={props}
      fallback={
        <div
          className={`bg-muted animate-pulse rounded-md ${props.className || ""}`}
          style={{
            height: props.height || 300,
            width: props.width || "100%",
          }}
        />
      }
    />
  )
}

// Thực tế component này sẽ được lazy load
export function ChartComponent({
  data,
  type,
  options,
  height = 300,
  width = "100%",
  className = "",
}: OptimizedChartProps) {
  const { ref, isVisible } = useIntersectionObserver("100px")
  const [chartData, setChartData] = useState<any>(null)

  // Chỉ render chart khi nó hiển thị trong viewport
  useEffect(() => {
    if (isVisible && !chartData) {
      // Đây là nơi bạn sẽ import Chart.js và tạo chart
      // Trong ví dụ này, chúng ta giả định đã có dữ liệu
      setChartData(data)
    }
  }, [isVisible, data, chartData])

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height, width }}>
      {isVisible && chartData && (
        <div>
          {/* Đây là nơi bạn sẽ render Chart.js */}
          {/* Trong thực tế, bạn sẽ sử dụng thư viện như react-chartjs-2 */}
          <div className="absolute inset-0 flex items-center justify-center">
            Chart would render here with {type} type
          </div>
        </div>
      )}
    </div>
  )
}
