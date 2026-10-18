# Task List: NUSWARA Implementation & Full-Stack Audit

## Phase 1: Planning and Foundations
- [x] Task 1: Initialize planning & task breakdown files (`tasks/plan.md`, `tasks/todo.md`)
- [x] Task 2: Refine design system & metadata (fix `layout.tsx` metadata titles, ensure zero em dashes, verify typography)

## Phase 2: Visual Redesign (Reference 1 & 2)
- [x] Task 3: Redesign Hero in `src/app/page.tsx` to match Reference 1 faithfully
  - Left-aligned title block: `MUSEUM DIGITAL JAWA TENGAH` eyebrow with horizontal rule
  - Classical serif `NUSWARA` headline, `Menelusuri Jejak, Merawat Warisan.` subtitle
  - Antique gold CTA button `Jelajahi Jawa Tengah →`
  - Right-side full-height majestic Wayang Kulit shadow figure over mountain backdrop
  - Bottom exhibition metadata bar (`PAMERAN BUDAYA • 2026`, `GULIR UNTUK MENELUSURI ↓`, `MERAPI • BOROBUDUR`)
  - Remove generic placeholder stat pills from the hero
- [x] Task 4: Polish editorial sections in `src/app/page.tsx`
  - Section 1: Warisan Manifesto (`Warisan bukan hanya masa lalu. Ia hidup di antara kita.`)
  - Section 2: Sejarah Mataram (Warm Ivory / Parchment) with Relief image and era timeline
  - Section 3: Tokoh Bangsa (Dark Obsidian) with Kartini, Diponegoro, Dewantara
  - Section 4: Wayang Kelir (Warm Amber) with Pakeliran philosophy narrative
  - Section 5: Seni Batik (Warm Ivory / Parchment) with Parang, Kawung, Truntum & Canting
  - Section 6: Kuliner Jawa (Dark Obsidian) with Lumpia, Nasi Liwet, Mendoan
  - Section 7: Monumen Keabadian (Dark Obsidian) with Borobudur, Dieng
  - Section 8: Closing Preservation Manifesto with CTA
  - Fix all em dashes (`—`) in copy
- [x] Task 5: Refine `Navbar.tsx` and `Footer.tsx` navigation
  - Update top links to match Reference: `Beranda`, `Tokoh`, `Sejarah`, `Budaya`, `Kuliner`, `Tempat Sakral` + interactive actions
  - Ensure zero em dashes in comments and markup

## Checkpoint: Core Pages & Visual Polish
- [x] Application compiles without errors (`npm run build` or dev server check)
- [x] Hero matches Reference 1 visual composition

## Phase 3: Interactive Feature Theme Integration & Sub-Pages
- [x] Task 6: Audit & style interactive clients in unified layout
  - WayangpediaClient (Search, filters, character cards, modal)
  - FamilyTreeClient (Cytoscape/SVG family tree graph in dark gold container)
  - LakonHubClient (Story chapters, reader view)
  - OracleClient (Weton calculator, result card)
  - ManifestationClient (Daily card draw, affirmation)
  - PhotoboothClient (Webcam, frames, 4-cut strip)
- [x] Task 7: Update sub-pages and error pages
  - `src/app/wayangpedia/[slug]/page.tsx`
  - `src/app/share/[code]/page.tsx`
  - `src/app/lakon/[slug]/page.tsx`
  - `src/app/not-found.tsx`

## Phase 4: Full-Stack Verification & Production Readiness
- [x] Task 8: Automated test suite & API verification
  - Run `npm test` (all 49 tests pass)
  - Run `node test-api.mjs` (all 19 live endpoints pass)
- [x] Task 9: Antislop Delivery Gate compliance audit
  - Hard Gate audit (R-02 zero em dashes, R-03 zero mobile overflow, R-17/18 zero fake stats)
  - WCAG AA text contrast verification
  - Craftsmanship & Production readiness report

