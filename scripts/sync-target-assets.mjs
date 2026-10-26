import fs from 'node:fs';
import path from 'node:path';

const SRC_BESTSELLERS = 'c:\\Users\\ffred\\OneDrive\\Documents\\pjbl-web\\public\\3d-assets\\books\\bestsellers';
const DEST_3D_ASSETS = 'C:\\Users\\ffred\\OneDrive\\Documents\\assets image nuswara\\3d-assets\\books\\bestsellers';
const DEST_PREVIEW = 'C:\\Users\\ffred\\OneDrive\\Documents\\assets image nuswara\\3d-book-assets\\preview-3d-model';
const GALERI_HTML = 'C:\\Users\\ffred\\OneDrive\\Documents\\assets image nuswara\\buka-galeri-aset.html';

// 1. Sync bestsellers runtime to 3d-assets in target folder
fs.mkdirSync(DEST_3D_ASSETS, { recursive: true });
fs.mkdirSync(path.join(DEST_3D_ASSETS, 'assets'), { recursive: true });
fs.mkdirSync(DEST_PREVIEW, { recursive: true });
fs.mkdirSync(path.join(DEST_PREVIEW, 'assets'), { recursive: true });

const filesToSync = [
  'book.css',
  'editions.js',
  'viewer.js',
  'preview.html',
  'assets.js'
];

filesToSync.forEach(f => {
  const src = path.join(SRC_BESTSELLERS, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DEST_3D_ASSETS, f));
    fs.copyFileSync(src, path.join(DEST_PREVIEW, f));
  }
});

// Sync image assets
const assetImages = [
  'cover-gatotkaca.jpg',
  'cover-arjuna.jpg',
  'cover-bima.jpg',
  'cover-semar.jpg',
  'display-gatotkaca.jpg',
  'display-arjuna.jpg',
  'display-bima.jpg',
  'display-semar.jpg',
  'showcase-koleksi.jpg'
];

assetImages.forEach(img => {
  const src = path.join(SRC_BESTSELLERS, 'assets', img);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DEST_3D_ASSETS, 'assets', img));
    fs.copyFileSync(src, path.join(DEST_PREVIEW, 'assets', img));
  }
});

// Also copy runtime folder if needed
const SRC_RUNTIME = 'c:\\Users\\ffred\\OneDrive\\Documents\\pjbl-web\\public\\3d-assets\\books\\runtime';
const DEST_RUNTIME = 'C:\\Users\\ffred\\OneDrive\\Documents\\assets image nuswara\\3d-assets\\books\\runtime';
fs.mkdirSync(DEST_RUNTIME, { recursive: true });
['resources.js', 'style.css'].forEach(f => {
  const src = path.join(SRC_RUNTIME, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DEST_RUNTIME, f));
  }
});

console.log('Synchronized 3D assets to target directory successfully!');

// 2. Read and update buka-galeri-aset.html
let html = fs.readFileSync(GALERI_HTML, 'utf8');

