import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NUSWARA: Menelusuri Jejak, Merawat Warisan',
    short_name: 'NUSWARA',
    description:
      'Museum digital kebudayaan Jawa Tengah, wayang kulit adiluhung, dan filosofi Nusantara.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0C0A',
    theme_color: '#0D0C0A',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
