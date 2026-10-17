'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import { tokohArticles, type TokohArticle } from '@/data/tokohArticles';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Search,
  Calendar,
  MapPin,
  Shield,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Quote,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const categories = [
  { id: 'all', label: 'Semua Kategori' },
  { id: 'Emansipasi & Literasi', label: 'Emansipasi & Literasi' },
  { id: 'Perlawanan Kolonial', label: 'Perlawanan Kolonial' },
  { id: 'Pendidikan Kebangsaan', label: 'Pendidikan Kebangsaan' },
  { id: 'Strategi Militer', label: 'Strategi Militer' },
  { id: 'Reformasi & Dakwah Sosial', label: 'Reformasi & Dakwah' },
];

export function TokohIndexClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTokoh = useMemo(() => {
    return tokohArticles.filter((tokoh) => {
      const matchCategory =
        selectedCategory === 'all' || tokoh.category === selectedCategory;
      const matchSearch =
        tokoh.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tokoh.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tokoh.badgeLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tokoh.originCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tokoh.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tokoh.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Back button */}
      <ScrollReveal direction="up" distance={20}>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C59B53] hover:text-[#ECC47E] transition-colors py-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </ScrollReveal>

      {/* Main Header */}
      <ScrollReveal direction="up" distance={30} delay={100}>
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18130E] border border-[#C59B53]/40 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-[#C59B53]" />
            <span>ARSIP IDENTITAS KSATRIA & PAHLAWAN JAWA</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5EFE6] leading-tight">
            Mereka meninggalkan jejak, <br />
            <span className="italic font-normal text-gold-gradient">
              kita meneruskan makna peradaban.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#D8C8AD] leading-relaxed font-sans max-w-3xl">
            Dari pedalaman keraton hingga perbukitan gerilya, tanah Jawa melahirkan para perintis kemerdekaan dan pembawa lentera akal budi. Jelajahi berkas arsip identitas dan artikel biografi mendalam para tokoh bangsa di bawah ini.
          </p>
        </div>
      </ScrollReveal>

      {/* Search & Filter Bar */}
      <ScrollReveal direction="up" distance={30} delay={150}>
        <div className="bg-[#14100C] border border-[#C59B53]/30 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89F91]" />
              <input
                type="text"
                placeholder="Cari nama tokoh, gelar, kota asal, atau kutipan falsafah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0D0B08] border border-[#C59B53]/30 rounded-xl pl-11 pr-4 py-3 text-sm text-[#F5EFE6] placeholder-[#7E7465] focus:outline-none focus:border-[#C59B53] focus:ring-1 focus:ring-[#C59B53] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A89F91] hover:text-[#F5EFE6] px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="text-xs font-mono text-[#A89F91] flex items-center gap-2 self-end md:self-center px-2">
              <span className="w-2 h-2 rounded-full bg-[#C59B53] animate-pulse" />
              <span>
                Menampilkan <strong className="text-[#ECC47E]">{filteredTokoh.length}</strong> dari {tokohArticles.length} Berkas
              </span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#C59B53]/15">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#C59B53] text-[#0D0B08] border-[#C59B53] font-semibold shadow-md'
                      : 'bg-[#1A140F] text-[#A89F91] border-[#C59B53]/25 hover:border-[#C59B53]/50 hover:text-[#F5EFE6]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Identity Cards Grid */}
      {filteredTokoh.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#14100C] border border-dashed border-[#C59B53]/30 rounded-2xl space-y-3">
          <BookOpen className="w-10 h-10 text-[#C59B53]/50 mx-auto" />
          <p className="font-editorial text-xl text-[#F5EFE6]">
            Tidak ada arsip tokoh yang cocok dengan pencarian
          </p>
          <p className="text-xs text-[#A89F91]">
            Coba kata kunci lain atau pilih &ldquo;Semua Kategori&rdquo;
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 px-4 py-2 text-xs font-mono rounded-lg bg-[#C59B53]/20 text-[#ECC47E] border border-[#C59B53]/40 hover:bg-[#C59B53]/30 transition-colors"
          >
            Hapus Filter Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredTokoh.map((tokoh, index) => (
            <ScrollReveal
              key={tokoh.slug}
              direction="up"
              distance={35}
              delay={index * 80}
              className="flex"
            >
              <div className="group relative w-full rounded-2xl bg-gradient-to-b from-[#1A1510] to-[#120E0A] border border-[#C59B53]/35 hover:border-[#C59B53] p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Archival Badge and Stamp */}
                <div className="flex items-center justify-between pb-4 border-b border-[#C59B53]/20">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-[#ECC47E] uppercase">
                    <Shield className="w-3.5 h-3.5 text-[#C59B53]" />
                    <span>{tokoh.idNumber}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C59B53]/15 text-[#DFB873] border border-[#C59B53]/30 uppercase">
                    {tokoh.badgeLabel}
                  </span>
                </div>

                {/* ID Photo Frame with Vintage Corners */}
                <div className="pt-6 pb-4">
                  <div className="relative mx-auto w-40 aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#C59B53]/50 shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                    <Image
                      src={tokoh.photoUrl}
                      alt={`Foto arsip ${tokoh.name}`}
                      fill
                      sizes="160px"
                      className="object-cover sepia-[0.15] contrast-105 group-hover:sepia-0 transition-all duration-300"
                    />
                    {/* Archival corner decorations */}
                    <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#ECC47E]/80 pointer-events-none" />
                    <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#ECC47E]/80 pointer-events-none" />
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#ECC47E]/80 pointer-events-none" />
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#ECC47E]/80 pointer-events-none" />
                  </div>
                  <div className="text-center pt-2">
                    <span className="text-[9px] font-mono text-[#A89F91] tracking-widest uppercase">
                      {tokoh.verifiedSealText}
                    </span>
                  </div>
                </div>

                {/* Identity Information Body */}
                <div className="space-y-3 flex-1 flex flex-col justify-between pt-2">
                  <div className="space-y-2 text-center">
                    <h2 className="font-royal text-xl sm:text-2xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors leading-snug">
                      {tokoh.name}
                    </h2>
                    <p className="text-xs font-mono text-[#ECC47E] uppercase tracking-wider font-semibold">
                      {tokoh.badgeLabel}
                    </p>
                    <div className="flex items-center justify-center gap-3 text-[11px] text-[#A89F91]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C59B53]" />
                        {tokoh.originCity}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C59B53]" />
                        {tokoh.period}
                      </span>
                    </div>
                  </div>

                  {/* Falsafah Quote Box */}
                  <div className="bg-[#0E0B08] rounded-xl p-3.5 border border-[#C59B53]/25 space-y-1.5 my-2">
                    <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#DFB873]">
                      <Quote className="w-3 h-3 text-[#C59B53]" />
                      <span>Falsafah Hidup</span>
                    </div>
                    <p className="font-editorial italic text-xs text-[#E3D9C8] line-clamp-2">
                      &ldquo;{tokoh.quote}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs text-[#A89F91] line-clamp-3 leading-relaxed">
                    {tokoh.summary}
                  </p>
                </div>

                {/* Footer Action to Full Article */}
                <div className="pt-5 mt-4 border-t border-[#C59B53]/20 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#C59B53] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Pahlawan Terverifikasi
                  </span>
                  <Link
                    href={`/tokoh/${tokoh.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C59B53]/15 border border-[#C59B53]/50 text-xs font-semibold text-[#ECC47E] hover:bg-[#C59B53] hover:text-[#0D0B08] transition-all group/btn"
                  >
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Archival Closing Banner */}
      <ScrollReveal direction="up" distance={30}>
        <div className="rounded-2xl bg-gradient-to-r from-[#18120B] via-[#241A0E] to-[#18120B] border border-[#C59B53]/40 p-8 sm:p-10 text-center space-y-4 shadow-2xl mt-12">
          <Sparkles className="w-8 h-8 text-[#C59B53] mx-auto" />
          <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
            Menjaga Nyala Nilai Para Pendahulu
          </h3>
          <p className="text-sm text-[#D8C8AD] max-w-2xl mx-auto leading-relaxed font-sans">
            Mempelajari sejarah bukanlah sekadar mengingat tanggal dan nama, melainkan menyerap keberanian nurani mereka untuk kita ejawantahkan dalam tantangan peradaban masa kini.
          </p>
          <div className="pt-2">
            <Link
              href="/#tokoh"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C59B53] text-[#0D0B08] font-semibold text-xs tracking-wider uppercase hover:bg-[#ECC47E] transition-colors shadow-lg"
            >
              <span>Kembali ke Sorotan Beranda</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
