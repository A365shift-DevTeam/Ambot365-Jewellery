/**
 * Indicative metal rates (INR). Update these anytime — calculator reads from here.
 * These are demo defaults, not live market prices.
 */
export type MetalId = 'gold' | 'silver' | 'diamond'

export type GoldPurity = '24k' | '22k' | '18k'

export const goldPurities: { id: GoldPurity; label: string; ratePerGram: number }[] = [
  { id: '24k', label: '24K (pure)', ratePerGram: 7800 },
  { id: '22k', label: '22K', ratePerGram: 7150 },
  { id: '18k', label: '18K', ratePerGram: 5850 },
]

export const metalOptions: {
  id: MetalId
  label: string
  unit: 'g' | 'ct'
  unitLabel: string
  /** Used when metal is not gold (gold uses purity rates) */
  ratePerUnit?: number
  note: string
}[] = [
  {
    id: 'gold',
    label: 'Gold',
    unit: 'g',
    unitLabel: 'grams',
    note: 'Weight is approximate pure metal value only — making charges & GST extra.',
  },
  {
    id: 'silver',
    label: 'Silver',
    unit: 'g',
    unitLabel: 'grams',
    ratePerUnit: 95,
    note: 'Based on indicative silver rate per gram. Ornament charges may apply.',
  },
  {
    id: 'diamond',
    label: 'Diamond',
    unit: 'ct',
    unitLabel: 'carats',
    ratePerUnit: 45000,
    note: 'Diamonds are estimated in carats at a reference rate. Actual price varies by cut, colour & clarity.',
  },
]

export function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatWeight(n: number, unit: 'g' | 'ct') {
  if (!Number.isFinite(n) || n <= 0) return unit === 'ct' ? '0.000 ct' : '0.000 g'
  if (unit === 'ct') {
    return `${n.toLocaleString('en-IN', { maximumFractionDigits: 3, minimumFractionDigits: 3 })} ct`
  }
  return `${n.toLocaleString('en-IN', { maximumFractionDigits: 3, minimumFractionDigits: 3 })} g`
}
