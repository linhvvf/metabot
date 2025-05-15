import { Skeleton } from "@/components/ui/skeleton"

export default function DialectDictionaryLoading() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-5 w-[500px]" />
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[150px]" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
        </div>

        <div className="rounded-md border">
          <div className="border-b px-4 py-3">
            <Skeleton className="h-6 w-full" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-b px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-[200px]" />
        </div>
      </div>
    </div>
  )
}
