import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://metabot.vn"

  // Các trang tĩnh
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Giả lập các bài blog (trong thực tế, bạn sẽ lấy dữ liệu này từ CMS hoặc database)
  const blogPosts = [
    {
      slug: "tang-hieu-qua-cham-soc-khach-hang-voi-zalo-oa",
      lastModified: new Date("2023-10-15"),
    },
    {
      slug: "huong-dan-ket-noi-zalo-oa-voi-metabot",
      lastModified: new Date("2023-11-02"),
    },
    {
      slug: "cach-tao-chien-dich-marketing-hieu-qua-tren-zalo",
      lastModified: new Date("2023-11-20"),
    },
    {
      slug: "phan-tich-du-lieu-khach-hang-voi-metabot",
      lastModified: new Date("2023-12-05"),
    },
    {
      slug: "toi-uu-hoa-quy-trinh-ban-hang-voi-crm-da-kenh",
      lastModified: new Date("2023-12-18"),
    },
  ]

  const blogSitemapEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogSitemapEntries]
}
