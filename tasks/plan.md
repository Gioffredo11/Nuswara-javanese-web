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

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Database disconnection (MySQL on port 3306) | High | Daemon running in background (`task-91`). Verified with `test-api.mjs`. |
| Em dash regression in copy | High | Use ripgrep to verify zero `—` characters in user-facing copy. |
| Mobile horizontal scroll | Medium | Inspect grid widths, replace fixed widths with fluid clamps and safe padding. |
