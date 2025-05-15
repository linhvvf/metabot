import Script from "next/script"

export default function HomeJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Metabot.vn",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "499000",
      priceCurrency: "VND",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1024",
    },
    description:
      "Metabot.vn là nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh, giúp doanh nghiệp kết nối và quản lý đồng thời Zalo cá nhân, Zalo OA và các ứng dụng OTT khác.",
    screenshot: "https://metabot.vn/dashboard-chat-analytics.png",
    featureList:
      "Tích hợp đa kênh, Phân quyền & tài khoản, Quản lý hội thoại, Gợi ý trả lời AI, Lưu trữ & bảo mật, Giám sát hiệu suất",
    softwareHelp: "https://metabot.vn/guide",
    author: {
      "@type": "Organization",
      name: "Metabot.vn",
      url: "https://metabot.vn",
      logo: "https://metabot.vn/logo.svg",
    },
    provider: {
      "@type": "Organization",
      name: "Metabot.vn",
      url: "https://metabot.vn",
    },
  }

  return (
    <Script id="home-jsonld" type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
