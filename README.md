# NUSWARA — Menelusuri Jejak, Merawat Suara

> Platform kurasi dan eksplorasi digital sejarah peradaban Jawa Tengah, filsafat pakeliran wayang kulit, serta kearifan adiluhung Nusantara untuk generasi masa depan.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

---

## 🌟 Fitur Unggulan

1. **Warisan Tokoh & Ksatria Jawa (`/tokoh` & `/tokoh/[slug]`)**
   - Kartu Foto Identitas Kearsipan (*Archival ID Cards*) resmi pahlawan nasional asal Jawa (R.A. Kartini, Pangeran Diponegoro, Ki Hadjar Dewantara, Jenderal Soedirman, K.H. Ahmad Dahlan, Nyi Ageng Serang).
   - Pop-up modal dossier interaktif dengan biografi mendalam, linimasa rekam jejak, dan fakta kearsipan unik.
   - Halaman artikel biografi lengkap dan terkurasi.

2. **Kilas Sejarah Tiga Era Peradaban (`/sejarah` & `/sejarah/[slug]`)**
   - Era Keagungan Candi Hindu-Buddha (Mataram Kuno).
   - Akulturasi Wayang Kulit & Filosofi Islam (Kesultanan Demak & Mataram Islam).
   - Pergerakan Nasional & Ksatria Modern.

3. **Wayangpedia & Lakon Hub (`/wayangpedia` & `/lakon`)**
   - Katalog interaktif tokoh-tokoh wayang kulit Purwa dengan silsilah keluarga, senjata pusaka, dan visualisasi 3D.
   - Pilihan lakon cerita klasik wayang beserta kuis interaktif.

4. **Javanese Oracle (Weton Matcher) (`/oracle`)**
   - Kalkulator weton Jawa interaktif dengan visualisasi roulette berputar untuk mencocokkan karakter wayang dan aura kepribadian.

5. **Manifestasi Piwulang Luhur Jawa (`/manifestasi`)**
   - Kartu tarot/orakel harian berdasarkan ajaran falsafah Jawa kuno (misal: *Memayu Hayuning Bawana*, *Mikul Dhuwur Mendhem Jero*).
   - Kartu 9:16 resolusi tinggi yang dapat diunduh untuk Instagram Story / WhatsApp status.

6. **Web Photobooth 4-Cut (`/photobooth`)**
   - Photobooth digital 4-cut dengan filter vintage (Sepia, B&W, Cyberpunk) dan frame budaya khas (Klasik Maroon, Ukiran Jepara).

---

## 🚀 Menjalankan Secara Lokal

### Prasyarat
- Node.js 18+ atau 20+
- npm / pnpm / yarn

### Instalasi & Dev Server

```bash
# Clone repositori
git clone https://github.com/Gioffredo11/Nuswara-javanese-web.git
cd Nuswara-javanese-web

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Jalankan server Next.js
npm run dev

# (Opsional) Jalankan API Express backend pendukung
npm run dev:express
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## ☁️ Panduan Deploy ke Cloudflare Pages

Proyek ini telah siap dihubungkan langsung ke **Cloudflare Pages** melalui repositori GitHub `Gioffredo11/Nuswara-javanese-web`:

### Langkah Deploy via Cloudflare Dashboard (Direkomendasikan):

1. Masuk ke [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Buka menu **Workers & Pages** > **Create application** > pilih tab **Pages**.
3. Pilih **Connect to Git** dan hubungkan akun GitHub Anda.
4. Pilih repositori: **`Gioffredo11/Nuswara-javanese-web`**.
5. Konfigurasi build setting:
   - **Framework preset**: `Next.js`
   - **Build command**: `npx @cloudflare/next-on-pages` (atau `npm run build`)
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/`
6. Tambahkan Environment Variable di tab **Environment Variables**:
   - `NODE_VERSION`: `20`
   - `NEXT_PUBLIC_APP_URL`: URL Cloudflare Pages Anda (misal `https://nuswara-javanese-web.pages.dev`)
7. Klik **Save and Deploy**. Cloudflare Pages akan otomatis mem-build dan mempublikasikan web Anda secara global di jaringan edge Cloudflare.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI & Styling**: React 19, Tailwind CSS v4, Lucide Icons, Three.js
- **Testing**: Vitest
- **Database ORM**: Prisma
- **Deployment Target**: Cloudflare Pages / Vercel

---

## 📄 Lisensi
Hak Cipta © 2026 NUSWARA Project.
