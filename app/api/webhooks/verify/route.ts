import { NextResponse } from "next/server"
import { verifyWebhookRequest } from "@/lib/webhook/signature"

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headers = Object.fromEntries(req.headers.entries())
    const secret = headers["x-webhook-secret"] || ""

    // Xác thực webhook
    const { isValid, error } = verifyWebhookRequest(body, headers, secret)

    if (!isValid) {
      return NextResponse.json({ success: false, error }, { status: 401 })
    }

    return NextResponse.json({ success: true, message: "Webhook đã được xác thực thành công" }, { status: 200 })
  } catch (error) {
    console.error("Lỗi xác thực webhook:", error)
    return NextResponse.json({ success: false, error: "Lỗi xác thực webhook" }, { status: 500 })
  }
}