const new3DBooksSection = `  <!-- Section 3D Books -->
  <h2 class="section-title">📖 1. Aset 3D Buku Serat Pewayangan (Interactive 3D Books)</h2>
  <p style="color:var(--muted); margin-bottom: 16px;">Di bawah ini adalah <strong>3D Model Buku Interaktif Pewayangan Jawa</strong> (Bukan template ThreeUI mentahan, sudah menggunakan sampul & karakter Wayang asli Nuswara). Anda bisa drag untuk memutar buku, klik untuk membuka lembaran kitab, atau mengganti edisi (Gatotkaca, Arjuna, Bima, Semar):</p>
  <iframe class="interactive-frame" src="3d-assets/books/bestsellers/preview.html"></iframe>

  <!-- Koleksi Showcase -->
  <div style="margin: 28px 0 20px;">
    <h3 style="color:var(--gold-light); margin-bottom: 10px; font-size: 1.25rem;">✨ Foto Koleksi 4 Kitab Wayang 3D (Showcase)</h3>
    <div style="background: var(--card-bg); border: 1px solid rgba(197, 155, 83, 0.35); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <img src="3d-book-assets/foto-tampilan-buku-3d/5-foto-tampilan-koleksi-kitab-wayang.jpg" alt="Koleksi 4 Kitab Wayang 3D" style="width: 100%; height: auto; display: block;">
      <div style="padding: 16px 20px; border-top: 1px solid rgba(197, 155, 83, 0.2);">
        <h4 style="color: var(--gold-light); font-size: 1.1rem; margin-bottom: 4px;">Koleksi Serat Adiluhung Pewayangan Jawa (4 Kitab Utama)</h4>
        <p style="color: var(--muted); font-size: 0.95rem;">Foto tampilan 3D empat kitab pewayangan berjilid kulit antik dengan ornamen emas wayang: Serat Gatotkaca, Serat Arjuna, Serat Bima Werkudara, dan Serat Semar dengan latar gunungan & kemenyan keraton.</p>
      </div>
    </div>
  </div>

  <h3 style="color:var(--gold-light); margin: 30px 0 14px; font-size: 1.25rem;">📚 Foto Tampilan Buku 3D & Sampul Asli Wayang:</h3>
  <div class="grid">
    <!-- Gatotkaca -->
    <div class="card">
      <img src="3d-book-assets/foto-tampilan-buku-3d/1-foto-tampilan-buku-gatotkaca.jpg" alt="Foto Tampilan 3D Buku Gatotkaca">
      <div class="info">
        <h3>Buku 1: Serat Gatotkaca (3D Display)</h3>
        <p>Foto tampilan 3D buku fisik: jilid kulit hitam antik, ukiran emas Gatotkaca, lembaran kertas emas.</p>
      </div>
    </div>
    <div class="card">
      <img src="3d-book-assets/sampul-wayang-tekstur/sampul-wayang-gatotkaca.jpg" alt="Sampul Wayang Gatotkaca">
      <div class="info">
        <h3>Sampul: Serat Gatotkaca</h3>
        <p>Tekstur cover 2D resolusi tinggi untuk 3D Model Web: Ksatria Pringgandani berornamen Batik Parang & Kawung emas.</p>
      </div>
    </div>

    <!-- Arjuna -->
    <div class="card">
      <img src="3d-book-assets/foto-tampilan-buku-3d/2-foto-tampilan-buku-arjuna.jpg" alt="Foto Tampilan 3D Buku Arjuna">
      <div class="info">
        <h3>Buku 2: Serat Arjuna (3D Display)</h3>
        <p>Foto tampilan 3D buku fisik: jilid kulit biru keraton (navy), ukiran emas Arjuna membawa busur panah pusaka.</p>
      </div>
    </div>
    <div class="card">
      <img src="3d-book-assets/sampul-wayang-tekstur/sampul-wayang-arjuna.jpg" alt="Sampul Wayang Arjuna">
      <div class="info">
        <h3>Sampul: Serat Arjuna</h3>
        <p>Tekstur cover 2D resolusi tinggi untuk 3D Model Web: Penengah Pandawa berornamen bingkai teratai & aksara Jawa.</p>
      </div>
    </div>

    <!-- Bima -->
    <div class="card">
      <img src="3d-book-assets/foto-tampilan-buku-3d/3-foto-tampilan-buku-bima.jpg" alt="Foto Tampilan 3D Buku Bima">
      <div class="info">
        <h3>Buku 3: Serat Bima (3D Display)</h3>
        <p>Foto tampilan 3D buku fisik: jilid kulit hijau zamrud tua, ukiran emas Bima Werkudara berkuku Pancanaka.</p>
      </div>
    </div>
    <div class="card">
      <img src="3d-book-assets/sampul-wayang-tekstur/sampul-wayang-bima.jpg" alt="Sampul Wayang Bima">
      <div class="info">
        <h3>Sampul: Serat Bima (Werkudara)</h3>
        <p>Tekstur cover 2D resolusi tinggi untuk 3D Model Web: Ksatria Jodhipati berornamen Batik Kawung emas keemasan.</p>
      </div>
    </div>

    <!-- Semar -->
    <div class="card">
      <img src="3d-book-assets/foto-tampilan-buku-3d/4-foto-tampilan-buku-semar.jpg" alt="Foto Tampilan 3D Buku Semar">
      <div class="info">
        <h3>Buku 4: Serat Semar (3D Display)</h3>
        <p>Foto tampilan 3D buku fisik: jilid kulit marun tua antik, ukiran emas Kyai Semar Badranaya bersinar aura luhur.</p>
      </div>
    </div>
    <div class="card">
      <img src="3d-book-assets/sampul-wayang-tekstur/sampul-wayang-semar.jpg" alt="Sampul Wayang Semar">
      <div class="info">
        <h3>Sampul: Serat Semar</h3>
        <p>Tekstur cover 2D resolusi tinggi untuk 3D Model Web: Pamomong Luhur berornamen gunungan & batik klasik Jawa.</p>
      </div>
    </div>
  </div>`;

// Replace from <!-- Section 3D Books --> up to <!-- Section Tarot Wayang -->
const startIndex = html.indexOf('<!-- Section 3D Books -->');
const endIndex = html.indexOf('<!-- Section Tarot Wayang -->');

if (startIndex !== -1 && endIndex !== -1) {
  html = html.substring(0, startIndex) + new3DBooksSection + '\n\n  ' + html.substring(endIndex);
  fs.writeFileSync(GALERI_HTML, html, 'utf8');
  console.log('buka-galeri-aset.html updated with authentic Wayang 3D books!');
} else {
  console.error('Could not find section delimiters in buka-galeri-aset.html');
}
