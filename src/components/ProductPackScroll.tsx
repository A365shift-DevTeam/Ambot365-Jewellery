import { useEffect, useRef, useState, type ReactNode } from 'react'
import { FRAME_COUNT, framePath, progressToFrame } from '../lib/frames'
import { useIsMobile } from '../hooks/useIsMobile'

const PRELOAD_CONCURRENCY = 8

type Props = {
  /** Rendered inside sticky hero on mobile (e.g. Story compact) */
  mobileContent?: ReactNode
}

/**
 * Scroll-driven frame sequence hero.
 * Mobile (≤1024): sticky under nav, contain draw, story inside sticky.
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
      await loadRange(1, Math.min(40, FRAME_COUNT))
      if (cancelled) return
      setReady(true)
      await loadRange(41, FRAME_COUNT)
    })()

    return () => {
      cancelled = true
    }
  }, [])

  // Scroll progress for this track
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      if (total <= 0) {
        progressRef.current = 0
        return
      }
      const scrolled = -rect.top
      progressRef.current = Math.min(1, Math.max(0, scrolled / total))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
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

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = parent.clientWidth
      const h = parent.clientHeight
      const bw = Math.max(1, Math.round(w * dpr))
      const bh = Math.max(1, Math.round(h * dpr))
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw
        canvas.height = bh
        lastDrawnRef.current = 0
      }
    }

    const drawImage = (img: HTMLImageElement, mode: 'contain' | 'cover') => {
      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      if (!iw || !ih || !cw || !ch) return

      ctx.fillStyle = '#0d4f3c'
      ctx.fillRect(0, 0, cw, ch)

      if (mode === 'contain') {
        // Full width, top-aligned (no side crop on narrow screens)
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

    const tick = () => {
      resize()
      const target = progressToFrame(progressRef.current)
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
      } else if (cache[frame] && lastDrawnRef.current === frame) {
        // Redraw on resize only (handled by lastDrawn reset)
      }

      // Prefetch neighbors
      for (let d = -2; d <= 12; d++) {
        const i = target + d
        if (i < 1 || i > FRAME_COUNT || cache[i]) continue
        const img = new Image()
        img.src = framePath(i)
        img.onload = () => {
          cache[i] = img
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
    }
  }, [isMobile])

  // Mobile layout
  if (isMobile) {
    return (
      <section id="hero" aria-label="Showroom walkthrough" className="bg-forest">
        <div
          ref={trackRef}
          className="relative h-[300vh] pt-[var(--nav-height)]"
        >
          <div
            ref={stickyRef}
            className="sticky top-[var(--nav-height)] z-0 flex flex-col bg-forest"
          >
            <div
              className="relative w-full bg-forest"
              style={{ height: 'calc(100vw * 9 / 16)' }}
            >
              <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 h-full w-full touch-none"
              />
              {!ready && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-forest/90 text-white">
                  <div className="h-9 w-9 animate-spin rounded-full border-2 border-gold-soft border-t-transparent" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                    Loading {loadPct}%
                  </p>
                </div>
              )}
            </div>
            {mobileContent}
          </div>
        </div>
      </section>
    )
  }

  // Desktop layout
  return (
    <section id="hero" aria-label="Showroom walkthrough" className="bg-ink">
      <div ref={trackRef} className="relative h-[240vh]">
        <div
          ref={stickyRef}
          className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-ink"
        >
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full touch-none"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20"
            aria-hidden
          />
          {!ready && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ink/80 text-white">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-soft border-t-transparent" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-soft">
                Loading showroom {loadPct}%
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
