'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GununganSvg,
  GatotkacaSvg,
  BatikKawungPatternSvg,
  BatikParangPatternSvg,
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
  ArrowUp,
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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

  // Monitor scroll for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div id="beranda" className="flex flex-col min-h-screen relative bg-[#0D0C0A] text-[#F5EFE6]">
      {/* =========================================================================
          0. CINEMATIC HERO SECTION: NUSWARA MUSEUM DIGITAL JAWA TENGAH
          (Faithfully matches Visual Reference Photo 1:1)
          ========================================================================= */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-6">
        {/* Background Landscape Atmosphere (Merapi & Ancient Temples) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/editorial/hero-nuswara.jpg"
            alt="Misty landscape of Mount Merapi and Borobudur temples Central Java"
            fill
            priority
            className="object-cover object-center filter brightness-[0.70] contrast-[1.08]"
          />
          {/* Controlled dark gradient overlay matching reference photo lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C0A]/92 via-[#0D0C0A]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/85 via-transparent to-[#0D0C0A]/50" />
        </div>


        {/* Left: Asymmetrical Editorial Typography matching Reference Photo */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-20 w-full my-auto py-12 lg:py-16">
          <ScrollReveal direction="up" distance={30} delay={100}>
            <div className="max-w-2xl lg:max-w-3xl space-y-6 md:space-y-8 text-left">
              {/* Eyebrow: Horizontal Gold Line + Category */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#B99A60]" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.25em] text-[#B99A60] font-medium">
                  MUSEUM DIGITAL JAWA TENGAH
                </span>
              </div>

              {/* Classical Serif Title */}
              <h1 className="font-royal text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-normal tracking-[0.08em] text-[#F0E6D4] leading-none select-none">
                NUSWARA
              </h1>

              {/* Subtitle & Literary Lead */}
              <div className="space-y-3 max-w-xl">
                <p className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#F0E6D4] leading-snug font-normal tracking-wide">
                  Menelusuri Jejak, Merawat Warisan.
                </p>
                <p className="font-sans text-sm sm:text-base md:text-lg text-[#B9B0A3] leading-relaxed font-light">
                  Jawa Tengah bukan sekadar tempat. Ia adalah cerita dan warisan yang terus hidup.
                </p>
              </div>

              {/* Primary Antique Gold CTA Button (Matching Photo) */}
              <div className="pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('sejarah')}
                  className="px-8 py-4 bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] font-medium text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-2xl flex items-center gap-3 cursor-pointer group"
                >
                  <span>Jelajahi Jawa Tengah</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Metadata Exhibition Bar (Matches Visual Reference Photo 1:1) */}
        <div className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-6 pt-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#8E8271] uppercase select-none">
            <span className="text-left">PAMERAN BUDAYA • 2026</span>

            <button
              type="button"
              onClick={() => scrollToSection('sejarah')}
              className="flex flex-col items-center gap-1 text-center text-[#8E8271] hover:text-[#ECC47E] transition-colors cursor-pointer group"
              title="Gulir ke bawah untuk menelusuri"
            >
              <span>GULIR UNTUK MENELUSURI</span>
              <span className="text-sm text-[#B99A60] transition-transform group-hover:translate-y-1">↓</span>
            </button>

            <span className="text-right">MERAPI • BOROBUDUR</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EDITORIAL STATEMENT BANNER: "Warisan bukan hanya masa lalu..."
          ========================================================================= */}
      <section className="bg-[#12100D] border-y border-[#C59B53]/25 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="md:col-span-5 space-y-4 text-sm text-[#A89F91] leading-relaxed border-t md:border-t-0 md:border-l border-[#C59B53]/25 pt-6 md:pt-0 md:pl-8">
                <p>
                  Kearifan Jawa tidak diciptakan untuk dipajang di lemari kaca museum. Ia diwariskan lewat tutur tembang, ketukan cempala dalang di atas kelir, dan nilai-nilai welas asih yang membimbing laku hidup kita sehari-hari.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-[#ECC47E]">
                  <span>MEMAYU HAYUNING BAWANA</span>
                  <span>•</span>
                  <span>SANGKAN PARANING DUMADI</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          PARCHMENT SECTION 1: "Berabad-abad cerita, satu tanah yang sama."
          ========================================================================= */}
      <section id="sejarah" className="bg-[#F4EDE2] text-[#241E17] py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Antique Stone Bas-Relief Carving */}
            <ScrollReveal direction="up" distance={40} delay={100} className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl p-2 bg-[#EBE2D3]">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="/images/editorial/candi-relief.jpg"
                    alt="Ancient bas-relief carving of Borobudur temple Central Java"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7A6A53] block">
                    RELIEF CANDI BOROBUDUR • ABAD VIII MASEHI
                  </span>
                  <p className="font-editorial italic text-xs text-[#4A3D2C] mt-0.5">
                    Guratan batu andesit yang memahat doa dan perjalanan spiritual manusia Jawa.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Narrative Eras of Central Java */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal direction="up" distance={30}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DBCB] border border-[#C59B53]/50 text-[#5C4A33] text-xs font-mono tracking-widest uppercase">
                  KILAS SEJARAH JAWA TENGAH
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231E17] leading-tight mt-3">
                  Berabad-abad cerita, <br />
                  <span className="italic font-normal text-[#8A5A2B]">satu tanah yang sama.</span>
                </h2>

                <p className="text-sm sm:text-base text-[#574F44] leading-relaxed font-sans mt-3">
                  Dari dataran vulkanik Dieng hingga keraton Surakarta, Jawa Tengah menjadi episentrum bertemunya spiritualitas Hindu-Buddha, kearifan animisme purba, dan peradaban Islam Nusantara.
                </p>
              </ScrollReveal>

              {/* Timeline Items as interactive buttons connecting to article pages */}
              <div className="space-y-4 pt-2">
                <ScrollReveal direction="up" distance={35} delay={100}>
                  <Link
                    href="/sejarah/era-keagungan-candi"
                    className="block p-4 sm:p-5 rounded-xl bg-[#FAF5EB] border border-[#D9CEBE] transition-all duration-300 hover:border-[#C59B53] hover:bg-[#FDF9F2] hover:shadow-md group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#8A5A2B] font-bold">
                      <span>01. KERAJAAN MATARAM KUNO</span>
                      <span className="text-[11px] text-[#8A5A2B]/80">Abad VIII - X M</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1.5">
                      <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#231E17] group-hover:text-[#8A5A2B] transition-colors">
                        Era Keagungan Candi & Pemujaan Semesta
                      </h3>
                      <div className="w-7 h-7 rounded-full bg-[#EFE5D5] group-hover:bg-[#C59B53] text-[#8A5A2B] group-hover:text-[#100D0A] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-xs text-[#665D50] leading-relaxed mt-1.5">
                      Pembangunan Candi Borobudur oleh Dinasti Syailendra dan Candi Prambanan oleh Rakai Pikatan. Fondasi kosmologi yang memuliakan harmoni antara manusia, alam, dan Sang Pencipta.
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-[#E8DDCC] flex items-center gap-1.5 text-[11px] font-mono text-[#8A5A2B] font-semibold group-hover:text-[#6E421B]">
                      <span>Baca Artikel Sejarah Lengkap</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </ScrollReveal>

                <ScrollReveal direction="up" distance={35} delay={250}>
                  <Link
                    href="/sejarah/akulturasi-wayang-kulit"
                    className="block p-4 sm:p-5 rounded-xl bg-[#FAF5EB] border border-[#D9CEBE] transition-all duration-300 hover:border-[#C59B53] hover:bg-[#FDF9F2] hover:shadow-md group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#8A5A2B] font-bold">
                      <span>02. KESULTANAN ISLAM PESISIR & MATARAM ISLAM</span>
                      <span className="text-[11px] text-[#8A5A2B]/80">Abad XVI - XVIII M</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1.5">
                      <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#231E17] group-hover:text-[#8A5A2B] transition-colors">
                        Akulturasi Wayang Kulit & Tembang Macapat
                      </h3>
                      <div className="w-7 h-7 rounded-full bg-[#EFE5D5] group-hover:bg-[#C59B53] text-[#8A5A2B] group-hover:text-[#100D0A] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-xs text-[#665D50] leading-relaxed mt-1.5">
                      Para wali menggubah wayang kulit purwa menjadi sarana dakwah dan tuntunan budi pekerti. Munculnya gamelan keraton, serat-serat piwulang, dan keselarasan rasa batin Jawa.
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-[#E8DDCC] flex items-center gap-1.5 text-[11px] font-mono text-[#8A5A2B] font-semibold group-hover:text-[#6E421B]">
                      <span>Baca Artikel Sejarah Lengkap</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </ScrollReveal>

                <ScrollReveal direction="up" distance={35} delay={400}>
                  <Link
                    href="/sejarah/ksatria-modern"
                    className="block p-4 sm:p-5 rounded-xl bg-[#FAF5EB] border border-[#D9CEBE] transition-all duration-300 hover:border-[#C59B53] hover:bg-[#FDF9F2] hover:shadow-md group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#8A5A2B] font-bold">
                      <span>03. PERGERAKAN NASIONAL & IDENTITAS DIGITAL</span>
                      <span className="text-[11px] text-[#8A5A2B]/80">Abad XIX - XXI M</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1.5">
                      <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#231E17] group-hover:text-[#8A5A2B] transition-colors">
                        Ksatria Modern: Literasi, Pendidikan, & Kelestarian
                      </h3>
                      <div className="w-7 h-7 rounded-full bg-[#EFE5D5] group-hover:bg-[#C59B53] text-[#8A5A2B] group-hover:text-[#100D0A] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-xs text-[#665D50] leading-relaxed mt-1.5">
                      Perjuangan Pangeran Diponegoro, R.A. Kartini, hingga Ki Hadjar Dewantara menegakkan martabat batin bangsa. Hari ini, Nuswara meneruskan estafet nilai tersebut ke ranah digital.
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-[#E8DDCC] flex items-center gap-1.5 text-[11px] font-mono text-[#8A5A2B] font-semibold group-hover:text-[#6E421B]">
                      <span>Baca Artikel Sejarah Lengkap</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
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
          PARCHMENT SECTION 2: "Sebelai kain, sebuah cara memaknai." (BATIK & CANTING)
          ========================================================================= */}
      <section id="batik" className="bg-[#F4EDE2] text-[#241E17] py-20 scroll-mt-20 border-y border-[#C59B53]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Batik Philosophy */}
            <ScrollReveal direction="up" distance={30} className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DBCB] border border-[#C59B53]/50 text-[#5C4A33] text-xs font-mono tracking-widest uppercase">
                FILOSOFI ADILUHUNG BATIK
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231E17] leading-tight">
                Sebelai kain, <br />
                <span className="italic font-normal text-[#8A5A2B]">sebuah cara memaknai.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#574F44] leading-relaxed font-sans">
                Setiap tetes malam dari ujung tembaga canting bukan sekadar goresan ornamen. Ia adalah doa hening, kesabaran batin, dan harapan spiritual yang ditiupkan para pembatik tradisi ke serat kain mori.
              </p>

              {/* Motif Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <ScrollReveal direction="up" distance={25} delay={100}>
                  <div className="p-3.5 rounded-xl bg-[#FAF5EB] border border-[#D9CEBE] shadow-xs h-full">
                    <span className="font-editorial text-base font-bold text-[#231E17] block">
                      Parang Rusak
                    </span>
                    <span className="text-[10px] font-mono text-[#8A5A2B] uppercase tracking-wider block mt-0.5">
                      JIWA KSATRIA
                    </span>
                    <p className="text-[11px] text-[#665D50] leading-relaxed mt-1">
                      Ombak samudra tak henti: pantang menyerah dan ketajaman budi pekerti.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" distance={25} delay={200}>
                  <div className="p-3.5 rounded-xl bg-[#FAF5EB] border border-[#D9CEBE] shadow-xs h-full">
                    <span className="font-editorial text-base font-bold text-[#231E17] block">
                      Kawung
                    </span>
                    <span className="text-[10px] font-mono text-[#8A5A2B] uppercase tracking-wider block mt-0.5">
                      KESUCIAN HATI
                    </span>
                    <p className="text-[11px] text-[#665D50] leading-relaxed mt-1">
                      Buah aren empat penjuru: hati yang bersih dan pengendali hawa nafsu.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" distance={25} delay={300}>
                  <div className="p-3.5 rounded-xl bg-[#FAF5EB] border border-[#D9CEBE] shadow-xs h-full">
                    <span className="font-editorial text-base font-bold text-[#231E17] block">
                      Truntum
                    </span>
                    <span className="text-[10px] font-mono text-[#8A5A2B] uppercase tracking-wider block mt-0.5">
                      CINTA ABADI
                    </span>
                    <p className="text-[11px] text-[#665D50] leading-relaxed mt-1">
                      Bintang malam keraton: cinta tulus yang senantiasa bertunas kembali.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>

            {/* Right: Close-up Canting Artisan Photo */}
            <ScrollReveal direction="up" distance={40} delay={200} className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl p-2 bg-[#EBE2D3]">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="/images/editorial/batik-canting.jpg"
                    alt="Javanese artisan hand writing batik with canting"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7A6A53] block">
                    LAKU CANTHING • SURAKARTA & PEKALONGAN
                  </span>
                  <p className="font-editorial italic text-xs text-[#4A3D2C] mt-0.5">
                    Setiap helai kain adalah manuskrip doa tanpa kata.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
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
                Ingatan yang tinggal di lidah.
              </h2>
              <p className="text-sm text-[#A89F91] leading-relaxed">
                Kekayaan cita rasa warisan yang melintasi dapur keraton hingga kehangatan warung wedangan di sudut kota tua.
              </p>
            </div>
          </ScrollReveal>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lumpia Semarang */}
            <ScrollReveal direction="up" distance={35} delay={100}>
              <div className="rounded-2xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden shadow-xl hover:border-[#C59B53] transition-colors group h-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/editorial/kuliner-lumpia.jpg"
                    alt="Traditional Lumpia Semarang"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                    <span>SEMARANG</span>
                    <span>AKULTURASI PESISIR</span>
                  </div>
                  <h3 className="font-royal text-xl font-bold text-[#F5EFE6]">
                    Lumpia Semarang
                  </h3>
                  <p className="text-xs text-[#A89F91] leading-relaxed">
                    Perpaduan harmonis rebung manis gurih, daging ayam/udang, daun bawang segar, dan cocolan saus cokelat kental khas pesisir utara Jawa.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Nasi Liwet Solo */}
            <ScrollReveal direction="up" distance={35} delay={250}>
              <div className="rounded-2xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden shadow-xl hover:border-[#C59B53] transition-colors group h-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/editorial/kuliner-liwet.jpg"
                    alt="Authentic Nasi Liwet Solo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                    <span>SURAKARTA (SOLO)</span>
                    <span>SAJIAN KERATON</span>
                  </div>
                  <h3 className="font-royal text-xl font-bold text-[#F5EFE6]">
                    Nasi Liwet Solo
                  </h3>
                  <p className="text-xs text-[#A89F91] leading-relaxed">
                    Beras gurih beraroma santan dan daun salam, disajikan dalam wadah pincuk daun pisang bersama suwiran ayam kampung, sayur labu siam, dan gumpalan areh kelapa lembut.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Tempe Mendoan Banyumas */}
            <ScrollReveal direction="up" distance={35} delay={400}>
              <div className="rounded-2xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden shadow-xl hover:border-[#C59B53] transition-colors group h-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/editorial/kuliner-mendoan.jpg"
                    alt="Hot Tempe Mendoan Banyumas"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                    <span>BANYUMAS</span>
                    <span>HANGAT MERAKYAT</span>
                  </div>
                  <h3 className="font-royal text-xl font-bold text-[#F5EFE6]">
                    Tempe Mendoan Banyumas
                  </h3>
                  <p className="text-xs text-[#A89F91] leading-relaxed">
                    Tempe kedelai tipis dibalut adonan tepung terigu daun bawang yang digoreng setengah matang (mendo), dinikmati selagi panas bersama cocolan sambal kecap cabai rawit pedas.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MONUMENTS SECTION: "Di sini, waktu terasa hening." (SITUS KEABADIAN)
          ========================================================================= */}
      <section id="monumen" className="bg-[#0D0C0A] py-20 border-b border-[#C59B53]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <ScrollReveal direction="up" distance={30}>
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ECC47E]">
                MONUMEN KEABADIAN
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] leading-tight">
                Di sini, <br />
                <span className="italic font-normal text-gold-gradient">waktu terasa hening.</span>
              </h2>
              <p className="text-sm text-[#A89F91] leading-relaxed">
                Mahakarya arsitektur batu andesit yang berdiri tegak menantang abad, mengabadikan renungan batin para leluhur di tanah Jawa.
              </p>
            </div>
          </ScrollReveal>

          {/* Monument Cards 2-Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Candi Borobudur */}
            <ScrollReveal direction="up" distance={40} delay={150}>
              <div className="rounded-2xl bg-[#14110E] border border-[#C59B53]/35 overflow-hidden shadow-2xl group h-full">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src="/images/editorial/monumen-borobudur.jpg"
                    alt="Sunrise over Borobudur stupas Central Java"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      MAGELANG, JAWA TENGAH
                    </span>
                    <span>UNESCO HERITAGE</span>
                  </div>
                  <h3 className="font-royal text-2xl font-bold text-[#F5EFE6]">
                    Candi Borobudur
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed">
                    Mahakarya batu andesit abad ke-8 di lembah Kedu. Menjulang bertingkat melambangkan tahapan kesadaran spiritual manusia: dari hawa nafsu duniawi (Kamadhatu), wujud nyata (Rupadhatu), hingga kebebasan murni nirwana (Arupadhatu).
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Dataran Tinggi Dieng */}
            <ScrollReveal direction="up" distance={40} delay={300}>
              <div className="rounded-2xl bg-[#14110E] border border-[#C59B53]/35 overflow-hidden shadow-2xl group h-full">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src="/images/editorial/monumen-dieng.jpg"
                    alt="Misty landscape of Dieng Plateau and Candi Arjuna"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      WONOSOBO & BANJARNEGARA
                    </span>
                    <span>2.093 MDPL</span>
                  </div>
                  <h3 className="font-royal text-2xl font-bold text-[#F5EFE6]">
                    Dataran Tinggi Dieng
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed">
                    &ldquo;Di Hyang&rdquo; atau tempat bersemayamnya para dewata. Kompleks candi Hindu tertua di Jawa Tengah yang berselimut kabut belerang, telaga warna yang mistis, dan keheningan pegunungan yang mengheningkan cipta.
                  </p>
                </div>
              </div>
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

      {/* FLOATING BACK TO TOP BUTTON */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#1A140F] text-[#ECC47E] hover:text-white border border-[#C59B53]/70 shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group backdrop-blur-md"
          aria-label="Kembali ke atas"
          title="Kembali ke atas halaman"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}

export default HomePage;
