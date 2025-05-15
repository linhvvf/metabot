import { Card, CardContent } from "@/components/ui/card"

interface GuideVideoProps {
  title: string
  description?: string
  videoId: string
  width?: number
  height?: number
}

export function GuideVideo({ title, description, videoId, width = 640, height = 360 }: GuideVideoProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="text-muted-foreground mb-4">{description}</p>}
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-md">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            title={title}
          />
        </div>
      </CardContent>
    </Card>
  )
}
