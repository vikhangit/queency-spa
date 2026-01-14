import * as React from 'react'

// Điểm ngắt (breakpoint) để xác định thiết bị di động (768px)
const MOBILE_BREAKPOINT = 768

// Hook kiểm tra xem người dùng có đang truy cập bằng thiết bị di động hay không
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Sử dụng matchMedia để theo dõi sự thay đổi kích thước màn hình
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    // Thiết lập giá trị ban đầu
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    // Hủy đăng ký sự kiện khi component bị unmount
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
