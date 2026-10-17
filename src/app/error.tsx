'use client';

import React, { useEffect } from 'react';
import { GununganSvg } from '@/components/ui/WayangVectors';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to monitoring service in production; console in dev
    if (process.env.NODE_ENV === 'development') {
      console.error('[Next.js App Error]:', error);
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-5 bg-[#0D0C0A]">
      <GununganSvg className="w-16 h-24 text-[#ECC47E]/60 drop-shadow-[0_2px_8px_rgba(236,196,126,0.2)]" />

      <div className="space-y-2 max-w-md">
        <h2 className="text-xl sm:text-2xl font-editorial font-bold text-[#F0E6D4]">
          Terjadi kendala memuat halaman
        </h2>
        <p className="text-sm text-[#A89F91] leading-relaxed font-sans">
          Sistem menemukan kendala saat memproses halaman ini. Coba muat ulang — biasanya berhasil.
        </p>
        {/* Only show digest (not message) in production to aid debugging without leaking internals */}
        {error?.digest && process.env.NODE_ENV !== 'production' && (
          <p className="text-[11px] font-mono text-[#ECC47E]/60 bg-[#14110E] px-3 py-1.5 rounded-lg border border-[#C59B53]/20 mt-2 inline-block">
            Kode referensi: {error.digest}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C59B53] hover:bg-[#D4AF37] text-[#0D0C0A] text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Coba Lagi</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1712] hover:bg-[#252018] text-[#ECC47E] text-xs font-medium rounded-lg border border-[#C59B53]/30 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
