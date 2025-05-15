import Script from "next/script"

export default function PricingJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Metabot.vn - Nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh",
    description:
      "Metabot.vn giúp doanh nghiệp kết nối và quản lý đồng thời Zalo cá nhân, Zalo OA và các ứng dụng OTT khác trên một nền tảng duy nhất.",
    image: "https://metabot.vn/dashboard-chat-analytics.png",
    offers: [
      {
        "@type": "Offer",
        name: "Gói Cơ bản",
        price: "499000",
        priceCurrency: "VND",
        description: "Dành cho doanh nghiệp nhỏ",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Gói Chuyên nghiệp",
        price: "999000",
        priceCurrency: "VND",
        description: "Dành cho doanh nghiệp vừa",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Gói Doanh nghiệp",
        price: "1999000",
        priceCurrency: "VND",
        description: "Dành cho doanh nghiệp lớn",
        availability: "https://schema.org/InStock",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1024",
    },
  }

  return (
    <Script id="pricing-jsonld" type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
