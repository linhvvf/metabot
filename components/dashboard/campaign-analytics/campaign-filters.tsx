"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CampaignFiltersProps {
  onCampaignsSelected: (campaigns: string[]) => void
}

export function CampaignFilters({ onCampaignsSelected }: CampaignFiltersProps) {
  // Giả lập dữ liệu - trong thực tế sẽ lấy từ API
  const campaigns = [
    { id: "camp1", name: "Khuyến mãi mùa hè 2023" },
    { id: "camp2", name: "Ra mắt sản phẩm mới" },
    { id: "camp3", name: "Chiến dịch khách hàng thân thiết" },
    { id: "camp4", name: "Khuyến mãi cuối năm" },
    { id: "camp5", name: "Chiến dịch tiếp thị lại" },
  ]

  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const [timeFrame, setTimeFrame] = useState("30days")
  const [groupBy, setGroupBy] = useState("day")

  const handleCampaignToggle = (campaignId: string) => {
    setSelectedCampaigns((prev) => {
      const newSelection = prev.includes(campaignId) ? prev.filter((id) => id !== campaignId) : [...prev, campaignId]

      onCampaignsSelected(newSelection)
      return newSelection
    })
  }

  const handleSelectAll = () => {
    const allCampaignIds = campaigns.map((c) => c.id)
    setSelectedCampaigns(allCampaignIds)
    onCampaignsSelected(allCampaignIds)
  }

  const handleClearAll = () => {
    setSelectedCampaigns([])
    onCampaignsSelected([])
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <Label className="mb-2 block">Chọn chiến dịch</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              <div className="flex justify-between mb-2">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  Chọn tất cả
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  Bỏ chọn
                </Button>
              </div>
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={campaign.id}
                    checked={selectedCampaigns.includes(campaign.id)}
                    onCheckedChange={() => handleCampaignToggle(campaign.id)}
                  />
                  <Label htmlFor={campaign.id} className="cursor-pointer">
                    {campaign.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Khung thời gian</Label>
            <RadioGroup value={timeFrame} onValueChange={setTimeFrame}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="7days" id="7days" />
                <Label htmlFor="7days">7 ngày qua</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30days" id="30days" />
                <Label htmlFor="30days">30 ngày qua</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="90days" id="90days" />
                <Label htmlFor="90days">90 ngày qua</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="year" id="year" />
                <Label htmlFor="year">Năm nay</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Tùy chỉnh</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="group-by" className="mb-2 block">
              Nhóm theo
            </Label>
            <Select value={groupBy} onValueChange={setGroupBy}>
              <SelectTrigger id="group-by">
                <SelectValue placeholder="Chọn nhóm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Ngày</SelectItem>
                <SelectItem value="week">Tuần</SelectItem>
                <SelectItem value="month">Tháng</SelectItem>
                <SelectItem value="channel">Kênh</SelectItem>
                <SelectItem value="audience">Đối tượng</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4">
              <Label htmlFor="metrics" className="mb-2 block">
                Chỉ số hiển thị
              </Label>
              <Select defaultValue="all">
                <SelectTrigger id="metrics">
                  <SelectValue placeholder="Chọn chỉ số" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả chỉ số</SelectItem>
                  <SelectItem value="reach">Tiếp cận</SelectItem>
                  <SelectItem value="engagement">Tương tác</SelectItem>
                  <SelectItem value="conversion">Chuyển đổi</SelectItem>
                  <SelectItem value="roi">ROI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
