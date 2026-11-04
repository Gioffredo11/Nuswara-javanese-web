'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import { tokohArticles } from '@/data/tokohArticles';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function TokohIdentitySection() {
  const [activeSlug, setActiveSlug] = useState<string>(tokohArticles[0]?.slug || 'ra-kartini');
  const sliderRef = useRef<HTMLDivElement>(null);
  const activeFigure = tokohArticles.find((t) => t.slug === activeSlug) || tokohArticles[0];

  const handleSelectTokoh = (slug: string) => {
    setActiveSlug(slug);
    const tabEl = document.getElementById(`tokoh-tab-${slug}`);
    if (tabEl) {
      tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[#C5A059]/20 pb-6">
        <ScrollReveal direction="up" distance={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                [ ARSIP // 02 ] — WARISAN KETELADANAN BANGSA
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFE6] leading-[1.05]">
                Mereka meninggalkan jejak.{' '}
                <span className="italic font-normal text-gold-gradient block mt-1">
                  Kita meneruskan makna.
                </span>
              </h2>
            </div>

            {/* Primary Action Button: Direktori Tokoh */}
            <div className="shrink-0">
              <Link
                href="/tokoh"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 group cursor-pointer shadow-lg rounded-xl"
              >
                <BookOpen className="w-4 h-4 text-[#0C0A08]" />
                <span>Buka Direktori Tokoh</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Slidable Photo Option Track */}
      <ScrollReveal direction="up" distance={25} delay={100}>
        <div
          ref={sliderRef}
          role="tablist"
          aria-label="Pilih tokoh peradaban"
          className="rounded-2xl border border-[#C5A059]/25 p-2 flex gap-3 overflow-x-auto bg-[#14110E]/95 tokoh-sliderbar scroll-smooth items-stretch"
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
                className={`group shrink-0 p-2 rounded-xl transition-all duration-300 flex items-center gap-2.5 cursor-pointer min-w-[170px] sm:min-w-[200px] text-left border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#241A10] to-[#16120D] border-[#C5A059] ring-2 ring-[#C5A059]/40 shadow-xl'
                    : 'bg-[#14110E] hover:bg-[#1C1610] border-[#C5A059]/20 hover:border-[#C5A059]/50 shadow-md'
                }`}
              >
                {/* Hero Photo Thumbnail */}
                <div
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 border transition-all duration-300 ${
                    isActive
                      ? 'border-[#C5A059] ring-1 ring-[#C5A059]/60 shadow-md scale-105'
                      : 'border-[#C5A059]/30 group-hover:border-[#C5A059]/70'
                  }`}
                >
                  <Image
                    src={tokoh.photoUrl}
                    alt={tokoh.name}
                    fill
                    sizes="48px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0.5 left-0.5 bg-[#0C0A08]/85 px-1 py-0.5 rounded text-[8px] font-mono font-bold text-[#C5A059]">
                    0{index + 1}
                  </div>
                </div>

                {/* Hero Title Only */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`font-royal text-xs sm:text-sm font-bold truncate ${
                        isActive ? 'text-[#F4EFE6]' : 'text-[#D5C9B5] group-hover:text-white'
                      }`}
                    >
                      {tokoh.name}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Curated Editorial Spotlight Showcase (Compact & Clean) */}
      {activeFigure && (
        <ScrollReveal direction="up" distance={30} delay={150}>
          <div
            key={activeFigure.slug}
            id={`tokoh-panel-${activeFigure.slug}`}
            role="tabpanel"
            aria-labelledby={`tokoh-tab-${activeFigure.slug}`}
            className="py-2 relative animate-in fade-in duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Authentic Museum Archival Portrait */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] border border-[#C5A059]/40 bg-[#0C0A08] overflow-hidden rounded-2xl shadow-2xl group">
                  <Image
                    src={activeFigure.photoUrl}
                    alt={activeFigure.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                    priority
                  />
                  {/* Subtle antique framing corners */}
                  <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Editorial Bio & Actions */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A059] font-bold block">
                    {activeFigure.category}
                  </span>
                  <h3 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4EFE6] mt-1 leading-tight">
                    {activeFigure.name}
                  </h3>
                  <p className="font-editorial italic text-xs sm:text-sm text-[#C5A059]/90 mt-1">
                    {activeFigure.honorificTitle}
                  </p>
                </div>

                {/* Semboyan Luhur: Clean Pullquote */}
                <blockquote className="border-l-2 border-[#C5A059] pl-4 py-1 italic font-editorial text-base sm:text-lg text-[#F4EFE6] leading-relaxed">
                  &ldquo;{activeFigure.quote}&rdquo;
                </blockquote>

                {/* Single sentence narrative summary */}
                <p className="text-xs sm:text-sm text-[#A89F91] leading-relaxed font-sans">
                  {activeFigure.summary.split('.')[0]}.
                </p>

                {/* Action Buttons: 2 buttons only (Primary Colored + Secondary Uncolored) */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {/* Primary Colored Button: Direktori Tokoh */}
                  <Link
                    href="/tokoh"
                    className="min-h-[42px] px-5 py-3 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider transition-colors shadow-lg flex items-center gap-2 cursor-pointer rounded-xl group"
                  >
                    <BookOpen className="w-4 h-4 text-[#0C0A08]" />
                    <span>Buka Direktori Tokoh</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Secondary Uncolored Button: Biografi Tokoh */}
                  <Link
                    href={`/tokoh/${activeFigure.slug}`}
                    className="min-h-[42px] px-5 py-3 bg-[#14110E] hover:bg-[#1C1610] text-[#C5A059] hover:text-[#F4EFE6] border border-[#C5A059]/40 rounded-xl font-medium text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Baca Biografi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}

export default TokohIdentitySection;
