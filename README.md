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
- Scroll-driven showroom frames (240 WebP) via `ProductPackScroll`
  - Mobile ≤1023px: sticky under nav, contain draw, story inside sticky
  - Desktop ≥1024px: 100dvh cover + separate story
- Metal calculator (gold / silver / diamond → weight for ₹)
- Lenis smooth scroll (−80px nav offset)
- Adaptive grids: `.grid-adaptive-2/3/4/sidebar`
- Fixed `h-20` navbar + full-screen mobile drawer

## Edit content / rates

- Copy: `src/content/copy.ts`
- Metal rates: `src/content/rates.ts`
- Frames: `public/frames` (junction → `../Frames`)
- Gallery: `public/gallery/`
- Logo: `public/ambot-logo.png`, `public/favicon.png`
