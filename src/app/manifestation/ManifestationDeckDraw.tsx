'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Layers, RefreshCw, Shuffle, Flame } from 'lucide-react';
import Image from 'next/image';
import {
  GununganSvg,
  BatikKawungPatternSvg,
  getTarotImagePath,
} from '@/components/ui/WayangVectors';
import {
  playCardShuffleSound,
  playCardDrawSound,
  playCardRevealSound,
} from '@/lib/audio/sacredSounds';

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
  
  // Ceremonial entrance deck stage: 'fanning' | 'snapping' | 'ready'
  const [deckIntro, setDeckIntro] = useState<'fanning' | 'snapping' | 'ready'>('fanning');
  
  // Interactive 3D Cursor Tilt (-1 to 1)
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [shockwave, setShockwave] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Initial Deal Sequence on Mount / Modal Open
  useEffect(() => {
    // Stage 1: Fan out cards with shuffle flutter sound
    playCardShuffleSound();
    setDeckIntro('fanning');

    // Stage 2: Snap together into neat deck
    const snapTimer = setTimeout(() => {
      setDeckIntro('snapping');
    }, 650);

    // Stage 3: Ready for interaction with gold foil shimmer
    const readyTimer = setTimeout(() => {
      setDeckIntro('ready');
    }, 1050);

    return () => {
      clearTimeout(snapTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  // Manual Deck Shuffle Trigger
  const handleShuffleDeck = () => {
    if (drawing || animStep !== 'idle') return;
    playCardShuffleSound();
    setDeckIntro('fanning');
    setTimeout(() => setDeckIntro('snapping'), 550);
    setTimeout(() => setDeckIntro('ready'), 900);
  };

  // Mouse Move Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (animStep !== 'idle' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: Math.max(-0.5, Math.min(0.5, x)), y: Math.max(-0.5, Math.min(0.5, y)) });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Start Card Draw Ceremony
  async function handleStartDraw() {
    if (drawing || animStep !== 'idle') return;

    // Trigger golden shockwave ripple & sound
    setShockwave(true);
    playCardDrawSound();

    // Phase 1: Pull card out of deck (Poker slide pull)
    setAnimStep('pulling');

    // Trigger API call
    const drawPromise = onDraw();

    // After 700ms (card has pulled out of deck), begin floating & 3D flip
    setTimeout(async () => {
      await drawPromise;
      setAnimStep('flipping');
      playCardRevealSound();

      // After 850ms (3D flip completes), transition to full reveal
      setTimeout(() => {
        setAnimStep('done');
        onRevealComplete?.();
      }, 850);
    }, 700);
  }

  // Floating background prana embers
  const floatingMotes = [
    { left: '12%', delay: '0s', duration: '3.4s', size: 'w-1.5 h-1.5' },
    { left: '26%', delay: '1.2s', duration: '4.1s', size: 'w-2 h-2' },
    { left: '42%', delay: '0.5s', duration: '3.8s', size: 'w-1 h-1' },
    { left: '60%', delay: '1.8s', duration: '4.5s', size: 'w-2.5 h-2.5' },
    { left: '74%', delay: '0.9s', duration: '3.6s', size: 'w-1.5 h-1.5' },
    { left: '88%', delay: '2.1s', duration: '3.9s', size: 'w-2 h-2' },
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none relative">
      {/* Floating Prana Golden Embers (Atmospheric Particle Field) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {floatingMotes.map((mote, i) => (
          <div
            key={i}
            className={`absolute bottom-6 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] animate-float-dust ${mote.size}`}
            style={{
              left: mote.left,
              animationDelay: mote.delay,
              animationDuration: mote.duration,
            }}
          />
        ))}
      </div>

      {/* Table Spotlight & Deck Container */}
      <div className="relative w-full aspect-[3/4] max-w-[320px] sm:max-w-[350px] flex items-center justify-center py-6 perspective-1200 z-10">
        {/* Ambient Warm Candlelight Table Glow */}
        <div className="absolute inset-0 bg-radial from-amber-500/25 via-amber-950/15 to-transparent blur-3xl pointer-events-none animate-pulse" />

        {/* Golden Shockwave Expanding Ring on Card Draw */}
        {shockwave && (
          <div className="absolute w-[240px] h-[340px] rounded-3xl border-2 border-amber-400 pointer-events-none animate-golden-shockwave z-25" />
        )}

        {/* -------------------------------------------------------------
            TUMPUKAN KARTU (Stacked Poker Deck with Entrance Fan-Out)
            ------------------------------------------------------------- */}

        {/* Layer 4: Deepest Card in Stack */}
        <div
          className="absolute w-[240px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-2xl bg-[#140D07] border border-amber-900/40 shadow-xl pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform:
              deckIntro === 'fanning'
                ? 'translate3d(-26px, 12px, -40px) rotate(-13deg)'
                : 'translate3d(-6px, 10px, -30px) rotate(-5.5deg)',
          }}
        />

        {/* Layer 3: Middle-Bottom Card */}
        <div
          className="absolute w-[240px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-2xl bg-[#1A1009] border border-amber-900/60 shadow-xl pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform:
              deckIntro === 'fanning'
                ? 'translate3d(26px, 8px, -25px) rotate(11deg)'
                : 'translate3d(5px, 7px, -20px) rotate(4deg)',
          }}
        />

        {/* Layer 2: Card Directly Under Top */}
        <div
          className="absolute w-[240px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-2xl bg-[#22140C] border border-amber-800/60 shadow-2xl pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform:
              deckIntro === 'fanning'
                ? 'translate3d(-10px, -4px, -15px) rotate(-4.5deg)'
                : 'translate3d(-2px, 3px, -10px) rotate(-1.5deg)',
          }}
        >
          {/* Subtle Batik on underlying cards */}
          <div className="absolute inset-0 opacity-15 bg-repeat rounded-2xl pointer-events-none">
            <BatikKawungPatternSvg className="w-full h-full text-amber-500" />
          </div>
        </div>

        {/* -------------------------------------------------------------
            TOP CARD: THE DRAWN POKER CARD (Interactive, 3D Tilt & Animated)
            ------------------------------------------------------------- */}
        <div
          ref={cardRef}
          onClick={handleStartDraw}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleStartDraw();
            }
          }}
          className={`relative w-[240px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-2xl cursor-pointer card-preserve-3d transition-shadow duration-300 ${
            animStep === 'pulling' ? 'animate-poker-pull z-30' : ''
          } ${animStep === 'flipping' ? 'animate-poker-flip z-30 shadow-[0_0_50px_rgba(251,191,36,0.6)]' : ''} ${
            animStep === 'idle' ? 'z-20' : ''
          }`}
          style={{
            transform:
              animStep === 'idle'
                ? deckIntro === 'fanning'
                  ? 'translate3d(0, -16px, 20px) rotate(0deg) scale(1.03)'
                  : isHovered
                  ? `perspective(1000px) rotateX(${tilt.y * -20}deg) rotateY(${tilt.x * 20}deg) translate3d(0, -12px, 25px) scale(1.03)`
                  : 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
                : undefined,
            transition:
              animStep === 'idle' && deckIntro !== 'fanning'
                ? isHovered
                  ? 'transform 0.12s ease-out'
                  : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                : 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {/* =========================================================
              CARD BACK FACE (Classic Poker Card Back • Royal Javanese)
              ========================================================= */}
          <div
            className={`absolute inset-0 card-backface-hidden rounded-2xl bg-gradient-to-b from-[#2E160A] via-[#1F0E05] to-[#120702] border-2 border-amber-600/70 p-4 shadow-2xl flex flex-col justify-between overflow-hidden group select-none transition-all duration-300 ${
              isHovered && animStep === 'idle'
                ? 'border-amber-400 shadow-[0_15px_45px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/50'
                : ''
            }`}
          >
            {/* Diagonal Gold Foil Shimmer Sweep */}
            {deckIntro === 'ready' && animStep === 'idle' && (
              <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-amber-200/25 to-transparent pointer-events-none animate-gold-foil" />
            )}

            {/* Dynamic Specular Light Glare (Follows Cursor Tilt) */}
            {isHovered && animStep === 'idle' && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle at ${(tilt.x + 0.5) * 100}% ${
                    (tilt.y + 0.5) * 100
                  }%, rgba(251, 191, 36, 0.35) 0%, rgba(217, 119, 6, 0.12) 40%, transparent 70%)`,
                }}
              />
            )}

            {/* Intricate Gold Inset Border */}
            <div className="absolute inset-1.5 rounded-xl border border-amber-400/40 pointer-events-none" />
            <div className="absolute inset-2.5 rounded-lg border border-amber-500/20 pointer-events-none" />

            {/* Traditional Corner Pips (Like Poker Aces / Court Cards) */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-mono font-bold text-amber-300 leading-none">A</span>
                <span className="text-[10px] text-amber-400 leading-none mt-0.5">♠</span>
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-[9px] font-mono uppercase tracking-widest text-amber-300 font-semibold shadow-xs flex items-center gap-1">
                <Flame className="w-2.5 h-2.5 text-amber-400" />
                <span>PIWULANG LUHUR</span>
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

            {/* Center Sacred Emblem (Gunungan) with Golden Breath Aura */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
              <div className="relative">
                <div className="absolute -inset-3 bg-amber-500/30 rounded-full blur-xl pointer-events-none animate-pulse" />
                <GununganSvg
                  className={`w-20 h-28 text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-transform duration-300 ${
                    isHovered ? 'scale-110 drop-shadow-[0_0_25px_rgba(251,191,36,0.85)]' : ''
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
              <span className="text-[11px] font-sans text-amber-300/95 flex items-center justify-center gap-1.5 font-medium">
                {animStep === 'pulling' ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                    <span>Menarik dari tumpukan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-amber-400 animate-bounce" />
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
            {/* Rotating Sunburst Halo in Background */}
            <div className="absolute inset-0 bg-radial from-amber-400/40 via-amber-500/10 to-transparent pointer-events-none animate-pulse" />
            <div className="absolute -inset-20 bg-[conic-gradient(from_0deg,transparent_0_30deg,rgba(251,191,36,0.12)_45deg,transparent_60deg)] pointer-events-none animate-sunburst-rotate opacity-75" />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono font-bold text-amber-300 border-b border-amber-500/30 pb-1">
              <span>HARI INI</span>
              <span className="bg-amber-400/25 px-2 py-0.5 rounded-full border border-amber-400/40 text-amber-200">
                TERBUKA
              </span>
            </div>

            {/* Character Silhouette / Figure */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-1 py-1">
              <div className="relative w-28 sm:w-32 aspect-[2/3] rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.7)] bg-black">
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

      {/* Decorative Interactive Controls Under Deck */}
      <div className="mt-4 text-center space-y-3.5 z-10 w-full max-w-sm">
        <p className="text-xs text-amber-200/70 italic font-serif flex items-center justify-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Tarik 1 kartu teratas dari tumpukan untuk menerima panduan hari ini</span>
        </p>

        {/* Action Buttons: Shuffle & Draw */}
        <div className="flex items-center justify-center gap-2.5">
          {/* Kocok Kartu (Shuffle Deck) Button */}
          <button
            type="button"
            onClick={handleShuffleDeck}
            disabled={drawing || animStep !== 'idle'}
            className="px-4 py-3 bg-[#1A110B] hover:bg-[#281A10] disabled:opacity-50 text-amber-300/90 hover:text-amber-200 text-xs font-mono uppercase tracking-wider rounded-xl transition-all border border-amber-500/30 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
            title="Kocok Tumpukan Kartu"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Kocok Kartu</span>
          </button>

          {/* Primary Draw Button */}
          <button
            type="button"
            onClick={handleStartDraw}
            disabled={drawing || animStep !== 'idle'}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 text-[#120702] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2 cursor-pointer border border-amber-300/50 active:scale-95"
          >
            {animStep === 'pulling' || animStep === 'flipping' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#120702]" />
                <span>Menarik Kartu...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#120702] animate-pulse" />
                <span>Tarik Kartu dari Tumpukan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManifestationDeckDraw;
