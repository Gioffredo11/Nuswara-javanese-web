import React from 'react';

/**
 * Next.js loading.tsx — Cinematic skeleton loader with gold shimmer wave.
 * Replaces the plain animate-pulse with a directional shimmer sweep that
 * matches NUSWARA's gold obsidian design language.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0D0C0A] pt-28 sm:pt-32 pb-24">
      <style>{`
        @keyframes shimmerWave {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .sk {
          background: linear-gradient(
            90deg,
            #1C1812 0%,
            #2A231A 40%,
            #1C1812 80%
          );
          background-size: 800px 100%;
          animation: shimmerWave 1.6s ease-in-out infinite;
          border-radius: 6px;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="sk h-3 w-36" />

        {/* Heading */}
        <div className="space-y-3 max-w-xl">
          <div className="sk h-2.5 w-28" />
          <div className="sk h-9 w-3/4" style={{ animationDelay: '60ms' }} />
          <div className="sk h-9 w-1/2" style={{ animationDelay: '120ms' }} />
          <div className="sk h-3.5 w-full mt-3" style={{ animationDelay: '180ms' }} />
          <div className="sk h-3.5 w-5/6" style={{ animationDelay: '240ms' }} />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#C59B53]/12 overflow-hidden bg-[#14110E]"
            >
              <div
                className="sk aspect-[4/3] rounded-none"
                style={{ animationDelay: `${i * 80}ms` }}
              />
              <div className="p-5 space-y-3">
                <div className="sk h-2.5 w-20" style={{ animationDelay: `${i * 80 + 40}ms` }} />
                <div className="sk h-5 w-3/4" style={{ animationDelay: `${i * 80 + 80}ms` }} />
                <div className="sk h-3 w-full" style={{ animationDelay: `${i * 80 + 120}ms` }} />
                <div className="sk h-3 w-4/5" style={{ animationDelay: `${i * 80 + 160}ms` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
