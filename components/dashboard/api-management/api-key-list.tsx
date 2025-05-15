"use client"

import { useState } from "react"
import { ArrowUpDown, Copy, Eye, EyeOff, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react"
import { ApiKeyDetail } from "./api-key-detail"
import { PermissionManager } from "./permission-manager"
import { ApiUsageHistory } from "./api-usage-history"
import { RateLimitSettings } from "./rate-limit-settings"
import { WebhookSettings } from "./webhook-settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

// Mock data for API keys
const mockApiKeys = [
  {
    id: "api_key_1",
    name: "Production API Key",
    key: "mb_prod_a1b2c3d4e5f6g7h8i9j0",
    created: "2023-05-15T10:30:00Z",
    lastUsed: "2023-06-10T14:22:10Z",
    status: "active",
    environment: "production",
    permissions: ["read:customers", "write:customers", "read:conversations", "write:conversations"],
    rateLimit: 1000,
    expiresAt: "2024-05-15T10:30:00Z",
  },
  {
    id: "api_key_2",
    name: "Development API Key",
    key: "mb_dev_z9y8x7w6v5u4t3s2r1q0",
    created: "2023-06-01T09:15:00Z",
    lastUsed: "2023-06-09T11:45:30Z",
    status: "active",
    environment: "development",
    permissions: ["read:customers", "write:customers", "read:conversations"],
    rateLimit: 5000,
    expiresAt: null,
  },
  {
    id: "api_key_3",
    name: "Testing API Key",
    key: "mb_test_j1k2l3m4n5o6p7q8r9s0",
    created: "2023-05-20T14:45:00Z",
    lastUsed: "2023-06-05T16:30:45Z",
    status: "inactive",
    environment: "testing",
    permissions: ["read:customers", "read:conversations"],
    rateLimit: 2000,
    expiresAt: "2023-08-20T14:45:00Z",
  },
]

export function ApiKeyList() {
  const [apiKeys, setApiKeys] = useState(mockApiKeys)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)

  const toggleKeyVisibility = (id: string) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "API Key đã được sao chép",
      description: "API Key đã được sao chép vào clipboard",
    })
  }

  const handleDeleteKey = (id: string) => {
    setKeyToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteKey = () => {
    if (keyToDelete) {
      setApiKeys(apiKeys.filter((key) => key.id !== keyToDelete))
      setIsDeleteDialogOpen(false)
      setKeyToDelete(null)
      toast({
        title: "API Key đã bị xóa",
        description: "API Key đã bị xóa thành công",
      })
    }
  }

  const toggleKeyStatus = (id: string) => {
    setApiKeys(
      apiKeys.map((key) => {
        if (key.id === id) {
          return {
            ...key,
            status: key.status === "active" ? "inactive" : "active",
          }
        }
        return key
      }),
    )
  }

  const regenerateKey = (id: string) => {
    // In a real app, this would call an API to regenerate the key
    const newKey = `mb_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`

    setApiKeys(
      apiKeys.map((key) => {
        if (key.id === id) {
          return {
            ...key,
            key: newKey,
            created: new Date().toISOString(),
          }
        }
        return key
      }),
    )

    toast({
      title: "API Key đã được tạo lại",
      description: "API Key mới đã được tạo thành công",
    })
  }

  const sortedKeys = [...apiKeys]
    .filter((key) => key.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.created).getTime()
      const dateB = new Date(b.created).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <Input
          placeholder="Tìm kiếm API key..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sắp xếp theo {sortOrder === "asc" ? "mới nhất" : "cũ nhất"}
        </Button>
      </div>

      {sortedKeys.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Không tìm thấy API key nào</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedKeys.map((apiKey) => (
            <Card key={apiKey.id} className={apiKey.status === "inactive" ? "opacity-70" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {apiKey.name}
                      <Badge
                        variant={
                          apiKey.environment === "production"
                            ? "destructive"
                            : apiKey.environment === "development"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {apiKey.environment}
                      </Badge>
                      <Badge variant={apiKey.status === "active" ? "default" : "outline"}>
                        {apiKey.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Tạo ngày: {formatDate(apiKey.created)}
                      {apiKey.expiresAt && ` • Hết hạn: ${formatDate(apiKey.expiresAt)}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={apiKey.status === "active"} onCheckedChange={() => toggleKeyStatus(apiKey.id)} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedKey(apiKey.id)}>Chi tiết</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => regenerateKey(apiKey.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" /> Tạo lại key
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteKey(apiKey.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Xóa key
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Input
                      readOnly
                      value={showKey[apiKey.id] ? apiKey.key : "•".repeat(24)}
                      className="pr-20 font-mono text-sm"
                    />
                    <div className="absolute right-0 top-0 flex h-full items-center space-x-1 pr-3">
                      <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                        {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showKey[apiKey.id] ? "Ẩn" : "Hiện"} API key</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key)}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Sao chép API key</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium">Quyền truy cập:</span>{" "}
                  {apiKey.permissions.length > 3
                    ? `${apiKey.permissions.slice(0, 3).join(", ")} +${apiKey.permissions.length - 3}`
                    : apiKey.permissions.join(", ")}
                  {" • "}
                  <span className="font-medium">Giới hạn:</span> {apiKey.rateLimit} requests/phút
                  {" • "}
                  <span className="font-medium">Sử dụng lần cuối:</span> {formatDate(apiKey.lastUsed)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa API Key</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa API key này? Hành động này không thể hoàn tác và sẽ làm mất hiệu lực tất cả các
              yêu cầu sử dụng key này.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDeleteKey}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* API Key Detail Dialog */}
      <Dialog open={!!selectedKey} onOpenChange={(open) => !open && setSelectedKey(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết API Key</DialogTitle>
            <DialogDescription>Xem và quản lý chi tiết API key</DialogDescription>
          </DialogHeader>

          {selectedKey && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="details">Chi tiết</TabsTrigger>
                <TabsTrigger value="permissions">Quyền truy cập</TabsTrigger>
                <TabsTrigger value="usage">Lịch sử sử dụng</TabsTrigger>
                <TabsTrigger value="rate-limits">Giới hạn</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <ApiKeyDetail apiKey={apiKeys.find((key) => key.id === selectedKey)!} />
              </TabsContent>
              <TabsContent value="permissions">
                <PermissionManager apiKey={apiKeys.find((key) => key.id === selectedKey)!} />
              </TabsContent>
              <TabsContent value="usage">
                <ApiUsageHistory apiKeyId={selectedKey} />
              </TabsContent>
              <TabsContent value="rate-limits">
                <RateLimitSettings apiKey={apiKeys.find((key) => key.id === selectedKey)!} />
              </TabsContent>
              <TabsContent value="webhooks">
                <WebhookSettings apiKeyId={selectedKey} />
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
