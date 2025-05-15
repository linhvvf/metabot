"use client"

import { useState } from "react"
import { VirtualizedList } from "@/components/ui/virtualized-list"
import { useApiQuery } from "@/lib/api-client"
import { Badge } from "@/components/ui/badge"
import { UserRound, Mail, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useMobile } from "@/hooks/use-mobile"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  source: string
  tags: string[]
  lastContact: string
  status: string
}

export function OptimizedCustomerTable() {
  const isMobile = useMobile()
  const [page, setPage] = useState(1)
  const [customers, setCustomers] = useState<Customer[]>([])

  // Sử dụng API client tối ưu
  const { data, isLoading, error } = useApiQuery<{ customers: Customer[]; total: number }>(
    "/customers",
    { page, limit: 20 },
    {
      cacheTime: 2 * 60 * 1000, // 2 phút
      onSuccess: (data) => {
        if (page === 1) {
          setCustomers(data.customers)
        } else {
          setCustomers((prev) => [...prev, ...data.customers])
        }
      },
    },
  )

  // Xử lý load more
  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  // Render item cho danh sách ảo hóa
  const renderCustomerItem = (customer: Customer) => {
    return (
      <Card className="p-4 mb-2 hover:bg-muted/50 transition-colors">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <UserRound className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">{customer.name}</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Mail className="h-3 w-3 mr-1" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Phone className="h-3 w-3 mr-1" />
              <span>{customer.phone}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Badge variant={customer.status === "Đang hoạt động" ? "default" : "outline"}>{customer.status}</Badge>
            <div className="flex flex-wrap justify-end gap-1 mt-2">
              {customer.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {customer.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{customer.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (isLoading && page === 1) {
    return (
      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                  <Skeleton className="h-3 w-[120px]" />
                </div>
                <div className="flex flex-col items-end">
                  <Skeleton className="h-5 w-[80px]" />
                  <div className="flex gap-1 mt-2">
                    <Skeleton className="h-4 w-[60px]" />
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu</div>
  }

  return (
    <div className="space-y-4">
      <VirtualizedList
        items={customers}
        height={600}
        itemHeight={120}
        renderItem={renderCustomerItem}
        onEndReached={handleLoadMore}
        className="pr-2"
      />

      {isLoading && page > 1 && (
        <div className="py-4 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Đang tải thêm...</p>
        </div>
      )}
    </div>
  )
}
