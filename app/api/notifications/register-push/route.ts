import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { subscription } = await request.json()

    // Trong thực tế, bạn sẽ lưu subscription vào database
    console.log("Received push subscription:", subscription)

    // Gửi thông báo chào mừng để kiểm tra
    await sendPushNotification(subscription, {
      title: "Đã đăng ký thành công!",
      message: "Bạn sẽ nhận được thông báo khi có sự kiện mới.",
      url: "/dashboard/notifications",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error registering push notification:", error)
    return NextResponse.json({ error: "Không thể đăng ký thông báo đẩy" }, { status: 500 })
  }
}

// Hàm gửi thông báo đẩy
async function sendPushNotification(subscription: PushSubscription, data: any) {
  // Trong thực tế, bạn sẽ sử dụng web-push library
  // Đây chỉ là mã giả
  console.log("Sending push notification:", data)

  // Mã thực tế sẽ sử dụng:
  // await webpush.sendNotification(subscription, JSON.stringify(data))

  return true
}
