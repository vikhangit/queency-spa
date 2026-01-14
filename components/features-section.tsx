import { CheckCircle2 } from "lucide-react"

interface FeaturesSectionProps {
  content: Array<{
    title: string;
    description: string;
  }>;
}

// Thành phần hiển thị các cam kết dịch vụ
export default function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Tiêu đề của phần cam kết */}
        <h3 className="text-4xl font-serif font-bold text-center text-primary mb-16 uppercase">Cam Kết Dịch Vụ</h3>
        
        {/* Lưới hiển thị các thẻ đặc điểm */}
        <div className="grid md:grid-cols-2 gap-8">
          {content.map((feature, i) => (
            <div key={i} className="flex gap-4 p-6 bg-secondary rounded-lg hover:shadow-lg transition">
              {/* Biểu tượng dấu tích xanh */}
              <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                {/* Tiêu đề và mô tả của từng đặc điểm */}
                <h4 className="font-bold text-lg text-primary mb-2 uppercase">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
