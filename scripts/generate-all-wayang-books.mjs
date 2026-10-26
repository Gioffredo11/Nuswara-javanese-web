import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const PJBL_ROOT = 'c:\\Users\\ffred\\OneDrive\\Documents\\pjbl-web';
const TAROT_DIR = path.join(PJBL_ROOT, 'public', 'images', 'tarot');
const TARGET_ROOT = 'C:\\Users\\ffred\\OneDrive\\Documents\\assets image nuswara\\3d-book-assets';
const WEB_ASSETS = path.join(PJBL_ROOT, 'public', '3d-assets', 'books', 'bestsellers', 'assets');
const TEMP_DIR = process.env.TEMP || 'C:\\Users\\ffred\\AppData\\Local\\Temp';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const TAMPILAN_DIR = path.join(TARGET_ROOT, 'foto-tampilan-buku-3d');
const TEKSTUR_DIR = path.join(TARGET_ROOT, 'sampul-wayang-tekstur');
const SAMPUL_JELAS_DIR = path.join(TARGET_ROOT, 'sampul-jelas');
const PREVIEW_ASSETS_DIR = path.join(TARGET_ROOT, 'preview-3d-model', 'assets');

// Ensure all destination directories exist
[TARGET_ROOT, TAMPILAN_DIR, TEKSTUR_DIR, SAMPUL_JELAS_DIR, PREVIEW_ASSETS_DIR, WEB_ASSETS].forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

// All 14 characters metadata
const characters = [
  {
    slug: 'arjuna',
    order: 1,
    name: 'Arjuna',
    alt: 'Janaka / Permadi',
    sub: 'Ksatria Panengah Pandawa',
    kicker: 'PANDAWA LIMA &bull; ADILUHUNG',
    coverBg: '#1c150f',
  },
  {
    slug: 'bima',
    order: 2,
    name: 'Bima',
    alt: 'Werkudara / Bratasena',
    sub: 'Ksatria Perkasa Jodhipati',
    kicker: 'PANDAWA LIMA &bull; ADILUHUNG',
    coverBg: '#1c150f',
  },
  {
    slug: 'yudhistira',
    order: 3,
    name: 'Yudhistira',
    alt: 'Puntadewa / Samiaji',
    sub: 'Raja Amarta Berdarah Putih',
    kicker: 'PANDAWA LIMA &bull; ADILUHUNG',
    coverBg: '#1c150f',
  },
  {
    slug: 'nakula',
    order: 4,
    name: 'Nakula',
    alt: 'Raden Pinten',
    sub: 'Ksatria Kembar Sawojajar',
    kicker: 'PANDAWA LIMA &bull; ADILUHUNG',
    coverBg: '#1c150f',
  },
  {
    slug: 'sadewa',
    order: 5,
    name: 'Sadewa',
    alt: 'Raden Tangsen',
    sub: 'Ksatria Perbintangan Baweratalun',
    kicker: 'PANDAWA LIMA &bull; ADILUHUNG',
    coverBg: '#1c150f',
  },
  {
    slug: 'gatotkaca',
    order: 6,
    name: 'Gatotkaca',
    alt: 'Raden Tetuka / Purubaya',
    sub: 'Pahlawan Angkasa Pringgandani',
    kicker: 'KESATRIA &amp; PAHLAWAN &bull; ADILUHUNG',
    coverBg: '#191512',
  },
  {
    slug: 'srikandi',
    order: 7,
    name: 'Srikandi',
    alt: 'Dewi Wara Srikandi',
    sub: 'Prajurit Utama Pancala',
    kicker: 'KESATRIA &amp; PAHLAWAN &bull; ADILUHUNG',
    coverBg: '#191512',
  },
  {
    slug: 'kresna',
    order: 8,
    name: 'Kresna',
    alt: 'Sri Kresna / Narayana',
    sub: 'Titisan Batara Wisnu',
    kicker: 'KESATRIA &amp; PAHLAWAN &bull; ADILUHUNG',
    coverBg: '#191512',
  },
  {
    slug: 'semar',
    order: 9,
    name: 'Semar',
    alt: 'Kyai Lurah Semar / Batara Ismaya',
    sub: 'Pamomong Sejati Tanah Jawa',
    kicker: 'PAMOMONG &bull; KARANGTUMARITIS',
    coverBg: '#20160f',
  },
  {
    slug: 'gareng',
    order: 10,
    name: 'Gareng',
    alt: 'Nala Gareng / Cakruk',
    sub: 'Anak Sulung Punokawan',
    kicker: 'PAMOMONG &bull; KARANGTUMARITIS',
    coverBg: '#20160f',
  },
  {
    slug: 'petruk',
    order: 11,
    name: 'Petruk',
    alt: 'Kanthong Bolong / Doblang',
    sub: 'Pujangga Humor Karangtumaritis',
    kicker: 'PAMOMONG &bull; KARANGTUMARITIS',
    coverBg: '#20160f',
  },
  {
    slug: 'bagong',
    order: 12,
    name: 'Bagong',
    alt: 'Kyai Bagong / Bawor',
    sub: 'Suara Kritis Rakyat Jelata',
    kicker: 'PAMOMONG &bull; KARANGTUMARITIS',
    coverBg: '#20160f',
  },
  {
    slug: 'duryodana',
    order: 13,
    name: 'Duryodana',
    alt: 'Prabu Kurupati / Suyodana',
    sub: 'Pemimpin Wangsa Kurawa',
    kicker: 'ASTINA &bull; KURAWA SATUS',
    coverBg: '#211214',
  },
  {
    slug: 'karna',
    order: 14,
    name: 'Karna',
    alt: 'Basukarna / Suryaatmaja',
    sub: 'Adipati Ksatria Dermawan Awangga',
    kicker: 'ASTINA &bull; KURAWA SATUS',
    coverBg: '#211214',
  },
];

