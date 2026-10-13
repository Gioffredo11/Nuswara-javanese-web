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

## Checkpoint: Final Delivery
- [x] All tests passing
- [x] Complete Delivery Gate report prepared
