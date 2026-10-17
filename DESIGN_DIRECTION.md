# DESIGN_DIRECTION.md — NUSWARA
> Ditetapkan: 17 Oktober 2026 | Berlaku untuk seluruh halaman

---

## Identitas Visual

**Nuswara** adalah museum digital budaya Jawa Tengah. Bukan platform wisata, bukan ensiklopedia generik — ia adalah **arsip kuratorial** yang didesain seperti majalah kebudayaan cetak bergaya editorial, bukan dashboard atau landing page startup.

Target pengguna: generasi muda Indonesia (18–35), mayoritas mobile, literate secara visual, tertarik pada identitas kultural.

---

## Tiga Keputusan Visual Utama

### 1. Kontras Keras: Gelap-Perkamen
Situs bergerak antara dua ekstrem:
- **Hitam Obsidian** (`#0D0C0A`) — bukan hitam murni, ada nuansa cokelat tua yang hangat
- **Krem Perkamen** (`#F4EDE2`) — bukan putih, ada warmth seperti kertas lama

Pergantian kontras antar section (gelap → terang → gelap) menciptakan ritme seperti buku yang dibuka. Hindari abu-abu netral di mana pun.

### 2. Tipografi Tiga Lapisan, Bukan Dua
- **`font-royal` (Cinzel)** — untuk nama, label, heading utama. Berkarakter klasik Romawi yang terasa "ukiran batu"
- **`font-editorial` (Cormorant)** — untuk headline naratif, quote, kalimat puitis. Elegant italic serif
- **`font-sans` (Plus Jakarta Sans)** — untuk body text, UI label, caption. Modern tapi hangat

Tidak ada Inter. Tidak ada Roboto.

### 3. Emas Satu Nada, Tidak Gradien
Warna aksen adalah satu family emas monokromatik:
- `--gold-deep: #C59B53` — teks aktif, border, badge
- `--gold-main: #C5A36A` — elemen UI netral
- `--gold-light: #ECC47E` — hover state, highlight

Tidak ada gradien merah-oranye, ungu, atau biru di mana pun. Elemen emas adalah satu-satunya warna yang "berani" — semua sisanya adalah netral hangat.

---

## Token Warna (CSS Variables → Tailwind `@theme`)

```
--bg-obsidian:  #0D0C0A   → bg-obsidian
--bg-espresso:  #14110E   → bg-espresso
--bg-parchment: #F4EDE2   → bg-parchment
--gold-deep:    #C59B53   → gold-deep
--gold-main:    #C5A36A   → gold
--gold-light:   #ECC47E   → gold-light
--text-primary: #F5EFE6   → text-text-primary
--text-muted:   #A39888   → text-text-muted
--text-dark:    #231E17   → text-text-dark
```

**Aturan**: Jangan hardcode hex di JSX. Pakai CSS variable atau Tailwind token.

---

## Spacing & Ritme

- Section spacing: **80px (py-20)** untuk section utama, **48px (py-12)** untuk sub-section
- Card internal padding: **20px (p-5)** untuk card besar, **16px (p-4)** untuk card kecil
- Gap antar card: **24px (gap-6)** untuk grid utama, **20px (gap-5)** untuk grid sekunder
- Border radius: **16px (rounded-2xl)** untuk card besar, **12px (rounded-xl)** untuk card kecil, **4px (rounded)** untuk badge/tag

---

## Layout Anti-AI

- **Monumen section**: 1 hero card landscape (2 kolom) + 3 card portrait kecil — bukan 4 card identik
- **Sejarah section**: Grid asimetris 5+7 kolom — bukan centered block
- **Hero section**: Typography kiri, image kanan dengan overlay — bukan center-aligned hero
- **Kuliner section**: 3 card dengan header section di kiri, CTA di kanan — editorial style

---

## Transisi & Motion

- **Fast**: 150ms — hover color, opacity
- **Base**: 220ms — hover transform (translateY, scale)
- **Slow**: 350–700ms — image zoom saat hover card

`prefers-reduced-motion: reduce` menonaktifkan **semua** animasi infinite (float, glow, pulse, spin).

---

## Tone Copywriting

- Bahasa Indonesia, gaya jurnalisme kebudayaan — tidak bombastis
- Kalimat deskriptif, spesifik, berisi fakta sejarah
- Tidak ada kata: "revolusionerkan", "terbaik", "terdepan", "unlock", "discover your potential"
- Gunakan kutipan bahasa Jawa/Sanskrit sebagai eyebrow — tapi hanya saat kontekstual
