"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

export default function LeadFilterCriteria({ onApply, onCancel }) {
  const [criteria, setCriteria] = useState({
    interactionWeight: 5,
    orderValueWeight: 5,
    purchaseFrequencyWeight: 5,
    recencyWeight: 5,
    responseRateWeight: 5,
  })

  const handleSliderChange = (name, value) => {
    setCriteria({
      ...criteria,
      [name]: value[0],
    })
  }

  return (
    <Card className="relative">
      <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onCancel}>
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle>Tiêu chí phân loại khách hàng tiềm năng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Mức độ tương tác</Label>
              <span className="text-sm font-medium">{criteria.interactionWeight}/10</span>
            </div>
            <Slider
              defaultValue={[criteria.interactionWeight]}
              max={10}
              step={1}
              onValueChange={(value) => handleSliderChange("interactionWeight", value)}
            />
            <p className="text-xs text-muted-foreground">
              Mức độ tương tác của khách hàng với tin nhắn, email và nội dung của bạn
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Giá trị đơn hàng</Label>
              <span className="text-sm font-medium">{criteria.orderValueWeight}/10</span>
            </div>
            <Slider
              defaultValue={[criteria.orderValueWeight]}
              max={10}
              step={1}
              onValueChange={(value) => handleSliderChange("orderValueWeight", value)}
            />
            <p className="text-xs text-muted-foreground">
              Tổng giá trị đơn hàng và giá trị đơn hàng trung bình của khách hàng
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Tần suất mua hàng</Label>
              <span className="text-sm font-medium">{criteria.purchaseFrequencyWeight}/10</span>
            </div>
            <Slider
              defaultValue={[criteria.purchaseFrequencyWeight]}
              max={10}
              step={1}
              onValueChange={(value) => handleSliderChange("purchaseFrequencyWeight", value)}
            />
            <p className="text-xs text-muted-foreground">Tần suất khách hàng thực hiện giao dịch mua hàng</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Thời gian từ lần tương tác cuối</Label>
              <span className="text-sm font-medium">{criteria.recencyWeight}/10</span>
            </div>
            <Slider
              defaultValue={[criteria.recencyWeight]}
              max={10}
              step={1}
              onValueChange={(value) => handleSliderChange("recencyWeight", value)}
            />
            <p className="text-xs text-muted-foreground">
              Thời gian đã trôi qua kể từ lần tương tác gần nhất của khách hàng
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Tỷ lệ phản hồi</Label>
              <span className="text-sm font-medium">{criteria.responseRateWeight}/10</span>
            </div>
            <Slider
              defaultValue={[criteria.responseRateWeight]}
              max={10}
              step={1}
              onValueChange={(value) => handleSliderChange("responseRateWeight", value)}
            />
            <p className="text-xs text-muted-foreground">Tỷ lệ khách hàng phản hồi các tin nhắn và email của bạn</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button onClick={() => onApply(criteria)}>Áp dụng</Button>
      </CardFooter>
    </Card>
  )
}
