'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, RefreshCw } from 'lucide-react';
import { WayangPosterCard } from '@/components/ui/WayangPosterCard';
import { exportWayangPosterCard } from '@/components/ui/posterCardExport';
import {
  GununganSvg,
  BatikKawungPatternSvg,
} from '@/components/ui/WayangVectors';
import { ManifestationDeckDraw } from './ManifestationDeckDraw';

interface ManifestationData {
  id: number;
  localDate: string;
  philosophy: {
    id: number;
    title: string;
    slug: string;
    originalJavanese: string;
    modernTranslation: string;
    practicalInterpretation: string;
    culturalContext: string;
    category: string;
  };
  relatedCharacter: {
    name: string;
    slug: string;
    title: string;
  } | null;
}

export function ManifestationClient() {
  const [loading, setLoading] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [manifestation, setManifestation] = useState<ManifestationData | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function mapManifestationPayload(payload: any): ManifestationData | null {
    if (!payload || !payload.philosophy) return null;
    return {
      id: payload.id || 1,
      localDate: payload.localDate || new Date().toISOString().split('T')[0],
      philosophy: {
        id: payload.philosophy.id,
        title: payload.philosophy.title,
        slug: payload.philosophy.slug,
        originalJavanese: payload.philosophy.textJawa || payload.philosophy.originalJavanese || '',
        modernTranslation: payload.philosophy.meaning || payload.philosophy.modernTranslation || '',
        practicalInterpretation:
          payload.philosophy.modernInterpretation ||
          payload.philosophy.practicalInterpretation ||
          payload.philosophy.meaning ||
          '',
        culturalContext: payload.philosophy.meaning || payload.philosophy.culturalContext || '',
        category: payload.philosophy.category || 'Piwulang Luhur',
      },
      relatedCharacter: payload.relatedCharacters?.[0]
        ? {
            name: payload.relatedCharacters[0].name,
            slug: payload.relatedCharacters[0].slug,
            title: payload.relatedCharacters[0].title || 'Peneladan Nilai',
          }
        : null,
    };
  }

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/manifestation/today');
        const json = await res.json();
        const payload = json.data || json;

        if (payload && payload.philosophy) {
          const mapped = mapManifestationPayload(payload);
          if (mapped) {
            setHasDrawn(true);
            setManifestation(mapped);
          }
        }
      } catch (err) {
        console.error('Error checking manifestation:', err);
      } finally {
        setLoading(false);
      }
    }
    checkStatus();
  }, []);

  async function handleDraw(): Promise<boolean> {
    setDrawing(true);
    setError(null);
    try {
      const res = await fetch('/api/manifestation/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error?.message || json.message || 'Gagal menarik kartu manifestasi.');
        return false;
      }
      const payload = json.data || json;

      if (payload && payload.philosophy) {
        const mapped = mapManifestationPayload(payload);
        if (mapped) {
          setManifestation(mapped);
          return true;
        }
      }
      return false;
    } catch (err: any) {
      console.error('Error drawing manifestation:', err);
      setError(err?.message || 'Terjadi kendala jaringan saat menarik kartu.');
      return false;
    } finally {
      setDrawing(false);
    }
  }

  function handleShareCopy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDownloadCard() {
    if (!manifestation || downloading) return;
    setDownloading(true);

    try {
      const activeSlug = manifestation.relatedCharacter?.slug || 'petruk';
      await exportWayangPosterCard({
        type: 'MANIFESTATION',
        title: manifestation.philosophy.title,
        badgeRightTop: 'PIWULANG',
        badgeRightMid: 'LUHUR',
        badgeRightBot: 'JAWA',
        datePrimary: `${manifestation.localDate}.`,
        dateSecondary: '24 JAM',
        tagline: manifestation.philosophy.category,
        characterSlug: activeSlug,
        description: manifestation.philosophy.culturalContext || manifestation.philosophy.modernTranslation,
        secondaryQuote: manifestation.philosophy.originalJavanese,
        modernInterpretation: manifestation.philosophy.practicalInterpretation,
        footerCta: `NUSWARA • Manifestasi Harian ${manifestation.localDate} ↗`,
        filename: `Manifestasi_${manifestation.philosophy.slug}.png`,
      });
    } catch (err) {
      console.error('Error generating manifestation card:', err);
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-4">
        <GununganSvg className="w-10 h-14 text-stone-400 animate-pulse" />
        <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">
          Menyiapkan Kartu Manifestasi...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>Piwulang Luhur • Daily Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Manifestasi Harian
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
          Ambil satu perenungan bijak dari khazanah leluhur Jawa setiap 24 jam. Lengkap dengan interpretasi modern agar relevan dalam kehidupan sehari-harimu.
        </p>
      </div>

      {!hasDrawn || !manifestation ? (
        /* POKER CARD DRAW INTERACTIVE ANIMATION FROM DECK */
        <div className="space-y-6">
          <ManifestationDeckDraw
            onDraw={handleDraw}
            drawing={drawing}
            drawnPhilosophyTitle={manifestation?.philosophy.title}
            drawnCharacterSlug={manifestation?.relatedCharacter?.slug}
            drawnCharacterName={manifestation?.relatedCharacter?.name}
            drawnJavaneseQuote={manifestation?.philosophy.originalJavanese}
            onRevealComplete={() => setHasDrawn(true)}
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 max-w-sm mx-auto text-center">
              {error}
            </div>
          )}
        </div>
      ) : (
        /* MANIFESTATION RESULT LUXURY POSTER CARD */
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <WayangPosterCard
            type="MANIFESTATION"
            title={manifestation.philosophy.title}
            badgeRightTop="PIWULANG"
            badgeRightMid="LUHUR"
            badgeRightBot="JAWA"
            datePrimary={`${manifestation.localDate}.`}
            dateSecondary="24 JAM"
            tagline={manifestation.philosophy.category}
            characterSlug={manifestation.relatedCharacter?.slug || 'petruk'}
            description={manifestation.philosophy.culturalContext || manifestation.philosophy.modernTranslation}
            secondaryQuote={manifestation.philosophy.originalJavanese}
            modernInterpretation={manifestation.philosophy.practicalInterpretation}
            ctaUrl={manifestation.relatedCharacter ? `/wayangpedia/${manifestation.relatedCharacter.slug}` : undefined}
            ctaText={manifestation.relatedCharacter ? `Telusuri ${manifestation.relatedCharacter.name}` : undefined}
            downloadFilename={`Manifestasi_${manifestation.philosophy.slug}.png`}
            footerCta={`NUSWARA • Manifestasi Harian ${manifestation.localDate} ↗`}
            onDownloadCard={handleDownloadCard}
            downloading={downloading}
            onShareCopy={handleShareCopy}
            copied={copied}
          />

          {/* Re-draw / Replay Poker Draw Animation Option */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setHasDrawn(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono text-amber-900 bg-amber-100/90 hover:bg-amber-200 border border-amber-300 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
              <span>Tarik Ulang dari Tumpukan Kartu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManifestationClient;
