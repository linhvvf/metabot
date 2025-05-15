"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function TrendDataTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dữ liệu xu hướng chi tiết</CardTitle>
        <CardDescription>Dữ liệu chi tiết về các xu hướng chính trong 90 ngày qua</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Xu hướng</TableHead>
              <TableHead>Giá trị hiện tại</TableHead>
              <TableHead>Thay đổi</TableHead>
              <TableHead>Dự đoán</TableHead>
              <TableHead>Độ tin cậy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Tỷ lệ tương tác</TableCell>
              <TableCell>24.8%</TableCell>
              <TableCell>
                <Badge variant="success" className="flex items-center gap-1 w-fit">
                  <ArrowUpRight className="h-3 w-3" />
                  12.5%
                </Badge>
              </TableCell>
              <TableCell>26.2%</TableCell>
              <TableCell>95%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Thời gian phản hồi</TableCell>
              <TableCell>4.2 phút</TableCell>
              <TableCell>
                <Badge variant="success" className="flex items-center gap-1 w-fit">
                  <ArrowDownRight className="h-3 w-3" />
                  18.3%
                </Badge>
              </TableCell>
              <TableCell>3.9 phút</TableCell>
              <TableCell>92%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Tỷ lệ chuyển đổi</TableCell>
              <TableCell>5.8%</TableCell>
              <TableCell>
                <Badge variant="success" className="flex items-center gap-1 w-fit">
                  <ArrowUpRight className="h-3 w-3" />
                  8.7%
                </Badge>
              </TableCell>
              <TableCell>6.3%</TableCell>
              <TableCell>90%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Cảm xúc tích cực</TableCell>
              <TableCell>68.5%</TableCell>
              <TableCell>
                <Badge variant="success" className="flex items-center gap-1 w-fit">
                  <ArrowUpRight className="h-3 w-3" />
                  5.2%
                </Badge>
              </TableCell>
              <TableCell>71.2%</TableCell>
              <TableCell>88%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Sử dụng Zalo</TableCell>
              <TableCell>42.5%</TableCell>
              <TableCell>
                <Badge variant="success" className="flex items-center gap-1 w-fit">
                  <ArrowUpRight className="h-3 w-3" />
                  8.3%
                </Badge>
              </TableCell>
              <TableCell>45.8%</TableCell>
              <TableCell>93%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
