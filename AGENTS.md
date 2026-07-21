<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project

Portfolio site for **STACY FULL OF ACRYLICS** — prothésiste ongulaire. Next.js 16 + React 19, App Router, Tailwind CSS v4.

Image-heavy site with gallery of nail creations and a bio/description section for the prosthetist.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (no separate typecheck script; build includes TS)
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

No test suite exists. No `format` or `typecheck` scripts.

## Structure

- `app/page.tsx` — the entire page (hero + all sections). `"use client"` top-level.
- `app/layout.tsx` — root layout with Fredoka font, I18nProvider, global CSS
- `app/globals.css` — design system (CSS custom properties, glassmorphism utilities, animations)
- `public/` — static images (nail photos, portfolio shots) referenced with absolute paths
- `components/sections/` — individual page sections (lazy-loaded via `next/dynamic` with `{ ssr: false }`)
- `components/ui/` — shared UI primitives (PlatformIcon, RevealSection, Sticker, etc.)
- `lib/data.ts` — all content data (services, gallery, testimonials)
- `lib/i18n/` — French/English i18n via React context (`context.tsx`, `fr.ts`, `en.ts`)

No `src/` directory. No API routes. No server components in `components/`.

## Conventions

- **Dynamic imports**: Sections below the fold are lazy-loaded with `ssr: false`. New sections should follow this pattern.
- **Theming**: CSS custom properties (`--accent`, `--bg`, etc.) defined in `globals.css` for `:root` only. No dark mode toggle exists.
- **Font**: Fredoka — loaded via `next/font/google` with CSS variable `--font-main`. Used for body and hero text.
- **i18n**: All user-facing strings live in `lib/i18n/fr.ts` and `lib/i18n/en.ts`. Use `useI18n()` hook to access `t` and `lang`.
- **Path alias**: `@/*` maps to project root (configured in `tsconfig.json`).
- **No comments**: Do not add code comments unless explicitly asked.
- **Reduced motion**: Respect `useReducedMotion()` from framer-motion; guard all animations.

## Gotchas

- Next.js 16 — APIs may differ from your training data. Check `node_modules/next/dist/docs/` before adding Next.js features.
- Tailwind CSS v4 uses `@tailwindcss/postcss` plugin (not the v3 `tailwindcss` PostCSS plugin). No `tailwind.config.js` — config is in `globals.css` via `@theme inline`.
- `allowedDevOrigins` is set in `next.config.ts` for a specific IP. Do not commit secrets.
- Images: only `img.youtube.com` remote pattern is configured. Any new remote image domains must be added to `next.config.ts` `images.remotePatterns`.
- **Image optimization**: This is an image-heavy portfolio. Use `next/image` with proper sizing and lazy loading. Store portfolio images in `public/` and reference them with absolute paths.
