"use client"

import { useState, useRef } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const colors = [
    "#ef4444", // red
    "#f97316", // orange
    "#f59e0b", // amber
    "#eab308", // yellow
    "#84cc16", // lime
    "#22c55e", // green
    "#10b981", // emerald
    "#14b8a6", // teal
    "#06b6d4", // cyan
    "#0ea5e9", // sky
    "#3b82f6", // blue
    "#6366f1", // indigo
    "#8b5cf6", // violet
    "#a855f7", // purple
    "#d946ef", // fuchsia
    "#ec4899", // pink
    "#f43f5e", // rose
    "#0f172a", // slate
    "#1e293b", // slate
    "#334155", // slate
    "#475569", // slate
    "#64748b", // slate
    "#94a3b8", // slate
    "#cbd5e1", // slate
    "#e2e8f0", // slate
    "#f1f5f9", // slate
    "#f8fafc", // slate
  ]

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-10 h-10 p-0"
          style={{ backgroundColor: color }}
          aria-label="Pick a color"
        />
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-9 gap-1">
          {colors.map((c) => (
            <button
              key={c}
              className="w-6 h-6 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              style={{ backgroundColor: c }}
              onClick={() => {
                onChange(c)
                setIsOpen(false)
              }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
