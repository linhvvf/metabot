"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { useIntersectionObserver } from "@/lib/performance-utils"

interface ThirdPartyScriptProps {
  src: string
  id?: string
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload" | "worker"
  onLoad?: () => void
  defer?: boolean
  async?: boolean
  loadOnVisible?: boolean
  threshold?: string
}

export function ThirdPartyScript({
  src,
  id,
  strategy = "lazyOnload",
  onLoad,
  defer = true,
  async = true,
  loadOnVisible = true,
  threshold = "200px",
}: ThirdPartyScriptProps) {
  const [shouldLoad, setShouldLoad] = useState(!loadOnVisible)
  const { ref, isVisible } = useIntersectionObserver(threshold)

  // Chỉ tải script khi component hiển thị trong viewport
  useEffect(() => {
    if (isVisible && loadOnVisible) {
      setShouldLoad(true)
    }
  }, [isVisible, loadOnVisible])

  if (!shouldLoad) {
    return <div ref={ref} className="hidden" />
  }

  return (
    <>
      {loadOnVisible && <div ref={ref} className="hidden" />}
      <Script src={src} id={id} strategy={strategy} onLoad={onLoad} defer={defer} async={async} />
    </>
  )
}
