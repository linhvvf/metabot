"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useThrottle } from "@/lib/performance-utils"

interface VirtualizedListProps<T> {
  items: T[]
  height: number
  itemHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  overscan?: number
  className?: string
  onEndReached?: () => void
  endReachedThreshold?: number
}

export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 5,
  className = "",
  onEndReached,
  endReachedThreshold = 0.8,
}: VirtualizedListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [isEndReached, setIsEndReached] = useState(false)

  // Tính toán các item hiển thị
  const totalHeight = items.length * itemHeight
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(items.length - 1, Math.floor((scrollTop + height) / itemHeight) + overscan)

  // Xử lý scroll
  const handleScroll = useThrottle(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop)

      // Kiểm tra nếu đã scroll đến gần cuối
      const scrollPosition = containerRef.current.scrollTop + height
      const scrollThreshold = totalHeight * endReachedThreshold

      if (scrollPosition >= scrollThreshold && !isEndReached && onEndReached) {
        setIsEndReached(true)
        onEndReached()
      } else if (scrollPosition < scrollThreshold && isEndReached) {
        setIsEndReached(false)
      }
    }
  }, 50)

  // Reset isEndReached khi items thay đổi
  useEffect(() => {
    setIsEndReached(false)
  }, [items.length])

  // Tạo danh sách các item hiển thị
  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => {
    const actualIndex = startIndex + index
    return (
      <div
        key={actualIndex}
        style={{
          position: "absolute",
          top: actualIndex * itemHeight,
          height: itemHeight,
          left: 0,
          right: 0,
        }}
      >
        {renderItem(item, actualIndex)}
      </div>
    )
  })

  return (
    <div
      ref={containerRef}
      className={`overflow-auto relative ${className}`}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>{visibleItems}</div>
    </div>
  )
}
