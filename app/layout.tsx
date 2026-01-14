import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Cấu hình font chữ từ Google Fonts với hỗ trợ tiếng Việt
const inter = Inter({ 
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({ 
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
})

// Cấu hình Metadata cho website (SEO, Tiêu đề, Mô tả)
export const metadata: Metadata = {
  title: "Queency Spa - Gel bôi phụ khoa",
  description:
    "Queency Spa - Spa trị liệu kết hợp công nghệ cao cấp. Dịch vụ thải độc, se khít, nâng cơ với liệu trình hiệu quả tại Cầu Kiệu.",
  generator: "v0.app",
}

// Thành phần Layout gốc của ứng dụng
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-secondary`}>
        {/* Nội dung của các trang con sẽ được render ở đây */}
        {children}
        {/* Tích hợp Vercel Analytics để theo dõi lượt truy cập */}
        <Analytics />
      </body>
    </html>
  )
}
