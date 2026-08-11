import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { brand, nav as navCopy } from '../content/copy'

const NAV_OFFSET = -56

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Expose lenis for non-hook callers
  useEffect(() => {
    const w = window as unknown as { lenis?: typeof lenis }
    if (lenis) w.lenis = lenis
    return () => {
      if (w.lenis === lenis) delete w.lenis
    }
  }, [lenis])

  const go = (href: string) => {
    setOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return

    if (lenis) {
      lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.15 })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-14 border-b transition-all duration-300 ${
          scrolled || open
            ? 'border-border/30 bg-surface/80 shadow-xs backdrop-blur-md text-ink'
            : 'border-transparent bg-transparent text-white'
        }`}
      >
        <div className="section-wrap flex h-full items-center justify-between gap-3">
          <a
            href="#hero"
            className="tap flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault()
              go('hero')
            }}
          >
            <img
              src="/ambot-logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
              {brand.name}
              <span className={`block font-mono text-[8px] font-medium uppercase tracking-[0.22em] transition-colors sm:text-[9px] ${
                scrolled || open ? 'text-gold' : 'text-gold-soft'
              }`}>
                {brand.tagline}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navCopy.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`tap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  scrolled || open
                    ? 'text-ink-soft hover:bg-parchment hover:text-ink'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.href.replace('#', ''))
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#demo"
              className={`tap-lg inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all sm:px-4 ${
                scrolled || open
                  ? 'bg-forest text-white hover:bg-forest-deep'
                  : 'bg-gold-soft text-forest hover:bg-gold hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault()
                go('demo')
              }}
            >
              <span className="sm:hidden">Start</span>
              <span className="hidden sm:inline">Book a visit</span>
            </a>

            <button
              type="button"
              className={`tap flex items-center justify-center rounded-lg border p-1.5 transition-colors md:hidden ${
                scrolled || open
                  ? 'border-border bg-white text-ink'
                  : 'border-white/20 bg-white/10 text-white'
              }`}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 h-0.5 w-full transition-all ${
                    scrolled || open ? 'bg-ink' : 'bg-white'
                  } ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-full transition-opacity ${
                    scrolled || open ? 'bg-ink' : 'bg-white'
                  } ${open ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-full transition-all ${
                    scrolled || open ? 'bg-ink' : 'bg-white'
                  } ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 z-[70] bg-surface pt-16 transition-[opacity,visibility] duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <nav className="section-wrap flex flex-col gap-1" aria-label="Mobile">
          {navCopy.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="tap-lg flex items-center border-b border-border px-1 text-base font-medium text-ink"
              onClick={(e) => {
                e.preventDefault()
                go(link.href.replace('#', ''))
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#demo"
            className="tap-lg mt-6 inline-flex items-center justify-center rounded-full bg-forest px-6 py-2 text-sm font-semibold text-white"
            onClick={(e) => {
              e.preventDefault()
              go('demo')
            }}
          >
            Book a visit
          </a>
        </nav>
      </div>
    </>
  )
}
