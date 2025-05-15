"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MobileCardViewProps {
  data: any[]
  columns: {
    id: string
    header: string
    cell: (item: any) => React.ReactNode
    isBadge?: boolean
    isAction?: boolean
    isHidden?: boolean
  }[]
  onRowClick?: (item: any) => void
  className?: string
}

export function MobileCardView({ data, columns, onRowClick, className }: MobileCardViewProps) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Separate primary columns (shown always) from secondary (shown when expanded)
  const primaryColumns = columns.filter((col) => !col.isHidden && !col.isAction).slice(0, 2)

  const secondaryColumns = columns.filter((col) => !col.isHidden && !col.isAction && !primaryColumns.includes(col))

  const actionColumns = columns.filter((col) => col.isAction)

  return (
    <div className={cn("space-y-3", className)}>
      {data.map((item, index) => {
        const isExpanded = expandedRows[item.id] || false

        return (
          <Card key={item.id || index} className="overflow-hidden">
            <CardHeader className="p-3 cursor-pointer bg-muted/30" onClick={() => onRowClick && onRowClick(item)}>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  {primaryColumns.map((col) => (
                    <div key={col.id}>
                      {col.isBadge ? (
                        <Badge variant="outline">{col.cell(item)}</Badge>
                      ) : (
                        <div
                          className={col.id === primaryColumns[0].id ? "font-medium" : "text-sm text-muted-foreground"}
                        >
                          {col.cell(item)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleRow(item.id)
                  }}
                >
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>

            {isExpanded && secondaryColumns.length > 0 && (
              <CardContent className="p-3 pt-0 grid gap-2 text-sm">
                {secondaryColumns.map((col) => (
                  <div key={col.id} className="py-1 flex justify-between border-b last:border-0">
                    <span className="font-medium">{col.header}</span>
                    <span>{col.cell(item)}</span>
                  </div>
                ))}
              </CardContent>
            )}

            {actionColumns.length > 0 && (
              <CardFooter className="p-3 pt-0 flex justify-end gap-2">
                {actionColumns.map((col) => (
                  <div key={col.id}>{col.cell(item)}</div>
                ))}
              </CardFooter>
            )}
          </Card>
        )
      })}
    </div>
  )
}
