'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Shuffle } from 'lucide-react';
import { WayangFigureBySlug } from '@/components/ui/WayangVectors';

export interface TeaserCardItem {
  id: string;
  slug: string;
  mysteryTitle: string;
  archetypeLabel: string;
  characterName: string;
  quote: string;
  isSecretReveal?: boolean;
}

export const ALL_ARCHETYPES: TeaserCardItem[] = [
  {
    id: 'gatotkaca',
    slug: 'gatotkaca',
    mysteryTitle: 'Pelindung Langit?',
    archetypeLabel: 'Tangguh & Loyal',
    characterName: 'Raden Gatotkaca',
    quote: 'Otot kawat balung wesi, pahlawan angkasa pelindung negeri.',
  },
  {
    id: 'arjuna',
    slug: 'arjuna',
    mysteryTitle: 'Pemanah Sejati?',
    archetypeLabel: 'Fokus & Karismatik',
    characterName: 'Raden Arjuna',
    quote: 'Ksatria panah pasopati, hening dalam budi pekerti.',
  },
  {
    id: 'srikandi',
    slug: 'srikandi',
    mysteryTitle: 'Pahlawan Berani?',
    archetypeLabel: 'Sat-Set & Fearless',
    characterName: 'Dewi Srikandi',
    quote: 'Prajurit agung tanpa gentar, pendobrak batas medan laga.',
  },
  {
    id: 'bima',
    slug: 'bima',
    mysteryTitle: 'Benteng Samudra?',
    archetypeLabel: 'Lugas & Perkasa',
    characterName: 'Bima Werkudara',
    quote: 'Anti basa-basi, pantang mundur menegakkan dharma dan kebenaran.',
  },
  {
    id: 'yudhistira',
    slug: 'yudhistira',
    mysteryTitle: 'Raja Welas Asih?',
    archetypeLabel: 'Sabar & Ikhlas',
    characterName: 'Prabu Puntadewa',
    quote: 'Berdarah putih, suci hati, mendamaikan jagad tanpa dendam.',
  },
  {
    id: 'semar',
    slug: 'semar',
    mysteryTitle: 'Sang Pamomong?',
    archetypeLabel: 'Bijak & Rendah Hati',
    characterName: 'Kyai Lurah Semar',
    quote: 'Dewa yang membumi, mengayomi batin rakyat jelata dengan tulus.',
  },
  {
    id: 'petruk',
    slug: 'petruk',
    mysteryTitle: 'Pencair Suasana?',
    archetypeLabel: 'Humor & Dermawan',
    characterName: 'Petruk Kanthong Bolong',
    quote: 'Cerdas bertutur kata, dermawan tanpa mengharap pamrih.',
  },
  {
    id: 'sadewa',
    slug: 'sadewa',
    mysteryTitle: 'Visioner Batin?',
    archetypeLabel: 'Intuitif & Visioner',
    characterName: 'Raden Sadewa',
    quote: 'Melihat masa depan lewat kejernihan batin dan ketenangan.',
  },
  {
    id: 'nakula',
    slug: 'nakula',
    mysteryTitle: 'Ahli Taktik?',
    archetypeLabel: 'Cermat & Pengamat',
    characterName: 'Raden Nakula',
    quote: 'Pengamat jeli, menjaga keutuhan pertahanan tanpa banyak bicara.',
  },
  {
    id: 'karna',
    slug: 'karna',
    mysteryTitle: 'Ksatria Surya?',
    archetypeLabel: 'Setia & Dermawan',
    characterName: 'Adipati Karna',
    quote: 'Totalitas membela kehormatan dan persahabatan sampai akhir hayat.',
  },
  {
    id: 'bagong',
    slug: 'bagong',
    mysteryTitle: 'Suara Nurani?',
    archetypeLabel: 'Kritis & Jujur',
    characterName: 'Kyai Bagong Bawor',
    quote: 'Berani bicara jujur apa adanya di hadapan siapa pun.',
  },
  {
    id: 'gareng',
    slug: 'gareng',
    mysteryTitle: 'Langkah Mawas?',
    archetypeLabel: 'Waspada & Bersahaja',
    characterName: 'Nala Gareng',
    quote: 'Melangkah penuh kehati-hatian agar tak ceroboh di dunia fana.',
  },
];

