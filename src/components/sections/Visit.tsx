import { motion } from 'motion/react'
import { visit } from '../../content/copy'

export function Visit() {
  return (
    <section id="visit" className="section-pad bg-surface" aria-labelledby="visit-title">
      <div className="section-wrap grid-adaptive-2 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label mb-3 text-gold">{visit.eyebrow}</p>
          <h2 id="visit-title" className="heading-fluid">
            {visit.title}
          </h2>
          <p className="body-fluid mt-4 max-w-lg text-ink-soft">{visit.body}</p>
          <ul className="mt-6 space-y-0">
            {visit.points.map((p) => (
              <li
                key={p}
                className="flex min-h-12 items-center border-b border-border pl-5 text-ink-soft before:absolute before:ml-[-1.1rem] before:h-2 before:w-2 before:rounded-full before:bg-gold relative"
              >
                {p}
              </li>
            ))}
          </ul>
          <a
            href="#demo"
            className="tap-lg mt-8 inline-flex items-center justify-center rounded-full bg-forest px-6 font-semibold text-white"
          >
            Book a visit
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="surface-card overflow-hidden p-0"
        >
          <img
            src="/frames/00000240_converted.webp"
            alt="Ambot365 Jewellery salon"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}
