import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Helper ICO Encoder for Multi-resolution PNGs
function createIco(images) {
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
    entry.writeUInt8(0, 2); // color palette count
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
  const rootDir = process.cwd();
  const sourcePath = '/home/gio/.gemini/antigravity/brain/d2c8c7bb-608d-4c87-a766-7d9c93d78553/.user_uploaded/media_1794985546477_12811f8f.jpg';

  console.log('1. Loading user uploaded Gunungan icon from:', sourcePath);
  const img = sharp(sourcePath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Flood fill from borders to isolate background cleanly
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBgPixel(idx) {
    const r = data[idx * 3];
    const g = data[idx * 3 + 1];
    const b = data[idx * 3 + 2];
    const d = Math.hypot(r - 247, g - 247, b - 247);
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return d < 25 && maxDiff < 15;
  }

  for (let x = 0; x < width; x++) {
    queue.push(0 * width + x);
    queue.push((height - 1) * width + x);
    visited[0 * width + x] = 1;
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    queue.push(y * width + 0);
    queue.push(y * width + (width - 1));
    visited[y * width + 0] = 1;
    visited[y * width + (width - 1)] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1,
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n]) {
        visited[n] = 1;
        if (isBgPixel(n)) {
          queue.push(n);
        }
      }
    }
  }

  const outData = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    const outIdx = i * 4;

    const dist = Math.hypot(r - 247, g - 247, b - 247);
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

    if (visited[i] && isBgPixel(i)) {
      outData[outIdx] = 0;
      outData[outIdx + 1] = 0;
      outData[outIdx + 2] = 0;
      outData[outIdx + 3] = 0;
    } else if (visited[i] && dist < 45 && maxDiff < 30) {
      const alpha = Math.min(1, Math.max(0, (dist - 15) / 30));
      const cleanR = Math.min(255, Math.max(0, Math.round((r - (1 - alpha) * 247) / Math.max(alpha, 0.05))));
      const cleanG = Math.min(255, Math.max(0, Math.round((g - (1 - alpha) * 247) / Math.max(alpha, 0.05))));
      const cleanB = Math.min(255, Math.max(0, Math.round((b - (1 - alpha) * 247) / Math.max(alpha, 0.05))));

      outData[outIdx] = cleanR;
      outData[outIdx + 1] = cleanG;
      outData[outIdx + 2] = cleanB;
      outData[outIdx + 3] = Math.round(alpha * 255);
    } else {
      outData[outIdx] = r;
      outData[outIdx + 1] = g;
      outData[outIdx + 2] = b;
      outData[outIdx + 3] = 255;
    }
  }

  // Trim to exact emblem bounding box
  const trimmedEmblemBuffer = await sharp(outData, { raw: { width, height, channels: 4 } })
    .trim()
    .png({ compressionLevel: 9 })
    .toBuffer();

  const emblemMeta = await sharp(trimmedEmblemBuffer).metadata();
  console.log(`✓ Trimmed emblem extracted: ${emblemMeta.width}x${emblemMeta.height}`);

  // Save extracted emblem
  fs.writeFileSync(path.join(rootDir, 'public', 'images', 'logo', 'nuswara-emblem.png'), trimmedEmblemBuffer);

  // Now create square 512x512 master favicon canvas (transparent background, emblem height = 90% of canvas)
  const masterSize = 512;
  const targetH = Math.round(masterSize * 0.90);
  const targetW = Math.round(targetH * (emblemMeta.width / emblemMeta.height));
  const left = Math.round((masterSize - targetW) / 2);
  const top = Math.round((masterSize - targetH) / 2);

  const resizedEmblem = await sharp(trimmedEmblemBuffer)
    .resize(targetW, targetH, { fit: 'contain' })
    .toBuffer();

  const master512 = await sharp({
    create: {
      width: masterSize,
      height: masterSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resizedEmblem, left, top }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  console.log('✓ Master 512x512 square canvas created');

  // Render PNG resolutions
  const sizes = [16, 32, 48, 180, 192, 512];
  const pngBuffers = {};

  for (const s of sizes) {
    if (s === 512) {
      pngBuffers[s] = master512;
    } else {
      pngBuffers[s] = await sharp(master512)
        .resize(s, s, { fit: 'contain' })
        .png({ compressionLevel: 9 })
        .toBuffer();
    }
    console.log(`✓ Generated ${s}x${s} icon`);
  }

  // 1. Write target PNG files
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-512.png'), pngBuffers[512]);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-192.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(rootDir, 'public', 'apple-touch-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'apple-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon-32x32.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon-16x16.png'), pngBuffers[16]);

  // 2. Generate multi-resolution ICO file (16, 32, 48)
  const icoData = createIco([
    { width: 16, height: 16, buffer: pngBuffers[16] },
    { width: 32, height: 32, buffer: pngBuffers[32] },
    { width: 48, height: 48, buffer: pngBuffers[48] }
  ]);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoData);
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'favicon.ico'), icoData);
  console.log('✓ Multi-resolution favicon.ico written to public/ & src/app/');

  // 3. Generate SVG file with embedded high-res Gunungan emblem
  const base64Emblem = pngBuffers[512].toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${base64Emblem}" width="512" height="512" />
</svg>`;
  const svgBuffer = Buffer.from(svgContent, 'utf-8');
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.svg'), svgBuffer);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon.svg'), svgBuffer);
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'icon.svg'), svgBuffer);
  console.log('✓ SVG icons written to public/ & src/app/');

  console.log('NUSWARA Website Icon Suite updated successfully!');
}

run().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
