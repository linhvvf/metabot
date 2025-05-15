"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TestSelectorProps {
  tests: any[]
  selectedTests: string[]
  onSelectTest: (testId: string) => void
  maxSelections?: number
}

export default function TestSelector({ tests, selectedTests, onSelectTest, maxSelections = 3 }: TestSelectorProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (testId: string) => {
    onSelectTest(testId)
    setOpen(false)
  }

  const isDisabled = (testId: string) => {
    return selectedTests.length >= maxSelections && !selectedTests.includes(testId)
  }

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium">Chọn thử nghiệm để so sánh</label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Bạn có thể chọn tối đa {maxSelections} thử nghiệm để so sánh</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full">
            {selectedTests.length > 0 ? `${selectedTests.length} thử nghiệm đã chọn` : "Chọn thử nghiệm..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Tìm thử nghiệm..." />
            <CommandList>
              <CommandEmpty>Không tìm thấy thử nghiệm</CommandEmpty>
              <CommandGroup>
                {tests.map((test) => (
                  <CommandItem
                    key={test.id}
                    value={test.id}
                    onSelect={() => handleSelect(test.id)}
                    disabled={isDisabled(test.id)}
                    className={cn(
                      "flex items-center justify-between",
                      isDisabled(test.id) && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{test.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {test.variants.length} phiên bản •{" "}
                        {test.settings.status === "completed" ? "Đã hoàn thành" : "Đang chạy"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {test.settings.status === "completed" ? (
                        <Badge variant="outline" className="mr-2">
                          Đã hoàn thành
                        </Badge>
                      ) : (
                        <Badge className="mr-2">Đang chạy</Badge>
                      )}
                      {selectedTests.includes(test.id) && <Check className="h-4 w-4" />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedTests.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTests.map((testId) => {
            const test = tests.find((t) => t.id === testId)
            if (!test) return null
            return (
              <Badge key={testId} variant="secondary" className="flex items-center gap-1">
                {test.name}
                <button className="ml-1 rounded-full hover:bg-muted p-0.5" onClick={() => onSelectTest(testId)}>
                  <span className="sr-only">Remove</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
