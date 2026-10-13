'use client';

import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { exportWayangPosterCard } from '@/components/ui/posterCardExport';
import { getGenZProfile } from './genZCopywriting';
import { OracleTeaserCards } from './components/OracleTeaserCards';
import { OracleForm } from './components/OracleForm';
import { OracleSpinningRoulette } from './components/OracleSpinningRoulette';
import { ResultCard, OracleResultData } from './components/ResultCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function OracleClient() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [pendingResult, setPendingResult] = useState<OracleResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OracleResultData | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  function handleRandomize() {
    const sampleNames = [
      'Raden Dananjaya',
      'Satria Perkasa',
      'Sekar Kinanthi',
      'Arya Sena',
      'Dewi Lestari',
      'Bagus Permadi',
      'Laksmana Muda',
      'Surya Kencana',
    ];
    const year = Math.floor(Math.random() * (2005 - 1975 + 1)) + 1975;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const randomDate = `${year}-${month}-${day}`;
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];

    setName(randomName);
    setBirthDate(randomDate);
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Silakan masukkan nama lengkapmu.');
      return;
    }
    if (!birthDate) {
      setError('Silakan lengkapi tanggal, bulan, dan tahun kelahiranmu.');
      return;
    }

    // Validate date format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      setError('Format tanggal belum lengkap. Silakan pilih tanggal, bulan, dan tahun.');
      return;
    }

    const [birthYear] = birthDate.split('-').map(Number);
    if (birthYear < 1950) {
      setError('Tahun kelahiran minimal tahun 1950.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (birthDate > todayStr) {
      setError('Tanggal lahir tidak boleh di masa depan.');
      return;
    }

    setLoading(true);
    setIsRevealing(true);
    setError(null);

    const startTime = Date.now();

    try {
      const res = await fetch('/api/oracle/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), birthDate }),
      });
      const json = await res.json();

      if (!res.ok || json.error) {
        const errMsg = json.error?.message || json.message || 'Gagal menghitung Oracle Jawa.';
        setError(errMsg);
        setIsRevealing(false);
        setLoading(false);
        return;
      }

      const raw = json.data || json;
      if (!raw || !raw.weton) {
        setError('Respons Oracle tidak lengkap dari server.');
        setIsRevealing(false);
        setLoading(false);
        return;
      }

      const charSlug = raw.characterMatch?.slug || 'arjuna';
      const charName = raw.characterMatch?.name || 'Ksatria Wayang';

      // Load Gen Z Copywriting Profile & Punchline
      const genZ = getGenZProfile(charSlug, charName);

      // Map DTO with punchy Gen Z descriptions
      const mapped: OracleResultData = {
        visitorName: raw.name || name.trim(),
        birthDate: raw.birthDate || birthDate,
        wetonName: raw.weton.name,
        hari: raw.weton.dayName,
        pasaran: raw.weton.pasaran,
        totalNeptu: typeof raw.weton.neptu === 'object' ? raw.weton.neptu.totalNeptu : raw.weton.neptu,
        auraTitle: genZ.auraTitle,
        summary: raw.weton.summary || '',
        character: {
          id: raw.characterMatch?.id || 1,
          name: charName,
          slug: charSlug,
          title: genZ.tagline,
          shortDescription: genZ.punchline,
          lineArt: raw.characterMatch?.lineArtKey || null,
          philosophy: raw.relatedPhilosophy?.textJawa || raw.relatedPhilosophy?.meaning || 'Urip Iku Urup',
        },
        matchReason: genZ.punchline,
        compatibilityAdvice: genZ.compatibilityAdvice,
        lakonGuidance: raw.relatedStory?.title || 'Bima Suci',
        shareCode: raw.shareCode || Math.random().toString(36).substring(2, 10).toUpperCase(),
      };

      // Store mapped result into pendingResult for the spinning roulette to lock onto
      setPendingResult(mapped);
    } catch (err: any) {
      console.error('Oracle calculate fetch error:', err);
      const isNetworkErr = err?.message === 'Failed to fetch' || err?.name === 'TypeError';
      const errMsg = isNetworkErr
        ? 'Gagal terhubung ke server. Silakan coba tekan tombol "Hitung Oracle" kembali.'
        : (err?.message || 'Koneksi ke server bermasalah.');
      setError(errMsg);
      setIsRevealing(false);
      setLoading(false);
    }
  }

  function handleSpinComplete() {
    if (pendingResult) {
      setResult(pendingResult);
    }
    setIsRevealing(false);
    setLoading(false);
  }

  function handleShareCopy() {
    if (!result) return;
    const shareUrl = `${window.location.origin}/share/${result.shareCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  async function handleDownloadCard() {
    if (!result || downloading) return;
    setDownloading(true);

    try {
      await exportWayangPosterCard({
        type: 'ORACLE',
        title: result.character.name,
        badgeRightTop: 'HARI',
        badgeRightMid: 'WAYANG',
        badgeRightBot: 'NASIONAL',
        datePrimary: result.wetonName ? `${result.wetonName}.` : 'Jumat Wage.',
        dateSecondary: `Neptu ${result.totalNeptu}`,
        tagline: result.auraTitle,
        characterSlug: result.character.slug,
        description: result.matchReason,
        secondaryQuote: result.character.philosophy,
        modernInterpretation: result.compatibilityAdvice,
        footerCta: 'Cek Wetonmu Sendiri di NUSWARA • nuswara.id/oracle ↗',
        filename: `Oracle_Story_9x16_${result.visitorName}_${result.character.name}.png`,
      });
    } catch (err) {
      console.error('Error generating 9:16 oracle card:', err);
    } finally {
      setDownloading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setPendingResult(null);
    setIsRevealing(false);
    setError(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Editorial Header */}
      <ScrollReveal direction="up" distance={30}>
        <div className="max-w-2xl mx-auto text-center space-y-3.5 mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3.5 py-1 rounded-full border border-amber-300/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Primbon Digital & Karakter Wayang</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Javanese Oracle
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
            Temukan weton kelahiranmu, pasaran Jawa, jumlah neptu, dan cerminan ksatria wayang yang membawa resonansi energi batinmu.
          </p>
        </div>
      </ScrollReveal>

      {/* MAIN SECTION CONTENT: 2 Kolom di Desktop (lg+), 1 Kolom di Mobile */}
      {!result ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Kolom Kiri: 3 Kartu Teaser Siluet Misterius ATAU Animasi Kartu Random Berputar */}
          <ScrollReveal direction="up" distance={35} delay={150} className="lg:col-span-7">
            {isRevealing ? (
              <OracleSpinningRoulette
                matchedSlug={pendingResult?.character.slug || 'arjuna'}
                characterName={pendingResult?.character.name || 'Ksatria Wayang'}
                visitorName={pendingResult?.visitorName || name.trim() || 'Pengelana'}
                wetonName={pendingResult?.wetonName}
                totalNeptu={pendingResult?.totalNeptu}
                isReady={!!pendingResult}
                onSpinComplete={handleSpinComplete}
              />
            ) : (
              <OracleTeaserCards
                matchedSlug={null}
                isRevealing={false}
              />
            )}
          </ScrollReveal>

          {/* Kolom Kanan: Dark Textured Form Card */}
          <ScrollReveal direction="up" distance={35} delay={250} className="lg:col-span-5 lg:sticky lg:top-24">
            <OracleForm
              name={name}
              birthDate={birthDate}
              loading={loading}
              error={error}
              onNameChange={(val) => {
                setName(val);
                if (error) setError(null);
              }}
              onBirthDateChange={(val) => {
                setBirthDate(val);
                if (error) setError(null);
              }}
              onSubmit={handleSubmit}
              onRandomize={handleRandomize}
            />
          </ScrollReveal>
        </div>
      ) : (
        /* HASIL WETON: 2 Kolom di Desktop (Teaser Flip di Kiri + Kartu Tarot Jawa di Kanan) */
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Kolom Kiri: 3 Kartu Teaser (Kartu yang cocok melakukan FLIP 3D, 2 lainnya meredup) */}
            <div className="lg:col-span-6 hidden lg:block">
              <OracleTeaserCards
                matchedSlug={result.character.slug}
                characterName={result.character.name}
                isRevealing={false}
              />
            </div>

            {/* Kolom Kanan: Kartu Tarot Jawa (Rasio 2:3, Bingkai Emas, Tombol Unduh & Bagikan) */}
            <div className="lg:col-span-6">
              <ResultCard
                result={result}
                onDownload={handleDownloadCard}
                downloading={downloading}
                onShare={handleShareCopy}
                copied={copied}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OracleClient;
