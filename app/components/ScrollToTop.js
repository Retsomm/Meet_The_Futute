'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // 頁面跳轉後滾動到頂端
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
