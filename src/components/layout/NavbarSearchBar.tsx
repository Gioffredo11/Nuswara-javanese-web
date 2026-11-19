'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  X,
  History,
  Command,
} from 'lucide-react';
import { tempatSakralArticles } from '@/data/tempatSakralArticles';
import { kulinerArticles } from '@/data/kulinerArticles';
import { tokohArticles } from '@/data/tokohArticles';
import { sejarahArticles } from '@/data/sejarahArticles';
import { defaultCharactersSeed } from '@/data/charactersSeed';
import { getTarotImagePath } from '@/components/ui/WayangVectors';

export type SearchCategory = 'all' | 'sakral' | 'kuliner' | 'tokoh' | 'sejarah' | 'wayang';

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'sakral' | 'kuliner' | 'tokoh' | 'sejarah' | 'wayang';
  categoryLabel: string;
  href: string;
  image?: string;
  city?: string;
  keywords: string;
}

/**
 * Precompiled unified search index with thumbnail preview images
 */
export function useSearchIndex(): SearchItem[] {
  return useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Tempat Sakral & Candi Jawa Tengah
    tempatSakralArticles.forEach((art) => {
      items.push({
        id: `sakral-${art.slug}`,
        title: art.name,
        subtitle: `${art.city} • ${art.categoryLabel}`,
        category: 'sakral',
        categoryLabel: 'Tempat Sakral',
        href: `/tempat-sakral/${art.slug}`,
        image: art.heroImage,
        city: art.city,
        keywords: `${art.name} ${art.city} ${art.region} ${art.categoryLabel} ${art.spiritualTheme} ${(art.highlights || []).join(' ')} ${art.shortSummary}`,
      });
    });

    // 2. Kuliner Warisan Jawa Tengah
    kulinerArticles.forEach((art) => {
      items.push({
        id: `kuliner-${art.slug}`,
        title: art.name,
        subtitle: `${art.city} • ${art.categoryLabel}`,
        category: 'kuliner',
        categoryLabel: 'Kuliner',
        href: `/kuliner/${art.slug}`,
        image: art.heroImage,
        city: art.city,
        keywords: `${art.name} ${art.city} ${art.region} ${art.categoryLabel} ${art.culturalTheme} ${(art.flavorProfile || []).join(' ')} ${art.shortSummary}`,
      });
    });

    // 3. Tokoh & Pahlawan Jawa
    tokohArticles.forEach((art) => {
      items.push({
        id: `tokoh-${art.slug}`,
        title: art.name,
        subtitle: `${art.originCity} • ${art.badgeLabel}`,
        category: 'tokoh',
        categoryLabel: 'Tokoh',
        href: `/tokoh/${art.slug}`,
        image: art.photoUrl,
        city: art.originCity,
        keywords: `${art.name} ${art.fullName} ${art.honorificTitle} ${art.originCity} ${art.badgeLabel} ${art.summary}`,
      });
    });

    // 4. Sejarah Jawa Tengah
    sejarahArticles.forEach((art) => {
      items.push({
        id: `sejarah-${art.slug}`,
        title: art.title,
        subtitle: `${art.eraPeriod} • ${art.eraSubheading}`,
        category: 'sejarah',
        categoryLabel: 'Sejarah',
        href: `/sejarah/${art.slug}`,
        image: art.heroImage,
        keywords: `${art.title} ${art.eraSubheading} ${art.eraPeriod} ${art.shortSummary} ${(art.historicalFigures || []).join(' ')}`,
      });
    });

    // 5. Wayangpedia Characters
    defaultCharactersSeed.forEach((char) => {
      items.push({
        id: `wayang-${char.slug}`,
        title: char.name,
        subtitle: `${char.category?.name || 'Wayang'} • ${char.title || 'Ksatria Purwa'}`,
        category: 'wayang',
        categoryLabel: 'Wayang',
        href: `/wayangpedia/${char.slug}`,
        image: getTarotImagePath(char.slug),
        keywords: `${char.name} ${char.javaneseName || ''} ${char.title || ''} ${char.shortDescription} ${char.category?.name || ''}`,
      });
    });

    return items;
  }, []);
}

/**
 * YouTube-style search dropdown for desktop navbar
 */
