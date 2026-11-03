'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function TokohIdentitySection() {
  const [activeSlug, setActiveSlug] = useState<string>(tokohArticles[0]?.slug || 'ra-kartini');
  const [selectedTokoh, setSelectedTokoh] = useState<TokohArticle | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const activeFigure = tokohArticles.find((t) => t.slug === activeSlug) || tokohArticles[0];
  const currentIndex = tokohArticles.findIndex((t) => t.slug === activeFigure.slug);
  const prevFigure = tokohArticles[(currentIndex - 1 + tokohArticles.length) % tokohArticles.length];
  const nextFigure = tokohArticles[(currentIndex + 1) % tokohArticles.length];

  // Check scroll bounds for slide buttons
  const checkScrollBounds = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScrollBounds();
    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds);
    return () => {
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleSelectTokoh = (slug: string) => {
    setActiveSlug(slug);
    const tabEl = document.getElementById(`tokoh-tab-${slug}`);
    if (tabEl) {
      tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

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
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#14110E] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#0C0A08] border border-[#C5A059]/40 hover:border-[#C5A059] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 group cursor-pointer shadow-md rounded-xl"
              >
                <BookOpen className="w-4 h-4 text-[#C5A059] group-hover:text-[#0C0A08] transition-colors" />
                <span>Buka Direktori ({tokohArticles.length} Tokoh)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Full-Width Archival Index Bar (Exposed Hairline Grid & Slidable Photo Options) */}
      <ScrollReveal direction="up" distance={25} delay={100}>
        <div className="space-y-3">
          {/* Header Bar with Slide Controls */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                PILIH TOKOH PERADABAN ({tokohArticles.length})
              </span>
              <span className="hidden md:inline text-[11px] text-[#8E8271] font-mono">
                — Geser foto ke kanan untuk melihat tokoh lainnya
              </span>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={slideLeft}
                disabled={!canScrollLeft}
                aria-label="Slide opsi tokoh ke kiri"
                className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                  canScrollLeft
                    ? 'bg-[#14110E] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#0C0A08] border-[#C5A059]/40 shadow-sm'
                    : 'bg-[#14110E]/40 text-[#554D42] border-[#C5A059]/15 cursor-not-allowed opacity-40'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={slideRight}
                disabled={!canScrollRight}
                aria-label="Slide opsi tokoh ke kanan"
                className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer font-mono text-xs ${
                  canScrollRight
                    ? 'bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold border-[#C5A059] shadow-md shadow-[#C5A059]/15 animate-pulse hover:animate-none'
                    : 'bg-[#14110E]/40 text-[#554D42] border-[#C5A059]/15 cursor-not-allowed opacity-40'
                }`}
              >
                <span>Slide ke Kanan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slidable Photo Option Track with Gradient Masks */}
          <div className="relative group/track">
            {/* Left Gradient Edge Mask */}
            {canScrollLeft && (
              <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#0C0A08] via-[#0C0A08]/80 to-transparent z-10 pointer-events-none rounded-l-2xl" />
            )}

            {/* Right Gradient Edge Mask */}
            {canScrollRight && (
              <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#0C0A08] via-[#0C0A08]/80 to-transparent z-10 pointer-events-none rounded-r-2xl" />
            )}

            {/* Floating Quick-Slide Right Arrow */}
            {canScrollRight && (
              <button
                type="button"
                onClick={slideRight}
                aria-label="Slide opsi pahlawan ke kanan"
                className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] shadow-2xl transition-transform hover:scale-110 cursor-pointer border-2 border-[#0C0A08]"
              >
                <ChevronRight className="w-5 h-5 font-bold" />
              </button>
            )}

            {/* Floating Quick-Slide Left Arrow */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={slideLeft}
                aria-label="Slide opsi pahlawan ke kiri"
                className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-[#14110E] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#0C0A08] border border-[#C5A059]/60 shadow-2xl transition-transform hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Track Container */}
            <div
              ref={sliderRef}
              role="tablist"
              aria-label="Pilih tokoh peradaban"
              className="rounded-2xl border border-[#C5A059]/25 p-2 flex gap-3 overflow-x-auto bg-[#14110E]/95 scrollbar-none scroll-smooth items-stretch"
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
                    onClick={() => handleSelectTokoh(tokoh.slug)}
                    className={`group shrink-0 p-2 sm:p-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 cursor-pointer min-w-[230px] sm:min-w-[270px] text-left border ${
                      isActive
                        ? 'bg-gradient-to-r from-[#241A10] to-[#16120D] border-[#C5A059] ring-2 ring-[#C5A059]/40 shadow-xl'
                        : 'bg-[#14110E] hover:bg-[#1C1610] border-[#C5A059]/20 hover:border-[#C5A059]/50 shadow-md'
                    }`}
                  >
                    {/* Hero Photo Thumbnail (Full Color) */}
                    <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border transition-all duration-300 ${
                      isActive
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/60 shadow-md scale-105'
                        : 'border-[#C5A059]/30 group-hover:border-[#C5A059]/70 group-hover:scale-102'
                    }`}>
                      <Image
                        src={tokoh.photoUrl}
                        alt={tokoh.name}
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Index Number Badge */}
                      <div className="absolute top-1 left-1 bg-[#0C0A08]/85 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-[#C5A059]">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Hero Title & City */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                          isActive ? 'text-[#C5A059]' : 'text-[#8E8271]'
                        }`}>
                          {tokoh.originCity.split(',')[0]}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                        )}
                      </div>
                      <div className={`font-royal text-sm sm:text-base font-bold truncate mt-0.5 ${
                        isActive ? 'text-[#F4EFE6]' : 'text-[#D5C9B5] group-hover:text-white'
                      }`}>
                        {tokoh.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#8E8271] truncate mt-0.5">
                        {tokoh.period}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Curated Editorial Spotlight Showcase */}
      {activeFigure && (
        <ScrollReveal direction="up" distance={30} delay={150}>
          <div
            key={activeFigure.slug}
            id={`tokoh-panel-${activeFigure.slug}`}
            role="tabpanel"
            aria-labelledby={`tokoh-tab-${activeFigure.slug}`}
            className="py-4 relative animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Authentic Museum Archival Portrait (Full Vibrant Color) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-[4/5] border-2 border-[#C5A059]/50 bg-[#0C0A08] overflow-hidden group rounded-2xl shadow-2xl">
                  <Image
                    src={activeFigure.photoUrl}
                    alt={activeFigure.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Antique framing corners */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C5A059] pointer-events-none" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C5A059] pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C5A059] pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C5A059] pointer-events-none" />

                  {/* Gradient shadow for caption readability */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0C0A08] via-[#0C0A08]/85 to-transparent p-5 pt-12">
                    <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold block">
                      [ ARSIP VISUAL // {activeFigure.idNumber} ]
                    </span>
                    <span className="text-sm text-[#F4EFE6] font-editorial italic block mt-0.5">
                      {activeFigure.originCity} • {activeFigure.period}
                    </span>
                  </div>
                </div>

                {/* Metadata caption plate below portrait */}
                <div className="mt-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] bg-[#14110E] px-3.5 py-1.5 border border-[#C5A059]/40 inline-block rounded-lg shadow-sm">
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
                <blockquote className="border-l-4 border-[#C5A059] pl-5 py-2.5 my-2 bg-[#14110E]/80 rounded-r-xl">
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
                    className="min-h-[44px] px-6 py-3.5 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider transition-colors shadow-lg flex items-center gap-2 cursor-pointer rounded-xl"
                  >
                    <FileText className="w-4 h-4 text-[#0C0A08]" />
                    <span>Buka Berkas Arsip Lengkap</span>
                  </button>

                  <Link
                    href={`/tokoh/${activeFigure.slug}`}
                    className="min-h-[44px] px-6 py-3.5 bg-[#14110E] hover:bg-[#1C1610] text-[#C5A059] hover:text-[#F4EFE6] border border-[#C5A059]/40 rounded-xl font-medium text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Baca Biografi Penuh</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Slide Navigation Between Heroes */}
                <div className="pt-4 border-t border-[#C5A059]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => handleSelectTokoh(prevFigure.slug)}
                    aria-label={`Slide ke tokoh sebelumnya: ${prevFigure.name}`}
                    className="px-4 py-2.5 bg-[#14110E] hover:bg-[#1C1610] text-[#A89F91] hover:text-[#F4EFE6] border border-[#C5A059]/30 hover:border-[#C5A059]/60 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#C5A059]" />
                    <span>Sebelumnya: <strong className="text-[#F4EFE6]">{prevFigure.name}</strong></span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectTokoh(nextFigure.slug)}
                    aria-label={`Slide ke tokoh berikutnya: ${nextFigure.name}`}
                    className="px-4 py-2.5 bg-[#14110E] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#0C0A08] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer group shadow-md"
                  >
                    <span>Slide ke Kanan: <strong>{nextFigure.name}</strong></span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
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
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#14110E] border border-[#C5A059]/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header: Archival Identity Stamp */}
            <div className="p-5 sm:p-6 bg-[#0C0A08] border-b border-[#C5A059]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#14110E] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
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
                className="w-9 h-9 rounded-full bg-[#14110E] hover:bg-[#241B12] border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              {/* Top Summary & Identity Photo Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-xl overflow-hidden border border-[#C5A059]/50 shadow-xl bg-[#0C0A08]">
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
                className="px-6 py-3 border border-[#C5A059]/40 hover:bg-[#14110E] text-xs font-mono uppercase text-[#A89F91] hover:text-[#F4EFE6] transition-colors cursor-pointer rounded-xl"
              >
                Tutup Berkas
              </button>

              <Link
                href={`/tokoh/${selectedTokoh.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-xl cursor-pointer rounded-xl"
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