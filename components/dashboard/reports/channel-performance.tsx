"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ChannelPerformance({ detailed = false }: { detailed?: boolean }) {
  const channels = [
    {
      name: "Zalo",
      color: "bg-blue-100 text-blue-800",
      icon: "/zalo-logo.png",
      messages: 6248,
      conversations: 1245,
      responseTime: "3.2 phút",
      satisfaction: "92%",
      trend: "+5.2%",
    },
    {
      name: "Facebook",
      color: "bg-indigo-100 text-indigo-800",
      icon: "/facebook-messenger-logo.png",
      messages: 4125,
      conversations: 987,
      responseTime: "4.5 phút",
      satisfaction: "88%",
      trend: "+3.7%",
    },
    {
      name: "Telegram",
      color: "bg-sky-100 text-sky-800",
      icon: "/telegram-logo.png",
      messages: 1248,
      conversations: 421,
      responseTime: "5.8 phút",
      satisfaction: "85%",
      trend: "+2.1%",
    },
    {
      name: "Viber",
      color: "bg-purple-100 text-purple-800",
      icon: "/viber-logo.png",
      messages: 865,
      conversations: 312,
      responseTime: "6.2 phút",
      satisfaction: "82%",
      trend: "+1.5%",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiệu suất theo kênh</CardTitle>
        <CardDescription>So sánh hiệu suất giữa các kênh liên lạc</CardDescription>
        {detailed && (
          <Tabs defaultValue="messages" className="mt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="messages">Tin nhắn</TabsTrigger>
              <TabsTrigger value="response">Thời gian phản hồi</TabsTrigger>
              <TabsTrigger value="satisfaction">Mức độ hài lòng</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </CardHeader>
      <CardContent>
        {detailed ? (
          <div className="h-[400px] relative">
            <Image
              src="/communication-channels-performance.png"
              alt="Biểu đồ hiệu suất theo kênh"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kênh</TableHead>
                <TableHead className="text-right">Tin nhắn</TableHead>
                <TableHead className="text-right">Thời gian PH</TableHead>
                <TableHead className="text-right">Mức độ hài lòng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channels.map((channel) => (
                <TableRow key={channel.name}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-2 relative">
                        <Image
                          src={channel.icon || "/placeholder.svg"}
                          alt={channel.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Badge variant="outline" className={channel.color}>
                        {channel.name}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{channel.messages.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{channel.responseTime}</TableCell>
                  <TableCell className="text-right">{channel.satisfaction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {detailed && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Chi tiết theo kênh</h3>
            <div className="space-y-6">
              {channels.map((channel) => (
                <div key={channel.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3 relative">
                        <Image
                          src={channel.icon || "/placeholder.svg"}
                          alt={channel.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{channel.name}</h4>
                        <p className="text-sm text-gray-500">Tăng trưởng: {channel.trend}</p>
                      </div>
                    </div>
                    <Badge className={channel.color}>{channel.satisfaction} hài lòng</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Tin nhắn</p>
                      <p className="text-xl font-bold">{channel.messages.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hội thoại</p>
                      <p className="text-xl font-bold">{channel.conversations.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Thời gian PH</p>
                      <p className="text-xl font-bold">{channel.responseTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tin nhắn/Hội thoại</p>
                      <p className="text-xl font-bold">{(channel.messages / channel.conversations).toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
