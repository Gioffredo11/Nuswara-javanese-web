'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { GununganSvg } from '@/components/ui/WayangVectors';
import { Wayang3DBookCard, type CharacterItem } from '@/components/ui/Wayang3DBookCard';
import { Search } from 'lucide-react';

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

const defaultFallbackCharacters: CharacterItem[] = [
  {
    id: 1,
    slug: 'arjuna',
    name: 'Arjuna',
    javaneseName: 'Janaka / Permadi',
    title: 'Ksatria Panengah Pandawa',
    shortDescription:
      'Ksatria berparas rupawan, berhati tenang, dengan fokus batin mutlak dan keahlian memanah terbaik di jagad pakeliran.',
    category: { id: 1, slug: 'pandawa', name: 'Pandawa' },
    lineArtKey: 'lineart-arjuna',
  },
  {
    id: 2,
    slug: 'bima',
    name: 'Bima',
    javaneseName: 'Werkudara / Bratasena',
    title: 'Ksatria Perkasa Jodhipati',
    shortDescription:
      'Sosok raksasa berhati emas, anti-basa-basi, berpegang teguh pada kebenaran dan pantang menjilat penguasa.',
    category: { id: 1, slug: 'pandawa', name: 'Pandawa' },
    lineArtKey: 'lineart-bima',
  },
  {
    id: 3,
    slug: 'yudhistira',
    name: 'Yudhistira',
    javaneseName: 'Puntadewa / Samiaji',
    title: 'Raja Amarta Berdarah Putih',
    shortDescription:
      'Sulung Pandawa berdarah putih yang tidak pernah berbohong, penuh welas asih, dan rela mengorbankan takhta demi kedamaian.',
    category: { id: 1, slug: 'pandawa', name: 'Pandawa' },
    lineArtKey: 'lineart-yudhistira',
  },
  {
    id: 4,
    slug: 'nakula',
    name: 'Nakula',
    javaneseName: 'Pinten',
    title: 'Ksatria Kembar Sawojajar',
    shortDescription:
      'Pakar menunggang kuda dan pemelihara rahasia keraton yang teliti, setia, dan tanggap firasat.',
    category: { id: 1, slug: 'pandawa', name: 'Pandawa' },
    lineArtKey: 'lineart-nakula',
  },
  {
    id: 5,
    slug: 'sadewa',
    name: 'Sadewa',
    javaneseName: 'Tangsen',
    title: 'Peramal Ulung Bumi Ratawu',
    shortDescription:
      'Bungsu Pandawa yang mewarisi ilmu firasat dewa (Aji Purnamajati), bijak menyingkap tabir masa depan.',
    category: { id: 1, slug: 'pandawa', name: 'Pandawa' },
    lineArtKey: 'lineart-sadewa',
  },
  {
    id: 6,
    slug: 'gatotkaca',
    name: 'Gatotkaca',
    javaneseName: 'Raden Tetuka',
    title: 'Ksatria Angkasa Pringgandani',
    shortDescription:
      'Otot kawat balung wesi, pahlawan udara yang loyal mengorbankan jiwa raga demi kedaulatan tanah air.',
    category: { id: 4, slug: 'kesatria-dewa', name: 'Ksatria & Pahlawan' },
    lineArtKey: 'lineart-gatotkaca',
  },
  {
    id: 7,
    slug: 'srikandi',
    name: 'Srikandi',
    javaneseName: 'Dewi Wara Srikandi',
    title: 'Panglima Srikandi Pancawala',
    shortDescription:
      'Prajurit wanita mandiri tanpa kompromi, piawai memanah dan pendobrak batas patriarki dalam perang Bharatayuda.',
    category: { id: 4, slug: 'kesatria-dewa', name: 'Ksatria & Pahlawan' },
    lineArtKey: 'lineart-srikandi',
  },
  {
    id: 8,
    slug: 'semar',
    name: 'Semar',
    javaneseName: 'Kyai Lurah Badranaya',
    title: 'Pamomong Sejati Jagad Raya',
    shortDescription:
      'Dewa Ismaya yang membumi jadi rakyat jelata, simbol kearifan spiritual, kerendahan hati, dan suara nurani rakyat.',
    category: { id: 3, slug: 'punokawan', name: 'Punokawan' },
    lineArtKey: 'lineart-semar',
  },
  {
    id: 9,
    slug: 'gareng',
    name: 'Gareng',
    javaneseName: 'Nala Gareng',
    title: 'Pamomong Cacat Fisik Luhur Batin',
    shortDescription:
      'Sulung anak angkat Semar dengan kaki jinjit dan tangan ceko: filosofi kewaspadaan agar tak ceroboh melangkah di dunia.',
    category: { id: 3, slug: 'punokawan', name: 'Punokawan' },
    lineArtKey: 'lineart-gareng',
  },
  {
    id: 10,
    slug: 'petruk',
    name: 'Petruk',
    javaneseName: 'Kanthong Bolong',
    title: 'Pamomong Cerdik & Jujur',
    shortDescription:
      'Sosok jangkung hidung mancung yang dermawan tanpa pamrih (kanthong bolong), cerdas mengkritik kepalsuan rezim.',
    category: { id: 3, slug: 'punokawan', name: 'Punokawan' },
    lineArtKey: 'lineart-petruk',
  },
  {
    id: 11,
    slug: 'bagong',
    name: 'Bagong',
    javaneseName: 'Bawor',
    title: 'Pamomong Jenaka Anti-Basa-Basi',
    shortDescription:
      'Bungsu Punokawan bayangan Semar berbadan bulat, lugu, frontal, dan tak segan menertawakan arogansi para raja.',
    category: { id: 3, slug: 'punokawan', name: 'Punokawan' },
    lineArtKey: 'lineart-bagong',
  },
  {
    id: 12,
    slug: 'duryodana',
    name: 'Duryodana',
    javaneseName: 'Suyodana / Jakapitana',
    title: 'Prabu Astina Wangsa Kuru',
    shortDescription:
      'Sulung Kurawa berwibawa besar namun dibutakan ambisi kekuasaan mutlak dan rasa iri hati yang merusak nurani.',
    category: { id: 2, slug: 'kurawa', name: 'Kurawa' },
    lineArtKey: 'lineart-duryodana',
  },
  {
    id: 13,
    slug: 'karna',
    name: 'Karna',
    javaneseName: 'Adipati Awangga',
    title: 'Ksatria Surya Berjiwa Dermawan',
    shortDescription:
      'Kakak kandung Pandawa dari batara Surya yang memilih setia membela kehormatan dan persahabatan sampai tetes darah penghabisan.',
    category: { id: 2, slug: 'kurawa', name: 'Kurawa' },
    lineArtKey: 'lineart-karna',
  },
];

