import { motion } from 'motion/react'
import { collections } from '../../content/copy'

export function Collections() {
  return (
    <section id="collections" className="section-pad bg-surface" aria-labelledby="collections-title">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="label mb-3 text-gold">{collections.eyebrow}</p>
          <h2 id="collections-title" className="heading-fluid">
            {collections.title}
          </h2>
        </motion.div>

        <div className="grid-adaptive-4 mt-8 sm:mt-10">
          {collections.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="surface-card flex min-h-12 flex-col p-5 sm:p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-serif text-2xl tracking-tight">{item.title}</h3>
              <p className="body-fluid mt-2 text-muted">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
