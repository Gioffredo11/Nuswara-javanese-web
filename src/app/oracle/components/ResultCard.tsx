'use client';

import React from 'react';
import { Download, Share2, Check, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from '@/components/common/Link';
import {
  GununganSvg,
  WayangFigureBySlug,
} from '@/components/ui/WayangVectors';

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

// Selects vector art matching character slug
function CharacterVector({ slug }: { slug: string }) {
  return (
    <div className="h-36 xs:h-44 sm:h-56 w-auto flex items-center justify-center filter drop-shadow-[0_0_24px_rgba(245,158,11,0.7)] transition-transform duration-300 hover:scale-105">
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
      <div className="relative aspect-[2/3] w-full max-w-[330px] sm:max-w-[390px] mx-auto rounded-3xl bg-gradient-to-b from-[#2E1308] via-[#1E0903] to-[#120401] p-2.5 sm:p-4 shadow-2xl border-2 border-amber-400/80 ring-1 ring-amber-300/40 ring-offset-2 sm:ring-offset-4 ring-offset-[#1C0A04] flex flex-col justify-between overflow-hidden select-none">
        {/* Subtle Parang Batik Motif Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 bg-repeat rounded-3xl"
          style={{
            backgroundImage: "url('/images/batik-parang.png')",
            backgroundSize: '130px 130px',
          }}
        />

        {/* Ambient Candlelight Radial Aura behind character */}
        <div className="absolute inset-0 bg-radial from-amber-500/25 via-transparent to-transparent pointer-events-none" />

        {/* Inner Gold Frame Border */}
        <div className="relative z-10 w-full h-full rounded-2xl border border-amber-400/40 p-4 sm:p-5 flex flex-col justify-between overflow-hidden bg-radial from-amber-950/20 to-transparent">
          {/* Corner Flourishes */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-300" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-300" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-300" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-300" />

          {/* Top Bar: Title & Identity */}
          <div className="relative z-10 text-center space-y-1">
            <div className="flex items-center justify-between text-[10px] font-sans font-bold tracking-widest text-amber-300/90 uppercase border-b border-amber-500/30 pb-1.5">
              <span className="flex items-center gap-1 font-royal tracking-widest">
                <Sparkles className="w-3 h-3 text-amber-400" />
                NUSWARA
              </span>
              <span className="font-royal tracking-widest">KARTU TAROT JAWA</span>
              <span>NO. {result.totalNeptu}</span>
            </div>

            <p className="text-[11px] font-sans text-amber-200/80 pt-1 tracking-wide">
              Arketipe Jiwa: <strong className="text-amber-100">{result.visitorName}</strong>
            </p>
          </div>

          {/* Centerpiece: High-Fidelity Character Wayang Artwork */}
          <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center">
            <CharacterVector slug={result.character.slug} />

            {/* Glowing Golden Aura Floor Reflection */}
            <div className="w-32 h-3 rounded-full bg-amber-400/30 blur-md -mt-2" />
          </div>

          {/* Bottom Identity & Weton Box */}
          <div className="relative z-10 text-center space-y-2 border-t border-amber-500/30 pt-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 tracking-tight leading-tight drop-shadow-sm">
                {result.character.name}
              </h2>
              <p className="text-[11px] sm:text-xs font-serif italic text-amber-300/90 line-clamp-1">
                &ldquo;{result.character.title}&rdquo;
              </p>
            </div>

            {/* Weton & Neptu Golden Ribbon */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/60 px-3 py-1 rounded-full shadow-xs">
              <span className="text-xs font-serif font-bold text-amber-100">
                {result.wetonName || `${result.hari} ${result.pasaran}`}
              </span>
              <span className="text-amber-400">•</span>
              <span className="text-xs font-sans font-bold text-amber-300">
                Neptu {result.totalNeptu}
              </span>
            </div>

            {/* Philosophical Mantra */}
            <p className="text-[10.5px] sm:text-[11.5px] font-sans text-amber-100/90 leading-snug max-w-xs mx-auto line-clamp-2 pt-0.5">
              {result.matchReason || result.character.philosophy}
            </p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS ROW: UNDUH, BAGIKAN, HITUNG ULANG */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Tombol Unduh */}
          <button
            type="button"
            onClick={onDownload}
            disabled={downloading}
            className="py-3 px-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 disabled:opacity-60 text-stone-950 font-bold text-xs rounded-xl shadow-lg border border-amber-300 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            {downloading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-stone-950 stroke-[2.5]" />
                <span>Menyiapkan PNG...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-stone-950" />
                <span>Unduh PNG</span>
              </>
            )}
          </button>

          {/* Tombol Bagikan / Salin Tautan */}
          <button
            type="button"
            onClick={onShare}
            className="py-3 px-3 bg-[#2C1308] hover:bg-[#3D1A0A] text-amber-100 font-bold text-xs rounded-xl border border-amber-500/50 hover:border-amber-400 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-amber-400" />
                <span>Tautan Disalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Salin Tautan</span>
              </>
            )}
          </button>

          {/* Tombol Bagikan ke WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `✨ Hasil Ramalan Oracle Weton Jawa (NUSWARA):\n\nNama: ${result.visitorName}\nWeton: ${result.wetonName || `${result.hari} ${result.pasaran}`} (Neptu ${result.totalNeptu})\nArketipe Wayang: ${result.character.name} ("${result.character.title}")\n\nCek weton dan temukan tokoh wayang pelindungmu di NUSWARA:\n${typeof window !== 'undefined' ? window.location.origin + (result.shareCode ? `/share/${result.shareCode}` : '/#oracle') : ''}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3 bg-[#172312] hover:bg-[#223319] text-emerald-200 font-bold text-xs rounded-xl border border-emerald-500/40 hover:border-emerald-400 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-98"
            aria-label="Bagikan hasil ke WhatsApp"
          >
            <span>WhatsApp ↗</span>
          </a>
        </div>

        {/* Secondary: Pelajari Karakter di Wayangpedia & Hitung Ulang */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
          <Link
            href={`/wayangpedia/${result.character.slug}`}
            className="inline-flex items-center gap-1.5 text-[#ECC47E] hover:text-[#F5EFE6] font-serif font-bold transition-colors underline-offset-4 hover:underline"
          >
            <span>Pelajari Kisah Lengkap {result.character.name}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-[#D8C8AD] hover:text-[#F5EFE6] font-sans transition-colors cursor-pointer py-1.5 px-3 rounded-lg bg-[#14110E] hover:bg-[#1F1914] border border-[#C59B53]/30"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#C59B53]" />
            <span>Hitung untuk Nama Lain</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
