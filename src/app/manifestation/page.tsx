import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ManifestationClient } from './ManifestationClient';

export const metadata: Metadata = {
  title: 'Manifestasi Piwulang Luhur • NUSWARA',
  description: 'Tarik kartu afirmasi harian berisi kebijaksanaan budi pekerti dan filosofi hidup leluhur Jawa Tengah.',
};

export default function ManifestationPage() {
  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Back to Landing Page */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A89F91] hover:text-[#ECC47E] bg-[#14110E] hover:bg-[#1C1610] border border-[#C5A059]/30 hover:border-[#C5A059] px-3.5 py-2 rounded-xl transition-all group min-h-[40px] shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#B99A60] transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <ManifestationClient />
      </div>
    </main>
  );
}
