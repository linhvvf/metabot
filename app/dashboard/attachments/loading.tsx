import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AttachmentsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-4 w-[450px] mt-2" />
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-10 w-[200px]" />
              <Skeleton className="h-10 w-[100px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-3">
                    <Skeleton className="h-[150px] w-full mb-2" />
                    <Skeleton className="h-5 w-[80%] mb-1" />
                    <Skeleton className="h-4 w-[60%]" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
