import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { GuideSidebar } from "@/components/guide/guide-sidebar"
import { GuideSearch } from "@/components/guide/guide-search"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Hướng dẫn sử dụng | Metabot.vn",
  description: "Hướng dẫn sử dụng chi tiết cho hệ thống Metabot.vn",
}

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Quay lại Dashboard</span>
              </Button>
            </Link>
            <Link href="/guide" className="font-semibold">
              Hướng dẫn sử dụng Metabot.vn
            </Link>
          </div>
          <Suspense>
            <GuideSearch />
          </Suspense>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-2 pl-2 md:py-8">
            <Suspense>
              <GuideSidebar />
            </Suspense>
          </div>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  )
}
