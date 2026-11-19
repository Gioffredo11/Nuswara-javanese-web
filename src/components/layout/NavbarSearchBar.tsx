'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Landmark,
  Utensils,
  Users,
  Layers,
  BookOpen,
  ArrowRight,
  Sparkles,
  Command,
} from 'lucide-react';
import { tempatSakralArticles } from '@/data/tempatSakralArticles';
import { kulinerArticles } from '@/data/kulinerArticles';
import { tokohArticles } from '@/data/tokohArticles';
import { sejarahArticles } from '@/data/sejarahArticles';
import { defaultCharactersSeed } from '@/data/charactersSeed';

export type SearchCategory = 'all' | 'sakral' | 'kuliner' | 'tokoh' | 'sejarah' | 'wayang';

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'sakral' | 'kuliner' | 'tokoh' | 'sejarah' | 'wayang';
  categoryLabel: string;
  href: string;
  city?: string;
  keywords: string;
}

/**
 * Precompiled unified search index from official static datasets
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
        keywords: `${char.name} ${char.javaneseName || ''} ${char.title || ''} ${char.shortDescription} ${char.category?.name || ''}`,
      });
    });

    return items;
  }, []);
}

export function getCategoryIcon(category: string) {
  switch (category) {
    case 'sakral':
      return <Landmark className="w-3.5 h-3.5 text-amber-400" />;
    case 'kuliner':
      return <Utensils className="w-3.5 h-3.5 text-orange-400" />;
    case 'tokoh':
      return <Users className="w-3.5 h-3.5 text-yellow-400" />;
    case 'sejarah':
      return <BookOpen className="w-3.5 h-3.5 text-stone-300" />;
    case 'wayang':
      return <Layers className="w-3.5 h-3.5 text-[#ECC47E]" />;
    default:
      return <Sparkles className="w-3.5 h-3.5 text-[#ECC47E]" />;
  }
}

export function getCategoryBadgeClass(category: string) {
  switch (category) {
    case 'sakral':
      return 'bg-amber-950/70 border-amber-600/50 text-amber-300';
    case 'kuliner':
      return 'bg-orange-950/70 border-orange-600/50 text-orange-300';
    case 'tokoh':
      return 'bg-yellow-950/70 border-yellow-600/50 text-yellow-300';
    case 'sejarah':
      return 'bg-stone-900/70 border-stone-600/50 text-stone-300';
    case 'wayang':
      return 'bg-[#2E1D10]/80 border-[#C59B53]/50 text-[#ECC47E]';
    default:
      return 'bg-amber-950/70 border-amber-500/40 text-amber-300';
  }
}

/**
 * Desktop Navbar Search Bar (with dropdown)
 */
