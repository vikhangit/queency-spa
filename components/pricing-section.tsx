import { Card } from "@/components/ui/card"
import Image from "next/image"

interface PricingSectionProps {
  content: Array<{
    category: string;
    items: Array<{
      name: string;
      price: string;
      duration: string;
    }>;
  }>;
}

// Thành phần hiển thị bảng giá dịch vụ
export default function PricingSection({ content }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Tiêu đề chính của phần bảng giá */}
        <h3 className="text-4xl font-serif font-bold text-center text-primary mb-4 uppercase">Bảng Giá Dịch Vụ</h3>
        
        {/* Hình ảnh banner hoặc menu bảng giá */}
        <div className="mb-12 text-center">
          <Image
            src="/images/menu-20-c4-91-e1-bb-83-20b-c3-a0n-20queency-2.jpg"
            alt="Bảng Giá Dịch Vụ Queency Spa"
            width={1000}
            height={600}
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Lưới hiển thị các thẻ danh mục giá */}
        <div className="grid md:grid-cols-3 gap-8">
          {content.map((category, i) => (
            <Card key={i} className="p-8 bg-white border-0 hover:shadow-lg transition">
              {/* Tên danh mục dịch vụ */}
              <h4 className="text-2xl font-bold text-primary mb-6 border-b-2 border-accent pb-4 uppercase">
                {category.category}
              </h4>
              <div className="space-y-4">
                {/* Danh sách các dịch vụ trong danh mục */}
                {category.items.map((item, j) => (
                  <div key={j} className="pb-4 border-b border-border last:border-b-0">
                    <p className="font-semibold text-foreground mb-2">{item.name}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-accent font-bold">{item.price}</span>
                      <span className="text-sm text-muted-foreground">{item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
