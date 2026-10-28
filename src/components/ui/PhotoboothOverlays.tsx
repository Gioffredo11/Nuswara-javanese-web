import React from 'react';
import { FrameId, getFrameById } from '@/data/photoboothFrames';

/**
 * Cultural Viewfinder Overlay for Live Webcam
 * Displays subtle, non-intrusive authentic Javanese corner framing marks and
 * edition badge while user is capturing photos.
 */
export function JavaneseViewfinderOverlay({ frameId }: { frameId: FrameId }) {
  const frame = getFrameById(frameId);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3 sm:p-5 select-none">
      {/* Top Bar with Cultural Edition Badge */}
      <div className="flex items-center justify-between">
        <div
          style={{
            borderColor: frame.palette.accentGold,
            backgroundColor: 'rgba(15, 12, 10, 0.75)',
            color: frame.palette.accentGold,
          }}
          className="px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider backdrop-blur-xs flex items-center gap-1.5 shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{frame.javaneseName}</span>
        </div>
        <div className="text-[10px] font-mono text-amber-200/80 bg-black/60 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-xs">
          Format 1:3 • 4-Cut Strip
        </div>
      </div>

      {/* 4 Cultural Corner Marks */}
      <div className="absolute inset-4 sm:inset-6 pointer-events-none">
        {/* Top-Left */}
        <div
          style={{ borderColor: frame.palette.accentGold }}
          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 drop-shadow-md"
        >
          <div
            style={{ backgroundColor: frame.palette.accentGold }}
            className="w-1.5 h-1.5 absolute top-1 left-1 rounded-full"
          />
        </div>

        {/* Top-Right */}
        <div
          style={{ borderColor: frame.palette.accentGold }}
          className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 drop-shadow-md"
        >
          <div
            style={{ backgroundColor: frame.palette.accentGold }}
            className="w-1.5 h-1.5 absolute top-1 right-1 rounded-full"
          />
        </div>

        {/* Bottom-Left */}
        <div
          style={{ borderColor: frame.palette.accentGold }}
          className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 drop-shadow-md"
        >
          <div
            style={{ backgroundColor: frame.palette.accentGold }}
            className="w-1.5 h-1.5 absolute bottom-1 left-1 rounded-full"
          />
        </div>

        {/* Bottom-Right */}
        <div
          style={{ borderColor: frame.palette.accentGold }}
          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 drop-shadow-md"
        >
          <div
            style={{ backgroundColor: frame.palette.accentGold }}
            className="w-1.5 h-1.5 absolute bottom-1 right-1 rounded-full"
          />
        </div>
      </div>

      {/* Bottom Center Framing Guide */}
      <div className="text-center pb-1">
        <span
          style={{ color: frame.palette.accentGold }}
          className="text-[10px] font-mono tracking-widest uppercase bg-black/70 px-3 py-0.5 rounded-full border border-amber-500/30 backdrop-blur-xs"
        >
          ✦ {frame.name} • NUSWARA PHOTOBOOTH ✦
        </span>
      </div>
    </div>
  );
}