export function NavbarSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const searchIndex = useSearchIndex();

  // Filter items according to search query and active category
  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    return searchIndex.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
      );
    });
  }, [searchIndex, query, activeCategory]);

  // Quick recommendations when query is empty
  const quickRecommendations = useMemo(() => [
    { title: 'Candi Borobudur', href: '/tempat-sakral/candi-borobudur', category: 'sakral' as const },
    { title: 'Lumpia Semarang', href: '/kuliner/lumpia-semarang', category: 'kuliner' as const },
    { title: 'Kompleks Dieng', href: '/tempat-sakral/dataran-tinggi-dieng', category: 'sakral' as const },
    { title: 'Tempe Mendoan', href: '/kuliner/tempe-mendoan-banyumas', category: 'kuliner' as const },
    { title: 'R.A. Kartini', href: '/tokoh/ra-kartini', category: 'tokoh' as const },
    { title: 'Gatotkaca', href: '/wayangpedia/gatotkaca', category: 'wayang' as const },
  ], []);

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

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

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

    if (filteredResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredResults[selectedIndex];
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

      {/* Floating Results Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-[calc(100vw-2.5rem)] sm:w-[380px] md:w-[420px] max-w-[440px] rounded-2xl bg-[#0F0B07]/98 backdrop-blur-2xl border border-[#C59B53]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(197,155,83,0.2)] p-2.5 z-50 animate-in fade-in zoom-in-95 duration-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 pb-2 border-b border-[#C59B53]/25 overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'all', label: 'Semua' },
                { id: 'sakral', label: '🏛️ Sakral' },
                { id: 'kuliner', label: '🍲 Kuliner' },
                { id: 'tokoh', label: '👤 Tokoh' },
                { id: 'wayang', label: '🎭 Wayang' },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  inputRef.current?.focus();
                }}
                className={`px-2 py-1 rounded-full text-[10px] font-mono transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#C59B53]/30 text-[#FFF2DC] border border-[#ECC47E]/60 font-semibold'
                    : 'text-[#8C8275] hover:text-[#ECC47E] hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Recommendations (When Query is Empty) */}
          {!query.trim() && (
            <div className="pt-2.5 pb-1">
              <span className="text-[10px] font-mono text-[#8C8275] uppercase tracking-wider block px-1.5 mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ECC47E]" />
                Pencarian Populer Jawa
              </span>
              <div className="flex flex-wrap gap-1.5 px-1">
                {quickRecommendations.map((rec) => (
                  <button
                    key={rec.title}
                    type="button"
                    onClick={() => handleSelect(rec.href)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#19120C] hover:bg-[#251A10] border border-[#C59B53]/25 hover:border-[#ECC47E]/50 text-xs text-[#E8DFD3] hover:text-[#FFF2DC] transition-all cursor-pointer group"
                  >
                    {getCategoryIcon(rec.category)}
                    <span>{rec.title}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#C59B53] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Filtered Search Results */}
          {query.trim() && (
            <div ref={listRef} className="max-h-72 sm:max-h-80 overflow-y-auto space-y-1 pt-2 custom-scrollbar pr-0.5">
              {filteredResults.length === 0 ? (
                <div className="text-center py-6 px-3">
                  <p className="text-xs text-[#8C8275]">
                    Tidak ditemukan hasil untuk &ldquo;<span className="text-[#ECC47E] font-medium">{query}</span>&rdquo;
                  </p>
                  <p className="text-[11px] text-[#6E665C] mt-1 font-serif italic">
                    Coba kata kunci lain seperti Borobudur, Lumpia, Dieng, atau Mendoan.
                  </p>
                </div>
              ) : (
                filteredResults.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.href)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between gap-2.5 p-2 rounded-xl transition-all text-left cursor-pointer group border ${
                        isSelected
                          ? 'bg-[#251A10] border-[#ECC47E]/50 shadow-sm'
                          : 'bg-[#150F0A]/50 border-transparent hover:bg-[#1E150D] hover:border-[#C59B53]/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-[#0F0B07] border border-[#C59B53]/30 flex items-center justify-center shrink-0">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-[#F5EFE6] group-hover:text-[#FFF2DC] truncate">
                              {item.title}
                            </span>
                            <span
                              className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded-full border shrink-0 ${getCategoryBadgeClass(
                                item.category
                              )}`}
                            >
                              {item.categoryLabel}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#9E9385] truncate font-sans">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        className={`w-3.5 h-3.5 text-[#ECC47E] shrink-0 transition-transform ${
                          isSelected ? 'translate-x-0 opacity-100' : 'opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5'
                        }`}
                      />
                    </button>
                  );
                })
              )}
            </div>
          )}

          {/* Footer Navigation Tip */}
          <div className="mt-2 pt-1.5 border-t border-[#C59B53]/20 flex items-center justify-between text-[9px] font-mono text-[#786E62] px-1">
            <span>Tekan Enter untuk memilih</span>
            <span>ESC untuk menutup</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Mobile Search Modal (Triggered from mobile bottom pill navbar)
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
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
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
    return searchIndex.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
      );
    });
  }, [searchIndex, query, activeCategory]);

  const handleSelect = (href: string) => {
    onClose();
    setQuery('');
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg mx-auto rounded-3xl bg-[#0F0B07] border border-[#C59B53]/50 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-4 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header with Search Input & Close button */}
        <div className="flex items-center gap-2 pb-3 border-b border-[#C59B53]/30">
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
            className="p-2 rounded-full bg-[#1A120B] text-[#A89F91] hover:text-white border border-[#C59B53]/30 shrink-0"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: 'Semua' },
              { id: 'sakral', label: '🏛️ Sakral' },
              { id: 'kuliner', label: '🍲 Kuliner' },
              { id: 'tokoh', label: '👤 Tokoh' },
              { id: 'wayang', label: '🎭 Wayang' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#C59B53]/30 text-[#FFF2DC] border border-[#ECC47E]/60 font-semibold'
                  : 'text-[#8C8275] hover:text-[#ECC47E] bg-[#140E08] border border-[#C59B53]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 py-2 custom-scrollbar">
          {!query.trim() && (
            <div className="py-2">
              <span className="text-xs font-mono text-[#8C8275] uppercase tracking-wider block mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#ECC47E]" />
                Pencarian Populer
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: 'Candi Borobudur', href: '/tempat-sakral/candi-borobudur', icon: Landmark, label: 'Sakral' },
                  { title: 'Lumpia Semarang', href: '/kuliner/lumpia-semarang', icon: Utensils, label: 'Kuliner' },
                  { title: 'Kompleks Dieng', href: '/tempat-sakral/dataran-tinggi-dieng', icon: Landmark, label: 'Sakral' },
                  { title: 'Tempe Mendoan', href: '/kuliner/tempe-mendoan-banyumas', icon: Utensils, label: 'Kuliner' },
                  { title: 'R.A. Kartini', href: '/tokoh/ra-kartini', icon: Users, label: 'Tokoh' },
                  { title: 'Raden Gatotkaca', href: '/wayangpedia/gatotkaca', icon: Layers, label: 'Wayang' },
                ].map((rec) => {
                  const Icon = rec.icon;
                  return (
                    <button
                      key={rec.title}
                      type="button"
                      onClick={() => handleSelect(rec.href)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#17100A] hover:bg-[#251A10] border border-[#C59B53]/30 text-left transition-all"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#ECC47E] shrink-0" />
                      <span className="text-xs text-[#E8DFD3] truncate">{rec.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {query.trim() && filteredResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-[#8C8275]">
                Tidak ada hasil untuk &ldquo;<span className="text-[#ECC47E]">{query}</span>&rdquo;
              </p>
            </div>
          )}

          {query.trim() &&
            filteredResults.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.href)}
                className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#140E08] hover:bg-[#22170E] border border-[#C59B53]/25 hover:border-[#ECC47E]/50 text-left transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#0D0804] border border-[#C59B53]/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#ECC47E]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-[#F5EFE6] truncate">{item.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-[#C59B53]/40 bg-[#25180D] text-[#ECC47E] shrink-0">
                        {item.categoryLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9E9385] truncate">{item.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#ECC47E] shrink-0 opacity-70" />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default NavbarSearchBar;
