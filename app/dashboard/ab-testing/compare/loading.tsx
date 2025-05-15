import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ABTestingComparisonLoading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[500px] mt-2" />
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <Skeleton className="h-5 w-[200px]" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="p-4">
            <Skeleton className="h-5 w-[180px]" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <Skeleton className="h-5 w-[180px]" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4">
          <Skeleton className="h-5 w-[200px]" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
