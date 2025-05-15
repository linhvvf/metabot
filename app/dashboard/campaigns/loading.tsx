import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CampaignsLoading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px] mt-2" />
        </div>
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <Skeleton className="h-10 w-[350px] mt-4" />

      <div className="grid gap-4 mt-4">
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-[120px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-8 w-[100px]" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
