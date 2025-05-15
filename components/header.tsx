"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, MessageCircle } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Header() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Tính năng", href: "#features" },
    { name: "Giá cả", href: "#pricing" },
    { name: "Liên hệ", href: "#contact" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <MessageCircle className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Metabot.vn</span>
        </Link>

        {isMobile ? (
          <>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2 flex flex-col space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700 dark:text-gray-300">Chế độ hiển thị</span>
                    <ThemeSwitcher />
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/login">Đăng nhập</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Đăng ký</Link>
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-700 hover:text-blue-600 font-medium">
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <ThemeSwitcher />
              <Button variant="outline" asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Đăng ký</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
