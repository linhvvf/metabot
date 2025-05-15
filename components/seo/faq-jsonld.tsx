import Script from "next/script"

export default function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Làm thế nào để kết nối Metabot.vn với Zalo OA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Để kết nối Metabot.vn với Zalo OA, bạn cần truy cập vào phần Cài đặt > Kết nối kênh chat > Zalo và làm theo hướng dẫn. Bạn sẽ cần cung cấp thông tin xác thực từ tài khoản Zalo OA của bạn.",
        },
      },
      {
        "@type": "Question",
        name: "Làm thế nào để tạo chiến dịch marketing mới?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Để tạo chiến dịch marketing mới, bạn cần truy cập vào mục Chiến dịch từ sidebar, sau đó nhấp vào nút 'Tạo chiến dịch mới'. Điền thông tin chiến dịch, chọn đối tượng khách hàng, soạn nội dung tin nhắn và lên lịch gửi.",
        },
      },
      {
        "@type": "Question",
        name: "Làm thế nào để sử dụng tính năng AI gợi ý trả lời?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Để sử dụng tính năng AI gợi ý trả lời, khi bạn đang xem một hội thoại, bạn sẽ thấy nút 'Gợi ý trả lời' bên cạnh ô nhập tin nhắn. Nhấp vào nút này, AI sẽ phân tích nội dung hội thoại và đưa ra các gợi ý trả lời phù hợp.",
        },
      },
      {
        "@type": "Question",
        name: "Làm thế nào để xuất báo cáo hiệu quả chiến dịch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Để xuất báo cáo hiệu quả chiến dịch, truy cập vào mục Hiệu quả chiến dịch từ sidebar, chọn chiến dịch cần xuất báo cáo, sau đó nhấp vào nút 'Xuất báo cáo' ở góc trên bên phải. Chọn định dạng xuất (PDF, Excel hoặc CSV) và tùy chỉnh các tùy chọn báo cáo theo nhu cầu.",
        },
      },
      {
        "@type": "Question",
        name: "Làm thế nào để phân quyền cho nhân viên?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Để phân quyền cho nhân viên, truy cập vào mục Nhân viên từ sidebar, chọn nhân viên cần phân quyền, sau đó nhấp vào nút 'Chỉnh sửa' hoặc biểu tượng ba chấm để mở menu tùy chọn. Chọn 'Phân quyền' và thiết lập các quyền phù hợp cho nhân viên đó.",
        },
      },
    ],
  }

  return (
    <Script id="faq-jsonld" type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
