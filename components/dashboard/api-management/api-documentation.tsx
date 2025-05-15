"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Copy, ExternalLink } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function ApiDocumentation() {
  const [language, setLanguage] = useState('curl')
  const [version, setVersion] = useState('v1')
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Đã sao chép",
      description: "Mã đã được sao chép vào clipboard.",
    })
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Select value={version} onValueChange={setVersion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Phiên bản API" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">API v1 (Hiện tại)</SelectItem>
              <SelectItem value="v2">API v2 (Beta)</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ngôn ngữ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="curl">cURL</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="php">PHP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="flex items-center" asChild>
          <a href="https://docs.metabot.vn" target="_blank" rel="noopener noreferrer">
            Tài liệu đầy đủ
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>
      
      <Tabs defaultValue="authentication">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="authentication">Xác thực</TabsTrigger>
          <TabsTrigger value="customers">Khách hàng</TabsTrigger>
          <TabsTrigger value="conversations">Cuộc hội thoại</TabsTrigger>
          <TabsTrigger value="campaigns">Chiến dịch</TabsTrigger>
        </TabsList>
        
        <TabsContent value="authentication" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Xác thực API</h3>
              <p className="text-muted-foreground mb-4">
                Tất cả các yêu cầu API phải được xác thực bằng API key. Bạn có thể tạo và quản lý API keys trong tab "API Keys".
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Xác thực qua HTTP Header</h4>
                  <div className="bg-muted p-4 rounded-md relative">
                    <pre className="text-sm overflow-x-auto">
                      {language === 'curl' && `curl -X GET "https://api.metabot.vn/${version}/customers" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                      {language === 'javascript' && `fetch('https://api.metabot.vn/${version}/customers', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})`}
                      {language === 'python' && `import requests

response = requests.get(
    f"https://api.metabot.vn/${version}/customers",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)`}
                      {language === 'php' && `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.metabot.vn/${version}/customers",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY"
    ],
]);

$response = curl_exec($curl);
curl_close($curl);
?>`}
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(
                        language === 'curl' 
                          ? `curl -X GET "https://api.metabot.vn/${version}/customers" -H "Authorization: Bearer YOUR_API_KEY"`
                          : language === 'javascript'
                          ? `fetch('https://api.metabot.vn/${version}/customers', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})`
                          : language === 'python'
                          ? `import requests

response = requests.get(
    f"https://api.metabot.vn/${version}/customers",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)`
                          : `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.metabot.vn/${version}/customers",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY"
    ],
]);

$response = curl_exec($curl);
curl_close($curl);
?>`
                      )}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Xác thực qua Query Parameter</h4>
                  <div className="bg-muted p-4 rounded-md relative">
                    <pre className="text-sm overflow-x-auto">
                      {language === 'curl' && `curl -X GET "https://api.metabot.vn/${version}/customers?api_key=YOUR_API_KEY"`}
                      {language === 'javascript' && `fetch('https://api.metabot.vn/${version}/customers?api_key=YOUR_API_KEY', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})`}
                      {language === 'python' && `import requests

response = requests.get(
    f"https://api.metabot.vn/${version}/customers?api_key=YOUR_API_KEY"
)`}
                      {language === 'php' && `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.metabot.vn/${version}/customers?api_key=YOUR_API_KEY",
    CURLOPT_RETURNTRANSFER => true,
]);

$response = curl_exec($curl);
curl_close($curl);
?>`}
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(
                        language === 'curl' 
                          ? `curl -X GET "https://api.metabot.vn/${version}/customers?api_key=YOUR_API_KEY"`
                          : language === 'javascript'
                          ? `fetch('https://api.metabot.vn/${version}/customers?api_key=YOUR_API_KEY', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})`
                          : language === 'python'
                          ? `import requests

response = requests.get(
    f"https://api.metabot.vn/${version}/customers?api_key=YOUR_API_KEY"
)`
                          : `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.metabot.vn/${version}/customers?api_key=YOUR_API_KEY",
    CURLOPT_RETURNTRANSFER => true,
]);

