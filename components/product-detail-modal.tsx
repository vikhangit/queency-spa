"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ZALO_URL } from "@/lib/zalo-utils"

// Định nghĩa kiểu dữ liệu cho một sản phẩm (Product)
interface Product {
  id: string
  name: string
  image: string
  price: string
  description: string
  ingredients: string[]
  uses: string[]
  targetAudience: string[]
  usage: string
  contraindications: string
  storage: string
  manufacturer: string
  registrationNumber: string
}

// Định nghĩa các thuộc tính (props) cho component Modal chi tiết sản phẩm
interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

// Thành phần Modal hiển thị thông tin chi tiết đầy đủ về sản phẩm
export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  // Nếu không có sản phẩm nào được chọn, không render gì cả
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {/* Tiêu đề Modal là tên sản phẩm */}
          <DialogTitle className="text-2xl font-bold text-primary uppercase">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* Phần bên trái: Hình ảnh và giá */}
          <div className="flex flex-col gap-4">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="bg-accent/10 p-6 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">GIÁ</p>
              <p className="text-3xl font-bold text-primary">{product.price}</p>
            </div>
          </div>

          {/* Phần bên phải: Giới thiệu, mục đích, cách dùng, v.v. */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-lg text-primary mb-2 uppercase">GIỚI THIỆU</h4>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div>
              <h4 className="font-bold text-lg text-primary mb-3 uppercase">MỤC ĐÍCH SỬ DỤNG</h4>
              <ul className="space-y-2">
                {product.uses.map((use, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-muted-foreground">{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg text-primary mb-3 uppercase">ĐỐI TƯỢNG SỬ DỤNG</h4>
              <ul className="space-y-2">
                {product.targetAudience.map((audience, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-muted-foreground">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg text-primary mb-2 uppercase">CÁCH DÙNG</h4>
              <p className="text-muted-foreground">{product.usage}</p>
            </div>

            <div>
              <h4 className="font-bold text-lg text-primary mb-2 uppercase">CHỐNG CHỈ ĐỊNH</h4>
              <p className="text-muted-foreground">{product.contraindications}</p>
            </div>

            <div>
              <h4 className="font-bold text-lg text-primary mb-2 uppercase">BẢO QUẢN</h4>
              <p className="text-muted-foreground">{product.storage}</p>
            </div>
          </div>
        </div>

        {/* Phần chân Modal: Thành phần và thông tin nhà sản xuất */}
        <div className="grid md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-border">
          <div>
            <h4 className="font-bold text-lg text-primary mb-3 uppercase">THÀNH PHẦN CHÍNH</h4>
            <div className="space-y-2">
              {product.ingredients.map((ingredient, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  • {ingredient}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg text-primary mb-3 uppercase">THÔNG TIN SẢN PHẨM</h4>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-semibold text-primary">Nhà sản xuất:</span> {product.manufacturer}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Số công bố:</span> {product.registrationNumber}
            </p>
          </div>
        </div>

        {/* Các nút hành động */}
        <div className="flex gap-4 mt-8">
          <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
            <button className="w-full px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 transition font-bold uppercase">
              LIÊN HỆ ĐẶT HÀNG
            </button>
          </a>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded hover:bg-primary/5 transition font-bold uppercase"
          >
            ĐÓNG
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
