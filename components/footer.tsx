import { Heart } from "lucide-react"
import Image from "next/image"

interface FooterProps {
  content: {
    description: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      tiktok: string;
    };
    copyright: string;
  };
}

// Thành phần chân trang (Footer)
export default function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Cột 1: Thông tin chung về Spa */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo-20queency.jpg"
                alt="Queency Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <h4 className="font-bold uppercase">Queency Spa</h4>
            </div>
            <p className="text-sm text-white/80">{content.description}</p>
          </div>

          {/* Cột 2: Danh mục dịch vụ */}
          <div>
            <h4 className="font-bold mb-4 uppercase">Dịch Vụ</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#" className="hover:text-white transition">
                  Thải Độc
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Se Khít
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Nâng Cơ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Chăm Sóc Da
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Thông tin chính sách và hỗ trợ */}
          <div>
            <h4 className="font-bold mb-4 uppercase">Thông Tin</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#" className="hover:text-white transition">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Chính Sách
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Điều Khoản
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên kết mạng xã hội */}
          <div>
            <h4 className="font-bold mb-4 uppercase">Liên Kết</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/80 hover:text-accent transition uppercase text-sm">
                Facebook
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition uppercase text-sm">
                Instagram
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition uppercase text-sm">
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Phần bản quyền và thiết kế */}
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/80">
          <p className="flex items-center justify-center gap-2 mb-2">
            Made with <Heart size={16} className="text-accent" /> for beauty & wellness
          </p>
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
