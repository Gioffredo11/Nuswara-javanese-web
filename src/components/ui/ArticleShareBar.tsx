'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ArticleShareBarProps {
  title: string;
  summary?: string;
  categoryLabel?: string;
}

export function ArticleShareBar({
  title,
  summary,
  categoryLabel,
}: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    const url = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: summary || title,
          url,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const waText = encodeURIComponent(
    `*${title}* ${categoryLabel ? `(${categoryLabel})` : ''}\n\n${summary ? summary + '\n\n' : ''}Baca selengkapnya di NUSWARA:\n${url}`
  );
  const waUrl = `https://api.whatsapp.com/send?text=${waText}`;

  const xText = encodeURIComponent(
    `${title} • Pelajari jejak dan filosofi luhur warisan Jawa Tengah di @NuswaraCultural:`
  );
  const xUrl = `https://twitter.com/intent/tweet?text=${xText}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#14110E] border border-[#C59B53]/25 shadow-lg">
      <div className="flex items-center gap-2 text-xs font-mono text-[#ECC47E]">
        <Share2 className="w-3.5 h-3.5" />
        <span className="uppercase tracking-wider font-semibold">
          Bagikan Warisan Ini
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* WhatsApp Share */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-[#18130E] hover:bg-[#251E16] text-[#D8C8AD] hover:text-[#ECC47E] border border-[#C59B53]/30 text-xs font-mono transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#ECC47E]"
          aria-label="Bagikan ke WhatsApp"
        >
          <span>WhatsApp</span>
        </a>

        {/* Twitter / X Share */}
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-[#18130E] hover:bg-[#251E16] text-[#D8C8AD] hover:text-[#ECC47E] border border-[#C59B53]/30 text-xs font-mono transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#ECC47E]"
          aria-label="Bagikan ke Twitter / X"
        >
          <span>Twitter (X)</span>
        </a>

        {/* Copy Link / Native Share */}
        <button
          type="button"
          onClick={handleNativeShare}
          className="px-3 py-1.5 rounded-lg bg-[#C59B53] hover:bg-[#D4AF37] text-[#0D0C0A] font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ECC47E]"
          aria-label="Salin Tautan Artikel"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#0D0C0A]" />
              <span>Tautan Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#0D0C0A]" />
              <span>Salin Tautan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ArticleShareBar;
