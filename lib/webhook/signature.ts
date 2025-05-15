import crypto from "crypto"

/**
 * Tạo chữ ký HMAC cho payload webhook
 *
 * @param payload - Payload webhook dưới dạng chuỗi JSON
 * @param secret - Khóa bí mật dùng để tạo chữ ký
 * @param algorithm - Thuật toán hash (mặc định: sha256)
 * @returns Chuỗi chữ ký
 */
export function generateWebhookSignature(payload: string, secret: string, algorithm = "sha256"): string {
  const hmac = crypto.createHmac(algorithm, secret)
  hmac.update(payload, "utf8")
  return `${algorithm}=${hmac.digest("hex")}`
}

/**
 * Xác thực chữ ký webhook
 *
 * @param payload - Payload webhook dưới dạng chuỗi JSON
 * @param signature - Chữ ký từ header
 * @param secret - Khóa bí mật dùng để xác thực
 * @returns Boolean cho biết chữ ký có hợp lệ hay không
 */
export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  if (!signature || !payload || !secret) {
    return false
  }

  // Hỗ trợ nhiều định dạng chữ ký
  const [algorithm, providedSignature] = signature.includes("=") ? signature.split("=") : ["sha256", signature]

  // Tạo chữ ký từ payload và secret
  const expectedSignature = generateWebhookSignature(payload, secret, algorithm)

  // So sánh chữ ký đã tạo với chữ ký được cung cấp
  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(`${algorithm}=${providedSignature}`))
}

/**
 * Tạo khóa bí mật ngẫu nhiên cho webhook
 *
 * @param length - Độ dài của khóa bí mật (mặc định: 32)
 * @returns Chuỗi khóa bí mật
 */
export function generateWebhookSecret(length = 32): string {
  return `whsec_${crypto.randomBytes(length).toString("hex")}`
}

/**
 * Tạo timestamp cho webhook để ngăn chặn tấn công replay
 *
 * @returns Timestamp hiện tại dưới dạng chuỗi
 */
export function generateWebhookTimestamp(): string {
  return Math.floor(Date.now() / 1000).toString()
}

/**
 * Xác thực timestamp để ngăn chặn tấn công replay
 *
 * @param timestamp - Timestamp từ webhook
 * @param toleranceSeconds - Dung sai cho phép (mặc định: 300 giây = 5 phút)
 * @returns Boolean cho biết timestamp có hợp lệ hay không
 */
export function verifyWebhookTimestamp(timestamp: string, toleranceSeconds = 300): boolean {
  const currentTime = Math.floor(Date.now() / 1000)
  const webhookTime = Number.parseInt(timestamp, 10)

  return Math.abs(currentTime - webhookTime) <= toleranceSeconds
}

/**
 * Tạo header chữ ký webhook
 *
 * @param payload - Payload webhook dưới dạng chuỗi JSON
 * @param secret - Khóa bí mật dùng để tạo chữ ký
 * @returns Object chứa các header cần thiết
 */
export function generateWebhookHeaders(payload: string, secret: string): Record<string, string> {
  const timestamp = generateWebhookTimestamp()
  const signature = generateWebhookSignature(`${timestamp}.${payload}`, secret)

  return {
    "X-Metabot-Signature": signature,
    "X-Metabot-Timestamp": timestamp,
    "Content-Type": "application/json",
  }
}

/**
 * Xác thực đầy đủ webhook bao gồm chữ ký và timestamp
 *
 * @param payload - Payload webhook dưới dạng chuỗi JSON
 * @param headers - Headers từ request
 * @param secret - Khóa bí mật dùng để xác thực
 * @returns Object chứa kết quả xác thực và lỗi nếu có
 */
export function verifyWebhookRequest(
  payload: string,
  headers: Record<string, string>,
  secret: string,
): { isValid: boolean; error?: string } {
  // Kiểm tra các header cần thiết
  const signature = headers["x-metabot-signature"]
  const timestamp = headers["x-metabot-timestamp"]

  if (!signature) {
    return { isValid: false, error: "Thiếu header chữ ký" }
  }

  if (!timestamp) {
    return { isValid: false, error: "Thiếu header timestamp" }
  }

  // Xác thực timestamp
  if (!verifyWebhookTimestamp(timestamp)) {
    return { isValid: false, error: "Timestamp không hợp lệ hoặc đã hết hạn" }
  }

  // Xác thực chữ ký
  const isSignatureValid = verifyWebhookSignature(`${timestamp}.${payload}`, signature, secret)

  if (!isSignatureValid) {
    return { isValid: false, error: "Chữ ký không hợp lệ" }
  }

  return { isValid: true }
}
