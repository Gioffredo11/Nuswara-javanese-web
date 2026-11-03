'use client';

import React, { useState } from 'react';
import { Search, Volume2, ArrowUpRight, BookOpen, Layers } from 'lucide-react';
import { speakJavanesePhonetics, playLontarClickSound } from '@/lib/audio/woodClick';

interface CharacterAtlasItem {
  glyph: string;
  pasangan?: string;
  latin: string;
  category: 'nglegena' | 'pasangan' | 'sandhangan' | 'murda' | 'swara' | 'rekan' | 'angka' | 'pada';
  codepoint: string;
  description: string;
  example: string;
  meaning: string;
}

export const CHARACTER_ATLAS: CharacterAtlasItem[] = [
  // 20 Nglegena
  { glyph: 'ꦲ', pasangan: '꧀ꦲ', latin: 'Ha', category: 'nglegena', codepoint: 'U+A9B2', description: 'Nafas urip / Purwaka', example: 'ꦲꦤ (ana)', meaning: 'Ada / wujud keberadaan' },
  { glyph: 'ꦤ', pasangan: '꧀ꦤ', latin: 'Na', category: 'nglegena', codepoint: 'U+A9A4', description: 'Nur / Petunjuk batin', example: 'ꦤꦭ (nala)', meaning: 'Hati nurani' },
  { glyph: 'ꦕ', pasangan: '꧀ꦕ', latin: 'Ca', category: 'nglegena', codepoint: 'U+A995', description: 'Cipta / Pikiran jernih', example: 'ꦕꦫ (cara)', meaning: 'Metode atau tata laku' },
  { glyph: 'ꦫ', pasangan: '꧀ꦫ', latin: 'Ra', category: 'nglegena', codepoint: 'U+A9AB', description: 'Rasa / Jiwa murni', example: 'ꦫꦱ (rasa)', meaning: 'Kepekaan batiniah' },
  { glyph: 'ꦏ', pasangan: '꧀ꦏ', latin: 'Ka', category: 'nglegena', codepoint: 'U+A98F', description: 'Karsa / Kehendak suci', example: 'ꦏꦂꦱ (karsa)', meaning: 'Niat dan tekad' },
  { glyph: 'ꦢ', pasangan: '꧀ꦢ', latin: 'Da', category: 'nglegena', codepoint: 'U+A9A2', description: 'Denta / Zat Gusti', example: 'ꦢꦢꦶ (dadi)', meaning: 'Menjadi / terwujud' },
  { glyph: 'ꦠ', pasangan: '꧀ꦠ', latin: 'Ta', category: 'nglegena', codepoint: 'U+A9A0', description: 'Tatag / Keteguhan iman', example: 'ꦠꦠ (tata)', meaning: 'Ketertiban lahir batin' },
  { glyph: 'ꦱ', pasangan: '꧀ꦱ', latin: 'Sa', category: 'nglegena', codepoint: 'U+A9B1', description: 'Sembah / Keselarasan', example: 'ꦱꦫꦶ (sari)', meaning: 'Intisari kebajikan' },
  { glyph: 'ꦮ', pasangan: '꧀ꦮ', latin: 'Wa', category: 'nglegena', codepoint: 'U+A9AE', description: 'Waspada / Mawas diri', example: 'ꦮꦪꦁ (wayang)', meaning: 'Bayangan hakikat hidup' },
  { glyph: 'ꦭ', pasangan: '꧀ꦭ', latin: 'La', category: 'nglegena', codepoint: 'U+A9AD', description: 'Laras / Ketenangan jiwa', example: 'ꦭꦏꦸ (laku)', meaning: 'Perjalanan tirakat' },
  { glyph: 'ꦥ', pasangan: '꧀ꦥ', latin: 'Pa', category: 'nglegena', codepoint: 'U+A9A5', description: 'Pangucap / Kebenaran tutur', example: 'ꦥꦸꦱꦏ (pusaka)', meaning: 'Warisan adiluhung' },
  { glyph: 'ꦝ', pasangan: '꧀ꦝ', latin: 'Dha', category: 'nglegena', codepoint: 'U+A99D', description: 'Dhedhep / Hening jiwa', example: 'ꦝꦮꦸꦃ (dhawuh)', meaning: 'Titah atau petunjuk' },
  { glyph: 'ꦗ', pasangan: '꧀ꦗ', latin: 'Ja', category: 'nglegena', codepoint: 'U+A997', description: 'Jumeneng / Berdiri tegak', example: 'ꦗꦒꦢ꧀ (jagad)', meaning: 'Alam semesta semesta' },
  { glyph: 'ꦪ', pasangan: '꧀ꦪ', latin: 'Ya', category: 'nglegena', codepoint: 'U+A9AA', description: 'Yakin / Keteguhan kalbu', example: 'ꦪꦺꦏ꧀ꦠꦶ (yekti)', meaning: 'Kebenaran sejati' },
  { glyph: 'ꦚ', pasangan: '꧀ꦚ', latin: 'Nya', category: 'nglegena', codepoint: 'U+A99A', description: 'Nyawiji / Manunggal tekad', example: 'ꦚꦮ (nyawa)', meaning: 'Nafas kehidupan' },
  { glyph: 'ꦩ', pasangan: '꧀ꦩ', latin: 'Ma', category: 'nglegena', codepoint: 'U+A9A9', description: 'Madep / Fokus tujuan', example: 'ꦩꦸꦂꦤꦶ (murni)', meaning: 'Kesucian tanpa pamrih' },
  { glyph: 'ꦒ', pasangan: '꧀ꦒ', latin: 'Ga', category: 'nglegena', codepoint: 'U+A992', description: 'Gusti / Sang Hyang Tunggal', example: 'ꦒꦸꦫꦸ (guru)', meaning: 'Pembimbing sejati' },
  { glyph: 'ꦧ', pasangan: '꧀ꦧ', latin: 'Ba', category: 'nglegena', codepoint: 'U+A9A7', description: 'Budi / Luhur akhlak', example: 'ꦧꦸꦢꦶ (budi)', meaning: 'Pekerti kebaikan' },
  { glyph: 'ꦛ', pasangan: '꧀ꦛ', latin: 'Tha', category: 'nglegena', codepoint: 'U+A99B', description: 'Thukul / Tumbuh bijaksana', example: 'ꦛꦸꦏꦸꦭ꧀ (thukul)', meaning: 'Tumbuh berkembang' },
  { glyph: 'ꦔ', pasangan: '꧀ꦔ', latin: 'Nga', category: 'nglegena', codepoint: 'U+A994', description: 'Ngulati / Menuntut ilmu', example: 'ꦔꦺꦭ꧀ꦩꦸ (ngelmu)', meaning: 'Pengetahuan hakikat' },

  // Sandhangan
  { glyph: 'ꦶ', latin: 'Wulu (-i)', category: 'sandhangan', codepoint: 'U+A9B6', description: 'Vokal i di atas aksara', example: 'ꦱꦶꦠꦶ (siti)', meaning: 'Tanah bumi' },
  { glyph: 'ꦸ', latin: 'Suku (-u)', category: 'sandhangan', codepoint: 'U+A9B8', description: 'Vokal u di bawah aksara', example: 'ꦧꦸꦏꦸ (buku)', meaning: 'Kitab pustaka' },
  { glyph: 'ꦺ', latin: 'Taling (é)', category: 'sandhangan', codepoint: 'U+A9BA', description: 'Vokal é di depan aksara', example: 'ꦱꦺꦒ (sega)', meaning: 'Nasi hidangan' },
  { glyph: 'ꦼ', latin: 'Pepet (ě)', category: 'sandhangan', codepoint: 'U+A9BC', description: 'Vokal ě tengah di atas', example: 'ꦱꦼꦒꦫ (segara)', meaning: 'Lautan luas' },
  { glyph: 'ꦺꦴ', latin: 'Taling Tarung (-o)', category: 'sandhangan', codepoint: 'U+A9BA+B4', description: 'Vokal o menjepit aksara', example: 'ꦏꦺꦴꦠ (kota)', meaning: 'Wilayah praja' },
  { glyph: 'ꦁ', latin: 'Cecak (-ng)', category: 'sandhangan', codepoint: 'U+A981', description: 'Anuswara hidung akhir', example: 'ꦮꦪꦁ (wayang)', meaning: 'Wayang kelir' },
  { glyph: 'ꦂ', latin: 'Layar (-r)', category: 'sandhangan', codepoint: 'U+A982', description: 'Konsonan r mati di atas', example: 'ꦭꦸꦲꦸꦂ (luhur)', meaning: 'Kemuliaan budi' },
  { glyph: 'ꦃ', latin: 'Wignyan (-h)', category: 'sandhangan', codepoint: 'U+A983', description: 'Konsonan h aspirasi akhir', example: 'ꦒꦒꦃ (gagah)', meaning: 'Ksatria tangguh' },
  { glyph: 'ꦿ', latin: 'Cakra (-ra)', category: 'sandhangan', codepoint: 'U+A9BF', description: 'Sisipan ra di bawah', example: 'ꦱꦱ꧀ꦠꦿ (sastra)', meaning: 'Tulis dan ilmu' },
  { glyph: 'ꦾ', latin: 'Pengkal (-ya)', category: 'sandhangan', codepoint: 'U+A9BE', description: 'Sisipan ya di samping', example: 'ꦏꦾꦲꦶ (kyai)', meaning: 'Ulama panutan' },
  { glyph: 'ꦽ', latin: 'Keret (-rě)', category: 'sandhangan', codepoint: 'U+A9BD', description: 'Sisipan rě pepet', example: 'ꦏꦽꦠ (kreta)', meaning: 'Kereta kencana' },
  { glyph: '꧀', latin: 'Pangkon (Virama)', category: 'sandhangan', codepoint: 'U+A9C0', description: 'Pemati vokal konsonan', example: 'ꦲꦤꦏ꧀ (anak)', meaning: 'Putra ksatria' },

  // Murda & Swara
  { glyph: 'ꦟ', pasangan: '꧀ꦟ', latin: 'Murda Na', category: 'murda', codepoint: 'U+A99F', description: 'Kapital kehormatan Na', example: 'ꦟꦒꦫ (Nagara)', meaning: 'Negara berdaulat' },
  { glyph: 'ꦑ', pasangan: '꧀ꦑ', latin: 'Murda Ka', category: 'murda', codepoint: 'U+A991', description: 'Kapital kehormatan Ka', example: 'ꦑꦂꦠꦶꦤꦶ (Kartini)', meaning: 'Pahlawan emansipasi' },
  { glyph: 'ꦡ', pasangan: '꧀ꦡ', latin: 'Murda Ta', category: 'murda', codepoint: 'U+A9A1', description: 'Kapital kehormatan Ta', example: 'ꦡꦸꦩꦼꦁꦒꦸꦁ (Tumenggung)', meaning: 'Gelar panglima' },
  { glyph: 'ꦯ', pasangan: '꧀ꦯ', latin: 'Murda Sa', category: 'murda', codepoint: 'U+A9AF', description: 'Kapital kehormatan Sa', example: 'ꦯꦱ꧀ꦠꦿ (Sastra)', meaning: 'Sastra luhur' },
  { glyph: 'ꦦ', pasangan: '꧀ꦦ', latin: 'Murda Pa', category: 'murda', codepoint: 'U+A9A6', description: 'Kapital kehormatan Pa', example: 'ꦦꦤ꧀ꦝꦮ (Pandhawa)', meaning: 'Lima ksatria' },
  { glyph: 'ꦄ', latin: 'Swara A', category: 'swara', codepoint: 'U+A984', description: 'Vokal mandiri A', example: 'ꦄꦂꦗꦸꦤ (Arjuna)', meaning: 'Ksatria penengah' },
  { glyph: 'ꦆ', latin: 'Swara I', category: 'swara', codepoint: 'U+A986', description: 'Vokal mandiri I', example: 'ꦆꦤ꧀ꦢꦿ (Indra)', meaning: 'Dewa langit' },
  { glyph: 'ꦈ', latin: 'Swara U', category: 'swara', codepoint: 'U+A988', description: 'Vokal mandiri U', example: 'ꦈꦠꦫ (Utara)', meaning: 'Arah lereng' },
  { glyph: 'ꦌ', latin: 'Swara E', category: 'swara', codepoint: 'U+A98C', description: 'Vokal mandiri E', example: 'ꦌꦏ (Eka)', meaning: 'Tunggal esa' },
  { glyph: 'ꦎ', latin: 'Swara O', category: 'swara', codepoint: 'U+A98E', description: 'Vokal mandiri O', example: 'ꦎꦥ꦳ꦶꦱꦶꦪꦭ꧀ (Ofisial)', meaning: 'Resmi' },
];

