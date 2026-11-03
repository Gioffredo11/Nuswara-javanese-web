'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GununganSvg,
  BatikKawungPatternSvg,
  BatikParangPatternSvg,
  GoldenDustMotes,
} from '@/components/ui/WayangVectors';
import {
  ArrowRight,
  BookOpen,
  Camera,
  GitFork,
  Check,
  Share2,
  Sparkles,
} from 'lucide-react';

// Embed all major sections into unified experience
import { WayangpediaClient } from '@/app/wayangpedia/WayangpediaClient';
import { FamilyTreeClient } from '@/app/family-tree/FamilyTreeClient';
import { OracleClient } from '@/app/oracle/OracleClient';
import { PhotoboothClient } from '@/app/photobooth/PhotoboothClient';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TokohIdentitySection } from '@/components/ui/TokohIdentitySection';
import { useInkRipple } from '@/components/ui/useInkRipple';
import { ParallaxHero } from '@/components/ui/ParallaxHero';

interface HomePageProps {
  defaultSection?: string;
}

function SectionDivider({
  number,
  title,
  light = false,
}: {
  number: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  light?: boolean;
}) {
  return (
    <div className="relative py-12 md:py-16 overflow-hidden select-none" aria-hidden="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div
            className={`flex-1 h-px ${
              light
                ? 'bg-[#1C1814]/15'
                : 'bg-[#C5A059]/20'
            }`}
          />
          <div
            className={`flex items-center gap-2.5 px-4 py-1.5 border ${
              light
                ? 'bg-[#EAE3D5] border-[#1C1814]/20 text-[#1C1814]'
                : 'bg-[#14110E] border-[#C5A059]/30 text-[#C5A059]'
            }`}
          >
            <span className="text-[10px] text-[#C5A059]">❖</span>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase">
              ARSIP // {number} — {title}
            </span>
          </div>
          <div
            className={`flex-1 h-px ${
              light
                ? 'bg-[#1C1814]/15'
                : 'bg-[#C5A059]/20'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

const HISTORY_CHAPTERS = [
  {
    id: 1,
    chronology: '01. Kerajaan Mataram Kuno',
    period: 'Abad VIII — X M',
    chapterTag: 'BABAK 01 // MATARAM KUNO',
    title: 'Era Keagungan Candi & Pemujaan Semesta',
    image: '/images/editorial/candi-relief.jpg',
    catalogNo: '0824-BDR',
    location: 'MAGELANG',
    imageLabel: 'RELIEF CANDI BOROBUDUR • ABAD VIII MASEHI',
    imageCaption: 'Guratan batu andesit yang memahat doa dan perjalanan spiritual manusia Jawa.',
    dropCapLetter: 'P',
    narrative: 'embangunan Candi Borobudur oleh Dinasti Syailendra dan Candi Prambanan oleh Rakai Pikatan meletakkan fondasi kosmologi agung yang memuliakan harmoni antara manusia, semesta alam, dan Sang Pencipta melalui mahakarya batu andesit abadi.',
    philosophicalQuote: 'Kearifan Mataram Kuno mengajarkan bahwa perbedaan keyakinan bukan jurang pemisah, melainkan dua sayap doa yang mengantarkan kemakmuran peradaban.',
    ctaLabel: 'Baca Kisah Mataram Kuno',
    ctaLink: '/sejarah/era-keagungan-candi',
  },
  {
    id: 2,
    chronology: '02. Kesultanan Islam',
    period: 'Abad XV — XVII M',
    chapterTag: 'BABAK 02 // KESULTANAN ISLAM',
    title: 'Akulturasi Wayang Kulit & Tembang Macapat',
    image: '/images/editorial/monumen-demak.jpg',
    catalogNo: '1479-DMK',
    location: 'DEMAK & SURAKARTA',
    imageLabel: 'MASJID AGUNG DEMAK & WAYANG WALI',
    imageCaption: 'Gamelan, tembang macapat, dan wayang purwa menjadi jembatan syiar budi pekerti luhur.',
    dropCapLetter: 'P',
    narrative: 'ara wali menggubah wayang purwa dan gamelan laras slendro-pelog menjadi wahana dakwah kultural. Munculnya serat-serat piwulang keraton merajut persaudaraan di tanah pesisir hingga pedalaman Jawa, menyatukan rasa batin masyarakat.',
    philosophicalQuote: 'Agama ageming aji: ajaran luhur bersemi subur ketika dipeluk dengan rasa tepa selira dan kearifan bahasa ibu.',
    ctaLabel: 'Baca Kisah Kesultanan Islam',
    ctaLink: '/sejarah/akulturasi-wayang-kulit',
  },
  {
    id: 3,
    chronology: '03. Ksatria Modern',
    period: 'Abad XIX — XXI M',
    chapterTag: 'BABAK 03 // KSATRIA MODERN',
    title: 'Ksatria Modern: Literasi, Pendidikan, & Kelestarian',
    image: '/images/editorial/tokoh-kartini.jpg',
    catalogNo: '1879-KRT',
    location: 'JEPARA & YOGYAKARTA',
    imageLabel: 'MANUSKRIP EMAS PERGERAKAN BANGSA',
    imageCaption: 'Goresan pena emansipasi dan pendidikan yang membangkitkan akal budi luhur bangsa.',
    dropCapLetter: 'P',
    narrative: 'erjuangan Pangeran Diponegoro, R.A. Kartini, hingga Ki Hadjar Dewantara menegakkan martabat batin bangsa. Hari ini, Nuswara meneruskan estafet nilai tersebut ke ranah digital agar kearifan Jawa terus bertunas di masa depan.',
    philosophicalQuote: 'Habis gelap terbitlah terang: warisan leluhur bukan abu mati yang disembah, melainkan api kebajikan yang terus kita rawat nyalanya.',
    ctaLabel: 'Baca Kisah Ksatria Modern',
    ctaLink: '/sejarah/ksatria-modern',
  },
];

export function HomePage({ defaultSection }: HomePageProps = {}) {
  const [philosophiesCount, setPhilosophiesCount] = useState<number>(11);
  const [activeHistoryChapter, setActiveHistoryChapter] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const onRipple = useInkRipple();

  const currentChapter = HISTORY_CHAPTERS.find((c) => c.id === activeHistoryChapter) || HISTORY_CHAPTERS[0];

  // Smooth scroll to target section when requested
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  // Scroll to section on initial load if defaultSection or hash is present
  useEffect(() => {
    const scrollToTarget = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const target = defaultSection || window.location.hash.replace('#', '');
    if (target) {
      scrollToTarget(target);
      const t1 = setTimeout(() => scrollToTarget(target), 300);
      const t2 = setTimeout(() => scrollToTarget(target), 800);

      const handleHashChange = () => {
        const newTarget = window.location.hash.replace('#', '');
        if (newTarget) scrollToTarget(newTarget);
      };
      window.addEventListener('hashchange', handleHashChange);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, [defaultSection]);

  // Fetch philosophies count
  useEffect(() => {
    fetch('/api/philosophies')
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setPhilosophiesCount(res.data.length);
      })
      .catch(() => {});
  }, []);

  const handleShareWebsite = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div id="beranda" className="flex flex-col min-h-screen relative bg-[#0C0A08] text-[#F4EFE6] overflow-x-hidden">
      {/* =========================================================================
          0. CINEMATIC HERO SECTION: NUSWARA MUSEUM DIGITAL JAWA TENGAH
          ========================================================================= */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Background Landscape Atmosphere */}
        <ParallaxHero className="absolute inset-0 pointer-events-none z-0 overflow-hidden" speed={0.15}>
          <div data-parallax className="absolute inset-0 scale-[1.12] origin-center">
            <Image
              src="/images/editorial/hero-nuswara-reference.jpg"
              alt="Misty landscape of Mount Merapi and Borobudur temples Central Java with noble Wayang silhouette"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[78%_center] md:object-center filter brightness-[0.98] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A08]/95 via-[#0C0A08]/50 to-transparent pointer-events-none md:via-[#0C0A08]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-transparent to-[#0C0A08]/50 pointer-events-none" />
          </div>
        </ParallaxHero>

        {/* Ambient Golden Sparks & Floating Dust Motes */}
        <GoldenDustMotes className="absolute inset-0 pointer-events-none z-10 opacity-50 animate-dust-particle-1" />

        {/* Left: Asymmetrical Editorial Typography */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-20 w-full my-auto py-12 lg:py-16">
          <ScrollReveal direction="up" distance={30} delay={100}>
            <div className="max-w-2xl lg:max-w-3xl space-y-6 md:space-y-8 text-left">
              {/* Eyebrow: Horizontal Gold Line + Category */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#C5A059]" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                  MUSEUM DIGITAL JAWA TENGAH
                </span>
              </div>

              {/* Classical Serif Title */}
              <h1 className="font-royal text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-normal tracking-[0.06em] text-[#F4EFE6] leading-none select-none headline-enter">
                NUSWARA
              </h1>

              {/* Subtitle & Literary Lead */}
              <div className="space-y-3.5 max-w-xl">
                <p className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-[#F4EFE6] leading-snug font-normal tracking-wide">
                  Menelusuri Jejak, Merawat Warisan.
                </p>
                <p className="font-sans text-sm sm:text-base md:text-lg text-[#A89F91] leading-relaxed font-light">
                  Jawa Tengah bukan sekadar tempat. Ia adalah cerita dan warisan yang terus hidup.
                </p>
              </div>

              {/* Primary Antique Gold Metal CTA Button */}
              <div className="pt-2 sm:pt-4 flex items-center">
                <button
                  type="button"
                  onClick={(e) => { onRipple(e); scrollToSection('sejarah'); }}
                  className="relative overflow-hidden px-8 py-4 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs sm:text-sm font-mono tracking-widest uppercase rounded-xl transition-all duration-300 shadow-xl flex items-center gap-3 cursor-pointer group"
                >
                  <span>Jelajahi Jawa Tengah</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          EDITORIAL STATEMENT: "Warisan bukan hanya masa lalu..."
          ========================================================================= */}
      <section className="bg-[#14110E] py-14 sm:py-18 border-y border-[#C5A059]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal direction="up" distance={30}>
            <div className="space-y-4 max-w-3xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                [ MANIFESTO // NUSWARA ]
              </span>
              <h2 className="font-editorial italic text-3xl sm:text-4xl lg:text-5xl text-[#F4EFE6] leading-tight tracking-tight">
                Warisan bukan hanya masa lalu.{' '}
                <span className="text-gold-gradient font-normal block mt-1">
                  Ia hidup di antara kita.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#A89F91] leading-relaxed font-sans pt-1">
                Dari lereng gunung hingga ruang keraton, dari kisah para tokoh hingga rasa di meja makan, NUSWARA mengajakmu mengenal Jawa Tengah melalui hal-hal yang membentuk jiwa dan kesehariannya.
              </p>
            </div>
          </ScrollReveal>

          {/* Minimalist Editorial Navigation Anchors */}
          <ScrollReveal direction="up" distance={20} delay={150}>
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#C5A059]/15 text-xs font-mono">
              {[
                { number: '01', label: 'Jejak Sejarah', target: 'sejarah' },
                { number: '02', label: 'Tokoh & Pemikiran', target: 'tokoh' },
                { number: '03', label: 'Seni & Tradisi', target: 'wayangpedia' },
                { number: '04', label: 'Rasa & Cerita', target: 'kuliner' },
                { number: '05', label: 'Ruang Sakral', target: 'monumen' },
              ].map((pill) => (
                <button
                  key={pill.number}
                  type="button"
                  onClick={(e) => { onRipple(e); scrollToSection(pill.target); }}
                  className="inline-flex items-center gap-2 text-[#A89F91] hover:text-[#C5A059] bg-[#0C0A08] border border-[#C5A059]/20 hover:border-[#C5A059]/50 rounded-full px-3.5 py-1.5 transition-all cursor-pointer group tracking-wider uppercase"
                >
                  <span className="text-[#C5A059] font-bold">
                    [{pill.number}]
                  </span>
                  <span className="group-hover:underline underline-offset-4 decoration-[#C5A059]/40">
                    {pill.label}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          SEKSI SEJARAH: "KILAS SEJARAH JAWA TENGAH" (3-Column Archival Ledger)
          ========================================================================= */}
      <section id="sejarah" className="bg-[#F3EFE6] text-[#1C1814] py-20 sm:py-24 scroll-mt-20 border-b border-[#1C1814]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-width Section Header */}
          <div className="border-b border-[#1C1814]/15 pb-8 mb-12">
            <ScrollReveal direction="up" distance={30}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C6D32] font-bold block">
                    BAB I // KILAS SEJARAH JAWA TENGAH
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1814] leading-[1.05]">
                    Berabad-abad cerita, <br />
                    <span className="italic font-normal text-[#8C6D32]">satu tanah yang sama.</span>
                  </h2>
                </div>
                <p className="text-sm text-[#574F44] leading-relaxed font-sans max-w-md">
                  Dari dataran vulkanik Dieng hingga keraton Surakarta, Jawa Tengah menjadi episentrum bertemunya spiritualitas Hindu-Buddha, kearifan animisme purba, dan peradaban Islam Nusantara.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* 3-Column Asymmetrical Archival Ledger (2 : 5 : 5 on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
            {/* Kolom 1: Indeks Kronologi Babak (2 cols) */}
            <div className="lg:col-span-2 space-y-4 lg:border-r lg:border-[#1C1814]/15 lg:pr-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C6D32] block font-bold">
                INDEKS KRONOLOGI
              </span>
              <div className="space-y-2">
                {HISTORY_CHAPTERS.map((ch) => {
                  const isActive = ch.id === activeHistoryChapter;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setActiveHistoryChapter(ch.id)}
                      className={`w-full text-left pl-3.5 pr-2 py-2.5 transition-all border-l-2 rounded-r-xl cursor-pointer ${
                        isActive
                          ? 'border-[#8C6D32] bg-[#EAE3D5] shadow-xs'
                          : 'border-transparent hover:border-[#1C1814]/30 hover:bg-[#EAE3D5]/50'
                      }`}
                    >
                      <span className={`text-[11px] font-mono font-bold block ${isActive ? 'text-[#1C1814]' : 'text-[#574F44]'}`}>
                        {ch.chronology}
                      </span>
                      <span className={`text-[10px] font-mono block ${isActive ? 'text-[#8C6D32]' : 'text-[#8C6D32]/70'}`}>
                        {ch.period}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kolom 2: Artefak Visual & Museum Catalog Placard (5 cols) */}
            <div className="lg:col-span-5 lg:border-r lg:border-[#1C1814]/15 lg:px-8">
              <ScrollReveal direction="up" distance={30} delay={100}>
                <div className="border border-[#1C1814]/20 p-2.5 bg-[#EAE3D5] rounded-xl overflow-hidden">
                  <div className="relative aspect-[4/3] bg-[#1C1814]/10 rounded-lg overflow-hidden">
                    <Image
                      src={currentChapter.image}
                      alt={currentChapter.imageLabel}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover hover:scale-102 transition-transform duration-700"
                    />
                  </div>
                  <div className="pt-3.5 pb-1 px-1">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#8C6D32] font-semibold border-b border-[#1C1814]/10 pb-1.5 mb-2">
                      <span>[ ARSIP VISUAL // KATALOG NO. {currentChapter.catalogNo} ]</span>
                      <span>{currentChapter.location}</span>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1C1814] font-bold block">
                      {currentChapter.imageLabel}
                    </span>
                    <p className="font-editorial italic text-xs text-[#574F44] mt-1.5 leading-relaxed">
                      {currentChapter.imageCaption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Kolom 3: Narasi Editorial & Aksi (5 cols) */}
            <div className="lg:col-span-5 lg:pl-8 space-y-6">
              <ScrollReveal direction="up" distance={30} delay={150}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C6D32] font-bold block">
                    {currentChapter.chapterTag}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1814] leading-tight mt-1">
                    {currentChapter.title}
                  </h3>
                </div>

                <p className="text-sm text-[#4A3F35] leading-relaxed font-sans">
                  <span className="float-left text-4xl sm:text-5xl font-editorial font-bold leading-none pr-3 pt-1 text-[#8C6D32]">
                    {currentChapter.dropCapLetter}
                  </span>
                  {currentChapter.narrative}
                </p>

                <blockquote className="border-l-2 border-[#8C6D32] pl-4 py-1 italic font-editorial text-xs sm:text-sm text-[#4A3F35] leading-relaxed">
                  &ldquo;{currentChapter.philosophicalQuote}&rdquo;
                </blockquote>

                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href={currentChapter.ctaLink}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1C1814] hover:bg-[#8C6D32] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <span>{currentChapter.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/sejarah"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#1C1814]/30 hover:border-[#1C1814] text-[#1C1814] hover:bg-[#1C1814]/5 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#8C6D32]" />
                    <span>Buka Arsip Lengkap</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ARCHIVAL TOKOH SECTION: "Mereka meninggalkan jejak. Kita meneruskan makna."
          ========================================================================= */}
      <section id="tokoh" className="bg-[#0C0A08] py-20 border-b border-[#C5A059]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TokohIdentitySection />
        </div>
      </section>

      {/* =========================================================================
          ATMOSPHERIC WAYANG SPOTLIGHT: "Di balik wayang, ada kebijaksanaan."
          ========================================================================= */}
      <section className="bg-[#14110E] py-16 sm:py-20 border-y border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Atmospheric Wayang Kelir Photo */}
            <ScrollReveal direction="up" distance={40} delay={100} className="lg:col-span-6">
              <div className="relative aspect-[16/9] sm:aspect-[4/3] border border-[#C5A059]/30 overflow-hidden bg-[#0C0A08]">
                <Image
                  src="/images/editorial/wayang-kelir.jpg"
                  alt="Wayang kulit performance behind illuminated white screen"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover filter contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-transparent to-transparent opacity-60" />
              </div>
            </ScrollReveal>

            {/* Right: Wayang Philosophy Copy */}
            <ScrollReveal direction="up" distance={40} delay={250} className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                [ FILSAFAT // PAKELIRAN ]
              </span>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] leading-tight">
                Di balik wayang, <br />
                <span className="italic font-normal text-gold-gradient">ada kebijaksanaan.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#A89F91] leading-relaxed font-sans">
                Kelir putih adalah lambang jagad raya yang fana. Blencong minyak kelapa adalah lentera kehidupan yang meniupkan nyawa. Gunungan menandai awal dan akhir setiap putaran takdir.
              </p>

              <p className="text-xs sm:text-sm text-[#A89F91]/80 leading-relaxed font-sans">
                Setiap tokoh wayang (mulai dari ketenangan batin Arjuna, kejujuran lugas Bima, keteguhan hati Gatotkaca, hingga kebijaksanaan jenaka Punokawan) merupakan cermin dari pergulatan jiwa manusia dalam menemukan dharma sejatinya.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    onRipple(e);
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('open-manifestation-modal'));
                    }
                  }}
                  className="group relative px-6 py-3.5 bg-gradient-to-r from-[#C5A059] via-[#E2C37E] to-[#C5A059] hover:from-[#D5B36E] hover:to-[#E0BF78] text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.55)] hover:scale-[1.02] active:scale-95 flex items-center gap-2.5 cursor-pointer overflow-hidden"
                >
                  <Sparkles className="w-4 h-4 text-[#0C0A08] animate-pulse" />
                  <span>Tarik Kartu Manifestasi Hari Ini</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0C0A08]/80 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('wayangpedia')}
                  className="px-6 py-3.5 bg-[#14110E] hover:bg-[#1C1610] text-[#C5A059] font-mono text-xs uppercase tracking-wider border border-[#C5A059]/40 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Katalog Wayangpedia</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURE SECTION 01: WAYANGPEDIA & BUDAYA
          ========================================================================= */}
      <div id="budaya" className="scroll-mt-24" />
      <section id="wayangpedia" className="scroll-mt-20 py-10 bg-[#0C0A08]">
        <SectionDivider number="01" title="WAYANGPEDIA" />
        <WayangpediaClient />
      </section>

      {/* =========================================================================
          FEATURE SECTION 02: SILSILAH WAYANG PURWA
          ========================================================================= */}
      <section id="family-tree" className="scroll-mt-20 py-10 bg-[#14110E] border-y border-[#C5A059]/20">
        <SectionDivider number="02" title="SILSILAH PURWA" />
        <FamilyTreeClient />
      </section>

      {/* =========================================================================
          FEATURE SECTION 03: JAVANESE ORACLE (WETON MATCHER)
          ========================================================================= */}
      <section id="oracle" className="scroll-mt-20 py-10 bg-[#0C0A08] border-y border-[#C5A059]/20">
        <SectionDivider number="03" title="JAVANESE ORACLE" />
        <OracleClient />
      </section>

      {/* =========================================================================
          GASTRONOMY SECTION: "Ingatan yang tinggal di lidah." (KULINER JAWA TENGAH)
          ========================================================================= */}
      <section id="kuliner" className="bg-[#14110E] text-[#F4EFE6] py-20 border-b border-[#C5A059]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="border-b border-[#C5A059]/20 pb-8">
            <ScrollReveal direction="up" distance={30}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                    BAB II // KHAZANAH RASA JAWA TENGAH
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] leading-[1.05]">
                    Ingatan yang tinggal <br />
                    <span className="italic font-normal text-gold-gradient">di kedalaman lidah.</span>
                  </h2>
                </div>
                <p className="text-sm text-[#A89F91] leading-relaxed font-sans max-w-md">
                  Kekayaan cita rasa warisan yang melintasi dapur keraton hingga kehangatan warung wedangan di sudut kota tua, merajut identitas kultural dalam setiap gigitan.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* PRIMARY HOOK: Lumpia Semarang Standalone Gastronomy Showcase */}
          <ScrollReveal direction="up" distance={35} delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left: Expansive Gastronomic Visual Window */}
              <div className="lg:col-span-7">
                <Link
                  href="/kuliner/lumpia-semarang"
                  className="group block relative aspect-[16/10] w-full border border-[#C5A059]/30 bg-[#0C0A08] rounded-2xl overflow-hidden cursor-pointer"
                  aria-label="Lumpia Semarang — baca kisah akulturasi dan resep otentik"
                >
                  <Image
                    src="/images/editorial/kuliner-lumpia.jpg"
                    alt="Traditional Lumpia Semarang — Akulturasi Tionghoa-Jawa"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-transparent to-transparent opacity-80" />

                  {/* Antique Gastronomic Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#0C0A08]/90 border border-[#C5A059]/40 text-[#C5A059] text-[10px] font-mono font-bold tracking-widest uppercase rounded-full">
                      WARISAN BUDAYA TAKBENDA
                    </span>
                    <span className="px-3 py-1 bg-[#0C0A08]/90 border border-[#C5A059]/40 text-[#A89F91] text-[10px] font-mono uppercase tracking-wider rounded-full">
                      SEMARANG • SEJAK 1870
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#C5A059]">
                    <span>AKULTURASI RASA TIONGHOA-JAWA</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#F4EFE6]">
                      <span>Eksplorasi Kisah</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Right: Deep Culinary Narrative & Key Flavor Hallmarks */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-[#C5A059] uppercase tracking-wider block">
                    GANG LOMBOK • PESISIR UTARA JAWA
                  </span>

                  <h3 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] mt-1 leading-tight">
                    Lumpia Semarang
                  </h3>
                  <p className="font-editorial italic text-sm text-[#C5A059] mt-1">
                    Lunpia Semawis — Cita Rasa Abadi Akulturasi Dua Tradisi
                  </p>
                </div>

                <p className="text-sm text-[#A89F91] leading-relaxed font-sans">
                  Lahir dari kisah cinta Tjoa Thay Yoe dan Mbok Wasih di Pasar Johar abad ke-19, memadukan tradisi gulung gandum Tionghoa dengan manis gurih rebung muda dan bumbu rempah Jawa. Simbol toleransi rasa luhur yang merajut persaudaraan di tanah pesisir.
                </p>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <Link
                    href="/kuliner/lumpia-semarang"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider rounded-xl transition-all shadow-lg group cursor-pointer"
                  >
                    <span>Pelajari Sejarah &amp; Resep Lumpia Semarang</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Horizontal Directory Strip (01 to 06) */}
          <ScrollReveal direction="up" distance={20} delay={150}>
            <div className="pt-6 border-t border-[#C5A059]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#A89F91]">
                <span className="text-[#C5A059] uppercase tracking-wider font-bold">
                  KHAZANAH RASA LAINNYA:
                </span>
                {[
                  { index: '01', name: 'Nasi Liwet Solo', slug: 'nasi-liwet-solo' },
                  { index: '02', name: 'Tempe Mendoan', slug: 'tempe-mendoan-banyumas' },
                  { index: '03', name: 'Soto Kudus', slug: 'soto-kudus' },
                  { index: '04', name: 'Dawet Ayu', slug: 'dawet-ayu-banjarnegara' },
                  { index: '05', name: 'Sate Kere', slug: 'sate-kere-solo' },
                  { index: '06', name: 'Garang Asem', slug: 'garang-asem-kudus' },
                ].map((dish, idx) => (
                  <React.Fragment key={dish.slug}>
                    {idx > 0 && <span className="text-[#C5A059]/30">|</span>}
                    <Link
                      href={`/kuliner/${dish.slug}`}
                      className="hover:text-[#C5A059] transition-colors inline-flex items-center gap-1.5 group py-0.5"
                    >
                      <span className="text-[#C5A059] font-bold">{dish.index}.</span>
                      <span className="group-hover:underline underline-offset-4 decoration-[#C5A059]/40 text-[#F4EFE6]">
                        {dish.name}
                      </span>
                    </Link>
                  </React.Fragment>
                ))}
              </div>

              <Link
                href="/kuliner"
                className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#F4EFE6] font-bold transition-colors group shrink-0"
              >
                <span>Buka Direktori Kuliner</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          SACRED MONUMENT SECTION: CANDI BOROBUDUR AS THE PRIMARY HOOK
          ========================================================================= */}
      <section id="monumen" className="bg-[#0C0A08] py-20 border-b border-[#C5A059]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="border-b border-[#C5A059]/20 pb-8">
            <ScrollReveal direction="up" distance={30}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                    BAB III // MONUMEN KEABADIAN &amp; RUANG SAKRAL
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] leading-[1.05]">
                    Di sini, <br />
                    <span className="italic font-normal text-gold-gradient">waktu terasa hening.</span>
                  </h2>
                </div>
                <p className="text-sm text-[#A89F91] leading-relaxed font-sans max-w-md">
                  Mahakarya arsitektur batu andesit purba yang berdiri tegak menantang abad, mengabadikan renungan batin serta kosmologi spiritual tertinggi di tanah Jawa.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Monument Top Monospace Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A89F91] border-b border-[#C5A059]/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[#C5A059] font-bold">[ SITUS WARISAN DUNIA // UNESCO NO. 592 ]</span>
              <span>•</span>
              <span>LEMBAH TIDAR • DINASTI SYAILENDRA</span>
            </div>
            <div className="text-[#C5A059]">
              MAGELANG • 824 MASEHI
            </div>
          </div>

          {/* PRIMARY HOOK: Candi Borobudur Monumental Panoramic Showcase */}
          <ScrollReveal direction="up" distance={35} delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left: Expansive Architectural Window (7 cols) */}
              <div className="lg:col-span-7">
                <Link
                  href="/tempat-sakral/candi-borobudur"
                  className="group block relative aspect-[16/10] w-full border border-[#C5A059]/30 bg-[#14110E] rounded-2xl overflow-hidden cursor-pointer"
                  aria-label="Candi Borobudur — baca kisah spiritual lengkap"
                >
                  <Image
                    src="/images/editorial/monumen-borobudur.jpg"
                    alt="Sunrise over Borobudur stupas, Central Java — UNESCO World Heritage"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#C5A059]">
                    <span>MANDALA KOSMIK TERBESAR DI DUNIA</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#F4EFE6]">
                      <span>Eksplorasi Monumen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Right: Deep Editorial Narrative & Key Hallmarks (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-[#C5A059] uppercase tracking-wider block">
                    KOSMOLOGI TIGA ALAM KESADARAN
                  </span>

                  <h3 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] mt-1 leading-tight">
                    Candi Borobudur
                  </h3>
                  <p className="font-editorial italic text-sm text-[#C5A059] mt-1">
                    Sang Kamadhatu, Rupadhatu, tumeka Arupadhatu
                  </p>
                </div>

                <p className="text-sm text-[#A89F91] leading-relaxed font-sans">
                  Piramida mandala terbesar di bumi yang menuntun peziarah melintasi tiga alam kesadaran batin manusia: dari belenggu hawa nafsu duniawi (<em>Kamadhatu</em>), melampaui wujud dan rupa kebajikan (<em>Rupadhatu</em>), hingga mencapai keheningan sempurna tanpa rupa (<em>Arupadhatu</em>).
                </p>

                <div className="pt-1">
                  <Link
                    href="/tempat-sakral/candi-borobudur"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider rounded-xl transition-all shadow-lg group cursor-pointer"
                  >
                    <span>Pelajari Filosofi Spiritual Borobudur</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Monumental Metrics Bar (4 Columns Full-Width) */}
          <ScrollReveal direction="up" distance={25} delay={150}>
            <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#C5A059]/20 divide-y lg:divide-y-0 lg:divide-x divide-[#C5A059]/20 bg-[#14110E] rounded-2xl overflow-hidden">
              <div className="p-6 text-center lg:text-left">
                <span className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C5A059] block">2.672</span>
                <span className="font-mono text-[11px] text-[#A89F91] uppercase tracking-wider mt-1 block">Panel Pahat Relief</span>
              </div>
              <div className="p-6 text-center lg:text-left">
                <span className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C5A059] block">504</span>
                <span className="font-mono text-[11px] text-[#A89F91] uppercase tracking-wider mt-1 block">Arca Meditasi Buddha</span>
              </div>
              <div className="p-6 text-center lg:text-left">
                <span className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C5A059] block">72</span>
                <span className="font-mono text-[11px] text-[#A89F91] uppercase tracking-wider mt-1 block">Stupa Teras Berongga</span>
              </div>
              <div className="p-6 text-center lg:text-left">
                <span className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C5A059] block">55.000 m³</span>
                <span className="font-mono text-[11px] text-[#A89F91] uppercase tracking-wider mt-1 block">Struktur Batu Andesit</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Minimalist Editorial Exploration Options */}
          <ScrollReveal direction="up" distance={20} delay={150}>
            <div className="pt-6 border-t border-[#C5A059]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#A89F91]">
                <span className="text-[#C5A059] uppercase tracking-wider font-bold">
                  SITUS SAKRAL LAINNYA:
                </span>
                {[
                  { index: '01', name: 'Dataran Tinggi Dieng', slug: 'dataran-tinggi-dieng', note: '2.093 MDPL' },
                  { index: '02', name: 'Candi Cetho', slug: 'candi-cetho', note: 'Gunung Lawu' },
                  { index: '03', name: 'Masjid Agung Demak', slug: 'masjid-agung-demak', note: '1479 M' },
                  { index: '04', name: 'Candi Sukuh', slug: 'candi-sukuh', note: 'Piramida Maya' },
                  { index: '05', name: 'Candi Gedong Songo', slug: 'candi-gedong-songo', note: 'Ungaran' },
                ].map((site, idx) => (
                  <React.Fragment key={site.slug}>
                    {idx > 0 && <span className="text-[#C5A059]/30">|</span>}
                    <Link
                      href={`/tempat-sakral/${site.slug}`}
                      className="hover:text-[#C5A059] transition-colors inline-flex items-center gap-1.5 group py-0.5"
                    >
                      <span className="text-[#C5A059] font-bold">{site.index}.</span>
                      <span className="group-hover:underline underline-offset-4 decoration-[#C5A059]/40 text-[#F4EFE6]">
                        {site.name}
                      </span>
                      <span className="text-[10px] text-[#A89F91]/70">
                        ({site.note})
                      </span>
                    </Link>
                  </React.Fragment>
                ))}
              </div>

              <Link
                href="/tempat-sakral"
                className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#F4EFE6] font-bold transition-colors group shrink-0"
              >
                <span>Buka Direktori Tempat Sakral</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          FEATURE SECTION 04: WEB PHOTOBOOTH (4-CUT)
          ========================================================================= */}
      <section id="photobooth" className="scroll-mt-20 py-10 bg-[#0C0A08]">
        <SectionDivider number="04" title="WEB PHOTOBOOTH" />
        <PhotoboothClient autoStart={defaultSection === 'photobooth'} />
      </section>

      {/* =========================================================================
          CLOSING EDITORIAL BANNER: "Budaya tetap hidup, ketika kita ikut merawatnya."
          ========================================================================= */}
      <section className="bg-[#F3EFE6] text-[#1C1814] py-20 text-center border-t border-[#1C1814]/15">
        <ScrollReveal direction="up" distance={30}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="w-12 h-16 mx-auto opacity-75">
              <GununganSvg className="w-full h-full text-[#8C6D32]" />
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#1C1814] leading-tight max-w-2xl mx-auto">
              Budaya tetap hidup, <br />
              <span className="italic font-normal text-[#8C6D32]">ketika kita ikut merawatnya.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#574F44] max-w-xl mx-auto leading-relaxed">
              Nuswara hadir agar tradisi adiluhung Jawa Tengah tidak berhenti sebagai kenangan masa lalu, melainkan berakar dan terus bertunas dalam denyut kehidupan generasi modern.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleShareWebsite}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1814] hover:bg-[#8C6D32] text-[#F3EFE6] font-bold text-xs uppercase font-mono tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>Tautan Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Bagikan Situs Ini</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('oracle')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#EAE3D5] hover:bg-[#DDD5C5] text-[#1C1814] font-bold text-xs uppercase font-mono tracking-wider border border-[#1C1814]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-[#8C6D32]">❖</span>
                <span>Coba Javanese Oracle</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

export default HomePage;