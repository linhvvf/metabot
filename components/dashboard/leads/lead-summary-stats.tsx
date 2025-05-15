import { Card, CardContent } from "@/components/ui/card"
import { CircleUser, TrendingUp, Users } from "lucide-react"

export default function LeadSummaryStats({ data }) {
  const { summary } = data

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Tiềm năng cao</p>
              <h3 className="text-2xl font-bold">{summary.highPotential}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Khách hàng có khả năng chuyển đổi cao nhất</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Tiềm năng trung bình</p>
              <h3 className="text-2xl font-bold">{summary.mediumPotential}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Khách hàng cần được nuôi dưỡng để tăng khả năng chuyển đổi
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Tiềm năng thấp</p>
              <h3 className="text-2xl font-bold">{summary.lowPotential}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <CircleUser className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Khách hàng cần được tái kích hoạt hoặc có khả năng chuyển đổi thấp
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