// Helper to get base64 image data
function getTarotBase64(slug) {
  const file = path.join(TAROT_DIR, `${slug}.jpg`);
  if (!fs.existsSync(file)) {
    console.warn(`Tarot file not found for ${slug}`);
    return '';
  }
  return fs.readFileSync(file).toString('base64');
}

// 1. Template for individual 3D perspective book
function generate3DBookHtml(c) {
  const imgBase64 = getTarotBase64(c.slug);
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #060504;
    width: 800px;
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .stage {
    perspective: 1600px;
    perspective-origin: 50% 50%;
    width: 360px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .book {
    position: relative;
    width: 310px;
    height: 450px;
    transform-style: preserve-3d;
    transform: rotateY(-19deg) rotateX(4.5deg);
  }
  .book-shadow {
    position: absolute;
    inset: 4% -7% -5% 7%;
    background: #000;
    filter: blur(26px);
    opacity: 0.88;
    border-radius: 12px;
    transform: translate3d(24px, 40px, -55px);
  }
  .book-back {
    position: absolute;
    inset: 0;
    border-radius: 4px 8px 8px 4px;
    background: #17110b;
    border: 1px solid rgba(197, 155, 83, 0.22);
    transform: translateZ(-16px);
  }
  .page-block-fore {
    position: absolute;
    top: 2.2%;
    bottom: 2.2%;
    right: 0;
    width: 32px;
    background: repeating-linear-gradient(90deg, #caa980 0px, #f7efe0 1px, #ddceab 2.5px);
    transform-origin: right center;
    transform: rotateY(90deg);
    border-radius: 1px;
    box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  }
  .page-block-top {
    position: absolute;
    top: 0;
    left: 4%;
    right: 3%;
    height: 32px;
    background: repeating-linear-gradient(0deg, #caa980 0px, #f7efe0 1px, #ddceab 2.5px);
    transform-origin: center top;
    transform: rotateX(-90deg);
  }
  .page-block-bottom {
    position: absolute;
    bottom: 0;
    left: 4%;
    right: 3%;
    height: 32px;
    background: repeating-linear-gradient(0deg, #caa980 0px, #f7efe0 1px, #ddceab 2.5px);
    transform-origin: center bottom;
    transform: rotateX(90deg);
  }
  .book-spine {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 100%;
    transform-origin: left center;
    transform: rotateY(90deg);
    background: linear-gradient(90deg, #0e0906 0%, #22170f 40%, #130d08 100%);
  }
  .front-cover {
    position: absolute;
    inset: 0;
    background: ${c.coverBg};
    border-radius: 4px 8px 8px 4px;
    transform: translateZ(16px);
    border: 1px solid rgba(212, 163, 115, 0.28);
    box-shadow: inset -12px 0 18px rgba(0,0,0,0.55), inset 3px 0 6px rgba(255,255,255,0.07);
    overflow: hidden;
  }
  .hinge-shadow {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 12px;
    background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.4) 100%);
    z-index: 10;
    pointer-events: none;
  }
  .cover-header {
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 5;
  }
  .cover-kicker {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #dfb873;
  }
  .cover-kicker-line {
    width: 26px;
    height: 1px;
    background: rgba(223, 184, 118, 0.45);
    margin-top: 5px;
  }
  .watermark {
    position: absolute;
    top: 10px;
    right: 12px;
    opacity: 0.16;
    pointer-events: none;
    z-index: 2;
  }
  .oval-outer {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 166px;
    height: 244px;
    border-radius: 50%;
    border: 1px solid rgba(212, 163, 115, 0.25);
    z-index: 2;
  }
  .oval-inner {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 228px;
    border-radius: 50%;
    border: 1px solid rgba(212, 163, 115, 0.15);
    z-index: 2;
  }
  .tarot-frame {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 134px;
    height: 201px;
    border-radius: 11px;
    border: 1.5px solid rgba(223, 184, 118, 0.72);
    box-shadow: 0 8px 22px rgba(0,0,0,0.85), 0 0 14px rgba(223, 184, 118, 0.18);
    overflow: hidden;
    background: #000;
    z-index: 4;
  }
  .tarot-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .cover-footer {
    position: absolute;
    bottom: 24px;
    left: 14px;
    right: 14px;
    text-align: center;
    z-index: 5;
  }
  .title-main {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #FAF4E8;
    text-shadow: 0 2px 8px rgba(0,0,0,0.8);
    line-height: 1.05;
  }
  .title-alt {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 13px;
    font-weight: 500;
    color: #dfb873;
    margin-top: 2px;
  }
  .title-sub {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.015em;
    color: #D8C8AD;
    margin-top: 4px;
  }
</style>
</head>
<body>
  <div class="stage">
    <div class="book">
      <div class="book-shadow"></div>
      <div class="book-back"></div>
      <div class="page-block-fore"></div>
      <div class="page-block-top"></div>
      <div class="page-block-bottom"></div>
      <div class="book-spine"></div>
      <div class="front-cover">
        <div class="hinge-shadow"></div>
        <div class="cover-header">
          <div class="cover-kicker">${c.kicker}</div>
          <div class="cover-kicker-line"></div>
        </div>
        <svg class="watermark" width="88" height="88" viewBox="0 0 100 100" fill="none" stroke="#ECC47E" stroke-width="1.2">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="26" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="30" cy="50" r="20" />
          <circle cx="70" cy="50" r="20" />
          <circle cx="50" cy="30" r="20" />
          <circle cx="50" cy="70" r="20" />
        </svg>
        <div class="oval-outer"></div>
        <div class="oval-inner"></div>
        <div class="tarot-frame">
          <img src="data:image/jpeg;base64,${imgBase64}" alt="${c.name}">
        </div>
        <div class="cover-footer">
          <div class="title-main">${c.name}</div>
          <div class="title-alt">${c.alt}</div>
          <div class="title-sub">${c.sub}</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// 2. Template for flat 2D cover texture
function generateFlatCoverHtml(c) {
  const imgBase64 = getTarotBase64(c.slug);
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #060504;
    width: 500px;
    height: 720px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .cover {
    position: relative;
    width: 480px;
    height: 700px;
    background: ${c.coverBg};
    border-radius: 6px;
    border: 1px solid rgba(212, 163, 115, 0.35);
    box-shadow: inset -15px 0 24px rgba(0,0,0,0.55), inset 4px 0 10px rgba(255,255,255,0.08);
    overflow: hidden;
  }
  .hinge-shadow {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 18px;
    background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.45) 100%);
    z-index: 10;
  }
  .cover-header {
    position: absolute;
    top: 36px;
    left: 36px;
    z-index: 5;
  }
  .cover-kicker {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #dfb873;
  }
  .cover-kicker-line {
    width: 36px;
    height: 1px;
    background: rgba(223, 184, 118, 0.45);
    margin-top: 7px;
  }
  .watermark {
    position: absolute;
    top: 18px;
    right: 20px;
    opacity: 0.16;
    z-index: 2;
  }
  .oval-outer {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 370px;
    border-radius: 50%;
    border: 1px solid rgba(212, 163, 115, 0.25);
    z-index: 2;
  }
  .oval-inner {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 226px;
    height: 346px;
    border-radius: 50%;
    border: 1px solid rgba(212, 163, 115, 0.15);
    z-index: 2;
  }
  .tarot-frame {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 206px;
    height: 310px;
    border-radius: 16px;
    border: 2px solid rgba(223, 184, 118, 0.75);
    box-shadow: 0 10px 28px rgba(0,0,0,0.85), 0 0 20px rgba(223, 184, 118, 0.2);
    overflow: hidden;
    background: #000;
    z-index: 4;
  }
  .tarot-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .cover-footer {
    position: absolute;
    bottom: 34px;
    left: 20px;
    right: 20px;
    text-align: center;
    z-index: 5;
  }
  .title-main {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 38px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #FAF4E8;
    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
    line-height: 1.05;
  }
  .title-alt {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 19px;
    font-weight: 500;
    color: #dfb873;
    margin-top: 3px;
  }
  .title-sub {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.015em;
    color: #D8C8AD;
    margin-top: 6px;
  }
</style>
</head>
<body>
  <div class="cover">
    <div class="hinge-shadow"></div>
    <div class="cover-header">
      <div class="cover-kicker">${c.kicker}</div>
      <div class="cover-kicker-line"></div>
    </div>
    <svg class="watermark" width="130" height="130" viewBox="0 0 100 100" fill="none" stroke="#ECC47E" stroke-width="1.2">
      <circle cx="50" cy="50" r="40" />
      <circle cx="50" cy="50" r="26" />
      <circle cx="50" cy="50" r="14" />
      <circle cx="30" cy="50" r="20" />
      <circle cx="70" cy="50" r="20" />
      <circle cx="50" cy="30" r="20" />
      <circle cx="50" cy="70" r="20" />
    </svg>
    <div class="oval-outer"></div>
    <div class="oval-inner"></div>
    <div class="tarot-frame">
      <img src="data:image/jpeg;base64,${imgBase64}" alt="${c.name}">
    </div>
    <div class="cover-footer">
      <div class="title-main">${c.name}</div>
      <div class="title-alt">${c.alt}</div>
      <div class="title-sub">${c.sub}</div>
    </div>
  </div>
</body>
</html>`;
}

// 3. Multi-book showcase HTML
function generateShowcaseHtml(bookList, width = 1400, height = 600, gap = 70) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #060504;
    width: ${width}px;
    height: ${height}px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .showcase {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${gap}px;
    width: 100%;
    padding: 20px 40px;
  }
  .stage {
    perspective: 1600px;
    perspective-origin: 50% 50%;
    width: 320px;
    height: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .book {
    position: relative;
    width: 290px;
    height: 430px;
    transform-style: preserve-3d;
    transform: rotateY(-19deg) rotateX(4.5deg);
  }
  .book-shadow {
    position: absolute;
    inset: 4% -7% -5% 7%;
    background: #000;
    filter: blur(24px);
    opacity: 0.88;
    border-radius: 12px;
    transform: translate3d(22px, 38px, -55px);
  }
  .book-back {
    position: absolute;
    inset: 0;
    border-radius: 4px 8px 8px 4px;
    background: #17110b;
    border: 1px solid rgba(197, 155, 83, 0.22);
    transform: translateZ(-15px);
  }
  .page-block-fore {
    position: absolute;
    top: 2.2%;
    bottom: 2.2%;
    right: 0;
    width: 30px;
    background: repeating-linear-gradient(90deg, #caa980 0px, #f7efe0 1px, #ddceab 2.5px);
    transform-origin: right center;
    transform: rotateY(90deg);
    border-radius: 1px;
    box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  }
  .page-block-top {
    position: absolute;
    top: 0;
    left: 4%;
    right: 3%;
    height: 30px;
    background: repeating-linear-gradient(0deg, #caa980 0px, #f7efe0 1px, #ddceab 2.5px);
    transform-origin: center top;
    transform: rotateX(-90deg);
  }
  .page-block-bottom {
    position: absolute;
    bottom: 0;
    left: 4%;
    right: 3%;
    height: 30px;
    background: repeating-linear-gradient(0deg, #caa980 0px, #f7efe0 1px, #ddceab 2.5px);
    transform-origin: center bottom;
    transform: rotateX(90deg);
  }
  .book-spine {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    transform-origin: left center;
    transform: rotateY(90deg);
    background: linear-gradient(90deg, #0e0906 0%, #22170f 40%, #130d08 100%);
  }
  .front-cover {
    position: absolute;
    inset: 0;
    background: #1c150f;
    border-radius: 4px 8px 8px 4px;
    transform: translateZ(15px);
    border: 1px solid rgba(212, 163, 115, 0.28);
    box-shadow: inset -12px 0 18px rgba(0,0,0,0.55), inset 3px 0 6px rgba(255,255,255,0.07);
    overflow: hidden;
  }
  .hinge-shadow {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 12px;
    background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.4) 100%);
    z-index: 10;
  }
  .cover-header {
    position: absolute;
    top: 22px;
    left: 22px;
    z-index: 5;
  }
  .cover-kicker {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 7.5px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #dfb873;
  }
  .cover-kicker-line {
    width: 26px;
    height: 1px;
    background: rgba(223, 184, 118, 0.45);
    margin-top: 5px;
  }
  .watermark {
    position: absolute;
    top: 10px;
    right: 12px;
    opacity: 0.16;
    z-index: 2;
  }
  .oval-outer {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 156px;
    height: 232px;
    border-radius: 50%;
    border: 1px solid rgba(212, 163, 115, 0.25);
    z-index: 2;
  }
  .oval-inner {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 216px;
    border-radius: 50%;
    border: 1px solid rgba(212, 163, 115, 0.15);
    z-index: 2;
  }
  .tarot-frame {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 126px;
    height: 189px;
    border-radius: 11px;
    border: 1.5px solid rgba(223, 184, 118, 0.72);
    box-shadow: 0 8px 22px rgba(0,0,0,0.85), 0 0 14px rgba(223, 184, 118, 0.18);
    overflow: hidden;
    background: #000;
    z-index: 4;
  }
  .tarot-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .cover-footer {
    position: absolute;
    bottom: 22px;
    left: 14px;
    right: 14px;
    text-align: center;
    z-index: 5;
  }
  .title-main {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #FAF4E8;
    text-shadow: 0 2px 8px rgba(0,0,0,0.8);
    line-height: 1.05;
  }
  .title-alt {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 13px;
    font-weight: 500;
    color: #dfb873;
    margin-top: 2px;
  }
  .title-sub {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.015em;
    color: #D8C8AD;
    margin-top: 4px;
  }
</style>
</head>
<body>
  <div class="showcase">
    ${bookList
      .map(
        (b) => `
    <div class="stage">
      <div class="book">
        <div class="book-shadow"></div>
        <div class="book-back"></div>
        <div class="page-block-fore"></div>
        <div class="page-block-top"></div>
        <div class="page-block-bottom"></div>
        <div class="book-spine"></div>
        <div class="front-cover" style="background: ${b.coverBg || '#1c150f'}">
          <div class="hinge-shadow"></div>
          <div class="cover-header">
            <div class="cover-kicker">${b.kicker}</div>
            <div class="cover-kicker-line"></div>
          </div>
          <svg class="watermark" width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#ECC47E" stroke-width="1.2">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="26" />
            <circle cx="50" cy="50" r="14" />
            <circle cx="30" cy="50" r="20" />
            <circle cx="70" cy="50" r="20" />
            <circle cx="50" cy="30" r="20" />
            <circle cx="50" cy="70" r="20" />
          </svg>
          <div class="oval-outer"></div>
          <div class="oval-inner"></div>
          <div class="tarot-frame">
            <img src="data:image/jpeg;base64,${getTarotBase64(b.slug)}" alt="${b.name}">
          </div>
          <div class="cover-footer">
            <div class="title-main">${b.name}</div>
            <div class="title-alt">${b.alt}</div>
            <div class="title-sub">${b.sub}</div>
          </div>
        </div>
      </div>
    </div>`
      )
      .join('\n')}
  </div>
</body>
</html>`;
}

// Function to take screenshot using Chrome Headless
function captureScreenshot(htmlContent, width, height, outputFilename) {
  const tempHtml = path.join(TEMP_DIR, `temp_render_${Date.now()}_${Math.random().toString(36).substring(7)}.html`);
  const tempOut = path.join(TEMP_DIR, `temp_shot_${Date.now()}_${Math.random().toString(36).substring(7)}.png`);
  
  fs.writeFileSync(tempHtml, htmlContent, 'utf8');

  const cmd = `"${CHROME_PATH}" --headless --no-sandbox --user-data-dir="${path.join(TEMP_DIR, 'chrome-temp')}" --window-size=${width},${height} --screenshot="${tempOut}" "file:///${tempHtml.replace(/\\/g, '/')}"`;
  
  try {
    execSync(cmd, { stdio: 'pipe' });
    if (!fs.existsSync(tempOut)) {
      throw new Error(`Screenshot file was not created: ${tempOut}`);
    }
    return tempOut;
  } finally {
    if (fs.existsSync(tempHtml)) {
      try { fs.unlinkSync(tempHtml); } catch {}
    }
  }
}

console.log('=== STEP 1: CLEANING UP OLD AI-GENERATED AND STRAY FILES ===');
// Remove old AI generated images & videos in TARGET_ROOT
const strayFiles = [
  '5f73c2c9094bbeef04fdc241909a4672235142882112ec15c6d130f89bf5fd16.jpg',
  '6b3318cc6a7da610e3a55369131b20a2419cda826d558da09da284f09582956d.mp4',
  '76a7b0b20e4992f91bb5febf2fa8edd2d33fd4b7bb0cda5f8ae0fffdff9d5a7e.mp4',
  '99df6a45ad1f9dd7e47b65c064df0ae58c7c22069fadd9aa896754c3bad27123.jpg',
  'aabcdc51e4d9f6c4cbf6656bbd3447d6b50814507395f9e5bd0efecd7c1b22b3.mp4',
  'eafc13621b9605d30356b7d4396072b2593a46e0c47c96d17ba60ca03d98f925.jpg',
];

strayFiles.forEach((file) => {
  const p1 = path.join(TARGET_ROOT, file);
  if (fs.existsSync(p1)) {
    fs.unlinkSync(p1);
    console.log(`Deleted stray file: ${file}`);
  }
  const p2 = path.join(WEB_ASSETS, file);
  if (fs.existsSync(p2)) {
    fs.unlinkSync(p2);
    console.log(`Deleted web stray file: ${file}`);
  }
});

// Clean up codex/claude/cursor leftover in sampul-jelas
const leftoverSampulJelas = [
  'buku-1-codex-cover.jpg',
  'buku-1-codex-motion.mp4',
  'buku-2-claude-code-cover.jpg',
  'buku-2-claude-code-motion.mp4',
  'buku-3-cursor-cover.jpg',
  'buku-3-cursor-motion.mp4',
];
leftoverSampulJelas.forEach((file) => {
  const p = path.join(SAMPUL_JELAS_DIR, file);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`Deleted leftover template: ${file}`);
  }
});

