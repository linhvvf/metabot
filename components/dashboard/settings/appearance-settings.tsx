"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Save, Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [fontSize, setFontSize] = useState("medium")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = () => {
    toast({
      title: "Thành công",
      description: "Đã cập nhật cài đặt giao diện",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Giao diện</h3>
        <p className="text-sm text-muted-foreground">Tùy chỉnh giao diện và chủ đề của ứng dụng</p>
      </div>
      <Separator />

      <div>
        <h4 className="text-base font-medium mb-4">Chủ đề</h4>
        {mounted ? (
          <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="light" id="theme-light" className="sr-only" />
              <Label
                htmlFor="theme-light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Sun className="h-6 w-6 mb-2" />
                <span className="font-medium">Sáng</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
              <Label
                htmlFor="theme-dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Moon className="h-6 w-6 mb-2" />
                <span className="font-medium">Tối</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="system" id="theme-system" className="sr-only" />
              <Label
                htmlFor="theme-system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Monitor className="h-6 w-6 mb-2" />
                <span className="font-medium">Hệ thống</span>
              </Label>
            </div>
          </RadioGroup>
        ) : (
          <div className="h-[120px] flex items-center justify-center">
            <div className="animate-pulse">Đang tải...</div>
          </div>
        )}
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Cỡ chữ</h4>
        <RadioGroup value={fontSize} onValueChange={setFontSize} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <RadioGroupItem value="small" id="font-small" className="sr-only" />
            <Label
              htmlFor="font-small"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="text-sm font-medium">Nhỏ</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="medium" id="font-medium" className="sr-only" />
            <Label
              htmlFor="font-medium"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="text-base font-medium">Vừa</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="large" id="font-large" className="sr-only" />
            <Label
              htmlFor="font-large"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="text-lg font-medium">Lớn</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="extra-large" id="font-extra-large" className="sr-only" />
            <Label
              htmlFor="font-extra-large"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="text-xl font-medium">Rất lớn</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Trợ năng</h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
            <div className="space-y-1">
              <Label htmlFor="reduced-motion" className="font-medium">
                Giảm chuyển động
              </Label>
              <p className="text-sm text-muted-foreground">
                Giảm thiểu hoặc loại bỏ các hiệu ứng chuyển động và hoạt ảnh
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-md border">
            <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
            <div className="space-y-1">
              <Label htmlFor="high-contrast" className="font-medium">
                Tương phản cao
              </Label>
              <p className="text-sm text-muted-foreground">Tăng tương phản giữa văn bản và nền để dễ đọc hơn</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="text-base font-medium mb-4">Bố cục</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4 hover:border-primary cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded-md mb-2 overflow-hidden">
              <div className="w-full h-full flex">
                <div className="w-1/4 h-full bg-gray-200"></div>
                <div className="w-3/4 h-full p-2">
                  <div className="w-full h-1/6 bg-gray-200 rounded-sm mb-2"></div>
                  <div className="w-full h-5/6 bg-gray-200 rounded-sm"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Sidebar bên trái</span>
              <div className="h-4 w-4 rounded-full bg-primary"></div>
            </div>
          </div>
          <div className="border rounded-md p-4 hover:border-primary cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded-md mb-2 overflow-hidden">
              <div className="w-full h-full flex">
                <div className="w-3/4 h-full p-2">
                  <div className="w-full h-1/6 bg-gray-200 rounded-sm mb-2"></div>
                  <div className="w-full h-5/6 bg-gray-200 rounded-sm"></div>
                </div>
                <div className="w-1/4 h-full bg-gray-200"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Sidebar bên phải</span>
              <div className="h-4 w-4 rounded-full border border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>
    </div>
  )
}
