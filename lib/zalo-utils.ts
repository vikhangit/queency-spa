// Tiện ích liên kết liên hệ qua Zalo
// Số điện thoại Zalo chính thức của Spa
export const ZALO_PHONE = "0916821913"
// Đường dẫn (URL) để mở chat Zalo trực tiếp
export const ZALO_URL = `https://zalo.me/${ZALO_PHONE}`

// Hàm lấy đường dẫn Zalo
export function getZaloLink(): string {
  return ZALO_URL
}
