"use client"

import { useEffect } from "react"

interface ThirdPartyScriptProps {
  src: string
  id?: string
  async?: boolean
  defer?: boolean
  onLoad?: () => void
}

export function ThirdPartyScript({ src, id, async = true, defer = false, onLoad }: ThirdPartyScriptProps) {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = src
    if (id) script.id = id
    script.async = async
    script.defer = defer

    if (onLoad) {
      script.onload = onLoad
    }

    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [src, id, async, defer, onLoad])

  return null
}
