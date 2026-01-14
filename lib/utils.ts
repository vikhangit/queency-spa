import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Hàm tiện ích để kết hợp các class CSS (Tailwind) một cách tối ưu
// Giúp xử lý các class có điều kiện và gộp các class Tailwind bị trùng lặp
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
