import { useEffect, useState } from 'react'

/**
 * Desktop unlock aligns with Tailwind `lg` (min-width: 1024px).
 * Mobile = below 1024 so JS layout matches `lg:` utilities.
 */
export const MOBILE_MAX = 1023

export function useIsMobile(maxWidth = MOBILE_MAX) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth <= maxWidth
  })

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [maxWidth])

  return isMobile
}
