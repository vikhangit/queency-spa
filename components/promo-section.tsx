import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ZALO_URL } from "@/lib/zalo-utils"

interface PromoSectionProps {
  content: {
    title: string;
    highlight: string;
    subtitle: string;
    features: string[];
    price: string;
    currency: string;
    priceLabel: string;
  };
}

export default function PromoSection({ content }: PromoSectionProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-accent mb-6">
              <Sparkles size={20} />
              <span className="font-semibold uppercase">Khuyến Mãi Khai Trương</span>
            </div>
            <h3 className="text-4xl font-serif font-bold text-primary mb-6 uppercase">
              {content.title}
              <span className="block text-accent">{content.highlight}</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 uppercase font-semibold">
              {content.subtitle}
            </p>
            <ul className="space-y-4 mb-8">
              {content.features.map((feature, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-primary/90 uppercase font-semibold">
                Mua Combo Ngay
              </Button>
            </a>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl p-8 flex items-center justify-center min-h-96">
            <div className="text-center">
              <p className="text-6xl font-bold text-primary mb-4">{content.price}</p>
              <p className="text-2xl text-accent font-bold uppercase">{content.currency}</p>
              <p className="text-muted-foreground mt-4 uppercase">{content.priceLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
