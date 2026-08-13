# Maple Furniture Website — Project Status

_Last updated: 2026-07-31. Read this first if picking up work in a new conversation —
it exists so a fresh session (or one after a context reset) can continue without the
client having to re-explain anything._

## Where the project lives

- **Working copy:** `C:\dev\maple-furniture-web` (NOT the OneDrive folder — OneDrive's
  sync corrupted `node_modules` early on, so the project was moved here. The OneDrive
  copy is stale/broken; ignore it. If the client drops new files into a OneDrive
  `public/` folder out of habit, check both locations.)
- **Live demo:** https://maple-furniture-web.vercel.app (deployed via Vercel CLI,
  account `nhatthien19122000-5511`, project `mapleweb/maple-furniture-web`).
  **This may be behind local changes** — the client is asked each time whether to
  redeploy; check git-independent by just re-running `npx vercel --yes --prod` from
  the project root if they say yes (no GitHub repo involved, CLI deploy only).
- **Local dev:** `cd C:\dev\maple-furniture-web && npm run dev -- -p 3000` →
  http://localhost:3000/en (client reviews changes live in-browser every time; don't
  consider a task done until verified in a real page load, not just build success).

## Stack

Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4 + Framer Motion.
Bilingual EN/VI via `src/i18n/`. No dark mode, no admin dashboard (explicitly dropped
by client request — don't reintroduce without asking). Minimalist black/white/
warm-wood ("wood" accent color) palette, no CMS/database — all content is typed
TS data in `src/content/` and `src/i18n/dictionaries/`.

## Company identity

- Logo: real client-provided asset, split into transparent PNG variants in `public/`
  (`logo-lockup.png` dark version, `logo-lockup-white.png` for dark/transparent header
  state, plus `logo-icon*` and `logo-full*` with tagline). Component:
  `src/components/layout/logo.tsx`. Header swaps light/dark logo automatically based
  on scroll position (transparent-over-hero vs solid state).
- Hero headline: "Maple Furniture Limited Company" — one line (forced `whitespace-nowrap`
  with a fluid clamp() font-size so it never wraps, even on mobile), vertically AND
  horizontally centered in the hero. Subtitle italic with a bold emphasis phrase.
  Exact copy in `src/i18n/dictionaries/en.ts` → `home.heroTitle` /
  `heroSubtitlePrefix/Emphasis/Suffix`. No eyebrow line above it (client asked to remove).
- Home hero background: `hero-home1.png` (client's real factory photo, color). Overlay
  gradient was lightened on request (`from-ink/55 via-ink/30 to-ink/10`, image at full
  opacity) — client wanted the photo's color visible, not washed to black.
- Both hero CTA buttons ("View Our Projects" / "Request a Quote") use the same
  outlined style (white border, transparent bg) — client asked them to match.
- Stats bar: 20+ projects, 5+ countries, 17,000 m² factory, 10 years
  (`src/content/site.ts` → `stats`, also mirrored into `factory.area`).

## About page

Rewritten per client-supplied exact copy (not the original AI-drafted "Our Story /
Our Mission / Values" version — that was fully replaced). Current structure: eyebrow
"About Us" → title "About Maple Furniture" → tagline "Modern Cabinetry & Furniture for
Contemporary Living" → intro paragraph → "Our expertise includes:" bullet list (5
items, one per category) → product range paragraph → capabilities paragraph (framed/
frameless, veneer, OEM/ODM) → bold closing tagline. Export/Delivery capability section
kept below as a secondary block. Dictionary: `dict.about` in both `en.ts`/`vi.ts` —
note the field names changed (`storyTitle`/`storyBody`/`missionTitle`/`missionBody`/
`valuesTitle`/`values` were all removed; new fields are `tagline`, `expertiseTitle`,
`expertise[]`, `rangeBody`, `capabilitiesBody`, `closingTagline`).

## Category system (5 categories — final, do not re-derive from scratch)

`multifamily` | `seniorLiving` | `hospitality` | `publicSpaces` | `luxuryResidential`

Defined in `src/content/types.ts` (`ProjectCategory`). Labels/descriptions in both
dictionaries under `categories` / `categoryDescriptions`. The 5 "What We Build" home
cards + Capabilities page images: `src/content/capability-images.ts` → real client
photos (`cap-*.jpg` in `public/`), displayed at 3:4 aspect ratio consistently on both
pages (client asked for this — don't reintroduce a 4:3 crop on the Capabilities page).

## Projects data (`src/content/projects.ts`) — REAL client data, not placeholder

**21 real projects** (added "Thrive at Green Mountain" to Multifamily on 2026-07-30),
replacing an earlier set of 11 fictional example projects (fully removed). This is the
client's actual project database, given to us as a flat list of name + category +
address (often no address for some entries). Structure:

- `buildProject()` helper generates summary/description/scope/materials from
  **category-level generic templates** (`categoryContent` object) — these are honest,
  non-fabricated capability statements, NOT invented project-specific claims (we don't
  know real scope/materials per project beyond name + address, so don't guess and
  write it in as fact).
- `location` and `year` are optional on `Project` (`src/content/types.ts`) — many real
  projects have no address or year given. UI (`ProjectCard`, project detail page)
  conditionally renders these; don't make them required again.
- **Featured on homepage (3, in array order = display order):** Scott Residence,
  Cambria at Colorado, Perry District Apartments — all three have real multi-photo
  galleries.

### ⚠️⚠️ TWO data-loss incidents (2026-07-30 and 2026-07-31) — read before touching image folders again

**This has now happened twice in 24 hours.** Both times, previously-renamed
`project-*.ext` gallery files vanished from `public/` between one tool call and the
next, while the original client source folders survived. On 2026-07-31 this was
traced to **a second concurrent Claude Code session/chat window open on this exact
same `C:\dev\maple-furniture-web` directory** (confirmed via the harness itself
flagging "another chat's dev server is running in this folder"). Two sessions
editing/deleting the same `public/` files at the same time is almost certainly the
actual root cause of BOTH incidents, not OneDrive sync or Turbopack.

**If you are picking up this project and another Claude Code chat may still be open
on `C:\dev\maple-furniture-web`, ask the client to close it before doing any file
work.** Running two sessions against the same working copy concurrently WILL cause
files to randomly appear/disappear again.

Recovery approach both times: source folders (`GRALAND`, `HAWKS`,
`JADWIN MULTI-FAMILY`, `SCOTT RESIDENCE`, `SEAN`, `TRAVIS HOUSE`,
`TW CLARK EAST WENATCHEE 2ND STREET`, `TW CLARK – PERRY DISTRICT APT`,
`WENATCHEE RIVERFRONT`, `PHOTO - PUBLIC SPACE`, plus the newer per-project folders)
were re-copied into `public/` fresh, renumbered sequentially from 1
(`projectGallery(slug, [exts])` helper), skipping unsupported formats (`.tiff` — not
web-renderable) and obvious duplicate files (e.g. `"17 - Copy.jpg"`, `"6 - Copy.png"`).
**Per explicit client instruction (2026-07-31, "vui lòng không lưu hình ra khỏi thư
mục"), source folders are now always COPIED from, never moved or deleted** — this
also means they're preserved as a natural backup if this happens a third time.
After each recovery, every image path in `projects.ts` was verified against disk with
a script before calling it done — do this again if files vanish again, don't assume.

**Permanent, unrecoverable losses so far:**
- `project-hiend-residential.png` (walnut home-office render, was Scott Residence's
  original cover) and `project-perry-district.png` (kitchen photo, was Perry
  District's original cover) — both were standalone uploads from early in the
  conversation, before folder-based galleries existed, and were never in any source
  folder. Both projects now use the first photo of their folder gallery as cover
  instead (`buildProject()`'s `cover = coverImage ?? gallery[0]` fallback).
- **`thrive-at-green-mountain`'s entire gallery (7 photos)** — lost in the 2026-07-31
  incident with **no source folder anywhere on disk to recover from** (unlike every
  other project). This project currently has **zero photos** and falls back to the
  category card image. The client has not yet been told about this specific loss —
  flag it and ask them to re-upload the "Thrive at Green Mountain" folder if picking
  this back up.

**Lesson learned:** when a client folder contains a cover-designation file named "Dai
Dien" / "Đại diện" (Vietnamese for "representative"), treat it as image #1 (cover) —
this convention now appears in most of the newer project folders.

### Real photo galleries (21 of 21 projects have real client photos)

| Project (slug) | # images | Source folder |
|---|---|---|
| `hiend-residential-house-arizona` (Scott Residence) | 13 | "SCOTT RESIDENCE" (original standalone cover lost) |
| `sean-residence` | 5 | "SEAN" |
| `travis-residence` | 7 | "TRAVIS HOUSE" |
| `hawks-residence` | 15 | "HAWKS" |
| `garland-apartments` | 5 | "GRALAND" (Dai Dien cover) |
| `jadwin-multi-family` | 7 | "JADWIN MULTI-FAMILY" (Dai Dien cover) |
| `wenatchee-riverfront-multi-family` | 10 | "WENATCHEE RIVERFRONT" |
| `east-wenatchee-1st-street` | 15 | "TW CLARK EAST WENATCHEE 2ND STREET" |
| `perry-district-apartments` | 14 | "TW CLARK – PERRY DISTRICT APT" (original standalone cover lost) |
| `cambria-hotel-colorado` (Cambria at Colorado) | 14 | "CAMBRIA AT COLORADO" (Dai Dien cover, .webp) |
| `cambria-hotels-public-spaces` | 22 | "CAMBRIA HOTEL - PUBLIC SPACE" (Dai Dien cover) — client's own dedicated folder, replaces the old arbitrary 8/8 split of the shared "PHOTO - PUBLIC SPACE" folder (that folder no longer exists, was renamed/replaced by this one) |
| `fairfield-by-marriott-public-spaces` | 16 | "FAIRFIELD BY MARRIOTT - PUBLIC SPACE" (own dedicated folder of 16 screenshots, no Dai Dien — first image used as cover) |
| `clarkston-family-haven` | 8 | "CLARKTON" (Dai Dien cover) |
| `affinity-at-badger-mountain` | 18 | "AFFINITY AT BADGER MOUNTAIN" (Dai Dien cover; shares ~15 generic/reference images with the Missoula folder — only the Dai Dien cover + "Exterier.png" are unique to this property) |
| `affinity-at-missoula` | 19 | "AFFINITY AT BADGER MISSOULA" (Dai Dien cover; shares generic images with the Mountain folder — only Dai Dien + 3 "bend-*.jpg" files are unique) |
| `fairfield-by-marriott-chicago` | 6 | "FAIRFIELD BY MARRIOTT" (Dai Dien cover; 2 source `.jfif` files renamed `.jpg` — they're valid JPEG data, confirmed via `file`) |
| `swiftwater` | 6 | "SWIFTWATER" (Dai Dien cover; 1 `.jfif`→`.jpg` renamed, 1 genuine `.webp` kept as-is) |
| `sandpiper` | 5 | "SANDPIPER" (Dai Dien is a genuine `.webp`, kept as cover) |
| `cq-midtown` | 5 | "CQ MIDTOWN" (Dai Dien cover) |
| `thrive-at-green-mountain` | 7 | "THRIVE AT GREEN MOUNTAIN" (re-supplied 2026-08-01 after loss; no Dai Dien, first photo is cover) |

Image files are named `project-<slug>-<n>.<ext>` in `public/`. When the client drops a
new folder of photos into `public/`, **always inspect file contents first**
(`ls`/`Read` a sample image) before guessing which project it belongs to — folder
names have been abbreviated/misspelled (e.g. "GRALAND" = Garland, "TW CLARK..." =
architect/builder name prefix) and are not always self-evident. Ask the client to
confirm if genuinely ambiguous.

**All 21 projects now have real client photos.** Thrive at Green Mountain's gallery
was re-supplied by the client on 2026-08-01 (7 photos, folder "THRIVE AT GREEN
MOUNTAIN", no Dai Dien this time — first photo used as cover) after the original was
lost in the incident above.

### Resolved as of 2026-07-31

- **`2ND AVE MULTI-FAMILY`**: client confirmed (despite being byte-identical to
  `WENATCHEE RIVERFRONT`) to go ahead and use it — now wired in as
  `2nd-ave-multi-family`'s gallery (10 images, mirrors Wenatchee's set exactly, Dai
  Dien used as cover). Client is aware both projects show the same photos.
- **Scott Residence cover**: client added a new `Dai Dien.png` into the
  `SCOTT RESIDENCE` folder (replacing what was numbered `13.png`) specifically to
  restore a real representative image after the standalone cover photo was lost —
  now used as `hiend-residential-house-arizona`'s cover (image #1 of 13).
- **`FACTORY PRODUCTION PHOTOS`**: client said not to worry about this folder — leave
  unused for now.

### Still open

Nothing on photos — all 21 projects have real photos and every prior open item has
been resolved as of 2026-08-01.

## Real project content (descriptions, scope, scale, status) — 2026-08-01

Client supplied real reference screenshots (from what looks like their own project
database/CRM export) with actual description copy, "Project Scope", "Project Scale"
(units/cabinets/LF), and "Status" (completion year) for 13 of the 21 projects. This
replaced the generic category-template description for those 13 — the other 8 still
use the generic `categoryContent` template text (honest but non-specific).

- **Schema change:** `Project` (`src/content/types.ts`) gained an optional
  `scale?: LocalizedText` field. `buildProject()` (`src/content/projects.ts`) now
  accepts optional `description`, `scope`, `scale`, `year` overrides — when omitted it
  falls back to the category template as before, so untouched projects are unaffected.
- **UI change:** project detail page (`src/app/[locale]/projects/[slug]/page.tsx`)
  gained a "Project Scale" sidebar block (only rendered when `project.scale` is set)
  and the old "Year" block was relabeled "Status" / "Trạng Thái", now rendering
  "Completed in {year}" / "Hoàn thành năm {year}" instead of a bare year — this
  applies site-wide, not just the 13 updated projects. Description paragraph now uses
  `whitespace-pre-line` so `\n\n` in the content creates real paragraph breaks (used
  by the multi-paragraph entries).
- **Names updated to match client's authoritative content:** `clarkston-family-haven`
  → "Holy Family Haven", `garland-apartments` → "Garland Multi-Family",
  `wenatchee-riverfront-multi-family` → "Wenatchee River Front Multi-Family",
  `east-wenatchee-1st-street` → "Wenatchee East Multi-Family". Slugs/URLs unchanged.
- **One factual fix applied:** the client's Affinity at Missoula copy was a template
  that said "Richland, Washington" (copy-pasted from the Badger Mountain entry) —
  Missoula is in Montana, not Washington, so this was corrected to "Missoula,
  Montana" in both languages. Other templated city mentions (e.g. "Spokane,
  Washington" reused across several Spokane-region multifamily projects) were left
  verbatim since they're not geographically impossible, just generic.
- **Projects updated:** Holy Family Haven, Garland Multi-Family, Wenatchee River
  Front Multi-Family, Jadwin Multi-Family, Wenatchee East Multi-Family, Affinity at
  Badger Mountain, Affinity at Missoula, Cambria at Colorado, Swiftwater, Sandpiper,
  CQ Midtown, Cambria Hotels (public-spaces entry), Scott Residence.
- **Not covered by client's screenshots (still generic template content):** 2nd Ave
  Multi-Family, Perry District Apartments, Thrive at Green Mountain, Fairfield by
  Marriott (both entries), Travis Residence, Hawks Residence, Sean Residence. If the
  client sends more reference content later, follow the same pattern: pass
  `description`/`scope`/`scale`/`year` overrides into the relevant `buildProject()`
  call.

## Factory page — real photos + "Manufacturing Excellence" content (2026-08-01)

Client supplied 15 real factory photos (folder "Our Factory in Vietnam" — exterior
building shots, entrance sign confirming the real address "Lot 19, D4 Str, Chau Duc
IP, Chau Duc District, BR–VT Province, Vietnam", CNC machining floor, finishing/spray
area) plus a reference screenshot with real "Manufacturing Excellence" copy. Copied to
`public/factory-1.jpg` through `factory-15.jpg` (source folder kept, not deleted, per
the no-delete workflow).

- `src/app/[locale]/factory/page.tsx`: hero image now `factory-1.jpg` (was picsum);
  new "Manufacturing Excellence" section added right after the stats bar (2-column:
  body copy + 3 highlight cards on the left — Cai Mep Port, Long Thành Airport,
  Industrial Zone — paired with `factory-6.jpg` on the right); new "Our Facility"
  photo grid section (12 more real photos) added between that and the existing
  8-step workflow section; the dark CTA section's picsum image replaced with
  `factory-15.jpg`. All 15 supplied photos are now used somewhere on the page.
- `src/content/site.ts` → `factory` stats updated to match the new real figures from
  the client's copy: `area` 17,000 m² → **175,000 sq.ft** (same size, client just
  gave sq.ft instead of m² this time), `capacity` "1,200 rooms/month" →
  **"10,000 cabinets/month"**, `staff` "650+" → **"150+"** (client's new copy
  explicitly says "150 skilled employees" — updated the stat bar to avoid
  contradicting the paragraph directly below it on the same page). `lines` ("9") left
  unchanged, no new data given for it.
- Dictionary additions (`dict.factory` in both `en.ts`/`vi.ts`): `excellenceTitle`,
  `excellenceBody` (uses `\n\n` + `whitespace-pre-line`, same pattern as project
  descriptions), `excellenceCards[]`, `galleryTitle`.
- **Stat bar wrapping fix (2026-08-01):** `siteConfig.factory.capacity` was
  "10,000 cabinets / month" — too long for the 4-column stat bar, wrapped to 3 lines
  and threw off vertical alignment vs. the other short stats. Shortened the value to
  just `"10,000"` and moved the unit into the label (`statsCapacity`: "Monthly Output
  Capacity" → "Cabinets / Month"). Also added `whitespace-nowrap` to the value text in
  `src/components/ui/stat.tsx` (shared by the Home and Factory stat bars) so this
  can't silently wrap again — keep future stat values short (a few characters) since
  nowrap means an overly long value would overflow its column instead of wrapping.

### Image display convention — client explicitly wants NO cropping

`ProjectCard` (grid thumbnails, `aspect-[4/3]`) and the project detail gallery
(`aspect-[16/10]` for the first/hero image, `aspect-[4/3]` for the rest) both use
`object-contain` (not `object-cover`) with a `bg-surface-muted` letterbox background.
This was a deliberate change from the original `object-cover` — the client's real
interior photos were getting cropped and losing content. **Do not switch back to
`object-cover` on project images** without asking; it directly contradicts client
feedback. (Non-project images elsewhere on the site, e.g. hero banners, still use
`object-cover` intentionally — that distinction is fine.)

## Manufacturing Process content

Homepage "How We Work" + `/manufacturing-process` page use a 5-step "From Concept to
Production" structure (BOQ & Cost Estimation → Shop Drawing Development → 3D
Rendering & Visualization → Prototype & Mock-Up → Manufacturing & Project Delivery),
plus a "Design & Engineering Support Included" callout box and a closing italic quote.
This replaced an earlier 8-step factory-floor version, per a client-supplied reference
screenshot (apparently from another real company's site) — copy was rewritten in
original wording, not copied verbatim, for copyright reasons; only the structure/
topics were reused. Dictionary: `dict.process` (now has `includedTitle`,
`includedBody`, `quote` fields in addition to `steps`).

## Known technical gotchas hit this session (avoid repeating)

- **This machine's dev server dies every time `next build` runs** (separate `.next`
  build output vs `.next/dev`, but the port doesn't always free itself). After any
  production build, always: free port 3000 (PowerShell
  `Get-NetTCPConnection -LocalPort 3000 | Stop-Process -Force`), then
  `rm -rf .next` if you see a `JSON.parse` / manifest error on restart, then
  `npm run dev -- -p 3000` backgrounded.
- **Tailwind v4 cascade layers**: a global `* { border-color: ... }` reset MUST be
  wrapped in `@layer base { ... }` (see `globals.css`) — an unlayered rule silently
  overrides every `border-*` utility class site-wide (this was a real bug found and
  fixed; a border-white/50 button was rendering gray until this was fixed).
- **OneDrive + Turbopack**: don't ever move this project back into a OneDrive-synced
  folder — confirmed file corruption in `node_modules` breaks the dev server in ways
  that are hard to diagnose (phantom "module not found" for files that exist).
- Browser-tool tabs used across a long session can hold stale JS/console state after
  multiple dev-server restarts — if console errors look inconsistent with the actual
  server-rendered HTML (check via `curl` or a fresh tab), it's the tab, not the site.

## Known limitations to flag if asked

- **Git + GitHub**: this project now HAS a git repo, remoted to
  `https://github.com/nhatthien19122000-collab/Maple-web` (client created the repo
  themselves, 2026-08-07; I don't know exactly when local git was initialized —
  discovered already-linked and in sync partway through a session). Commit and push
  after every change the client confirms, same as the existing "always ask before
  Vercel deploy" habit — see workflow notes below.
- Blog post cover images and most page hero backgrounds (About, Capabilities,
  Quality, etc.) are still Picsum placeholders, not real client photos (Factory page
  hero is now real, see below).
- Company profile PDF (`public/downloads/`) is an AI-generated placeholder, not a
  real company document.
- `careersEmail` in `src/content/site.ts` is `careers@maplefurniture.vn` — domain is
  now real (confirmed via the client's own contact reference) but the `careers@`
  mailbox name itself is inferred/not explicitly confirmed by the client.

## Real contact info (2026-08-01)

Client supplied real contact details via a reference screenshot. `src/content/site.ts`
updated: `email` → `lam@maplefurniture.vn`, `phone` → `(0084) 908 186 798` (new field
`phoneRole: "CEO"` added and rendered next to it), `whatsapp` → `+84908186798` (assumed
same as the CEO phone, not separately confirmed), `domain` → `maplefurniture.vn`,
`address` → `Lot 9, D4 Street, Chau Duc Industrial Park, Nghia Thanh Ward, Ho Chi Minh
City, Vietnam, 790000` (also updated `mapEmbedSrc`/`mapLinkSrc` to match). Propagates
automatically to `Footer` and the Contact page (both use `siteConfig`, no hardcoded
duplicates found).

**Note a factual tension, not yet resolved:** the physical factory entrance sign
(visible in one of the real factory photos, `factory-2.jpg`) reads "Lot 19, D4 Str,
Chau Duc IP, Chau Duc District, BR – VT Province, Vietnam" — different lot number
("19" vs "9") and different province/city ("BR–VT Province" vs "Ho Chi Minh City")
than what the client's contact screenshot said. Went with the client's explicit
contact-info instruction as authoritative (it's plausible this reflects Vietnam's
2025 administrative boundary changes merging BR–VT into an expanded Ho Chi Minh
City), but this was not explicitly cross-checked with the client — flag it if a
future session needs to touch the address again.

Contact page (`src/app/[locale]/contact/page.tsx`) restructured: "Factory Location"
block (address only) + new "Reach out directly" block (phone with CEO role label,
email, and two new action buttons "Send Email" / "Call Now" — dict keys
`reachTitle`/`sendEmailCta`/`callNowCta` in both `en.ts`/`vi.ts`). `officeTitle`
relabeled "Factory & Head Office" → "Factory Location" to match the client's copy.

## Luxury Residential projects anonymized (2026-08-07)

Client's own end-customers did not authorize using their real names publicly (site
was already live/shared with the boss by this point). Renamed all 4 Luxury
Residential entries in `src/content/projects.ts` — **both the display `name` AND the
URL `slug`** (the slug matters just as much as the name: a real client's surname
sitting in a public URL defeats the point of anonymizing the display name):

| Project id | Old name / slug | New name / slug | Location now shown |
|---|---|---|---|
| p17 | Scott Residence / `hiend-residential-house-arizona` | **Ashford Residence** / `ashford-residence` | Arizona, USA |
| p18 | Travis Residence / `travis-residence` | **Aurelia Residence** / `aurelia-residence` | Washington, USA |
| p19 | Hawks Residence / `hawks-residence` | **Sterling Residence** / `sterling-residence` | Oregon, USA |
| p20 | Sean Residence / `sean-residence` | **Weston Residence** / `weston-residence` | Washington, USA |

Full street addresses were replaced with state-only (per client instruction — these
4 should only show state, unlike other projects which still show full address).
`id` fields (p17–p20) and the underlying image gallery filenames
(`project-travis-residence-*.png` etc., passed as the first arg to `projectGallery()`)
were deliberately left unchanged — they're not client-facing text, just internal
plumbing, so renaming them would've been pure churn/risk with no privacy benefit.

**Note:** old URLs (e.g. `/en/projects/hiend-residential-house-arizona`,
`/en/projects/sean-residence`) now 404 — no redirect was set up from old→new slugs.
Not an issue for this demo/pre-launch site, but worth knowing if the old links were
ever shared externally and need a redirect added later.

Verified via `tsc`/`eslint`/`build`, live dev-server browser check (Portfolio page
filtered to Luxury Residential + Home page's featured-projects section, which
surfaces Ashford Residence since it's `featured: true`), then deployed to Vercel
production immediately per explicit client instruction ("để public luôn").

**Vercel CLI note:** in this shell/session, `npx vercel --yes --prod` failed with
`"Not authorized"` even though `vercel whoami` correctly showed the logged-in
account (`nhatthien19122000-5511`) and `vercel project ls` could see the project
fine — the CLI wasn't resolving the team scope from `.vercel/project.json`
automatically. Fixed by adding `--scope mapleweb` explicitly:
`npx vercel --yes --prod --scope mapleweb`. If a future session hits the same
"Not authorized" error on an otherwise-correctly-linked project, try this flag
before assuming the account lost access.

## ⚠️ TWO working copies exist — read this before running dev server / builds

As of 2026-08-10, this environment's actual "primary working directory" (where the
Browser preview tool's `preview_start` launches `next dev` from, per `.claude/launch.json`)
is **`C:\Users\Dell Precision 5820\OneDrive - MAPLE FURNITURE\Claude\maple-furniture-web`**
— a SEPARATE, ORIGINAL OneDrive copy, not `C:\dev\maple-furniture-web`. All actual
editing in this and prior sessions has been done in `C:\dev\maple-furniture-web` (the
relocated copy from the original node_modules-corruption incident, see below), and
verified there via Bash + `curl`. The OneDrive copy sat untouched/stale since ~Jul 29
and its `node_modules` was missing the `next` binary entirely (install never
completed there, or was wiped by OneDrive's file-locking behavior).

**Until this is properly consolidated, every session that needs the Browser preview
tool must, after editing `C:\dev\maple-furniture-web`:**
```
robocopy "C:\dev\maple-furniture-web" "C:\Users\Dell Precision 5820\OneDrive - MAPLE FURNITURE\Claude\maple-furniture-web" /MIR /XD node_modules .next .vercel .git /XF *.log /NFL /NDL /NJH /NJS /NC /NS
```
(exit code 1 or 3 = success, robocopy's codes are a bitmask, not standard 0/nonzero)
— then `npm install` there if `package.json`/`package-lock.json` changed (e.g. a new
dependency like `nodemailer` was added) before calling `preview_start`. Forgetting
this step means the Browser pane silently shows STALE content from before your
edits — always re-check page content after a preview restart, don't assume freshness.

**The actual git repo and Vercel deploys both operate on `C:\dev\maple-furniture-web`**
— that copy is the real source of truth for what's live; the OneDrive copy exists
only so the harness's Browser preview tool has something to launch. A future session
should ideally figure out why `.claude/launch.json`'s primary directory doesn't point
at `C:\dev\maple-furniture-web` and fix that properly instead of continuing this sync
dance, but that wasn't investigated yet.

## Git + email wiring (2026-08-10)

- **Contact form now actually emails someone — DONE and verified live.** Previously
  `POST /api/inquiry` only wrote to `data/inquiries.json` — harmless in local dev, but
  silently useless on Vercel (ephemeral filesystem, nothing ever reached the CEO).
  `src/lib/mailer.ts` sends via **Resend's REST API** (plain `fetch`, no SDK
  dependency) to `CONTACT_TO_EMAIL`; wired into `src/app/api/inquiry/route.ts` — if
  the email send fails, the API returns an error (502) instead of a false "success",
  so the frontend's existing fallback message ("please email/call us directly")
  kicks in correctly instead of silently losing the lead.
  - **Office 365 SMTP was tried first and abandoned**: the client's Microsoft 365
    tenant has **Security Defaults enabled**, which blocks legacy app passwords
    entirely (no "App password" option appears under Security info → Add sign-in
    method) — this is an org-wide tenant policy, not something to work around from a
    single mailbox. Don't re-attempt SMTP app-passwords for this tenant without the
    client's IT/admin changing that policy first.
  - **Env vars**: `RESEND_API_KEY`, `CONTACT_TO_EMAIL=lam@maplefurniture.vn` — in
    `.env.local` (git-ignored, real key already filled in locally) and set on
    **Vercel → Production** via `vercel env add <name> production --scope mapleweb`
    (the `--scope mapleweb` flag is required, see the Vercel CLI note further up this
    file). Template lives in `.env.local.example` (git-tracked; `.gitignore` has an
    explicit `!.env.local.example` exception since the blanket `.env*` rule would
    otherwise ignore it too).
  - **Sender address is Resend's shared sandbox domain** (`onboarding@resend.dev`),
    not `lam@maplefurniture.vn` — this works today because Resend's free/unverified
    tier can only deliver to the same address that owns the Resend account, and that
    happens to already be `lam@maplefurniture.vn` (same as `CONTACT_TO_EMAIL`), so it
    lines up by coincidence. **If the "to" address ever needs to change to someone
    else, delivery will silently stop working** until the client verifies
    `maplefurniture.vn` as a sending domain in Resend (adds a few DNS records) — flag
    this if asked to change who receives inquiries.
    - **This happened 2026-08-13**: client asked to also send to
      `Rnd@maplefurniture.vn`. Tested locally first — Resend rejected the whole send
      (403, "You can only send testing emails to your own email address") when a
      second recipient was added, which would have silently broken delivery to
      `lam@` too if deployed. Started the domain-verification flow (client began
      adding Resend's DKIM/SPF DNS records) but then asked to switch to Gmail
      instead rather than wait on DNS — **see the Gmail SMTP entry below, which
      superseded this Resend integration entirely.** The domain-verification DNS
      records may or may not have been completed; irrelevant now since Resend is no
      longer used, but if Resend ever comes back into play, check whether those
      records are still sitting in the DNS zone unused.
  - Verified end-to-end 2026-08-10: real test submissions confirmed `ok:true` both
    against local dev and the live `https://maple-furniture-web.vercel.app` after
    deploying with the Vercel env vars set — **and the client confirmed the test
    emails actually landed in the `lam@maplefurniture.vn` inbox.**
  - **Follow-up bug, same day**: client then submitted the real form from their own
    browser and got the frontend's "something went wrong" error — but `vercel logs`
    showed the server-side request completed with NO email error both times. Root
    cause: `POST /api/inquiry` was `await`-ing the full Resend API round-trip before
    responding, so on the client's specific network the browser's `fetch()` would
    fail/appear to error before the (successful) response arrived — a false failure,
    not a real one. **Fixed by wrapping the save+email work in Next.js's `after()`**
    (`src/app/api/inquiry/route.ts`) so the API responds `200 {ok:true}` immediately
    and the email send happens in the background after the response is already sent.
    Local response time dropped from "however long the Resend round-trip takes" to
    ~20-30ms; live (cross-region) to ~1.4s, both well clear of typical browser fetch
    timeouts. **Trade-off accepted**: if the background email send ever genuinely
    fails now, the client no longer sees an error (they always get `ok:true`) — this
    was judged acceptable since real server-side email failures haven't been observed
    in practice (every failure so far was client-side network, not the send itself),
    and it directly fixes a real, reproduced false-negative that was actively
    confusing/worrying the client on the live site. If inquiries seem to go missing
    in the future, check Vercel function logs for `sendInquiryEmail` errors — the
    client will NOT see them anymore.
  - **⚠️ SUPERSEDED 2026-08-13 — see "Gmail SMTP switch" entry directly below.**
    Everything above this line describes the Resend integration, which is no longer
    what's live. Kept for history/context (the `after()` fix and false-failure
    lesson still apply regardless of which provider sends the email).

## Gmail SMTP switch (2026-08-13) — CURRENT email provider, not yet deployed

- **Why**: client asked to also notify `Rnd@maplefurniture.vn` in addition to
  `lam@maplefurniture.vn`. Resend's unverified sandbox domain can only deliver to
  the account owner's own address — adding a second recipient made Resend reject
  the *entire* send (confirmed locally: 403 "You can only send testing emails to
  your own email address"), which would have broken delivery to `lam@` too, not
  just failed to add `Rnd@`. Domain verification (DNS records) was offered as the
  proper fix and the client started that in Resend, but then asked to switch to
  Gmail instead rather than wait on DNS propagation — simpler, and Gmail SMTP has
  no such recipient restriction.
- **What changed**: `src/lib/mailer.ts` rewritten to use `nodemailer` over Gmail
  SMTP (`nodemailer.createTransport({ service: "gmail", auth: { user, pass } })`)
  instead of Resend's REST API. `nodemailer` + `@types/nodemailer` reinstalled
  (had been removed when Resend replaced the original Office 365 SMTP attempt —
  see the irony of coming back to SMTP after all). `route.ts` and the `after()`
  background-send pattern are UNCHANGED — only the transport inside `mailer.ts`
  differs.
- **Sender account**: `rnd.team.maple@gmail.com` (client's choice, dedicated Gmail
  for this purpose, not a personal inbox) — this is the `GMAIL_USER` env var and
  also appears as the visible "from" name/address on notification emails.
- **Env vars** (replacing `RESEND_API_KEY`): `GMAIL_USER`, `GMAIL_APP_PASSWORD`,
  `CONTACT_TO_EMAIL` (now `lam@maplefurniture.vn,Rnd@maplefurniture.vn` — comma-
  separated list, `mailer.ts` splits on `,` and trims whitespace). Template in
  `.env.local.example`, updated to match.
- **`GMAIL_APP_PASSWORD` is a Google "App Password"**, not the account's normal
  login password — requires 2-Step Verification enabled on the Gmail account first
  (myaccount.google.com/security → 2-Step Verification → App passwords). Client
  chose to fill `.env.local` themselves rather than share the password in chat
  (same self-service pattern as the earlier Office 365 attempt) — as of this
  writing `.env.local` has `GMAIL_USER` filled in but `GMAIL_APP_PASSWORD` blank.
- **⚠️ NOT YET DEPLOYED TO VERCEL — this is the critical open item.** Code is
  committed and pushed to GitHub (commit `f7f4b0b`), but `vercel --prod` has NOT
  been run since this change, and Vercel's production env vars still only have the
  old `RESEND_API_KEY`/`CONTACT_TO_EMAIL` (single address) from the previous setup.
  **Do not deploy until:**
  1. Client fills in `GMAIL_APP_PASSWORD` in local `.env.local` (or provides it) —
     verify locally first with a real test submission before touching Vercel.
  2. Add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL` (both addresses) to
     **Vercel → Production** via `vercel env add <name> production --scope
     mapleweb` (remove/overwrite the old `RESEND_API_KEY` env var, no longer used
     — leaving it doesn't hurt anything but it's dead weight).
  3. `vercel --yes --prod --scope mapleweb`, then send a real test inquiry against
     the live URL and confirm delivery to BOTH `lam@` and `Rnd@` before telling the
     client it's done — deploying with the password missing would silently break
     the contact form (same `after()` trade-off as before: client sees no error).
  Verified locally 2026-08-13 that the code correctly throws/logs "Email is not
  configured" server-side (not shown to the client) when `GMAIL_APP_PASSWORD` is
  blank — confirms the code path works, just waiting on the real password.
- **Real PDFs added**: `public/downloads/maple-furniture-cabinet-brochure.pdf` and
  `maple-furniture-introduction-2026.pdf` (client-supplied, real) replaced the old
  AI-generated placeholder `maple-furniture-company-profile.pdf` (deleted). Contact
  page now has two separate download links (`dict.contact.brochureCta`/`introCta`),
  opened in a new tab (`target="_blank"`) rather than force-downloaded, since the
  client wants customers to be able to view them, not just save them.
- **Git repo confirmed working**: remoted to
  `https://github.com/nhatthien19122000-collab/Maple-web`, on `main`, commit history
  intact. Always `git add`/`commit`/`push` (in `C:\dev\maple-furniture-web`) after the
  client confirms a change, mirroring the existing "ask before Vercel deploy" habit —
  ask before pushing too, though in practice the client has been asking for both
  together lately ("push GitHub luôn" / "để public luôn").

## Workflow notes for future sessions

- Client communicates in Vietnamese; respond in Vietnamese.
- Client sends reference images (competitor sites, real project photos, logos) and
  expects them either reproduced faithfully (real photos — extract exact file, never
  redraw/regenerate) or adapted in spirit with original wording (competitor marketing
  copy — never copy verbatim, rewrite in our own words, same structure/topics only).
- To receive new images from the client: ask them to save the file(s)/folder(s)
  directly into `C:\dev\maple-furniture-web\public\` (pasted chat images are NOT
  accessible as files — always ask for the file to be dropped into `public/`).
  Always inspect actual contents before wiring up (don't trust folder/file names
  alone) and **copy** (never move) into the `project-<slug>-<n>.<ext>` convention.
  **Per explicit client instruction (2026-07-31), NEVER delete the original
  source folder after copying** — this was the old workflow and is now retired;
  keeping source folders in place is also what made the two data-loss incidents
  above recoverable at all.
- **Before doing file work in `public/`, check whether another Claude Code chat
  might be open on this same project** — two concurrent sessions editing the same
  directory is the confirmed cause of at least one of the data-loss incidents above.
  If in doubt, ask the client to confirm only one session is active.
- Always verify changes with `npx tsc --noEmit`, `npx eslint .`, `npm run build`, AND
  a real dev-server browser check before calling something done — this client
  actively tests the live site after every change and catches visual issues fast.
- After making changes, ask the client whether to redeploy to Vercel (`npx vercel
  --yes --prod`) — don't deploy automatically without asking each time.
