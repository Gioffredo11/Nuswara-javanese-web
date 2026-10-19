import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { characterService } from '@/server/services/character.service';
import Image from 'next/image';
import { getTarotImagePath } from '@/components/ui/WayangVectors';
import {
  ArrowLeft,
  Shield,
  Zap,
  Sparkles,
  GitFork,
  ChevronRight,
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const character = await characterService.getCharacterBySlug(slug);
    return {
      title: `${character.name} (${character.title || 'Wayang'}): Profil Wayangpedia | NUSWARA`,
      description: character.shortDescription,
    };
  } catch {
    return { title: 'Tokoh Tidak Ditemukan | NUSWARA' };
  }
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let character;
  try {
    character = await characterService.getCharacterBySlug(slug);
  } catch {
    notFound();
  }

  const personalities = character.personality || [];

  return (
    <div className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Back */}
        <div className="mb-8">
          <Link
            href="/#wayangpedia"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A89F91] hover:text-[#ECC47E] transition-colors py-1.5 group min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 text-[#B99A60] transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Katalog Wayangpedia</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Visual Vector Badge & Lineage */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#14110E] rounded-2xl border border-[#C59B53]/35 p-6 sm:p-8 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden group">
              {/* Ambient radial backlight behind wayang */}
              <div className="absolute inset-0 bg-radial from-[#C59B53]/15 via-transparent to-transparent pointer-events-none" />

              <span className="relative z-10 text-[10px] font-mono uppercase tracking-[0.2em] text-[#ECC47E] bg-[#241B12] px-3 py-1 rounded-full border border-[#C59B53]/40 mb-4 font-semibold">
                {character.category.name}
              </span>

              <div className="relative z-10 w-64 max-w-full aspect-[9/16] rounded-2xl overflow-hidden border border-[#C59B53]/50 shadow-[0_15px_35px_rgba(0,0,0,0.9)] bg-[#0d0a07] my-3 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={getTarotImagePath(character.slug)}
                  alt={character.name}
                  fill
                  sizes="(max-width: 768px) 256px, 280px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="relative z-10 w-full pt-4 mt-2 border-t border-[#C59B53]/20 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B99A60]">
                  Kasatriyan / Wilayah
                </span>
                <p className="font-royal font-bold text-[#F0E6D4] text-base mt-0.5">
                  {character.kingdom || 'Nusantara'}
                </p>
              </div>
            </div>

            {/* Lineage Info Card */}
            <div className="bg-[#14110E] rounded-xl border border-[#C59B53]/30 p-5 space-y-3 text-xs shadow-lg">
              <h4 className="font-mono uppercase tracking-widest text-[#ECC47E] font-semibold text-[11px]">
                Garis Keturunan &amp; Kekerabatan
              </h4>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[#A89F91]">Neptu Affinity: {character.neptuAffinity || 'Universal'}</span>
                <Link
                  href="/#family-tree"
                  className="text-[#ECC47E] hover:text-white font-medium inline-flex items-center gap-1.5 transition-colors py-1"
                >
                  <GitFork className="w-3.5 h-3.5 text-[#B99A60]" />
                  <span>Bagan Silsilah</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Traits, Philosophy, & Relations */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="text-3xl sm:text-5xl font-royal font-bold text-[#F0E6D4] tracking-tight">
                  {character.name}
                </h1>
                {character.javaneseName && (
                  <span className="text-base font-editorial italic text-[#DFB873]">
                    ({character.javaneseName})
                  </span>
                )}
              </div>
              {character.title && (
                <p className="text-sm font-editorial italic text-[#ECC47E] mt-1.5">
                  {character.title}
                </p>
              )}
              <p className="text-sm sm:text-base text-[#D8C8AD] mt-4 leading-relaxed font-sans font-light">
                {character.shortDescription}
              </p>
            </div>

            {/* Fakta Unik Box */}
            {character.uniqueFacts && (
              <div className="p-5 rounded-xl bg-[#1A140F] border border-[#B99A60]/40 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#ECC47E] tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#B99A60]" />
                  <span>Fakta Unik &amp; Perspektif Budaya</span>
                </div>
                <p className="text-xs sm:text-sm text-[#E2D5C3] italic leading-relaxed font-editorial">
                  &ldquo;{character.uniqueFacts}&rdquo;
                </p>
              </div>
            )}

            {/* Watak & Trait Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-[#14110E] border border-[#C59B53]/30 space-y-3 shadow-lg">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#ECC47E] font-semibold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#B99A60]" />
                  <span>Watak &amp; Karakter Batin</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {personalities.map((trait: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-[#241B12] text-[#D8C8AD] border border-[#C59B53]/20"
                    >
                      {trait}
                    </span>
                  ))}
                  {personalities.length === 0 && (
                    <span className="text-xs text-[#A89F91] italic">Satria Luhur Utama</span>
                  )}
                </div>
              </div>

              {/* Senjata & Aji-aji */}
              <div className="p-5 rounded-xl bg-[#14110E] border border-[#C59B53]/30 space-y-3 shadow-lg">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#ECC47E] font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#B99A60]" />
                  <span>Aji-aji &amp; Pusaka Sakti</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {character.weapons.map((w) => (
                    <span
                      key={w.id}
                      className="text-xs px-2.5 py-1 rounded-md bg-[#241B12] text-[#ECC47E] border border-[#C59B53]/30 font-medium"
                    >
                      {w.name}
                    </span>
                  ))}
                  {character.weapons.length === 0 && (
                    <span className="text-xs text-[#A89F91] italic">Pusaka Kebatinan</span>
                  )}
                </div>
              </div>
            </div>

            {/* Deskripsi Senjata Detail */}
            {character.weapons.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#B99A60] font-semibold">
                  Rincian Pusaka Utama
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {character.weapons.map((w) => (
                    <div
                      key={w.id}
                      className="p-4 rounded-xl bg-[#14110E] border border-[#C59B53]/25 text-xs space-y-1.5 shadow-md"
                    >
                      <span className="font-royal font-bold text-[#F5EFE6] text-sm block">{w.name}</span>
                      <p className="text-[#A89F91] text-xs leading-relaxed font-sans">
                        {w.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filosofi Hidup */}
            {character.philosophies.length > 0 && (
              <div className="p-6 rounded-xl bg-[#18120C] border border-[#B99A60]/45 text-[#F5EFE6] space-y-3 shadow-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B99A60] block font-semibold">
                  Piwulang Luhur • Filosofi Tokoh
                </span>
                <p className="font-editorial text-xl italic text-[#ECC47E]">
                  &ldquo;{character.philosophies[0].title}&rdquo;
                </p>
                <p className="text-xs text-[#D8C8AD] leading-relaxed font-sans">
                  {character.philosophies[0].textJawa}
                </p>
                <p className="text-xs text-[#B9B0A3] leading-relaxed border-t border-[#C59B53]/20 pt-2.5 font-sans">
                  {character.philosophies[0].modernInterpretation}
                </p>
              </div>
            )}

            {/* Tokoh yang Terhubung */}
            {character.relationships.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-[#C59B53]/20">
                <h3 className="font-royal text-lg font-bold text-[#F0E6D4]">
                  Hubungan Kekerabatan &amp; Rekan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {character.relationships.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/wayangpedia/${rel.character.slug}`}
                      className="p-4 rounded-xl bg-[#14110E] border border-[#C59B53]/25 hover:border-[#ECC47E] transition-all flex items-center justify-between text-xs group shadow-md min-h-[44px]"
                    >
                      <div>
                        <span className="font-royal font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] text-sm">
                          {rel.character.name}
                        </span>
                        <p className="text-xs text-[#A89F91] mt-0.5">
                          {rel.type} {rel.note ? `• ${rel.note}` : ''}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#B99A60] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
