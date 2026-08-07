# Maple Furniture — Corporate Website

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion. Bilingual (English / Vietnamese), SEO-optimized, built for a furniture manufacturer serving Kitchen Cabinet, Hospitality, Hotel, Residential, and FF&E clients across the USA, Canada, Australia, and Europe.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

> **Windows + OneDrive note:** this project must live outside any OneDrive-synced folder. OneDrive's Files-On-Demand sync corrupts files inside `node_modules` (thousands of small files), which crashes the dev server with filesystem errors. Keep the working copy somewhere like `C:\dev\maple-furniture-web`.

## Project structure

```
src/
  app/[locale]/         Routes — every page is under /en or /vi
  app/api/inquiry/       Contact form submission endpoint
  components/            Reusable UI, layout, and section components
  content/                Typed content "database" — projects.ts, blog.ts, site.ts, types.ts
  i18n/                   Locale config + EN/VI dictionaries
  lib/                    Shared utilities (cn, date formatting, inquiry storage)
proxy.ts                  Redirects "/" to the visitor's preferred locale (en/vi)
public/downloads/         Company profile PDF
data/                     Runtime-only: submitted inquiries (gitignored, created on first submit)
```

### Editing content

All copy lives in two places:

- **UI chrome & page copy** (nav labels, headings, capability/process/quality/certification text): `src/i18n/dictionaries/en.ts` and `vi.ts`. Both files share the same shape — edit `en.ts`'s structure and mirror the change in `vi.ts`.
- **Structured data** (projects, blog posts, company stats/contact info): `src/content/projects.ts`, `src/content/blog.ts`, `src/content/site.ts`. Each entry is typed (`src/content/types.ts`) with bilingual fields, so it's straightforward to hand this data source off to a real CMS later without touching page components.

Project/blog images currently use [Lorem Picsum](https://picsum.photos) placeholder URLs (seeded, so they stay stable). Swap `coverImage`/`images` fields for real photography before launch — `next.config.ts` already allow-lists `images.unsplash.com` if you want to use Unsplash placeholders too.

### Categories

The project portfolio filters on five categories (`src/content/types.ts` → `ProjectCategory`): `kitchen`, `hospitality`, `hotels`, `residential`, `ffe`. `hospitality` covers restaurant/bar/spa/lobby (F&B and public space) programs; `hotels` covers in-guestroom casegoods. Adjust the split in `content/projects.ts` if your business defines these differently.

### Contact form

`POST /api/inquiry` validates submissions with `zod` and appends them to `data/inquiries.json` on the server's local disk. This works well on persistent Node hosting (a VPS, or Hostinger's Node.js App feature) but **will not persist on serverless platforms** like Vercel, where the filesystem resets between requests — swap `src/lib/inquiries.ts` for a database or email-forwarding service if deploying there.

## Deploying to Hostinger

Hostinger's shared/shared-with-Node plans and VPS plans both support running a Node.js process:

1. On Hostinger, create a **Node.js application** (hPanel → Websites → Node.js), or provision a VPS.
2. Push this repository to the server (Git deploy or `scp`/`rsync`).
3. `npm install && npm run build`.
4. Set the app's start command to `npm run start -- -p <port>` (or configure Hostinger's Node.js app entry point to `npm start`).
5. Point Hostinger's reverse proxy / domain to that port, and set `NEXT_PUBLIC_*` or server env vars as needed in the hPanel Node.js environment variables screen.
6. Confirm `data/` is writable by the app's process user so inquiry submissions persist.

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
