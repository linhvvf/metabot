import Link from "next/link"
import { MessageCircle, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Sản phẩm",
      links: [
        { name: "Tính năng", href: "#features" },
        { name: "Giá cả", href: "#pricing" },
        { name: "Hướng dẫn sử dụng", href: "/guides" },
        { name: "API Documentation", href: "/api-docs" },
      ],
    },
    {
      title: "Công ty",
      links: [
        { name: "Về chúng tôi", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Đối tác", href: "/partners" },
        { name: "Tuyển dụng", href: "/careers" },
      ],
    },
    {
      title: "Hỗ trợ",
      links: [
        { name: "Trung tâm hỗ trợ", href: "/support" },
        { name: "Liên hệ", href: "/contact" },
        { name: "Chính sách bảo mật", href: "/privacy" },
        { name: "Điều khoản sử dụng", href: "/terms" },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <MessageCircle className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">Metabot.vn</span>
            </Link>
            <p className="mb-6 text-gray-400 max-w-md">
              Nền tảng quản lý giao tiếp & chăm sóc khách hàng đa kênh hàng đầu Việt Nam, giúp doanh nghiệp kết nối và
              quản lý đồng thời Zalo cá nhân, Zalo OA và các ứng dụng OTT khác.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-white font-medium mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {currentYear} Metabot.vn. Tất cả các quyền được bảo lưu.</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@metabot.vn">info@metabot.vn</a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+84123456789">+84 123 456 789</a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
