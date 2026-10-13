'use client';

import React, { useState } from 'react';
import {
  BatikKawungPatternSvg,
  BatikParangPatternSvg,
} from '@/components/ui/WayangVectors';
import { Eye, Palette, Compass } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface VisualElementItem {
  id: number;
  slug: string;
  kind?: string;
  category?: string;
  name: string;
  javaneseTerm?: string;
  meaning: string;
  characterExamples?: string;
  character?: { name: string; slug: string } | null;
}

interface BatikPatternItem {
  id: number;
  name: string;
  slug: string;
  originRegion: string;
  philosophy: string;
  shortHistory?: string;
  history?: string;
  usage?: string;
  usageRules?: string;
  colorPalette?: any;
  paletteJson?: string | null;
  relatedWayang?: string | null;
  relatedCharacters?: Array<{ character: { name: string; slug: string } }>;
}

export function RagamRupaClient({
  visualElements: initialVisualElements = [],
  batikPatterns: initialBatikPatterns = [],
}: {
  visualElements?: VisualElementItem[];
  batikPatterns?: BatikPatternItem[];
} = {}) {
  const [visualElements, setVisualElements] = useState<VisualElementItem[]>(initialVisualElements);
  const [batikPatterns, setBatikPatterns] = useState<BatikPatternItem[]>(initialBatikPatterns);
  const [activeTab, setActiveTab] = useState<'tatah' | 'batik'>('tatah');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  React.useEffect(() => {
    if (initialVisualElements && initialVisualElements.length > 0) {
      setVisualElements(initialVisualElements);
    } else {
      fetch('/api/visual-elements')
        .then((r) => r.json())
        .then((j) => {
          if (j.data && Array.isArray(j.data)) setVisualElements(j.data);
        })
        .catch(() => {});
    }
  }, [initialVisualElements]);

  React.useEffect(() => {
    if (initialBatikPatterns && initialBatikPatterns.length > 0) {
      setBatikPatterns(initialBatikPatterns);
    } else {
      fetch('/api/batik-patterns')
        .then((r) => r.json())
        .then((j) => {
          if (j.data && Array.isArray(j.data)) setBatikPatterns(j.data);
        })
        .catch(() => {});
    }
  }, [initialBatikPatterns]);

  // Categories for Tatah & Sungging
  const filteredElements = visualElements.filter((el) => {
    if (selectedCategory === 'ALL') return true;
    const cat = el.kind || el.category || '';
    if (selectedCategory === 'EYE_SHAPE') return cat === 'EYE' || cat === 'EYE_SHAPE';
    if (selectedCategory === 'NOSE_SHAPE') return cat === 'NOSE' || cat === 'NOSE_SHAPE';
    if (selectedCategory === 'FACE_COLOR') return cat === 'FACE_COLOR';
    return cat === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <ScrollReveal direction="up" distance={30}>
        <div className="max-w-3xl space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C59B53]">
            <Compass className="w-4 h-4" />
            <span>Ensiklopedia Visual • Tatah Sungging & Batik</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5EFE6] tracking-tight">
            Ragam Corak & Rupa Jawa
          </h1>
          <p className="text-sm sm:text-base text-[#D8C8AD] leading-relaxed font-sans">
            Di balik pahatan kulit dan goresan canting tersimpan bahasa visual yang presisi. Pelajari kode rahasia anatomi wayang serta filosofi adiluhung pola geometris batik Nusantara.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Mode Tabs */}
      <div className="flex border-b border-[#C59B53]/20 mb-10 overflow-x-auto">
        <button
          onClick={() => setActiveTab('tatah')}
          className={`pb-4 px-6 font-serif text-base sm:text-lg font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'tatah'
              ? 'text-[#ECC47E]'
              : 'text-[#D8C8AD]/60 hover:text-[#F5EFE6]'
          }`}
        >
          <span className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#C59B53]" />
            <span>Tatah & Sungging (Anatomi Wayang)</span>
          </span>
          {activeTab === 'tatah' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ECC47E]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('batik')}
          className={`pb-4 px-6 font-serif text-base sm:text-lg font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'batik'
              ? 'text-[#ECC47E]'
              : 'text-[#D8C8AD]/60 hover:text-[#F5EFE6]'
          }`}
        >
          <span className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#C59B53]" />
            <span>Filosofi Motif Batik Jawa</span>
          </span>
          {activeTab === 'batik' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ECC47E]" />
          )}
        </button>
      </div>

      {/* TAB 1: TATAH & SUNGGING */}
      {activeTab === 'tatah' && (
        <div className="space-y-8">
          {/* Sub-filter Category */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-[#C59B53] text-[#0D0C0A] font-bold shadow-md'
                  : 'bg-[#14110E] text-[#D8C8AD] border border-[#C59B53]/20 hover:border-[#C59B53]/50 hover:text-[#F5EFE6]'
              }`}
            >
              Semua Elemen ({visualElements.length})
            </button>
            <button
              onClick={() => setSelectedCategory('EYE_SHAPE')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === 'EYE_SHAPE'
                  ? 'bg-[#C59B53] text-[#0D0C0A] font-bold shadow-md'
                  : 'bg-[#14110E] text-[#D8C8AD] border border-[#C59B53]/20 hover:border-[#C59B53]/50 hover:text-[#F5EFE6]'
              }`}
            >
              Bentuk Mata (Netra)
            </button>
            <button
              onClick={() => setSelectedCategory('NOSE_SHAPE')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === 'NOSE_SHAPE'
                  ? 'bg-[#C59B53] text-[#0D0C0A] font-bold shadow-md'
                  : 'bg-[#14110E] text-[#D8C8AD] border border-[#C59B53]/20 hover:border-[#C59B53]/50 hover:text-[#F5EFE6]'
              }`}
            >
              Bentuk Hidung (Irung)
            </button>
            <button
              onClick={() => setSelectedCategory('FACE_COLOR')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === 'FACE_COLOR'
                  ? 'bg-[#C59B53] text-[#0D0C0A] font-bold shadow-md'
                  : 'bg-[#14110E] text-[#D8C8AD] border border-[#C59B53]/20 hover:border-[#C59B53]/50 hover:text-[#F5EFE6]'
              }`}
            >
              Warna Wajah (Sungging Praenda)
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredElements.map((el, index) => {
              const cat = el.kind || el.category || 'OTHER';
              let badgeColor = 'bg-[#1E1B18] text-[#D8C8AD] border-[#C59B53]/30';
              if (cat === 'EYE' || cat === 'EYE_SHAPE') badgeColor = 'bg-[#172554]/80 text-[#93C5FD] border-[#3B82F6]/40';
              if (cat === 'NOSE' || cat === 'NOSE_SHAPE') badgeColor = 'bg-[#064E3B]/80 text-[#A7F3D0] border-[#10B981]/40';
              if (cat === 'FACE_COLOR') badgeColor = 'bg-[#451A03]/80 text-[#FDE68A] border-[#F59E0B]/40';

              const javaneseTerm = el.javaneseTerm || el.name;
              const characterExamples =
                el.characterExamples || (el.character ? el.character.name : 'Berbagai Tokoh Wayang');

              return (
                <ScrollReveal
                  key={el.id}
                  direction="up"
                  distance={30}
                  delay={(index % 6) * 60}
                  className="h-full flex flex-col"
                >
                  <div className="bg-[#14110E] rounded-2xl border border-[#C59B53]/20 p-6 flex flex-col justify-between shadow-xl hover:border-[#C59B53]/60 transition-all space-y-4 relative overflow-hidden group h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C59B53]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#C59B53]/10 transition-colors" />
                    
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase border ${badgeColor}`}>
                          {cat.replace('_', ' ')}
                        </span>
                        <span className="font-mono text-[#D8C8AD]/50 text-[11px]">
                          ID #{el.id}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors">
                        {el.name}
                      </h3>
                      <p className="text-xs font-mono text-[#ECC47E] font-medium">
                        Istilah: {javaneseTerm}
                      </p>

                      <p className="text-xs text-[#D8C8AD] leading-relaxed font-sans">
                        {el.meaning}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#C59B53]/15 text-xs relative z-10">
                      <span className="text-[10px] font-mono uppercase text-[#C59B53] block font-semibold">
                        Contoh Tokoh Wayang
                      </span>
                      <p className="font-medium text-[#F5EFE6] mt-1">
                        {characterExamples}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: FILOSOFI BATIK */}
      {activeTab === 'batik' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {batikPatterns.map((pattern, index) => {
            const palette: string[] = (() => {
              if (Array.isArray(pattern.colorPalette)) return pattern.colorPalette as string[];
              try {
                return JSON.parse(pattern.paletteJson || '[]');
              } catch {
                return [];
              }
            })();

            const history = pattern.shortHistory || pattern.history || '';
            const usage = pattern.usage || pattern.usageRules || '';
            const relatedWayang =
              pattern.relatedWayang ||
              pattern.relatedCharacters?.map((rc) => rc.character.name).join(', ') ||
              'Tradisi Jawa Adiluhung';

            return (
              <ScrollReveal
                key={pattern.id}
                direction="up"
                distance={35}
                delay={(index % 4) * 120}
                className="h-full flex flex-col"
              >
                <div className="bg-[#14110E] rounded-2xl border border-[#C59B53]/20 overflow-hidden shadow-xl flex flex-col justify-between p-6 sm:p-8 space-y-6 hover:border-[#C59B53]/60 transition-all group relative h-full">
                  <div className="space-y-6">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between text-xs font-mono text-[#D8C8AD] mb-2">
                      <span className="text-[#C59B53] font-semibold">{pattern.originRegion}</span>
                      <div className="flex items-center gap-1.5">
                        {palette.map((color, idx) => (
                          <span
                            key={idx}
                            className="w-4 h-4 rounded-full border border-[#C59B53]/40 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors">
                      {pattern.name}
                    </h3>

                    {/* Vector Illustration Display */}
                    <div className="my-6 p-8 rounded-xl bg-[#0D0C0A] border border-[#C59B53]/30 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-radial-gradient opacity-20 pointer-events-none" />
                      {pattern.slug === 'kawung' ? (
                        <BatikKawungPatternSvg className="w-24 h-24 text-[#ECC47E] drop-shadow-[0_0_15px_rgba(197,155,83,0.35)]" />
                      ) : (
                        <BatikParangPatternSvg className="w-24 h-24 text-[#ECC47E] drop-shadow-[0_0_15px_rgba(197,155,83,0.35)]" />
                      )}
                    </div>

                    {/* Philosophy */}
                    <div className="space-y-2">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-[#C59B53] font-semibold">
                        Makna Filosofis
                      </h4>
                      <p className="text-xs sm:text-sm text-[#D8C8AD] leading-relaxed font-sans">
                        {pattern.philosophy}
                      </p>
                    </div>

                    {/* History & Usage */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#C59B53]/15 text-xs">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#C59B53] block font-semibold">
                          Latar Sejarah
                        </span>
                        <p className="text-[#D8C8AD]/90 mt-1 leading-relaxed text-[11px]">
                          {history}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#C59B53] block font-semibold">
                          Kaidah Pemakaian
                        </span>
                        <p className="text-[#D8C8AD]/90 mt-1 leading-relaxed text-[11px]">
                          {usage}
                        </p>
                      </div>
                    </div>
                  </div>

                  {relatedWayang && (
                    <div className="pt-4 border-t border-[#C59B53]/15 text-xs flex items-center justify-between text-[#D8C8AD]">
                      <span className="text-[#D8C8AD]/60">Tokoh Wayang Terkait:</span>
                      <span className="font-semibold text-[#ECC47E]">{relatedWayang}</span>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
