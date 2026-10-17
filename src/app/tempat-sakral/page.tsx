import React from 'react';
import { Metadata } from 'next';
import { Link } from '@/components/common/Link';
import { ArrowLeft, Compass, Mountain, Sparkles } from 'lucide-react';
import { tempatSakralArticles } from '@/data/tempatSakralArticles';
import { TempatSakralExplorer } from './components/TempatSakralExplorer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Tempat Sakral & Wisata Spiritual Jawa Tengah: Candi, Punden & Jejak Walisongo • NUSWARA',
  description:
    'Eksplorasi lengkap kisah spiritual, arsitektur suci, kosmologi dan sejarah tempat wisata religius Jawa Tengah: Candi Borobudur, Dataran Tinggi Dieng, Candi Cetho, Candi Sukuh, Masjid Agung Demak, dan Candi Gedong Songo.',
  openGraph: {
    title: 'Tempat Sakral & Wisata Spiritual Jawa Tengah • NUSWARA',
    description:
      'Telusuri jejak keheningan batin, filosofi mandala, ruwatan purba, dan akulturasi cahaya Islam di situs-situs suci tanah Jawa.',
    images: [
      {
        url: '/images/editorial/monumen-borobudur.jpg',
        width: 1200,
        height: 630,
        alt: 'Tempat Sakral Jawa Tengah NUSWARA',
      },
    ],
  },
};

export default function TempatSakralIndexPage() {
  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-24 selection:bg-[#C59B53]/30 selection:text-[#ECC47E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <ScrollReveal direction="up" distance={20}>
          <div>
            <Link
              href="/#monumen"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C59B53] hover:text-[#ECC47E] transition-colors py-2 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Kembali ke Beranda (Tempat Sakral)</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18130E] border border-[#C59B53]/40 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
              <Mountain className="w-3.5 h-3.5 text-[#C59B53]" />
              <span>KHAZANAH TEMPAT SAKRAL & WISATA SPIRITUAL JAWA TENGAH</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5EFE6] leading-tight">
              Di sini, <br />
              <span className="italic font-normal text-gold-gradient">
                waktu terasa hening dan abadi.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#D8C8AD] leading-relaxed font-sans max-w-3xl">
              Dari puncak gunung berselimut halimun kabut hingga pelataran kayu jati bersahaja para wali. Setiap batu andesit yang dipahat bukan sekadar monumen masa silam, melainkan ruang kontemplasi batin—mengajarkan manusia Jawa untuk senantiasa mengingat asal mula kehidupan (<em>Sangkan Paraning Dumadi</em>) dan memelihara keharmonisan semesta (<em>Memayu Hayuning Bawana</em>).
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#ECC47E]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kisah Religius & Sejarah Lengkap</span>
              </span>
              <span>•</span>
              <span>Filosofi & Simbolisme Arsitektur</span>
              <span>•</span>
              <span>Etika Laku Spiritual Ziarah</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Explorer with Search, Filters, and Cards */}
        <TempatSakralExplorer articles={tempatSakralArticles} />
      </div>
    </main>
  );
}