interface KamusAksaraViewProps {
  onSelectSpecimen: (text: string) => void;
}

export function KamusAksaraView({ onSelectSpecimen }: KamusAksaraViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredItems = CHARACTER_ATLAS.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      item.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.glyph.includes(searchQuery) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest bg-[#B84A27]/15 text-[#B84A27] dark:bg-[#E06D44]/15 dark:text-[#E06D44] uppercase font-bold">
            Kamus & Karakter Atlas
          </span>
          <span className="text-xs text-[#78716C] dark:text-[#8C857B]">
            Standar Unicode U+A980–U+A9DF
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#181615] dark:text-[#F4F1EA]">
          Atlas Aksara Jawa & Sandhangan
        </h2>
        <p className="text-sm text-[#57534E] dark:text-[#A8A29E] mt-1 max-w-3xl">
          Eksplorasi seluruh rumpun karakter Hanacaraka: Aksara Nglegena, Pasangan pemutus vokal, Sandhangan swara, serta aksara kehormatan Murda dan Swara.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#F3EFE6] dark:bg-[#1A1D24] border border-[#E5DEC9] dark:border-[#2E3340] mb-8">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C] dark:text-[#8C857B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari aksara, nama Latin, arti, atau kodepoint..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-[#121316] text-[#181615] dark:text-[#F4F1EA] text-sm border border-[#E5DEC9] dark:border-[#2E3340] focus:border-[#B84A27] focus:outline-none placeholder:text-[#78716C]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'nglegena', label: 'Nglegena' },
            { id: 'sandhangan', label: 'Sandhangan' },
            { id: 'murda', label: 'Murda' },
            { id: 'swara', label: 'Swara' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-[#B84A27] dark:bg-[#E06D44] text-white'
                  : 'bg-white dark:bg-[#222630] text-[#57534E] dark:text-[#A8A29E] hover:text-[#181615] dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.codepoint + item.latin}
            className="group flex flex-col justify-between p-5 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E5DEC9] dark:border-[#2E3340] hover:border-[#B84A27]/60 dark:hover:border-[#E06D44]/60 transition-all hover:shadow-lg"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-[#78716C] dark:text-[#8C857B] font-medium">
                  {item.codepoint}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#F3EFE6] dark:bg-[#222630] text-[#57534E] dark:text-[#A8A29E]">
                  {item.category}
                </span>
              </div>

              {/* Central Large Glyph */}
              <div className="flex items-center justify-center py-4 bg-[#FBF9F5] dark:bg-[#121316] rounded-lg border border-[#E5DEC9]/60 dark:border-[#2E3340]/60 mb-4">
                <span className="aksara-jawa text-4xl text-[#181615] dark:text-[#F4F1EA] group-hover:scale-110 transition-transform">
                  {item.glyph}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#181615] dark:text-[#F4F1EA]">
                    {item.latin}
                  </h3>
                  {item.pasangan && (
                    <span className="text-xs text-[#78716C] dark:text-[#8C857B]">
                      Pasangan: <span className="aksara-jawa text-sm font-semibold">{item.pasangan}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#57534E] dark:text-[#A8A29E] mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Example in context */}
              <div className="p-2.5 rounded-md bg-[#F3EFE6] dark:bg-[#222630]/60 text-xs mb-4">
                <span className="text-[10px] font-mono text-[#78716C] dark:text-[#8C857B] block uppercase tracking-wide">
                  Contoh:
                </span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="aksara-jawa text-base text-[#181615] dark:text-[#F4F1EA] font-medium">
                    {item.example}
                  </span>
                  <span className="text-[11px] text-[#57534E] dark:text-[#A8A29E] italic">
                    {item.meaning}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Actions: Speech & Try in Studio */}
            <div className="flex items-center gap-2 pt-3 border-t border-[#E5DEC9] dark:border-[#2E3340]">
              <button
                onClick={() => {
                  playLontarClickSound();
                  speakJavanesePhonetics(item.latin);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3EFE6] dark:bg-[#222630] hover:bg-[#B84A27]/15 dark:hover:bg-[#E06D44]/15 text-xs text-[#57534E] dark:text-[#A8A29E] hover:text-[#B84A27] dark:hover:text-[#E06D44] transition-colors"
                title="Dengarkan pelafalan fonetis"
                aria-label={`Dengarkan pelafalan huruf ${item.latin}`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Bunyi</span>
              </button>

              <button
                onClick={() => {
                  playLontarClickSound();
                  onSelectSpecimen(item.latin);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-[#B84A27] dark:bg-[#E06D44] hover:bg-[#9A3B1C] dark:hover:bg-[#F0825B] text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <span>Coba di Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

