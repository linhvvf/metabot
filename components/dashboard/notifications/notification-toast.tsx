"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Bell } from "lucide-react"

type NotificationToastProps = {
  title: string
  message: string
  type?: "default" | "success" | "error" | "warning"
}

export function NotificationToast({ title, message, type = "default" }: NotificationToastProps) {
  const { toast } = useToast()

  useEffect(() => {
    const variant =
      type === "success" ? "default" : type === "error" ? "destructive" : type === "warning" ? "warning" : "default"

    toast({
      title,
      description: message,
      variant,
      icon: <Bell className="h-4 w-4" />,
    })
  }, [title, message, type, toast])

  return null
}
