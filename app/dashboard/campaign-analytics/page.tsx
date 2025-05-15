export const dynamic = "force-dynamic"

import { Suspense } from "react"
import CampaignAnalyticsClient from "./client"
import CampaignAnalyticsLoading from "./loading"

export default function CampaignAnalyticsPage() {
  return (
    <Suspense fallback={<CampaignAnalyticsLoading />}>
      <CampaignAnalyticsClient />
    </Suspense>
  )
}
