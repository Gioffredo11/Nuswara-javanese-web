'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import {
  tokohArticles,
  type TokohArticle,
} from '@/data/tokohArticles';
import {
  ArrowRight,
  Sparkles,
  Award,
  Calendar,
  MapPin,
  Shield,
  BookOpen,
  X,
  ExternalLink,
  Quote,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  User,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function TokohIdentitySection() {
  const [selectedTokoh, setSelectedTokoh] = useState<TokohArticle | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTokoh(null);
      }
    };
    if (selectedTokoh) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedTokoh]);

  return (
    <div className="space-y-12">
      {/* Top Header with Action Button to /tokoh */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ScrollReveal direction="up" distance={30}>
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1912] border border-[#C59B53]/50 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-[#C59B53]" />
              <span>WARISAN KETELADANAN BANGSA</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] leading-tight">
              Mereka meninggalkan jejak.{' '}
              <span className="italic font-normal text-gold-gradient block mt-1">
                Kita meneruskan makna.
              </span>
            </h2>

            <p className="text-sm text-[#A89F91] leading-relaxed">
              Tokoh-tokoh peradaban Jawa Tengah yang mengorbankan raga dan meluhurkan jiwa demi kemerdekaan akal budi manusia. Klik kartu identitas untuk membuka riwayat arsip lengkap.
            </p>
          </div>
        </ScrollReveal>

        {/* Primary CTA button leading to /tokoh article archive */}
        <ScrollReveal direction="up" distance={30} delay={150}>
          <div className="shrink-0">
            <Link
              href="/tokoh"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#DFB873] via-[#ECC47E] to-[#C59B53] hover:from-[#ECC47E] hover:to-[#DFB873] text-[#140F08] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-102 group cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#140F08]" />
              <span>Buka Seluruh Artikel Tokoh Jawa</span>
              <ArrowRight className="w-4 h-4 text-[#140F08] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Asymmetric Editorial Hero & Secondary Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Featured Large Editorial Card (R.A. Kartini) */}
        {tokohArticles[0] && (
          <ScrollReveal direction="up" distance={35} className="lg:col-span-6 flex">
            <div
              onClick={() => setSelectedTokoh(tokohArticles[0])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedTokoh(tokohArticles[0]);
                }
              }}
              aria-label={`Buka berkas ${tokohArticles[0].name}`}
              className="w-full rounded-3xl bg-gradient-to-b from-[#18120B] to-[#110D09] border-2 border-[#C5A36A]/40 hover:border-[#ECC47E] p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:shadow-[0_20px_45px_rgba(197,163,106,0.22)] cursor-pointer group relative overflow-hidden select-none"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#C5A36A]/20 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#ECC47E] uppercase font-bold">
                    02 / TOKOH UTAMA · {tokohArticles[0].originCity.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-[#ECC47E] bg-[#22180F] px-2.5 py-0.5 rounded-md border border-[#C5A36A]/30">
                    {tokohArticles[0].period}
                  </span>
                </div>

                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#C5A36A]/40 bg-[#0D0B08]">
                  <Image
                    src={tokohArticles[0].photoUrl}
                    alt={tokohArticles[0].name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover filter contrast-[1.08] sepia-[0.12] group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110D09] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ECC47E] bg-[#261A10]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C5A36A]/40 font-semibold inline-block mb-1.5">
                      {tokohArticles[0].badgeLabel}
                    </span>
                    <h3 className="font-royal text-3xl sm:text-4xl font-bold text-[#F5EFE6]">
                      {tokohArticles[0].name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1D1610] border border-[#C5A36A]/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#ECC47E] uppercase font-bold">
                    <Quote className="w-3.5 h-3.5 text-[#C5A36A]" />
                    <span>Surat & Pemikiran</span>
                  </div>
                  <p className="font-editorial italic text-sm text-[#F3E9D8] leading-relaxed">
                    &ldquo;{tokohArticles[0].quote}&rdquo;
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed">
                  {tokohArticles[0].summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#C5A36A]/20 flex items-center justify-between">
                <span className="text-xs font-mono text-[#ECC47E] flex items-center gap-1.5 font-bold">
                  <span>Buka Berkas & Kisah Lengkap</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-[11px] font-mono text-[#8E8271]">
                  KLIK UNTUK DETAIL
                </span>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Right: Stacked Secondary Tokoh Cards (Pangeran Diponegoro & Ki Hadjar Dewantara) */}
        <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
          {tokohArticles.slice(1, 3).map((tokoh, idx) => (
            <ScrollReveal
              key={tokoh.slug}
              direction="up"
              distance={35}
              delay={150 + idx * 100}
              className="flex-1"
            >
              <div
                onClick={() => setSelectedTokoh(tokoh)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTokoh(tokoh);
                  }
                }}
                aria-label={`Buka berkas ${tokoh.name}`}
                className="h-full rounded-3xl bg-[#14100C] border-2 border-[#C5A36A]/35 hover:border-[#ECC47E] p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer group select-none"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative w-28 sm:w-32 aspect-[3/4] shrink-0 rounded-2xl overflow-hidden border border-[#C5A36A]/40 bg-[#0D0B08] p-1">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={tokoh.photoUrl}
                        alt={tokoh.name}
                        fill
                        sizes="(max-width: 640px) 112px, 128px"
                        className="object-cover filter contrast-[1.08] sepia-[0.1] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#ECC47E]">
                      <span className="bg-[#24190F] px-2 py-0.5 rounded border border-[#C5A36A]/30">
                        {tokoh.badgeLabel}
                      </span>
                      <span>{tokoh.period}</span>
                    </div>

                    <h4 className="font-royal text-xl sm:text-2xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors">
                      {tokoh.name}
                    </h4>

                    <p className="text-xs text-[#8E8271] font-editorial italic">
                      {tokoh.originCity} · {tokoh.honorificTitle}
                    </p>

                    <p className="text-xs text-[#A89F91] leading-relaxed line-clamp-3 pt-1">
                      {tokoh.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#C5A36A]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A89F91] line-clamp-1 italic text-[11px]">
                    &ldquo;{tokoh.quote}&rdquo;
                  </span>
                  <span className="text-[#ECC47E] font-bold shrink-0 ml-2 flex items-center gap-1">
                    <span>Detail</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Expandable Section for Remaining Figures */}
      <div className="pt-2">
        <div className="flex items-center justify-between pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A36A]">
            TOKOH PERGERAKAN LAINNYA
          </span>
          <Link
            href="/tokoh"
            className="text-xs font-mono text-[#ECC47E] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Buka Seluruh 6 Tokoh di Galeri</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tokohArticles.slice(3).map((tokoh) => (
            <div
              key={tokoh.slug}
              onClick={() => setSelectedTokoh(tokoh)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedTokoh(tokoh);
                }
              }}
              aria-label={`Buka berkas ${tokoh.name}`}
              className="rounded-2xl bg-[#14100C] border border-[#C5A36A]/30 hover:border-[#ECC47E] p-4 flex items-center gap-4 shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="relative w-16 aspect-[3/4] shrink-0 rounded-xl overflow-hidden border border-[#C5A36A]/35 bg-[#0D0B08]">
                <Image
                  src={tokoh.photoUrl}
                  alt={tokoh.name}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[9px] font-mono uppercase text-[#ECC47E] block truncate">
                  {tokoh.badgeLabel}
                </span>
                <h5 className="font-royal text-base font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] truncate">
                  {tokoh.name}
                </h5>
                <p className="text-[11px] text-[#8E8271] truncate">
                  {tokoh.originCity} · {tokoh.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Banner Linking to All Articles */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#17120D] via-[#21170F] to-[#17120D] border border-[#C59B53]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-bold">
            DIREKTORI TOKOH NUSANTARA DARI TANAH JAWA
          </span>
          <h4 className="font-royal text-xl sm:text-2xl font-bold text-[#F5EFE6]">
            Ingin Mempelajari Seluruh Biografi & Tonggak Sejarah?
          </h4>
          <p className="text-xs sm:text-sm text-[#A89F91]">
            Baca artikel mendalam tentang pemikiran, surat-surat arsip, kronologi perjuangan militer, hingga warisan filosofis tokoh-tokoh pahlawan di halaman khusus.
          </p>
        </div>

        <Link
          href="/tokoh"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-102"
        >
          <span>Buka Galeri Artikel Tokoh</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      {/* Modal: In-Depth Identity Dossier */}
      {selectedTokoh && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-tokoh-title"
          onClick={() => setSelectedTokoh(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#14100C] border-2 border-[#C59B53]/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header: Archival Identity Stamp */}
            <div className="p-5 sm:p-6 bg-[#1A140F] border-b border-[#C59B53]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#241B12] border border-[#C59B53]/50 flex items-center justify-center text-[#ECC47E]">
                  <FileText className="w-5 h-5 text-[#ECC47E]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#ECC47E] font-bold">
                      BERKAS RESMI IDENTITAS TOKOH
                    </span>
                    <span className="text-[10px] font-mono text-[#A89F91]">
                      · {selectedTokoh.idNumber}
                    </span>
                  </div>
                  <h3
                    id="modal-tokoh-title"
                    className="font-royal text-lg sm:text-xl font-bold text-[#F5EFE6]"
                  >
                    {selectedTokoh.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTokoh(null)}
                aria-label="Tutup berkas arsip"
                className="w-10 h-10 rounded-full bg-[#241B12] hover:bg-[#332417] border border-[#C59B53]/40 text-[#ECC47E] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              {/* Top Summary & Identity Photo Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#C59B53] shadow-xl bg-[#0D0B08]">
                    <Image
                      src={selectedTokoh.photoUrl}
                      alt={selectedTokoh.name}
                      fill
                      sizes="(max-width: 640px) 192px, 224px"
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ECC47E] pointer-events-none" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ECC47E] pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ECC47E] pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ECC47E] pointer-events-none" />
                  </div>

                  <div className="mt-3 text-center">
                    <span className="text-[11px] font-mono text-[#DFB873] block font-semibold">
                      {selectedTokoh.period}
                    </span>
                    <span className="text-[10px] font-mono text-[#A89F91]">
                      {selectedTokoh.originCity}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ECC47E] bg-[#241A12] px-3 py-1 rounded-full border border-[#C59B53]/35 font-semibold">
                      {selectedTokoh.category}
                    </span>
                    <h4 className="font-royal text-xl sm:text-2xl font-bold text-[#F5EFE6] mt-2">
                      {selectedTokoh.fullName}
                    </h4>
                    <p className="text-xs text-[#DFB873] font-editorial italic">
                      {selectedTokoh.honorificTitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#130E0A] border border-[#C59B53]/20">
                      <span className="text-[10px] text-[#A89F91] uppercase block">Kelahiran:</span>
                      <span className="text-[#F5EFE6] font-medium block mt-0.5">{selectedTokoh.birthDateText}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#130E0A] border border-[#C59B53]/20">
                      <span className="text-[10px] text-[#A89F91] uppercase block">Wafat:</span>
                      <span className="text-[#F5EFE6] font-medium block mt-0.5">{selectedTokoh.deathDateText}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#130E0A] border border-[#C59B53]/20">
                      <span className="text-[10px] text-[#A89F91] uppercase block">Lokasi Makam:</span>
                      <span className="text-[#F5EFE6] font-medium block mt-0.5">{selectedTokoh.personalData.makam}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#130E0A] border border-[#C59B53]/20">
                      <span className="text-[10px] text-[#A89F91] uppercase block">Gelar Kepahlawanan:</span>
                      <span className="text-[#ECC47E] font-medium block mt-0.5">{selectedTokoh.personalData.gelarPahlawan}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#22170E] border border-[#C59B53]/35">
                    <span className="text-[10px] font-mono text-[#ECC47E] uppercase font-bold block">
                      Atribut / Pusaka / Instrumen Perjuangan:
                    </span>
                    <p className="text-xs text-[#E2D5C3] mt-0.5 font-sans">
                      {selectedTokoh.personalData.senjataAtauAtribut}
                    </p>
                  </div>
                </div>
              </div>

              {/* Falsafah Hidup Quote */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#1A140F] border border-[#ECC47E]/40 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-mono text-[#ECC47E] uppercase font-bold">
                  <Quote className="w-4 h-4 text-[#B99A60]" />
                  <span>Semboyan Luhur &amp; Falsafah Hidup</span>
                </div>
                <p className="font-editorial italic text-base sm:text-lg text-[#FAF5EB] leading-relaxed">
                  &ldquo;{selectedTokoh.quote}&rdquo;
                </p>
              </div>

              {/* In-Depth Historical Narrative */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ECC47E] font-bold border-b border-[#C59B53]/20 pb-2">
                  <BookOpen className="w-4 h-4 text-[#B99A60]" />
                  <span>Kilas Riwayat &amp; Intisari Perjuangan</span>
                </div>

                <div className="space-y-6">
                  {selectedTokoh.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                      <h5 className="font-royal text-lg font-bold text-[#ECC47E]">
                        {sec.title}
                      </h5>
                      <div className="space-y-3 text-xs sm:text-sm text-[#D8C8AD] leading-relaxed font-sans font-light">
                        {sec.content.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {sec.highlightQuote && (
                        <div className="p-4 rounded-xl bg-[#18120D] border-l-4 border-[#ECC47E] text-xs font-editorial italic text-[#FAF5EB]">
                          &ldquo;{sec.highlightQuote}&rdquo;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Legacies */}
              <div className="space-y-3 pt-4 border-t border-[#C59B53]/20">
                <span className="text-xs font-mono uppercase tracking-wider text-[#ECC47E] font-bold block">
                  Warisan &amp; Kontribusi Abadi bagi Indonesia
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedTokoh.keyLegacies.map((legacy, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-3.5 rounded-xl bg-[#18120D] border border-[#C59B53]/20 flex items-start gap-2.5 text-xs text-[#E2D5C3]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                      <span>{legacy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              {selectedTokoh.funFacts.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#C59B53]/20">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ECC47E] font-bold block">
                    Fakta Unik Bersejarah
                  </span>
                  <div className="space-y-2">
                    {selectedTokoh.funFacts.map((fact, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-3 rounded-xl bg-[#19140E] border border-[#C59B53]/20 text-xs text-[#D8C8AD] flex items-start gap-2"
                      >
                        <span className="font-mono text-[#ECC47E] font-bold">•</span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer: Action Buttons */}
            <div className="p-6 bg-[#1A140F] border-t border-[#C59B53]/30 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedTokoh(null)}
                className="px-5 py-2.5 min-h-[44px] rounded-xl border border-[#C59B53]/40 hover:bg-[#241A12] text-xs font-semibold text-[#D8C8AD] transition-colors cursor-pointer"
              >
                Tutup Berkas
              </button>

              <Link
                href={`/tokoh/${selectedTokoh.slug}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 min-h-[44px] rounded-xl bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-102 cursor-pointer"
              >
                <span>Baca Artikel Penuh {selectedTokoh.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TokohIdentitySection;
