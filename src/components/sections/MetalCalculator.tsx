import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  formatInr,
  formatWeight,
  goldPurities,
  metalOptions,
  type GoldPurity,
  type MetalId,
} from '../../content/rates'

export function MetalCalculator() {
  const [metal, setMetal] = useState<MetalId>('gold')
  const [purity, setPurity] = useState<GoldPurity>('22k')
  const [amount, setAmount] = useState('100')

  const selectedMetal = metalOptions.find((m) => m.id === metal)!
  const selectedPurity = goldPurities.find((p) => p.id === purity)!
  const ratePerUnit = metal === 'gold' ? selectedPurity.ratePerGram : selectedMetal.ratePerUnit!

  const amountNum = useMemo(() => {
    const n = Number(amount.replace(/,/g, '').trim())
    return Number.isFinite(n) && n >= 0 ? n : NaN
  }, [amount])

  const weight = useMemo(() => {
    if (!Number.isFinite(amountNum) || amountNum <= 0 || ratePerUnit <= 0) return 0
    return amountNum / ratePerUnit
  }, [amountNum, ratePerUnit])

  const valid = Number.isFinite(amountNum) && amountNum > 0

  return (
    <section id="calculator" className="section-pad bg-parchment" aria-labelledby="calc-title">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="label mb-3 text-gold">Metal calculator</p>
          <h2 id="calc-title" className="heading-fluid">
            How much metal for your budget?
          </h2>
          <p className="body-fluid mt-3 text-ink-soft">
            Choose gold, silver or diamond, enter rupees, and see approximate weight.
          </p>
        </motion.div>

        <div className="mt-8 surface-card grid-adaptive-2 gap-0 overflow-hidden p-0 sm:mt-10 lg:gap-0">
          <div className="flex flex-col gap-5 p-5 sm:p-7 md:p-8">
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2 text-sm font-medium text-ink-soft">Select metal</legend>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Metal type">
                {metalOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`tap-lg relative flex cursor-pointer items-center justify-center rounded-xl border text-sm font-semibold transition-colors sm:rounded-2xl ${
                      metal === opt.id
                        ? 'border-forest bg-forest/10 text-forest'
                        : 'border-border bg-white text-ink'
                    }`}
                  >
                    <input
                      type="radio"
                      name="metal"
                      className="sr-only"
                      checked={metal === opt.id}
                      onChange={() => setMetal(opt.id)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {metal === 'gold' && (
              <div>
                <label htmlFor="calc-purity" className="mb-2 block text-sm font-medium text-ink-soft">
                  Gold purity
                </label>
                <select
                  id="calc-purity"
                  className="tap-lg w-full rounded-xl border border-border bg-white px-3 sm:rounded-2xl"
                  value={purity}
                  onChange={(e) => setPurity(e.target.value as GoldPurity)}
                >
                  {goldPurities.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} — {formatInr(p.ratePerGram)}/g
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="calc-amount" className="mb-2 block text-sm font-medium text-ink-soft">
                Your budget (₹)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-muted">
                  ₹
                </span>
                <input
                  id="calc-amount"
                  type="text"
                  inputMode="decimal"
                  className="tap-lg w-full rounded-xl border border-border bg-white pl-8 pr-3 text-base font-semibold sm:rounded-2xl"
                  value={amount}
                  onChange={(e) => {
                    const v = e.target.value
                    if (v === '' || /^[\d,]*\.?\d*$/.test(v)) setAmount(v)
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-muted">
                Example: ₹100 → how much {selectedMetal.label.toLowerCase()} you can buy.
              </p>
            </div>

            <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-xl border border-gold/25 bg-gold/10 px-4 py-3 text-sm sm:rounded-2xl">
              <span className="text-muted">Rate used</span>
              <strong className="text-right text-ink">
                {formatInr(ratePerUnit)} / {selectedMetal.unit === 'ct' ? 'ct' : 'g'}
                {metal === 'gold' ? ` · ${selectedPurity.label}` : ''}
              </strong>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-gradient-to-br from-forest via-forest-deep to-ink p-6 text-white sm:p-8">
            <p className="label text-gold-soft">You get approximately</p>
            <p className="mt-2 font-serif text-[40px] leading-none tracking-tight sm:text-[48px]" aria-live="polite">
              {valid ? formatWeight(weight, selectedMetal.unit) : '—'}
            </p>
            <p className="body-fluid mt-3 text-white/70">
              {valid
                ? `for ${formatInr(amountNum)} of ${selectedMetal.label.toLowerCase()}`
                : 'Enter an amount to calculate'}
            </p>
            {valid && (
              <p className="mt-5 border-t border-white/15 pt-4 font-mono text-[11px] text-white/55">
                {formatInr(amountNum)} ÷ {formatInr(ratePerUnit)} ={' '}
                {formatWeight(weight, selectedMetal.unit)}
              </p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-white/45">{selectedMetal.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
