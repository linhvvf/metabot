import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WebhookStatsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <CardTitle>
              <Skeleton className="h-4 w-[140px]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-[60px]" />
              <Skeleton className="h-8 w-[40px]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <WebhookStatsLoading />

      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="h-[350px] w-full" />
      </div>

      <Skeleton className="h-[350px] w-full" />

      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="h-[350px] w-full" />
      </div>

      <Skeleton className="h-[400px] w-full" />
      <Skeleton className="h-[400px] w-full" />
    </div>
  )
}
