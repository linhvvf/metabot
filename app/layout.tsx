import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Tối ưu hóa font loading
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  preload: true,
})

// Metadata với SEO tối ưu
export const metadata: Metadata = {
  metadataBase: new URL("https://metabot.vn"),
  title: {
    default: "Metabot.vn - Nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh",
    template: "%s | Metabot.vn",
  },
  description:
    "Metabot.vn giúp doanh nghiệp kết nối và quản lý đồng thời Zalo cá nhân, Zalo OA và các ứng dụng OTT khác trên một nền tảng duy nhất.",
  keywords: [
    "Metabot",
    "CRM đa kênh",
    "Quản lý Zalo",
    "Zalo OA",
    "Chăm sóc khách hàng",
    "Omnichannel CRM",
    "Quản lý tin nhắn",
    "Marketing automation",
  ],
  authors: [{ name: "Metabot Team", url: "https://metabot.vn" }],
  creator: "Metabot.vn",
  publisher: "Metabot.vn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/vi",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://metabot.vn",
    title: "Metabot.vn - Nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh",
    description:
      "Metabot.vn giúp doanh nghiệp kết nối và quản lý đồng thời Zalo cá nhân, Zalo OA và các ứng dụng OTT khác trên một nền tảng duy nhất.",
    siteName: "Metabot.vn",
    images: [
      {
        url: "https://metabot.vn/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Metabot.vn - Nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metabot.vn - Nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh",
    description:
      "Metabot.vn giúp doanh nghiệp kết nối và quản lý đồng thời Zalo cá nhân, Zalo OA và các ứng dụng OTT khác trên một nền tảng duy nhất.",
    images: ["https://metabot.vn/twitter-image.jpg"],
    creator: "@metabotvn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  other: {
    "cache-control": "public, max-age=3600, must-revalidate",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Preconnect to domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.metabot.vn" />

        {/* Preload critical assets */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
