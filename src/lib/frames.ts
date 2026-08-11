/** Scroll-driven frame sequence config (files in /public/frames). */
export const FRAME_COUNT = 240
export const FRAME_PAD = 8

export function framePath(index1Based: number): string {
  const n = String(index1Based).padStart(FRAME_PAD, '0')
  return `/frames/${n}_converted.webp`
}

/** Map 0–1 progress to 1-based frame index */
export function progressToFrame(progress: number): number {
  const p = Math.min(1, Math.max(0, progress))
  return Math.min(FRAME_COUNT, Math.max(1, Math.round(p * (FRAME_COUNT - 1)) + 1))
}
