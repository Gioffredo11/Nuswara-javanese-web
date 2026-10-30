'use client';

import React from 'react';
import { Download, Share2, Check, RefreshCw, ExternalLink } from 'lucide-react';
import { Link } from '@/components/common/Link';
import { WayangFigureBySlug } from '@/components/ui/WayangVectors';

export interface OracleResultData {
  visitorName: string;
  birthDate: string;
  wetonName: string;
  hari: string;
  pasaran: string;
  totalNeptu: number;
  auraTitle: string;
  summary: string;
  character: {
    id: number;
    name: string;
    slug: string;
    title: string;
    shortDescription: string;
    lineArt: string | null;
    philosophy: string;
  };
  matchReason: string;
  compatibilityAdvice: string;
  lakonGuidance: string;
  shareCode: string;
}

interface ResultCardProps {
  result: OracleResultData;
  onDownload: () => void;
  downloading: boolean;
  onShare: () => void;
  copied: boolean;
  onReset: () => void;
}

function CharacterVector({ slug }: { slug: string }) {
  return (
    <div className="h-36 xs:h-44 sm:h-56 w-auto flex items-center justify-center filter drop-shadow-[0_0_24px_rgba(197,160,89,0.5)] transition-transform duration-300 hover:scale-105">
      <WayangFigureBySlug slug={slug} className="h-36 xs:h-44 sm:h-56 w-auto object-contain" />
    </div>
  );
}

export function ResultCard({
  result,
  onDownload,
  downloading,
  onShare,
  copied,
  onReset,
}: ResultCardProps) {
  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
      {/* 2:3 ASPECT RATIO JAVANESE TAROT CARD */}
      <div className="relative aspect-[2/3] w-full max-w-[330px] sm:max-w-[390px] mx-auto bg-[#14110E] p-3 sm:p-4 shadow-2xl border border-[#C5A059]/60 flex flex-col justify-between overflow-hidden select-none rounded-2xl">
        {/* Ambient Candlelight Radial Aura behind character */}
        <div className="absolute inset-0 bg-radial from-[#C5A059]/15 via-transparent to-transparent pointer-events-none" />

        {/* Inner Gold Frame Border */}
        <div className="relative z-10 w-full h-full border border-[#C5A059]/30 p-4 sm:p-5 flex flex-col justify-between overflow-hidden bg-[#0C0A08] rounded-xl">
          {/* Corner Reticle Flourishes */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C5A059]" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C5A059]" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#C5A059]" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C5A059]" />

          {/* Top Bar: Title & Identity */}
          <div className="relative z-10 text-center space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-[#C5A059] uppercase border-b border-[#C5A059]/20 pb-1.5">
              <span className="tracking-widest">NUSWARA</span>
              <span className="tracking-widest">KARTU TAROT JAWA</span>
              <span>NO. {result.totalNeptu}</span>
            </div>

            <p className="text-[11px] font-mono text-[#A89F91] pt-1 tracking-wide uppercase">
              Arketipe Jiwa: <strong className="text-[#F4EFE6]">{result.visitorName}</strong>
            </p>
          </div>

          {/* Centerpiece: Character Wayang Artwork */}
          <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center">
            <CharacterVector slug={result.character.slug} />
            <div className="w-32 h-2 bg-[#C5A059]/20 blur-sm -mt-1" />
          </div>

          {/* Bottom Identity & Weton Box */}
          <div className="relative z-10 text-center space-y-2 border-t border-[#C5A059]/20 pt-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-royal font-bold text-[#F4EFE6] tracking-tight leading-tight">
                {result.character.name}
              </h2>
              <p className="text-[11px] sm:text-xs font-editorial italic text-[#C5A059] line-clamp-1">
                &ldquo;{result.character.title}&rdquo;
              </p>
            </div>

            {/* Weton & Neptu Ribbon */}
            <div className="inline-flex items-center gap-2 bg-[#14110E] border border-[#C5A059]/40 px-3.5 py-1 font-mono text-xs rounded-full">
              <span className="font-bold text-[#F4EFE6]">
                {result.wetonName || `${result.hari} ${result.pasaran}`}
              </span>
              <span className="text-[#C5A059]">•</span>
              <span className="font-bold text-[#C5A059]">
                NEPTU {result.totalNeptu}
              </span>
            </div>

            {/* Philosophical Mantra */}
            <p className="text-[11px] font-sans text-[#A89F91] leading-snug max-w-xs mx-auto line-clamp-2 pt-0.5">
              {result.matchReason || result.character.philosophy}
            </p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS ROW */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Tombol Unduh */}
          <button
            type="button"
            onClick={onDownload}
            disabled={downloading}
            className="py-3.5 px-3 bg-[#C5A059] hover:bg-[#D5B36E] disabled:opacity-60 text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all rounded-xl cursor-pointer"
          >
            {downloading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#0C0A08]" />
                <span>Menyiapkan...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#0C0A08]" />
                <span>Unduh PNG</span>
              </>
            )}
          </button>

          {/* Tombol Bagikan / Salin Tautan */}
          <button
            type="button"
            onClick={onShare}
            className="py-3.5 px-3 bg-[#14110E] hover:bg-[#1C1610] text-[#C5A059] hover:text-[#F4EFE6] font-mono text-xs uppercase tracking-wider border border-[#C5A059]/40 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>Tautan Disalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#C5A059]" />
                <span>Salin Tautan</span>
              </>
            )}
          </button>

          {/* Tombol Bagikan ke WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `Hasil Ramalan Oracle Weton Jawa (NUSWARA):\n\nNama: ${result.visitorName}\nWeton: ${result.wetonName || `${result.hari} ${result.pasaran}`} (Neptu ${result.totalNeptu})\nArketipe Wayang: ${result.character.name} ("${result.character.title}")\n\nCek wetonmu di NUSWARA:\n${typeof window !== 'undefined' ? window.location.origin + (result.shareCode ? `/share/${result.shareCode}` : '/#oracle') : ''}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-3 bg-[#0C0A08] hover:bg-[#14110E] text-emerald-400 font-mono text-xs uppercase tracking-wider border border-emerald-500/40 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            aria-label="Bagikan hasil ke WhatsApp"
          >
            <span>WhatsApp ↗</span>
          </a>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono">
          <Link
            href={`/wayangpedia/${result.character.slug}`}
            className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#F4EFE6] font-bold transition-colors underline-offset-4 hover:underline"
          >
            <span>Pelajari Profil {result.character.name}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-[#A89F91] hover:text-[#F4EFE6] transition-colors cursor-pointer py-1.5 px-3.5 bg-[#14110E] hover:bg-[#1C1610] border border-[#C5A059]/30 rounded-xl"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Hitung untuk Nama Lain</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;