import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { shareService } from '@/server/services/share.service';
import QRCode from 'qrcode';
import {
  WayangFigureBySlug,
  GununganSvg,
} from '@/components/ui/WayangVectors';
import { Sparkles, Camera, ArrowRight, Share2, Compass, Eye } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  try {
    const share = await shareService.getShareByCode(code);
    return {
      title: `Kartu Budaya #${share.shortCode} | NUSWARA Digital Culture`,
      description: `Temukan hasil eksplorasi budaya Jawa dan wayang kulit di NUSWARA.`,
    };
  } catch {
    return { title: 'Tautan Tidak Ditemukan | NUSWARA' };
  }
}

export default async function ShareDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  let share;
  try {
    share = await shareService.getShareByCode(code);
  } catch {
    notFound();
  }

  let parsed: any = {};
  if (typeof share.snapshotData === 'string') {
    try {
      parsed = JSON.parse(share.snapshotData);
    } catch {
      parsed = { raw: share.snapshotData };
    }
  } else if (share.snapshotData && typeof share.snapshotData === 'object') {
    parsed = share.snapshotData;
  }

  // Generate QR code data URL
  const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';
  const qrDataUrl = await QRCode.toDataURL(
    `${baseUrl}/share/${share.shortCode}`,
    { width: 160, margin: 1 }
  );

  const displayTitle =
    parsed.title ||
    (share.type === 'ORACLE'
      ? `Hasil Oracle: ${parsed.visitorName || parsed.name || 'Sobat Jawa'}`
      : share.type === 'MANIFESTATION'
      ? `Kartu Manifestasi: ${parsed.philosophy?.title || 'Piwulang Luhur'}`
      : 'Foto Photobooth Jawa Epic');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
          KARTU BUDAYA TERBAGI • KODE #{share.shortCode}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          {displayTitle}
        </h1>
        <div className="flex items-center justify-center gap-3 text-xs text-stone-500 font-mono">
          <span>Tipe: {share.type}</span>
          <span>•</span>
          <span>{new Date(share.createdAt).toLocaleDateString('id-ID')}</span>
        </div>
      </div>

      {/* RENDER CONTENT BASED ON TYPE */}
      {share.type === 'ORACLE' && (
        <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-stone-300/80 p-8 shadow-md space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase text-stone-400">
              HASIL WETON ORACLE
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              {parsed.visitorName || parsed.name}
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-amber-100 rounded-full text-xs font-mono text-amber-900 mt-1">
              <span>{parsed.wetonName || parsed.weton?.name}</span>
            </div>
          </div>

          {/* Matched Character */}
          <div className="p-6 bg-[#FAF7F0] rounded-xl border border-stone-200/80 space-y-3">
            <span className="text-[10px] font-mono text-stone-400 uppercase">
              TOKOH WAYANG TERCOCOK
            </span>

            <div className="h-44 flex items-center justify-center py-2">
              <WayangFigureBySlug
                slug={parsed.characterSlug || parsed.characterMatch?.slug || 'arjuna'}
                className="h-full w-auto drop-shadow-md"
              />
            </div>

            <h3 className="font-serif text-xl font-bold text-stone-900">
              {parsed.characterName || parsed.characterMatch?.name}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {parsed.matchReason || parsed.characterMatch?.matchReason}
            </p>
          </div>

          {/* QR Code section */}
          <div className="pt-4 border-t border-stone-100 flex flex-col items-center space-y-2">
            <img src={qrDataUrl} alt="QR Code Share" className="w-28 h-28 border border-stone-200 rounded-lg p-1" />
            <span className="text-[10px] font-mono text-stone-400">
              Scan untuk membuka kartu ini di smartphone
            </span>
          </div>

          <div className="pt-2">
            <Link
              href={`/wayangpedia/${parsed.characterSlug || parsed.characterMatch?.slug || 'arjuna'}`}
              className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Pelajari Profil Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {share.type === 'PHOTO' && (
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-stone-200 p-8 shadow-md text-center space-y-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-800">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Foto Strip Jawa Epic
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Frame: {parsed.frame || 'Gunungan Line'} • Filter: {parsed.filter || 'Warm Minimal'}
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-stone-200 flex flex-col items-center space-y-2">
            <img src={qrDataUrl} alt="QR Code" className="w-36 h-36 border border-stone-300 rounded-lg p-1" />
            <span className="text-[11px] font-mono text-stone-500">
              Tautan resmi tercatat dalam sistem Jawa Epic
            </span>
          </div>
        </div>
      )}

      {share.type === 'MANIFESTATION' && (
        <div className="max-w-md mx-auto bg-stone-900 text-stone-100 rounded-2xl border border-amber-500/40 p-8 shadow-md text-center space-y-6">
          <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto text-amber-400">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-amber-300">
              {parsed.philosophy?.title || 'Piwulang Harian'}
            </h2>
            <p className="font-serif italic text-sm text-stone-300 mt-2">
              &ldquo;{parsed.philosophy?.textJawa || ''}&rdquo;
            </p>
            <p className="text-xs text-stone-400 mt-4 leading-relaxed">
              {parsed.philosophy?.meaning || ''}
            </p>
          </div>

          <div className="h-44 flex items-center justify-center py-2">
            <WayangFigureBySlug
              slug={parsed.relatedCharacters?.[0]?.slug || parsed.characterSlug || parsed.philosophy?.primaryCharacterSlug || 'petruk'}
              className="h-full w-auto drop-shadow-md"
            />
          </div>

          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-col items-center space-y-2">
            <img src={qrDataUrl} alt="QR Code" className="w-28 h-28 border border-stone-800 rounded-lg p-1" />
            <span className="text-[10px] font-mono text-stone-400">
              Tersimpan dalam kalender manifestasi Jawa Epic
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
