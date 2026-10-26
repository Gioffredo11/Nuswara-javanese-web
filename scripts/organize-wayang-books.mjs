import fs from 'node:fs';
import path from 'node:path';

const BRAIN_DIR = 'C:\\Users\\ffred\\.gemini\\antigravity-ide\\brain\\a0141e53-448c-49e2-ab89-b772abd11cba';
const WEB_ASSETS = 'c:\\Users\\ffred\\OneDrive\\Documents\\pjbl-web\\public\\3d-assets\\books\\bestsellers\\assets';
const TARGET_ROOT = 'C:\\Users\\ffred\\OneDrive\\Documents\\assets image nuswara\\3d-book-assets';

const TAMPILAN_DIR = path.join(TARGET_ROOT, 'foto-tampilan-buku-3d');
const TEKSTUR_DIR = path.join(TARGET_ROOT, 'sampul-wayang-tekstur');
const SAMPUL_JELAS_DIR = path.join(TARGET_ROOT, 'sampul-jelas');
const PREVIEW_DIR = path.join(TARGET_ROOT, 'preview-3d-model');

// Ensure directories exist
[WEB_ASSETS, TARGET_ROOT, TAMPILAN_DIR, TEKSTUR_DIR, SAMPUL_JELAS_DIR, PREVIEW_DIR].forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

// Image mappings
const files = {
  gatotkaca_display: 'buku_wayang_gatotkaca_1792718984998.jpg',
  arjuna_display: 'buku_wayang_arjuna_1792719020234.jpg',
  bima_display: 'buku_wayang_bima_1792719041736.jpg',
  semar_display: 'buku_wayang_semar_1792719069765.jpg',
  koleksi_showcase: 'koleksi_kitab_wayang_3d_1792719093667.jpg',

  gatotkaca_flat: 'cover_flat_gatotkaca_1792719128701.jpg',
  arjuna_flat: 'cover_flat_arjuna_1792719230448.jpg',
  bima_flat: 'cover_flat_bima_1792719261821.jpg',
  semar_flat: 'cover_flat_semar_1792719293904.jpg',
};

function copy(srcFilename, destPath) {
  const src = path.join(BRAIN_DIR, srcFilename);
  if (!fs.existsSync(src)) {
    console.error(`Source not found: ${src}`);
    return;
  }
  fs.copyFileSync(src, destPath);
  console.log(`Copied: ${srcFilename} -> ${destPath}`);
}

// 1. Copy to web project assets
copy(files.gatotkaca_flat, path.join(WEB_ASSETS, 'cover-gatotkaca.jpg'));
copy(files.arjuna_flat, path.join(WEB_ASSETS, 'cover-arjuna.jpg'));
copy(files.bima_flat, path.join(WEB_ASSETS, 'cover-bima.jpg'));
copy(files.semar_flat, path.join(WEB_ASSETS, 'cover-semar.jpg'));

copy(files.gatotkaca_display, path.join(WEB_ASSETS, 'display-gatotkaca.jpg'));
copy(files.arjuna_display, path.join(WEB_ASSETS, 'display-arjuna.jpg'));
copy(files.bima_display, path.join(WEB_ASSETS, 'display-bima.jpg'));
copy(files.semar_display, path.join(WEB_ASSETS, 'display-semar.jpg'));
copy(files.koleksi_showcase, path.join(WEB_ASSETS, 'showcase-koleksi.jpg'));

// 2. Copy to C:\Users\ffred\OneDrive\Documents\assets image nuswara\3d-book-assets\foto-tampilan-buku-3d
copy(files.gatotkaca_display, path.join(TAMPILAN_DIR, '1-foto-tampilan-buku-gatotkaca.jpg'));
copy(files.arjuna_display, path.join(TAMPILAN_DIR, '2-foto-tampilan-buku-arjuna.jpg'));
copy(files.bima_display, path.join(TAMPILAN_DIR, '3-foto-tampilan-buku-bima.jpg'));
copy(files.semar_display, path.join(TAMPILAN_DIR, '4-foto-tampilan-buku-semar.jpg'));
copy(files.koleksi_showcase, path.join(TAMPILAN_DIR, '5-foto-tampilan-koleksi-kitab-wayang.jpg'));

// 3. Copy to C:\Users\ffred\OneDrive\Documents\assets image nuswara\3d-book-assets\sampul-wayang-tekstur
copy(files.gatotkaca_flat, path.join(TEKSTUR_DIR, 'sampul-wayang-gatotkaca.jpg'));
copy(files.arjuna_flat, path.join(TEKSTUR_DIR, 'sampul-wayang-arjuna.jpg'));
copy(files.bima_flat, path.join(TEKSTUR_DIR, 'sampul-wayang-bima.jpg'));
copy(files.semar_flat, path.join(TEKSTUR_DIR, 'sampul-wayang-semar.jpg'));

// 4. Copy to sampul-jelas (with friendly names)
copy(files.gatotkaca_flat, path.join(SAMPUL_JELAS_DIR, 'buku-1-gatotkaca-cover.jpg'));
copy(files.gatotkaca_display, path.join(SAMPUL_JELAS_DIR, 'buku-1-gatotkaca-tampilan-3d.jpg'));

copy(files.arjuna_flat, path.join(SAMPUL_JELAS_DIR, 'buku-2-arjuna-cover.jpg'));
copy(files.arjuna_display, path.join(SAMPUL_JELAS_DIR, 'buku-2-arjuna-tampilan-3d.jpg'));

copy(files.bima_flat, path.join(SAMPUL_JELAS_DIR, 'buku-3-bima-cover.jpg'));
copy(files.bima_display, path.join(SAMPUL_JELAS_DIR, 'buku-3-bima-tampilan-3d.jpg'));

copy(files.semar_flat, path.join(SAMPUL_JELAS_DIR, 'buku-4-semar-cover.jpg'));
copy(files.semar_display, path.join(SAMPUL_JELAS_DIR, 'buku-4-semar-tampilan-3d.jpg'));

copy(files.koleksi_showcase, path.join(SAMPUL_JELAS_DIR, 'koleksi-kitab-wayang-3d.jpg'));

// Also copy to root of 3d-book-assets
copy(files.gatotkaca_display, path.join(TARGET_ROOT, 'foto-buku-gatotkaca.jpg'));
copy(files.arjuna_display, path.join(TARGET_ROOT, 'foto-buku-arjuna.jpg'));
copy(files.bima_display, path.join(TARGET_ROOT, 'foto-buku-bima.jpg'));
copy(files.semar_display, path.join(TARGET_ROOT, 'foto-buku-semar.jpg'));
copy(files.koleksi_showcase, path.join(TARGET_ROOT, 'foto-koleksi-kitab-wayang.jpg'));

console.log('All wayang book assets successfully copied and organized!');
