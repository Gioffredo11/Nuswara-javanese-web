'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, ArrowUpRight, Image as ImageIcon, Copy, Check } from 'lucide-react';
import { playLontarClickSound } from '@/lib/audio/woodClick';

export interface SavedPhrase {
  id: string;
  aksara: string;
  latin: string;
  date: string;
}

interface SavedPhrasebookViewProps {
  onLoadPhrase: (latin: string) => void;
  onOpenCardModal: (aksara: string, latin: string) => void;
}

export function SavedPhrasebookView({
  onLoadPhrase,
  onOpenCardModal,
}: SavedPhrasebookViewProps) {
  const [savedPhrases, setSavedPhrases] = useState<SavedPhrase[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nuswara_saved_phrases');
      if (stored) {
        setSavedPhrases(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const handleDelete = (id: string) => {
    playLontarClickSound();
    const updated = savedPhrases.filter((p) => p.id !== id);
    setSavedPhrases(updated);
    try {
      localStorage.setItem('nuswara_saved_phrases', JSON.stringify(updated));
    } catch {}
  };

  const handleCopy = (id: string, aksara: string) => {
    playLontarClickSound();
    navigator.clipboard.writeText(aksara);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest bg-[#1E3A5F]/15 text-[#1E3A5F] dark:bg-[#60A5FA]/15 dark:text-[#60A5FA] uppercase font-bold">
            Buku Frasa Tersimpan
          </span>
          <span className="text-xs text-[#78716C] dark:text-[#8C857B]">
            Penyimpanan Lokal (Offline-First)
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#181615] dark:text-[#F4F1EA]">
          Koleksi Aksara Pribadi
        </h2>
        <p className="text-sm text-[#57534E] dark:text-[#A8A29E] mt-1">
          Daftar kalimat dan peribahasa Jawa yang Anda simpan untuk dipelajari kembali atau diekspor ke kartu kaligrafi.
        </p>
      </div>

      {savedPhrases.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E5DEC9] dark:border-[#2E3340]">
          <Bookmark className="w-12 h-12 text-[#78716C] dark:text-[#8C857B] mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold text-[#181615] dark:text-[#F4F1EA] mb-1">
            Belum Ada Frasa yang Disimpan
          </h3>
          <p className="text-xs text-[#57534E] dark:text-[#A8A29E] max-w-sm mx-auto mb-4">
            Klik tombol &ldquo;Simpan Frasa&rdquo; di Studio Alih Aksara untuk menambahkan hasil transliterasi ke koleksi ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedPhrases.map((phrase) => (
            <div
              key={phrase.id}
              className="flex flex-col justify-between p-5 rounded-xl bg-white dark:bg-[#1A1D24] border border-[#E5DEC9] dark:border-[#2E3340] shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#78716C] dark:text-[#8C857B] mb-2">
                  <span>{phrase.date}</span>
                  <button
                    onClick={() => handleDelete(phrase.id)}
                    className="p-1 rounded text-[#B91C1C] hover:bg-[#B91C1C]/10 transition-colors"
                    title="Hapus frasa"
                    aria-label="Hapus frasa tersimpan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="py-3 px-4 rounded-lg bg-[#FBF9F5] dark:bg-[#121316] border border-[#E5DEC9]/60 dark:border-[#2E3340]/60 mb-3">
                  <span className="aksara-jawa text-2xl text-[#181615] dark:text-[#F4F1EA] block">
                    {phrase.aksara}
                  </span>
                </div>

                <p className="text-xs text-[#57534E] dark:text-[#A8A29E] italic mb-4 font-serif">
                  &ldquo;{phrase.latin}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-[#E5DEC9] dark:border-[#2E3340]">
                <button
                  onClick={() => handleCopy(phrase.id, phrase.aksara)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3EFE6] dark:bg-[#222630] text-xs font-medium text-[#181615] dark:text-[#F4F1EA] hover:bg-[#E5DEC9] transition-colors"
                >
                  {copiedId === phrase.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    playLontarClickSound();
                    onOpenCardModal(phrase.aksara, phrase.latin);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3EFE6] dark:bg-[#222630] text-xs font-medium text-[#181615] dark:text-[#F4F1EA] hover:bg-[#E5DEC9] transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#B84A27]" />
                  <span>Kartu PNG</span>
                </button>

                <button
                  onClick={() => {
                    playLontarClickSound();
                    onLoadPhrase(phrase.latin);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-[#B84A27] dark:bg-[#E06D44] hover:bg-[#9A3B1C] text-white text-xs font-bold transition-colors"
                >
                  <span>Buka di Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
