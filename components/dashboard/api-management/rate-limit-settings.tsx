"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { AlertTriangle, Info } from "lucide-react"

// Mock data for rate limits
const mockRateLimits = [
  {
    id: "1",
    name: "Default",
    type: "global",
    limit: 1000,
    period: "minute",
    scope: "all",
    isDefault: true,
  },
  {
    id: "2",
    name: "Read Operations",
    type: "endpoint",
    limit: 5000,
    period: "minute",
    scope: "read",
    isDefault: false,
  },
  {
    id: "3",
    name: "Write Operations",
    type: "endpoint",
    limit: 1000,
    period: "minute",
    scope: "write",
    isDefault: false,
  },
  {
    id: "4",
    name: "Development API Keys",
    type: "api-key",
    limit: 500,
    period: "minute",
    scope: "development",
    isDefault: false,
  },
]

export function RateLimitSettings() {
  const [rateLimits, setRateLimits] = useState(mockRateLimits)
  const [activeTab, setActiveTab] = useState("rate-limits")

  // Form state for new rate limit
  const [newRateLimit, setNewRateLimit] = useState({
    name: "",
    type: "global",
    limit: 1000,
    period: "minute",
    scope: "all",
  })

  // Form state for quota settings
  const [quotaEnabled, setQuotaEnabled] = useState(true)
  const [quotaLimit, setQuotaLimit] = useState(100000)
  const [quotaPeriod, setQuotaPeriod] = useState("month")
  const [quotaAction, setQuotaAction] = useState("block")

  const handleSaveRateLimit = () => {
    if (!newRateLimit.name) {
      toast({
        title: "Tên không được để trống",
        description: "Vui lòng nhập tên cho giới hạn tốc độ.",
        variant: "destructive",
      })
      return
    }

    const newId = (rateLimits.length + 1).toString()
    setRateLimits([...rateLimits, { ...newRateLimit, id: newId, isDefault: false }])

    // Reset form
    setNewRateLimit({
      name: "",
      type: "global",
      limit: 1000,
      period: "minute",
      scope: "all",
    })

    toast({
      title: "Giới hạn tốc độ đã được tạo",
      description: "Giới hạn tốc độ mới đã được tạo thành công.",
    })
  }

  const handleDeleteRateLimit = (id) => {
    setRateLimits(rateLimits.filter((limit) => limit.id !== id))
    toast({
      title: "Giới hạn tốc độ đã bị xóa",
      description: "Giới hạn tốc độ đã được xóa thành công.",
    })
  }

  const handleSetDefault = (id) => {
    setRateLimits(
      rateLimits.map((limit) => ({
        ...limit,
        isDefault: limit.id === id,
      })),
    )
    toast({
      title: "Giới hạn tốc độ mặc định đã được cập nhật",
      description: "Giới hạn tốc độ mặc định đã được cập nhật thành công.",
    })
  }

  const handleSaveQuota = () => {
    toast({
      title: "Cài đặt hạn ngạch đã được lưu",
      description: "Cài đặt hạn ngạch đã được cập nhật thành công.",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="rate-limits">Giới hạn tốc độ</TabsTrigger>
          <TabsTrigger value="quotas">Hạn ngạch</TabsTrigger>
        </TabsList>

        <TabsContent value="rate-limits" className="space-y-6">
          <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded text-sm text-blue-600">
            <Info className="h-4 w-4 mr-2" />
            <span>Giới hạn tốc độ giúp bảo vệ API của bạn khỏi các yêu cầu quá mức và đảm bảo hiệu suất ổn định.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Giới hạn tốc độ hiện tại</CardTitle>
                  <CardDescription>Quản lý các giới hạn tốc độ cho API của bạn.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên</TableHead>
                          <TableHead>Loại</TableHead>
                          <TableHead>Giới hạn</TableHead>
                          <TableHead>Phạm vi</TableHead>
                          <TableHead>Mặc định</TableHead>
                          <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rateLimits.map((limit) => (
                          <TableRow key={limit.id}>
                            <TableCell className="font-medium">{limit.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {limit.type === "global"
                                  ? "Toàn cục"
                                  : limit.type === "endpoint"
                                    ? "Endpoint"
                                    : "API Key"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {limit.limit} /{" "}
                              {limit.period === "second"
                                ? "giây"
                                : limit.period === "minute"
                                  ? "phút"
                                  : limit.period === "hour"
                                    ? "giờ"
                                    : "ngày"}
                            </TableCell>
                            <TableCell>
                              {limit.scope === "all"
                                ? "Tất cả"
                                : limit.scope === "read"
                                  ? "Đọc"
                                  : limit.scope === "write"
                                    ? "Ghi"
                                    : limit.scope}
                            </TableCell>
                            <TableCell>
                              {limit.isDefault ? (
                                <Badge variant="success">Mặc định</Badge>
                              ) : (
                                <Button variant="ghost" size="sm" onClick={() => handleSetDefault(limit.id)}>
                                  Đặt mặc định
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteRateLimit(limit.id)}
                                disabled={limit.isDefault}
                              >
                                Xóa
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Thêm giới hạn tốc độ</CardTitle>
                  <CardDescription>Tạo một giới hạn tốc độ mới cho API của bạn.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên</Label>
                      <Input
                        id="name"
                        placeholder="VD: Read Operations"
                        value={newRateLimit.name}
                        onChange={(e) => setNewRateLimit({ ...newRateLimit, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Loại giới hạn</Label>
                      <RadioGroup
                        value={newRateLimit.type}
                        onValueChange={(value) => setNewRateLimit({ ...newRateLimit, type: value })}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="global" id="global" />
                          <Label htmlFor="global" className="font-normal">
                            Toàn cục
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="endpoint" id="endpoint" />
                          <Label htmlFor="endpoint" className="font-normal">
                            Theo endpoint
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="api-key" id="api-key" />
                          <Label htmlFor="api-key" className="font-normal">
                            Theo API key
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="limit">Giới hạn</Label>
                        <Input
                          id="limit"
                          type="number"
                          min="1"
                          value={newRateLimit.limit}
                          onChange={(e) => setNewRateLimit({ ...newRateLimit, limit: Number.parseInt(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="period">Thời gian</Label>
                        <Select
                          value={newRateLimit.period}
                          onValueChange={(value) => setNewRateLimit({ ...newRateLimit, period: value })}
                        >
                          <SelectTrigger id="period">
                            <SelectValue placeholder="Chọn thời gian" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="second">Giây</SelectItem>
                            <SelectItem value="minute">Phút</SelectItem>
                            <SelectItem value="hour">Giờ</SelectItem>
                            <SelectItem value="day">Ngày</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scope">Phạm vi</Label>
                      <Select
                        value={newRateLimit.scope}
                        onValueChange={(value) => setNewRateLimit({ ...newRateLimit, scope: value })}
                      >
                        <SelectTrigger id="scope">
                          <SelectValue placeholder="Chọn phạm vi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="read">Đọc</SelectItem>
                          <SelectItem value="write">Ghi</SelectItem>
                          {newRateLimit.type === "api-key" && (
                            <>
                              <SelectItem value="production">Production</SelectItem>
                              <SelectItem value="development">Development</SelectItem>
                              <SelectItem value="testing">Testing</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="button" className="w-full" onClick={handleSaveRateLimit}>
                      Thêm giới hạn tốc độ
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quotas" className="space-y-6">
          <div className="flex items-center p-2 bg-amber-50 dark:bg-amber-950/30 rounded text-sm text-amber-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>
              Hạn ngạch giới hạn tổng số yêu cầu API mà một API key có thể thực hiện trong một khoảng thời gian nhất
              định.
            </span>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cài đặt hạn ngạch</CardTitle>
              <CardDescription>Cấu hình hạn ngạch cho API của bạn.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="quota-enabled" className="text-base">
                    Bật hạn ngạch
                  </Label>
                  <Switch id="quota-enabled" checked={quotaEnabled} onCheckedChange={setQuotaEnabled} />
                </div>

                {quotaEnabled && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quota-limit">Giới hạn yêu cầu</Label>
                        <Input
                          id="quota-limit"
                          type="number"
                          min="1"
                          value={quotaLimit}
                          onChange={(e) => setQuotaLimit(Number.parseInt(e.target.value))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quota-period">Thời gian</Label>
                        <Select value={quotaPeriod} onValueChange={setQuotaPeriod}>
                          <SelectTrigger id="quota-period">
                            <SelectValue placeholder="Chọn thời gian" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">Ngày</SelectItem>
                            <SelectItem value="week">Tuần</SelectItem>
                            <SelectItem value="month">Tháng</SelectItem>
                            <SelectItem value="year">Năm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quota-action">Hành động khi vượt quá hạn ngạch</Label>
                      <RadioGroup
                        value={quotaAction}
                        onValueChange={setQuotaAction}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="block" id="block" />
                          <Label htmlFor="block" className="font-normal">
                            Chặn yêu cầu
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="throttle" id="throttle" />
                          <Label htmlFor="throttle" className="font-normal">
                            Giảm tốc độ yêu cầu
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="notify" id="notify" />
                          <Label htmlFor="notify" className="font-normal">
                            Chỉ thông báo
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded text-sm text-blue-600">
                      <Info className="h-4 w-4 mr-2" />
                      <span>Bạn có thể thiết lập hạn ngạch riêng cho từng API key trong phần chi tiết API key.</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button onClick={handleSaveQuota}>Lưu cài đặt</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
