"use client"
import { useState } from "react"
import { Sparkles, Zap, Leaf, Wind, LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ServiceDetailModal from "./services-detail-modal"

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Zap,
  Leaf,
  Wind,
}

interface ServicesSectionProps {
  content: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
    price: string;
    duration: string;
  }>;
}

// Thành phần hiển thị danh sách các dịch vụ
export default function ServicesSection({ content }: ServicesSectionProps) {
  // Trạng thái lưu trữ dịch vụ đang được chọn để xem chi tiết
  const [selectedService, setSelectedService] = useState(null)
  // Trạng thái đóng/mở cửa sổ (modal) chi tiết dịch vụ
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Hàm xử lý khi người dùng nhấn xem chi tiết một dịch vụ
  const handleViewDetails = (service: any) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  return (
    <>
      <section id="services" className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          {/* Tiêu đề phần dịch vụ */}
          <h3 className="text-4xl font-serif font-bold text-center text-primary mb-4 uppercase">Dịch Vụ Nổi Bật</h3>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Các liệu trình được thiết kế riêng để mang lại kết quả tốt nhất cho bạn
          </p>
          
          {/* Lưới hiển thị các thẻ dịch vụ */}
          <div className="grid md:grid-cols-2 gap-6">
            {content.map((service) => {
              const Icon = iconMap[service.icon] || Sparkles
              return (
                <Card key={service.id} className="p-8 hover:shadow-xl transition border-0 bg-white">
                  {/* Biểu tượng đại diện cho dịch vụ */}
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h4 className="text-xl font-bold text-primary mb-3 uppercase">{service.title}</h4>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  {/* Phần chân thẻ hiển thị giá và thời gian */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div>
                      <p className="text-2xl font-bold text-primary">{service.price}</p>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    {/* Nút xem chi tiết */}
                    <Button
                      onClick={() => handleViewDetails(service)}
                      className="px-6 py-2 bg-accent text-primary rounded hover:bg-accent/90 transition font-medium uppercase text-sm"
                    >
                      Chi Tiết
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cửa sổ hiển thị chi tiết khi được chọn */}
      <ServiceDetailModal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
