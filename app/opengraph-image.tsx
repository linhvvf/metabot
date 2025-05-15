import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Metabot.vn - Nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  // Font
  const interSemiBold = fetch(new URL("./Inter-SemiBold.ttf", import.meta.url)).then((res) => res.arrayBuffer())

  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom, #f0f9ff, #ffffff)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" style={{ marginRight: 24 }}>
          <path
            d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
            fill="#2563EB"
          />
          <path
            d="M4.5 13.5L8 17L10.5 14.5M12 12V7M16 9L19.5 12.5L16 16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ fontSize: 64, color: "#1e3a8a", fontWeight: "bold" }}>Metabot.vn</div>
      </div>
      <div
        style={{
          fontSize: 36,
          color: "#1e40af",
          textAlign: "center",
          marginBottom: 24,
          lineHeight: 1.4,
        }}
      >
        Nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            background: "#2563EB",
            color: "white",
            fontSize: 24,
            borderRadius: 8,
          }}
        >
          Zalo
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            background: "#2563EB",
            color: "white",
            fontSize: 24,
            borderRadius: 8,
          }}
        >
          Facebook
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            background: "#2563EB",
            color: "white",
            fontSize: 24,
            borderRadius: 8,
          }}
        >
          Telegram
        </div>
      </div>
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  )
}
