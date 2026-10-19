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
  BookOpen,
  X,
  Quote,
  CheckCircle2,
  Compass,
  FileText,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function TokohIdentitySection() {
  const [activeSlug, setActiveSlug] = useState<string>(tokohArticles[0]?.slug || 'ra-kartini');
  const [selectedTokoh, setSelectedTokoh] = useState<TokohArticle | null>(null);

  const activeFigure = tokohArticles.find((t) => t.slug === activeSlug) || tokohArticles[0];

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
    <div className="space-y-10">
      {/* Editorial Header */}
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
              Tokoh-tokoh peradaban Jawa Tengah yang mengorbankan raga dan meluhurkan jiwa demi kemerdekaan akal budi manusia. Telusuri intisari pemikiran dan berkas arsip mereka.
            </p>
          </div>
        </ScrollReveal>

        {/* Primary Action Button */}
        <ScrollReveal direction="up" distance={30} delay={150}>
          <div className="shrink-0">
            <Link
              href="/tokoh"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#1C1610] hover:bg-[#C59B53] text-[#ECC47E] hover:text-[#100D0A] border border-[#C59B53]/40 hover:border-[#C59B53] font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 group cursor-pointer shadow-md"
            >
              <BookOpen className="w-4 h-4 text-[#ECC47E] group-hover:text-[#100D0A] transition-colors" />
              <span>Buka Seluruh Direktori ({tokohArticles.length} Tokoh)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Minimalist Interactive Figure Selector (Replaces repetitive catalog cards) */}
      <ScrollReveal direction="up" distance={25} delay={100}>
        <div
          role="tablist"
          aria-label="Pilih tokoh peradaban"
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#C59B53]/20"
        >
          {tokohArticles.map((tokoh, index) => {
            const isActive = tokoh.slug === activeFigure.slug;
            return (
              <button
                key={tokoh.slug}
                role="tab"
                id={`tokoh-tab-${tokoh.slug}`}
                aria-selected={isActive}
                aria-controls={`tokoh-panel-${tokoh.slug}`}
                tabIndex={0}
                onClick={() => setActiveSlug(tokoh.slug)}
                className={`group shrink-0 px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2.5 cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-[#241A12] text-[#ECC47E] border border-[#C59B53]/60 shadow-lg'
                    : 'bg-[#14100C]/60 hover:bg-[#1C150E] text-[#8E8271] hover:text-[#D8C8AD] border border-transparent'
                }`}
              >
                <span className={`text-[10px] font-bold ${isActive ? 'text-[#ECC47E]' : 'text-[#8E8271] group-hover:text-[#C59B53]'}`}>
                  0{index + 1}
                </span>
                <span className="font-semibold">{tokoh.name}</span>
                <span className={`hidden sm:inline text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-[#312318] text-[#DFB873]' : 'bg-[#18130E] text-[#6E6353]'}`}>
                  {tokoh.originCity.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Curated Editorial Spotlight Showcase (Single focused layout without catalog fatigue) */}
      {activeFigure && (
        <ScrollReveal direction="up" distance={30} delay={150}>
          <div
            id={`tokoh-panel-${activeFigure.slug}`}
            role="tabpanel"
            aria-labelledby={`tokoh-tab-${activeFigure.slug}`}
            className="rounded-3xl bg-gradient-to-b from-[#16110B] via-[#120E0A] to-[#0D0A07] border border-[#C59B53]/35 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Authentic Museum Archival Portrait */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#C59B53]/50 bg-[#0B0907] shadow-xl group">
                  <Image
                    src={activeFigure.photoUrl}
                    alt={activeFigure.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover filter contrast-[1.08] sepia-[0.1] group-hover:scale-103 transition-transform duration-700"
                    priority
                  />
                  {/* Antique framing corners */}
                  <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#ECC47E]/80 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#ECC47E]/80 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#ECC47E]/80 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#ECC47E]/80 pointer-events-none" />

                  {/* Gradient shadow for caption readability */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0907] via-[#0B0907]/60 to-transparent p-4 pt-10">
                    <span className="text-[10px] font-mono tracking-widest text-[#ECC47E] uppercase font-bold block">
                      {activeFigure.idNumber}
                    </span>
                    <span className="text-xs text-[#E2D5C3] font-editorial italic block mt-0.5">
                      {activeFigure.originCity} • {activeFigure.period}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#ECC47E] bg-[#22180F] px-3 py-1 rounded-full border border-[#C59B53]/30 inline-block">
                    {activeFigure.badgeLabel}
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Bio, Falsafah Hidup, and Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#C59B53] uppercase tracking-wider">
                    <span>{activeFigure.category}</span>
                    <span>•</span>
                    <span>{activeFigure.period}</span>
                  </div>

                  <h3 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5EFE6] mt-1.5">
                    {activeFigure.name}
                  </h3>

                  <p className="font-editorial italic text-xs sm:text-sm text-[#DFB873] mt-1">
                    {activeFigure.honorificTitle}
                  </p>
                </div>

                {/* Semboyan Luhur Quote Block */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#1D1610]/90 border border-[#C59B53]/30 relative">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#ECC47E] uppercase font-bold mb-1.5">
                    <Quote className="w-3.5 h-3.5 text-[#C59B53]" />
                    <span>Falsafah Hidup &amp; Semboyan</span>
                  </div>
                  <p className="font-editorial italic text-base sm:text-lg text-[#F3E9D8] leading-relaxed">
                    &ldquo;{activeFigure.quote}&rdquo;
                  </p>
                </div>

                {/* Narrative Summary */}
                <p className="text-xs sm:text-sm text-[#B9B0A3] leading-relaxed font-sans">
                  {activeFigure.summary}
                </p>

                {/* Instrument / Weapon / Struggle Attribute */}
                <div className="p-3 rounded-xl bg-[#140F0A] border border-[#C59B53]/20 flex items-start gap-2.5 text-xs">
                  <span className="font-mono text-[#ECC47E] font-bold shrink-0 text-[11px] uppercase">
                    Pusaka / Atribut:
                  </span>
                  <span className="text-[#D8C8AD] font-sans">
                    {activeFigure.personalData.senjataAtauAtribut}
                  </span>
                </div>

                {/* Action Buttons: Inspect Archival Dossier or Full Article */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTokoh(activeFigure)}
                    className="min-h-[44px] px-5 py-2.5 bg-gradient-to-r from-[#DFB873] to-[#C59B53] hover:from-[#ECC47E] hover:to-[#DFB873] text-[#140F08] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-102 flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#140F08]" />
                    <span>Buka Berkas Arsip Lengkap</span>
                  </button>

                  <Link
                    href={`/tokoh/${activeFigure.slug}`}
                    className="min-h-[44px] px-5 py-2.5 bg-[#1C1610] hover:bg-[#281F17] text-[#ECC47E] hover:text-white border border-[#C59B53]/40 rounded-xl font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Baca Biografi Penuh</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Editorial Footnote (Replaces redundant bottom banner and 3-card mini grid) */}
      <ScrollReveal direction="up" distance={20} delay={200}>
        <div className="pt-4 border-t border-[#C59B53]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <span className="text-[#8E8271] text-center sm:text-left">
            Menyimpan {tokohArticles.length} biografi tokoh peradaban Jawa Tengah dengan arsip sejarah terverifikasi.
          </span>
          <Link
            href="/tokoh"
            className="inline-flex items-center gap-1.5 text-[#ECC47E] hover:text-white font-bold transition-colors group cursor-pointer"
          >
            <span>Buka Seluruh {tokohArticles.length} Tokoh di Direktori</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>

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
