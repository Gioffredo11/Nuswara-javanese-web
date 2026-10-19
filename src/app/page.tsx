'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GununganSvg,
  GatotkacaSvg,
  BatikKawungPatternSvg,
  BatikParangPatternSvg,
  GoldenDustMotes,
} from '@/components/ui/WayangVectors';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Camera,
  GitFork,
  Compass,
  Layers,
  ChevronRight,
  MapPin,
  Clock,
  Scroll,
  Heart,
  Share2,
  Check,
} from 'lucide-react';

// Embed all major sections into unified experience
import { WayangpediaClient } from '@/app/wayangpedia/WayangpediaClient';
import { FamilyTreeClient } from '@/app/family-tree/FamilyTreeClient';
import { OracleClient } from '@/app/oracle/OracleClient';
import { ManifestationClient } from '@/app/manifestation/ManifestationClient';
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
  icon: Icon,
  light = false,
}: {
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  light?: boolean;
}) {
  return (
    <div className="relative py-12 md:py-16 overflow-hidden select-none" aria-hidden="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div
            className={`flex-1 h-px ${
              light
                ? 'bg-gradient-to-r from-transparent via-[#C59B53]/40 to-[#C59B53]'
                : 'bg-gradient-to-r from-transparent via-[#C59B53]/25 to-[#C59B53]/70'
            }`}
          />
          <div
            className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full border shadow-sm ${
              light
                ? 'bg-[#F4EDE2] border-[#C59B53]/50 text-[#231E17]'
                : 'bg-[#14110E] border-[#C59B53]/40 text-[#ECC47E]'
            }`}
          >
            <Icon className="w-3.5 h-3.5 text-[#ECC47E]" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
              BAGIAN {number} : {title}
            </span>
          </div>
          <div
            className={`flex-1 h-px ${
              light
                ? 'bg-gradient-to-r from-[#C59B53] via-[#C59B53]/40 to-transparent'
                : 'bg-gradient-to-r from-[#C59B53]/70 via-[#C59B53]/25 to-transparent'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export function HomePage({ defaultSection }: HomePageProps = {}) {
  const [philosophiesCount, setPhilosophiesCount] = useState<number>(11);
  const [copiedLink, setCopiedLink] = useState(false);
  const onRipple = useInkRipple();

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
    const target = defaultSection || window.location.hash.replace('#', '');
    if (target) {
      const timer = setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
      return () => clearTimeout(timer);
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
    <div id="beranda" className="flex flex-col min-h-screen relative bg-[#0D0C0A] text-[#F5EFE6] overflow-x-hidden">
      {/* =========================================================================
          0. CINEMATIC HERO SECTION: NUSWARA MUSEUM DIGITAL JAWA TENGAH
          (Faithfully matches Visual Reference Photo reference_hero.png 1:1)
          ========================================================================= */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-6">
        {/* Background Landscape Atmosphere with subtle parallax */}
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
            {/* Controlled dark gradient overlay matching reference photo lighting */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C0A]/95 via-[#0D0C0A]/50 to-transparent pointer-events-none md:via-[#0D0C0A]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A] via-transparent to-[#0D0C0A]/50 pointer-events-none" />
          </div>
        </ParallaxHero>

        {/* Ambient Golden Sparks & Floating Dust Motes */}
        <GoldenDustMotes className="absolute inset-0 pointer-events-none z-10 opacity-50 animate-dust-particle-1" />

        {/* Left: Asymmetrical Editorial Typography matching reference_hero.png 1:1 */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-20 w-full my-auto py-12 lg:py-16">
          <ScrollReveal direction="up" distance={30} delay={100}>
            <div className="max-w-2xl lg:max-w-3xl space-y-6 md:space-y-8 text-left">
              {/* Eyebrow: Horizontal Gold Line + Category */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#C5A063]" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#C5A063] font-medium">
                  MUSEUM DIGITAL JAWA TENGAH
                </span>
              </div>

              {/* Classical Serif Title with entrance animation */}
              <h1 className="font-royal text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-normal tracking-[0.06em] text-[#F0E6D4] leading-none select-none headline-enter">
                NUSWARA
              </h1>

              {/* Subtitle & Literary Lead */}
              <div className="space-y-3.5 max-w-xl">
                <p className="font-editorial text-2xl sm:text-3xl md:text-[2.25rem] text-[#F0E6D4] leading-snug font-normal tracking-wide">
                  Menelusuri Jejak, Merawat Warisan.
                </p>
                <p className="font-sans text-sm sm:text-base md:text-lg text-[#A9A195] leading-relaxed font-light">
                  Jawa Tengah bukan sekadar tempat. Ia adalah cerita dan warisan yang terus hidup.
                </p>
              </div>

              {/* Primary Antique Gold CTA Button */}
              <div className="pt-2 sm:pt-4 flex items-center">
                <button
                  type="button"
                  onClick={(e) => { onRipple(e); scrollToSection('sejarah'); }}
                  className="relative overflow-hidden px-8 py-3.5 sm:py-4 bg-[#C5A063] hover:bg-[#D4AF37] text-[#140F0A] font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-xl flex items-center gap-3 cursor-pointer group press-scale ambient-glow"
                >
                  <span>Jelajahi Jawa Tengah</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Metadata Exhibition Bar (Matches reference_hero.png 1:1) */}
        <div className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-6 pt-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#8E8474] uppercase select-none">
            <span className="text-left">PAMERAN BUDAYA • 2026</span>

            <button
              type="button"
              onClick={() => scrollToSection('sejarah')}
              className="flex flex-col items-center gap-1 text-center text-[#8E8474] hover:text-[#ECC47E] transition-colors cursor-pointer group"
              title="Gulir ke bawah untuk menelusuri"
            >
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em]">GULIR UNTUK MENELUSURI</span>
              <span className="text-xs text-[#C5A063] transition-transform group-hover:translate-y-1">↓</span>
            </button>

            <span className="text-right">MERAPI • BOROBUDUR</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EDITORIAL STATEMENT BANNER: "Warisan bukan hanya masa lalu..."
          (Matches Reference Photo with 5 Cultural Exploration Pillars)
          ========================================================================= */}
      <section className="bg-gradient-to-r from-[#120D1B] via-[#1A1224] to-[#120D1B] border-y border-[#C5A36A]/25 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal direction="up" distance={35}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <h2 className="font-editorial italic text-3xl sm:text-4xl lg:text-5xl text-[#F5EFE6] leading-tight tracking-tight">
                  Warisan bukan hanya masa lalu.{' '}
                  <span className="text-gold-gradient font-normal block mt-1">
                    Ia hidup di antara kita.
                  </span>
                </h2>
              </div>
              <div className="md:col-span-5 space-y-4 text-sm text-[#B9B0A3] leading-relaxed border-t md:border-t-0 md:border-l border-[#C5A36A]/25 pt-6 md:pt-0 md:pl-8">
                <p>
                  Dari lereng gunung hingga ruang keraton, dari kisah para tokoh hingga rasa di meja makan, NUSWARA mengajakmu mengenal Jawa Tengah melalui hal-hal yang membentuk jiwa dan kesehariannya.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-[#ECC47E]">
                  <span>MEMAYU HAYUNING BAWANA</span>
                  <span>•</span>
                  <span>SANGKAN PARANING DUMADI</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 5 Cultural Category Quick-Jump Navigation Tabs */}
          <ScrollReveal direction="up" distance={25} delay={150}>
            <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2.5 sm:gap-4 pt-4 border-t border-[#C5A36A]/20">
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
                  className="relative overflow-hidden px-4 py-2 rounded-full bg-[#181122] hover:bg-[#C5A36A] text-[#B9B0A3] hover:text-[#100D0A] border border-[#C5A36A]/30 transition-all text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md group press-scale"
                >
                  <span className="text-[#ECC47E] group-hover:text-[#100D0A] font-bold">
                    {pill.number}
                  </span>
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          PARCHMENT SECTION 1: "Berabad-abad cerita, satu tanah yang sama."
          (Minimalist Editorial Chronology - Non-Slop, Museum/Magazine Grade)
          ========================================================================= */}
      <section id="sejarah" className="bg-[#F4EDE2] text-[#241E17] py-20 sm:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Bas-Relief Carving (Museum Placard Presentation) */}
            <ScrollReveal direction="up" distance={35} delay={100} className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-2xl overflow-hidden border border-[#8A5A2B]/25 p-2.5 sm:p-3 bg-[#EBE2D3]/70 shadow-lg">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#241E17]/10">
                  <Image
                    src="/images/editorial/candi-relief.jpg"
                    alt="Relief Candi Borobudur Jawa Tengah"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover hover:scale-103 transition-transform duration-700"
                  />
                </div>
                <div className="pt-3.5 pb-1 px-1.5 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8A5A2B] font-semibold block">
                    RELIEF CANDI BOROBUDUR • ABAD VIII MASEHI
                  </span>
                  <p className="font-editorial italic text-xs text-[#574F44] mt-1 leading-relaxed">
                    Guratan batu andesit yang memahat doa dan perjalanan spiritual manusia Jawa.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Editorial Reading Timeline without boxed cards */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="up" distance={30}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DBCB] border border-[#C59B53]/40 text-[#5C4A33] text-xs font-mono tracking-widest uppercase">
                  KILAS SEJARAH JAWA TENGAH
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231E17] leading-tight mt-3">
                  Berabad-abad cerita, <br />
                  <span className="italic font-normal text-[#8A5A2B]">satu tanah yang sama.</span>
                </h2>

                <p className="text-sm sm:text-base text-[#574F44] leading-relaxed font-sans mt-3 max-w-2xl">
                  Dari dataran vulkanik Dieng hingga keraton Surakarta, Jawa Tengah menjadi episentrum bertemunya spiritualitas Hindu-Buddha, kearifan animisme purba, dan peradaban Islam Nusantara.
                </p>
              </ScrollReveal>

              {/* Minimalist Editorial Chronology (Clean typographic list, no boxed containers) */}
              <div className="mt-8 divide-y divide-[#8A5A2B]/20 border-y border-[#8A5A2B]/20">
                {[
                  {
                    number: '01',
                    eraTag: 'KERAJAAN MATARAM KUNO',
                    period: 'Abad VIII - X M',
                    title: 'Era Keagungan Candi & Pemujaan Semesta',
                    description:
                      'Pembangunan Candi Borobudur oleh Dinasti Syailendra dan Candi Prambanan oleh Rakai Pikatan. Fondasi kosmologi yang memuliakan harmoni antara manusia, alam, dan Sang Pencipta.',
                    href: '/sejarah/era-keagungan-candi',
                  },
                  {
                    number: '02',
                    eraTag: 'KESULTANAN ISLAM PESISIR & MATARAM ISLAM',
                    period: 'Abad XVI - XVIII M',
                    title: 'Akulturasi Wayang Kulit & Tembang Macapat',
                    description:
                      'Para wali menggubah wayang kulit purwa menjadi sarana dakwah dan tuntunan budi pekerti. Munculnya gamelan keraton, serat-serat piwulang, dan keselarasan rasa batin Jawa.',
                    href: '/sejarah/akulturasi-wayang-kulit',
                  },
                  {
                    number: '03',
                    eraTag: 'PERGERAKAN NASIONAL & IDENTITAS DIGITAL',
                    period: 'Abad XIX - XXI M',
                    title: 'Ksatria Modern: Literasi, Pendidikan, & Kelestarian',
                    description:
                      'Perjuangan Pangeran Diponegoro, R.A. Kartini, hingga Ki Hadjar Dewantara menegakkan martabat batin bangsa. Hari ini, Nuswara meneruskan estafet nilai tersebut ke ranah digital.',
                    href: '/sejarah/ksatria-modern',
                  },
                ].map((era, idx) => (
                  <ScrollReveal key={era.number} direction="up" distance={25} delay={100 + idx * 120}>
                    <Link
                      href={era.href}
                      className="group block py-6 sm:py-7 transition-all hover:pl-2 duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-[#8A5A2B] font-bold">
                        <span className="tracking-wider">{era.number}. {era.eraTag}</span>
                        <span className="text-[11px] text-[#8A5A2B]/75 font-normal">{era.period}</span>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between gap-4">
                        <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#231E17] group-hover:text-[#8A5A2B] transition-colors leading-snug">
                          {era.title}
                        </h3>
                        <span className="shrink-0 text-xs font-mono text-[#8A5A2B] font-bold inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                          <span className="hidden sm:inline">Telusuri</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-[#5C5449] leading-relaxed font-sans max-w-2xl">
                        {era.description}
                      </p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              {/* Editorial Link to Full History Archive */}
              <ScrollReveal direction="up" distance={20} delay={450}>
                <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#7A6A53]">
                    Jejak peradaban Nusantara dalam 3 babak besar.
                  </span>
                  <Link
                    href="/sejarah"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#8A5A2B] hover:text-[#5C3A18] group cursor-pointer"
                  >
                    <span>Buka Arsip Kronologi Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
      <section id="tokoh" className="bg-[#0D0C0A] py-20 border-b border-[#C59B53]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TokohIdentitySection />
        </div>
      </section>

      {/* =========================================================================
          ATMOSPHERIC WAYANG SPOTLIGHT: "Di balik wayang, ada kebijaksanaan."
          ========================================================================= */}
      <section className="bg-[#12100D] py-16 sm:py-20 border-y border-[#C59B53]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Atmospheric Wayang Kelir Photo */}
            <ScrollReveal direction="up" distance={40} delay={100} className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#C59B53]/40 shadow-2xl p-2 bg-[#1A1612]">
                <div className="relative aspect-[16/9] sm:aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="/images/editorial/wayang-kelir.jpg"
                    alt="Wayang kulit performance behind illuminated white screen"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover filter contrast-[1.1]"
                  />
                  {/* Subtle warm amber glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Wayang Philosophy Copy */}
            <ScrollReveal direction="up" distance={40} delay={250} className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1912] border border-[#C59B53]/50 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
                FILSAFAT PAKELIRAN
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] leading-tight">
                Di balik wayang, <br />
                <span className="italic font-normal text-gold-gradient">ada kebijaksanaan.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#A89F91] leading-relaxed font-sans">
                Kelir putih adalah lambang jagad raya yang fana. Blencong minyak kelapa adalah lentera kehidupan yang meniupkan nyawa. Gunungan menandai awal dan akhir setiap putaran takdir.
              </p>

              <p className="text-xs sm:text-sm text-[#8C8273] leading-relaxed font-sans">
                Setiap tokoh wayang (mulai dari ketenangan batin Arjuna, kejujuran lugas Bima, keteguhan hati Gatotkaca, hingga kebijaksanaan jenaka Punokawan) merupakan cermin dari pergulatan jiwa manusia dalam menemukan dharma sejatinya.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('wayangpedia')}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#DFB873] to-[#C59B53] hover:from-[#ECC47E] hover:to-[#DFB873] text-[#140F08] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Jelajahi Wayangpedia</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('family-tree')}
                  className="px-5 py-2.5 bg-[#1C1712] hover:bg-[#282119] text-[#ECC47E] font-medium text-xs uppercase tracking-wider border border-[#C59B53]/40 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Lihat Silsilah Purwa</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURE SECTION 01: WAYANGPEDIA & BUDAYA
          ========================================================================= */}
      <section id="wayangpedia" className="scroll-mt-20 py-10 bg-[#0E0C0A]">
        <div id="budaya" className="scroll-mt-24" />
        <SectionDivider number="01" title="WAYANGPEDIA" icon={BookOpen} />
        <WayangpediaClient />
      </section>

      {/* =========================================================================
          FEATURE SECTION 02: SILSILAH WAYANG PURWA
          ========================================================================= */}
      <section id="family-tree" className="scroll-mt-20 py-10 bg-[#120F0C] border-y border-[#C59B53]/20">
        <SectionDivider number="02" title="SILSILAH PURWA" icon={GitFork} />
        <FamilyTreeClient />
      </section>

      {/* =========================================================================
          FEATURE SECTION 03: JAVANESE ORACLE (WETON MATCHER)
          ========================================================================= */}
      <section id="oracle" className="scroll-mt-20 py-10 bg-gradient-to-b from-[#140F0B] via-[#1F1209] to-[#140F0B] border-y border-[#C59B53]/30">
        <SectionDivider number="03" title="JAVANESE ORACLE" icon={Sparkles} />
        <OracleClient />
      </section>

      {/* =========================================================================
          FEATURE SECTION 04: MANIFESTASI HARIAN (PIWULANG)
          ========================================================================= */}
      <section id="manifestasi" className="scroll-mt-20 py-10 bg-[#0E0C0A]">
        <SectionDivider number="04" title="MANIFESTASI HARIAN" icon={Compass} />
        <ManifestationClient />
      </section>

      {/* =========================================================================
          GASTRONOMY SECTION: "Ingatan yang tinggal di lidah." (KULINER JAWA TENGAH)
          ========================================================================= */}
      <section id="kuliner" className="bg-[#0E0C0A] text-[#F5EFE6] py-20 border-b border-[#C59B53]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <ScrollReveal direction="up" distance={30}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ECC47E]">
                  KHAZANAH RASA JAWA TENGAH
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] leading-tight">
                  Ingatan yang tinggal di lidah.
                </h2>
                <p className="text-sm text-[#A89F91] leading-relaxed">
                  Kekayaan cita rasa warisan yang melintasi dapur keraton hingga kehangatan warung wedangan di sudut kota tua.
                </p>
              </div>

              <Link
                href="/kuliner"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#18130E] border border-[#C59B53]/50 text-[#ECC47E] hover:bg-[#C59B53] hover:text-[#0D0C0A] transition-all text-xs font-mono uppercase tracking-wider font-semibold shadow-lg group self-start md:self-auto shrink-0"
              >
                <span>Jelajahi Cerita Kuliner Lengkap</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-grid">
            {/* Lumpia Semarang */}
            <ScrollReveal direction="up" distance={35} delay={100} className="h-full flex">
              <Link
                href="/kuliner/lumpia-semarang"
                className="rounded-2xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden shadow-xl hover:border-[#ECC47E] transition-all group flex flex-col justify-between h-full cursor-pointer hover:-translate-y-1 w-full"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D0C0A]">
                    <Image
                      src="/images/editorial/kuliner-lumpia.jpg"
                      alt="Traditional Lumpia Semarang"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                      <span>SEMARANG</span>
                      <span>AKULTURASI PESISIR</span>
                    </div>
                    <h3 className="font-royal text-xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors">
                      Lumpia Semarang
                    </h3>
                    <p className="text-xs text-[#A89F91] leading-relaxed line-clamp-3">
                      Perpaduan harmonis rebung manis gurih, daging ayam/udang, daun bawang segar, dan cocolan saus cokelat kental khas pesisir utara Jawa.
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-[#C59B53]/20 bg-[#110E0B] flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                  <span className="text-[#A89F91] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C59B53]" />
                    <span>5 Menit Baca</span>
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Nasi Liwet Solo */}
            <ScrollReveal direction="up" distance={35} delay={250} className="h-full flex">
              <Link
                href="/kuliner/nasi-liwet-solo"
                className="rounded-2xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden shadow-xl hover:border-[#ECC47E] transition-all group flex flex-col justify-between h-full cursor-pointer hover:-translate-y-1 w-full"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D0C0A]">
                    <Image
                      src="/images/editorial/kuliner-liwet.jpg"
                      alt="Authentic Nasi Liwet Solo"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                      <span>SURAKARTA (SOLO)</span>
                      <span>SAJIAN KERATON</span>
                    </div>
                    <h3 className="font-royal text-xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors">
                      Nasi Liwet Solo
                    </h3>
                    <p className="text-xs text-[#A89F91] leading-relaxed line-clamp-3">
                      Beras gurih beraroma santan dan daun salam, disajikan dalam wadah pincuk daun pisang bersama suwiran ayam kampung, sayur labu siam, dan gumpalan areh kelapa lembut.
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-[#C59B53]/20 bg-[#110E0B] flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                  <span className="text-[#A89F91] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C59B53]" />
                    <span>6 Menit Baca</span>
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Tempe Mendoan Banyumas */}
            <ScrollReveal direction="up" distance={35} delay={400} className="h-full flex">
              <Link
                href="/kuliner/tempe-mendoan-banyumas"
                className="rounded-2xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden shadow-xl hover:border-[#ECC47E] transition-all group flex flex-col justify-between h-full cursor-pointer hover:-translate-y-1 w-full"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D0C0A]">
                    <Image
                      src="/images/editorial/kuliner-mendoan.jpg"
                      alt="Hot Tempe Mendoan Banyumas"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                      <span>BANYUMAS</span>
                      <span>HANGAT MERAKYAT</span>
                    </div>
                    <h3 className="font-royal text-xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors">
                      Tempe Mendoan Banyumas
                    </h3>
                    <p className="text-xs text-[#A89F91] leading-relaxed line-clamp-3">
                      Tempe kedelai tipis dibalut adonan tepung terigu daun bawang yang digoreng setengah matang (mendo), dinikmati selagi panas bersama cocolan sambal kecap cabai rawit pedas.
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-[#C59B53]/20 bg-[#110E0B] flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                  <span className="text-[#A89F91] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C59B53]" />
                    <span>4 Menit Baca</span>
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>

          {/* Secondary Banner for additional culinary articles */}
          <ScrollReveal direction="up" distance={25} delay={150}>
            <div className="p-6 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C59B53]">
                  Masih Banyak Ragam Cita Rasa Lainnya
                </span>
                <p className="text-sm text-[#D8C8AD]">
                  Temukan kisah Soto Kudus Sunan Kudus, Dawet Ayu Banjarnegara, Sate Kere Solo, hingga Garang Asem Pantura.
                </p>
              </div>

              <Link
                href="/kuliner"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D1813] border border-[#C59B53]/40 text-[#ECC47E] hover:bg-[#C59B53] hover:text-[#0D0C0A] transition-all text-xs font-mono font-semibold uppercase tracking-wider shrink-0 group"
              >
                <span>Buka Ensiklopedia Kuliner</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          MONUMENTS SECTION: "Di sini, waktu terasa hening." (SITUS KEABADIAN)
          Asymmetric editorial layout: 1 hero + 3 secondary cards — not 4 clones
          ========================================================================= */}
      <section id="monumen" className="bg-[#0D0C0A] py-20 border-b border-[#C59B53]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header */}
          <ScrollReveal direction="up" distance={30}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ECC47E]">
                  MONUMEN KEABADIAN & RUANG SAKRAL
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] leading-tight">
                  Di sini, <br />
                  <span className="italic font-normal text-gold-gradient">waktu terasa hening.</span>
                </h2>
                <p className="text-sm text-[#A89F91] leading-relaxed">
                  Mahakarya arsitektur batu andesit dan kayu purba yang berdiri tegak menantang abad, mengabadikan renungan batin serta spiritualitas luhur di tanah Jawa.
                </p>
              </div>

              <Link
                href="/tempat-sakral"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#18130E] border border-[#C59B53]/50 text-[#ECC47E] hover:bg-[#C59B53] hover:text-[#0D0C0A] transition-all text-xs font-mono uppercase tracking-wider font-semibold shadow-lg group self-start md:self-auto shrink-0 cursor-pointer"
              >
                <span>Jelajahi Kisah Tempat Sakral Lengkap</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {/* HERO CARD: Borobudur — full-width landscape, more visual weight */}
          <ScrollReveal direction="up" distance={30} delay={100}>
            <Link
              href="/tempat-sakral/candi-borobudur"
              className="group block rounded-2xl overflow-hidden border border-[#C59B53]/35 bg-[#14110E] hover:border-[#ECC47E] transition-all duration-300 shadow-2xl cursor-pointer"
              aria-label="Candi Borobudur — baca kisah spiritual lengkap"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[280px]">
                {/* Image: wider aspect on desktop */}
                <div className="relative aspect-[16/9] lg:aspect-auto overflow-hidden">
                  <Image
                    src="/images/editorial/monumen-borobudur.jpg"
                    alt="Sunrise over Borobudur stupas, Central Java — UNESCO World Heritage"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#14110E] opacity-0 lg:opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-70 lg:opacity-0" />
                  {/* UNESCO badge */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#C59B53] text-[#0D0C0A] text-[10px] font-mono font-bold tracking-widest uppercase rounded">
                    UNESCO HERITAGE
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col justify-between p-7 lg:p-9 gap-5">
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-[#ECC47E] flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      MAGELANG, JAWA TENGAH
                    </span>
                    <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors leading-tight">
                      Candi Borobudur
                    </h3>
                    <p className="text-sm text-[#A89F91] leading-relaxed">
                      Piramida mandala terbesar di bumi. Menuntun peziarah melintasi tiga alam kesadaran batin: Kamadhatu, Rupadhatu, hingga keheningan sempurna Arupadhatu — perjalanan batin manusia dalam satu bangunan.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['Mandala Kosmik', 'Abad VIII M', '2.672 Relief'].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-mono text-[#C59B53] border border-[#C59B53]/30 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#ECC47E] group-hover:text-white transition-colors">
                    <span>Baca Kisah Spiritual Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* THREE SECONDARY CARDS: smaller, portrait orientation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Kompleks Dieng */}
            <ScrollReveal direction="up" distance={35} delay={100} className="flex">
              <Link
                href="/tempat-sakral/dataran-tinggi-dieng"
                className="rounded-xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden group flex flex-col justify-between hover:border-[#ECC47E] hover:-translate-y-0.5 transition-all duration-250 w-full cursor-pointer shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/editorial/monumen-dieng.jpg"
                    alt="Misty Dieng Plateau with Candi Arjuna complex"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#ECC47E] bg-[#0D0C0A]/70 px-2 py-0.5 rounded">
                    2.093 MDPL
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1">
                  <span className="text-[10px] font-mono text-[#8C8273] flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> WONOSOBO
                  </span>
                  <h3 className="font-royal text-base font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors">
                    Kompleks Dieng
                  </h3>
                  <p className="text-[11px] text-[#A89F91] leading-relaxed line-clamp-2">
                    &ldquo;Di Hyang&rdquo; — tempat bersemayam para dewata, berselimut kabut belerang dan hening pegunungan.
                  </p>
                </div>
                <div className="px-4 py-2.5 border-t border-[#C59B53]/15 flex items-center justify-between text-[10px] font-mono text-[#ECC47E]">
                  <span>Baca kisah</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>

            {/* Candi Cetho */}
            <ScrollReveal direction="up" distance={35} delay={200} className="flex">
              <Link
                href="/tempat-sakral/candi-cetho"
                className="rounded-xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden group flex flex-col justify-between hover:border-[#ECC47E] hover:-translate-y-0.5 transition-all duration-250 w-full cursor-pointer shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/editorial/monumen-cetho.jpg"
                    alt="Candi Bentar split gate of Candi Cetho on Mount Lawu slopes"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#ECC47E] bg-[#0D0C0A]/70 px-2 py-0.5 rounded">
                    1.496 MDPL
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1">
                  <span className="text-[10px] font-mono text-[#8C8273] flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> KARANGANYAR
                  </span>
                  <h3 className="font-royal text-base font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors">
                    Candi Cetho
                  </h3>
                  <p className="text-[11px] text-[#A89F91] leading-relaxed line-clamp-2">
                    Punden berundak 13 teras era Majapahit akhir di lereng Lawu — gerbang ruwatan dan pensucian batin.
                  </p>
                </div>
                <div className="px-4 py-2.5 border-t border-[#C59B53]/15 flex items-center justify-between text-[10px] font-mono text-[#ECC47E]">
                  <span>Baca kisah</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>

            {/* Masjid Agung Demak */}
            <ScrollReveal direction="up" distance={35} delay={300} className="flex">
              <Link
                href="/tempat-sakral/masjid-agung-demak"
                className="rounded-xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden group flex flex-col justify-between hover:border-[#ECC47E] hover:-translate-y-0.5 transition-all duration-250 w-full cursor-pointer shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/editorial/monumen-demak.jpg"
                    alt="Historic Great Mosque of Demak at dusk, built by Walisongo"
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#ECC47E] bg-[#0D0C0A]/70 px-2 py-0.5 rounded">
                    ERA 1479 M
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1">
                  <span className="text-[10px] font-mono text-[#8C8273] flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> DEMAK
                  </span>
                  <h3 className="font-royal text-base font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors">
                    Masjid Agung Demak
                  </h3>
                  <p className="text-[11px] text-[#A89F91] leading-relaxed line-clamp-2">
                    Episentrum spiritualitas Walisongo — atap tumpang tiga dan tiang Soko Tatal karya Sunan Kalijaga.
                  </p>
                </div>
                <div className="px-4 py-2.5 border-t border-[#C59B53]/15 flex items-center justify-between text-[10px] font-mono text-[#ECC47E]">
                  <span>Baca kisah</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* =========================================================================
          FEATURE SECTION 05: WEB PHOTOBOOTH (4-CUT)
          ========================================================================= */}
      <section id="photobooth" className="scroll-mt-20 py-10 bg-gradient-to-b from-[#0D0C0A] to-[#14100C]">
        <SectionDivider number="05" title="WEB PHOTOBOOTH" icon={Camera} />
        <PhotoboothClient autoStart={defaultSection === 'photobooth'} />
      </section>

      {/* =========================================================================
          CLOSING EDITORIAL BANNER: "Budaya tetap hidup, ketika kita ikut merawatnya."
          ========================================================================= */}
      <section className="bg-[#F4EDE2] text-[#241E17] py-20 text-center border-t border-[#C59B53]/35">
        <ScrollReveal direction="up" distance={30}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="w-12 h-16 mx-auto opacity-75">
              <GununganSvg className="w-full h-full text-[#8A5A2B]" />
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#231E17] leading-tight max-w-2xl mx-auto">
              Budaya tetap hidup, <br />
              <span className="italic font-normal text-[#8A5A2B]">ketika kita ikut merawatnya.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#574F44] max-w-xl mx-auto leading-relaxed">
              Nuswara hadir agar tradisi adiluhung Jawa Tengah tidak berhenti sebagai kenangan masa lalu, melainkan berakar dan terus bertunas dalam denyut kehidupan generasi modern.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleShareWebsite}
                className="px-6 py-3 bg-[#241E17] hover:bg-[#3D3428] text-[#F5EDE2] font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-[#ECC47E]" />
                    <span>Tautan Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#ECC47E]" />
                    <span>Bagikan Situs Ini</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('oracle')}
                className="px-6 py-3 bg-[#FAF5EB] hover:white text-[#241E17] font-bold text-xs uppercase tracking-wider border border-[#C59B53]/60 rounded-full transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C59B53]" />
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
