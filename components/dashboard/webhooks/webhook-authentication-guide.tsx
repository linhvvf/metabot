"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Code, FileJson, Server } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WebhookAuthenticationGuideProps {
  webhookSecret: string
}

export default function WebhookAuthenticationGuide({ webhookSecret }: WebhookAuthenticationGuideProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCopyCode = (code: string, language: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(language)
    toast({
      title: "Đã sao chép",
      description: `Mã ${language} đã được sao chép vào clipboard`,
    })
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const nodeJsCode = `
const crypto = require('crypto');

// Hàm xác thực chữ ký webhook
function verifyWebhookSignature(payload, signature, timestamp, secret) {
  // Tạo chuỗi để ký
  const signedPayload = \`\${timestamp}.\${payload}\`;
  
  // Tạo HMAC với SHA-256
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(signedPayload, 'utf8');
  const expectedSignature = hmac.digest('hex');
  
  // Trích xuất chữ ký từ header
  const providedSignature = signature.startsWith('sha256=') 
    ? signature.substring(7) 
    : signature;
  
  // So sánh chữ ký
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(providedSignature)
  );
}

// Middleware Express để xác thực webhook
function webhookAuthMiddleware(req, res, next) {
  const payload = JSON.stringify(req.body);
  const signature = req.headers['x-metabot-signature'];
  const timestamp = req.headers['x-metabot-timestamp'];
  const secret = '${webhookSecret}'; // Khóa bí mật của bạn
  
  // Kiểm tra các header cần thiết
  if (!signature || !timestamp) {
    return res.status(401).json({ error: 'Thiếu header xác thực' });
  }
  
  // Xác thực timestamp (ngăn chặn tấn công replay)
  const currentTime = Math.floor(Date.now() / 1000);
  const webhookTime = parseInt(timestamp, 10);
  if (Math.abs(currentTime - webhookTime) > 300) { // 5 phút
    return res.status(401).json({ error: 'Timestamp không hợp lệ hoặc đã hết hạn' });
  }
  
  try {
    // Xác thực chữ ký
    const isValid = verifyWebhookSignature(payload, signature, timestamp, secret);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Chữ ký không hợp lệ' });
    }
    
    // Chữ ký hợp lệ, tiếp tục xử lý
    next();
  } catch (error) {
    console.error('Lỗi xác thực webhook:', error);
    return res.status(500).json({ error: 'Lỗi xác thực webhook' });
  }
}

// Sử dụng middleware trong Express
app.post('/webhook', 
  express.json({ verify: (req, res, buf) => { req.rawBody = buf } }),
  webhookAuthMiddleware,
  (req, res) => {
    // Xử lý webhook
    console.log('Webhook đã được xác thực:', req.body);
    res.status(200).send('OK');
  }
);
`

  const phpCode = `
<?php
// Hàm xác thực chữ ký webhook
function verifyWebhookSignature($payload, $signature, $timestamp, $secret) {
    // Tạo chuỗi để ký
    $signedPayload = $timestamp . '.' . $payload;
    
    // Tạo HMAC với SHA-256
    $expectedSignature = hash_hmac('sha256', $signedPayload, $secret);
    
    // Trích xuất chữ ký từ header
    $providedSignature = str_starts_with($signature, 'sha256=') 
        ? substr($signature, 7) 
        : $signature;
    
    // So sánh chữ ký (sử dụng hash_equals để ngăn chặn timing attacks)
    return hash_equals($expectedSignature, $providedSignature);
}

// Xử lý webhook
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_METABOT_SIGNATURE'] ?? '';
$timestamp = $_SERVER['HTTP_X_METABOT_TIMESTAMP'] ?? '';
$secret = '${webhookSecret}'; // Khóa bí mật của bạn

// Kiểm tra các header cần thiết
if (empty($signature) || empty($timestamp)) {
    http_response_code(401);
    echo json_encode(['error' => 'Thiếu header xác thực']);
    exit;
}

// Xác thực timestamp (ngăn chặn tấn công replay)
$currentTime = time();
$webhookTime = (int) $timestamp;
if (abs($currentTime - $webhookTime) > 300) { // 5 phút
    http_response_code(401);
    echo json_encode(['error' => 'Timestamp không hợp lệ hoặc đã hết hạn']);
    exit;
}

try {
    // Xác thực chữ ký
    $isValid = verifyWebhookSignature($payload, $signature, $timestamp, $secret);
    
    if (!$isValid) {
        http_response_code(401);
        echo json_encode(['error' => 'Chữ ký không hợp lệ']);
        exit;
    }
    
    // Chữ ký hợp lệ, tiếp tục xử lý
    $data = json_decode($payload, true);
    
    // Xử lý dữ liệu webhook
    // ...
    
    http_response_code(200);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi xác thực webhook: ' . $e->getMessage()]);
}
`

  const pythonCode = `
import hmac
import hashlib
import time
from flask import Flask, request, jsonify

app = Flask(__name__)

# Hàm xác thực chữ ký webhook
def verify_webhook_signature(payload, signature, timestamp, secret):
    # Tạo chuỗi để ký
    signed_payload = f"{timestamp}.{payload}"
    
    # Tạo HMAC với SHA-256
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        signed_payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    # Trích xuất chữ ký từ header
    provided_signature = signature[7:] if signature.startswith('sha256=') else signature
    
    # So sánh chữ ký (sử dụng hmac.compare_digest để ngăn chặn timing attacks)
    return hmac.compare_digest(expected_signature, provided_signature)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    payload = request.data.decode('utf-8')
    signature = request.headers.get('X-Metabot-Signature', '')
    timestamp = request.headers.get('X-Metabot-Timestamp', '')
    secret = '${webhookSecret}'  # Khóa bí mật của bạn
    
    # Kiểm tra các header cần thiết
    if not signature or not timestamp:
        return jsonify({'error': 'Thiếu header xác thực'}), 401
    
    # Xác thực timestamp (ngăn chặn tấn công replay)
    current_time = int(time.time())
    webhook_time = int(timestamp)
    if abs(current_time - webhook_time) > 300:  # 5 phút
        return jsonify({'error': 'Timestamp không hợp lệ hoặc đã hết hạn'}), 401
    
    try:
        # Xác thực chữ ký
        is_valid = verify_webhook_signature(payload, signature, timestamp, secret)
        
        if not is_valid:
            return jsonify({'error': 'Chữ ký không hợp lệ'}), 401
        
        # Chữ ký hợp lệ, tiếp tục xử lý
        data = request.json
        
        # Xử lý dữ liệu webhook
        # ...
        
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': f'Lỗi xác thực webhook: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Hướng dẫn xác thực Webhook
        </CardTitle>
        <CardDescription>
          Sử dụng mã mẫu dưới đây để xác thực webhook từ Metabot.vn trong ứng dụng của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nodejs" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="nodejs">Node.js</TabsTrigger>
            <TabsTrigger value="php">PHP</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>

          <TabsContent value="nodejs" className="space-y-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono">
                <code>{nodeJsCode}</code>
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopyCode(nodeJsCode, "nodejs")}
              >
                {copiedCode === "nodejs" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copiedCode === "nodejs" ? "Đã sao chép" : "Sao chép"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="php" className="space-y-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono">
                <code>{phpCode}</code>
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopyCode(phpCode, "php")}
              >
                {copiedCode === "php" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copiedCode === "php" ? "Đã sao chép" : "Sao chép"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="python" className="space-y-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono">
                <code>{pythonCode}</code>
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopyCode(pythonCode, "python")}
              >
                {copiedCode === "python" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copiedCode === "python" ? "Đã sao chép" : "Sao chép"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Cách thức hoạt động</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Server className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">1. Metabot.vn gửi webhook</h4>
                <p className="text-sm text-muted-foreground">
                  Khi một sự kiện xảy ra, Metabot.vn gửi một HTTP POST request đến URL webhook của bạn với payload JSON
                  và các header xác thực.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileJson className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">2. Kiểm tra header</h4>
                <p className="text-sm text-muted-foreground">
                  Mỗi webhook bao gồm hai header quan trọng: <code>X-Metabot-Signature</code> (chữ ký) và{" "}
                  <code>X-Metabot-Timestamp</code> (thời gian).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Code className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">3. Xác thực chữ ký</h4>
                <p className="text-sm text-muted-foreground">
                  Sử dụng khóa bí mật của bạn, tạo một chữ ký HMAC-SHA256 từ timestamp và payload, sau đó so sánh với
                  chữ ký được gửi đến.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
