import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// 1. Definisikan Artwork SVG Favicon NUSWARA
// Estetika: Obsidian #0D0C0A + Emas Adiluhung #C59B53 / #ECC47E
// Motif: Gunungan Wayang (Kayon) + Surya Majapahit + Monogram "N" Kerajaan
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#241B12" stop-opacity="0.85" />
      <stop offset="60%" stop-color="#120F0B" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#0D0C0A" stop-opacity="1" />
    </radialGradient>

    <!-- Metallic Gold Gradient Primary -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2D6" />
      <stop offset="25%" stop-color="#ECC47E" />
      <stop offset="65%" stop-color="#C59B53" />
      <stop offset="100%" stop-color="#8E6728" />
    </linearGradient>

    <!-- Deep Gold Shadow -->
    <linearGradient id="goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C59B53" />
      <stop offset="100%" stop-color="#5E4317" />
    </linearGradient>

    <!-- Inner Glow for Gunungan -->
    <radialGradient id="kayonGlow" cx="50%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#ECC47E" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#C59B53" stop-opacity="0.02" />
    </radialGradient>

    <!-- Subtle Drop Shadow -->
    <filter id="goldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.4" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Base Squircle Background -->
  <rect width="512" height="512" rx="112" fill="url(#bgGlow)" />
  
  <!-- Outer Gold Inset Border -->
  <rect x="20" y="20" width="472" height="472" rx="96" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" stroke-opacity="0.35" />
  <rect x="28" y="28" width="456" height="456" rx="88" fill="none" stroke="#ECC47E" stroke-width="1" stroke-opacity="0.15" />

  <!-- Four Corner Heritage Diamonds (Candi Pattern) -->
  <g fill="url(#goldGrad)" opacity="0.65">
    <path d="M 52,52 L 56,46 L 60,52 L 56,58 Z" />
    <path d="M 460,52 L 464,46 L 468,52 L 464,58 Z" />
    <path d="M 52,460 L 56,454 L 60,460 L 56,466 Z" />
    <path d="M 460,460 L 464,454 L 468,460 L 464,466 Z" />
  </g>

  <!-- Gunungan (Kayon) Body with Glow Filter -->
  <g filter="url(#goldGlowFilter)">
    <!-- Gunungan Subtle Backfill -->
    <path d="M 256,58
             C 278,98 308,124 334,162
             C 350,186 354,222 346,252
             C 338,278 350,308 368,342
             C 380,366 364,406 330,412
             C 300,418 284,408 274,408
             L 274,444 C 274,450 268,454 256,454
             C 244,454 238,450 238,444
             L 238,408
             C 228,408 212,418 182,412
             C 148,406 132,366 144,342
             C 162,308 174,278 166,252
             C 158,222 162,186 178,162
             C 204,124 234,98 256,58 Z"
          fill="url(#kayonGlow)" />

    <!-- Gunungan Primary Gold Contour -->
    <path d="M 256,58
             C 278,98 308,124 334,162
             C 350,186 354,222 346,252
             C 338,278 350,308 368,342
             C 380,366 364,406 330,412
             C 300,418 284,408 274,408
             L 274,444 C 274,450 268,454 256,454
             C 244,454 238,450 238,444
             L 238,408
             C 228,408 212,418 182,412
             C 148,406 132,366 144,342
             C 162,308 174,278 166,252
             C 158,222 162,186 178,162
             C 204,124 234,98 256,58 Z"
          fill="none" stroke="url(#goldGrad)" stroke-width="6.5" stroke-linejoin="round" stroke-linecap="round" />

    <!-- Inner Decorative Hairline -->
    <path d="M 256,76
             C 274,110 300,134 322,168
             C 335,188 338,218 332,244
             C 324,272 336,300 352,332
             C 362,352 348,390 320,396
             C 294,400 274,392 256,392
             C 238,392 218,400 192,396
             C 164,390 150,352 160,332
             C 176,300 188,272 180,244
             C 174,218 177,188 190,168
             C 212,134 238,110 256,76 Z"
          fill="none" stroke="#ECC47E" stroke-width="1.8" stroke-dasharray="8 6" opacity="0.45" />

    <!-- Spire / Puncak Meru (Mustaka Keraton) -->
    <circle cx="256" cy="48" r="6" fill="url(#goldGrad)" />
    <path d="M 256,34 L 260,46 L 256,54 L 252,46 Z" fill="#FFF2D6" />

    <!-- Surya Majapahit Star (Top Accent) -->
    <g transform="translate(256, 134)">
      <!-- 8 Ray Solar Emanation -->
      <circle cx="0" cy="0" r="16" fill="url(#goldGrad)" />
      <circle cx="0" cy="0" r="11" fill="#14110E" />
      <circle cx="0" cy="0" r="6" fill="#ECC47E" />
      <!-- Vertical/Horizontal Rays -->
      <path d="M 0,-24 L 3,-16 L -3,-16 Z" fill="url(#goldGrad)" />
      <path d="M 0,24 L 3,16 L -3,16 Z" fill="url(#goldGrad)" />
      <path d="M -24,0 L -16,-3 L -16,3 Z" fill="url(#goldGrad)" />
      <path d="M 24,0 L 16,-3 L 16,3 Z" fill="url(#goldGrad)" />
      <!-- Diagonal Rays -->
      <path d="M -15,-15 L -8,-14 L -14,-8 Z" fill="#ECC47E" opacity="0.85" />
      <path d="M 15,-15 L 8,-14 L 14,-8 Z" fill="#ECC47E" opacity="0.85" />
      <path d="M -15,15 L -8,14 L -14,8 Z" fill="#ECC47E" opacity="0.85" />
      <path d="M 15,15 L 8,14 L 14,8 Z" fill="#ECC47E" opacity="0.85" />
    </g>

    <!-- Central Royal Monogram "N" (Cinzel Inspired Serif Structure) -->
    <g transform="translate(256, 276)">
      <!-- Left Stem -->
      <!-- Serif Top -->
      <path d="M -70,-80 L -38,-80 L -38,-72 L -48,-72 L -48,70 L -36,70 L -36,78 L -72,78 L -72,70 L -60,70 L -60,-72 L -70,-72 Z"
            fill="url(#goldGrad)" />

      <!-- Right Stem -->
      <!-- Serif Bottom & Top -->
      <path d="M 40,-80 L 72,-80 L 72,-72 L 60,-72 L 60,70 L 72,70 L 72,78 L 38,78 L 38,70 L 48,70 L 48,-72 L 40,-72 Z"
            fill="url(#goldGrad)" />

      <!-- Diagonal Slash of N (Tapered Majestic Stroke) -->
      <polygon points="-48,-76 -32,-76 60,74 44,74" fill="url(#goldGrad)" />

      <!-- Highlight Stroke on Diagonal -->
      <line x1="-42" y1="-72" x2="52" y2="70" stroke="#FFF2D6" stroke-width="2.5" opacity="0.6" />

      <!-- Central Keraton Diamond Node -->
      <polygon points="4, -1 11, -8 4, -15 -3, -8" fill="#ECC47E" />
      <polygon points="4, 15 11, 8 4, 1 -3, 8" fill="#ECC47E" />
    </g>

    <!-- Base Altar / Padma Lotus Pedestal -->
    <path d="M 204,380 L 308,380" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" />
    <path d="M 218,388 L 294,388" stroke="#ECC47E" stroke-width="2" stroke-linecap="round" opacity="0.7" />
    <circle cx="256" cy="384" r="3.5" fill="#FFF2D6" />
    <circle cx="236" cy="384" r="2.5" fill="#ECC47E" opacity="0.75" />
    <circle cx="276" cy="384" r="2.5" fill="#ECC47E" opacity="0.75" />
  </g>
