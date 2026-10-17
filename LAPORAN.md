# LAPORAN.md — NUSWARA Polish & Layak Edar
> Branch: `polish/layak-edar` | Tanggal: 17 Oktober 2026

---

## 1. Ringkasan Perubahan

### Backend
| Perubahan | File | Keterangan |
|-----------|------|------------|
| Hapus hardcode fallback credentials | `src/server/auth/admin-guard.ts` | Sebelumnya ada password default `'PariwaraJawa2026!'` jika env tidak di-set. Sekarang throw Error saat startup jika `ADMIN_EMAIL`/`ADMIN_PASSWORD` tidak ada. |
| Pisahkan SESSION_SECRET dari admin token | `src/server/auth/admin-guard.ts` | SESSION_SECRET tidak lagi diterima sebagai admin auth token — mencegah cross-purpose secret reuse. |
| CORS whitelist — hapus `origin: true` | `src/server/app.ts` | Sebelumnya accept semua origin + credentials. Sekarang hanya `APP_BASE_URL` + `EXTRA_ALLOWED_ORIGINS`. Fail-safe di development. |
| Kurangi body size limit 10MB → 500KB | `src/server/app.ts` | JSON admin endpoint tidak butuh 10MB. Mengurangi DoS surface. |
| Rate limiter: cleanup interval 5 menit | `src/server/http/rate-limiter.ts` | Mencegah Map tumbuh tanpa batas di server long-running. |
| Security headers di Next.js | `next.config.ts` | CSP, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy ditambahkan ke semua route. |
| Error boundary tidak expose stack trace | `src/app/error.tsx` | `error.message` tidak lagi tampil di production. Hanya `digest` (kode referensi) yang ditampilkan di development. |

### Database
| Perubahan | File | Keterangan |
|-----------|------|------------|
| `.env.example` diperbarui | `.env.example` | Password placeholder diganti `GANTI_INI_...` — tidak ada nilai nyata. Menambahkan dokumentasi tiap variabel dan `EXTRA_ALLOWED_ORIGINS`. |

### Frontend / UI-UX
| Perubahan | File | Keterangan |
|-----------|------|------------|
| Design token system | `src/app/globals.css` | CSS variables dihubungkan ke Tailwind v4 `@theme` — sekarang bisa pakai `bg-obsidian`, `text-gold`, dll. Legacy dead code dihapus. |
| Monument section layout asimetris | `src/app/page.tsx` | Dari 4 card identik → 1 hero card landscape (Borobudur) + 3 card portrait lebih kecil. |
| Focus ring WCAG di Navbar logo | `src/components/layout/Navbar.tsx` | Ganti `focus:outline-none` dengan `focus-visible:ring-2 focus-visible:ring-[#C59B53]` |
| Error page sesuai tema gelap | `src/app/error.tsx` | Stone/white → bg obsidian + gold accent |
| `prefers-reduced-motion` lengkap | `src/app/globals.css` | Tambahkan `animate-pulse-glow` dan `animate-oracle-card-spin-decelerate` |
| Loading skeleton global | `src/app/loading.tsx` | Skeleton konsisten tema gelap untuk semua route |
| 404 page + shortcut navigasi | `src/app/not-found.tsx` | Tambah 4 shortcut (Oracle, Kuliner, Tokoh, Tempat Sakral) |
| Dokumentasi | `AUDIT.md`, `DESIGN_DIRECTION.md` | Audit terstruktur + panduan desain untuk pengembangan selanjutnya |

---

## 2. Temuan Diperbaiki vs Ditunda

### ✅ Diperbaiki (13 temuan)
B-K1, B-K2, B-K3, B-K4, B-P3, B-P4, B-P5, D-K1, F-K2, F-K3, F-N2, F-P1, F-P2, F-P6

### ⏭ Ditunda dengan Alasan

| ID | Temuan | Alasan Ditunda |
|----|--------|----------------|
| B-P1 | Dua server (Express + Next.js) | Arsitektur inti — mengubah ini risiko breaking changes pada fitur yang sudah jalan |
| B-P2 | `any` masif di service layer | Refaktor besar, tidak ada manfaat langsung untuk rilis |
| B-N1 | console.log di server startup | Cosmetic, tidak blocker |
| B-N2 | Prisma fallback URL dummy | Mengubah ini bisa break pengembangan lokal |
| D-P1 | Soft delete | Butuh migrasi schema — **masuk daftar WAJIB TANYA** karena bisa mengubah alur hapus data |
| D-P2 | OracleResult JSON blob | Butuh migrasi + data migration — risiko tinggi |
| D-P3 | ShareLink orphan references | Butuh migrasi |
| D-P4 | Composite index ShareLink | Butuh migrasi (nice-to-have untuk performa) |
| F-K1 | Homepage 1.092 baris | Refaktor besar dengan risiko breaking homepage — kandidat sprint berikutnya |
| F-P4 | SectionDivider aria-hidden | Perlu desain ulang navigasi keyboard — tidak blocker rilis |
| F-P7 | Kuliner card identik | Nice-to-have — tidak sekritis monument section |
| F-P8 | Active state navbar subtle | Nice-to-have |
| F-N1 | loading.tsx per route | Loading global sudah ditambahkan — per-route adalah perbaikan bertahap |
| F-N3 | Footer 4-column template | Konten sudah baik, hanya layout |
| F-N5 | Eyebrow duplikasi heading | Copywriting tweak — tidak blocker |

