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
    console.error('[Next.js App Error]:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <GununganSvg className="w-16 h-24 text-amber-600/70" />
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
        Terjadi Kendala Memuat Halaman
      </h2>
      <p className="text-xs sm:text-sm text-stone-600 max-w-md font-sans">
        Sistem mendeteksi kendala pada halaman ini. Silakan coba lagi atau kembali ke beranda.
      </p>
      {error?.message && (
        <p className="text-[11px] font-mono text-red-600 bg-red-50 p-2 rounded max-w-md border border-red-200">
          {error.message}
        </p>
      )}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Coba Lagi</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-200 text-stone-800 text-xs font-medium rounded-lg hover:bg-stone-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
