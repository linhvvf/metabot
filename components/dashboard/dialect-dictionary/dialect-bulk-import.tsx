"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, FileUp, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function DialectBulkImport() {
  const [isOpen, setIsOpen] = useState(false)
  const [csvData, setCsvData] = useState("")
  const [jsonData, setJsonData] = useState("")
  const [activeTab, setActiveTab] = useState("csv")
  const [isImporting, setIsImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [importResult, setImportResult] = useState<{
    success: number
    failed: number
    total: number
  } | null>(null)

  const handleImport = () => {
    // Giả lập quá trình nhập dữ liệu
    setIsImporting(true)
    setProgress(0)
    setImportResult(null)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsImporting(false)
          // Giả lập kết quả nhập
          setImportResult({
            success: 42,
            failed: 3,
            total: 45,
          })
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleClose = () => {
    if (!isImporting) {
      setIsOpen(false)
      setCsvData("")
      setJsonData("")
      setImportResult(null)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <FileUp className="mr-2 h-4 w-4" />
        Nhập dữ liệu hàng loạt
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nhập dữ liệu biệt ngữ hàng loạt</DialogTitle>
            <DialogDescription>
              Nhập nhiều biệt ngữ cùng lúc bằng cách sử dụng định dạng CSV hoặc JSON
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="csv" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="csv">CSV</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="csv" className="space-y-4 py-4">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Định dạng CSV: term,meaning,region,category,examples,standardTerm
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="csv-data">Dữ liệu CSV</Label>
                <Textarea
                  id="csv-data"
                  placeholder="xí muội,Trái mận muối,Miền Nam,Ẩm thực,Đi ăn xí muội không?,Ô mai"
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  rows={10}
                />
              </div>
            </TabsContent>
            <TabsContent value="json" className="space-y-4 py-4">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Định dạng JSON: mảng các đối tượng với các trường term, meaning, region, category, examples,
                  standardTerm
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="json-data">Dữ liệu JSON</Label>
                <Textarea
                  id="json-data"
                  placeholder={`[
  {
    "term": "xí muội",
    "meaning": "Trái mận muối",
    "region": "Miền Nam",
    "category": "Ẩm thực",
    "examples": "Đi ăn xí muội không?",
    "standardTerm": "Ô mai"
  }
]`}
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  rows={10}
                />
              </div>
            </TabsContent>
          </Tabs>

          {isImporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Đang nhập dữ liệu...</span>
                <span className="text-sm">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {importResult && (
            <Alert className={importResult.failed > 0 ? "border-amber-500" : "border-green-500"}>
              <AlertCircle className={importResult.failed > 0 ? "text-amber-500" : "text-green-500"} />
              <AlertTitle>Kết quả nhập dữ liệu</AlertTitle>
              <AlertDescription>
                <p>Tổng số: {importResult.total} biệt ngữ</p>
                <p className="text-green-600">Thành công: {importResult.success} biệt ngữ</p>
                {importResult.failed > 0 && <p className="text-amber-600">Thất bại: {importResult.failed} biệt ngữ</p>}
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} disabled={isImporting}>
              Đóng
            </Button>
            <Button
              onClick={handleImport}
              disabled={isImporting || (activeTab === "csv" && !csvData) || (activeTab === "json" && !jsonData)}
            >
              {isImporting ? "Đang nhập..." : "Nhập dữ liệu"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
