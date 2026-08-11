import { motion } from 'motion/react'
import { gallery } from '../../content/copy'

export function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-parchment" aria-labelledby="gallery-title">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label mb-3 text-gold">{gallery.eyebrow}</p>
          <h2 id="gallery-title" className="heading-fluid">
            {gallery.title}
          </h2>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {gallery.items.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="surface-card overflow-hidden p-0"
            >
              <div className="flex aspect-square items-center justify-center bg-gradient-to-b from-white to-parchment p-4">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  width={800}
                  height={800}
                />
              </div>
              <figcaption className="border-t border-border px-4 py-4">
                <h3 className="font-serif text-xl tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm font-light text-muted">{item.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