</svg>`;

// Helper ICO Encoder for Multi-resolution PNGs
function createIco(images) {
  // images: array of { width, height, buffer }
  const count = images.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // image type: 1 = ICO
  header.writeUInt16LE(count, 4); // number of images

  const entries = [];
  const imageBuffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette count (0 if >=8bpp)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // offset in file

    entries.push(entry);
    imageBuffers.push(img.buffer);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...imageBuffers]);
}

async function run() {
  console.log('Generating NUSWARA Favicon Suite...');
  const rootDir = process.cwd();

  // 1. Write SVG files
  const svgBuffer = Buffer.from(svgContent, 'utf-8');
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.svg'), svgBuffer);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon.svg'), svgBuffer);
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.svg'), svgBuffer);
  console.log('✓ SVG icons written to public/ & src/app/');

  // 2. Render PNG resolutions using Sharp
  const sizes = [16, 32, 48, 180, 192, 512];
  const pngBuffers = {};

  for (const s of sizes) {
    pngBuffers[s] = await sharp(svgBuffer)
      .resize(s, s)
      .png({ compressionLevel: 9 })
      .toBuffer();
    console.log(`✓ Rendered ${s}x${s} PNG`);
  }

  // 3. Write target PNG files
  // Apple Touch Icon (180x180)
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'apple-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(rootDir, 'public', 'apple-touch-icon.png'), pngBuffers[180]);

  // Android & PWA icons (192x192 & 512x512)
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-192.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-512.png'), pngBuffers[512]);

  // Standard icon.png (32x32) for Next.js app router auto-detect
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon-32x32.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon-16x16.png'), pngBuffers[16]);

  // 4. Create multi-resolution ICO file (16x16, 32x32, 48x48)
  const icoData = createIco([
    { width: 16, height: 16, buffer: pngBuffers[16] },
    { width: 32, height: 32, buffer: pngBuffers[32] },
    { width: 48, height: 48, buffer: pngBuffers[48] }
  ]);

  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'favicon.ico'), icoData);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoData);
  console.log('✓ Multi-resolution favicon.ico written to src/app/ & public/');

  console.log('Favicon suite successfully generated!');
}

run().catch((err) => {
  console.error('Failed to generate favicon suite:', err);
  process.exit(1);
});
