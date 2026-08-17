import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { brand, nav as navCopy } from '../content/copy'
import { useTheme } from '../context/ThemeContext'
import { ThemeToggle } from './ThemeToggle'

const NAV_OFFSET = -56

export function Navbar() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [pastHero, setPastHero] = useState(false)
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('hero')
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect()
        // Hero frames sequence is active until hero bottom reaches top of viewport
        setPastHero(rect.bottom <= window.innerHeight)
      } else {
        setPastHero(window.scrollY > 600)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
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

  // Determine dynamic header classes based on scroll state & theme
  const getHeaderClasses = () => {
    if (open) {
      return isLight
        ? 'bg-[#faf8f5] border-[#d4af37]/25 text-[#181510]'
        : 'bg-[#0a0907] border-[#d4af37]/20 text-white'
    }
    if (pastHero) {
      return isLight
        ? 'bg-[#faf8f5]/90 backdrop-blur-md border-[#d4af37]/25 text-[#181510] shadow-[0_4px_20px_rgba(168,109,10,0.08)]'
        : 'bg-[#0a0907]/85 backdrop-blur-md border-[#d4af37]/20 text-white shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
    }
    // Completely transparent on hero
    return 'bg-transparent border-transparent text-white'
  }

  const getNavLinkClasses = () => {
    if (pastHero && isLight && !open) {
      return 'text-[#302a26] hover:text-[#a86d0a] hover:bg-[#d4af37]/15'
    }
    if (pastHero && !isLight) {
      return 'text-[#aca6a2] hover:text-[#e7c960] hover:bg-[#d4af37]/10'
    }
    return 'text-white/90 hover:text-[#e7c960] hover:bg-white/10'
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-14 border-b transition-all duration-300 ${getHeaderClasses()}`}
      >
        <div className="section-wrap flex h-full items-center justify-between gap-3">
          <a
            href="#hero"
            className="tap flex items-center gap-2 group"
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
              className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
            />
            <span
              className={`font-display text-base font-bold tracking-tight sm:text-lg transition-colors ${
                pastHero && isLight && !open ? 'text-[#181510]' : 'text-white'
              }`}
            >
              {brand.name}
              <span
                className={`block font-mono text-[8px] font-medium uppercase tracking-[0.22em] sm:text-[9px] ${
                  pastHero && isLight && !open ? 'text-[#a86d0a]' : 'text-[#e7c960]'
                }`}
              >
                {brand.tagline}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navCopy.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`tap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${getNavLinkClasses()}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.href.replace('#', ''))
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />

            <a
              href="#demo"
              className="btn-gold tap-lg inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-bold transition-all sm:px-5"
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
              className={`tap flex items-center justify-center rounded-lg border p-2 transition-colors md:hidden ${
                isLight
                  ? 'border-[#a86d0a]/30 bg-white text-[#a86d0a]'
                  : 'border-[#d4af37]/30 bg-[#181510] text-[#e7c960]'
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
                    isLight ? 'bg-[#a86d0a]' : 'bg-[#e7c960]'
                  } ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-full transition-opacity ${
                    isLight ? 'bg-[#a86d0a]' : 'bg-[#e7c960]'
                  } ${open ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-full transition-all ${
                    isLight ? 'bg-[#a86d0a]' : 'bg-[#e7c960]'
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
        className={`fixed inset-0 z-[70] pt-16 transition-[opacity,visibility] duration-300 md:hidden ${
          isLight ? 'bg-[#faf8f5]' : 'bg-[#0a0907]'
        } ${open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
      >
        <nav className="section-wrap flex flex-col gap-1" aria-label="Mobile">
          {navCopy.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`tap-lg flex items-center border-b px-2 text-base font-medium ${
                isLight
                  ? 'border-[#a86d0a]/20 text-[#181510] hover:text-[#a86d0a]'
                  : 'border-[#d4af37]/15 text-[#f7f3e9] hover:text-[#e7c960]'
              }`}
              onClick={(e) => {
                e.preventDefault()
                go(link.href.replace('#', ''))
              }}
            >
              {link.label}
            </a>
          ))}
          <div
            className={`flex items-center justify-between border-b py-3 px-2 ${
              isLight ? 'border-[#a86d0a]/20' : 'border-[#d4af37]/15'
            }`}
          >
            <span className={`text-sm font-medium ${isLight ? 'text-[#625954]' : 'text-[#aca6a2]'}`}>Appearance</span>
            <ThemeToggle />
          </div>
          <a
            href="#demo"
            className="btn-gold tap-lg mt-6 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold"
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


