"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import ProductDetailModal from "./product-detail-modal"

interface ProductsSectionProps {
  content: Array<any>;
}

// Thành phần hiển thị danh sách sản phẩm
export default function ProductsSection({ content }: ProductsSectionProps) {
  // Trạng thái lưu trữ sản phẩm đang được chọn
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  // Trạng thái đóng/mở cửa sổ chi tiết sản phẩm
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Hàm xử lý khi nhấn xem chi tiết sản phẩm
  const handleViewDetails = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <>
      <section id="products" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Tiêu đề phần sản phẩm */}
          <h3 className="text-4xl font-serif font-bold text-center text-primary mb-4 uppercase">SẢN PHẨM CHĂM SÓC</h3>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Các sản phẩm chăm sóc sức khỏe phụ nữ được phát triển từ công thức tự nhiên 100% và được công bố đăng ký
            chính thức
          </p>

          <div className="grid md:grid-cols-1 gap-6">
            {content.map((product) => (
              <Card key={product.id} className="p-8 hover:shadow-xl transition border-0 bg-secondary">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Hình ảnh sản phẩm */}
                  <div className="flex justify-center md:justify-start">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-64 w-auto object-contain"
                    />
                  </div>

                  {/* Thông tin tóm tắt sản phẩm */}
                  <div className="md:col-span-2">
                    <h4 className="text-2xl font-bold text-primary mb-3 uppercase">{product.name}</h4>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div>
                        <p className="text-2xl font-bold text-primary">{product.price}</p>
                        <p className="text-sm text-muted-foreground">Hộp 3 chai x 20g</p>
                      </div>
                      {/* Nút mở xem chi tiết */}
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="px-8 py-3 bg-accent text-primary rounded hover:bg-accent/90 transition font-bold uppercase text-sm"
                      >
                        Xem Chi Tiết
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cửa sổ hiển thị thông tin chi tiết đầy đủ của sản phẩm */}
      <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
