'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import { TempatSakralArticle } from '@/data/tempatSakralArticles';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Search,
  Clock,
  MapPin,
  Compass,
  ArrowRight,
  Sparkles,
  Mountain,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface TempatSakralExplorerProps {
  articles: TempatSakralArticle[];
}

export function TempatSakralExplorer({ articles }: TempatSakralExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Semua Situs' },
    { id: 'candi-buddha', label: 'Situs Buddha' },
    { id: 'candi-hindu', label: 'Candi Hindu Kuno' },
    { id: 'situs-islam-walisongo', label: 'Spiritualitas Walisongo' },
    { id: 'situs-megalitikum-lawu', label: 'Punden Megalitikum' },
  ];

  const cities = useMemo(() => {
    const citySet = new Set<string>();
    articles.forEach((a) => {
      if (a.city.includes('&')) {
        a.city.split('&').forEach((c) => citySet.add(c.trim()));
      } else {
        citySet.add(a.city);
      }
    });
    return ['all', ...Array.from(citySet)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }

      if (
        selectedCity !== 'all' &&
        !article.city.toLowerCase().includes(selectedCity.toLowerCase())
      ) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = article.name.toLowerCase().includes(query);
        const matchJavanese = article.javaneseName?.toLowerCase().includes(query);
        const matchTheme = article.spiritualTheme.toLowerCase().includes(query);
        const matchCity = article.city.toLowerCase().includes(query);
        const matchRegion = article.region.toLowerCase().includes(query);
        const matchSummary = article.shortSummary.toLowerCase().includes(query);
        const matchHighlights = article.highlights.some((h) =>
          h.toLowerCase().includes(query)
        );

        if (
          !matchName &&
          !matchJavanese &&
          !matchTheme &&
          !matchCity &&
          !matchRegion &&
          !matchSummary &&
          !matchHighlights
        ) {
          return false;
        }
      }

      return true;
    });
  }, [articles, selectedCategory, selectedCity, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search and Filters Bar */}
      <ScrollReveal direction="up" distance={25} delay={150}>
        <div className="p-6 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#ECC47E]" />
              <input
                type="text"
                placeholder="Cari nama candi, situs spiritual, kota, atau filosofi batin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0D0C0A] border border-[#C59B53]/30 text-[#F5EFE6] placeholder-[#A89F91]/60 focus:outline-none focus:border-[#ECC47E] focus:ring-1 focus:ring-[#ECC47E] transition-all text-sm font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#ECC47E] hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#ECC47E] hidden sm:inline">Kawasan:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-3 rounded-xl bg-[#0D0C0A] border border-[#C59B53]/30 text-[#F5EFE6] text-xs font-mono focus:outline-none focus:border-[#ECC47E] transition-all cursor-pointer"
              >
                <option value="all">Semua Wilayah</option>
                {cities
                  .filter((c) => c !== 'all')
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#C59B53]/15">
            <span className="text-[11px] font-mono text-[#A89F91] mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#ECC47E]" />
              Kategori:
            </span>
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer ${
                    active
                      ? 'bg-[#C59B53] text-[#0D0C0A] font-bold shadow-md'
                      : 'bg-[#1D1711] text-[#D8C8AD] hover:bg-[#2A2118] hover:text-white border border-[#C59B53]/25'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-mono text-[#A89F91] px-1">
        <div>
          Menampilkan <span className="text-[#ECC47E] font-bold">{filteredArticles.length}</span> dari{' '}
          {articles.length} Situs Spiritual
        </div>
        {(selectedCategory !== 'all' || selectedCity !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCity('all');
              setSearchQuery('');
            }}
            className="text-[#ECC47E] hover:underline cursor-pointer"
          >
            Hapus Semua Filter
          </button>
        )}
      </div>

      {/* Grid of Articles */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#14110E] border border-[#C59B53]/20 space-y-4">
          <p className="font-editorial text-2xl text-[#ECC47E]">
            Tidak ada situs sakral yang cocok dengan pencarian Anda.
          </p>
          <p className="text-sm text-[#A89F91]">
            Coba gunakan kata kunci yang lebih umum atau atur ulang filter kategori dan kawasan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <ScrollReveal
              key={article.slug}
              direction="up"
              distance={30}
              delay={idx * 60}
              className="h-full flex"
            >
              <Link
                href={`/tempat-sakral/${article.slug}`}
                className="rounded-2xl bg-[#14110E] border border-[#C59B53]/30 overflow-hidden shadow-2xl hover:border-[#ECC47E] transition-all duration-300 group flex flex-col justify-between h-full cursor-pointer hover:-translate-y-1.5 w-full"
              >
                <div>
                  {/* Hero Image Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0D0C0A]">
                    <Image
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-90" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#0D0C0A]/85 backdrop-blur-sm border border-[#C59B53]/40 text-[#ECC47E] text-[10px] font-mono tracking-wider uppercase font-semibold">
                        {article.categoryLabel.split('•')[0].trim()}
                      </span>
                      {article.locationDetails.elevation && (
                        <span className="px-2 py-0.5 rounded-full bg-[#18130E]/90 text-[#D8C8AD] text-[10px] font-mono flex items-center gap-1 border border-[#C59B53]/30">
                          <Mountain className="w-3 h-3 text-[#ECC47E]" />
                          <span>{article.locationDetails.elevation}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3.5">
                    {/* Location & Read time */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#ECC47E]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate max-w-[180px]">{article.city}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[#A89F91]">
                        <Clock className="w-3 h-3 text-[#ECC47E]" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className="font-royal text-2xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors leading-tight">
                        {article.name}
                      </h2>
                      {article.javaneseName && (
                        <p className="font-editorial italic text-xs text-[#A89F91] mt-0.5">
                          {article.javaneseName}
                        </p>
                      )}
                    </div>

                    {/* Spiritual Theme Quote */}
                    <div className="p-2.5 rounded-xl bg-[#0D0C0A]/80 border-l-2 border-[#C59B53] text-xs text-[#D8C8AD] font-serif italic leading-relaxed">
                      &ldquo;{article.spiritualTheme}&rdquo;
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-[#A89F91] leading-relaxed line-clamp-3">
                      {article.shortSummary}
                    </p>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {article.highlights.slice(0, 3).map((hl, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C1712] text-[#ECC47E]/90 border border-[#C59B53]/20"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="px-6 py-4 border-t border-[#C59B53]/20 bg-[#100D0A] flex items-center justify-between text-xs font-mono text-[#ECC47E] group-hover:text-white transition-colors">
                  <span className="font-semibold tracking-wider uppercase">
                    Baca Kisah Spiritual
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#1C160F] group-hover:bg-[#C59B53] text-[#ECC47E] group-hover:text-[#0D0C0A] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
