"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Copy, MessageSquare, Plus, Tag, X } from "lucide-react"

export default function LeadCategoryTable({ data, category }) {
  const [selectedLead, setSelectedLead] = useState(null)
  const [showTagDialog, setShowTagDialog] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [newTag, setNewTag] = useState("")
  const { toast } = useToast()

  const getCategoryColor = (category) => {
    switch (category) {
      case "Tiềm năng cao":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Tiềm năng trung bình":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Tiềm năng thấp":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getTagColor = (tag) => {
    const tagColors = {
      "Sẵn sàng mua": "bg-green-100 text-green-800 border-green-200",
      "Khách hàng VIP": "bg-purple-100 text-purple-800 border-purple-200",
      "Quan tâm sản phẩm mới": "bg-blue-100 text-blue-800 border-blue-200",
      "Cần theo dõi": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Quan tâm giá cả": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Không hoạt động": "bg-gray-100 text-gray-800 border-gray-200",
      "Cần tái kích hoạt": "bg-red-100 text-red-800 border-red-200",
      "Khách hàng thân thiết": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Mua hàng thường xuyên": "bg-violet-100 text-violet-800 border-violet-200",
      Mới: "bg-teal-100 text-teal-800 border-teal-200",
      "Cần nuôi dưỡng": "bg-amber-100 text-amber-800 border-amber-200",
    }

    return tagColors[tag] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const handleViewDetails = (lead) => {
    setSelectedLead(lead)
  }

  const handleCloseDetails = () => {
    setSelectedLead(null)
  }

  const handleOpenTagDialog = (lead) => {
    setSelectedLead(lead)
    setSelectedTags([...lead.suggestedTags])
    setShowTagDialog(true)
  }

  const handleCloseTagDialog = () => {
    setShowTagDialog(false)
    setNewTag("")
  }

  const handleAddTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const handleSaveTags = () => {
    toast({
      title: "Thẻ đã được cập nhật",
      description: `Đã cập nhật thẻ cho khách hàng ${selectedLead.name}`,
    })
    handleCloseTagDialog()
  }

  const handleCreateCampaign = (lead) => {
    toast({
      title: "Tạo chiến dịch",
      description: `Đang chuyển hướng đến trang tạo chiến dịch cho ${lead.category}`,
    })
    // Implement redirect to campaign creation page
  }

  const handleCopyApproach = (approach) => {
    navigator.clipboard.writeText(approach)
    toast({
      title: "Đã sao chép",
      description: "Đã sao chép chiến lược tiếp cận vào clipboard",
    })
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Phân loại</TableHead>
              <TableHead className="hidden md:table-cell">Thẻ đề xuất</TableHead>
              <TableHead className="hidden lg:table-cell">Lý do</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  Không có khách hàng tiềm năng nào trong danh mục này
                </TableCell>
              </TableRow>
            ) : (
              data.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={lead.avatar || "/placeholder.svg"} alt={lead.name} />
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(lead.category)}>{lead.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {lead.suggestedTags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className={getTagColor(tag)}>
                          {tag}
                        </Badge>
                      ))}
                      {lead.suggestedTags.length > 2 && (
                        <Badge variant="outline">+{lead.suggestedTags.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-xs truncate">{lead.reason}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(lead)}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleOpenTagDialog(lead)}>
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Chi tiết khách hàng tiềm năng */}
      {selectedLead && (
        <Dialog open={!!selectedLead && !showTagDialog} onOpenChange={handleCloseDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chi tiết khách hàng tiềm năng</DialogTitle>
              <DialogDescription>Thông tin chi tiết và chiến lược tiếp cận cho khách hàng</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={selectedLead.avatar || "/placeholder.svg"} alt={selectedLead.name} />
                    <AvatarFallback>
                      {selectedLead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-xl font-medium mb-1">{selectedLead.name}</h3>
                  <Badge className={getCategoryColor(selectedLead.category)}>{selectedLead.category}</Badge>

                  <div className="w-full mt-4">
                    <p className="text-sm font-medium mb-2">Thẻ đề xuất</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedLead.suggestedTags.map((tag) => (
                        <Badge key={tag} variant="outline" className={getTagColor(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Lý do phân loại</h4>
                  <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">{selectedLead.reason}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium">Chiến lược tiếp cận</h4>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyApproach(selectedLead.approach)}>
                      <Copy className="h-3 w-3 mr-1" />
                      Sao chép
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">{selectedLead.approach}</p>
                </div>

                <div className="pt-4">
                  <Button className="w-full" onClick={() => handleCreateCampaign(selectedLead)}>
                    Tạo chiến dịch cho nhóm khách hàng này
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog gắn thẻ */}
      {showTagDialog && (
        <Dialog open={showTagDialog} onOpenChange={handleCloseTagDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Gắn thẻ cho khách hàng</DialogTitle>
              <DialogDescription>Thêm hoặc xóa thẻ cho khách hàng {selectedLead?.name}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Thẻ hiện tại</Label>
                <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
                  {selectedTags.length === 0 ? (
                    <p className="text-sm text-gray-500">Chưa có thẻ nào</p>
                  ) : (
                    selectedTags.map((tag) => (
                      <Badge key={tag} variant="outline" className={getTagColor(tag)}>
                        {tag}
                        <button className="ml-1 hover:text-gray-700" onClick={() => handleRemoveTag(tag)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Nhập tên thẻ mới"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  />
                </div>
                <Button size="sm" onClick={handleAddTag}>
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Thẻ phổ biến</Label>
                <div className="flex flex-wrap gap-2">
                  {["VIP", "Tiềm năng", "Mới", "Đã mua hàng", "Quan tâm", "Cần theo dõi"].map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTags([...selectedTags, tag])
                          } else {
                            setSelectedTags(selectedTags.filter((t) => t !== tag))
                          }
                        }}
                      />
                      <label
                        htmlFor={`tag-${tag}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseTagDialog}>
                Hủy
              </Button>
              <Button onClick={handleSaveTags}>Lưu thay đổi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
