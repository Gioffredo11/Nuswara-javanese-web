# Implementation Plan: NUSWARA Full-Stack Redesign & Cultural Heritage System

## Overview
NUSWARA is a digital cultural platform dedicated to Central Java's cultural heritage. This plan guides the visual transformation of the website into the cinematic editorial design reference (palette: obsidian `#100D0A`, warm black `#17120E`, warm ivory `#F0E6D4`, antique gold `#B99A60`, serif typography Cormorant Garamond / Cinzel / Plus Jakarta Sans) while preserving and hardening all 6 core interactive full-stack features: Wayangpedia, Silsilah Purwa, Lakon Hub, Javanese Oracle, Manifestasi Harian, and Web Photobooth 4-Cut.

## Architecture Decisions
- **Unified Single-Page Cultural Flow:** A continuous editorial narrative on `/` with deep anchors (`#sejarah`, `#tokoh`, `#wayangpedia`, `#family-tree`, `#lakon`, `#oracle`, `#manifestasi`, `#batik`, `#kuliner`, `#monumen`, `#photobooth`).
- **Feature Preservation:** All backend routes (`/api/*`), Prisma MySQL models, local date caching, weton algorithms, and character relationships are kept strictly functional without mock data replacements.
- **Visual Design Identity:** Cinematic landscape hero with left-aligned typography and towering Wayang silhouette matching Reference 1; alternating obsidian and warm parchment editorial sections matching Reference 2.
- **Antislop Compliance:** Strict adherence to R-02 (zero em dashes in copy), R-03 (mobile responsiveness with no horizontal overflow), R-17/18 (no fake stats or testimonials), R-25 (WCAG AA contrast on both dark and ivory), and R-35 (verify every interaction before delivery).

## Task List

### Phase 1: Planning and Design System Foundations
- [x] Task 1: Initialize planning and task breakdown (`tasks/plan.md`, `tasks/todo.md`).
- [x] Task 2: Standardize design tokens in `globals.css` and typography in `layout.tsx` (remove all em dashes from metadata).

### Phase 2: Cinematic Hero and Editorial Storyline Redesign
- [x] Task 3: Redesign Hero Section in `src/app/page.tsx` to match Reference 1 exactly (left-aligned eyebrow, title, subtitle, antique gold CTA, right towering Wayang Kulit, bottom exhibition status bar).
- [x] Task 4: Polish editorial sections in `src/app/page.tsx` (Warisan Manifesto, Sejarah Mataram, Tokoh Bangsa, Wayang Kelir, Seni Batik, Kuliner Tradisional, Monumen Keabadian, Closing Banner) and eliminate all em dashes.
- [x] Task 5: Refine `Navbar.tsx` and `Footer.tsx` navigation to reflect NUSWARA identity and link directly to active sections.

### Phase 3: Interactive Modules Theme Integration
- [x] Task 6: Audit and style Wayangpedia, Family Tree, Lakon Hub, Oracle, Manifestasi, and Photobooth clients to seamlessly fit the obsidian and gold palette.
- [x] Task 7: Audit sub-pages (`/wayangpedia/[slug]`, `/share/[code]`, `/lakon/[slug]`, `not-found.tsx`) to remove em dashes and apply consistent NUSWARA styling.

### Phase 4: Full-Stack Reliability, Security, and Verification
- [x] Task 8: Run unit/integration tests (`npm test`), endpoint verification (`node test-api.mjs`), and check mobile responsiveness / contrast.
- [x] Task 9: Execute Antislop Delivery Gate checklist (Hard Gate, Purpose Gate, Quality Locks) and compile final production report.

### Phase 5: Revert AI Character Cards to Native Javanese Museum Heritage Architecture
- [x] Task 10: Revert & Polish `TokohIdentitySection.tsx` to the authentic Archival Dossier Modal (`BERKAS RESMI IDENTITAS TOKOH`), adhering to royal dark museum theme and antislop guidelines.
- [x] Task 11: Revert & Polish `src/app/tokoh/[slug]/page.tsx` to native archival identity card hero with photo mounting corners and metadata table.
- [x] Task 12: Revert & Polish `src/app/wayangpedia/[slug]/page.tsx` to native 2-column museum showcase with authentic Wayang silhouette vectors and cultural metadata.
- [x] Task 13: Clean up `src/app/family-tree/FamilyTreeClient.tsx`: remove AI showcase modal, link inspector directly to `/wayangpedia/[slug]`.
- [x] Task 14: Remove unused AI showcase files (`ApexCharacterShowcase.tsx`, `apexShowcaseUtils.ts`, `WayangShowcaseCarousel.tsx`) and clean up imports.
- [x] Task 15: TypeScript compilation check and test suite verification.

### Phase 6: Pixel-Perfect Hero Alignment to reference_hero.png & Transparent Wayang
- [x] Task 16: Prepare pristine background plate and transparent Wayang assets with zero background noise.
- [x] Task 17: Redesign Hero section in `src/app/page.tsx` to match `reference_hero.png` 1:1 (single Title Case CTA, correct serif typography, remove black boxes/extra indicators, exact exhibition bar).
- [x] Task 18: Align `Navbar.tsx` navigation bar with `reference_hero.png` (clean link set, active gold underline).
- [x] Task 19: Verify responsive reflow on mobile/tablet (`antislop-layoutmobile`) and contrast checks (`antislop-human`).

### Phase 7: Central Javanese Culinary Heritage Articles & Exploration Page
- [ ] Task 20: Implement rich culinary data model and comprehensive Central Javanese food articles in `src/data/kulinerArticles.ts`.
- [ ] Task 21: Create complementary editorial culinary images for dishes using `generate_image`.
- [ ] Task 22: Build `src/app/kuliner/page.tsx` (comprehensive culinary page with category filters, regional tags, and article cards).
- [ ] Task 23: Build `src/app/kuliner/[slug]/page.tsx` (editorial article detail page with cultural history, philosophy, recipes, and heritage hubs).
- [ ] Task 24: Add culinary exploration CTA button and card links in `src/app/page.tsx` (`#kuliner`).
- [ ] Task 25: Ensure `src/components/layout/Navbar.tsx` activates the Kuliner tab on `/kuliner` and `/kuliner/[slug]`.
- [ ] Task 26: Run TypeScript checks and verify responsive layout and contrast.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Database disconnection (MySQL on port 3306) | High | Daemon running in background (`task-91`). Verified with `test-api.mjs`. |
| Em dash regression in copy | High | Use ripgrep to verify zero `—` characters in user-facing copy. |
| Mobile horizontal scroll | Medium | Inspect grid widths, replace fixed widths with fluid clamps and safe padding. |
| AI card styling remnants | Medium | Completely remove Apex/gaming card classes and references. |
| Image background clipping / blending box | High | Use pure 32-bit PNG with true alpha transparency, eliminating any black rectangular boxes. |
