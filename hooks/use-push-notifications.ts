"use client"

import { useState, useEffect } from "react"

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Kiểm tra xem trình duyệt có hỗ trợ thông báo không
    if (!("Notification" in window)) {
      setError("Trình duyệt không hỗ trợ thông báo")
      return
    }

    // Kiểm tra quyền thông báo hiện tại
    setPermission(Notification.permission)
  }, [])

  const registerServiceWorker = async () => {
    try {
      if (!("serviceWorker" in navigator)) {
        throw new Error("Service Worker không được hỗ trợ")
      }

      const registration = await navigator.serviceWorker.register("/sw.js")
      return registration
    } catch (err) {
      console.error("Không thể đăng ký Service Worker:", err)
      throw err
    }
  }

  const subscribeToPushNotifications = async () => {
    setLoading(true)
    setError(null)

    try {
      // Yêu cầu quyền thông báo nếu chưa được cấp
      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission()
        setPermission(permission)

        if (permission !== "granted") {
          throw new Error("Quyền thông báo bị từ chối")
        }
      }

      // Đăng ký Service Worker
      const registration = await registerServiceWorker()

      // Tạo subscription
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        // Trong thực tế, bạn sẽ cần public key từ server
        applicationServerKey: urlBase64ToUint8Array(
          "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U",
        ),
      })

      setSubscription(pushSubscription)

      // Gửi subscription đến server
      await fetch("/api/notifications/register-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription: pushSubscription }),
      })

      return pushSubscription
    } catch (err: any) {
      console.error("Lỗi đăng ký thông báo đẩy:", err)
      setError(err.message || "Không thể đăng ký thông báo đẩy")
      return null
    } finally {
      setLoading(false)
    }
  }

  const unsubscribeFromPushNotifications = async () => {
    if (!subscription) return false

    try {
      const success = await subscription.unsubscribe()

      if (success) {
        setSubscription(null)

        // Thông báo cho server
        await fetch("/api/notifications/unregister-push", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription }),
        })
      }

      return success
    } catch (err) {
      console.error("Lỗi hủy đăng ký thông báo đẩy:", err)
      return false
    }
  }

  return {
    permission,
    subscription,
    loading,
    error,
    subscribeToPushNotifications,
    unsubscribeFromPushNotifications,
  }
}

// Hàm tiện ích để chuyển đổi base64 thành Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}
