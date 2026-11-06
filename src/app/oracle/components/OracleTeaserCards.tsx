'use client';

import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import Image from 'next/image';
import { getTarotImagePath } from '@/components/ui/WayangVectors';

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
    mysteryTitle: 'Pengkritik Berani?',
    archetypeLabel: 'Kritis & Spontan',
    characterName: 'Bagong Bawor',
    quote: 'Lancang tapi benar, suara nurani rakyat yang tak terbendung.',
  },
  {
    id: 'gareng',
    slug: 'gareng',
    mysteryTitle: 'Penjaga Batas?',
    archetypeLabel: 'Hati-Hati & Wasapada',
    characterName: 'Nala Gareng',
    quote: 'Langkah pincang tangan ceko, waspada menjaga marwah batin.',
  },
  {
    id: 'duryodana',
    slug: 'duryodana',
    mysteryTitle: 'Pemimpin Ambisius?',
    archetypeLabel: 'Ego & Kekuasaan',
    characterName: 'Prabu Duryodana',
    quote: 'Pantang menyerah demi mahkota, gigih memperjuangkan tahta.',
  },
  {
    id: 'kumbakarna',
    slug: 'kumbakarna',
    mysteryTitle: 'Patriot Sejati?',
    archetypeLabel: 'Nasionalis Luhur',
    characterName: 'Raden Kumbakarna',
    quote: 'Gugur bukan demi angkara raja, melainkan demi ibu pertiwi tercinta.',
  },
];

