"use client"
import { X } from "lucide-react"

// Định nghĩa kiểu dữ liệu cho props của component Modal chi tiết dịch vụ
interface ServiceDetailModalProps {
  service: {
    title: string
    brand: string
    subtitle: string
    description: string
    details: {
      fullDescription: string
      ingredients: string[]
      benefits: string[]
      usage: string
      targetAudience: string[]
      contraindications: string
      storage: string
    }
  }
  isOpen: boolean
  onClose: () => void
}

// Thành phần Modal hiển thị chi tiết về dịch vụ cụ thể
export default function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
  // Hàm xử lý đặt lịch hẹn qua Zalo
  const handleBooking = () => {
    window.open("https://zalo.me/0916821913", "_blank")
  }

  // Nếu Modal không được mở, không render gì cả
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Thanh tiêu đề Modal */}
        <div className="sticky top-0 bg-primary p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white uppercase">
            {service.title} <span className="text-accent">{service.brand}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-primary/80 p-2 rounded transition"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Phần giới thiệu chi tiết */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4 uppercase">GIỚI THIỆU</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{service.details.fullDescription}</p>
          </div>

          {/* Danh sách lợi ích chính */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4 uppercase">LỢI ÍCH CHÍ YẾU</h3>
            <ul className="space-y-3">
              {service.details.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-accent text-2xl font-bold">✓</span>
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Các thành phần chính của dịch vụ/sản phẩm */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4 uppercase">THÀNH PHẦN CHÍNH</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.details.ingredients.map((ingredient, i) => (
                <div key={i} className="bg-secondary p-4 rounded border border-primary/20">
                  <p className="text-gray-700 font-medium">{ingredient}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Đối tượng khách hàng phù hợp */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4 uppercase">ĐỐI TƯỢNG SỬ DỤNG</h3>
            <ul className="space-y-3">
              {service.details.targetAudience.map((audience, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-accent text-xl">•</span>
                  <span className="text-gray-700 text-lg">{audience}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cách dùng và Bảo quản */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4 uppercase">CÁCH DÙNG</h3>
              <p className="text-gray-700 leading-relaxed">{service.details.usage}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-4 uppercase">BẢO QUẢN</h3>
              <p className="text-gray-700 leading-relaxed">{service.details.storage}</p>
            </div>
          </div>

          {/* Các chống chỉ định (cảnh báo) */}
          <div className="bg-red-50 border border-red-200 rounded p-6">
            <h3 className="text-xl font-bold text-red-700 mb-3 uppercase">CHỐNG CHỈ ĐỊNH</h3>
            <p className="text-red-700 text-lg">{service.details.contraindications}</p>
          </div>

          {/* Nút hành động cuối Modal */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleBooking}
              className="px-8 py-3 bg-accent text-primary rounded font-bold uppercase hover:bg-accent/90 transition"
            >
              ĐẶT LỊCH HÔM NAY
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 border-2 border-primary text-primary rounded font-bold uppercase hover:bg-primary/10 transition"
            >
              ĐÓNG
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
