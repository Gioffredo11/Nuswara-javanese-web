import type { Metadata, Viewport } from 'next';
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { PageTransition } from '@/components/ui/PageTransition';
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar';
import { NativeCursor } from '@/components/ui/NativeCursor';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0D0C0A',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_BASE_URL || 'https://nuswara.id'),
  title: 'NUSWARA: Menelusuri Jejak, Merawat Warisan',
  description:
    'Platform digital pelestarian sejarah Jawa Tengah, wayang kulit adiluhung, dan filosofi Nusantara: Wayangpedia, Silsilah Purwa, Javanese Oracle Weton, Manifestasi Harian, dan Web Photobooth.',
  keywords: [
    'Nuswara',
    'Jawa Epic',
    'Wayang Kulit',
    'Jawa Tengah',
    'Sejarah Jawa',
    'Budaya Jawa',
    'Wayangpedia',
    'Gatotkaca',
    'Arjuna',
    'Weton Jawa',
    'Oracle Jawa',
    'Photobooth Wayang',
  ],
  authors: [{ name: 'Nuswara Cultural Collective' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'NUSWARA: Menelusuri Jejak, Merawat Warisan',
    description:
      'Menelusuri jejak, merawat warisan. Platform digital interaktif sejarah, wayang kulit, dan kearifan Jawa Tengah untuk generasi muda.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${cinzel.variable} ${cormorant.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#0D0C0A] text-[#F5EFE6] font-sans selection:bg-[#C59B53]/35 selection:text-[#FFF8EC]">
        {/* WCAG AA Accessible Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[999] px-4 py-2.5 bg-[#C59B53] text-[#0D0C0A] font-bold text-xs rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#ECC47E] focus:ring-offset-2 focus:ring-offset-[#0D0C0A] transition-transform"
        >
          Lewati ke Konten Utama
        </a>

        {/* Scroll-progress gold line at top of viewport */}
        <ReadingProgressBar />

        {/* Custom spring-lag gold cursor (desktop only, hides on touch) */}
        <NativeCursor />

        <Navbar />

        {/* Cinematic ink-wash page transition veil */}
        <PageTransition>
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
        </PageTransition>

        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
