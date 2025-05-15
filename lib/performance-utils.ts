"use client"

import { useEffect, useState, useRef, useCallback } from "react"

/**
 * Hook để trì hoãn việc render các component không nằm trong viewport
 * @param rootMargin Khoảng cách từ viewport mà tại đó component sẽ được tải
 * @returns Một object chứa ref và isVisible
 */
export function useIntersectionObserver(rootMargin = "0px") {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [rootMargin])

  return { ref, isVisible }
}

/**
 * Hook để debounce một hàm
 * @param fn Hàm cần debounce
 * @param delay Thời gian delay (ms)
 * @returns Hàm đã được debounce
 */
export function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        fn(...args)
      }, delay)
    },
    [fn, delay],
  )
}

/**
 * Hook để throttle một hàm
 * @param fn Hàm cần throttle
 * @param delay Thời gian delay (ms)
 * @returns Hàm đã được throttle
 */
export function useThrottle<T extends (...args: any[]) => any>(fn: T, delay: number) {
  const lastRan = useRef(Date.now())
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastRan.current >= delay) {
        fn(...args)
        lastRan.current = now
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(
          () => {
            fn(...args)
            lastRan.current = Date.now()
          },
          delay - (now - lastRan.current),
        )
      }
    },
    [fn, delay],
  )
}

/**
 * Tính toán kích thước tối ưu cho hình ảnh dựa trên kích thước container
 * @param containerWidth Chiều rộng container
 * @param containerHeight Chiều cao container
 * @param aspectRatio Tỷ lệ khung hình (width/height)
 * @returns Kích thước tối ưu {width, height}
 */
export function calculateOptimalImageSize(containerWidth: number, containerHeight: number, aspectRatio = 16 / 9) {
  const containerAspectRatio = containerWidth / containerHeight

  if (containerAspectRatio > aspectRatio) {
    // Container rộng hơn
    return {
      width: Math.round(containerHeight * aspectRatio),
      height: containerHeight,
    }
  } else {
    // Container cao hơn
    return {
      width: containerWidth,
      height: Math.round(containerWidth / aspectRatio),
    }
  }
}

/**
 * Tạo một mảng các kích thước hình ảnh cho srcset
 * @param maxWidth Chiều rộng tối đa
 * @param steps Số bước
 * @returns Mảng các kích thước
 */
export function generateImageSizes(maxWidth: number, steps = 5): number[] {
  const sizes: number[] = []
  const step = maxWidth / steps

  for (let i = 1; i <= steps; i++) {
    sizes.push(Math.round(step * i))
  }

  return sizes
}
