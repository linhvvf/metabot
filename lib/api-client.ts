"use client"

import { useState, useEffect, useCallback } from "react"

// Cấu hình mặc định
const DEFAULT_CONFIG = {
  baseUrl: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 giây
  retries: 2,
  retryDelay: 1000, // 1 giây
  cacheTime: 5 * 60 * 1000, // 5 phút
}

// Cache lưu trữ
const apiCache = new Map<string, { data: any; timestamp: number }>()

// Hàm tạo key cache
const createCacheKey = (url: string, params?: Record<string, any>) => {
  const queryString = params ? new URLSearchParams(params).toString() : ""
  return `${url}${queryString ? `?${queryString}` : ""}`
}

// Hàm kiểm tra cache có hết hạn không
const isCacheExpired = (timestamp: number, cacheTime: number) => {
  return Date.now() - timestamp > cacheTime
}

// Hàm fetch với retry logic
const fetchWithRetry = async (url: string, options: RequestInit, retries: number, retryDelay: number) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_CONFIG.timeout)

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay))
      return fetchWithRetry(url, options, retries - 1, retryDelay * 2)
    }
    throw error
  }
}

// Hook để fetch data
export function useApiQuery<T>(
  endpoint: string,
  params?: Record<string, any>,
  config?: {
    enabled?: boolean
    cacheTime?: number
    retries?: number
    retryDelay?: number
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
  },
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const enabled = config?.enabled !== false
  const cacheTime = config?.cacheTime || DEFAULT_CONFIG.cacheTime
  const retries = config?.retries || DEFAULT_CONFIG.retries
  const retryDelay = config?.retryDelay || DEFAULT_CONFIG.retryDelay

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const url = `${DEFAULT_CONFIG.baseUrl}${endpoint}`
    const cacheKey = createCacheKey(url, params)

    try {
      // Kiểm tra cache
      const cachedData = apiCache.get(cacheKey)
      if (cachedData && !isCacheExpired(cachedData.timestamp, cacheTime)) {
        setData(cachedData.data)
        if (config?.onSuccess) config.onSuccess(cachedData.data)
        setIsLoading(false)
        return
      }

      // Fetch data mới
      const queryString = params ? `?${new URLSearchParams(params).toString()}` : ""
      const fullUrl = `${url}${queryString}`

      const result = await fetchWithRetry(
        fullUrl,
        { method: "GET", headers: DEFAULT_CONFIG.headers },
        retries,
        retryDelay,
      )

      // Lưu vào cache
      apiCache.set(cacheKey, { data: result, timestamp: Date.now() })

      setData(result)
      if (config?.onSuccess) config.onSuccess(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      if (config?.onError) config.onError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [endpoint, params, cacheTime, retries, retryDelay, config])

  useEffect(() => {
    if (enabled) {
      fetchData()
    }
  }, [enabled, fetchData])

  return { data, isLoading, error, refetch: fetchData }
}

// Hàm mutation (POST, PUT, DELETE)
export function useApiMutation<T, U = any>(
  endpoint: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH" = "POST",
  config?: {
    retries?: number
    retryDelay?: number
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
  },
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const retries = config?.retries || DEFAULT_CONFIG.retries
  const retryDelay = config?.retryDelay || DEFAULT_CONFIG.retryDelay

  const mutate = useCallback(
    async (payload?: U) => {
      setIsLoading(true)
      setError(null)

      const url = `${DEFAULT_CONFIG.baseUrl}${endpoint}`

      try {
        const result = await fetchWithRetry(
          url,
          {
            method,
            headers: DEFAULT_CONFIG.headers,
            body: payload ? JSON.stringify(payload) : undefined,
          },
          retries,
          retryDelay,
        )

        setData(result)
        if (config?.onSuccess) config.onSuccess(result)
        return result
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
        if (config?.onError) config.onError(err instanceof Error ? err : new Error(String(err)))
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [endpoint, method, retries, retryDelay, config],
  )

  return { mutate, data, isLoading, error }
}

// Hàm xóa cache
export function invalidateCache(endpoint?: string) {
  if (endpoint) {
    // Xóa cache cho một endpoint cụ thể
    const prefix = `${DEFAULT_CONFIG.baseUrl}${endpoint}`
    for (const key of apiCache.keys()) {
      if (key.startsWith(prefix)) {
        apiCache.delete(key)
      }
    }
  } else {
    // Xóa toàn bộ cache
    apiCache.clear()
  }
}
