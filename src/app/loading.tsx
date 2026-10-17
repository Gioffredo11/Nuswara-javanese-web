import React from 'react';

/**
 * Next.js loading.tsx — tampil selama Server Component halaman dimuat.
 * Gunakan skeleton yang konsisten dengan desain gelap NUSWARA.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0D0C0A] pt-28 sm:pt-32 pb-24 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-40 bg-[#1C1812] rounded" />

        {/* Heading skeleton */}
        <div className="space-y-3 max-w-xl">
          <div className="h-3 w-32 bg-[#1C1812] rounded" />
          <div className="h-10 w-3/4 bg-[#1C1812] rounded" />
          <div className="h-10 w-1/2 bg-[#1C1812] rounded" />
          <div className="h-4 w-full bg-[#1C1812] rounded mt-2" />
          <div className="h-4 w-5/6 bg-[#1C1812] rounded" />
        </div>

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-[#14110E] border border-[#C59B53]/15 overflow-hidden">
              <div className="aspect-[4/3] bg-[#1C1812]" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-[#1C1812] rounded" />
                <div className="h-5 w-3/4 bg-[#1C1812] rounded" />
                <div className="h-3 w-full bg-[#1C1812] rounded" />
                <div className="h-3 w-4/5 bg-[#1C1812] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
