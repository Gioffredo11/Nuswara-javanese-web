'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  getTarotImagePath,
  WayangFigureBySlug,
  GununganPosterWatermarks,
  GoldenDustMotes,
} from './WayangVectors';
import { Sparkles, Download, Share2, Check, ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from '@/components/common/Link';
import { exportWayangPosterCard } from './posterCardExport';

// Megamendung / Awan Wayang cloud flourish SVG
export function AwanWayangSvg({ className = 'w-16 h-10', color = '#D39F47', flip = false }: { className?: string; color?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M10 55 C10 40 25 35 35 42 C40 28 60 25 70 35 C80 20 105 25 110 45 C115 55 105 65 90 65 L20 65 C12 65 10 60 10 55 Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#cloudGrad)"
        fillOpacity="0.12"
      />
      <path
        d="M25 55 C25 46 35 43 42 48 C46 38 60 36 67 43 C74 33 90 36 94 50"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="15" cy="30" r="1.5" fill={color} opacity="0.7" />
      <circle cx="28" cy="20" r="2" fill={color} opacity="0.9" />
      <circle cx="105" cy="20" r="1.5" fill={color} opacity="0.7" />
      <defs>
        <linearGradient id="cloudGrad" x1="0" y1="0" x2="120" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export interface WayangPosterCardProps {
  type: 'ORACLE' | 'MANIFESTATION';
  title: string; // e.g. "Arjuna" or "Ngluruk Tanpa Bala"
  badgeRightTop?: string; // e.g. "HARI"
  badgeRightMid?: string; // e.g. "WAYANG"
  badgeRightBot?: string; // e.g. "NASIONAL"
  datePrimary?: string; // e.g. "07 November." or "Jumat Wage."
  dateSecondary?: string; // e.g. "2025" or "Neptu 10"
  subtitle?: string; // fallback if badgeRight not provided
  badgeDate?: string; // fallback if datePrimary not provided
  tagline?: string; // e.g. "Pujangga Humor Karangtumaritis"
  characterSlug?: string; // 'arjuna', 'petruk', 'gatotkaca', 'srikandi', 'semar'
  description: string; // Narrative paragraph at bottom
  secondaryQuote?: string; // e.g. original Javanese text
  modernInterpretation?: string;
  shareCode?: string;
  ctaUrl?: string;
  ctaText?: string;
  downloadFilename?: string;
  footerCta?: string;
  onDownloadCard?: () => void;
  downloading?: boolean;
  onShareCopy?: () => void;
  copied?: boolean;
}

export function WayangPosterCard({
  type,
  title,
  badgeRightTop,
  badgeRightMid,
  badgeRightBot,
  datePrimary,
  dateSecondary,
  subtitle = 'HARI WAYANG NASIONAL',
  badgeDate,
  tagline,
  characterSlug = 'arjuna',
  description,
  secondaryQuote,
  modernInterpretation,
  shareCode,
  ctaUrl,
  ctaText = 'Pelajari Profil Lengkap',
  downloadFilename,
  footerCta,
  onDownloadCard,
  downloading = false,
  onShareCopy,
  copied = false,
}: WayangPosterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [internalDownloading, setInternalDownloading] = useState(false);
  const isDownloading = downloading || internalDownloading;

  // Fallback slug normalization
  const normalizedSlug = (characterSlug || 'arjuna').toLowerCase();

  // Resolve right badge lines
  const rTop = badgeRightTop || (type === 'ORACLE' ? 'ORACLE' : 'PIWULANG');
  const rMid = badgeRightMid || (type === 'ORACLE' ? 'WAYANG' : 'LUHUR');
  const rBot = badgeRightBot || (type === 'ORACLE' ? 'NASIONAL' : 'JAWA');

  // Resolve left date lines
  const dPrimary = datePrimary || (badgeDate ? badgeDate.split('•')[0].trim() : '07 November.');
  const dSecondary = dateSecondary || (badgeDate && badgeDate.includes('•') ? badgeDate.split('•')[1].trim() : '2025');

  // Clean title for display: ensure period at end like in reference poster "Arjuna."
  const displayTitle = title.trim().endsWith('.') ? title.trim() : `${title.trim()}.`;

  const handleDownload = async () => {
    if (onDownloadCard) {
      onDownloadCard();
      return;
    }
    setInternalDownloading(true);
    try {
      await exportWayangPosterCard({
        type,
        title,
        badgeRightTop: rTop,
        badgeRightMid: rMid,
        badgeRightBot: rBot,
        datePrimary: dPrimary,
        dateSecondary: dSecondary,
        tagline,
        characterSlug: normalizedSlug,
        description,
        secondaryQuote,
        modernInterpretation,
        footerCta,
        filename: downloadFilename,
      });
    } catch (err) {
      console.error('Gagal mengunduh kartu:', err);
    } finally {
      setInternalDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[440px] mx-auto">
      {/* 9:16 Cultural Luxury Dimensional Poster Card Frame */}
      <div
        ref={cardRef}
        className="w-full aspect-[9/16] rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none text-amber-50 transition-all duration-300 hover:scale-[1.01]"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #5A3114 0%, #3D1E0B 45%, #231005 80%, #150802 100%)',
          boxShadow: '0 30px 70px -15px rgba(20, 8, 3, 0.85), 0 0 0 1.5px rgba(212, 163, 89, 0.55), 0 0 45px rgba(212, 163, 89, 0.25)',
        }}
      >
        {/* Subtle Batik Parang Texture Layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15 bg-repeat"
          style={{
            backgroundImage: "url('/images/batik-parang.png')",
            backgroundSize: '140px 140px',
          }}
        />

        {/* Double Inner Thin Border Frame for Crisp Dimension */}
        <div className="absolute inset-2.5 sm:inset-3 border border-amber-500/30 rounded-2xl pointer-events-none" />

        {/* Subtle Warm Halo behind the puppet figure */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(229, 178, 96, 0.22) 0%, rgba(92, 49, 20, 0.05) 65%, transparent 100%)',
          }}
        />

        {/* Ambient Gunungan Pair Watermarks (Left & Right flanking bottom) */}
        <GununganPosterWatermarks />

        {/* Golden Dust Motes / Stars */}
        <GoldenDustMotes />

        {/* Megamendung Clouds on Left and Right borders */}
        <div className="absolute top-24 sm:top-28 -left-3 pointer-events-none opacity-85">
          <AwanWayangSvg className="w-16 h-10 sm:w-20 sm:h-12" color="#D39F47" />
        </div>
        <div className="absolute top-32 sm:top-36 -right-3 pointer-events-none opacity-85">
          <AwanWayangSvg className="w-16 h-10 sm:w-20 sm:h-12" color="#D39F47" flip />
        </div>
        <div className="absolute bottom-28 -left-4 pointer-events-none opacity-50">
          <AwanWayangSvg className="w-14 h-9" color="#D39F47" />
        </div>

        {/* TOP BRANDING BAR: Redesigned authentic cultural header, removing @jawaepic */}
        <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#E5B260]/85 pt-1 border-b border-[#E5B260]/20 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B260]" />
            <span className="font-bold tracking-[0.25em]">NUSWARA</span>
          </div>
          <span className="text-[9px] tracking-[0.28em] text-[#C7A888]/75">
            ✦ PIWULANG LUHUR ✦
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#C7A888]/90">JAWA TENGAH</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B260]" />
          </div>
        </div>

        {/* HERO TITLE & DUAL BADGES */}
        <div className="relative z-10 pt-3 sm:pt-4">
          <div className="flex items-start justify-between gap-3">
            {/* Bold Display Headline: "Arjuna." */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-['Playfair_Display',serif] font-bold tracking-tight text-white drop-shadow-md leading-none">
                {displayTitle}
              </h1>
              {tagline && (
                <p className="text-[11px] sm:text-xs text-amber-200/90 font-serif italic mt-1.5 tracking-wide line-clamp-1">
                  &ldquo;{tagline}&rdquo;
                </p>
              )}
            </div>

            {/* Right Badge: Stacked 3 lines in bold serif caps */}
            <div className="text-right shrink-0 pt-0.5">
              <span className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm tracking-widest text-[#F5E5C9] block uppercase leading-tight">
                {rTop}
              </span>
              <span className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm tracking-widest text-[#F5E5C9] block uppercase leading-tight">
                {rMid}
              </span>
              <span className="font-['Playfair_Display',serif] font-bold text-xs sm:text-sm tracking-widest text-[#F5E5C9] block uppercase leading-tight">
                {rBot}
              </span>
            </div>
          </div>

          {/* Left Mid Badge: "07 November. 2025" or Weton */}
          <div className="mt-5 sm:mt-6 pl-0.5 font-['Playfair_Display',serif]">
            <span className="text-xs sm:text-sm font-bold text-amber-200 block leading-tight">
              {dPrimary}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white block leading-tight">
              {dSecondary}
            </span>
          </div>
        </div>

        {/* CENTERPIECE: HIGH-FIDELITY WAYANG TAROT CARD */}
        <div className="relative z-10 my-auto py-2 flex items-center justify-center">
          <div className="relative w-40 sm:w-48 aspect-[2/3] rounded-2xl overflow-hidden border border-[#C59B53]/50 shadow-[0_15px_35px_rgba(0,0,0,0.85)] bg-black transition-transform duration-300 hover:scale-[1.02]">
            <Image
              src={getTarotImagePath(normalizedSlug)}
              alt={displayTitle}
              fill
              sizes="(max-width: 640px) 160px, 192px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* BOTTOM SECTION: ELEGANT GEN Z EDITORIAL NARRATIVE */}
        <div className="relative z-10 space-y-1.5 pt-1">
          {secondaryQuote && (
            <p className="text-[11px] sm:text-xs font-['Playfair_Display',serif] italic text-amber-300 text-center leading-snug">
              &ldquo;{secondaryQuote}&rdquo;
            </p>
          )}

          {/* Centered punchy narrative paragraph */}
          <p className="text-xs sm:text-[13px] text-[#F3E5D4] text-center leading-relaxed font-sans max-w-sm mx-auto px-1">
            {description}
          </p>

          {modernInterpretation && (
            <p className="text-[10px] sm:text-[11px] text-amber-200/90 text-center font-sans tracking-wide pt-0.5 line-clamp-2">
              {modernInterpretation}
            </p>
          )}

          {/* Delicate bottom double border line */}
          <div className="flex items-center justify-center gap-2 pt-1.5 opacity-40">
            <div className="w-12 h-px bg-amber-400" />
            <div className="w-1.5 h-1.5 rotate-45 border border-amber-300" />
            <div className="w-12 h-px bg-amber-400" />
          </div>
        </div>
      </div>

      {/* ACTION BUTTON ROW: UNDUH KARTU, BAGIKAN, PELAJARI (High-Contrast & Micro-Icons) */}
      <div className="w-full mt-6 space-y-3">
        {/* Top Action Pair: Unduh & Bagikan */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 disabled:opacity-60 text-stone-950 font-black text-xs sm:text-sm rounded-xl shadow-lg border border-amber-300 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer group"
            title="Unduh Kartu Format 9:16 untuk IG Story / TikTok"
          >
            {isDownloading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-stone-950 stroke-[2.5]" />
                <span>Mengunduh...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-stone-950 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
                <span>Unduh Kartu 9:16</span>
              </>
            )}
          </button>

          {onShareCopy && (
            <button
              onClick={onShareCopy}
              className="flex-1 py-3 px-4 bg-stone-900 hover:bg-black text-stone-50 hover:text-amber-300 border-2 border-stone-800 hover:border-amber-400/80 font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span className="text-emerald-300 font-bold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-400 stroke-[2.5]" />
                  <span>Bagikan Kartu</span>
                  <span className="text-[11px] font-mono text-amber-400">↗</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Primary Dominant CTA: Pelajari Senjata & Pusaka Tokohmu */}
        {ctaUrl && (
          <Link
            href={ctaUrl}
            className="w-full py-3.5 px-5 bg-stone-950 hover:bg-black text-white hover:text-amber-200 font-black text-xs sm:text-sm rounded-xl border-2 border-stone-800 hover:border-amber-400 shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-101 active:scale-99 group"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-amber-400 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default WayangPosterCard;

