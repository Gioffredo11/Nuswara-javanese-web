import React from 'react';
import Link from 'next/link';
import { GununganSvg } from '@/components/ui/WayangVectors';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center space-y-6">
      <GununganSvg className="w-20 h-28 mx-auto text-[#ECC47E] opacity-90 drop-shadow-[0_4px_12px_rgba(236,196,126,0.3)]" />
      <div className="space-y-3">
        <h1 className="font-royal text-4xl sm:text-5xl font-bold text-[#F0E6D4] tracking-wide">
          404: Kesasar
        </h1>
        <p className="text-sm text-[#A89F91] leading-relaxed font-sans max-w-md mx-auto">
          Halaman yang kamu tuju belum ada atau sudah berpindah ke dimensi pewayangan lain dalam jagad pakeliran.
        </p>
      </div>
      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda Utama</span>
        </Link>
      </div>
    </div>
  );
}
