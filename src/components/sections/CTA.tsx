import { motion } from 'motion/react'
import { cta } from '../../content/copy'
import { DemoForm } from '../ui/DemoForm'

export function CTA() {
  return (
    <section id="demo" className="section-pad bg-[#070604] relative overflow-hidden" aria-labelledby="demo-title">
      <div className="pointer-events-none absolute inset-0 gold-glow-radial" aria-hidden />

      <div className="section-wrap grid-adaptive-2 items-start relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label mb-3 text-[#e7c960]">{cta.eyebrow}</p>
          <h2 id="demo-title" className="heading-fluid">
            Request a private <span className="gold-gradient-text">showroom appointment.</span>
          </h2>
          <p className="body-fluid mt-4 max-w-md text-[#aca6a2]">{cta.body}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <DemoForm />
        </motion.div>
      </div>
    </section>
  )
}

