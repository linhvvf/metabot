"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import ExportPdfDialog from "./export-pdf-dialog"
import type { ReportType } from "@/lib/pdf-export/types"

interface ExportPdfButtonProps {
  reportType: ReportType
  reportTitle: string
  data: any
  dateRange: { from: string; to: string }
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
}

export default function ExportPdfButton({
  reportType,
  reportTitle,
  data,
  dateRange,
  variant = "outline",
}: ExportPdfButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button variant={variant} size="sm" onClick={() => setIsDialogOpen(true)}>
        <FileDown className="mr-2 h-4 w-4" />
        Xuất PDF
      </Button>

      <ExportPdfDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        reportType={reportType}
        reportTitle={reportTitle}
        data={data}
        dateRange={dateRange}
      />
    </>
  )
}
