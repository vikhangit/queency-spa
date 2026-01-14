"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ZALO_URL } from "@/lib/zalo-utils"

interface HeaderProps {
  content: {
    logo: string;
    name: string;
    slogan: string;
  };
}

// Thành phần thanh điều hướng (Header)
export default function Header({ content }: HeaderProps) {
  // Trạng thái đóng/mở menu trên thiết bị di động
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo và tên Spa */}
        <div className="flex items-center gap-3">
          <Image
            src={content.logo || "/images/logo-20queency.jpg"}
            alt={`${content.name} Logo`}
            width={60}
            height={60}
            className="w-14 h-14 object-contain"
          />
          <div>
            <h1 className="font-serif text-lg font-bold text-primary uppercase">{content.name}</h1>
            <p className="text-xs text-muted-foreground uppercase">{content.slogan}</p>
          </div>
        </div>

        {/* Menu điều hướng cho màn hình máy tính (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-foreground hover:text-accent transition uppercase text-sm font-semibold">
            Dịch Vụ
          </a>
          <a href="#pricing" className="text-foreground hover:text-accent transition uppercase text-sm font-semibold">
            Bảng Giá
          </a>
          <a href="#contact" className="text-foreground hover:text-accent transition uppercase text-sm font-semibold">
            Liên Hệ
          </a>
          {/* Nút đặt lịch liên kết đến Zalo */}
          <a href={ZALO_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary hover:bg-primary/90 uppercase font-semibold">Đặt Lịch</Button>
          </a>
        </nav>

        {/* Nút chuyển đổi menu trên di động */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu hiển thị trên di động khi được mở */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t p-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a href="#services" className="text-foreground hover:text-accent uppercase font-semibold">
                Dịch Vụ
              </a>
              <a href="#pricing" className="text-foreground hover:text-accent uppercase font-semibold">
                Bảng Giá
              </a>
              <a href="#contact" className="text-foreground hover:text-accent uppercase font-semibold">
                Liên Hệ
              </a>
              <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 uppercase font-semibold">Đặt Lịch</Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
