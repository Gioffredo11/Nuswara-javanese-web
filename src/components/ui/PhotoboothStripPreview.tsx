import React from 'react';
import { Camera, Sparkles, QrCode } from 'lucide-react';
import { PhotoboothCulturalFrame } from '@/data/photoboothFrames';

interface PhotoboothStripPreviewProps {
  frame: PhotoboothCulturalFrame;
  photos: string[];
  stripUrl: string | null;
  customText?: string;
  customSubtext?: string;
}

/**
 * PhotoboothStripPreview: Live responsive preview of the 4-cut vertical strip (1:3 format).
 * Changes background, borders, typography, and ornaments dynamically when a new frame is selected.
 */
export function PhotoboothStripPreview({
  frame,
  photos,
  stripUrl,
  customText,
  customSubtext,
}: PhotoboothStripPreviewProps) {
  // If high-resolution strip canvas has already rendered the complete PNG, display it
  if (stripUrl && photos.length === 4) {
    return (
      <div className="relative group transition-all duration-300">
        <img
          src={stripUrl}
          alt={`Hasil Photo Strip 4-Cut ${frame.name}`}
          className="max-h-[540px] w-auto rounded-lg shadow-2xl border-2 border-stone-800/20 object-contain mx-auto"
        />
        <div className="absolute top-2 right-2 bg-stone-900/85 backdrop-blur-xs text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
          800 × 2400 PNG High-Res
        </div>
      </div>
    );
  }

  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const slots = [0, 1, 2, 3];

  return (
    <div
      style={{
        backgroundColor: frame.palette.background,
        borderColor: frame.palette.borderOuter,
      }}
      className="w-56 sm:w-60 rounded-xl border-4 shadow-xl p-3 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
    >
      {/* Background SVG Motif Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("${frame.svgPatternUrl}")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Decorative Inner Border Line */}
      <div
        style={{ borderColor: frame.palette.borderInner }}
        className="absolute inset-1.5 border pointer-events-none rounded-lg opacity-70"
      />

      {/* Top Header Branding */}
      <div className="relative text-center pt-2 pb-2.5 z-10">
        <span
          style={{ color: frame.palette.accentGold }}
          className="text-[9px] font-mono uppercase tracking-widest block font-semibold"
        >
          ✦ BILIK NUSWARA ✦
        </span>
        <h4
          style={{ color: frame.palette.textPrimary }}
          className="font-serif font-bold text-base tracking-wider leading-tight"
        >
          NUSWARA
        </h4>
        <span
          style={{
            backgroundColor: frame.palette.badgeBg,
            color: frame.palette.badgeText,
            borderColor: frame.palette.borderInner,
          }}
          className="text-[9px] font-mono px-2 py-0.5 rounded-full inline-block mt-0.5 border"
        >
          {frame.name}
        </span>
      </div>

      {/* 4 Photo Cut Slots */}
      <div className="relative space-y-2 z-10 px-1">
        {slots.map((idx) => {
          const photo = photos[idx];
          return (
            <div key={idx} className="relative">
              <div
                style={{
                  borderColor: frame.palette.borderInner,
                  backgroundColor: frame.palette.cardBg,
                }}
                className="aspect-[4/3] rounded-md border-2 overflow-hidden flex flex-col items-center justify-center relative shadow-sm"
              >
                {photo ? (
                  <img
                    src={photo}
                    alt={`Snap pose ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <Camera
                      style={{ color: frame.palette.accentGold }}
                      className="w-4 h-4 mb-1 opacity-70"
                    />
                    <span
                      style={{ color: frame.palette.textSecondary }}
                      className="text-[10px] font-mono"
                    >
                      Pose #{idx + 1}
                    </span>
                  </div>
                )}

                {/* Inner corner accents */}
                <div
                  style={{ borderColor: frame.palette.accentGold }}
                  className="absolute top-1 left-1 w-2 h-2 border-t border-l opacity-80"
                />
                <div
                  style={{ borderColor: frame.palette.accentGold }}
                  className="absolute top-1 right-1 w-2 h-2 border-t border-r opacity-80"
                />
                <div
                  style={{ borderColor: frame.palette.accentGold }}
                  className="absolute bottom-1 left-1 w-2 h-2 border-b border-l opacity-80"
                />
                <div
                  style={{ borderColor: frame.palette.accentGold }}
                  className="absolute bottom-1 right-1 w-2 h-2 border-b border-r opacity-80"
                />
              </div>

              {/* Divider ornament between photos */}
              {idx < 3 && (
                <div className="flex items-center justify-center gap-1.5 my-1 opacity-60">
                  <div
                    style={{ backgroundColor: frame.palette.borderInner }}
                    className="h-px flex-1"
                  />
                  <span
                    style={{ color: frame.palette.accentGold }}
                    className="text-[8px]"
                  >
                    ✦
                  </span>
                  <div
                    style={{ backgroundColor: frame.palette.borderInner }}
                    className="h-px flex-1"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer with Signature & QR Code */}
      <div className="relative pt-3 pb-2 z-10 px-1 border-t border-dashed mt-2 border-stone-600/30">
        <div className="flex items-end justify-between gap-2">
          {/* Left Text Information */}
          <div className="flex-1 min-w-0">
            <span
              style={{ color: frame.palette.accentGold }}
              className="text-[8px] font-mono uppercase tracking-wider block font-semibold truncate"
            >
              {customText || frame.javaneseName}
            </span>
            <p
              style={{ color: frame.palette.textSecondary }}
              className="text-[9px] font-serif italic truncate leading-snug"
            >
              {customSubtext || frame.philosophy}
            </p>
            <span
              style={{ color: frame.palette.accentGold }}
              className="text-[8px] font-mono block opacity-75 mt-0.5"
            >
              {dateStr}
            </span>
          </div>

          {/* Right QR Code Stamp */}
          <div className="w-10 h-10 bg-white rounded border border-amber-500/40 p-0.5 flex flex-col items-center justify-center shrink-0 shadow-xs">
            <QrCode className="w-7 h-7 text-stone-900" />
            <span className="text-[6px] font-mono text-stone-700 font-bold -mt-0.5">
              NUSWARA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