---

## 3. Asumsi yang Diambil

1. **Deployment target**: Vercel atau Cloudflare Pages (bukan VPS sendiri). CSP dibuat kompatibel dengan Next.js + font Google. Jika pindah ke VPS, Express perlu Helmet.js tambahan.
2. **Database tidak ada data production**: Perbaikan database yang butuh migrasi schema ditunda karena belum ada konfirmasi apakah sudah ada data riil.
3. **`npm run dev:express`** tetap diperlukan secara terpisah untuk fitur admin — tidak diubah.
4. **Rate limiter in-memory** cukup untuk load saat ini. Jika traffic naik ke ratusan req/s, perlu Redis/Durable Objects.
5. **CSP `unsafe-eval`** masih ada untuk Next.js development. Di production, perlu di-tighten dengan nonce-based CSP.

---

## 4. Aset yang Perlu Kamu Siapkan

| Prioritas | Aset | Keterangan |
|-----------|------|------------|
| 🔴 Wajib | **Logo/favicon NUSWARA** | Saat ini tidak ada favicon. Buat SVG/PNG 32×32 + 192×192 + 512×512 |
| 🔴 Wajib | **Foto Candi Gedong Songo** | `monumen-gedongsongo.jpg` sudah ada di public tapi tidak dipakai di homepage |
| 🟡 Penting | **Foto Candi Sukuh** | Sama — file ada tapi belum ditampilkan di homepage |
| 🟡 Penting | **Open Graph Image** | `og-image.jpg` 1200×630px untuk sharing media sosial (saat ini pakai foto Borobudur) |
| 🟢 Nice-to-have | **Ilustrasi wayang custom** | `wayang-figure-transparent.png` ada. Jika mau lebih unik, ilustrasi tangan asli lebih premium |
| 🟢 Nice-to-have | **Foto artikel kuliner** | Dawet Ayu, Garang Asem, Sate Kere, Soto Kudus sudah ada di `/public/images/editorial/` |

---

## 5. Checklist Kesiapan Rilis

### Wajib Kamu Lakukan Sendiri

- [ ] **Rotate semua secret**: Generate `SESSION_SECRET` baru (48 char random), `ADMIN_PASSWORD` kuat, jangan pakai nilai dari `.env.example`
- [ ] **Set environment variables** di Vercel/Cloudflare/VPS: `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `APP_BASE_URL`
- [ ] **Koneksi database production**: Pastikan MySQL/MariaDB production bisa diakses dari deployment. Set `DATABASE_URL` ke server production.
- [ ] **Prisma migration**: Jalankan `npx prisma migrate deploy` di production (bukan `db push`)
- [ ] **Domain + SSL**: Pastikan HTTPS aktif. `GUEST_COOKIE_OPTIONS.secure = true` sudah berlaku saat `NODE_ENV=production`
- [ ] **Backup database** sebelum deploy pertama
- [ ] **Favicon**: Tambahkan ke `public/` dan referensikan di `src/app/layout.tsx`
- [ ] **Verifikasi CORS**: Setelah deploy, test dari browser bahwa API calls berhasil dari domain production
- [ ] **Monitor error rate**: Pasang Sentry atau Vercel Analytics setelah rilis

### Optional tapi Direkomendasikan
- [ ] Pasang `next-sitemap` untuk generate sitemap.xml otomatis
- [ ] Set `robots.txt` untuk mengizinkan crawler
- [ ] Test responsivitas di HP nyata (bukan hanya devtools) — minimal Samsung Galaxy A series

---

## 6. Cara Rollback

```bash
# Lihat semua commit di branch ini
git log polish/layak-edar --oneline

# Rollback ke sebelum semua perbaikan agent (checkpoint awal)
git checkout main
git log --oneline -5  # temukan commit "checkpoint: sebelum perbaikan agent"

# Atau: reset branch ke checkpoint
git checkout polish/layak-edar
git reset --hard <hash-commit-checkpoint>
```

**Nama commit checkpoint**: `checkpoint: sebelum perbaikan agent polish/layak-edar`  
**Branch asli**: `main`  
**Branch perbaikan**: `polish/layak-edar`

Untuk merge ke main setelah review:
```bash
git checkout main
git merge polish/layak-edar --no-ff -m "merge: polish/layak-edar — perbaikan keamanan dan UI"
```
