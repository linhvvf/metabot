export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"

export default function CatchAllDashboardPage() {
  // Redirect to 404 for any unknown dashboard routes
  notFound()
}
