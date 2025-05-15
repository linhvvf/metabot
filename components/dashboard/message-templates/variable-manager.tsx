"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

interface VariableManagerProps {
  variables: string[]
  onAddVariable: (variable: string) => void
  onRemoveVariable: (variable: string) => void
  onInsertVariable: (variable: string) => void
}

export function VariableManager({
  variables,
  onAddVariable,
  onRemoveVariable,
  onInsertVariable,
}: VariableManagerProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input id="new-variable" placeholder="Tên biến mới..." />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const input = document.getElementById("new-variable") as HTMLInputElement
            if (input.value) {
              onAddVariable(input.value)
              input.value = ""
            }
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {variables.length > 0 ? (
          variables.map((variable) => (
            <div key={variable} className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
              <span className="font-mono text-sm">{variable}</span>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => onInsertVariable(variable)}>
                  Chèn
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => onRemoveVariable(variable)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">Chưa có biến nào được sử dụng trong mẫu tin nhắn này</div>
        )}
      </div>
    </div>
  )
}
