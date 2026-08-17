import { motion } from 'motion/react'
import { collections } from '../../content/copy'

export function Collections() {
  return (
    <section id="collections" className="section-pad bg-[#070604] relative overflow-hidden" aria-labelledby="collections-title">
      <div className="pointer-events-none absolute inset-0 gold-glow-radial" aria-hidden />

      <div className="section-wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="label mb-3 text-[#e7c960]">{collections.eyebrow}</p>
          <h2 id="collections-title" className="heading-fluid">
            Pieces for every <span className="gold-gradient-text">chapter.</span>
          </h2>
        </motion.div>

        <div className="grid-adaptive-4 mt-8 sm:mt-12">
          {collections.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="surface-card group flex min-h-12 flex-col p-6 sm:p-7 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#e7c960]">
                  0{i + 1}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]/40 group-hover:bg-[#e7c960] transition-colors" />
              </div>
              <h3 className="mt-5 font-serif text-2xl tracking-tight text-white group-hover:text-[#f7f3e9] transition-colors">
                {item.title}
              </h3>
              <p className="body-fluid mt-3 text-[#aca6a2] text-sm leading-relaxed">{item.body}</p>
              
              {/* Bottom gold accent hover bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

