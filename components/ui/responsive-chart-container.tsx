"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface ResponsiveChartContainerProps {
  children: React.ReactNode
  className?: string
  aspectRatio?: number
  mobileAspectRatio?: number
}

export function ResponsiveChartContainer({
  children,
  className,
  aspectRatio = 16 / 9,
  mobileAspectRatio = 4 / 3,
}: ResponsiveChartContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const isMobile = useMobile()

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth
        const ratio = isMobile ? mobileAspectRatio : aspectRatio
        const height = width / ratio

        setDimensions({ width, height })
      }
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [aspectRatio, mobileAspectRatio, isMobile])

  return (
    <div ref={containerRef} className={cn("w-full", className)} style={{ height: dimensions.height }}>
      {children}
    </div>
  )
}
