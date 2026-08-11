import { brand, footer } from '../../content/copy'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-parchment section-pad !pt-12 !pb-10">
      <div className="section-wrap">
        <div className="grid-adaptive-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/ambot-logo.png" alt="" className="h-10 w-10 object-contain" width={40} height={40} />
              <span className="font-display text-xl font-semibold">
                {brand.name}
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  {brand.tagline}
                </span>
              </span>
            </div>
            <p className="body-fluid mt-4 max-w-md text-muted">{footer.blurb}</p>
          </div>

          <div>
            <p className="label mb-3 text-gold">Explore</p>
            <ul className="space-y-1">
              {['hero', 'calculator', 'gallery', 'craft', 'demo'].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="tap flex items-center text-sm text-ink-soft hover:text-ink">
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
            <p className="label mb-3 text-gold">Stay close</p>
            <form
              className="flex flex-col gap-2"
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
                placeholder="Email address"
                className="min-h-12 w-full rounded-xl border border-border bg-white px-3 sm:rounded-2xl"
              />
              <button
                type="submit"
                className="tap-lg inline-flex items-center justify-center rounded-full bg-forest px-4 font-semibold text-white"
              >
                Notify me
              </button>
            </form>
            <div className="mt-4 flex gap-2">
              {footer.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="tap flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-xs font-medium"
                  aria-label={s.label}
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {brand.name} Jewellery. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#demo" className="tap inline-flex items-center">
              {footer.privacy}
            </a>
            <a href={`mailto:${brand.email}`} className="tap inline-flex items-center">
              {footer.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
