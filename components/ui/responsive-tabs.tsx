"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ResponsiveTabsProps {
  tabs: {
    value: string
    label: string
    content: React.ReactNode
  }[]
  defaultValue?: string
  className?: string
}

export function ResponsiveTabs({ tabs, defaultValue, className }: ResponsiveTabsProps) {
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value)

  useEffect(() => {
    if (defaultValue && tabs.some((tab) => tab.value === defaultValue)) {
      setActiveTab(defaultValue)
    }
  }, [defaultValue, tabs])

  if (isMobile) {
    return (
      <div className={cn("space-y-4", className)}>
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn tab" />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab.value} value={tab.value}>
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div>{tabs.find((tab) => tab.value === activeTab)?.content}</div>
      </div>
    )
  }

  return (
    <Tabs defaultValue={activeTab} className={className}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
