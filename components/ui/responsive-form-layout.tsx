"use client"

import type React from "react"

import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface ResponsiveFormLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveFormLayout({ children, className }: ResponsiveFormLayoutProps) {
  const isMobile = useMobile()

  return <div className={cn("grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-2", className)}>{children}</div>
}

interface ResponsiveFormSectionProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export function ResponsiveFormSection({ children, className, fullWidth = false }: ResponsiveFormSectionProps) {
  const isMobile = useMobile()

  return <div className={cn(!isMobile && fullWidth && "col-span-2", className)}>{children}</div>
}
