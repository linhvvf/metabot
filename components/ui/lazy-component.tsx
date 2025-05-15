"use client"

import type React from "react"

import { Suspense, lazy, type ComponentType } from "react"
import { useIntersectionObserver } from "@/lib/performance-utils"

interface LazyComponentProps {
  importFunc: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
  props?: Record<string, any>
  threshold?: string
}

export function LazyComponent({
  importFunc,
  fallback = <div className="min-h-[100px] bg-muted animate-pulse rounded-md" />,
  props = {},
  threshold = "200px",
}: LazyComponentProps) {
  const { ref, isVisible } = useIntersectionObserver(threshold)

  // Chỉ load component khi nó gần viewport
  const Component = isVisible ? lazy(importFunc) : null

  return (
    <div ref={ref}>
      {isVisible ? <Suspense fallback={fallback}>{Component && <Component {...props} />}</Suspense> : fallback}
    </div>
  )
}
