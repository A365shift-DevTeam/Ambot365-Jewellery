# Ambot365 Jewellery — Enterprise Mobile-First One-Pager

React + Vite + **Tailwind CSS v4** + **Motion** + **Lenis**

## Run

```bash
cd ambot365-site
npm install
npm run dev
```

```bash
npm run lint
npm run build
```

## Features

- Mobile-first responsive layout (320px → desktop)
- Scroll-driven showroom frames (120 frames, served from Cloudinary) via `ProductPackScroll`
  - Mobile ≤1023px: sticky under nav, contain draw, story inside sticky
  - Desktop ≥1024px: 100dvh cover + separate story
- Metal calculator (gold / silver / diamond → weight for ₹)
- Lenis smooth scroll (−80px nav offset)
- Adaptive grids: `.grid-adaptive-2/3/4/sidebar`
- Fixed `h-20` navbar + full-screen mobile drawer

## Edit content / rates

- Copy: `src/content/copy.ts`
- Metal rates: `src/content/rates.ts`
- Frames: delivered from Cloudinary folder `ambot365/frames` (auto format/quality, width capped to viewport).
  Source originals live in `Jewellery frames/`; `public/frames` is the local WebP fallback (`VITE_USE_CLOUDINARY=false`).
- Gallery: `public/gallery/`
- Logo: `public/ambot-logo.png`, `public/favicon.png`

## Cloudinary frames

1. Copy `.env.example` to `.env.local` and fill in the Cloudinary cloud name, API key and API secret.
2. Run `npm run upload:frames` to upload `Jewellery frames/*.jpg` to `ambot365/frames`.
   Already-uploaded frames are skipped; pass `-- --force` to overwrite.
3. `VITE_CLOUDINARY_CLOUD_NAME` must be set at build time so the site builds Cloudinary URLs.
