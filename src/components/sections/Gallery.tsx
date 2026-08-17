import { motion } from 'motion/react'
import { gallery } from '../../content/copy'

export function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-[#0a0907] relative overflow-hidden" aria-labelledby="gallery-title">
      <div className="pointer-events-none absolute inset-0 gold-glow-radial" aria-hidden />

      <div className="section-wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label mb-3 text-[#e7c960]">{gallery.eyebrow}</p>
          <h2 id="gallery-title" className="heading-fluid">
            Selected <span className="gold-gradient-text">pieces.</span>
          </h2>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {gallery.items.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="surface-card group overflow-hidden p-0 relative"
            >
              <div className="flex aspect-square items-center justify-center bg-gradient-to-b from-[#1c1811] via-[#120f0a] to-[#070604] p-6 overflow-hidden relative">
                <div className="pointer-events-none absolute inset-0 bg-radial from-[#d4af37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                  width={800}
                  height={800}
                />
              </div>
              <figcaption className="border-t border-[#d4af37]/20 bg-[#120f0a]/95 px-5 py-4.5">
                <h3 className="font-serif text-xl tracking-tight text-white group-hover:text-[#e7c960] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-light text-[#aca6a2]">{item.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