$response = curl_exec($curl);
curl_close($curl);
?>`
                      )}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">API Khách hàng</h3>
              <p className="text-muted-foreground mb-4">
                API Khách hàng cho phép bạn quản lý thông tin khách hàng trong Metabot.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="get-customers">
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">GET</Badge>
                      <span>Lấy danh sách khách hàng</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Lấy danh sách khách hàng với các tùy chọn lọc và phân trang.
                      </p>
                      
                      <div className="bg-muted p-4 rounded-md relative">
                        <pre className="text-sm overflow-x-auto">
                          {language === 'curl' && `curl -X GET "https://api.metabot.vn/${version}/customers?limit=10&page=1" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                          {language === 'javascript' && `fetch('https://api.metabot.vn/${version}/customers?limit=10&page=1', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))`}
                          {language === 'python' && `import requests

response = requests.get(
    f"https://api.metabot.vn/${version}/customers",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    params={"limit": 10, "page": 1}
)

data = response.json()
print(data)`}
                          {language === 'php' && `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.metabot.vn/${version}/customers?limit=10&page=1",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY"
    ],
]);

$response = curl_exec($curl);
$data = json_decode($response, true);
curl_close($curl);
?>`}
                        </pre>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(
                            language === 'curl' 
                              ? `curl -X GET "https://api.metabot.vn/${version}/customers?limit=10&page=1" -H "Authorization: Bearer YOUR_API_KEY"`
                              : language === 'javascript'
                              ? `fetch('https://api.metabot.vn/${version}/customers?limit=10&page=1', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))`
                              : language === 'python'
                              ? `import requests

response = requests.get(
    f"https://api.metabot.vn/${version}/customers",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    params={"limit": 10, "page": 1}
)

data = response.json()
print(data)`
                              : `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.metabot.vn/${version}/customers?limit=10&page=1",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY"
    ],
]);

$response = curl_exec($curl);
$data = json_decode($response, true);
curl_close($curl);
?>`
                          )}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Tham số</h4>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Tham số</th>
                              <th className="text-left py-2">Mô tả</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2 font-mono">limit</td>
                              <td className="py-2">Số lượng khách hàng trả về (mặc định: 10)</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-mono">page</td>
                              <td className="py-2">Số trang (mặc định: 1)</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-mono">status</td>
                              <td className="py-2">Lọc theo trạng thái (active, inactive)</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-mono">tag</td>
                              <td className="py-2">Lọc theo thẻ</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 font-mono">search</td>
                              <td className="py-2">Tìm kiếm theo tên, email, số điện thoại</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Phản hồi</h4>
                        <div className="bg-muted p-4 rounded-md">
                          <pre className="text-sm overflow-x-auto">
{`{
  "data": [
    {
      "id": "cust_123456",
      "name": "Nguyễn Văn A",
      "email": "nguyenvana@example.com",
      "phone": "+84901234567",
      "status": "active",
      "tags": ["vip", "new-customer"],
      "created_at": "2023-05-15T10:30:00Z",
      "updated_at": "2023-06-10T14:45:00Z"
    },
    // ...
  ],
  "meta": {
    "total": 125,
    "page": 1,
    "limit": 10,
    "pages": 13
  }
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="get-customer">
                  <AccordionTrigger className="flex items-center">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">GET</Badge>
                      <span>Lấy thông tin khách hàng</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Lấy thông tin chi tiết của một khách hàng theo ID.
                      </p>
                      
                      <div className="bg-muted p-4 rounded-md relative">
                        <pre className="text-sm overflow-x-auto">
                          {language === 'curl' && `curl -X GET "https://api.metabot.vn/${version}/customers/cust_123456" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                          {language === 'javascript' && `fetch('https://api.metabot.vn/${version}/customers/cust_123456', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))`}
                          {language === 'python' && `import requests

response = requests.get(
    f"https://api.metabot.vn/${version}/customers/cust_123456",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)

data = response.json()
print(data)`}
                          {language === 'php' && `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.metabot.vn/${version}/customers/cust_123456",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY"
    ],
]);

$response = curl_exec($curl);
$data = json_decode($response, true);
curl_close($curl);
?>`}
                        </pre>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(
                            language === 'curl' 
                              ? `curl -X GET "https://api.metabot.vn/${version}/customers/cust_123456" -H "Authorization: Bearer YOUR_API_KEY"`
                              : language === 'javascript'
                              ? `fetch('https://api.metabot.vn/${version}/customers/cust_123456', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))`
                              : language === 'python'
                              ? `import requests

response = requests.get(
    f"https://api.metabot.vn/${version}/customers/cust_123456",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)

data = response.json()
print(data)`
                              : `<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.metabot.vn/${version}/customers/cust_123456",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY"
    ],
]);

$response = curl_exec($curl);
$data = json_decode($response, true);
curl_close($curl);
?>`
                          )}
                        >

Cập nhật sidebar để thêm liên kết đến trang quản lý API:

\