const defaultCategories: CategoryItem[] = [
  { id: 1, name: 'Pandawa', slug: 'pandawa' },
  { id: 2, name: 'Kurawa', slug: 'kurawa' },
  { id: 3, name: 'Punokawan', slug: 'punokawan' },
  { id: 4, name: 'Ksatria & Pahlawan', slug: 'kesatria-dewa' },
];

export function WayangpediaClient({
  initialCharacters,
  categories,
}: {
  initialCharacters?: CharacterItem[];
  categories?: CategoryItem[];
}) {
  const [characters, setCharacters] = useState<CharacterItem[]>(() => {
    return initialCharacters && initialCharacters.length > 0
      ? initialCharacters
      : defaultFallbackCharacters;
  });

  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>(() => {
    return categories && categories.length > 0 ? categories : defaultCategories;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (initialCharacters && initialCharacters.length > 0) {
      setCharacters(initialCharacters);
    } else {
      fetch('/api/characters?limit=50')
        .then((res) => res.json())
        .then((json) => {
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setCharacters(json.data);
          }
        })
        .catch(() => {});
    }
  }, [initialCharacters]);

  const filteredCharacters = useMemo(() => {
    return characters.filter((char) => {
      const matchCat =
        selectedCategory === 'all' ||
        char.category?.slug === selectedCategory ||
        (selectedCategory === 'kesatria-dewa' &&
          (char.category?.slug === 'kesatria-dewa' || char.category?.slug === 'ksatria')) ||
        (selectedCategory === 'ksatria' &&
          (char.category?.slug === 'kesatria-dewa' || char.category?.slug === 'ksatria'));

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        char.name.toLowerCase().includes(q) ||
        (char.javaneseName && char.javaneseName.toLowerCase().includes(q)) ||
        (char.title && char.title.toLowerCase().includes(q)) ||
        char.shortDescription.toLowerCase().includes(q);

      return matchCat && matchQuery;
    });
  }, [characters, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#ECC47E]">
          <GununganSvg className="w-4 h-6 text-[#ECC47E]" />
          <span>Katalog Penjaga Cerita Nusantara · Serat 3D Interaktif</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-[#F5EFE6] tracking-tight">
          Wayangpedia
        </h2>
        <p className="text-sm sm:text-base text-[#A89F91] leading-relaxed font-sans">
          Jelajahi profil ksatria, dewa, dan pamomong wayang kulit dalam wujud kitab 3D berdimensi.
          Arahkan kursor atau ketuk buku untuk membuka lembaran serat dan mengungkap watak, pusaka, serta filosofi adiluhungnya.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C59B53]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kitab tokoh (cth: Gatotkaca, Arjuna, Bima)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#14110E] border border-[#C59B53]/40 rounded-xl text-sm text-[#F5EFE6] placeholder-[#8C8273] focus:outline-none focus:ring-2 focus:ring-[#C59B53]/40 focus:border-[#ECC47E] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A89F91] hover:text-[#F5EFE6] cursor-pointer"
              >
                Hapus
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-[#C59B53]/20 pb-4">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-[#DFB873] to-[#C59B53] text-[#140F08] font-bold shadow-md'
                : 'bg-[#16120E] text-[#D4C8B8] border border-[#C59B53]/25 hover:border-[#C59B53]/60'
            }`}
          >
            Semua Kitab ({characters.length})
          </button>
          {categoriesList.map((cat) => {
            const count = characters.filter((c) => {
              const slug = c.category?.slug;
              if (cat.slug === 'kesatria-dewa' || cat.slug === 'ksatria') {
                return slug === 'kesatria-dewa' || slug === 'ksatria';
              }
              return slug === cat.slug;
            }).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.slug ||
                  (selectedCategory === 'ksatria' && cat.slug === 'kesatria-dewa') ||
                  (selectedCategory === 'kesatria-dewa' && cat.slug === 'ksatria')
                    ? 'bg-gradient-to-r from-[#DFB873] to-[#C59B53] text-[#140F08] font-bold shadow-md'
                    : 'bg-[#16120E] text-[#D4C8B8] border border-[#C59B53]/25 hover:border-[#C59B53]/60'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 3D Books */}
      {filteredCharacters.length === 0 ? (
        <div className="py-16 text-center bg-[#14110E] rounded-2xl border border-[#C59B53]/25 p-8 space-y-4 max-w-lg mx-auto shadow-xl">
          <GununganSvg className="w-12 h-16 text-[#C59B53]/40 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#F5EFE6]">
            Tokoh Tidak Ditemukan
          </h3>
          <p className="text-xs text-[#D8C8AD] max-w-sm mx-auto leading-relaxed">
            Tidak ada kitab wayang yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Coba cari nama lain seperti Arjuna, Gatotkaca, atau Bima.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-[#C59B53] text-[#0D0C0A] font-semibold text-xs rounded-lg hover:bg-[#ECC47E] transition-colors cursor-pointer"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8 py-4">
          {filteredCharacters.map((char) => (
            <Wayang3DBookCard key={char.id} character={char} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WayangpediaClient;
