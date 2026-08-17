import { brand, footer } from '../../content/copy'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[#d4af37]/20 bg-[#070604] section-pad !pt-14 !pb-10 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gold-glow-radial" aria-hidden />

      <div className="section-wrap relative">
        <div className="grid-adaptive-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/ambot-logo.png" alt="" className="h-10 w-10 object-contain" width={40} height={40} />
              <span className="font-display text-xl font-bold text-white">
                {brand.name}
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#e7c960]">
                  {brand.tagline}
                </span>
              </span>
            </div>
            <p className="body-fluid mt-4 max-w-md text-[#aca6a2]">{footer.blurb}</p>
          </div>

          <div>
            <p className="label mb-3 text-[#e7c960]">Explore</p>
            <ul className="space-y-1">
              {['hero', 'calculator', 'gallery', 'craft', 'demo'].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="tap flex items-center text-sm text-[#aca6a2] hover:text-[#e7c960] transition-colors">
                    {id === 'demo'
                      ? 'Book visit'
                      : id === 'hero'
                        ? 'Showroom'
                        : id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-3 text-[#e7c960]">Stay close</p>
            <form
              className="flex flex-col gap-2.5"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter email address"
                className="min-h-12 w-full rounded-xl border border-[#d4af37]/25 bg-[#0a0907] px-3.5 text-sm text-white placeholder-[#625954] focus:border-[#e7c960] focus:outline-none focus:ring-1 focus:ring-[#e7c960] sm:rounded-2xl"
              />
              <button
                type="submit"
                className="btn-gold tap-lg inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-bold"
              >
                Notify me
              </button>
            </form>
            <div className="mt-4 flex gap-2">
              {footer.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="tap flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/25 bg-[#181510] text-xs font-medium text-[#e7c960] hover:border-[#e7c960] hover:bg-[#d4af37]/20 hover:text-white transition-all"
                  aria-label={s.label}
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#d4af37]/15 pt-6 text-xs text-[#aca6a2] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {brand.name} Jewellery. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#demo" className="tap inline-flex items-center hover:text-[#e7c960] transition-colors">
              {footer.privacy}
            </a>
            <a href={`mailto:${brand.email}`} className="tap inline-flex items-center hover:text-[#e7c960] transition-colors">
              {footer.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

