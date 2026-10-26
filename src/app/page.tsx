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
  Utensils,
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

  // Scroll to section on initial load if defaultSection or hash is present, with layout shift resilience
  useEffect(() => {
    const scrollToTarget = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const target = defaultSection || window.location.hash.replace('#', '');
    if (target) {
      // Immediate attempt
      scrollToTarget(target);
      // Secondary settlement after fonts, layout, and images mount
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
          EDITORIAL STATEMENT: "Warisan bukan hanya masa lalu..."
          (Open Breathable Editorial Flow — No Artificial Boxed Containers)
          ========================================================================= */}
      <section className="bg-[#120D1B] py-14 sm:py-18 border-y border-[#C5A36A]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal direction="up" distance={30}>
            <div className="space-y-4 max-w-3xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#ECC47E]">
                MANIFIESTO NUSWARA
              </span>
              <h2 className="font-editorial italic text-3xl sm:text-4xl lg:text-5xl text-[#F5EFE6] leading-tight tracking-tight">
                Warisan bukan hanya masa lalu.{' '}
                <span className="text-gold-gradient font-normal block mt-1">
                  Ia hidup di antara kita.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#B9B0A3] leading-relaxed font-sans pt-1">
                Dari lereng gunung hingga ruang keraton, dari kisah para tokoh hingga rasa di meja makan, NUSWARA mengajakmu mengenal Jawa Tengah melalui hal-hal yang membentuk jiwa dan kesehariannya.
              </p>
            </div>
          </ScrollReveal>

          {/* Minimalist Editorial Navigation Anchors (Typographic rhythm, no chunky boxed pills) */}
          <ScrollReveal direction="up" distance={20} delay={150}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-[#C5A36A]/15 text-xs font-mono">
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
                  className="inline-flex items-center gap-2 text-[#A89F91] hover:text-[#ECC47E] transition-colors py-1 cursor-pointer group tracking-wider uppercase"
                >
                  <span className="text-[#ECC47E]/70 group-hover:text-[#ECC47E] font-bold">
                    {pill.number}
                  </span>
                  <span className="group-hover:underline underline-offset-4 decoration-[#ECC47E]/40">
                    {pill.label}
                  </span>
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
            {/* Left: Atmospheric Wayang Kelir Photo (Clean Single Architectural Frame) */}
            <ScrollReveal direction="up" distance={40} delay={100} className="lg:col-span-6">
              <div className="relative aspect-[16/9] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#C59B53]/30">
                <Image
                  src="/images/editorial/wayang-kelir.jpg"
                  alt="Wayang kulit performance behind illuminated white screen"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover filter contrast-[1.1]"
                />
                {/* Subtle warm amber glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-50" />
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
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('open-manifestation-modal'));
                    }
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#DFB873] to-[#C59B53] hover:from-[#ECC47E] hover:to-[#DFB873] text-[#140F08] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tarik Kartu Manifestasi Hari Ini</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('wayangpedia')}
                  className="px-5 py-2.5 bg-[#1C1712] hover:bg-[#282119] text-[#ECC47E] font-medium text-xs uppercase tracking-wider border border-[#C59B53]/40 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
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
      <section id="wayangpedia" className="scroll-mt-20 py-10 bg-[#0E0C0A]">
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
          GASTRONOMY SECTION: "Ingatan yang tinggal di lidah." (KULINER JAWA TENGAH)
          ========================================================================= */}
      <section id="kuliner" className="bg-[#0E0C0A] text-[#F5EFE6] py-20 border-b border-[#C59B53]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <ScrollReveal direction="up" distance={30}>
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ECC47E]">
                KHAZANAH RASA JAWA TENGAH
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] leading-tight">
                Ingatan yang tinggal <br />
                <span className="italic font-normal text-gold-gradient">di kedalaman lidah.</span>
              </h2>
              <p className="text-sm text-[#A89F91] leading-relaxed font-sans">
                Kekayaan cita rasa warisan yang melintasi dapur keraton hingga kehangatan warung wedangan di sudut kota tua, merajut identitas kultural dalam setiap gigitan.
              </p>
            </div>
          </ScrollReveal>

          {/* PRIMARY HOOK: Lumpia Semarang Standalone Gastronomy Showcase */}
          <ScrollReveal direction="up" distance={35} delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left: Expansive Gastronomic Visual Window */}
              <div className="lg:col-span-7">
                <Link
                  href="/kuliner/lumpia-semarang"
                  className="group block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#16120E] shadow-2xl cursor-pointer"
                  aria-label="Lumpia Semarang — baca kisah akulturasi dan resep otentik"
                >
                  <Image
                    src="/images/editorial/kuliner-lumpia.jpg"
                    alt="Traditional Lumpia Semarang — Akulturasi Tionghoa-Jawa"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-104 transition-transform duration-700"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/80 via-transparent to-transparent opacity-70" />

                  {/* Antique Gastronomic Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#C59B53] text-[#0D0C0A] text-[10px] font-mono font-bold tracking-widest uppercase rounded">
                      WARISAN BUDAYA TAKBENDA
                    </span>
                    <span className="px-2.5 py-1 bg-[#0D0C0A]/80 backdrop-blur-sm border border-[#C59B53]/40 text-[#ECC47E] text-[10px] font-mono uppercase tracking-wider">
                      SEMARANG • SEJAK 1870
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#ECC47E] opacity-90">
                    <span>AKULTURASI RASA TIONGHOA-JAWA</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Eksplorasi Kisah</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Right: Deep Culinary Narrative & Key Flavor Hallmarks */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C59B53] uppercase tracking-wider">
                    <Utensils className="w-3.5 h-3.5 text-[#ECC47E]" />
                    <span>GANG LOMBOK • PESISIR UTARA JAWA</span>
                  </div>

                  <h3 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] mt-2 leading-tight">
                    Lumpia Semarang
                  </h3>
                  <p className="font-editorial italic text-sm text-[#DFB873] mt-1">
                    Lunpia Semawis — Cita Rasa Abadi Akulturasi Dua Tradisi
                  </p>
                </div>

                <p className="text-sm text-[#B9B0A3] leading-relaxed font-sans">
                  Lahir dari kisah cinta Tjoa Thay Yoe dan Mbok Wasih di Pasar Johar abad ke-19, memadukan tradisi gulung gandum Tionghoa dengan manis gurih rebung muda dan bumbu rempah Jawa. Simbol toleransi rasa luhur yang merajut persaudaraan di tanah pesisir.
                </p>

                {/* Gastronomic Key Hallmarks (Clean Unboxed Grid) */}
                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#C59B53]/15 text-xs font-mono">
                  <div>
                    <span className="text-[#8E8271] block text-[10px] uppercase">Isian Utama</span>
                    <span className="text-[#F5EFE6] font-semibold">Rebung Muda &amp; Udang</span>
                  </div>
                  <div>
                    <span className="text-[#8E8271] block text-[10px] uppercase">Dua Varian</span>
                    <span className="text-[#F5EFE6] font-semibold">Goreng Renyah / Basah</span>
                  </div>
                  <div>
                    <span className="text-[#8E8271] block text-[10px] uppercase">Saus Cocolan</span>
                    <span className="text-[#F5EFE6] font-semibold">Gula Aren &amp; Tauco Kental</span>
                  </div>
                  <div>
                    <span className="text-[#8E8271] block text-[10px] uppercase">Pelengkap Khas</span>
                    <span className="text-[#F5EFE6] font-semibold">Lokio &amp; Rawit Hijau</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <Link
                    href="/kuliner/lumpia-semarang"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DFB873] to-[#C59B53] hover:from-[#ECC47E] hover:to-[#DFB873] text-[#140F08] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg group cursor-pointer"
                  >
                    <span>Pelajari Sejarah &amp; Resep Lumpia Semarang</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Minimalist Editorial Culinary Exploration Options (Typographic Bar — No Redundant Image Containers) */}
          <ScrollReveal direction="up" distance={20} delay={150}>
            <div className="pt-8 border-t border-[#C59B53]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[#A89F91]">
                <span className="text-[#ECC47E] uppercase tracking-wider font-semibold">
                  Khazanah Rasa Lainnya:
                </span>
                {[
                  { name: 'Nasi Liwet Solo', slug: 'nasi-liwet-solo', note: 'Sajian Keraton' },
                  { name: 'Tempe Mendoan', slug: 'tempe-mendoan-banyumas', note: 'Banyumas' },
                  { name: 'Soto Kudus', slug: 'soto-kudus', note: 'Mangkuk Tradisi' },
                  { name: 'Dawet Ayu', slug: 'dawet-ayu-banjarnegara', note: 'Banjarnegara' },
                  { name: 'Sate Kere', slug: 'sate-kere-solo', note: 'Solo Hadiningrat' },
                  { name: 'Garang Asem', slug: 'garang-asem-kudus', note: 'Pantura' },
                ].map((dish, idx) => (
                  <React.Fragment key={dish.slug}>
                    {idx > 0 && <span className="text-[#C59B53]/30">•</span>}
                    <Link
                      href={`/kuliner/${dish.slug}`}
                      className="hover:text-[#ECC47E] transition-colors inline-flex items-center gap-1 group py-0.5"
                    >
                      <span className="group-hover:underline underline-offset-4 decoration-[#ECC47E]/40">
                        {dish.name}
                      </span>
                      <span className="text-[10px] text-[#C59B53]/70">
                        ({dish.note})
                      </span>
                    </Link>
                  </React.Fragment>
                ))}
              </div>

              <Link
                href="/kuliner"
                className="inline-flex items-center gap-1.5 text-[#ECC47E] hover:text-white font-bold transition-colors group shrink-0"
              >
                <span>Buka Ensiklopedia Kuliner Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          MONUMENTS SECTION: "Di sini, waktu terasa hening." (SITUS KEABADIAN)
          Asymmetric editorial layout: 1 hero + 3 secondary cards — not 4 clones
          ========================================================================= */}
      {/* =========================================================================
          SACRED MONUMENT SECTION: CANDI BOROBUDUR AS THE PRIMARY HOOK
          (Minimalist, Open Architectural Showcase — Zero Redundant Image Clutter)
          ========================================================================= */}
      <section id="monumen" className="bg-[#0D0C0A] py-20 border-b border-[#C59B53]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <ScrollReveal direction="up" distance={30}>
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ECC47E]">
                MONUMEN KEABADIAN &amp; RUANG SAKRAL
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] leading-tight">
                Di sini, <br />
                <span className="italic font-normal text-gold-gradient">waktu terasa hening.</span>
              </h2>
              <p className="text-sm text-[#A89F91] leading-relaxed font-sans">
                Mahakarya arsitektur batu andesit purba yang berdiri tegak menantang abad, mengabadikan renungan batin serta kosmologi spiritual tertinggi di tanah Jawa.
              </p>
            </div>
          </ScrollReveal>

          {/* PRIMARY HOOK: Candi Borobudur Standalone Masterpiece */}
          <ScrollReveal direction="up" distance={35} delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left: Expansive Architectural Window */}
              <div className="lg:col-span-7">
                <Link
                  href="/tempat-sakral/candi-borobudur"
                  className="group block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#16120E] shadow-2xl cursor-pointer"
                  aria-label="Candi Borobudur — baca kisah spiritual lengkap"
                >
                  <Image
                    src="/images/editorial/monumen-borobudur.jpg"
                    alt="Sunrise over Borobudur stupas, Central Java — UNESCO World Heritage"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-104 transition-transform duration-700"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/80 via-transparent to-transparent opacity-70" />

                  {/* Antique Architectural Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#C59B53] text-[#0D0C0A] text-[10px] font-mono font-bold tracking-widest uppercase rounded">
                      UNESCO WORLD HERITAGE
                    </span>
                    <span className="px-2.5 py-1 bg-[#0D0C0A]/80 backdrop-blur-sm border border-[#C59B53]/40 text-[#ECC47E] text-[10px] font-mono uppercase tracking-wider">
                      MAGELANG • 824 M
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#ECC47E] opacity-90">
                    <span>MANDALA KOSMIK TERBESAR DI DUNIA</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Eksplorasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Right: Deep Editorial Narrative & Key Hallmarks */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C59B53] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#ECC47E]" />
                    <span>LEMBAH TIDAR • DINASTI SYAILENDRA</span>
                  </div>

                  <h3 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] mt-2 leading-tight">
                    Candi Borobudur
                  </h3>
                  <p className="font-editorial italic text-sm text-[#DFB873] mt-1">
                    Sang Kamadhatu, Rupadhatu, tumeka Arupadhatu
                  </p>
                </div>

                <p className="text-sm text-[#B9B0A3] leading-relaxed font-sans">
                  Piramida mandala terbesar di bumi yang menuntun peziarah melintasi tiga alam kesadaran batin manusia: dari belenggu hawa nafsu duniawi (<em>Kamadhatu</em>), melampaui wujud dan rupa kebajikan (<em>Rupadhatu</em>), hingga mencapai keheningan sempurna tanpa rupa (<em>Arupadhatu</em>).
                </p>

                {/* Architectural Key Hallmarks (Clean Unboxed Grid) */}
                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#C59B53]/15 text-xs font-mono">
                  <div>
                    <span className="text-[#8E8271] block text-[10px] uppercase">Relief Dinding</span>
                    <span className="text-[#F5EFE6] font-semibold">2.672 Panel Pahat</span>
                  </div>
                  <div>
                    <span className="text-[#8E8271] block text-[10px] uppercase">Arca Buddha</span>
                    <span className="text-[#F5EFE6] font-semibold">504 Arca Meditasi</span>
                  </div>
                  <div>
                    <span className="text-[#8E8271] block text-[10px] uppercase">Stupa Berongga</span>
                    <span className="text-[#F5EFE6] font-semibold">72 Stupa Teras</span>
                  </div>
                  <div>
                    <span className="text-[#8E8271] block text-[10px] uppercase">Struktur Bangunan</span>
                    <span className="text-[#F5EFE6] font-semibold">55.000 m³ Andesit</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <Link
                    href="/tempat-sakral/candi-borobudur"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DFB873] to-[#C59B53] hover:from-[#ECC47E] hover:to-[#DFB873] text-[#140F08] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg group cursor-pointer"
                  >
                    <span>Pelajari Filosofi Spiritual Borobudur</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Minimalist Editorial Exploration Options (Typographic Bar — No Redundant Image Containers) */}
          <ScrollReveal direction="up" distance={20} delay={150}>
            <div className="pt-8 border-t border-[#C59B53]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[#A89F91]">
                <span className="text-[#ECC47E] uppercase tracking-wider font-semibold">
                  Situs Sakral Lainnya:
                </span>
                {[
                  { name: 'Dataran Tinggi Dieng', slug: 'dataran-tinggi-dieng', note: '2.093 MDPL' },
                  { name: 'Candi Cetho', slug: 'candi-cetho', note: 'Gunung Lawu' },
                  { name: 'Masjid Agung Demak', slug: 'masjid-agung-demak', note: '1479 M' },
                  { name: 'Candi Sukuh', slug: 'candi-sukuh', note: 'Piramida Maya' },
                  { name: 'Candi Gedong Songo', slug: 'candi-gedong-songo', note: 'Ungaran' },
                ].map((site, idx) => (
                  <React.Fragment key={site.slug}>
                    {idx > 0 && <span className="text-[#C59B53]/30">•</span>}
                    <Link
                      href={`/tempat-sakral/${site.slug}`}
                      className="hover:text-[#ECC47E] transition-colors inline-flex items-center gap-1 group py-0.5"
                    >
                      <span className="group-hover:underline underline-offset-4 decoration-[#ECC47E]/40">
                        {site.name}
                      </span>
                      <span className="text-[10px] text-[#C59B53]/70">
                        ({site.note})
                      </span>
                    </Link>
                  </React.Fragment>
                ))}
              </div>

              <Link
                href="/tempat-sakral"
                className="inline-flex items-center gap-1.5 text-[#ECC47E] hover:text-white font-bold transition-colors group shrink-0"
              >
                <span>Buka Seluruh Direktori Tempat Sakral</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* =========================================================================
          FEATURE SECTION 04: WEB PHOTOBOOTH (4-CUT)
          ========================================================================= */}
      <section id="photobooth" className="scroll-mt-20 py-10 bg-gradient-to-b from-[#0D0C0A] to-[#14100C]">
        <SectionDivider number="04" title="WEB PHOTOBOOTH" icon={Camera} />
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
