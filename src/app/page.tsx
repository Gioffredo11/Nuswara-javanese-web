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

          {/* Chronology Navigation Tabs (Horizontal Stepper) */}
          <ScrollReveal direction="up" distance={20} delay={50}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 border border-[#1C1814]/15 p-2 bg-[#EAE3D5]/60 rounded-2xl">
              {HISTORY_CHAPTERS.map((ch, idx) => {
                const isActive = ch.id === activeHistoryChapter;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setActiveHistoryChapter(ch.id)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-[#F3EFE6] border-[#8C6D32]/50 shadow-sm text-[#1C1814]'
                        : 'border-transparent text-[#574F44] hover:bg-[#EAE3D5] hover:text-[#1C1814]'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#8C6D32] text-[#F3EFE6]'
                          : 'bg-[#1C1814]/10 text-[#574F44]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`text-xs sm:text-sm font-royal font-bold block truncate ${
                          isActive ? 'text-[#1C1814]' : 'text-[#574F44]'
                        }`}
                      >
                        {ch.chronology.replace(/^\d+\.\s*/, '')}
                      </span>
                      <span className="text-[10px] font-mono text-[#8C6D32] block truncate">
                        {ch.period}
                      </span>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#8C6D32] animate-pulse shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* 2-Column Balanced Editorial Stage (Visual Artifact Placard + Rich Story & Actions) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Kolom Kiri: Artefak Visual & Museum Catalog Placard (6 cols) */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="up" distance={30} delay={100}>
                <div className="border border-[#1C1814]/20 p-3 sm:p-4 bg-[#EAE3D5] rounded-2xl shadow-sm overflow-hidden">
                  <div className="relative aspect-[16/11] bg-[#1C1814]/10 rounded-xl overflow-hidden">
                    <Image
                      src={currentChapter.image}
                      alt={currentChapter.imageLabel}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover hover:scale-102 transition-transform duration-700"
                    />
                  </div>
                  <div className="pt-3.5 pb-1 px-1">
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#1C1814] font-bold block">
                      {currentChapter.imageLabel}
                    </span>
                    <p className="font-editorial italic text-xs sm:text-sm text-[#574F44] mt-1.5 leading-relaxed">
                      {currentChapter.imageCaption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Kolom Kanan: Narasi Editorial & Aksi (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal direction="up" distance={30} delay={150}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C6D32] font-bold block">
                    {currentChapter.chapterTag}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1814] leading-tight mt-1.5">
                    {currentChapter.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#4A3F35] leading-relaxed font-sans">
                  <span className="float-left text-4xl sm:text-5xl font-editorial font-bold leading-none pr-3 pt-1 text-[#8C6D32]">
                    {currentChapter.dropCapLetter}
                  </span>
                  {currentChapter.narrative}
                </p>

                <blockquote className="border-l-2 border-[#8C6D32] pl-4 py-1 italic font-editorial text-sm sm:text-base text-[#4A3F35] leading-relaxed">
                  &ldquo;{currentChapter.philosophicalQuote}&rdquo;
                </blockquote>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Primary Colored Button: Direktori Sejarah */}
                  <Link
                    href="/sejarah"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8C6D32] hover:bg-[#6D5424] text-[#F3EFE6] font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer rounded-xl group"
                  >
                    <BookOpen className="w-4 h-4 text-[#F3EFE6]" />
                    <span>Buka Direktori Sejarah</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Secondary Uncolored Button: Bab Terpilih */}
                  <Link
                    href={currentChapter.ctaLink}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#1C1814]/30 hover:border-[#1C1814] text-[#1C1814] hover:bg-[#1C1814]/5 text-xs font-mono uppercase tracking-wider transition-colors rounded-xl cursor-pointer"
                  >
                    <span>{currentChapter.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
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
                {/* Primary Colored Button: Direktori Wayangpedia */}
                <button
                  type="button"
                  onClick={() => scrollToSection('wayangpedia')}
                  className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 group cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#0C0A08]" />
                  <span>Buka Direktori Wayangpedia</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0C0A08]/80 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary Uncolored Button: Tarik Kartu Manifestasi */}
                <button
                  type="button"
                  onClick={(e) => {
                    onRipple(e);
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('open-manifestation-modal'));
                    }
                  }}
                  className="px-6 py-3.5 bg-[#14110E] hover:bg-[#1C1610] text-[#C5A059] hover:text-[#F4EFE6] font-mono text-xs uppercase tracking-wider border border-[#C5A059]/40 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Tarik Kartu Manifestasi</span>
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
                  className="group block relative aspect-[16/10] w-full border border-[#C5A059]/30 bg-[#0C0A08] rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
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
                </Link>
              </div>

              {/* Right: Deep Culinary Narrative */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] leading-tight">
                    Lumpia Semarang
                  </h3>
                </div>

                <p className="text-sm text-[#A89F91] leading-relaxed font-sans">
                  Lahir dari kisah cinta Tjoa Thay Yoe dan Mbok Wasih di Pasar Johar abad ke-19, memadukan tradisi gulung gandum Tionghoa dengan manis gurih rebung muda dan bumbu rempah Jawa. Simbol toleransi rasa luhur yang merajut persaudaraan di tanah pesisir.
                </p>

                {/* Action Buttons: Primary Directory (Colored) & Featured Recipe (Uncolored) */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {/* Primary Colored Button: Direktori Kuliner */}
                  <Link
                    href="/kuliner"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider rounded-xl transition-all shadow-lg group cursor-pointer"
                  >
                    <span>Buka Direktori Kuliner</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Secondary Uncolored Button: Lumpia Semarang */}
                  <Link
                    href="/kuliner/lumpia-semarang"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#14110E] hover:bg-[#1C1610] text-[#C5A059] hover:text-[#F4EFE6] border border-[#C5A059]/40 rounded-xl font-medium text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Pelajari Lumpia Semarang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Editorial Footnote */}
          <ScrollReveal direction="up" distance={20} delay={150}>
            <div className="pt-6 border-t border-[#C5A059]/20 flex items-center justify-between text-xs font-mono">
              <span className="text-[#8E8271]">
                Dokumentasi gastronomi dan kuliner otentik Jawa Tengah.
              </span>
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

          {/* PRIMARY HOOK: Candi Borobudur Monumental Panoramic Showcase */}
          <ScrollReveal direction="up" distance={35} delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left: Expansive Architectural Window (7 cols) */}
              <div className="lg:col-span-7">
                <Link
                  href="/tempat-sakral/candi-borobudur"
                  className="group block relative aspect-[16/10] w-full border border-[#C5A059]/30 bg-[#14110E] rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
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
                </Link>
              </div>

              {/* Right: Deep Editorial Narrative */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] leading-tight">
                    Candi Borobudur
                  </h3>
                </div>

                <p className="text-sm text-[#A89F91] leading-relaxed font-sans">
                  Piramida mandala terbesar di bumi yang menuntun peziarah melintasi tiga alam kesadaran batin manusia: dari belenggu hawa nafsu duniawi (<em>Kamadhatu</em>), melampaui wujud dan rupa kebajikan (<em>Rupadhatu</em>), hingga mencapai keheningan sempurna tanpa rupa (<em>Arupadhatu</em>).
                </p>

                {/* Action Buttons: Primary Directory (Colored) & Featured Monument (Uncolored) */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {/* Primary Colored Button: Direktori Tempat Sakral */}
                  <Link
                    href="/tempat-sakral"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider rounded-xl transition-all shadow-lg group cursor-pointer"
                  >
                    <span>Buka Direktori Tempat Sakral</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Secondary Uncolored Button: Candi Borobudur */}
                  <Link
                    href="/tempat-sakral/candi-borobudur"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#14110E] hover:bg-[#1C1610] text-[#C5A059] hover:text-[#F4EFE6] border border-[#C5A059]/40 rounded-xl font-medium text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Pelajari Filosofi Borobudur</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Editorial Footnote */}
          <ScrollReveal direction="up" distance={20} delay={150}>
            <div className="pt-6 border-t border-[#C5A059]/20 flex items-center justify-between text-xs font-mono">
              <span className="text-[#8E8271]">
                Dokumentasi monumen keabadian dan ruang sakral Jawa Tengah.
              </span>
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