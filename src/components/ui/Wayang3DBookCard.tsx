'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  getTarotImagePath,
  BatikKawungPatternSvg,
} from './WayangVectors';
import { ChevronRight, Zap, BookOpen, Sparkles } from 'lucide-react';

export interface CharacterItem {
  id: number;
  name: string;
  slug: string;
  javaneseName: string | null;
  title?: string | null;
  shortDescription: string;
  personality?: any;
  abilities?: any;
  weaponsSummary?: string | null;
  uniqueFacts?: string | null;
  kingdom?: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  lineArtKey?: string | null;
}

interface Wayang3DBookCardProps {
  character: CharacterItem;
  forceOpen?: boolean;
}

export function Wayang3DBookCard({ character, forceOpen = false }: Wayang3DBookCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(forceOpen);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const router = useRouter();

  // Sync with external open all / close all toggle
  useEffect(() => {
    setIsOpen(forceOpen);
  }, [forceOpen]);

  // Handle clicking the book: smooth 3D opening animation, then auto-navigate!
  const handleOpenAndNavigate = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isOpening) return; // Prevent double-triggering

    setIsOpening(true);
    setIsOpen(true);

    // Give visitors time to see and feel the physical book opening animation in full 3D (820ms)
    setTimeout(() => {
      router.push(`/wayangpedia/${character.slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 820);
  };

  // Parse personality / traits
  const traits: string[] = Array.isArray(character.personality)
    ? character.personality
    : typeof character.personality === 'string'
    ? (() => {
        try {
          const parsed = JSON.parse(character.personality);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })()
    : [];

  // Parse abilities
  const abilities: string[] = Array.isArray(character.abilities)
    ? character.abilities
    : typeof character.abilities === 'string'
    ? (() => {
        try {
          const parsed = JSON.parse(character.abilities);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })()
    : [];

  // Theme palettes based on category
  const getCategoryTheme = (slug: string) => {
    switch (slug) {
      case 'pandawa':
        return {
          bg: '#2b1c14',
          border: 'rgba(212, 163, 115, 0.55)',
          gold: '#dfb776',
          spineText: '#f5ebd7',
          tagBg: 'rgba(212, 163, 115, 0.15)',
          kicker: 'PANDAWA LIMA · ADILUHUNG',
        };
      case 'kurawa':
        return {
          bg: '#2c1214',
          border: 'rgba(196, 92, 88, 0.55)',
          gold: '#d98b82',
          spineText: '#fae8e6',
          tagBg: 'rgba(196, 92, 88, 0.15)',
          kicker: 'ASTINA · KURAWA SATUS',
        };
      case 'punokawan':
        return {
          bg: '#332311',
          border: 'rgba(217, 148, 70, 0.55)',
          gold: '#e2a35d',
          spineText: '#fbf0dc',
          tagBg: 'rgba(217, 148, 70, 0.15)',
          kicker: 'PAMOMONG · KARANGTUMARITIS',
        };
      case 'ksatria':
      default:
        return {
          bg: '#162233',
          border: 'rgba(196, 167, 88, 0.55)',
          gold: '#ddbe6b',
          spineText: '#edf3fa',
          tagBg: 'rgba(196, 167, 88, 0.15)',
          kicker: 'WARA KSATRIA · NUSANTARA',
        };
    }
  };

  const theme = getCategoryTheme(character.category?.slug || '');

  // Render character artwork
  const renderVector = (_className = 'h-32 w-auto', _color = 'currentColor') => {
    return (
      <div className="relative aspect-[9/16] w-28 sm:w-32 rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-xl bg-black/40">
        <Image
          src={getTarotImagePath(character.slug)}
          alt={character.name}
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* 3D Book Stage */}
      <div className="wayang-book-stage w-full">
        <div
          className="wayang-book"
          data-open={isOpen ? 'true' : 'false'}
          data-opening={isOpening ? 'true' : 'false'}
          role="button"
          aria-label={`Buka kitab ${character.name} dan jelajahi profil lengkap`}
          tabIndex={0}
          onClick={handleOpenAndNavigate}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenAndNavigate();
            }
          }}
          style={
            {
              '--cover-bg': theme.bg,
              '--cover-border': theme.border,
            } as React.CSSProperties
          }
        >
          {/* Ambient 3D Contact Shadow */}
          <span className="wayang-book-shadow" aria-hidden="true" />

          {/* Golden Aura when actively opening to profile */}
          {isOpening && <span className="wayang-book-glow" aria-hidden="true" />}

          {/* Book Back Cover */}
          <span className="wayang-book-back" aria-hidden="true" />

          {/* Embossed Book Spine */}
          <span className="wayang-book-spine" aria-hidden="true">
            {character.name} · {character.category?.name || 'Wayang'}
          </span>

          {/* Realistic Paper Edge Block */}
          <span className="wayang-page-block" aria-hidden="true">
            <span className="wayang-paper-edge wayang-paper-fore" />
            <span className="wayang-paper-edge wayang-paper-top" />
            <span className="wayang-paper-edge wayang-paper-bottom" />
          </span>

          {/* Interior Manuscript / Title Page revealed on open */}
          <div className="wayang-title-page">
            {/* Top header on inner page */}
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono tracking-wider uppercase border-b border-amber-900/15 pb-1 text-amber-900/80">
                <span className="font-semibold">{character.category?.name}</span>
                <span className="text-stone-500">{character.kingdom || 'Nusantara'}</span>
              </div>

              {/* Character Silhouette Frame */}
              <div className="my-2 flex items-center justify-center h-28 bg-amber-50/70 rounded border border-amber-900/15 overflow-hidden">
                {renderVector('h-24 w-auto text-amber-950/85', '#24140b')}
              </div>

              {/* Titles */}
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                {character.name}
              </h3>
              {character.javaneseName && (
                <p className="text-[10px] text-amber-900/70 italic leading-none mt-0.5">
                  {character.javaneseName}
                </p>
              )}
              {character.title && (
                <p className="text-[10px] font-medium text-amber-800 line-clamp-1 mt-0.5">
                  {character.title}
                </p>
              )}

              {/* Short Description */}
              <p className="text-[10px] text-stone-700 leading-relaxed mt-1.5 line-clamp-2">
                {character.shortDescription}
              </p>
            </div>

            {/* Bottom Traits & Actions */}
            <div className="pt-2 border-t border-amber-900/15">
              {traits.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {traits.slice(0, 2).map((trait, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-900/10 text-amber-950 font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              )}

              {abilities.length > 0 && (
                <div className="flex items-center gap-1 text-[9px] text-stone-700 mb-2 font-sans line-clamp-1">
                  <Zap className="w-2.5 h-2.5 text-amber-700 shrink-0" />
                  <span>{abilities[0]}</span>
                </div>
              )}

              {/* Action Button: Triggers Opening & Navigation */}
              <button
                type="button"
                onClick={handleOpenAndNavigate}
                disabled={isOpening}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#100D0A] bg-[#B99A60] hover:bg-[#C9A96E] py-2 px-3 rounded-lg transition-colors shadow-md cursor-pointer"
              >
                <span>{isOpening ? 'Membuka Lembaran...' : 'Buka Profil Lengkap'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isOpening ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </div>

          {/* Fanning Pages (3D Layers) */}
          <span className="wayang-page-fan" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>

          {/* Front Hardcover */}
          <div className="wayang-front-cover">
            {/* Inner Cover Texture (Visible when open) */}
            <span className="wayang-cover-lining" aria-hidden="true" />

            {/* Exterior Cover Face (Visible when closed) */}
            <div className="wayang-cover-face">
              {/* Corner Watermark */}
              <div className="absolute -top-6 -right-6 opacity-15 pointer-events-none">
                <BatikKawungPatternSvg className="w-24 h-24 text-amber-200" />
              </div>

              {/* Top Cover Kicker */}
              <div className="text-center relative z-10">
                <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-amber-200/75 block">
                  {theme.kicker}
                </span>
                <div className="w-8 h-px bg-amber-400/40 mx-auto my-1.5" />
              </div>

              {/* Center Artwork & Medallion */}
              <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10">
                <div className="relative p-3 rounded-full border border-amber-400/30 bg-black/25 backdrop-blur-xs mb-2 shadow-inner">
                  {renderVector('h-24 w-auto text-amber-100/90', theme.gold)}
                </div>

                <h3 className="font-serif text-xl font-bold text-center tracking-wide text-[#FAF5EA] drop-shadow-md">
                  {character.name}
                </h3>

                {character.javaneseName && (
                  <span className="text-[10px] text-amber-200/80 italic text-center font-serif mt-0.5">
                    {character.javaneseName}
                  </span>
                )}

                <p className="text-[10px] font-sans text-amber-200/90 text-center font-medium mt-1 line-clamp-1 px-2">
                  {character.title || character.kingdom || 'Tokoh Adiluhung'}
                </p>
              </div>

              {/* Bottom Cover Footer */}
              <div className="text-center border-t border-amber-400/25 pt-2 relative z-10">
                <span className="text-[8px] font-mono tracking-widest uppercase text-amber-200/70 block">
                  Serat Pewayangan Nusantara
                </span>
                <span className="text-[9px] text-amber-300/90 font-sans font-medium flex items-center justify-center gap-1 mt-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  <span>
                    {isOpening ? 'Membuka...' : 'Klik untuk membuka profil'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auxiliary Controls Capsule Under Book */}
      <div className="mt-3.5 w-full max-w-[270px] flex items-center justify-between gap-2 px-3.5 py-2 bg-[#17120E] hover:bg-[#221B13] rounded-xl border border-[#B99A60]/30 hover:border-[#B99A60]/70 transition-all shadow-lg group">
        <button
          type="button"
          onClick={handleOpenAndNavigate}
          disabled={isOpening}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D8C8AD] hover:text-[#F0E6D4] transition-colors cursor-pointer"
          title="Buka kitab dan lihat profil lengkap"
        >
          <BookOpen className={`w-3.5 h-3.5 text-[#B99A60] ${isOpening ? 'animate-spin' : ''}`} />
          <span>{isOpening ? 'Membuka...' : 'Buka Kitab'}</span>
        </button>

        <span className="text-[#B99A60]/30 text-xs" aria-hidden="true">|</span>

        <button
          type="button"
          onClick={handleOpenAndNavigate}
          disabled={isOpening}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#ECC47E] hover:text-white transition-colors cursor-pointer"
        >
          <span>Profil Lengkap</span>
          <ChevronRight className={`w-3.5 h-3.5 text-[#B99A60] ${isOpening ? 'animate-pulse' : 'group-hover:translate-x-0.5'} transition-transform`} />
        </button>
      </div>

      {/* Active Opening Feedback Toast */}
      {isOpening && (
        <div className="mt-2.5 inline-flex items-center gap-2 text-xs font-mono text-[#ECC47E] bg-[#1A140F] px-3.5 py-1.5 rounded-full border border-[#B99A60]/50 shadow-xl animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#B99A60] animate-spin" />
          <span>Membuka Serat {character.name}...</span>
        </div>
      )}
    </div>
  );
}

export default Wayang3DBookCard;
