import React from 'react';
import { FrameId, getFrameById } from '@/data/photoboothFrames';
import { Sparkles } from 'lucide-react';

/**
 * Cultural Viewfinder Overlay for Live Webcam
 * Displays authentic Javanese framing overlays, motif patterns, corner marks,
 * and edition badges while user is capturing photos.
 */
export function JavaneseViewfinderOverlay({ frameId }: { frameId: FrameId }) {
  const frame = getFrameById(frameId);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden">
      {/* Authentic Visual Frame Overlay: Jepara Woodcarving Top Crown & Bottom Pedestal */}
      {frame.id === 'ukiran-gebyok' && (
        <>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-15 pointer-events-none w-52 sm:w-64 max-w-[70%]">
            <img
              src="/frames/ukiran-jepara-top.png"
              alt="Mahkota Ukiran Gebyok Jepara"
              className="w-full h-auto object-contain drop-shadow-2xl select-none opacity-95 animate-in fade-in duration-300 pointer-events-none"
            />
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-15 pointer-events-none w-48 sm:w-56 max-w-[65%]">
            <img
              src="/frames/ukiran-jepara-bottom.png"
              alt="Umpak Ukiran Gebyok Jepara"
              className="w-full h-auto object-contain drop-shadow-2xl select-none opacity-95 animate-in fade-in duration-300 pointer-events-none"
            />
          </div>
        </>
      )}

      {/* Authentic Visual Frame Overlay: Parang Kencana Batik Border */}
      {frame.id === 'parang-kencana' && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-35"
          style={{
            backgroundImage: "url('/images/batik-parang.png')",
            backgroundRepeat: 'repeat',
            maskImage: 'radial-gradient(circle at center, transparent 65%, black 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent 65%, black 100%)',
          }}
        />
      )}

      {/* Repeating Cultural Motif Watermark Perimeter for All Frames */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-25"
        style={{
          backgroundImage: `url('/images/patterns/${frame.id}.svg')`,
          backgroundRepeat: 'repeat',
          maskImage: 'radial-gradient(circle at center, transparent 72%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 72%, black 100%)',
        }}
      />

      {/* Top Bar with Cultural Edition Badge */}
      <div className="relative z-30 flex items-center justify-between">
        <div
          style={{
            borderColor: frame.palette.accentGold,
            backgroundColor: 'rgba(15, 12, 10, 0.85)',
            color: frame.palette.accentGold,
          }}
          className="px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{frame.javaneseName}</span>
        </div>
        <div className="text-[10px] font-mono text-amber-200/90 bg-black/75 px-2.5 py-1 rounded-lg border border-amber-500/30 backdrop-blur-md">
          Format 1:3 • 4-Cut Strip
        </div>
      </div>

      {/* 4 Cultural Corner Marks */}
      <div className="absolute inset-4 sm:inset-6 pointer-events-none z-20">
        {/* Top-Left */}
        <div
          style={{ borderColor: frame.palette.accentGold }}
          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 drop-shadow-md"
        >
          <div
            style={{ backgroundColor: frame.palette.accentGold }}
            className="w-1.5 h-1.5 absolute top-1 left-1 rounded-full shadow-xs"
          />
        </div>

        {/* Top-Right */}
        <div
          style={{ borderColor: frame.palette.accentGold }}
          className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 drop-shadow-md"
        >
          <div
            style={{ backgroundColor: frame.palette.accentGold }}
            className="w-1.5 h-1.5 absolute top-1 right-1 rounded-full shadow-xs"
          />
        </div>

        {/* Bottom-Left */}
        <div
          style={{ borderColor: frame.palette.accentGold }}
          className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 drop-shadow-md"
        >
          <div
            style={{ backgroundColor: frame.palette.accentGold }}
            className="w-1.5 h-1.5 absolute bottom-1 left-1 rounded-full shadow-xs"
          />
        </div>

        {/* Bottom-Right */}
        <div
          style={{ borderColor: frame.palette.accentGold }}
          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 drop-shadow-md"
        >
          <div
            style={{ backgroundColor: frame.palette.accentGold }}
            className="w-1.5 h-1.5 absolute bottom-1 right-1 rounded-full shadow-xs"
          />
        </div>
      </div>

      {/* Bottom Center Framing Guide */}
      <div className="text-center pb-1 relative z-30">
        <span
          style={{ color: frame.palette.accentGold, borderColor: frame.palette.borderInner }}
          className="text-[10px] font-mono tracking-widest uppercase bg-black/80 px-3.5 py-1 rounded-full border backdrop-blur-md shadow-md inline-block"
        >
          ✦ {frame.name} • NUSWARA PHOTOBOOTH ✦
        </span>
      </div>
    </div>
  );
}

/**
 * Dedicated Viewfinder Overlay for Ukiran Jepara
 */
export function UkiranJeparaViewfinderOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center p-2">
      <img
        src="/frames/frame-ukiran-jepara.png"
        alt="Bingkai Ukiran Jepara"
        className="w-full h-full object-contain pointer-events-none drop-shadow-xl select-none"
      />
    </div>
  );
}

/**
 * Dedicated Viewfinder Overlay for Sugeng Ambal Warsa
 */
export function SugengAmbalWarsaViewfinderOverlay({
  birthdayName = 'Sang Sutresna',
}: {
  birthdayName?: string;
} = {}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
      <img
        src="/frames/frame-sugeng-ambal-warsa.png"
        alt="Bingkai Sugeng Ambal Warsa"
        className="w-full h-full object-contain pointer-events-none drop-shadow-2xl select-none"
      />
      {birthdayName && (
        <div className="absolute bottom-[4.2%] left-1/2 -translate-x-1/2 text-center pointer-events-none w-3/4">
          <span className="text-[11px] sm:text-xs font-serif italic text-amber-200 font-bold tracking-wider drop-shadow-md block truncate">
            ✦ {birthdayName} ✦
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Dedicated Viewfinder Overlay for Klasik Maroon
 */
export function KlasikMaroonViewfinderOverlay({
  coupleText = 'Raden & Ayu',
  hashtagText = '#JawaEpicMoments',
}: {
  coupleText?: string;
  hashtagText?: string;
} = {}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between border-8 border-[#3E1210]">
      <div className="bg-[#3E1210]/95 px-4 py-2.5 flex items-center justify-between text-amber-200 border-b border-amber-600/40 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-serif font-bold text-amber-200 tracking-wider">
            SUN FLOWER • JAWA EPIC
          </span>
        </div>
        <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest">
          BILIK BUDAYA
        </span>
      </div>

      <div className="bg-[#3E1210]/95 px-4 py-3 flex items-center justify-between text-amber-100 border-t border-amber-600/40 backdrop-blur-xs">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/90 block">
            PAWIWAHAN AGENG
          </span>
          <span className="text-sm font-serif italic text-white font-medium">
            {coupleText}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-amber-300 block">
            {hashtagText}
          </span>
          <span className="text-[9px] text-amber-400/70">Weton Mataram</span>
        </div>
      </div>
    </div>
  );
}
