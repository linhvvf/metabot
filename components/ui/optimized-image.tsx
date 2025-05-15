import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "100vw",
  ...props
}: OptimizedImageProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover transition-transform hover:scale-105"
        priority={priority}
        sizes={sizes}
        quality={90}
        {...props}
      />
    </div>
  )
}
