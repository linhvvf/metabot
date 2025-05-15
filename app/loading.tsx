import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-10">
        {/* Hero section skeleton */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-12 w-full md:w-2/3" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
          <div className="flex-1">
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        </div>

        {/* Features section skeleton */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-10 w-60 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border rounded-lg p-6 space-y-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
