import React from 'react';
import { Metadata } from 'next';
import { Link } from '@/components/common/Link';
import { ArrowLeft, Compass, Utensils } from 'lucide-react';
import { kulinerArticles } from '@/data/kulinerArticles';
import { KulinerExplorer } from './components/KulinerExplorer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Khazanah Kuliner Jawa Tengah: Kisah, Resep Pusaka & Filosofi • NUSWARA',
  description:
    'Eksplorasi lengkap kuliner khas Jawa Tengah: dari Lumpia Semarang, Nasi Liwet Solo, Tempe Mendoan Banyumas, Soto Kudus, Dawet Ayu Banjarnegara, hingga Sate Kere dan Garang Asem.',
  openGraph: {
    title: 'Khazanah Kuliner Tradisional Jawa Tengah • NUSWARA',
    description:
      'Telusuri jejak sejarah akulturasi, rahasia bumbu rempah jangkep, etiket bersantap, dan filosofi luhur di balik sajian legendaris tanah Jawa.',
    images: [
      {
        url: '/images/editorial/kuliner-liwet.jpg',
        width: 1200,
        height: 630,
        alt: 'Khazanah Kuliner Jawa Tengah NUSWARA',
      },
    ],
  },
};

export default function KulinerIndexPage() {
  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-24 selection:bg-[#C59B53]/30 selection:text-[#ECC47E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <ScrollReveal direction="up" distance={20}>
          <div>
            <Link
              href="/#kuliner"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C59B53] hover:text-[#ECC47E] transition-colors py-2 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Kembali ke Beranda (Kuliner)</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18130E] border border-[#C59B53]/40 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-[#C59B53]" />
              <span>KHAZANAH KULINER JAWA TENGAH</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5EFE6] leading-tight">
              Ingatan rasa, <br />
              <span className="italic font-normal text-[#ECC47E]">
                warisan yang tinggal di lidah.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#D8C8AD] leading-relaxed font-sans">
              Dari keanggunan hidangan keraton di Surakarta hingga kehangatan warung wedangan di pesisir utara dan penginyongan Banyumas. Di balik setiap suapan, tersimpan rajutan sejarah akulturasi budaya, ketabahan wong cilik, dan falsafah hidup luhur orang Jawa.
            </p>
          </div>
        </ScrollReveal>

        {/* Explorer with Search, Filters, and Cards */}
        <KulinerExplorer articles={kulinerArticles} />
      </div>
    </main>
  );
}
