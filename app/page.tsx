import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import FeaturedServiceBanner from "@/components/featured-service-banner"
import ServicesSection from "@/components/services-section"
import ProductsSection from "@/components/products-section"
import PromoSection from "@/components/promo-section"
import PricingSection from "@/components/pricing-section"
import OpeningBenefits from "@/components/opening-benefits"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { getContent } from "@/lib/db"

// Trang chủ của website
export default async function Home() {
  const content = await getContent()

  return (
    <main className="min-h-screen bg-secondary">
      {/* Thanh điều hướng đầu trang */}
      <Header content={content.header} />
      {/* Phần giới thiệu chính (Hero) */}
      <HeroSection content={content.hero} />
      {/* Phần giới thiệu các đặc điểm nổi bật */}
      <FeaturesSection content={content.features} />
      {/* Banner dịch vụ tiêu biểu */}
      <FeaturedServiceBanner content={content.featuredService} />
      {/* Danh sách các dịch vụ tại Spa */}
      <ServicesSection content={content.services} />
      {/* Danh sách các sản phẩm đang kinh doanh */}
      <ProductsSection content={content.products} />
      {/* Phần khuyến mãi hấp dẫn */}
      <PromoSection content={content.promo} />
      {/* Bảng giá dịch vụ */}
      <PricingSection content={content.pricing} />
      {/* Lợi ích khi đến với Queency Spa */}
      <OpeningBenefits content={content.benefits} />
      {/* Thông tin liên hệ và bản đồ */}
      <ContactSection content={content.contact} />
      {/* Chân trang với các liên kết và thông tin bản quyền */}
      <Footer content={content.footer} />
    </main>
  )
}
