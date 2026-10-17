import React from 'react';
import Link from 'next/link';
import { GununganSvg } from '@/components/ui/WayangVectors';
import { ArrowLeft, BookOpen, Sparkles, Utensils, Mountain } from 'lucide-react';

const quickLinks = [
  { href: '/oracle', label: 'Cek Weton', icon: Sparkles },
  { href: '/kuliner', label: 'Kuliner Jawa', icon: Utensils },
  { href: '/tokoh', label: 'Tokoh & Pahlawan', icon: BookOpen },
  { href: '/tempat-sakral', label: 'Tempat Sakral', icon: Mountain },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 text-center space-y-8">
      <GununganSvg className="w-16 h-24 mx-auto text-[#ECC47E] opacity-75 drop-shadow-[0_4px_16px_rgba(236,196,126,0.25)]" />

      <div className="space-y-3 max-w-md">
        <span className="text-[11px] font-mono text-[#C59B53] uppercase tracking-[0.25em]">404</span>
        <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#F0E6D4] tracking-wide">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-[#A89F91] leading-relaxed font-sans">
          Halaman yang kamu tuju belum ada atau sudah berpindah ke dimensi pewayangan lain. Coba salah satu tautan di bawah.
        </p>
      </div>

      {/* Quick navigation shortcuts */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {quickLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 px-3 py-2.5 bg-[#14110E] border border-[#C59B53]/25 rounded-xl text-xs text-[#ECC47E] hover:bg-[#1C1812] hover:border-[#C59B53]/50 transition-all font-mono"
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg rounded"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
}
