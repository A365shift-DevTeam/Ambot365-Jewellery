import { motion } from 'motion/react'
import { craft } from '../../content/copy'

export function CraftSection() {
  return (
    <section
      id="craft"
      className="section-pad relative overflow-hidden bg-[#070604] text-white"
      aria-labelledby="craft-title"
    >
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute inset-0 gold-glow-radial" aria-hidden />

      {/* Subtle Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
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
            <p className="label mb-3 text-[#e7c960]">{craft.eyebrow}</p>
            <h2 id="craft-title" className="heading-fluid text-white">
              Certified metal. <span className="gold-gradient-text">Honest hospitality.</span>
            </h2>
            <p className="body-fluid mt-4 max-w-lg text-[#aca6a2]">{craft.body}</p>

            <div className="grid-adaptive-3 mt-8">
              {craft.params.map((p) => (
                <div
                  key={p}
                  className="tap flex min-h-12 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#181510] px-3.5 text-center text-xs font-semibold text-[#f7f3e9] hover:border-[#e7c960] hover:text-[#e7c960] transition-all sm:rounded-2xl"
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
                className="surface-card group p-6 relative overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#e7c960]" />
                  <h3 className="font-serif text-2xl text-[#e7c960] group-hover:text-white transition-colors">{f.title}</h3>
                </div>
                <p className="body-fluid mt-2.5 text-[#aca6a2]">{f.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

