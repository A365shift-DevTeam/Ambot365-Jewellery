import { motion } from 'motion/react'
import { visit } from '../../content/copy'

export function Visit() {
  return (
    <section id="visit" className="section-pad bg-[#0a0907] relative overflow-hidden" aria-labelledby="visit-title">
      <div className="pointer-events-none absolute inset-0 gold-glow-radial" aria-hidden />

      <div className="section-wrap grid-adaptive-2 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label mb-3 text-[#e7c960]">{visit.eyebrow}</p>
          <h2 id="visit-title" className="heading-fluid">
            Your private appointment <span className="gold-gradient-text">awaits.</span>
          </h2>
          <p className="body-fluid mt-4 max-w-lg text-[#aca6a2]">{visit.body}</p>
          <ul className="mt-6 space-y-0">
            {visit.points.map((p) => (
              <li
                key={p}
                className="flex min-h-12 items-center border-b border-[#d4af37]/20 pl-5 text-[#e9e9e7] before:absolute before:ml-[-1.1rem] before:h-2 before:w-2 before:rounded-full before:bg-[#e7c960] relative"
              >
                {p}
              </li>
            ))}
          </ul>
          <a
            href="#demo"
            className="btn-gold tap-lg mt-8 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-bold text-[#070604] shadow-md"
          >
            Book a visit
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="surface-card group overflow-hidden p-0 relative"
        >
          <div className="relative overflow-hidden">
            <img
              src="/frames/00000019_converted.webp"
              alt="Ambot365 Jewellery salon"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0907]/60 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

