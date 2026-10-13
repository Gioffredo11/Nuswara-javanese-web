import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const BASE_URL = 'https://threeui.com';

const FILES_TO_FETCH = [
  {
    target: 'public/3d-assets/books/bestsellers/assets.js',
    url: `${BASE_URL}/3d-assets/books/bestsellers/assets.js`,
    sha256: 'efc8d355ef5fb414116e5ea818eaf9bb8cdaa919f53097f97d8bbb2d98f61e80',
  },
  {
    target: 'public/3d-assets/books/bestsellers/book.css',
    url: `${BASE_URL}/3d-assets/books/bestsellers/book.css`,
    sha256: '7a9884fc4df59e083ea09b4d01800307446de2cf889c21774354f52ea2f86613',
  },
  {
    target: 'public/3d-assets/books/bestsellers/editions.js',
    url: `${BASE_URL}/3d-assets/books/bestsellers/editions.js`,
    sha256: '524cd925f174bed5e8d4262e06fa7378dd1d749da4edc3da7153e8180ae36025',
  },
  {
    target: 'public/3d-assets/books/bestsellers/preview.html',
    url: `${BASE_URL}/3d-assets/books/bestsellers/preview.html`,
    sha256: '7c861c923f25ef49f0075fa819763eeb393bfaeb77f2a745bf8c4179c3907bb1',
  },
  {
    target: 'public/3d-assets/books/bestsellers/viewer.js',
    url: `${BASE_URL}/3d-assets/books/bestsellers/viewer.js`,
    sha256: 'a7ba58926dbb6a3d1f2bcd6c579a43e6e18452613840b8bfc397947d0fe6dedf',
  },
  {
    target: 'public/3d-assets/books/runtime/style.css',
    url: `${BASE_URL}/3d-assets/books/runtime/style.css`,
    sha256: 'dcbecb8fb2f114e9270179d1e031dde46939b7d5001ce3701746dc5fbffb9d06',
  },
  {
    target: 'public/3d-assets/books/runtime/resources.js',
    url: `${BASE_URL}/3d-assets/books/runtime/resources.js`,
    sha256: '31ab62fc50800d5493aa0836c9c106b861b9660229138b3a6596b5e3a70004b5',
  },
  {
    target: 'public/3d-assets/books/bestsellers/README.md',
    url: `${BASE_URL}/3d-assets/books/bestsellers/README.md`,
    sha256: 'd19026a67a1b46fe6ec2ea425b988a9ee9db008ba83b8afd863d73684f29af98',
  },
  // Binary assets
  {
    target: 'public/3d-assets/books/bestsellers/assets/5f73c2c9094bbeef04fdc241909a4672235142882112ec15c6d130f89bf5fd16.jpg',
    url: `${BASE_URL}/3d-assets/books/bestsellers/assets/5f73c2c9094bbeef04fdc241909a4672235142882112ec15c6d130f89bf5fd16.jpg`,
    sha256: '5f73c2c9094bbeef04fdc241909a4672235142882112ec15c6d130f89bf5fd16',
  },
  {
    target: 'public/3d-assets/books/bestsellers/assets/6b3318cc6a7da610e3a55369131b20a2419cda826d558da09da284f09582956d.mp4',
    url: `${BASE_URL}/3d-assets/books/bestsellers/assets/6b3318cc6a7da610e3a55369131b20a2419cda826d558da09da284f09582956d.mp4`,
    sha256: '6b3318cc6a7da610e3a55369131b20a2419cda826d558da09da284f09582956d',
  },
  {
    target: 'public/3d-assets/books/bestsellers/assets/76a7b0b20e4992f91bb5febf2fa8edd2d33fd4b7bb0cda5f8ae0fffdff9d5a7e.mp4',
    url: `${BASE_URL}/3d-assets/books/bestsellers/assets/76a7b0b20e4992f91bb5febf2fa8edd2d33fd4b7bb0cda5f8ae0fffdff9d5a7e.mp4`,
    sha256: '76a7b0b20e4992f91bb5febf2fa8edd2d33fd4b7bb0cda5f8ae0fffdff9d5a7e',
  },
  {
    target: 'public/3d-assets/books/bestsellers/assets/99df6a45ad1f9dd7e47b65c064df0ae58c7c22069fadd9aa896754c3bad27123.jpg',
    url: `${BASE_URL}/3d-assets/books/bestsellers/assets/99df6a45ad1f9dd7e47b65c064df0ae58c7c22069fadd9aa896754c3bad27123.jpg`,
    sha256: '99df6a45ad1f9dd7e47b65c064df0ae58c7c22069fadd9aa896754c3bad27123',
  },
  {
    target: 'public/3d-assets/books/bestsellers/assets/aabcdc51e4d9f6c4cbf6656bbd3447d6b50814507395f9e5bd0efecd7c1b22b3.mp4',
    url: `${BASE_URL}/3d-assets/books/bestsellers/assets/aabcdc51e4d9f6c4cbf6656bbd3447d6b50814507395f9e5bd0efecd7c1b22b3.mp4`,
    sha256: 'aabcdc51e4d9f6c4cbf6656bbd3447d6b50814507395f9e5bd0efecd7c1b22b3',
  },
  {
    target: 'public/3d-assets/books/bestsellers/assets/eafc13621b9605d30356b7d4396072b2593a46e0c47c96d17ba60ca03d98f925.jpg',
    url: `${BASE_URL}/3d-assets/books/bestsellers/assets/eafc13621b9605d30356b7d4396072b2593a46e0c47c96d17ba60ca03d98f925.jpg`,
    sha256: 'eafc13621b9605d30356b7d4396072b2593a46e0c47c96d17ba60ca03d98f925',
  },
];

async function downloadFile(item) {
  const fullPath = path.resolve(process.cwd(), item.target);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  console.log(`Downloading: ${item.url} -> ${item.target}`);
  const res = await fetch(item.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to download ${item.url}: ${res.status} ${res.statusText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  if (item.sha256 && hash !== item.sha256) {
    console.warn(`[WARNING] Hash mismatch for ${item.target}!\nExpected: ${item.sha256}\nGot:      ${hash}`);
  } else {
    console.log(`[OK] Hash verified: ${hash}`);
  }

  fs.writeFileSync(fullPath, buffer);
}

async function main() {
  for (const item of FILES_TO_FETCH) {
    try {
      await downloadFile(item);
    } catch (err) {
      console.error(`Error downloading ${item.target}:`, err.message);
    }
  }
}

main();
