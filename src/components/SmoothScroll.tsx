import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { cancelFrame, frame } from 'motion'

type Props = {
  children: ReactNode
}

/**
 * Root Lenis smooth scroll, RAF-synced with Motion.
 * Navbar handles lenis.scrollTo with −80px offset for the fixed nav.
 */
export function SmoothScroll({ children }: Props) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }
    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        touchMultiplier: 1.5,
        lerp: 0.1,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
