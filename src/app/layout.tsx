import type { Metadata, Viewport } from 'next';
import { Poppins, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollProgressSidebar } from '@/components/layout/ScrollProgressSidebar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/PageTransition';
import { ServiceWorkerRegister } from '@/components/common/ServiceWorkerRegister';

// Core Heading & Display Font: Poppins (Geometris kuat, rapi, modern untuk headings & titles)
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Core Body, UI, & Label Font: Plus Jakarta Sans (Modern authentic Indonesian geometric sans)
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
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Javanese:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-[#0D0C0A] text-[#F5EFE6] font-sans selection:bg-[#C59B53]/35 selection:text-[#FFF8EC]">
        <ServiceWorkerRegister />
        {/* WCAG AA Accessible Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[999] px-4 py-2.5 bg-[#C59B53] text-[#0D0C0A] font-bold text-xs rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#ECC47E] focus:ring-offset-2 focus:ring-offset-[#0D0C0A] transition-transform"
        >
          Lewati ke Konten Utama
        </a>

        <Navbar />
        <ScrollProgressSidebar />

        {/* Cinematic ink-wash page transition veil */}
        <PageTransition>
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
        </PageTransition>

        <Footer />
      </body>
    </html>
  );
}
