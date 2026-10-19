'use client';

import React, { useState } from 'react';
import { Sparkles, Layers, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import {
  GununganSvg,
  BatikKawungPatternSvg,
  getTarotImagePath,
} from '@/components/ui/WayangVectors';

interface ManifestationDeckDrawProps {
  onDraw: () => Promise<boolean | void>;
  drawing: boolean;
  drawnPhilosophyTitle?: string;
  drawnCharacterSlug?: string;
  drawnCharacterName?: string;
  drawnJavaneseQuote?: string;
  onRevealComplete?: () => void;
}

export function ManifestationDeckDraw({
  onDraw,
  drawing,
  drawnPhilosophyTitle,
  drawnCharacterSlug,
  drawnCharacterName,
  drawnJavaneseQuote,
  onRevealComplete,
}: ManifestationDeckDrawProps) {
  // Animation state: 'idle' | 'pulling' | 'flipping' | 'done'
  const [animStep, setAnimStep] = useState<'idle' | 'pulling' | 'flipping' | 'done'>('idle');
  const [isHovered, setIsHovered] = useState(false);

  async function handleStartDraw() {
    if (drawing || animStep !== 'idle') return;

    // Phase 1: Pull card out of deck (Poker slide pull)
    setAnimStep('pulling');

    // Trigger API call
    const drawPromise = onDraw();

    // After 700ms (card has pulled out of deck), begin floating & 3D flip
    setTimeout(async () => {
      await drawPromise;
      setAnimStep('flipping');

      // After 850ms (3D flip completes), transition to full reveal
      setTimeout(() => {
        setAnimStep('done');
        onRevealComplete?.();
      }, 850);
    }, 700);
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none">
      {/* Table Spotlight & Deck Container */}
      <div className="relative w-full aspect-[3/4] max-w-[320px] sm:max-w-[350px] flex items-center justify-center py-6 perspective-1200">
        {/* Ambient Warm Candlelight Table Glow */}
        <div className="absolute inset-0 bg-radial from-amber-500/20 via-amber-950/10 to-transparent blur-2xl pointer-events-none" />

        {/* -------------------------------------------------------------
            TUMPUKAN KARTU (Stacked Poker Deck Base Layers)
            ------------------------------------------------------------- */}
        {/* Layer 4: Deepest Card in Stack */}
        <div
          className="absolute w-[240px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-2xl bg-[#140D07] border border-amber-900/40 shadow-xl pointer-events-none"
          style={{
            transform: 'translate3d(-6px, 10px, -30px) rotate(-5.5deg)',
          }}
        />

        {/* Layer 3: Middle-Bottom Card */}
        <div
          className="absolute w-[240px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-2xl bg-[#1A1009] border border-amber-900/60 shadow-xl pointer-events-none"
          style={{
            transform: 'translate3d(5px, 7px, -20px) rotate(4deg)',
          }}
        />

        {/* Layer 2: Card Directly Under Top */}
        <div
          className="absolute w-[240px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-2xl bg-[#22140C] border border-amber-800/60 shadow-2xl pointer-events-none"
          style={{
            transform: 'translate3d(-2px, 3px, -10px) rotate(-1.5deg)',
          }}
        >
          {/* Subtle Batik on underlying cards */}
          <div className="absolute inset-0 opacity-15 bg-repeat rounded-2xl pointer-events-none">
            <BatikKawungPatternSvg className="w-full h-full text-amber-500" />
          </div>
        </div>

        {/* -------------------------------------------------------------
            TOP CARD: THE DRAWN POKER CARD (Interactive & Animated)
            ------------------------------------------------------------- */}
        <div
          onClick={handleStartDraw}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleStartDraw();
            }
          }}
          className={`relative w-[240px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-2xl cursor-pointer card-preserve-3d transition-shadow duration-300 ${
            animStep === 'pulling' ? 'animate-poker-pull z-30' : ''
          } ${animStep === 'flipping' ? 'animate-poker-flip z-30 shadow-2xl' : ''} ${
            animStep === 'idle' ? 'z-20' : ''
          }`}
          style={{
            transform:
              animStep === 'idle'
                ? isHovered
                  ? 'translate3d(0, -14px, 15px) rotate(1deg) scale(1.02)'
                  : 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
                : undefined,
            transition: animStep === 'idle' ? 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)' : undefined,
          }}
        >
          {/* =========================================================
              CARD BACK FACE (Classic Poker Card Back • Royal Javanese)
              ========================================================= */}
          <div
            className={`absolute inset-0 card-backface-hidden rounded-2xl bg-gradient-to-b from-[#2E160A] via-[#1F0E05] to-[#120702] border-2 border-amber-600/70 p-4 shadow-2xl flex flex-col justify-between overflow-hidden group select-none transition-all duration-300 ${
              isHovered && animStep === 'idle' ? 'border-amber-400 shadow-amber-900/40' : ''
            }`}
          >
            {/* Intricate Gold Inset Border */}
            <div className="absolute inset-1.5 rounded-xl border border-amber-400/40 pointer-events-none" />
            <div className="absolute inset-2.5 rounded-lg border border-amber-500/20 pointer-events-none" />

            {/* Traditional Corner Pips (Like Poker Aces / Court Cards) */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-mono font-bold text-amber-300 leading-none">A</span>
                <span className="text-[10px] text-amber-400 leading-none mt-0.5">♠</span>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-[9px] font-mono uppercase tracking-widest text-amber-300 font-semibold">
                PIWULANG LUHUR
              </div>
              <div className="flex flex-col items-center rotate-180">
                <span className="text-[11px] font-mono font-bold text-amber-300 leading-none">A</span>
                <span className="text-[10px] text-amber-400 leading-none mt-0.5">♠</span>
              </div>
            </div>

            {/* Repeating Watermark Motif */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
              <BatikKawungPatternSvg className="w-48 h-48 text-amber-400" />
            </div>

            {/* Center Sacred Emblem (Gunungan) */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl pointer-events-none animate-pulse" />
                <GununganSvg
                  className={`w-20 h-28 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}
                  color="#FBBF24"
                />
              </div>

              <span className="mt-2 text-[10px] font-royal uppercase tracking-[0.25em] text-amber-200/90 font-bold text-center block">
                NUSWARA
              </span>
            </div>

            {/* Bottom Call to Action / Hints */}
            <div className="relative z-10 text-center pt-1 border-t border-amber-500/25">
              <span className="text-[11px] font-sans text-amber-300/90 flex items-center justify-center gap-1.5 font-medium">
                {animStep === 'pulling' ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                    <span>Menarik dari tumpukan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Klik / Sentuh untuk Menarik</span>
                  </>
                )}
              </span>
            </div>

            {/* Bottom Inverted Pips */}
            <div className="relative z-10 flex items-center justify-between pt-0.5">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-amber-400 leading-none">♠</span>
                <span className="text-[11px] font-mono font-bold text-amber-300 leading-none">A</span>
              </div>
              <span className="text-[8px] font-mono tracking-widest text-amber-400/60 uppercase">
                EDISI HARIAN
              </span>
              <div className="flex flex-col items-center rotate-180">
                <span className="text-[10px] text-amber-400 leading-none">♠</span>
                <span className="text-[11px] font-mono font-bold text-amber-300 leading-none">A</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              CARD FRONT FACE (Revealed Face shown during 3D Flip)
              ========================================================= */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              WebkitTransform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 card-backface-hidden rounded-2xl bg-gradient-to-b from-[#381B0D] via-[#240F06] to-[#120602] border-2 border-amber-400 p-4 shadow-2xl flex flex-col justify-between overflow-hidden select-none"
          >
            {/* Glowing Golden Aura Flash */}
            <div className="absolute inset-0 bg-radial from-amber-400/30 via-transparent to-transparent pointer-events-none animate-pulse" />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono font-bold text-amber-300 border-b border-amber-500/30 pb-1">
              <span>HARI INI</span>
              <span className="bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                TERBUKA
              </span>
            </div>

            {/* Character Silhouette / Figure */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-1 py-1">
              <div className="relative w-28 sm:w-32 aspect-[2/3] rounded-xl overflow-hidden border border-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.6)] bg-black">
                <Image
                  src={getTarotImagePath(drawnCharacterSlug || 'petruk')}
                  alt={drawnCharacterName || 'Wayang'}
                  fill
                  sizes="(max-width: 640px) 112px, 128px"
                  className="object-cover"
                  priority
                />
              </div>

              <h4 className="font-editorial text-base sm:text-lg font-bold text-amber-100 text-center mt-2 truncate w-full">
                {drawnPhilosophyTitle || 'Piwulang Rahayu'}
              </h4>

              {drawnJavaneseQuote && (
                <p className="text-[10px] sm:text-[11px] font-editorial italic text-amber-300/90 text-center line-clamp-2 px-2 mt-0.5">
                  &ldquo;{drawnJavaneseQuote}&rdquo;
                </p>
              )}
            </div>

            {/* Bottom Status */}
            <div className="relative z-10 text-center pt-1 border-t border-amber-400/30">
              <span className="text-[10px] font-mono text-amber-200 uppercase tracking-wider block">
                {drawnCharacterName || 'Peneladan Nilai'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Instruction Under Deck */}
      <div className="mt-4 text-center space-y-3">
        <p className="text-xs text-amber-200/70 italic font-serif flex items-center justify-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Tarik 1 kartu teratas dari tumpukan untuk menerima panduan hari ini</span>
        </p>

        {/* Primary Draw Button */}
        <button
          type="button"
          onClick={handleStartDraw}
          disabled={drawing || animStep !== 'idle'}
          className="px-8 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 disabled:opacity-50 text-[#120702] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl hover:shadow-amber-500/20 flex items-center justify-center gap-2 mx-auto cursor-pointer border border-amber-300/40 active:scale-95"
        >
          {animStep === 'pulling' || animStep === 'flipping' ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-[#120702]" />
              <span>Menarik Kartu...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#120702]" />
              <span>Tarik Kartu dari Tumpukan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ManifestationDeckDraw;