export function NavbarSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const searchIndex = useSearchIndex();

  // Filter items according to search query
  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return searchIndex.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
      );
    });
  }, [searchIndex, query]);

  // Top popular suggestions formatted like YouTube recent / trending items
  const popularSuggestions = useMemo(() => {
    const topSlugs = [
      'sakral-candi-borobudur',
      'kuliner-lumpia-semarang',
      'sakral-dataran-tinggi-dieng',
      'tokoh-ra-kartini',
      'kuliner-tempe-mendoan-banyumas',
      'wayang-gatotkaca',
      'sakral-candi-cetho',
      'kuliner-nasi-liwet-solo',
    ];
    return topSlugs
      .map((slug) => searchIndex.find((item) => item.id === slug))
      .filter((item): item is SearchItem => Boolean(item));
  }, [searchIndex]);

  // Active items displayed in the dropdown
  const displayedItems = useMemo(() => {
    if (!query.trim()) {
      return popularSuggestions;
    }
    return filteredResults.slice(0, 8);
  }, [query, popularSuggestions, filteredResults]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global hotkey: Ctrl+K / Cmd+K or "/" to focus search input
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset selected index when displayed items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [displayedItems]);

  const handleSelect = useCallback(
    (href: string) => {
      setIsOpen(false);
      setQuery('');
      inputRef.current?.blur();
      router.push(href);
    },
    [router]
  );

  // Keyboard navigation within dropdown
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (displayedItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % displayedItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + displayedItems.length) % displayedItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = displayedItems[selectedIndex];
      if (target) {
        handleSelect(target.href);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-[170px] sm:max-w-[220px] md:max-w-[270px]">
      {/* Search Input Bar */}
      <div
        className={`group relative flex items-center bg-[#150F0A]/85 hover:bg-[#1C140E] transition-all duration-300 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 border ${
          isOpen
            ? 'border-[#ECC47E] shadow-[0_0_15px_rgba(236,196,126,0.3)] ring-1 ring-[#ECC47E]/40'
            : 'border-[#C59B53]/35 hover:border-[#ECC47E]/65'
        }`}
      >
        <Search className="w-3.5 h-3.5 text-[#C59B53] shrink-0 mr-1.5 group-hover:text-[#ECC47E] transition-colors" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder="Cari sakral / kuliner..."
          className="w-full bg-transparent text-xs text-[#F5EFE6] placeholder-[#8C8275] focus:outline-none selection:bg-[#C59B53]/30 truncate"
          aria-label="Cari tempat sakral, kuliner, dan khazanah budaya"
        />

        {/* Clear Button or Hotkey Badge */}
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="p-0.5 rounded-full hover:bg-white/10 text-[#8C8275] hover:text-[#ECC47E] transition-colors cursor-pointer shrink-0 ml-1"
            title="Hapus pencarian"
          >
            <X className="w-3 h-3" />
          </button>
        ) : (
          <kbd className="hidden md:inline-flex items-center gap-0.5 text-[9px] font-mono font-medium text-[#8C8275] bg-[#221810] border border-[#C59B53]/25 px-1.5 py-0.5 rounded-sm shrink-0 ml-1">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        )}
      </div>

      {/* YouTube-Style Autocomplete Floating Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-[calc(100vw-2.5rem)] sm:w-[380px] md:w-[420px] max-w-[440px] rounded-2xl bg-[#110C08]/98 backdrop-blur-2xl border border-[#C59B53]/45 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_20px_rgba(197,155,83,0.15)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          {/* Results List */}
          <div ref={listRef} className="max-h-[360px] overflow-y-auto space-y-0.5 custom-scrollbar px-1">
            {query.trim() && displayedItems.length === 0 ? (
              <div className="text-center py-7 px-4">
                <p className="text-xs text-[#8C8275]">
                  Tidak ditemukan hasil untuk &ldquo;<span className="text-[#ECC47E] font-medium">{query}</span>&rdquo;
                </p>
                <p className="text-[11px] text-[#6E665C] mt-1 font-serif italic">
                  Coba kata kunci lain seperti Borobudur, Dieng, Lumpia, atau Kartini.
                </p>
              </div>
            ) : (
              displayedItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl transition-colors text-left cursor-pointer group ${
                      isSelected
                        ? 'bg-[#251A10]'
                        : 'hover:bg-[#1E140C]'
                    }`}
                  >
                    {/* Left Icon & Text Content */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {query.trim() ? (
                        <Search
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isSelected ? 'text-[#ECC47E]' : 'text-[#8C8275] group-hover:text-[#ECC47E]'
                          }`}
                        />
                      ) : (
                        <History
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isSelected ? 'text-[#ECC47E]' : 'text-[#8C8275] group-hover:text-[#ECC47E]'
                          }`}
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-sm font-medium truncate transition-colors ${
                            isSelected ? 'text-[#FFF2DC]' : 'text-[#F5EFE6] group-hover:text-[#FFF2DC]'
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#8C8275] font-sans truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Right Preview Thumbnail (YouTube style) */}
                    {item.image && (
                      <div className="relative w-12 h-7.5 sm:w-13 sm:h-8 rounded-[4px] overflow-hidden bg-black/60 border border-[#C59B53]/20 group-hover:border-[#ECC47E]/45 shrink-0 transition-colors shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="52px"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Minimalist Footer Tip */}
          <div className="mt-1 pt-1.5 px-3 border-t border-[#C59B53]/20 flex items-center justify-between text-[9px] font-mono text-[#786E62]">
            <span>Gunakan ↑ ↓ navigasi</span>
            <span>ESC untuk menutup</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * YouTube-style Mobile Search Modal (Triggered from mobile bottom pill navbar)
 */
export function MobileSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchIndex = useSearchIndex();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return searchIndex.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
      );
    });
  }, [searchIndex, query]);

  // Top popular suggestions
  const popularSuggestions = useMemo(() => {
    const topSlugs = [
      'sakral-candi-borobudur',
      'kuliner-lumpia-semarang',
      'sakral-dataran-tinggi-dieng',
      'tokoh-ra-kartini',
      'kuliner-tempe-mendoan-banyumas',
      'wayang-gatotkaca',
      'sakral-candi-cetho',
      'kuliner-nasi-liwet-solo',
    ];
    return topSlugs
      .map((slug) => searchIndex.find((item) => item.id === slug))
      .filter((item): item is SearchItem => Boolean(item));
  }, [searchIndex]);

  const displayedItems = useMemo(() => {
    if (!query.trim()) {
      return popularSuggestions;
    }
    return filteredResults.slice(0, 10);
  }, [query, popularSuggestions, filteredResults]);

  const handleSelect = (href: string) => {
    onClose();
    setQuery('');
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start sm:justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg mx-auto rounded-3xl bg-[#0F0B07] border border-[#C59B53]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-3 sm:p-4 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header with Search Input & Close button */}
        <div className="flex items-center gap-2 pb-3 border-b border-[#C59B53]/25">
          <div className="relative flex-1 flex items-center bg-[#17110C] rounded-full px-3 py-2 border border-[#C59B53]/40">
            <Search className="w-4 h-4 text-[#C59B53] mr-2 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari tempat sakral, kuliner, tokoh..."
              className="w-full bg-transparent text-sm text-[#F5EFE6] placeholder-[#8C8275] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-[#8C8275] hover:text-[#ECC47E]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-[#1A120B] text-[#A89F91] hover:text-white border border-[#C59B53]/30 shrink-0 cursor-pointer"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* YouTube-Style Suggestions List */}
        <div className="flex-1 overflow-y-auto space-y-0.5 py-2 custom-scrollbar">
          {query.trim() && displayedItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-[#8C8275]">
                Tidak ada hasil untuk &ldquo;<span className="text-[#ECC47E] font-medium">{query}</span>&rdquo;
              </p>
              <p className="text-xs text-[#6E665C] mt-1 font-serif italic">
                Coba kata kunci lain seperti Borobudur, Lumpia, atau Kartini.
              </p>
            </div>
          ) : (
            displayedItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.href)}
                className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#251A10] transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {query.trim() ? (
                    <Search className="w-4 h-4 text-[#8C8275] group-hover:text-[#ECC47E] shrink-0" />
                  ) : (
                    <History className="w-4 h-4 text-[#8C8275] group-hover:text-[#ECC47E] shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-[#F5EFE6] group-hover:text-[#FFF2DC] truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#8C8275] font-sans truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                {item.image && (
                  <div className="relative w-12 h-8 rounded-[4px] overflow-hidden bg-black/60 border border-[#C59B53]/25 group-hover:border-[#ECC47E]/45 shrink-0 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarSearchBar;
