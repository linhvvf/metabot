"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Download, Filter, RefreshCw } from "lucide-react"
import LeadAnalysisPanel from "@/components/dashboard/leads/lead-analysis-panel"
import LeadFilterCriteria from "@/components/dashboard/leads/lead-filter-criteria"
import LeadCategoryTable from "@/components/dashboard/leads/lead-category-table"
import LeadSummaryStats from "@/components/dashboard/leads/lead-summary-stats"

export default function LeadsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showFilterCriteria, setShowFilterCriteria] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const { toast } = useToast()

  const handleStartAnalysis = async (criteria) => {
    setIsAnalyzing(true)

    try {
      // Giả lập gọi API để lấy danh sách khách hàng
      const customersResponse = await fetch("/api/customers?limit=50")
      const customers = await customersResponse.json()

      // Gọi API phân tích khách hàng tiềm năng
      const response = await fetch("/api/ai/analyze-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customers: customers.data,
          criteria,
        }),
      })

      if (!response.ok) {
        throw new Error("Lỗi khi phân tích khách hàng tiềm năng")
      }

      const data = await response.json()
      setAnalysisResults(data.analysis)

      toast({
        title: "Phân tích hoàn tất",
        description: "Đã phân tích và phân loại khách hàng tiềm năng thành công",
      })
    } catch (error) {
      console.error("Error analyzing leads:", error)
      toast({
        title: "Lỗi",
        description: "Không thể phân tích khách hàng tiềm năng. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleExportData = () => {
    toast({
      title: "Xuất dữ liệu",
      description: "Đang xuất dữ liệu khách hàng tiềm năng...",
    })
    // Implement export functionality
  }

  const handleApplyCriteria = (criteria) => {
    setShowFilterCriteria(false)
    handleStartAnalysis(criteria)
  }

  // Mock data for demonstration
  const mockAnalysisResults = {
    leads: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0901234567",
        category: "Tiềm năng cao",
        suggestedTags: ["Sẵn sàng mua", "Khách hàng VIP", "Quan tâm sản phẩm mới"],
        reason: "Tương tác thường xuyên, giá trị đơn hàng cao, phản hồi nhanh",
        approach: "Gửi thông tin sản phẩm mới và ưu đãi đặc biệt dành riêng cho khách VIP",
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "tranthib@example.com",
        phone: "0912345678",
        category: "Tiềm năng trung bình",
        suggestedTags: ["Cần theo dõi", "Quan tâm giá cả"],
        reason: "Tương tác vừa phải, đã mua hàng nhưng giá trị thấp",
        approach: "Gửi thông tin khuyến mãi và ưu đãi giảm giá để kích thích mua hàng",
      },
      {
        id: 3,
        name: "Lê Văn C",
        email: "levanc@example.com",
        phone: "0923456789",
        category: "Tiềm năng thấp",
        suggestedTags: ["Không hoạt động", "Cần tái kích hoạt"],
        reason: "Ít tương tác, lần cuối mua hàng đã lâu",
        approach: "Gửi email tái kích hoạt với ưu đãi đặc biệt để thu hút sự quan tâm trở lại",
      },
      {
        id: 4,
        name: "Phạm Thị D",
        email: "phamthid@example.com",
        phone: "0934567890",
        category: "Tiềm năng cao",
        suggestedTags: ["Khách hàng thân thiết", "Mua hàng thường xuyên"],
        reason: "Tương tác cao, mua hàng thường xuyên với giá trị lớn",
        approach: "Chương trình khách hàng thân thiết với ưu đãi đặc biệt và dịch vụ chăm sóc VIP",
      },
      {
        id: 5,
        name: "Hoàng Văn E",
        email: "hoangvane@example.com",
        phone: "0945678901",
        category: "Tiềm năng trung bình",
        suggestedTags: ["Mới", "Cần nuôi dưỡng"],
        reason: "Khách hàng mới, đã có tương tác nhưng chưa mua hàng",
        approach: "Gửi thông tin giới thiệu sản phẩm và ưu đãi cho khách hàng mới",
      },
    ],
    summary: {
      highPotential: 2,
      mediumPotential: 2,
      lowPotential: 1,
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Khách hàng tiềm năng</h1>
          <p className="text-gray-500">Phân tích và phân loại khách hàng tiềm năng bằng AI</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilterCriteria(!showFilterCriteria)}>
            <Filter className="h-4 w-4 mr-2" />
            Tiêu chí phân loại
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Xuất dữ liệu
          </Button>
          <Button size="sm" onClick={() => handleStartAnalysis({})} disabled={isAnalyzing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? "animate-spin" : ""}`} />
            {isAnalyzing ? "Đang phân tích..." : "Phân tích mới"}
          </Button>
        </div>
      </div>

      {showFilterCriteria && (
        <LeadFilterCriteria onApply={handleApplyCriteria} onCancel={() => setShowFilterCriteria(false)} />
      )}

      {analysisResults || mockAnalysisResults ? (
        <>
          <LeadSummaryStats data={analysisResults || mockAnalysisResults} />

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="high">Tiềm năng cao</TabsTrigger>
              <TabsTrigger value="medium">Tiềm năng trung bình</TabsTrigger>
              <TabsTrigger value="low">Tiềm năng thấp</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Tất cả khách hàng tiềm năng</CardTitle>
                  <CardDescription>Danh sách tất cả khách hàng tiềm năng đã được phân loại</CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadCategoryTable data={(analysisResults || mockAnalysisResults).leads} category="all" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="high">
              <Card>
                <CardHeader>
                  <CardTitle>Khách hàng tiềm năng cao</CardTitle>
                  <CardDescription>Những khách hàng có khả năng chuyển đổi cao nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadCategoryTable
                    data={(analysisResults || mockAnalysisResults).leads.filter(
                      (lead) => lead.category === "Tiềm năng cao",
                    )}
                    category="high"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="medium">
              <Card>
                <CardHeader>
                  <CardTitle>Khách hàng tiềm năng trung bình</CardTitle>
                  <CardDescription>Những khách hàng cần được nuôi dưỡng để tăng khả năng chuyển đổi</CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadCategoryTable
                    data={(analysisResults || mockAnalysisResults).leads.filter(
                      (lead) => lead.category === "Tiềm năng trung bình",
                    )}
                    category="medium"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="low">
              <Card>
                <CardHeader>
                  <CardTitle>Khách hàng tiềm năng thấp</CardTitle>
                  <CardDescription>
                    Những khách hàng cần được tái kích hoạt hoặc có khả năng chuyển đổi thấp
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadCategoryTable
                    data={(analysisResults || mockAnalysisResults).leads.filter(
                      (lead) => lead.category === "Tiềm năng thấp",
                    )}
                    category="low"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <LeadAnalysisPanel onStartAnalysis={handleStartAnalysis} />
      )}
    </div>
  )
}