console.log('\n=== STEP 2: RENDERING AUTHENTIC 3D BOOK & COVER ASSETS FOR ALL 14 WAYANG ===');

for (const char of characters) {
  console.log(`Rendering assets for: ${char.name} (${char.slug})...`);

  // A. Render 3D Perspective Display (800x700)
  const html3D = generate3DBookHtml(char);
  const temp3D = captureScreenshot(html3D, 800, 700);

  // Distribute 3D display file
  const paths3D = [
    // 1. In foto-tampilan-buku-3d
    path.join(TAMPILAN_DIR, `${char.order}-foto-tampilan-buku-${char.slug}.jpg`),
    // 2. In root of 3d-book-assets
    path.join(TARGET_ROOT, `foto-buku-${char.slug}.jpg`),
    // 3. In sampul-jelas
    path.join(SAMPUL_JELAS_DIR, `buku-${char.order}-${char.slug}-tampilan-3d.jpg`),
    // 4. In preview-3d-model/assets
    path.join(PREVIEW_ASSETS_DIR, `display-${char.slug}.jpg`),
    // 5. In website public assets
    path.join(WEB_ASSETS, `display-${char.slug}.jpg`),
  ];

  paths3D.forEach((dest) => {
    fs.copyFileSync(temp3D, dest);
  });
  try { fs.unlinkSync(temp3D); } catch {}

  // B. Render Flat 2D Cover Texture (500x720)
  const htmlCover = generateFlatCoverHtml(char);
  const tempCover = captureScreenshot(htmlCover, 500, 720);

  // Distribute 2D cover file
  const pathsCover = [
    // 1. In sampul-wayang-tekstur
    path.join(TEKSTUR_DIR, `sampul-wayang-${char.slug}.jpg`),
    // 2. In sampul-jelas
    path.join(SAMPUL_JELAS_DIR, `buku-${char.order}-${char.slug}-cover.jpg`),
    // 3. In preview-3d-model/assets
    path.join(PREVIEW_ASSETS_DIR, `cover-${char.slug}.jpg`),
    // 4. In website public assets
    path.join(WEB_ASSETS, `cover-${char.slug}.jpg`),
  ];

  pathsCover.forEach((dest) => {
    fs.copyFileSync(tempCover, dest);
  });
  try { fs.unlinkSync(tempCover); } catch {}

  console.log(`  -> Finished ${char.name}`);
}

