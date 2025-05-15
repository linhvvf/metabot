"use client"

import { useState, useEffect } from "react"
import { OptimizedImage } from "./optimized-image"

interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    width?: number
    height?: number
  }>
  className?: string
}

export function OptimizedImageGallery({ images, className = "" }: ImageGalleryProps) {
  const [loadPriority, setLoadPriority] = useState<number[]>([0]) // Load first image with priority

  // Tải thêm hình ảnh khi người dùng cuộn
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Nếu người dùng đã cuộn xuống 70% trang
      if (scrollPosition > documentHeight * 0.7) {
        // Tải thêm 3 hình ảnh tiếp theo
        setLoadPriority((prev) => {
          const nextIndexes = []
          for (let i = 1; i <= 3; i++) {
            const nextIndex = Math.max(...prev) + i
            if (nextIndex < images.length) {
              nextIndexes.push(nextIndex)
            }
          }
          return [...prev, ...nextIndexes]
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [images.length])

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      {images.map((image, index) => (
        <div key={index} className="aspect-square overflow-hidden rounded-md">
          {loadPriority.includes(index) ? (
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority={index === 0}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted animate-pulse" />
          )}
        </div>
      ))}
    </div>
  )
}
