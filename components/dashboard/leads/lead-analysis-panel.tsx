"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Users, Zap } from "lucide-react"

export default function LeadAnalysisPanel({ onStartAnalysis }) {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          Phân tích khách hàng tiềm năng bằng AI
        </CardTitle>
        <CardDescription>
          Sử dụng AI để phân tích và phân loại khách hàng tiềm năng dựa trên dữ liệu tương tác và hành vi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-muted/50">
            <Users className="h-10 w-10 text-primary mb-2" />
            <h3 className="text-lg font-medium mb-1">Phân loại tự động</h3>
            <p className="text-sm text-muted-foreground">
              Phân loại khách hàng thành các nhóm tiềm năng cao, trung bình và thấp
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-muted/50">
            <Zap className="h-10 w-10 text-primary mb-2" />
            <h3 className="text-lg font-medium mb-1">Gắn thẻ thông minh</h3>
            <p className="text-sm text-muted-foreground">
              Tự động đề xuất các thẻ phù hợp dựa trên hành vi và đặc điểm của khách hàng
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-muted/50">
            <BrainCircuit className="h-10 w-10 text-primary mb-2" />
            <h3 className="text-lg font-medium mb-1">Chiến lược tiếp cận</h3>
            <p className="text-sm text-muted-foreground">
              Nhận đề xuất về cách tiếp cận phù hợp nhất cho từng nhóm khách hàng
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button size="lg" onClick={() => onStartAnalysis({})}>
          Bắt đầu phân tích
        </Button>
      </CardFooter>
    </Card>
  )
}
