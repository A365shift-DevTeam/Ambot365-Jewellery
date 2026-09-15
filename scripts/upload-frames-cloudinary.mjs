/**
 * Upload the showroom frame sequence to Cloudinary.
 *
 * Source:  ./Jewellery frames/00000001.jpg … 00000120.jpg (1920x1080 originals)
 * Target:  <cloud>/ambot365/frames/00000001 … 00000120
 *
 * Re-runnable: frames that already exist in the folder are skipped.
 * Usage:  npm run upload:frames            (reads .env.local)
 *         npm run upload:frames -- --force (re-upload and overwrite)
 */
import { readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import { v2 as cloudinary } from 'cloudinary'

try {
  process.loadEnvFile('.env.local')
} catch {
  console.error('Missing .env.local (copy .env.example and fill in Cloudinary credentials).')
  process.exit(1)
}

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set in .env.local')
  process.exit(1)
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
})

const SOURCE_DIR = 'Jewellery frames'
const FOLDER = 'ambot365/frames'
const CONCURRENCY = 6
const force = process.argv.includes('--force')

const files = (await readdir(SOURCE_DIR))
  .filter((f) => /^\d{8}\.jpe?g$/i.test(f))
  .sort()

if (files.length === 0) {
  console.error(`No frames found in ${SOURCE_DIR}`)
  process.exit(1)
}

console.log(`Uploading ${files.length} frames from "${SOURCE_DIR}" to ${CLOUDINARY_CLOUD_NAME}/${FOLDER}${force ? ' (force)' : ''}`)

let next = 0
let uploaded = 0
let skipped = 0
const failed = []

async function uploadOne(file) {
  const publicId = parse(file).name
  const result = await cloudinary.uploader.upload(join(SOURCE_DIR, file), {
    asset_folder: FOLDER,
    public_id: `${FOLDER}/${publicId}`,
    resource_type: 'image',
    overwrite: force,
    unique_filename: false,
    use_filename: false,
    invalidate: force,
  })
  if (result.existing) skipped += 1
  else uploaded += 1
  process.stdout.write(`\r${uploaded + skipped + failed.length}/${files.length}  uploaded ${uploaded}  skipped ${skipped}  failed ${failed.length}`)
}

async function worker() {
  while (next < files.length) {
    const file = files[next++]
    let attempt = 0
    for (;;) {
      try {
        await uploadOne(file)
        break
      } catch (err) {
        attempt += 1
        if (attempt >= 3) {
          failed.push(file)
          console.error(`\n${file}: ${err?.message ?? err}`)
          break
        }
        await new Promise((r) => setTimeout(r, 1000 * attempt))
      }
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker))
process.stdout.write('\n')

const sample = cloudinary.url(`${FOLDER}/${parse(files[0]).name}`, {
  transformation: [{ fetch_format: 'auto', quality: 'auto:good', width: 1920, crop: 'limit' }],
})
console.log(`Done. uploaded ${uploaded}, skipped ${skipped}, failed ${failed.length}`)
console.log(`Sample URL: ${sample}`)
if (failed.length) {
  console.error('Failed:', failed.join(', '))
  process.exit(1)
}