console.log('\n=== STEP 3: RENDERING SHOWCASE COLLECTIONS ===');

// 1. Pandawa Lima 3-Book Showcase (Arjuna, Bima, Yudhistira) - Exactly like user reference photo!
console.log('Rendering Pandawa Lima 3-Book Showcase...');
const pandawa3 = characters.filter((c) => ['arjuna', 'bima', 'yudhistira'].includes(c.slug));
const htmlPandawa3 = generateShowcaseHtml(pandawa3, 1400, 600, 70);
const tempPandawa3 = captureScreenshot(htmlPandawa3, 1400, 600);

const pandawaDestinations = [
  path.join(TARGET_ROOT, 'foto-koleksi-pandawa-lima.jpg'),
  path.join(TAMPILAN_DIR, '15-foto-tampilan-koleksi-pandawa-lima.jpg'),
  path.join(SAMPUL_JELAS_DIR, 'koleksi-pandawa-lima-3d.jpg'),
  path.join(PREVIEW_ASSETS_DIR, 'showcase-pandawa.jpg'),
  path.join(WEB_ASSETS, 'showcase-pandawa.jpg'),
];
pandawaDestinations.forEach((dest) => fs.copyFileSync(tempPandawa3, dest));
try { fs.unlinkSync(tempPandawa3); } catch {}

