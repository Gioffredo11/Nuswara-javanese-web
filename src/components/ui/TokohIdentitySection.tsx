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
      <div className="border-b border-[#C5A059]/20 pb-8">
        <ScrollReveal direction="up" distance={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                [ ARSIP // 02 ] — WARISAN KETELADANAN BANGSA
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] leading-[1.05]">
                Mereka meninggalkan jejak.{' '}
                <span className="italic font-normal text-gold-gradient block mt-1">
                  Kita meneruskan makna.
                </span>
              </h2>
              <p className="text-sm text-[#A89F91] leading-relaxed max-w-xl font-sans pt-1">
                Tokoh-tokoh peradaban Jawa Tengah yang mengorbankan raga dan meluhurkan budi pekerti. Telusuri intisari pemikiran dan berkas arsip sejarah mereka.
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="shrink-0">
              <Link
                href="/tokoh"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#14110E] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#0C0A08] border border-[#C5A059]/40 hover:border-[#C5A059] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 group cursor-pointer shadow-md rounded-none"
              >
                <BookOpen className="w-4 h-4 text-[#C5A059] group-hover:text-[#0C0A08] transition-colors" />
                <span>Buka Direktori ({tokohArticles.length} Tokoh)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Full-Width Archival Index Bar (Exposed Hairline Grid) */}
      <ScrollReveal direction="up" distance={25} delay={100}>
        <div
          role="tablist"
          aria-label="Pilih tokoh peradaban"
          className="border-y border-[#C5A059]/20 divide-x divide-[#C5A059]/20 flex overflow-x-auto bg-[#14110E] scrollbar-none"
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
                className={`group shrink-0 px-5 py-3 text-xs font-mono transition-colors flex items-center gap-3 cursor-pointer min-h-[44px] rounded-none ${
                  isActive
                    ? 'bg-[#C5A059] text-[#0C0A08] font-bold'
                    : 'text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#1A1612]'
                }`}
              >
                <span className={`text-[10px] font-bold ${isActive ? 'text-[#0C0A08]' : 'text-[#C5A059]'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="tracking-wider">{tokoh.name}</span>
                <span
                  className={`hidden sm:inline text-[9px] px-1.5 py-0.5 font-mono ${
                    isActive
                      ? 'bg-[#0C0A08] text-[#C5A059]'
                      : 'bg-[#1C1610] text-[#8E8271]'
                  }`}
                >
                  {tokoh.originCity.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Curated Editorial Spotlight Showcase */}
      {activeFigure && (
        <ScrollReveal direction="up" distance={30} delay={150}>
          <div
            id={`tokoh-panel-${activeFigure.slug}`}
            role="tabpanel"
            aria-labelledby={`tokoh-tab-${activeFigure.slug}`}
            className="py-4 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Authentic Museum Archival Portrait */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-[4/5] border border-[#C5A059]/40 bg-[#0C0A08] overflow-hidden group">
                  <Image
                    src={activeFigure.photoUrl}
                    alt={activeFigure.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover filter contrast-[1.08] sepia-[0.1] group-hover:scale-102 transition-transform duration-700"
                    priority
                  />
                  {/* Antique framing corners */}
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#C5A059] pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#C5A059] pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#C5A059] pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#C5A059] pointer-events-none" />

                  {/* Gradient shadow for caption readability */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0C0A08] via-[#0C0A08]/80 to-transparent p-4 pt-10">
                    <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold block">
                      [ ARSIP VISUAL // {activeFigure.idNumber} ]
                    </span>
                    <span className="text-xs text-[#F4EFE6] font-editorial italic block mt-0.5">
                      {activeFigure.originCity} • {activeFigure.period}
                    </span>
                  </div>
                </div>

                {/* Metadata caption plate below portrait */}
                <div className="mt-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] bg-[#14110E] px-3 py-1 border border-[#C5A059]/30 inline-block">
                    {activeFigure.badgeLabel}
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Bio, Falsafah Hidup, and Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#C5A059] uppercase tracking-wider">
                    <span>{activeFigure.category}</span>
                    <span>•</span>
                    <span>{activeFigure.period}</span>
                  </div>

                  <h3 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] mt-1.5 leading-tight">
                    {activeFigure.name}
                  </h3>

                  <p className="font-editorial italic text-sm sm:text-base text-[#C5A059] mt-1">
                    {activeFigure.honorificTitle}
                  </p>
                </div>

                {/* Semboyan Luhur: Dramatic Editorial Pullquote */}
                <blockquote className="border-l-4 border-[#C5A059] pl-5 py-2 my-2 bg-[#14110E]/60">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#C5A059] uppercase font-bold mb-1">
                    <Quote className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>FALSAFAH HIDUP &amp; SEMBOYAN</span>
                  </div>
                  <p className="font-editorial italic text-xl sm:text-2xl text-[#F4EFE6] leading-relaxed">
                    &ldquo;{activeFigure.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Narrative Summary */}
                <p className="text-sm text-[#A89F91] leading-relaxed font-sans">
                  {activeFigure.summary}
                </p>

                {/* Instrument / Weapon / Struggle Attribute */}
                <div className="flex items-baseline gap-2 text-xs font-sans text-[#A89F91] pt-1">
                  <span className="font-mono text-[#C5A059] font-bold text-[11px] uppercase tracking-wider shrink-0">
                    Atribut Perjuangan:
                  </span>
                  <span className="text-[#F4EFE6]">
                    {activeFigure.personalData.senjataAtauAtribut}
                  </span>
                </div>

                {/* Action Buttons: Inspect Archival Dossier or Full Article */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTokoh(activeFigure)}
                    className="min-h-[44px] px-6 py-3.5 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider transition-colors shadow-lg flex items-center gap-2 cursor-pointer rounded-none"
                  >
                    <FileText className="w-4 h-4 text-[#0C0A08]" />
                    <span>Buka Berkas Arsip Lengkap</span>
                  </button>

                  <Link
                    href={`/tokoh/${activeFigure.slug}`}
                    className="min-h-[44px] px-6 py-3.5 bg-[#14110E] hover:bg-[#1C1610] text-[#C5A059] hover:text-[#F4EFE6] border border-[#C5A059]/40 rounded-none font-medium text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
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

      {/* Editorial Footnote */}
      <ScrollReveal direction="up" distance={20} delay={200}>
        <div className="pt-4 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <span className="text-[#8E8271] text-center sm:text-left">
            Menyimpan {tokohArticles.length} biografi tokoh peradaban Jawa Tengah dengan arsip sejarah terverifikasi.
          </span>
          <Link
            href="/tokoh"
            className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-white font-bold transition-colors group cursor-pointer"
          >
            <span>Buka Seluruh Direktori Tokoh</span>
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
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-none bg-[#14110E] border border-[#C5A059]/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header: Archival Identity Stamp */}
            <div className="p-5 sm:p-6 bg-[#0C0A08] border-b border-[#C5A059]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-[#14110E] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                  <FileText className="w-5 h-5 text-[#C5A059]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] font-bold">
                      BERKAS RESMI IDENTITAS TOKOH
                    </span>
                    <span className="text-[10px] font-mono text-[#A89F91]">
                      · {selectedTokoh.idNumber}
                    </span>
                  </div>
                  <h3
                    id="modal-tokoh-title"
                    className="font-royal text-lg sm:text-xl font-bold text-[#F4EFE6]"
                  >
                    {selectedTokoh.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTokoh(null)}
                aria-label="Tutup berkas arsip"
                className="w-9 h-9 rounded-none bg-[#14110E] hover:bg-[#241B12] border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              {/* Top Summary & Identity Photo Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-none overflow-hidden border border-[#C5A059]/50 shadow-xl bg-[#0C0A08]">
                    <Image
                      src={selectedTokoh.photoUrl}
                      alt={selectedTokoh.name}
                      fill
                      sizes="(max-width: 640px) 192px, 224px"
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C5A059] pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C5A059] pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#C5A059] pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C5A059] pointer-events-none" />
                  </div>

                  <div className="mt-3 text-center">
                    <span className="text-[11px] font-mono text-[#C5A059] block font-semibold">
                      {selectedTokoh.period}
                    </span>
                    <span className="text-[10px] font-mono text-[#A89F91]">
                      {selectedTokoh.originCity}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] bg-[#0C0A08] px-3 py-1 border border-[#C5A059]/35 font-semibold">
                      {selectedTokoh.category}
                    </span>
                    <h4 className="font-royal text-xl sm:text-2xl font-bold text-[#F4EFE6] mt-2">
                      {selectedTokoh.fullName}
                    </h4>
                    <p className="text-xs text-[#C5A059] font-editorial italic">
                      {selectedTokoh.honorificTitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-[#0C0A08] border border-[#C5A059]/20">
                      <span className="text-[10px] text-[#A89F91] uppercase block">Kelahiran:</span>
                      <span className="text-[#F4EFE6] font-medium block mt-0.5">{selectedTokoh.birthDateText}</span>
                    </div>

                    <div className="p-3 bg-[#0C0A08] border border-[#C5A059]/20">
                      <span className="text-[10px] text-[#A89F91] uppercase block">Wafat:</span>
                      <span className="text-[#F4EFE6] font-medium block mt-0.5">{selectedTokoh.deathDateText}</span>
                    </div>

                    <div className="p-3 bg-[#0C0A08] border border-[#C5A059]/20">
                      <span className="text-[10px] text-[#A89F91] uppercase block">Lokasi Makam:</span>
                      <span className="text-[#F4EFE6] font-medium block mt-0.5">{selectedTokoh.personalData.makam}</span>
                    </div>

                    <div className="p-3 bg-[#0C0A08] border border-[#C5A059]/20">
                      <span className="text-[10px] text-[#A89F91] uppercase block">Gelar Kepahlawanan:</span>
                      <span className="text-[#C5A059] font-medium block mt-0.5">{selectedTokoh.personalData.gelarPahlawan}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0C0A08] border border-[#C5A059]/35">
                    <span className="text-[10px] font-mono text-[#C5A059] uppercase font-bold block">
                      Atribut / Pusaka / Instrumen Perjuangan:
                    </span>
                    <p className="text-xs text-[#F4EFE6] mt-0.5 font-sans">
                      {selectedTokoh.personalData.senjataAtauAtribut}
                    </p>
                  </div>
                </div>
              </div>

              {/* Falsafah Hidup Quote */}
              <div className="p-5 sm:p-6 bg-[#0C0A08] border-l-4 border-[#C5A059] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] uppercase font-bold">
                  <Quote className="w-4 h-4 text-[#C5A059]" />
                  <span>Semboyan Luhur &amp; Falsafah Hidup</span>
                </div>
                <p className="font-editorial italic text-base sm:text-lg text-[#F4EFE6] leading-relaxed">
                  &ldquo;{selectedTokoh.quote}&rdquo;
                </p>
              </div>

              {/* In-Depth Historical Narrative */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold border-b border-[#C5A059]/20 pb-2">
                  <BookOpen className="w-4 h-4 text-[#C5A059]" />
                  <span>Kilas Riwayat &amp; Intisari Perjuangan</span>
                </div>

                <div className="space-y-6">
                  {selectedTokoh.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                      <h5 className="font-royal text-lg font-bold text-[#C5A059]">
                        {sec.title}
                      </h5>
                      <div className="space-y-3 text-xs sm:text-sm text-[#A89F91] leading-relaxed font-sans font-light">
                        {sec.content.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {sec.highlightQuote && (
                        <div className="p-4 bg-[#0C0A08] border-l-4 border-[#C5A059] text-xs font-editorial italic text-[#F4EFE6]">
                          &ldquo;{sec.highlightQuote}&rdquo;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Legacies */}
              <div className="space-y-3 pt-4 border-t border-[#C5A059]/20">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold block">
                  Warisan &amp; Kontribusi Abadi bagi Indonesia
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedTokoh.keyLegacies.map((legacy, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-3.5 bg-[#0C0A08] border border-[#C5A059]/20 flex items-start gap-2.5 text-xs text-[#F4EFE6]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{legacy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              {selectedTokoh.funFacts.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#C5A059]/20">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-bold block">
                    Fakta Unik Bersejarah
                  </span>
                  <div className="space-y-2">
                    {selectedTokoh.funFacts.map((fact, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-3 bg-[#0C0A08] border border-[#C5A059]/20 text-xs text-[#A89F91] flex items-start gap-2"
                      >
                        <span className="font-mono text-[#C5A059] font-bold">•</span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer: Action Buttons */}
            <div className="p-6 bg-[#0C0A08] border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedTokoh(null)}
                className="px-6 py-3 border border-[#C5A059]/40 hover:bg-[#14110E] text-xs font-mono uppercase text-[#A89F91] hover:text-[#F4EFE6] transition-colors cursor-pointer rounded-none"
              >
                Tutup Berkas
              </button>

              <Link
                href={`/tokoh/${selectedTokoh.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-xl cursor-pointer rounded-none"
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