"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Định nghĩa kiểu dữ liệu cho thông tin chi tiết dịch vụ
interface ServiceDetail {
  id: string
  title: string
  price: string
  duration: string
  description: string
  benefits: string[]
  suitable_for: string
  process: string[]
  contraindications: string[]
}

// Định nghĩa props cho Modal chi tiết dịch vụ
interface ServiceDetailModalProps {
  service: ServiceDetail | null
  isOpen: boolean
  onClose: () => void
}

// Thành phần Modal hiển thị chi tiết dịch vụ
export default function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
  if (!isOpen || !service) return null

  // Hàm xử lý đặt lịch qua Zalo
  const handleBooking = () => {
    window.open("https://zalo.me/0916821913", "_blank")
  }

  const detail = service

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Thanh tiêu đề Modal */}
        <div className="sticky top-0 bg-primary text-white p-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold uppercase">{detail.title}</h2>
          <button onClick={onClose} className="hover:bg-primary/80 p-2 rounded transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Giá và Thời lượng */}
          <div className="grid md:grid-cols-2 gap-6 pb-6 border-b">
            <div>
              <p className="text-muted-foreground text-sm uppercase mb-2">Giá dịch vụ</p>
              <p className="text-3xl font-bold text-primary">{detail.price}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm uppercase mb-2">Thời lượng</p>
              <p className="text-3xl font-bold text-accent">{detail.duration}</p>
            </div>
          </div>

          {/* Mô tả dịch vụ */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-3 uppercase">Mô Tả Dịch Vụ</h3>
            <p className="text-muted-foreground leading-relaxed">{detail.description}</p>
          </div>

          {/* Lợi ích chính */}
          {detail.benefits && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase">Lợi Ích Chính</h3>
              <ul className="space-y-2">
                {detail.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Đối tượng phù hợp */}
          {detail.suitable_for && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase">Phù Hợp Cho</h3>
              <p className="text-muted-foreground bg-secondary/50 p-4 rounded">{detail.suitable_for}</p>
            </div>
          )}

          {/* Quy trình thực hiện */}
          {detail.process && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase">Quy Trình Thực Hiện</h3>
              <ol className="space-y-2">
                {detail.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary font-bold bg-accent/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Chống chỉ định */}
          {detail.contraindications && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase">Chống Chỉ Định</h3>
              <ul className="space-y-2 bg-red-50 border border-red-200 p-4 rounded">
                {detail.contraindications.map((contra, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">⚠</span>
                    <span className="text-red-700">{contra}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Các nút hành động cuối trang */}
          <div className="flex gap-4 pt-6 border-t">
            <Button
              size="lg"
              onClick={handleBooking}
              className="bg-accent text-primary hover:bg-accent/90 uppercase flex-1 font-semibold"
            >
              Đặt Lịch Ngay
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onClose}
              className="flex-1 uppercase font-semibold bg-transparent"
            >
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
