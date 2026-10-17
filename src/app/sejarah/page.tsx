import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import { sejarahArticles } from '@/data/sejarahArticles';
import { ArrowLeft, ArrowRight, Compass, Clock, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kilas Sejarah Jawa Tengah • NUSWARA',
  description:
    'Telusuri tiga era peradaban agung Jawa Tengah: Mataram Kuno, Kesultanan Islam Pesisir & Mataram Islam, hingga Pergerakan Nasional ksatria modern.',
};

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function SejarahIndexPage() {
  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-20 selection:bg-[#C59B53]/30 selection:text-[#ECC47E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back navigation */}
        <ScrollReveal direction="up" distance={20}>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C59B53] hover:text-[#ECC47E] transition-colors py-2 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18130E] border border-[#C59B53]/40 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-[#C59B53]" />
              <span>KILAS SEJARAH JAWA TENGAH</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5EFE6] leading-tight">
              Berabad-abad cerita, <br />
              <span className="italic font-normal text-[#ECC47E]">
                satu tanah yang sama.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#D8C8AD] leading-relaxed font-sans">
              Dari dataran vulkanik Dieng hingga keraton Surakarta, Jawa Tengah menjadi episentrum bertemunya spiritualitas Hindu-Buddha, kearifan animisme purba, dan peradaban Islam Nusantara. Pilih salah satu era di bawah ini untuk membaca artikel sejarah selengkapnya.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Eras Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {sejarahArticles.map((article, index) => (
            <ScrollReveal
              key={article.slug}
              direction="up"
              distance={35}
              delay={150 + index * 150}
              className="h-full flex"
            >
              <Link
                href={`/sejarah/${article.slug}`}
                className="p-6 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 hover:border-[#ECC47E] transition-all flex flex-col justify-between shadow-xl group hover:-translate-y-1 hover:shadow-2xl cursor-pointer w-full"
              >
                <div className="space-y-4">
                  {/* Image Thumbnail */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#C59B53]/25 bg-[#0D0C0A]">
                    <Image
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Era Badge & Time */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                    <span className="font-bold">
                      {article.eraNumber}. {article.eraSubheading}
                    </span>
                    <span className="text-[#A89F91] text-[11px]">
                      {article.eraPeriod}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-editorial text-xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors leading-snug">
                    {article.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-xs text-[#A89F91] leading-relaxed line-clamp-3">
                    {article.shortSummary}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="pt-6 mt-6 border-t border-[#C59B53]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A89F91] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C59B53]" />
                    <span>{article.readTime}</span>
                  </span>
                  <span className="text-[#ECC47E] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
