import Script from "next/script"

export default function ContactJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Metabot.vn",
    url: "https://metabot.vn",
    logo: "https://metabot.vn/logo.svg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-123-456-789",
      contactType: "customer service",
      availableLanguage: ["Vietnamese", "English"],
      email: "info@metabot.vn",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
    sameAs: [
      "https://www.facebook.com/metabotvn",
      "https://twitter.com/metabotvn",
      "https://www.linkedin.com/company/metabotvn",
      "https://www.youtube.com/c/metabotvn",
    ],
  }

  return (
    <Script id="contact-jsonld" type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
