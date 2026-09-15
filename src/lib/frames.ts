/**
 * Scroll-driven frame sequence config.
 *
 * Frames are served from Cloudinary (folder `ambot365/frames`, uploaded by
 * `npm run upload:frames`) with automatic format/quality and a width capped to
 * what the viewport can actually show. Set VITE_USE_CLOUDINARY=false to fall
 * back to the WebP copies in /public/frames.
 */
export const FRAME_COUNT = 120
export const FRAME_PAD = 8

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const USE_CLOUDINARY = import.meta.env.VITE_USE_CLOUDINARY !== 'false' && !!CLOUD_NAME
const CLOUDINARY_FOLDER = 'ambot365/frames'
const SOURCE_WIDTH = 1920
const WIDTH_STEP = 320

/** Smallest 320px step that covers the viewport at device pixel ratio, capped at the source width. */
function deliveryWidth(): number {
  if (typeof window === 'undefined') return SOURCE_WIDTH
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const needed = Math.max(window.innerWidth, window.innerHeight) * dpr
  const stepped = Math.ceil(needed / WIDTH_STEP) * WIDTH_STEP
  return Math.min(SOURCE_WIDTH, Math.max(WIDTH_STEP * 2, stepped))
}

const DELIVERY_WIDTH = deliveryWidth()

function frameId(index1Based: number): string {
  return String(index1Based).padStart(FRAME_PAD, '0')
}

export function framePath(index1Based: number): string {
  const id = frameId(index1Based)
  if (USE_CLOUDINARY) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:good,w_${DELIVERY_WIDTH},c_limit/${CLOUDINARY_FOLDER}/${id}`
  }
  return `/frames/${id}_converted.webp`
}

/** Map 0–1 progress to 1-based frame index */
export function progressToFrame(progress: number): number {
  const p = Math.min(1, Math.max(0, progress))
  return Math.min(FRAME_COUNT, Math.max(1, Math.round(p * (FRAME_COUNT - 1)) + 1))
}
