import { Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactSectionProps {
  content: {
    title: string;
    phone: string;
    phoneSecondary: string;
    address: string;
    addressDetails: string;
    workingHours: string;
    workingHoursSecondary: string;
    zaloPrompt: string;
  };
}

// Thành phần hiển thị thông tin liên hệ và bản đồ
export default function ContactSection({ content }: ContactSectionProps) {
  const ZALO_URL = `https://zalo.me/${content.phone}`;

  return (
    <section id="contact" className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Cột trái: Các thông tin liên hệ chi tiết */}
          <div>
            <h3 className="text-4xl font-serif font-bold text-primary mb-8 uppercase">{content.title}</h3>
            <div className="space-y-6">
              {/* Thông tin số điện thoại và Zalo */}
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground uppercase">Điện Thoại</p>
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-primary font-bold hover:text-accent transition"
                  >
                    {content.phone}
                  </a>
                  <p className="text-muted-foreground">{content.phoneSecondary}</p>
                </div>
              </div>
              
              {/* Thông tin địa chỉ Spa */}
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground uppercase">Địa Chỉ</p>
                  <p className="text-foreground">{content.address}</p>
                  <p className="text-foreground">{content.addressDetails}</p>
                </div>
              </div>
              
              {/* Thông tin giờ mở cửa */}
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground uppercase">Giờ Làm Việc</p>
                  <p className="text-foreground">{content.workingHours}</p>
                  <p className="text-foreground">{content.workingHoursSecondary}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải: Thẻ kêu gọi hành động liên hệ nhanh qua Zalo */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center py-12">
              <p className="text-lg text-foreground mb-6 font-semibold uppercase">
                {content.zaloPrompt}
              </p>
              <a href={ZALO_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 uppercase font-semibold">
                  Chat Zalo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
