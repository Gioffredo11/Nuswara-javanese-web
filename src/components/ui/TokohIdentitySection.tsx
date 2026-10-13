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

      {/* Grid of Archival Identity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {tokohArticles.map((tokoh, idx) => (
          <ScrollReveal
            key={tokoh.slug}
            direction="up"
            distance={35}
            delay={100 + idx * 80}
            className="flex flex-col h-full"
          >
            <div
              onClick={() => setSelectedTokoh(tokoh)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedTokoh(tokoh);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Buka berkas identitas dan riwayat lengkap ${tokoh.name}`}
              className="group relative rounded-3xl bg-[#14100C] border-2 border-[#C59B53]/35 hover:border-[#ECC47E] p-5 sm:p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(197,155,83,0.18)] cursor-pointer overflow-hidden h-full select-none"
            >
              {/* Antique Paper Guilloche Watermark */}
              <div className="absolute inset-0 bg-radial from-[#C59B53]/10 via-transparent to-transparent opacity-50 pointer-events-none group-hover:opacity-80 transition-opacity" />

              {/* Card Header: Official Identity Badge & Archival Stamp */}
              <div className="relative z-10 border-b border-[#C59B53]/25 pb-4 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ECC47E] animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-[#B99A60] uppercase font-bold">
                    KARTU IDENTITAS ARSIP
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#ECC47E] bg-[#22180F] px-2.5 py-0.5 rounded-md border border-[#C59B53]/30 font-semibold">
                  {tokoh.idNumber}
                </span>
              </div>

              {/* Card Body: Photo Frame & Key Identification */}
              <div className="relative z-10 space-y-5 flex-1 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                  {/* Archival Passport Photo with Vintage Embossed Frame */}
                  <div className="relative w-32 sm:w-28 aspect-[3/4] shrink-0 rounded-2xl overflow-hidden border-2 border-[#C59B53]/50 group-hover:border-[#ECC47E] shadow-xl p-1 bg-[#1C1611] transition-colors">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={tokoh.photoUrl}
                        alt={`Potret arsip bersejarah ${tokoh.name}`}
                        fill
                        className="object-cover filter contrast-[1.08] sepia-[0.15] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Retro Photo Corner Brackets */}
                    <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#ECC47E] pointer-events-none" />
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#ECC47E] pointer-events-none" />
                    <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#ECC47E] pointer-events-none" />
                    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#ECC47E] pointer-events-none" />
                  </div>

                  {/* Identification Attributes */}
                  <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ECC47E] bg-[#261A10] px-2.5 py-0.5 rounded-full border border-[#C59B53]/35 font-semibold inline-block">
                      {tokoh.badgeLabel}
                    </span>

                    <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors leading-tight">
                      {tokoh.name}
                    </h3>

                    <p className="text-xs text-[#A89F91] font-editorial italic line-clamp-1">
                      {tokoh.honorificTitle}
                    </p>

                    <div className="pt-2 space-y-1 text-xs font-mono text-[#D8C8AD]">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-[#B99A60] shrink-0" />
                        <span>Masa Hidup: {tokoh.period}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#B99A60] shrink-0" />
                        <span className="truncate">{tokoh.originCity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Semboyan / Quote Box */}
                <div className="p-3.5 rounded-2xl bg-[#19130D] border border-[#C59B53]/25 space-y-1 group-hover:border-[#C59B53]/60 transition-colors">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#ECC47E] uppercase font-bold">
                    <Quote className="w-3 h-3 text-[#B99A60]" />
                    <span>Semboyan & Falsafah</span>
                  </div>
                  <p className="font-editorial italic text-xs text-[#E2D5C3] leading-relaxed line-clamp-2">
                    &ldquo;{tokoh.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer: Interactive Call To Action */}
              <div className="relative z-10 pt-4 mt-5 border-t border-[#C59B53]/20 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#A89F91] flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#B99A60]" />
                  <span>Lihat Berkas Identitas</span>
                </span>

                <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#ECC47E] group-hover:text-white transition-colors">
                  <span>Buka Detail</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
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

      {/* ============================================================== */}
      {/* MODAL DIALOG: DETAIL IDENTITAS & PENJELASAN LENGKAP             */}
      {/* ============================================================== */}
      {selectedTokoh && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tokoh-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
        >
          {/* Backdrop with heavy blur */}
          <div
            onClick={() => setSelectedTokoh(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity cursor-pointer"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-4xl bg-[#14100C] text-[#F5EFE6] rounded-3xl border-2 border-[#C59B53]/60 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col overflow-hidden my-auto animate-scale-up">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-[#1A140F] border-b border-[#C59B53]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#ECC47E] animate-ping" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B99A60] font-bold block">
                    BERKAS RESMI IDENTITAS TOKOH • {selectedTokoh.idNumber}
                  </span>
                  <h3 id="tokoh-modal-title" className="font-royal text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
                    {selectedTokoh.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTokoh(null)}
                aria-label="Tutup berkas identitas"
                className="w-10 h-10 rounded-full bg-[#241A12] border border-[#C59B53]/40 hover:border-[#ECC47E] text-[#D8C8AD] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
              {/* Top Dossier Hero: Photo + Passport Identification Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start bg-[#18120D] p-5 sm:p-6 rounded-2xl border border-[#C59B53]/25">
                {/* Photo */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="relative aspect-[3/4] w-48 sm:w-52 rounded-2xl overflow-hidden border-2 border-[#ECC47E] shadow-2xl p-1 bg-[#1C1611]">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={selectedTokoh.photoUrl}
                        alt={selectedTokoh.name}
                        fill
                        className="object-cover filter contrast-[1.1] sepia-[0.1]"
                      />
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-[#A89F91] text-center mt-2 uppercase tracking-widest block">
                    {selectedTokoh.verifiedSealText}
                  </span>
                </div>

                {/* Identification Table */}
                <div className="md:col-span-8 space-y-4">
                  <div className="border-b border-[#C59B53]/20 pb-3">
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
                  <span>Semboyan Luhur & Falsafah Hidup</span>
                </div>
                <p className="font-editorial italic text-base sm:text-lg text-[#FAF5EB] leading-relaxed">
                  &ldquo;{selectedTokoh.quote}&rdquo;
                </p>
              </div>

              {/* In-Depth Historical Narrative */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ECC47E] font-bold border-b border-[#C59B53]/20 pb-2">
                  <BookOpen className="w-4 h-4 text-[#B99A60]" />
                  <span>Kilas Riwayat & Intisari Perjuangan</span>
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
                  🏆 Warisan & Kontribusi Abadi bagi Indonesia
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
                    ✨ Fakta Unik Bersejarah
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
                className="px-5 py-2.5 rounded-xl border border-[#C59B53]/40 hover:bg-[#241A12] text-xs font-semibold text-[#D8C8AD] transition-colors cursor-pointer"
              >
                Tutup Berkas
              </button>

              <Link
                href={`/tokoh/${selectedTokoh.slug}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-102 cursor-pointer"
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