function getArchetypeData(slug: string): TeaserCardItem {
  const norm = slug.toLowerCase().trim();
  const found = ALL_ARCHETYPES.find((a) => a.slug === norm);
  if (found) return found;
  return {
    id: norm,
    slug: norm,
    mysteryTitle: 'Ksatria Misterius?',
    archetypeLabel: 'Resonansi Leluhur',
    characterName: norm.charAt(0).toUpperCase() + norm.slice(1),
    quote: 'Jiwa ksatria purwa yang mengalir dalam garis takdir wetonmu.',
  };
}

function getRandomThreeArchetypes(excludeSlugs: string[] = []): TeaserCardItem[] {
  const available = ALL_ARCHETYPES.filter((a) => !excludeSlugs.includes(a.slug));
  const pool = available.length >= 3 ? available : ALL_ARCHETYPES;
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

interface OracleTeaserCardsProps {
  matchedSlug?: string | null;
  characterName?: string;
  isRevealing?: boolean;
  onCardClick?: (slug: string) => void;
}

export function OracleTeaserCards({
  matchedSlug = null,
  characterName,
  isRevealing = false,
  onCardClick,
}: OracleTeaserCardsProps) {
  // Initial 3 cards (deterministic default for SSR hydration safety)
  const [displayedCards, setDisplayedCards] = useState<TeaserCardItem[]>([
    ALL_ARCHETYPES[0], // Gatotkaca
    ALL_ARCHETYPES[1], // Arjuna
    ALL_ARCHETYPES[2], // Srikandi
  ]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [activeFlippedSlug, setActiveFlippedSlug] = useState<string | null>(null);

  // Randomize cards once on mount in client to show diverse archetypes immediately
  useEffect(() => {
    setDisplayedCards(getRandomThreeArchetypes());
  }, []);

  // Handle matching when result arrives
  useEffect(() => {
    if (!matchedSlug) {
      setActiveFlippedSlug(null);
      // Un-mark any secret reveal flag
      setDisplayedCards((prev) => prev.map((c) => ({ ...c, isSecretReveal: false })));
      return;
    }

    const normSlug = matchedSlug.toLowerCase().trim();
    const existingIndex = displayedCards.findIndex((c) => c.slug === normSlug);

    if (existingIndex !== -1) {
      // The matched character was already displayed in the deck!
      setActiveFlippedSlug(normSlug);
    } else {
      // The matched character was NOT in the currently displayed 3 cards!
      // Dynamically reveal the authentic matched archetype in the center card (index 1)
      const targetArchetype = getArchetypeData(normSlug);
      setDisplayedCards((prev) => {
        const next = [...prev];
        const centerIndex = 1;
        next[centerIndex] = {
          ...targetArchetype,
          characterName: characterName || targetArchetype.characterName,
          isSecretReveal: true,
        };
        return next;
      });
      setActiveFlippedSlug(normSlug);
    }
  }, [matchedSlug, characterName]);

  function handleShuffleDeck() {
    if (matchedSlug || isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      const currentSlugs = displayedCards.map((c) => c.slug);
      setDisplayedCards(getRandomThreeArchetypes(currentSlugs));
      setTimeout(() => {
        setIsShuffling(false);
      }, 180);
    }, 280);
  }

  return (
    <div className="w-full space-y-4">
      {/* Teaser Header & Shuffle Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-amber-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Semesta Wayang Purwa ({ALL_ARCHETYPES.length} Arketipe)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Siapakah Cerminan Jiwamu?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            Perhitungan wetonmu akan menyingkap salah satu dari seluruh arketipe wayang:
          </p>
        </div>

        {/* Tombol Kocok Kartu (Randomize Displayed Cards with 3D Spin) */}
        {!matchedSlug && (
          <button
            type="button"
            onClick={handleShuffleDeck}
            disabled={isShuffling}
            title="Kocok untuk memutar 3 arketipe wayang lainnya"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-amber-900 bg-amber-100/90 hover:bg-amber-200/90 border border-amber-300/80 rounded-lg shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
          >
            <Shuffle className={`w-3.5 h-3.5 text-amber-700 transition-transform duration-500 ${isShuffling ? 'rotate-180' : ''}`} />
            <span>Kocok Kartu</span>
          </button>
        )}
      </div>

      {/* Grid of 3 Cards with 3D Flip & Spin capability */}
      <div
        className="grid grid-cols-3 gap-2.5 sm:gap-4 perspective-1000"
      >
        {displayedCards.map((item, idx) => {
          const isMatch = activeFlippedSlug === item.slug;
          const isDimmed = activeFlippedSlug !== null && !isMatch;

          return (
            <div
              key={`${item.slug}-${idx}`}
              onClick={() => onCardClick?.(item.slug)}
              className={`relative transition-all duration-500 ease-out select-none ${
                isDimmed
                  ? 'opacity-30 scale-95 blur-[0.4px] pointer-events-none'
                  : 'opacity-100 scale-100'
              }`}
            >
              {/* Card Container with 3D Flip & Spin */}
              <div
                className={`relative w-full h-64 sm:h-80 rounded-2xl transition-transform duration-700 card-preserve-3d ${
                  isMatch ? '[transform:rotateY(180deg)] shadow-2xl ring-2 ring-amber-400/90' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  transform: isMatch
                    ? 'rotateY(180deg)'
                    : isShuffling
                    ? `rotateY(${idx % 2 === 0 ? 180 : -180}deg) scale(0.92)`
                    : 'rotateY(0deg) scale(1)',
                  transition: isMatch
                    ? 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 0.35s ease-in-out',
                }}
              >
                {/* FRONT FACE: Mystery Teaser Card */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  className={`absolute inset-0 card-backface-hidden group bg-gradient-to-b from-[#2C1207] via-[#220D05] to-[#160702] rounded-2xl p-3 sm:p-4 border border-amber-500/40 hover:border-amber-400/90 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between overflow-hidden cursor-default ${
                    isMatch ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  {/* Subtle Batik Parang Pattern Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20 bg-repeat"
                    style={{
                      backgroundImage: "url('/images/batik-parang.png')",
                      backgroundSize: '110px 110px',
                    }}
                  />

                  {/* Corner Accent Ornaments */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-amber-400/50" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-amber-400/50" />
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-amber-400/50" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-amber-400/50" />

                  {/* Top Disc Indicator */}
                  <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-amber-400/30 to-amber-600/20 border border-amber-300/80 flex items-center justify-center shadow-xs">
                    <span className="text-xs sm:text-sm font-black font-sans text-amber-200">
                      ?
                    </span>
                  </div>

                  {/* Enhanced Silhouette with Subtle Golden Glow */}
                  <div className="relative z-10 flex-1 w-full flex items-center justify-center my-1 py-1">
                    <div className="transition-all duration-300 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.35)] group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.65)] group-hover:scale-105">
                      <WayangFigureBySlug
                        slug={item.slug}
                        className="h-28 sm:h-38 w-auto object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>

                  {/* Card Label: High-contrast typography */}
                  <div className="relative z-10 text-center pt-2 pb-1 border-t border-amber-500/25 w-full space-y-0.5 bg-gradient-to-t from-black/40 to-transparent rounded-b-xl">
                    <span className="text-xs sm:text-sm font-serif font-bold text-amber-100 block truncate drop-shadow-xs">
                      {item.mysteryTitle}
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-sans font-semibold text-amber-300 block tracking-wider uppercase">
                      {item.archetypeLabel}
                    </span>
                  </div>
                </div>

                {/* BACK FACE: Revealed Archetype Front (Shows on 3D Flip) */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    WebkitTransform: 'rotateY(180deg)',
                  }}
                  className={`absolute inset-0 card-backface-hidden bg-gradient-to-b from-[#3D1A0A] via-[#281005] to-[#1A0802] rounded-2xl p-3 sm:p-4 border-2 border-amber-400 shadow-2xl flex flex-col items-center justify-between overflow-hidden transition-opacity duration-300 ${
                    isMatch ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {/* Glowing Backlight */}
                  <div className="absolute inset-0 bg-radial from-amber-500/25 via-transparent to-transparent pointer-events-none" />

                  <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-wider text-amber-300">
                    <span>COCOK!</span>
                    <span className="bg-amber-400/20 px-1.5 py-0.5 rounded-full border border-amber-300/50">
                      {item.isSecretReveal ? 'ARKETIPE TERKUAK' : 'RESONANSI TAKDIR'}
                    </span>
                  </div>

                  {/* Fully Revealed Character Artwork */}
                  <div className="relative z-10 flex-1 w-full flex items-center justify-center my-1">
                    <div className="filter drop-shadow-[0_0_22px_rgba(251,191,36,0.85)] animate-pulse-glow">
                      <WayangFigureBySlug
                        slug={item.slug}
                        className="h-32 sm:h-44 w-auto object-cover"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 text-center w-full pt-1.5 pb-1 border-t border-amber-400/40 bg-gradient-to-t from-black/40 to-transparent rounded-b-xl">
                    <span className="text-xs sm:text-sm font-serif font-bold text-amber-100 block truncate">
                      {item.characterName}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-sans text-amber-300/90 italic block line-clamp-1">
                      {item.quote}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OracleTeaserCards;
