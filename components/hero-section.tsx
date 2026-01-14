"use client"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  content: {
    title: string;
    highlight: string;
    slogan: string;
    description: string;
    backgroundImage: string;
    bookingUrl: string;
  };
}

// Thành phần giới thiệu chính (Hero Section)
export default function HeroSection({ content }: HeroSectionProps) {
  // Hàm xử lý khi người dùng nhấn nút "Đặt Lịch Ngay"
  const handleBooking = () => {
    // Mở liên kết Zalo trong tab mới
    window.open(content.bookingUrl || "https://zalo.me/0916821913", "_blank")
  }

  return (
    <section
      className="relative bg-cover bg-center text-white py-32 px-4 min-h-[600px] flex items-center justify-center"
      style={{
        // Hình nền của phần Hero
        backgroundImage: `url('${content.backgroundImage || '/luxury-spa-treatment-woman-beautiful-skin-wellness.jpg'}')`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Lớp phủ làm tối hình nền để văn bản dễ đọc hơn */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative max-w-6xl mx-auto text-center z-10">
        {/* Tiêu đề chính */}
        <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6 text-balance uppercase">
          {content.title.split(content.highlight)[0]}
          <span className="text-accent"> {content.highlight}</span>
          {content.title.split(content.highlight)[1]}
        </h1>
        {/* Khẩu hiệu (Slogan) */}
        <p className="text-2xl md:text-3xl text-white/95 mb-6 max-w-3xl mx-auto uppercase font-semibold">
          {content.slogan}
        </p>
        {/* Mô tả chi tiết */}
        <p className="text-lg text-white/85 mb-12 max-w-2xl mx-auto">
          {content.description}
        </p>
        
        {/* Nhóm các nút kêu gọi hành động (CTA Buttons) */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            size="lg"
            onClick={handleBooking}
            className="bg-accent text-primary hover:bg-accent/90 uppercase font-semibold"
          >
            Đặt Lịch Ngay
          </Button>
          <a href="#services">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20 bg-transparent uppercase font-semibold"
            >
              Khám Phá Dịch Vụ
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
