import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/admin/"],
    },
    sitemap: "https://metabot.vn/sitemap.xml",
    host: "https://metabot.vn",
  }
}
