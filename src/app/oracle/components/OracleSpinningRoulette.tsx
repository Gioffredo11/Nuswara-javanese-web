'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
import {
  GununganSvg,
  WayangFigureBySlug,
  BatikKawungPatternSvg,
} from '@/components/ui/WayangVectors';
import { ALL_ARCHETYPES, TeaserCardItem } from './OracleTeaserCards';

interface OracleSpinningRouletteProps {
  matchedSlug: string;
  characterName: string;
  visitorName: string;
  wetonName?: string;
  totalNeptu?: number;
  isReady?: boolean;
  onSpinComplete: () => void;
}

const SPIN_PHRASES = [
  'MEMUTAR CAKRA WAYANG PURWA...',
  'MENYELARASKAN WETON & PASARAN JAWA...',
  'MENGHITUNG NEPTU KELAHIRAN...',
  'MENGENAL RESONANSI BATIN LELUHUR...',
  'MENGUNCI TAKDIR SATRIA...',
];

export function OracleSpinningRoulette({
  matchedSlug,
  characterName,
  visitorName,
  wetonName,
  totalNeptu,
  isReady = true,
  onSpinComplete,
}: OracleSpinningRouletteProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(75);
  const [rotationDegree, setRotationDegree] = useState(0);

  const isReadyRef = useRef(isReady);
  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  // Matched target item from ALL_ARCHETYPES or fallback
  const matchedItem: TeaserCardItem = ALL_ARCHETYPES.find(
    (a) => a.slug === matchedSlug.toLowerCase().trim()
  ) || {
    id: matchedSlug,
    slug: matchedSlug,
    mysteryTitle: 'Ksatria Sejati',
    archetypeLabel: 'Resonansi Leluhur',
    characterName: characterName || 'Ksatria Wayang',
    quote: 'Energi batin ksatria purwa yang mengalir dalam garis takdirmu.',
  };

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let speed = 70;
    let stepCount = 0;
    const minSteps = 16;
    let decelerationStarted = false;
    let decelSteps = 0;

    // Rotate status phrase every 400ms
    const phraseInterval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % SPIN_PHRASES.length);
    }, 400);

    function spinStep() {
      stepCount++;
      setRotationDegree((prev) => prev + 180);

      // Check if ready to decelerate
      if (stepCount >= minSteps && isReadyRef.current) {
        decelerationStarted = true;
      }

      if (decelerationStarted) {
        decelSteps++;
        speed += 45 + decelSteps * 15; // smooth mechanical braking

        if (decelSteps >= 7) {
          // LOCK ON FINAL MATCHED TARGET!
          setIsLocked(true);
          clearInterval(phraseInterval);

          setTimeout(() => {
            onSpinComplete();
          }, 950);
          return;
        }
      }

      setSpinSpeed(speed);
      setCurrentIndex((prev) => (prev + 1) % ALL_ARCHETYPES.length);

      timerRef.current = setTimeout(spinStep, speed);
    }

    timerRef.current = setTimeout(spinStep, speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearInterval(phraseInterval);
    };
  }, [matchedSlug, onSpinComplete]);

  // The active displayed item during spin vs locked state
  const activeItem = isLocked ? matchedItem : ALL_ARCHETYPES[currentIndex];

  // Previous and next items for 3D carousel peripheral vision
  const prevItem =
    ALL_ARCHETYPES[(currentIndex - 1 + ALL_ARCHETYPES.length) % ALL_ARCHETYPES.length];
  const nextItem = ALL_ARCHETYPES[(currentIndex + 1) % ALL_ARCHETYPES.length];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center py-6 px-4 select-none animate-in fade-in duration-300">
      {/* Mystical Stage Halo & Pulsing Runic Ring */}
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Ambient Cosmic Radial Aura */}
        <div className="absolute inset-0 bg-radial from-amber-500/25 via-amber-950/15 to-transparent blur-3xl pointer-events-none" />

        {/* Top Sacred Spinning Indicator Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 border border-amber-400/60 shadow-lg text-xs font-mono tracking-widest uppercase text-amber-200 mb-6">
          <Compass className={`w-3.5 h-3.5 text-amber-400 ${!isLocked ? 'animate-spin' : ''}`} />
          <span>{isLocked ? 'TAKDIR TERKUNCI' : SPIN_PHRASES[phaseIndex]}</span>
        </div>

        {/* -------------------------------------------------------------
            3D SPINNING CAROUSEL STAGE (Roulette of Tarot Cards)
            ------------------------------------------------------------- */}
        <div className="relative w-full h-80 sm:h-96 flex items-center justify-center perspective-1200 overflow-visible my-2">
          {/* Peripheral Left Card (Angled in 3D) */}
          <div
            className={`hidden sm:block absolute left-2 w-44 h-64 rounded-2xl bg-gradient-to-b from-[#251006] to-[#120501] border border-amber-600/30 p-3 opacity-30 blur-[1px] transition-all duration-300 pointer-events-none ${
              isLocked ? 'opacity-15 -translate-x-4' : ''
            }`}
            style={{
              transform: 'translate3d(0, 0, -80px) rotateY(32deg)',
            }}
          >
            <div className="h-full flex flex-col items-center justify-center">
              <WayangFigureBySlug slug={prevItem.slug} className="h-32 w-auto opacity-50" />
              <span className="text-[10px] font-serif text-amber-200/50 mt-2 truncate w-full text-center">
                {prevItem.mysteryTitle}
              </span>
            </div>
          </div>

          {/* Peripheral Right Card (Angled in 3D) */}
          <div
            className={`hidden sm:block absolute right-2 w-44 h-64 rounded-2xl bg-gradient-to-b from-[#251006] to-[#120501] border border-amber-600/30 p-3 opacity-30 blur-[1px] transition-all duration-300 pointer-events-none ${
              isLocked ? 'opacity-15 translate-x-4' : ''
            }`}
            style={{
              transform: 'translate3d(0, 0, -80px) rotateY(-32deg)',
            }}
          >
            <div className="h-full flex flex-col items-center justify-center">
              <WayangFigureBySlug slug={nextItem.slug} className="h-32 w-auto opacity-50" />
              <span className="text-[10px] font-serif text-amber-200/50 mt-2 truncate w-full text-center">
                {nextItem.mysteryTitle}
              </span>
            </div>
          </div>

          {/* -----------------------------------------------------------
              THE ACTIVE CENTER SPINNING CARD (Rotating Y-Axis)
              ----------------------------------------------------------- */}
          <div
            className={`relative z-20 w-56 sm:w-64 h-80 sm:h-92 rounded-2xl bg-gradient-to-b from-[#2E1408] via-[#1E0B04] to-[#110502] border-2 shadow-2xl p-4 flex flex-col justify-between overflow-hidden card-preserve-3d transition-all duration-200 ${
              isLocked
                ? 'border-amber-300 ring-4 ring-amber-400/60 shadow-[0_0_60px_rgba(251,191,36,0.7)] scale-105'
                : 'border-amber-500/70 shadow-amber-950/80 hover:border-amber-400'
            }`}
            style={{
              transform: isLocked
                ? 'translate3d(0, 0, 40px) rotateY(0deg) scale(1.05)'
                : `perspective(1000px) rotateY(${rotationDegree}deg)`,
              transition: isLocked
                ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease-out'
                : 'transform 0.1s linear',
            }}
          >
            {/* Background Parang Batik watermark */}
            <div className="absolute inset-0 opacity-15 bg-repeat pointer-events-none">
              <BatikKawungPatternSvg className="w-full h-full text-amber-400" />
            </div>

            {/* Glowing Aura inside Card */}
            <div
              className={`absolute inset-0 bg-radial from-amber-500/30 via-transparent to-transparent pointer-events-none transition-opacity ${
                isLocked ? 'opacity-100 animate-pulse' : 'opacity-40'
              }`}
            />

            {/* Top Bar of Rotating Card */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-amber-300 uppercase border-b border-amber-500/30 pb-1.5">
              <span className="flex items-center gap-1 font-royal">
                <Sparkles className="w-3 h-3 text-amber-400" />
                ORACLE
              </span>
              <span>{isLocked ? 'TERPILIH' : 'MEMUTAR...'}</span>
            </div>

            {/* Center: Character Silhouette with dynamic glow */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-1 py-1">
              <div
                className={`filter transition-all duration-200 ${
                  isLocked
                    ? 'drop-shadow-[0_0_24px_rgba(251,191,36,0.95)] scale-110'
                    : 'drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-95'
                }`}
              >
                <WayangFigureBySlug
                  slug={activeItem.slug}
                  className="h-36 sm:h-44 w-auto object-contain"
                />
              </div>

              {/* Character Title & Archetype */}
              <div className="mt-2 text-center w-full space-y-0.5">
                <span className="font-serif text-sm sm:text-base font-bold text-amber-100 block truncate drop-shadow-xs">
                  {isLocked ? activeItem.characterName : activeItem.mysteryTitle}
                </span>
                <span className="text-[11px] font-sans font-semibold text-amber-300 block uppercase tracking-wider">
                  {activeItem.archetypeLabel}
                </span>
              </div>
            </div>

            {/* Bottom Footer of Card */}
            <div className="relative z-10 text-center pt-2 border-t border-amber-500/30 bg-black/20 rounded-b-xl">
              <span className="text-[10px] font-mono text-amber-200/80 block truncate">
                {isLocked ? `Weton: ${wetonName || 'Takdir Selaras'}` : `Mencari Resonansi...`}
              </span>
            </div>
          </div>
        </div>

        {/* Status Text & Information */}
        <div className="mt-4 text-center space-y-1.5 max-w-sm mx-auto">
          <p className="text-sm font-serif font-bold text-amber-100">
            {isLocked ? (
              <span className="flex items-center justify-center gap-2 text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Takdir Jiwa Terkuak untuk {visitorName}!</span>
              </span>
            ) : (
              <span>Roda Cakra Takdir Sedang Berputar Cepat...</span>
            )}
          </p>
          <p className="text-xs text-amber-200/70 font-sans">
            {isLocked
              ? `Karakter ${activeItem.characterName} terpilih menjadi pelindung & cerminan jiwamu.`
              : 'Menelusuri 11 arketipe wayang purwa berdasarkan pasaran dan neptu kelahiranmu.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OracleSpinningRoulette;