// 2. Koleksi Kitab Wayang 4-Book Showcase (Gatotkaca, Arjuna, Bima, Semar)
console.log('Rendering Koleksi Utama 4-Book Showcase...');
const utama4 = characters.filter((c) => ['gatotkaca', 'arjuna', 'bima', 'semar'].includes(c.slug));
const htmlUtama4 = generateShowcaseHtml(utama4, 1600, 580, 50);
const tempUtama4 = captureScreenshot(htmlUtama4, 1600, 580);

const utamaDestinations = [
  path.join(TARGET_ROOT, 'foto-koleksi-kitab-wayang.jpg'),
  path.join(TAMPILAN_DIR, '16-foto-tampilan-koleksi-kitab-wayang.jpg'),
  path.join(SAMPUL_JELAS_DIR, 'koleksi-kitab-wayang-3d.jpg'),
  path.join(PREVIEW_ASSETS_DIR, 'showcase-koleksi.jpg'),
  path.join(WEB_ASSETS, 'showcase-koleksi.jpg'),
];
utamaDestinations.forEach((dest) => fs.copyFileSync(tempUtama4, dest));
try { fs.unlinkSync(tempUtama4); } catch {}

// 3. Punokawan 4-Book Showcase (Semar, Gareng, Petruk, Bagong)
console.log('Rendering Punokawan 4-Book Showcase...');
const punokawan4 = characters.filter((c) => ['semar', 'gareng', 'petruk', 'bagong'].includes(c.slug));
const htmlPuno4 = generateShowcaseHtml(punokawan4, 1600, 580, 50);
const tempPuno4 = captureScreenshot(htmlPuno4, 1600, 580);

const punoDestinations = [
  path.join(TARGET_ROOT, 'foto-koleksi-punokawan.jpg'),
  path.join(TAMPILAN_DIR, '17-foto-tampilan-koleksi-punokawan.jpg'),
  path.join(SAMPUL_JELAS_DIR, 'koleksi-punokawan-3d.jpg'),
  path.join(PREVIEW_ASSETS_DIR, 'showcase-punokawan.jpg'),
  path.join(WEB_ASSETS, 'showcase-punokawan.jpg'),
];
punoDestinations.forEach((dest) => fs.copyFileSync(tempPuno4, dest));
try { fs.unlinkSync(tempPuno4); } catch {}

console.log('\n=== ALL 14 WAYANG BOOK ASSETS AND SHOWCASES GENERATED SUCCESSFULLY! ===');
