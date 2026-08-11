import { motion } from 'motion/react'
import { craft } from '../../content/copy'

export function CraftSection() {
  return (
    <section
      id="craft"
      className="section-pad relative overflow-hidden bg-forest text-white"
      aria-labelledby="craft-title"
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
        aria-hidden
      />

      <div className="section-wrap relative">
        <div className="grid-adaptive-2 items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label mb-3 text-gold-soft">{craft.eyebrow}</p>
            <h2 id="craft-title" className="heading-fluid text-white">
              {craft.title}
            </h2>
            <p className="body-fluid mt-4 max-w-lg text-white/75">{craft.body}</p>

            <div className="grid-adaptive-3 mt-8">
              {craft.params.map((p) => (
                <div
                  key={p}
                  className="tap flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 text-center text-sm font-medium text-white/90 sm:rounded-2xl"
                >
                  {p}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid-adaptive-sidebar">
            {craft.features.map((f, i) => (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="min-h-12 rounded-xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm sm:rounded-2xl md:rounded-3xl"
              >
                <h3 className="font-serif text-2xl text-gold-soft">{f.title}</h3>
                <p className="body-fluid mt-2 text-white/70">{f.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