export function getRandomThreeArchetypes(excludeSlugs: string[] = []): TeaserCardItem[] {
  const pool = ALL_ARCHETYPES.filter((a) => !excludeSlugs.includes(a.slug));
  const shuffled = [...(pool.length >= 3 ? pool : ALL_ARCHETYPES)].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

export function getArchetypeData(slug: string): TeaserCardItem {
  const match = ALL_ARCHETYPES.find((a) => a.slug === slug);
  if (match) return match;
  return {
    id: slug,
    slug,
    mysteryTitle: 'Ksatria Luhur?',
    archetypeLabel: 'Arketipe Takdir',
    characterName: slug.replace(/-/g, ' ').toUpperCase(),
    quote: 'Ksatria luhur penjaga keseimbangan jagad raya.',
  };
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
  const [displayedCards, setDisplayedCards] = useState<TeaserCardItem[]>([
    ALL_ARCHETYPES[0], // Gatotkaca
    ALL_ARCHETYPES[1], // Arjuna
    ALL_ARCHETYPES[2], // Srikandi
  ]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [activeFlippedSlug, setActiveFlippedSlug] = useState<string | null>(null);

  useEffect(() => {
    setDisplayedCards(getRandomThreeArchetypes());
  }, []);

  useEffect(() => {
    if (!matchedSlug) {
      setActiveFlippedSlug(null);
      setDisplayedCards((prev) => prev.map((c) => ({ ...c, isSecretReveal: false })));
      return;
    }

    const normSlug = matchedSlug.toLowerCase().trim();
    const existingIndex = displayedCards.findIndex((c) => c.slug === normSlug);

    if (existingIndex !== -1) {
      setActiveFlippedSlug(normSlug);
    } else {
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left border-b border-[#C5A059]/20 pb-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
            <span>[ ARSIP ARKETIPE // {ALL_ARCHETYPES.length} TOKOH ]</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-royal font-bold text-[#F4EFE6] tracking-tight">
            Siapakah Cerminan Jiwamu?
          </h3>
          <p className="text-xs sm:text-sm text-[#A89F91] font-sans leading-relaxed">
            Perhitungan wetonmu akan menyingkap salah satu dari seluruh arketipe wayang:
          </p>
        </div>

        {/* Tombol Kocok Kartu */}
        {!matchedSlug && (
          <button
            type="button"
            onClick={handleShuffleDeck}
            disabled={isShuffling}
            title="Kocok untuk memutar 3 arketipe wayang lainnya"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-[#C5A059] hover:text-[#0C0A08] bg-[#14110E] hover:bg-[#C5A059] border border-[#C5A059]/40 rounded-full transition-colors cursor-pointer shrink-0"
          >
            <Shuffle className={`w-3.5 h-3.5 transition-transform duration-500 ${isShuffling ? 'rotate-180' : ''}`} />
            <span>Kocok Kartu</span>
          </button>
        )}
      </div>

      {/* Grid of 3 Cards with 3D Flip & Spin capability */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 perspective-1000">
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
                className={`relative w-full h-64 sm:h-80 transition-transform duration-700 card-preserve-3d rounded-2xl ${
                  isMatch ? '[transform:rotateY(180deg)] shadow-2xl ring-1 ring-[#C5A059]' : ''
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
                  className={`absolute inset-0 card-backface-hidden group bg-[#14110E] p-3 sm:p-4 border border-[#C5A059]/40 hover:border-[#C5A059] shadow-md rounded-2xl transition-all duration-300 flex flex-col items-center justify-between overflow-hidden cursor-default ${
                    isMatch ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  {/* Corner Accent Ornaments */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C5A059]/50" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#C5A059]/50" />
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#C5A059]/50" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#C5A059]/50" />

                  {/* Top Indicator */}
                  <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 bg-[#0C0A08] border border-[#C5A059]/60 rounded-full flex items-center justify-center font-mono text-xs font-bold text-[#C5A059]">
                    ?
                  </div>

                  {/* Authentic Wayang Tarot Card Preview */}
                  <div className="relative z-10 flex-1 w-full flex items-center justify-center my-2">
                    <div className="relative w-24 sm:w-28 aspect-[2/3] overflow-hidden border border-[#C5A059]/40 rounded-xl shadow-xl bg-black transition-all duration-300 group-hover:scale-103 group-hover:border-[#C5A059]">
                      <Image
                        src={getTarotImagePath(item.slug)}
                        alt={item.characterName}
                        fill
                        sizes="(max-width: 640px) 96px, 112px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Card Label */}
                  <div className="relative z-10 text-center pt-2 pb-1.5 px-2 border-t border-[#C5A059]/20 w-full space-y-0.5 bg-[#0C0A08] rounded-xl">
                    <span className="text-xs sm:text-sm font-editorial font-bold text-[#F4EFE6] block truncate">
                      {item.mysteryTitle}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#C5A059] block tracking-wider uppercase">
                      {item.archetypeLabel}
                    </span>
                  </div>
                </div>

                {/* BACK FACE: Revealed Archetype Front */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    WebkitTransform: 'rotateY(180deg)',
                  }}
                  className={`absolute inset-0 card-backface-hidden bg-[#14110E] p-3 sm:p-4 border-2 border-[#C5A059] rounded-2xl shadow-2xl flex flex-col items-center justify-between overflow-hidden transition-opacity duration-300 ${
                    isMatch ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                    <span>COCOK!</span>
                    <span className="bg-[#0C0A08] px-2.5 py-0.5 border border-[#C5A059]/50 rounded-full">
                      {item.isSecretReveal ? 'ARKETIPE TERKUAK' : 'RESONANSI TAKDIR'}
                    </span>
                  </div>

                  <div className="relative z-10 flex-1 w-full flex items-center justify-center my-2">
                    <div className="relative w-28 sm:w-32 aspect-[2/3] overflow-hidden border border-[#C5A059] rounded-xl shadow-2xl bg-black">
                      <Image
                        src={getTarotImagePath(item.slug)}
                        alt={item.characterName}
                        fill
                        sizes="(max-width: 640px) 112px, 128px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="relative z-10 text-center w-full pt-1.5 pb-1 px-2 border-t border-[#C5A059]/40 bg-[#0C0A08] rounded-xl">
                    <span className="text-xs sm:text-sm font-royal font-bold text-[#F4EFE6] block truncate">
                      {item.characterName}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-editorial text-[#C5A059] italic block line-clamp-1">
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