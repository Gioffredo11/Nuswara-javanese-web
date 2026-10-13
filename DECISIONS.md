# DECISIONS & ARCHITECTURAL RECORDS - JAWA EPIC BACKEND

Dokumen ini mencatat seluruh keputusan arsitektural, formula domain, standar kalender budaya, dan pemilihan teknologi yang diterapkan dalam backend **JAWA EPIC**.

---

## 1. Arsitektur & Aturan Layering (Strict Layering)

Backend JAWA EPIC menerapkan pemisahan tanggung jawab (*Separation of Concerns*) dengan aturan ketergantungan searah yang ketat:

```
[ HTTP Client / Browser ]
         │
         ▼
[ Next.js Route Handler ] (src/app/api/*)
  - Tipis: parse request, validasi Zod, delegasi ke service, format respon
  - TIDAK BOLEH mengimpor Prisma atau query database langsung
         │
         ▼
[ Service Layer ] (src/server/services/*)
  - Mengelola logika bisnis, orkestrasi domain, dan transaksi
  - TIDAK BOLEH mengimpor modul `next/*` (NextRequest, NextResponse, cookies)
         │
         ▼
[ Domain Layer ] (src/server/domain/*)
  - Murni (*pure functions*), deterministik, ZERO I/O, ZERO database
  - Hanya menerima data murni dan mengembalikan hasil kalkulasi
         │
         ▼
[ Repository Layer ] (src/server/repositories/*)
  - Satu-satunya layer yang menyentuh PrismaClient (`src/server/db.ts`)
  - Menyediakan abstraksi query database yang bersih
         │
         ▼
[ Database MySQL 8 / MariaDB ]
```

---

## 2. Domain Weton: Kalender Jawa, Tanggal Acuan, & Rumus Neptu

### Tanggal Acuan (Anchor Date)
- **Konstanta Bernama:** `ANCHOR_DATE_UTC = Date.UTC(1945, 7, 17)` (17 Agustus 1945).
- **Pasaran Acuan:** **Legi** (Indeks 0).
- **Sumber Verifikasi:** Almanak Primbon Jawa & Catatan Sejarah Kemerdekaan RI (17 Agustus 1945 jatuh pada hari **Jumat Legi**, 9 Ramadhan 1364 H, 8 Pasa 1876 Dal).
- **Urutan Siklus Pancawara (5 Hari):**
  - Indeks 0: Legi
  - Indeks 1: Pahing
  - Indeks 2: Pon
  - Indeks 3: Wage
  - Indeks 4: Kliwon
- **Formula:**
  $$\Delta \text{Hari} = \left\lfloor \frac{\text{Target}_{\text{UTC}} - \text{Anchor}_{\text{UTC}}}{86\,400\,000} \right\rceil$$
  $$\text{Indeks Pasaran} = ((\Delta \text{Hari} \pmod 5) + 5) \pmod 5$$

### Nilai Neptu (Standar Budaya Mataram/Surakarta-Yogyakarta)
- **Hari (Saptawara):**
  - Minggu: 5
  - Senin: 4
  - Selasa: 3
  - Rabu: 7
  - Kamis: 8
  - Jumat: 6
  - Sabtu: 9
- **Pasaran (Pancawara):**
  - Legi: 5
  - Pahing: 9
  - Pon: 7
  - Wage: 4
  - Kliwon: 8
- **Total Weton:** 35 kombinasi unik (7 × 5).

### Pergantian Hari: Maghrib vs Tengah Malam
- Dalam tradisi kalender Jawa asli, hari berganti saat matahari terbenam (waktu Maghrib, sekitar pukul 18:00 WIB).
- Parameter opsional `cutoff: 'maghrib' | 'midnight'` (default `'midnight'`). Jika waktu lahir $\ge$ 18:00 WIB dan cutoff Maghrib dipilih, tanggal kalender efektif bergeser +1 hari.

---

## 3. Domain Oracle: Deterministic Character Matching

- **Prinsip:** Hasil pencocokan wayang murni deterministik berdasarkan data aturan tertulis (`weton_character_rules`), bukan `if-else` hardcoded di kode.
- **Label Wajib:** Seluruh hasil membawa metadata `interpretationType: "MODERN_INTERPRETATION"`.
- **Fallback:** Bila belum ada aturan relasi tertulis untuk kombinasi weton tertentu, sistem menggunakan kalkulasi kedekatan afinitas neptu $\Delta = |\text{neptuAffinity} - \text{neptuWeton}|$ dengan tie-breaker ID karakter yang stabil.

---

## 4. Domain Manifestasi Harian (Daily Manifestation)

- **Reset Waktu:** Dihitung berdasarkan tanggal kalender zona waktu **Asia/Jakarta (WIB)**, mereset tepat pukul 00:00:00 WIB (bukan rolling 24 jam).
- **Algoritma Pemilihan:** Algoritma hashing cepat 32-bit FNV-1a dengan seed `manifestation:${userId}:${localDate}`.
- **Idempotensi & Penanganan Balapan Konkurensi (Race Condition):**
  - Diberlakukan constraint unik `UNIQUE(userId, localDate)` pada tabel `daily_manifestations`.
  - Jika terjadi request paralel bersamaan yang memicu error duplikasi Prisma (`P2002`), service menangkapnya secara transparan dan melakukan *re-read*, menjamin kedua panggilan mengembalikan kartu yang persis sama tanpa error 500.
- **Pemisahan Konteks:** Respon API memisahkan secara eksplisit antara:
  - `meaning`: Konteks ajaran budaya tradisional Jawa.
  - `modernInterpretation`: Kontekstualisasi relevan untuk kehidupan generasi modern / Gen Z / Gen Alpha.

---

## 5. Domain Share: Kode Unambigu & Keamanan

- **Alphabet Unambigu (50 Karakter):** `23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz`. Karakter membingungkan seperti `0, O, o, 1, I, l` dihapus demi mencegah kesalahan baca pada layar kecil.
- **Entropi:** Menggunakan generator acak kriptografis `crypto.randomBytes()`. Panjang minimal 8 karakter ($50^8 \approx 3.9 \times 10^{13}$ kemungkinan).
- **Pencegahan Tabrakan:** Dilengkapi loop retry otomatis (maksimal 5x) jika kode tabrakan di level database.
- **Masa Kedaluwarsa:** Verifikasi `expiresAt` dilakukan saat pembacaan (`GET /api/share/:code`). Jika sudah kedaluwarsa, API mengembalikan HTTP 404/410 dengan pesan ramah.

---

## 6. Rate Limiting & Pengamanan

- **Arsitektur Interface:** Menggunakan interface `IRateLimiter` dengan implementasi awal `InMemoryRateLimiter` (sliding window).
- **Extensibility:** Dapat ditukar dengan implementasi Redis (`RedisRateLimiter`) tanpa mengubah controller atau service.
- **Endpoint Terproteksi:**
  - `POST /api/oracle/calculate`: 10 req/menit
  - `POST /api/manifestation/draw`: 15 req/menit
  - `POST /api/share`: 20 req/menit
  - `POST /api/share/photo`: 10 req/menit

---

## 7. Autentikasi & Sesi Tamu (Guest Session)

- **Sesi Tamu:** Menggunakan cookie `httpOnly`, `SameSite=Lax`, dan `Secure` (di environment production). Token acak 64 karakter hex dihasilkan otomatis jika belum ada di request, lalu di-upsert ke tabel `users` sebagai akun tamu (`role: USER`).
- **Admin Guard:** Guard diletakkan di controller `/api/admin/*`. Memvalidasi `x-admin-key` atau `Authorization` terhadap `ADMIN_PASSWORD` dan `SESSION_SECRET` dari environment.

---

## 8. Dependencies Tambahan & Pembenaran

1. `vitest` & `vite`: Test runner modern berkecepatan tinggi yang mendukung native TypeScript dan ESM untuk unit & integration test.
2. `qrcode`: Library pembuatan data URL QR code lokal untuk fitur share tautan kultural.
3. `zod`: Schema validator strict untuk seluruh input request & query parameter API.