## Phase 5: Revert AI Character Cards to Native Javanese Museum Heritage Architecture
- [x] Task 10: Revert & Polish `TokohIdentitySection.tsx` to authentic Archival Dossier Modal
- [x] Task 11: Revert & Polish `src/app/tokoh/[slug]/page.tsx` to native archival identity card hero
- [x] Task 12: Revert & Polish `src/app/wayangpedia/[slug]/page.tsx` to native 2-column museum showcase
- [x] Task 13: Clean up `src/app/family-tree/FamilyTreeClient.tsx`: direct link to `/wayangpedia/[slug]`
- [x] Task 14: Delete AI showcase files and clean up unused imports in `src/app/page.tsx`
- [x] Task 15: Run TypeScript verification and test suite

## Phase 6: Pixel-Perfect Hero Alignment to reference_hero.png & Transparent Wayang
- [x] Task 16: Prepare pristine background plate and transparent Wayang assets with zero background noise (`hero-nuswara-reference.jpg`, `wayang-figure-transparent.png`).
- [x] Task 17: Redesign Hero section in `src/app/page.tsx` to match `reference_hero.png` 1:1 (Title Case CTA, accurate serif typography, remove black boxes/extra indicators, exact exhibition bar).
- [x] Task 18: Align `Navbar.tsx` navigation bar with `reference_hero.png` (exact 6 links, active gold underline, responsive drawer).
- [x] Task 19: Verify responsive reflow on mobile/tablet (`antislop-layoutmobile`) and contrast checks (`antislop-human`).

## Phase 7: Central Javanese Culinary Heritage Articles & Exploration Page
- [x] Task 20: Implement rich culinary data model and comprehensive Central Javanese food articles in `src/data/kulinerArticles.ts`.
- [x] Task 21: Create complementary editorial culinary images for dishes using `generate_image` and place in `public/images/editorial/`.
- [x] Task 22: Build `src/app/kuliner/page.tsx` (comprehensive culinary page with category filters, regional tags, and article cards).
- [x] Task 23: Build `src/app/kuliner/[slug]/page.tsx` (editorial article detail page with cultural history, philosophy, recipes, and heritage hubs).
- [x] Task 24: Add culinary exploration CTA button and card links in `src/app/page.tsx` (`#kuliner`).
- [x] Task 25: Ensure `src/components/layout/Navbar.tsx` activates the Kuliner tab on `/kuliner` and `/kuliner/[slug]`.
- [x] Task 26: Run TypeScript checks and verify responsive layout and contrast.

## Phase 8: UI & UX Enhancements (/ui-ux-pro-max & /ui-styling)
- [x] Task 27: Add WCAG AA Skip to Main Content link in `src/app/layout.tsx` and attach `id="main-content"`.
- [x] Task 28: Implement global `ScrollToTop` floating component with circular SVG progress ring and smooth scroll across all pages.
- [x] Task 29: Upgrade `Navbar.tsx` with desktop quick-access pills for Weton & Photobooth, mobile drawer backdrop overlay, Escape key listener, and body scroll lock.
- [x] Task 30: Create `ReadingProgressBar.tsx` for real-time editorial scroll tracking and integrate into all article detail pages (`/tempat-sakral/[slug]`, `/kuliner/[slug]`, `/tokoh/[slug]`, `/sejarah/[slug]`).
- [x] Task 31: Create `ArticleShareBar.tsx` with direct WhatsApp sharing, Twitter/X sharing, and copied link toast feedback.
- [x] Task 32: Upgrade `TempatSakralExplorer.tsx` and `KulinerExplorer.tsx` with `/` keyboard search shortcut hint, active filter dismiss chips (`×`), empty state recommendation buttons, and `.card-hover-lift` micro-interactions.
- [x] Task 33: Enhance `OracleForm.tsx` with 1-click historical figure presets (Kartini, Soekarno, Dewantara, Diponegoro) and add WhatsApp share action to `ResultCard.tsx`.
- [x] Task 34: Verify TypeScript compilation (`npx tsc --noEmit`), unit test suite (49/49 passing), and full production build (64/64 routes).

## Checkpoint: Final Delivery
- [x] All tests passing and build succeeds (`npx tsc --noEmit` and HTTP 200 verified)
- [x] Landing page matches reference_hero.png 1:1 with pure transparency and zero black box artifacts
- [x] Culinary articles and exploration page completed and verified
- [x] UI & UX enhancements completed and verified across all pages and interactive features

