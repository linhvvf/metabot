"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export function TrendFilters() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="trend-type">Loại xu hướng</Label>
            <Select defaultValue="all">
              <SelectTrigger id="trend-type">
                <SelectValue placeholder="Chọn loại xu hướng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả xu hướng</SelectItem>
                <SelectItem value="engagement">Tương tác khách hàng</SelectItem>
                <SelectItem value="topics">Chủ đề hội thoại</SelectItem>
                <SelectItem value="campaigns">Hiệu suất chiến dịch</SelectItem>
                <SelectItem value="channels">Kênh liên lạc</SelectItem>
                <SelectItem value="sentiment">Cảm xúc khách hàng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-segment">Phân khúc khách hàng</Label>
            <Select defaultValue="all">
              <SelectTrigger id="customer-segment">
                <SelectValue placeholder="Chọn phân khúc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả khách hàng</SelectItem>
                <SelectItem value="new">Khách hàng mới</SelectItem>
                <SelectItem value="returning">Khách hàng quay lại</SelectItem>
                <SelectItem value="vip">Khách hàng VIP</SelectItem>
                <SelectItem value="inactive">Khách hàng không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign-type">Loại chiến dịch</Label>
            <Select defaultValue="all">
              <SelectTrigger id="campaign-type">
                <SelectValue placeholder="Chọn loại chiến dịch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chiến dịch</SelectItem>
                <SelectItem value="promotional">Khuyến mãi</SelectItem>
                <SelectItem value="informational">Thông tin</SelectItem>
                <SelectItem value="onboarding">Chào mừng</SelectItem>
                <SelectItem value="retention">Giữ chân khách hàng</SelectItem>
                <SelectItem value="reactivation">Kích hoạt lại</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="data-granularity">Độ chi tiết dữ liệu</Label>
            <Select defaultValue="day">
              <SelectTrigger id="data-granularity">
                <SelectValue placeholder="Chọn độ chi tiết" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hour">Theo giờ</SelectItem>
                <SelectItem value="day">Theo ngày</SelectItem>
                <SelectItem value="week">Theo tuần</SelectItem>
                <SelectItem value="month">Theo tháng</SelectItem>
                <SelectItem value="quarter">Theo quý</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <Label>Mức độ tin cậy</Label>
            <div className="pt-2">
              <Slider defaultValue={[95]} max={100} min={50} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Hiển thị dữ liệu</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="show-trend-line" defaultChecked />
                <label
                  htmlFor="show-trend-line"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Đường xu hướng
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="show-seasonality" defaultChecked />
                <label
                  htmlFor="show-seasonality"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tính thời vụ
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="show-anomalies" defaultChecked />
                <label
                  htmlFor="show-anomalies"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Điểm bất thường
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Dự đoán</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="show-forecast" defaultChecked />
                <label
                  htmlFor="show-forecast"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hiển thị dự đoán
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="show-confidence-interval" defaultChecked />
                <label
                  htmlFor="show-confidence-interval"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Khoảng tin cậy
                </label>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 flex items-end">
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1">
                Đặt lại
              </Button>
              <Button className="flex-1">Áp dụng</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
