'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import { KulinerArticle } from '@/data/kulinerArticles';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Search,
  Clock,
  MapPin,
  UtensilsCrossed,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  Leaf,
} from 'lucide-react';

interface KulinerExplorerProps {
  articles: KulinerArticle[];
}

export function KulinerExplorer({ articles }: KulinerExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'makanan-utama', label: 'Hidangan Utama' },
    { id: 'kudapan-tradisional', label: 'Kudapan Tradisional' },
    { id: 'minuman-warisan', label: 'Minuman Warisan' },
  ];

  const cities = useMemo(() => {
    const citySet = new Set<string>();
    articles.forEach((a) => {
      // If city has ampersand or slash, split or keep distinct
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
      // Category match
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }

      // City match
      if (
        selectedCity !== 'all' &&
        !article.city.toLowerCase().includes(selectedCity.toLowerCase())
      ) {
        return false;
      }

      // Search query match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = article.name.toLowerCase().includes(query);
        const matchJavanese = article.javaneseName?.toLowerCase().includes(query);
        const matchTheme = article.culturalTheme.toLowerCase().includes(query);
        const matchCity = article.city.toLowerCase().includes(query);
        const matchSummary = article.shortSummary.toLowerCase().includes(query);
        const matchSpices = article.ingredientsAndSpices.secretSpices.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchIngredients = article.ingredientsAndSpices.mainIngredients.some((i) =>
          i.toLowerCase().includes(query)
        );

        if (
          !matchName &&
          !matchJavanese &&
          !matchTheme &&
          !matchCity &&
          !matchSummary &&
          !matchSpices &&
          !matchIngredients
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
          {/* Top row: Search input + Results Counter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C59B53]" />
              <input
                type="text"
                placeholder="Cari makanan, bumbu rempah, atau kota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#0D0C0A] border border-[#C59B53]/40 text-[#F5EFE6] placeholder-[#7A6E5D] text-sm focus:outline-none focus:border-[#ECC47E] focus:ring-1 focus:ring-[#ECC47E] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#A89F91] hover:text-[#ECC47E] px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#A89F91]">
              <UtensilsCrossed className="w-4 h-4 text-[#C59B53]" />
              <span>
                Menampilkan{' '}
                <strong className="text-[#ECC47E]">{filteredArticles.length}</strong> dari{' '}
                {articles.length} kuliner pusaka
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#C59B53]/20">
            <span className="text-xs font-mono text-[#C59B53] uppercase tracking-wider mr-2 hidden sm:inline-block">
              Kategori:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C59B53] text-[#0D0C0A] font-bold shadow-md shadow-[#C59B53]/20'
                      : 'bg-[#1D1813] text-[#D8C8AD] border border-[#C59B53]/25 hover:border-[#ECC47E] hover:text-[#ECC47E]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Regional Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-[#A89F91] uppercase tracking-wider mr-2 hidden sm:inline-block">
              Asal Wilayah:
            </span>
            {cities.map((city) => {
              const isActive = selectedCity === city;
              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#ECC47E]/20 text-[#ECC47E] border border-[#ECC47E] font-semibold'
                      : 'bg-transparent text-[#A89F91] border border-transparent hover:border-[#C59B53]/30 hover:text-[#F5EFE6]'
                  }`}
                >
                  {city === 'all' ? 'Seluruh Daerah' : city}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Culinary Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-[#14110E] border border-[#C59B53]/25 space-y-4">
          <UtensilsCrossed className="w-10 h-10 text-[#C59B53]/50 mx-auto" />
          <h3 className="font-editorial text-2xl font-bold text-[#F5EFE6]">
            Kuliner Tidak Ditemukan
          </h3>
          <p className="text-xs sm:text-sm text-[#A89F91] max-w-md mx-auto">
            Tidak ada makanan atau minuman khas Jawa yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo;. Coba reset filter pencarian Anda.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCity('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#C59B53] text-[#0D0C0A] text-xs font-mono uppercase font-bold tracking-wider hover:bg-[#ECC47E] transition-colors"
          >
            Tampilkan Semua Kuliner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <ScrollReveal
              key={article.slug}
              direction="up"
              distance={30}
              delay={100 + (idx % 3) * 120}
              className="h-full flex"
            >
              <Link
                href={`/kuliner/${article.slug}`}
                className="group flex flex-col justify-between w-full rounded-2xl bg-[#14110E] border border-[#C59B53]/30 hover:border-[#ECC47E] transition-all shadow-xl hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Food Image with Category & Region Tag */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0D0C0A]">
                    <Image
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-90 pointer-events-none" />

                    {/* Category Label Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#0D0C0A]/85 backdrop-blur-md border border-[#C59B53]/40 text-[#ECC47E] text-[10px] font-mono uppercase tracking-wider">
                        {article.categoryLabel}
                      </span>
                    </div>

                    {/* City Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-mono text-[#F5EFE6] bg-[#14110E]/80 backdrop-blur-sm px-2.5 py-0.5 rounded-lg border border-[#C59B53]/25">
                      <MapPin className="w-3 h-3 text-[#C59B53]" />
                      <span>{article.city}</span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-4">
                    {/* Theme and Javanese name */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#C59B53] block">
                        {article.culturalTheme}
                      </span>
                      <h3 className="font-editorial text-2xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors leading-tight">
                        {article.name}
                      </h3>
                      {article.javaneseName && (
                        <p className="font-royal text-xs text-[#A89F91] italic">
                          Aksara / Asma: {article.javaneseName}
                        </p>
                      )}
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-[13px] text-[#C2B7A5] leading-relaxed line-clamp-3 font-sans">
                      {article.shortSummary}
                    </p>

                    {/* Flavor Profile Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {article.flavorProfile.slice(0, 3).map((flavor, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2 py-0.5 rounded-md bg-[#1C1712] border border-[#C59B53]/20 text-[#D8C8AD] text-[10px] font-mono"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 py-4 bg-[#110E0B] border-t border-[#C59B53]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A89F91] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C59B53]" />
                    <span>{article.readTime}</span>
                  </span>
                  <span className="text-[#ECC47E] font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    <span>Kisah Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Cultural Wisdom Showcase Banner */}
      <ScrollReveal direction="up" distance={30} delay={150}>
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#18130E] via-[#14110E] to-[#0D0C0A] border border-[#C59B53]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#C59B53]/5 blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0C0A] border border-[#C59B53]/40 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B53]" />
              <span>FILOSOFI GASTRONOMI JAWA</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6] leading-snug">
              Bukan sekadar penuntas lapar, <br />
              <span className="italic font-normal text-[#ECC47E]">
                melainkan perwujudan doa dan welas asih.
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-[#D8C8AD] leading-relaxed font-sans">
              Dalam alam pikir masyarakat Jawa, proses memasak adalah laku tapa kesabaran. Perpaduan bumbu rempah jangkep (komplet) menyimbolkan harmoni watak manusia, pincuk daun pisang melambangkan ketundukan hati bersyukur kepada Sang Pencipta, dan kehangatan wedangan mempererat tali persaudaraan lintas kelas sosial tanpa sekat pembeda.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-[#C59B53]/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ECC47E]">
                <Leaf className="w-4 h-4 text-[#C59B53]" />
                <span className="font-bold">Manunggaling Rasa</span>
              </div>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Keseimbangan rasa gurih santan, manis gula aren, asam belimbing wuluh, dan pedas rawit melatih jiwa agar tenang menghadapi dinamika hidup.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ECC47E]">
                <Flame className="w-4 h-4 text-[#C59B53]" />
                <span className="font-bold">Kearifan Anti-Limbah</span>
              </div>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Sate Kere dan Tempe Mendoan membuktikan kecerdasan leluhur mengubah ampas kedelai dan bahan bersahaja menjadi jamuan terhormat bernilai tinggi.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ECC47E]">
                <Award className="w-4 h-4 text-[#C59B53]" />
                <span className="font-bold">Pusaka Warisan Takbenda</span>
              </div>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                Mendoan Banyumas dan Lumpia Semarang telah ditetapkan sebagai Warisan Budaya Takbenda (WBTb) Indonesia yang wajib dijaga keasliannya.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
