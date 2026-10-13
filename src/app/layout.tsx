import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

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

export const metadata: Metadata = {
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
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

