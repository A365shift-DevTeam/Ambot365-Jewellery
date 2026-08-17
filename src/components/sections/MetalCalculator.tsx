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
    <section id="calculator" className="section-pad bg-[#0a0907] relative overflow-hidden" aria-labelledby="calc-title">
      <div className="pointer-events-none absolute inset-0 gold-glow-radial" aria-hidden />

      <div className="section-wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="label mb-3 text-[#e7c960]">Metal calculator</p>
          <h2 id="calc-title" className="heading-fluid">
            How much metal for your <span className="gold-gradient-text">budget?</span>
          </h2>
          <p className="body-fluid mt-3 text-[#aca6a2]">
            Choose gold, silver or diamond, enter your budget in rupees, and see approximate weight instantly based on live rates.
          </p>
        </motion.div>

        <div className="mt-8 surface-card grid-adaptive-2 gap-0 overflow-hidden p-0 sm:mt-10 lg:gap-0">
          <div className="flex flex-col gap-5 p-5 sm:p-7 md:p-8 bg-[#181510]/80">
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2.5 text-xs font-mono uppercase tracking-wider text-[#e7c960]">Select metal</legend>
              <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Metal type">
                {metalOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`tap-lg relative flex cursor-pointer items-center justify-center rounded-xl border text-sm font-semibold transition-all sm:rounded-2xl ${
                      metal === opt.id
                        ? 'border-[#e7c960] bg-[#d4af37]/20 text-[#e7c960] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'border-[#d4af37]/20 bg-[#0e0c09] text-[#aca6a2] hover:border-[#d4af37]/40 hover:text-white'
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
                <label htmlFor="calc-purity" className="mb-2 block text-xs font-mono uppercase tracking-wider text-[#e7c960]">
                  Gold purity
                </label>
                <select
                  id="calc-purity"
                  className="tap-lg w-full rounded-xl border border-[#d4af37]/25 bg-[#0e0c09] px-3.5 text-sm font-medium text-white focus:border-[#e7c960] focus:outline-none focus:ring-1 focus:ring-[#e7c960] sm:rounded-2xl"
                  value={purity}
                  onChange={(e) => setPurity(e.target.value as GoldPurity)}
                >
                  {goldPurities.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#0e0c09] text-white">
                      {p.label} — {formatInr(p.ratePerGram)}/g
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="calc-amount" className="mb-2 block text-xs font-mono uppercase tracking-wider text-[#e7c960]">
                Your budget (₹)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-[#e7c960]">
                  ₹
                </span>
                <input
                  id="calc-amount"
                  type="text"
                  inputMode="decimal"
                  className="tap-lg w-full rounded-xl border border-[#d4af37]/25 bg-[#0e0c09] pl-8 pr-3.5 text-base font-semibold text-white focus:border-[#e7c960] focus:outline-none focus:ring-1 focus:ring-[#e7c960] sm:rounded-2xl"
                  value={amount}
                  onChange={(e) => {
                    const v = e.target.value
                    if (v === '' || /^[\d,]*\.?\d*$/.test(v)) setAmount(v)
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-[#aca6a2]">
                Example: ₹100 → how much {selectedMetal.label.toLowerCase()} you can buy.
              </p>
            </div>

            <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-3 text-sm sm:rounded-2xl">
              <span className="text-[#aca6a2] text-xs uppercase font-mono tracking-wider">Rate used</span>
              <strong className="text-right text-[#e7c960] font-mono">
                {formatInr(ratePerUnit)} / {selectedMetal.unit === 'ct' ? 'ct' : 'g'}
                {metal === 'gold' ? ` · ${selectedPurity.label}` : ''}
              </strong>
            </div>
          </div>

          <div className="flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-[#d4af37]/20 bg-gradient-to-br from-[#1c1812] via-[#120f0b] to-[#070604] p-6 text-white sm:p-8 relative overflow-hidden">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#d4af37]/10 blur-3xl" />
            <p className="label text-[#e7c960]">You get approximately</p>
            <p className="mt-2 font-serif text-[44px] leading-none tracking-tight sm:text-[54px] gold-gradient-shimmer" aria-live="polite">
              {valid ? formatWeight(weight, selectedMetal.unit) : '—'}
            </p>
            <p className="body-fluid mt-3 text-[#aca6a2]">
              {valid
                ? `for ${formatInr(amountNum)} of ${selectedMetal.label.toLowerCase()}`
                : 'Enter an amount to calculate'}
            </p>
            {valid && (
              <p className="mt-5 border-t border-[#d4af37]/20 pt-4 font-mono text-[11px] text-[#aca6a2]">
                {formatInr(amountNum)} ÷ {formatInr(ratePerUnit)} ={' '}
                <span className="text-[#e7c960] font-bold">{formatWeight(weight, selectedMetal.unit)}</span>
              </p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-[#625954]">{selectedMetal.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
