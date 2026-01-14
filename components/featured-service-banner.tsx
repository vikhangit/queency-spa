"use client"
import { useState } from "react"
import ServiceDetailModal from "./service-detail-modal"

interface FeaturedServiceBannerProps {
  content: {
    title: string;
    brand: string;
    subtitle: string;
    description: string;
    bannerImage: string;
    details: any;
  };
}

export default function FeaturedServiceBanner({ content }: FeaturedServiceBannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBooking = () => {
    window.open("https://zalo.me/0916821913", "_blank")
  }

  const featuredService = content;

  return (
    <>
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-serif font-bold mb-2 uppercase text-white">
              <span>{featuredService.title}</span>
              <span className="text-accent ml-4">{featuredService.brand}</span>
            </h2>
            <p className="text-xl text-white/90 mb-6 uppercase tracking-wide font-semibold">
              {featuredService.subtitle}
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">{featuredService.description}</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleBooking}
                className="px-10 py-4 bg-accent text-primary rounded font-bold uppercase text-lg hover:bg-accent/90 transition"
              >
                ĐẶT LỊCH NGAY
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-4 border-2 border-accent text-accent rounded font-bold uppercase text-lg hover:bg-accent/10 transition"
              >
                XEM DỊCH VỤ
              </button>
            </div>
          </div>
        </div>
      </section>

      <ServiceDetailModal service={featuredService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
