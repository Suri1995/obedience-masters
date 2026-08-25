# Obedience Masters — Landing Page

A premium, animated Next.js landing page for a dog training studio, built to match the provided Figma design.

## Stack
- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — inline utility classes, tokens defined in `src/app/globals.css`
- **Fonts** — Baloo 2 (display/headings) + DM Sans (body), self-hosted via `@fontsource`
- **lucide-react** for icons
- A real Node API route at `/api/contact` (`src/app/api/contact/route.ts`) that receives the lead-capture form — wire this up to your database/CRM/email provider of choice

## Brand tokens (`src/app/globals.css`)
```
--color-yellow:      #FFB500
--color-black:       #000000
--color-blush-50/100/200   soft pink section backgrounds
--color-mint / --color-lavender   decorative accent blobs
```

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production
```

## Notes
- Photography is placeholder imagery from `placedog.net` (free dog-photo placeholder service) and `i.pravatar.cc` (avatar placeholders) — swap these `src` URLs in each component for your real, licensed photography before launch.
- All copy is editable directly in each component under `src/components/`.
- The Before/After slider (`src/components/BeforeAfter.tsx`) is fully interactive — drag or use the range input on mobile.
