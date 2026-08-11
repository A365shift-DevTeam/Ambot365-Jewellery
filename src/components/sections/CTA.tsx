import { motion } from 'motion/react'
import { cta } from '../../content/copy'
import { DemoForm } from '../ui/DemoForm'

export function CTA() {
  return (
    <section id="demo" className="section-pad bg-parchment" aria-labelledby="demo-title">
      <div className="section-wrap grid-adaptive-2 items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label mb-3 text-gold">{cta.eyebrow}</p>
          <h2 id="demo-title" className="heading-fluid">
            {cta.title}
          </h2>
          <p className="body-fluid mt-4 max-w-md text-ink-soft">{cta.body}</p>
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
