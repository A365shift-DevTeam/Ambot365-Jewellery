import { useEffect, useRef, useState, type ReactNode } from 'react'
import { FRAME_COUNT, framePath, progressToFrame } from '../lib/frames'
import { useIsMobile } from '../hooks/useIsMobile'

const PRELOAD_CONCURRENCY = 8

type Props = {
  /** Rendered inside sticky hero on mobile (e.g. Story compact) */
  mobileContent?: ReactNode
}

function DefaultMobileStory() {
  return (
    <div id="story" className="flex-1 flex flex-col justify-between p-4 sm:p-5 text-[#f7f3e9] bg-[#0a0907] border-t border-[#d4af37]/20">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="label text-[#e7c960] font-semibold">
            Showroom & Credentials
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d4af37]/15 px-2.5 py-0.5 font-mono text-[9px] text-[#e7c960] font-medium border border-[#d4af37]/35">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e7c960] animate-pulse" />
            Live Rates
          </span>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            Meet <span className="font-display font-extrabold gold-gradient-text tracking-wide">Ambot365</span>
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#aca6a2] border-l-2 border-[#d4af37] pl-3 mt-1.5 font-normal leading-relaxed">
            True mastery isn&apos;t just about executing a flawless design. It&apos;s about building trust that lasts generations.
          </p>
        </div>

        {/* Master Atelier Profile Card */}
        <div className="surface-card flex items-center gap-3 p-3">
          <img
            src="/ambot-logo.png"
            alt="Ambot365"
            className="h-10 w-10 object-contain rounded-xl bg-[#0a0907] p-1.5 border border-[#d4af37]/40 shrink-0"
          />
          <div>
            <p className="label text-[#e7c960] text-[9px] font-semibold">Master Atelier</p>
            <h3 className="font-display text-base font-bold text-white leading-tight tracking-tight">Ambot365 Jewellery</h3>
            <p className="body-fluid text-[11px] text-[#aca6a2]">Certified Gold & Diamond Heritage</p>
          </div>
        </div>

        {/* Credentials List */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5 rounded-xl border border-[#d4af37]/20 bg-[#181510] px-3 py-2 text-xs font-body font-medium text-[#e9e9e7]">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/15 text-[#e7c960] font-mono text-[9px] font-bold">✓</span>
            <span>BIS Hallmarked 22K & 18K Certified Pure Gold.</span>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-[#d4af37]/20 bg-[#181510] px-3 py-2 text-xs font-body font-medium text-[#e9e9e7]">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/15 text-[#e7c960] font-mono text-[9px] font-bold">✓</span>
            <span>Specialized in Bridal Heritage & Diamond Solitaires.</span>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-[#d4af37]/20 bg-[#181510] px-3 py-2 text-xs font-body font-medium text-[#e9e9e7]">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/15 text-[#e7c960] font-mono text-[9px] font-bold">✓</span>
            <span>Private Showroom Viewing & Custom Artisanal Atelier.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-1">
          <a
            href="#calculator"
            className="btn-gold tap-lg flex-1 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-center font-body text-xs font-bold shadow-md"
          >
            Gold Calculator
          </a>
          <a
            href="#demo"
            className="btn-gold-outline tap-lg flex-1 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-center font-body text-xs font-bold"
          >
            Book Private Visit
          </a>
        </div>

        {/* Live Rates Ticker Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#181510] p-2 text-center">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#e7c960] font-bold">22K Gold</span>
            <span className="font-display text-xs font-bold text-white mt-0.5">₹7,285 /g</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#181510] p-2 text-center">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#e7c960] font-bold">24K Pure</span>
            <span className="font-display text-xs font-bold text-white mt-0.5">₹7,940 /g</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#008134]/40 bg-[#008134]/15 p-2 text-center">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#e7c960] font-bold">Buyback</span>
            <span className="font-display text-xs font-bold text-[#e7c960] mt-0.5">100% Value</span>
          </div>
        </div>

        {/* Transparent Pricing & Trust Note Card */}
        <div className="surface-card flex items-center gap-2.5 p-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d4af37]/20 text-[#e7c960] font-bold text-xs">
            ★
          </div>
          <div>
            <p className="font-body text-[11px] font-semibold text-white leading-snug">
              4.9/5 Rating (500+ Verified Customers)
            </p>
            <p className="font-body text-[10px] text-[#aca6a2]">
              Transparent billing • Zero hidden charges • BIS 916 Stamped
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2.5 font-mono text-[10px] uppercase tracking-widest text-[#aca6a2] border-t border-[#d4af37]/20 mt-2">
        <svg className="h-3.5 w-3.5 animate-bounce text-[#e7c960]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span>Scroll to scrub showroom frames</span>
      </div>
    </div>
  )
}

/**
 * Scroll-driven frame sequence hero.
 * Mobile (≤1024): sticky top-0 canvas frame plate floating under transparent navbar.
 * Desktop: full 100dvh cover, separate story below.
 */
export function ProductPackScroll({ mobileContent }: Props) {
  const isMobile = useIsMobile()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const cacheRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT + 1).fill(null))
  const lastDrawnRef = useRef(0)
  const progressRef = useRef(0)
  const lastWidthRef = useRef(0)
  const lastHeightRef = useRef(0)
  const [loadPct, setLoadPct] = useState(0)
  const [ready, setReady] = useState(false)

  // Preload frames
  useEffect(() => {
    let cancelled = false
    const cache = cacheRef.current
    let loaded = 0

    const loadFrame = (i: number) =>
      new Promise<void>((resolve) => {
        if (cache[i]) {
          resolve()
          return
        }
        const img = new Image()
        img.decoding = 'async'
        img.src = framePath(i)
        const done = () => {
          if (img.complete && img.naturalWidth > 0) cache[i] = img
          loaded += 1
          if (!cancelled) setLoadPct(Math.round((loaded / FRAME_COUNT) * 100))
          resolve()
        }
        img.onload = () => {
          if (img.decode) img.decode().then(done).catch(done)
          else done()
        }
        img.onerror = () => {
          loaded += 1
          if (!cancelled) setLoadPct(Math.round((loaded / FRAME_COUNT) * 100))
          resolve()
        }
      })

    const loadRange = async (from: number, to: number) => {
      let next = from
      await Promise.all(
        Array.from({ length: PRELOAD_CONCURRENCY }, async () => {
          while (next <= to && !cancelled) {
            const i = next++
            await loadFrame(i)
          }
        }),
      )
    }

    ;(async () => {
      await loadFrame(1)
      if (!cancelled) setReady(true)
      await loadRange(2, Math.min(20, FRAME_COUNT))
      if (!cancelled) await loadRange(21, FRAME_COUNT)
    })()

    return () => {
      cancelled = true
    }
  }, [])

  // DOM-based Scroll scrub progress calculation
  useEffect(() => {
    const track = trackRef.current
    const sticky = stickyRef.current
    if (!track) return

    const onScroll = () => {
      const padTop = parseFloat(getComputedStyle(track).paddingTop) || 0
      const stickyH = sticky ? sticky.offsetHeight : window.innerHeight
      const travel = Math.max(track.offsetHeight - padTop - stickyH, 1)
      const rect = track.getBoundingClientRect()
      const scrolled = -rect.top
      progressRef.current = Math.min(1, Math.max(0, scrolled / travel))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isMobile])

  // Canvas draw loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let raf = 0
    let dpr = 1
    const WOBBLE_THRESHOLD = 160 // Chrome wobble guard

    const resize = (force = false) => {
      const parent = canvas.parentElement
      if (!parent) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = parent.clientWidth
      const h = parent.clientHeight
      const bw = Math.max(1, Math.round(w * dpr))
      const bh = Math.max(1, Math.round(h * dpr))

      const widthChanged = Math.abs(bw - lastWidthRef.current) > 2
      const heightChanged = Math.abs(bh - lastHeightRef.current) > WOBBLE_THRESHOLD

      if (force || lastWidthRef.current === 0 || widthChanged || heightChanged) {
        if (canvas.width !== bw || canvas.height !== bh) {
          canvas.width = bw
          canvas.height = bh
          lastDrawnRef.current = 0
        }
        lastWidthRef.current = bw
        lastHeightRef.current = bh
      }
    }

    const onOrientation = () => {
      lastWidthRef.current = 0
      lastHeightRef.current = 0
      lastDrawnRef.current = 0
      resize(true)
    }
    window.addEventListener('orientationchange', onOrientation)

    const drawImage = (img: HTMLImageElement, mode: 'contain' | 'cover') => {
      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      if (!iw || !ih || !cw || !ch) return

      ctx.fillStyle = '#0a0907'
      ctx.fillRect(0, 0, cw, ch)

      if (mode === 'contain') {
        const scale = cw / iw
        const dw = cw
        const dh = ih * scale
        ctx.drawImage(img, 0, 0, dw, dh)
      } else {
        const scale = Math.max(cw / iw, ch / ih)
        const dw = iw * scale
        const dh = ih * scale
        const dx = (cw - dw) / 2
        const dy = (ch - dh) / 2
        ctx.drawImage(img, dx, dy, dw, dh)
      }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const tick = () => {
      resize()
      const target = prefersReducedMotion ? 1 : progressToFrame(progressRef.current)
      const cache = cacheRef.current
      let frame = target

      if (!cache[frame]) {
        if (lastDrawnRef.current && cache[lastDrawnRef.current]) {
          frame = lastDrawnRef.current
        } else {
          for (let d = 0; d < 40; d++) {
            if (cache[target - d]) {
              frame = target - d
              break
            }
            if (cache[target + d]) {
              frame = target + d
              break
            }
          }
        }
      }

      const mode = isMobile ? 'contain' : 'cover'
      if (cache[frame] && (frame !== lastDrawnRef.current || lastDrawnRef.current === 0)) {
        drawImage(cache[frame]!, mode)
        lastDrawnRef.current = frame
      }

      // Prefetch neighbors
      if (!prefersReducedMotion) {
        for (let d = -2; d <= 12; d++) {
          const i = target + d
          if (i < 1 || i > FRAME_COUNT || cache[i]) continue
          const img = new Image()
          img.src = framePath(i)
          img.onload = () => {
            cache[i] = img
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    const ro = new ResizeObserver(() => {
      lastDrawnRef.current = 0
    })
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('orientationchange', onOrientation)
    }
  }, [isMobile])

  // Mobile layout: sticky top-0 canvas frame plate floating under transparent navbar
  if (isMobile) {
    return (
      <section id="hero" aria-label="Showroom walkthrough" className="bg-[#0a0907]">
        <div
          ref={trackRef}
          className="relative min-h-[calc(200vh-var(--nav-height))]"
        >
          <div
            ref={stickyRef}
            className="sticky top-0 z-0 flex flex-col min-h-[100dvh] bg-[#0a0907] overflow-hidden"
          >
            {/* 16:9 Canvas Frame Plate — starts at top:0 under transparent navbar */}
            <div
              className="relative w-full shrink-0 bg-[#0a0907]"
              style={{ aspectRatio: '16 / 9', width: '100%' }}
            >
              <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 h-full w-full touch-none object-cover"
                style={{ transform: 'translateZ(0)', willChange: 'transform' }}
              />
              {!ready && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0a0907]/90 text-white">
                  <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#e7c960] border-t-transparent" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e7c960]">
                    Loading {loadPct}%
                  </p>
                </div>
              )}
            </div>
            {mobileContent || <DefaultMobileStory />}
          </div>
        </div>
      </section>
    )
  }

  // Desktop layout
  return (
    <section id="hero" aria-label="Showroom walkthrough" className="bg-[#0a0907] relative">
      <div ref={trackRef} className="relative h-[240vh]">
        <div
          ref={stickyRef}
          className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#0a0907]"
        >
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full touch-none object-cover"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0907] via-transparent to-[#0a0907]/40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 gold-glow-radial"
            aria-hidden
          />
          {!ready && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0a0907]/90 text-white">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#e7c960] border-t-transparent" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#e7c960]">
                Loading showroom {loadPct}%
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
