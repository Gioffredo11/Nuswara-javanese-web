'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import { tokohArticles } from '@/data/tokohArticles';
import {
  ArrowRight,
  BookOpen,
  Star,
  Feather,
  Shield,
  Swords,
  Sun,
  Compass,
  Award,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function TokohIdentitySection() {
  const [activeSlug, setActiveSlug] = useState<string>(tokohArticles[0]?.slug || 'ra-kartini');
  const [viewMode, setViewMode] = useState<'color' | 'archive'>('color');
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeFigure = tokohArticles.find((t) => t.slug === activeSlug) || tokohArticles[0];

  const handleSelectTokoh = (slug: string) => {
    setActiveSlug(slug);
    setViewMode('color');
    const tabEl = document.getElementById(`tokoh-tab-${slug}`);
    if (tabEl) {
      tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const renderDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'feather':
        return <Feather className="w-4 h-4" />;
      case 'shield':
        return <Shield className="w-4 h-4" />;
      case 'book-open':
        return <BookOpen className="w-4 h-4" />;
      case 'swords':
        return <Swords className="w-4 h-4" />;
      case 'sun':
        return <Sun className="w-4 h-4" />;
      case 'compass':
        return <Compass className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  const currentPhoto =
    viewMode === 'color' && activeFigure?.colorPhotoUrl
      ? activeFigure.colorPhotoUrl
      : activeFigure?.photoUrl;

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
            const thumbPhoto = tokoh.colorPhotoUrl || tokoh.photoUrl;

            return (
              <button
                key={tokoh.slug}
                role="tab"
                id={`tokoh-tab-${tokoh.slug}`}
                aria-selected={isActive}
                aria-controls={`tokoh-panel-${tokoh.slug}`}
                tabIndex={0}
                onClick={() => handleSelectTokoh(tokoh.slug)}
                className={`group shrink-0 p-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 cursor-pointer min-w-[190px] sm:min-w-[220px] text-left border relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#241A10] to-[#16120D] border-[#C5A059] ring-2 ring-[#C5A059]/50 shadow-xl scale-[1.01]'
                    : 'bg-[#14110E] hover:bg-[#1C1610] border-[#C5A059]/20 hover:border-[#C5A059]/50 shadow-md'
                }`}
              >
                {/* Hero Photo Thumbnail */}
                <div
                  className={`relative w-11 h-13 sm:w-12 sm:h-14 rounded-lg overflow-hidden shrink-0 border transition-all duration-300 ${
                    isActive
                      ? 'border-[#C5A059] ring-1 ring-[#C5A059]/70 shadow-md'
                      : 'border-[#C5A059]/30 group-hover:border-[#C5A059]/70'
                  }`}
                >
                  <Image
                    src={thumbPhoto}
                    alt={tokoh.name}
                    fill
                    sizes="48px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0.5 left-0.5 bg-[#0C0A08]/90 px-1 py-0.2 rounded text-[8px] font-mono font-bold text-[#C5A059] flex items-center gap-0.5">
                    <span>0{index + 1}</span>
                    {tokoh.isSupremeHero && <span className="text-amber-400">★</span>}
                  </div>
                </div>

                {/* Identity & Domain Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <span
                    className="text-[9px] font-mono uppercase tracking-wider block truncate"
                    style={{ color: isActive ? tokoh.bidangIdentity.accentColor : '#8E8271' }}
                  >
                    {tokoh.bidangIdentity.bidangTag.split('&')[0].trim()}
                  </span>
                  <div className="flex items-center justify-between gap-1 mt-0.5">
                    <span
                      className={`font-royal text-xs sm:text-sm font-bold truncate ${
                        isActive ? 'text-[#F4EFE6]' : 'text-[#D5C9B5] group-hover:text-white'
                      }`}
                    >
                      {tokoh.name}
                    </span>
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: tokoh.bidangIdentity.accentColor }}
                      />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
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
            className="py-2 relative animate-in fade-in duration-300"
          >
            {/* Ambient Background Aura customized by Hero's Domain */}
            <div
              className={`absolute -top-10 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40 bg-gradient-to-br ${activeFigure.bidangIdentity.glowClass}`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Special Hero Portrait with Archival & Color Presentation */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] border border-[#C5A059]/40 bg-[#0C0A08] overflow-hidden rounded-2xl shadow-2xl group">
                  <Image
                    src={currentPhoto}
                    alt={activeFigure.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                    priority
                  />

                  {/* Top Honor Badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
                    {activeFigure.isSupremeHero ? (
                      <div className="px-2.5 py-1 rounded-lg bg-[#0C0A08]/90 border border-[#C5A059]/70 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-[9px] font-mono tracking-wider font-bold text-[#F4EFE6]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                        <span className="truncate">{activeFigure.bidangIdentity.specialMeritBadge}</span>
                      </div>
                    ) : (
                      <div className="px-2.5 py-1 rounded-lg bg-[#0C0A08]/85 border border-[#C5A059]/30 backdrop-blur-md text-[8px] font-mono tracking-wider text-[#A89F91]">
                        ARSIP RESMI NASIONAL
                      </div>
                    )}
                  </div>

                  {/* Bottom View Mode Switcher (For Colorized/Restored vs Classic Monochrome) */}
                  {activeFigure.colorPhotoUrl && (
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1 bg-[#0C0A08]/90 p-1 rounded-lg border border-[#C5A059]/40 backdrop-blur-md shadow-md">
                        <button
                          type="button"
                          onClick={() => setViewMode('color')}
                          className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            viewMode === 'color'
                              ? 'bg-[#C5A059] text-[#0C0A08] shadow-sm'
                              : 'text-[#A89F91] hover:text-[#F4EFE6]'
                          }`}
                        >
                          Foto Berwarna
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode('archive')}
                          className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            viewMode === 'archive'
                              ? 'bg-[#C5A059] text-[#0C0A08] shadow-sm'
                              : 'text-[#A89F91] hover:text-[#F4EFE6]'
                          }`}
                        >
                          Arsip Monokrom
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Antique framing corners */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Editorial Bio, Unique Bidang Attributes & Actions */}
              <div className="lg:col-span-7 space-y-4">
                {/* Domain Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold px-2.5 py-0.5 rounded-full border ${activeFigure.bidangIdentity.accentBadgeClass}`}
                  >
                    {activeFigure.bidangIdentity.bidangTag}
                  </span>
                  {activeFigure.isSupremeHero && (
                    <span className="text-[9px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-600/50 flex items-center gap-1 shadow-sm">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      Pahlawan Nasional Utama
                    </span>
                  )}
                </div>

                {/* Name & Honorific Title */}
                <div>
                  <h3 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4EFE6] leading-tight">
                    {activeFigure.name}
                  </h3>
                  <p className="font-editorial italic text-xs sm:text-sm text-[#C5A059]/90 mt-1">
                    {activeFigure.honorificTitle}
                  </p>
                </div>

                {/* Bidang Keunggulan & Atribut Unik Card */}
                <div className="p-3 rounded-xl bg-[#14110E] border border-[#C5A059]/25 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-inner"
                    style={{
                      backgroundColor: `${activeFigure.bidangIdentity.accentColor}18`,
                      borderColor: `${activeFigure.bidangIdentity.accentColor}60`,
                      color: activeFigure.bidangIdentity.accentColor,
                    }}
                  >
                    {renderDomainIcon(activeFigure.bidangIdentity.iconName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#8E8271] block">
                      Atribut Khusus & Bidang Perjuangan
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#F4EFE6] block truncate">
                      {activeFigure.bidangIdentity.highlightAttribute}
                    </span>
                  </div>
                </div>

                {/* Semboyan Luhur: Pullquote with Bidang Accent Border */}
                <blockquote
                  className="border-l-2 pl-4 py-1 italic font-editorial text-base sm:text-lg text-[#F4EFE6] leading-relaxed"
                  style={{ borderColor: activeFigure.bidangIdentity.accentColor }}
                >
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