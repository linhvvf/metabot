"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useDebounce } from "@/lib/performance-utils"

interface OptimizedFormProps {
  onSubmit: (data: any) => void
  initialValues: Record<string, any>
  children: React.ReactNode | ((props: OptimizedFormContextProps) => React.ReactNode)
  className?: string
  debounceTime?: number
}

interface OptimizedFormContextProps {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  setFieldValue: (field: string, value: any) => void
}

export function OptimizedForm({
  onSubmit,
  initialValues,
  children,
  className = "",
  debounceTime = 300,
}: OptimizedFormProps) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Sử dụng debounce để tránh re-render quá nhiều khi người dùng nhập liệu
  const debouncedSetValues = useDebounce((newValues: Record<string, any>) => {
    setValues(newValues)
  }, debounceTime)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

      debouncedSetValues({ ...values, [name]: newValue })
    },
    [values, debouncedSetValues],
  )

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  const setFieldValue = useCallback((field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(values)
    },
    [values, onSubmit],
  )

  const contextValue: OptimizedFormContextProps = {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {typeof children === "function" ? children(contextValue) : children}
    </form>
  )
}
