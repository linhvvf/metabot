import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NotificationsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px] mt-2" />
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <Card>
        <CardHeader className="pb-0">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[300px] mt-2" />
        </CardHeader>
        <CardContent>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="py-4 border-b last:border-0">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-[250px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
