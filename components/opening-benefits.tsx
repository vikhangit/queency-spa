import { CheckCircle, Users, Gift, Heart, LucideIcon } from "lucide-react"
import Image from "next/image"

const iconMap: Record<string, LucideIcon> = {
  CheckCircle,
  Users,
  Gift,
  Heart,
}

interface OpeningBenefitsProps {
  content: {
    title: string;
    subtitle: string;
    image: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export default function OpeningBenefits({ content }: OpeningBenefitsProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-serif font-bold text-center text-primary mb-4 uppercase">
          {content.title}
        </h3>
        <p className="text-center text-muted-foreground mb-12 uppercase font-semibold">
          {content.subtitle}
        </p>

        <div className="mb-12 text-center">
          <Image
            src={content.image || "/images/menu-20-c4-91-e1-bb-83-20b-c3-a0n-20queency-1.jpg"}
            alt="Ưu Đãi Khai Trương Queency Spa"
            width={1000}
            height={600}
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {content.items.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || CheckCircle
            return (
              <div key={i} className="p-6 bg-secondary rounded-lg text-center hover:shadow-lg transition">
                <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <h4 className="font-bold text-primary mb-2 uppercase">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
