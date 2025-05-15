import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "MetaBot.vn - Nền tảng quản lý tin nhắn đa kênh thông minh"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#3B82F6"
            />
            <path
              d="M10.5 8L14.5 12L10.5 16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ marginLeft: 20, color: "#3B82F6", fontWeight: "bold" }}>MetaBot.vn</span>
        </div>
        <div style={{ fontSize: 48, marginTop: 20, color: "#333" }}>Nền tảng quản lý tin nhắn đa kênh thông minh</div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
