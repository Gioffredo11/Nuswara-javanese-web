# AUDIT.md — NUSWARA Project
> Dibuat: 17 Oktober 2026 | Branch: `polish/layak-edar`

## A. BACKEND

### 🔴 KRITIS
| ID | Temuan | File | Status |
|----|--------|------|--------|
| B-K1 | Hardcode fallback credentials di admin-guard (`'PariwaraJawa2026!'`) | `src/server/auth/admin-guard.ts:11-12` | ✅ DIPERBAIKI |
| B-K2 | `SESSION_SECRET` double-pakai sebagai admin token — cross-purpose secret reuse | `src/server/auth/admin-guard.ts:18-20` | ✅ DIPERBAIKI |
| B-K3 | Rate limiter in-memory: Map bocor, reset saat restart, tidak efektif di multi-instance | `src/server/http/rate-limiter.ts:72` | ✅ DIPERBAIKI (cleanup interval) |
| B-K4 | CORS `origin: true` + `credentials: true` jika `APP_BASE_URL` tidak di-set | `src/server/app.ts:13-16` | ✅ DIPERBAIKI (whitelist) |

### 🟡 PENTING
| ID | Temuan | File | Status |
|----|--------|------|--------|
| B-P1 | Dua server jalan terpisah (Express + Next.js API Routes) tanpa koordinasi | `src/server/`, `src/app/api/` | ⏭ DITUNDA (arsitektur inti) |
| B-P2 | `any` masif di service layer — type safety hilang | `oracle.service.ts:33-35`, `manifestation.service.ts:50` | ⏭ DITUNDA (refaktor besar) |
| B-P3 | Body limit 10MB untuk JSON — terlalu besar | `src/server/app.ts:19` | ✅ DIPERBAIKI (500KB) |
| B-P4 | `error.tsx` expose `error.message` di production | `src/app/error.tsx:28-32` | ✅ DIPERBAIKI |
| B-P5 | Tidak ada security headers di Next.js | `next.config.ts` | ✅ DIPERBAIKI |

### 🟢 NICE-TO-HAVE
| ID | Temuan | File | Status |
|----|--------|------|--------|
| B-N1 | `console.log` di server startup — perlu structured logger | `src/server/server.ts:6-11` | ⏭ DITUNDA |
| B-N2 | Prisma fallback URL ke dummy di db.ts | `src/server/db.ts:3-5` | ⏭ DITUNDA (bisa break dev) |

---

## B. DATABASE

### 🔴 KRITIS
| ID | Temuan | File | Status |
|----|--------|------|--------|
| D-K1 | `.env` berisi plain-text password — wajib verifikasi tidak ter-commit | `.env`, `.gitignore` | ✅ DIPERBAIKI (.gitignore benar, .env.example diperbarui) |

### 🟡 PENTING
| ID | Temuan | File | Status |
|----|--------|------|--------|
| D-P1 | Hard delete tanpa soft delete — cascade bisa hapus history oracle user | `admin.routes.ts:55-63` | ⏭ DITUNDA (butuh migrasi schema) |
| D-P2 | `OracleResult.resultJson` JSON blob — schema evolution sulit | `schema.prisma:398` | ⏭ DITUNDA (butuh migrasi + data migration) |
| D-P3 | `ShareLink.referenceId` tanpa FK — orphan references mungkin | `schema.prisma:478` | ⏭ DITUNDA (butuh migrasi) |
| D-P4 | Tidak ada composite index untuk query `shortCode + expiresAt + type` | `schema.prisma:475-476` | ⏭ DITUNDA (butuh migrasi) |

### 🟢 NICE-TO-HAVE
| ID | Temuan | File | Status |
|----|--------|------|--------|
| D-N1 | `localDate` string "YYYY-MM-DD" bukan DateTime | `schema.prisma:417` | ⏭ DITUNDA |
| D-N2 | Tidak jelas apakah pakai migrations atau `db push` | `prisma/migrations/` | ⏭ PERLU KONFIRMASI |

---

## C. FRONTEND / UI-UX

### 🔴 KRITIS
| ID | Temuan | File | Status |
|----|--------|------|--------|
| F-K1 | Homepage 1.092 baris — god component | `src/app/page.tsx` | ⏭ DITUNDA (refaktor besar, risiko tinggi) |
| F-K2 | Tidak ada design token — 100+ hex literal di JSX | All components | ✅ DIPERBAIKI (`@theme` Tailwind v4 + CSS variables) |
| F-K3 | Logo Navbar `focus:outline-none` tanpa pengganti — WCAG 2.4.7 | `Navbar.tsx:185` | ✅ DIPERBAIKI |

### 🟡 PENTING
| ID | Temuan | File | Status |
|----|--------|------|--------|
| F-P1 | `error.tsx` white theme di situs gelap | `src/app/error.tsx` | ✅ DIPERBAIKI |
| F-P2 | `animate-pulse-glow`, `oracle-spin-decelerate` tidak masuk `prefers-reduced-motion` | `globals.css:339` | ✅ DIPERBAIKI |
| F-P3 | `focus:outline-none` masif di input tanpa pengganti | Banyak komponen | ✅ Mayoritas sudah pakai `focus:ring` |
| F-P4 | `SectionDivider` `aria-hidden` — navigasi keyboard flat | `page.tsx:56` | ⏭ DITUNDA |
| F-P5 | Beberapa gambar dekoratif tidak punya `aria-hidden` | Beberapa komponen | ⏭ DITUNDA |
| F-P6 | 4 card monumen identik | `page.tsx:848-1012` | ✅ DIPERBAIKI (hero + 3 secondary) |
| F-P7 | 3 card kuliner identik | `page.tsx:657-790` | ⏭ DITUNDA |
| F-P8 | Active state navbar terlalu subtle | `Navbar.tsx:205-207` | ⏭ DITUNDA |

### 🟢 NICE-TO-HAVE
| ID | Temuan | File | Status |
|----|--------|------|--------|
| F-N1 | Tidak ada `loading.tsx` di route pages | Semua routes | ⏭ DITUNDA |
| F-N2 | CSS variables "legacy" dead code | `globals.css:23-32` | ✅ DIPERBAIKI (dihapus) |
| F-N3 | Footer 4-column template | `Footer.tsx:9` | ⏭ DITUNDA |
| F-N4 | 404 page tidak ada shortcut ke halaman populer | `not-found.tsx` | ⏭ DITUNDA |
| F-N5 | Eyebrow badge duplikasi heading | `page.tsx:325-327` | ⏭ DITUNDA |
