'use client';

import React, { useRef, useState, useEffect } from 'react';
import { X, Download, Share2, Check, RefreshCw } from 'lucide-react';

interface CalligraphicCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  aksaraText: string;
  latinText: string;
}

type CardTheme = 'lontar' | 'kraton' | 'minimalis';
type AspectRatio = 'landscape' | 'square';

export function CalligraphicCardModal({
  isOpen,
  onClose,
  aksaraText,
  latinText,
}: CalligraphicCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [theme, setTheme] = useState<CardTheme>('lontar');
  const [ratio, setRatio] = useState<AspectRatio>('landscape');
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    renderCanvas();
  }, [isOpen, theme, ratio, aksaraText, latinText]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = ratio === 'landscape' ? 1200 : 1080;
    const height = ratio === 'landscape' ? 630 : 1080;

    canvas.width = width;
    canvas.height = height;

    // Theme color palettes
    const palette = {
      lontar: {
        bg: '#FBF9F5',
        cardBg: '#F3EFE6',
        border: '#E5DEC9',
        aksara: '#181615',
        latin: '#57534E',
        accent: '#B84A27',
        watermark: '#78716C',
      },
      kraton: {
        bg: '#121316',
        cardBg: '#1A1D24',
        border: '#2E3340',
        aksara: '#F4F1EA',
        latin: '#A8A29E',
        accent: '#E06D44',
        watermark: '#8C857B',
      },
      minimalis: {
        bg: '#FFFFFF',
        cardBg: '#F9F9F8',
        border: '#E5E5E5',
        aksara: '#111111',
        latin: '#666666',
        accent: '#B84A27',
        watermark: '#999999',
      },
    }[theme];

    // Background fill
    ctx.fillStyle = palette.bg;
    ctx.fillRect(0, 0, width, height);

    // Inner card border
    const pad = 48;
    ctx.strokeStyle = palette.border;
    ctx.lineWidth = 2;
    ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

    // Decorative corner rerenggan ornaments
    ctx.font = '28px "Noto Sans Javanese", "Tuladha Jejeg", sans-serif';
    ctx.fillStyle = palette.accent;
    ctx.textAlign = 'left';
    ctx.fillText('꧁', pad + 16, pad + 38);
    ctx.textAlign = 'right';
    ctx.fillText('꧂', width - pad - 16, pad + 38);
    ctx.textAlign = 'left';
    ctx.fillText('꧁', pad + 16, height - pad - 18);
    ctx.textAlign = 'right';
    ctx.fillText('꧂', width - pad - 16, height - pad - 18);

    // Header badge
    ctx.textAlign = 'center';
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = palette.accent;
    ctx.letterSpacing = '3px';
    ctx.fillText('KHAZANAH AKSARA JAWA', width / 2, pad + 65);

    // Aksara Jawa display (centered with generous line height)
    ctx.font = '54px "Tuladha Jejeg", "Noto Sans Javanese", sans-serif';
    ctx.fillStyle = palette.aksara;
    ctx.textAlign = 'center';

    // Word wrapping for long Aksara strings
    const maxTextWidth = width - 240;
    const words = (aksaraText || 'ꦤꦸꦱ꧀ꦮꦫ').split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width < maxTextWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);

    const startY = height / 2 - (lines.length - 1) * 45 - 20;
    lines.forEach((line, idx) => {
      ctx.fillText(line, width / 2, startY + idx * 85);
    });

    // Latin Transliteration
    ctx.font = 'italic 20px "Newsreader", "Instrument Serif", Georgia, serif';
    ctx.fillStyle = palette.latin;
    ctx.fillText(`"${latinText || 'Nuswara'}"`, width / 2, height / 2 + (lines.length * 40) + 40);

    // Watermark footer
    ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = palette.watermark;
    ctx.letterSpacing = '1.5px';
    ctx.fillText('NUSWARA • ARSIP KEBUDAYAAN JAWA', width / 2, height - pad - 35);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `nuswara-kaligrafi-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsSharing(true);

    try {
      if (navigator.share && canvas.toBlob) {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'nuswara-kaligrafi.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Kaligrafi Aksara Jawa - Nuswara',
              text: `"${latinText}" dalam Aksara Jawa`,
              files: [file],
            });
          } else {
            handleDownload();
          }
          setIsSharing(false);
        });
      } else {
        handleDownload();
        setIsSharing(false);
      }
    } catch {
      handleDownload();
      setIsSharing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Modal Kartu Kaligrafi Aksara Jawa"
    >
      <div className="relative w-full max-w-4xl bg-[#181615] border border-[#2E3340] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2E3340] bg-[#121316]">
          <div>
            <h3 className="text-base font-bold text-[#F4F1EA]">Unduh Kartu Kaligrafi (High-DPI PNG)</h3>
            <p className="text-xs text-[#8C857B]">
              Atasi masalah font rusak di Microsoft Word & media sosial dengan mengekspor gambar beresolusi tinggi.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#8C857B] hover:text-white hover:bg-[#222630] transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-[#1A1D24] border-b border-[#2E3340] text-xs">
          {/* Theme Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[#8C857B] font-mono uppercase text-[11px]">Tema:</span>
            <div className="flex rounded-lg border border-[#2E3340] p-0.5 bg-[#121316]">
              {(['lontar', 'kraton', 'minimalis'] as CardTheme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1 rounded-md capitalize transition-colors ${
                    theme === t ? 'bg-[#E06D44] text-white font-semibold' : 'text-[#A8A29E] hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[#8C857B] font-mono uppercase text-[11px]">Format:</span>
            <div className="flex rounded-lg border border-[#2E3340] p-0.5 bg-[#121316]">
              <button
                onClick={() => setRatio('landscape')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  ratio === 'landscape' ? 'bg-[#E06D44] text-white font-semibold' : 'text-[#A8A29E] hover:text-white'
                }`}
              >
                1200×630 (Sosmed)
              </button>
              <button
                onClick={() => setRatio('square')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  ratio === 'square' ? 'bg-[#E06D44] text-white font-semibold' : 'text-[#A8A29E] hover:text-white'
                }`}
              >
                1080×1080 (Feed)
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Preview Area */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-[#0D0C0A]">
          <canvas
            ref={canvasRef}
            className="max-h-[50vh] max-w-full rounded-lg shadow-xl object-contain border border-[#2E3340]"
          />
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#2E3340] bg-[#121316]">
          <span className="text-xs text-[#8C857B] font-mono">
            {ratio === 'landscape' ? '1200 × 630 px' : '1080 × 1080 px'} • 300 DPI Canvas
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#222630] hover:bg-[#2E3340] text-xs font-semibold text-[#F4F1EA] border border-[#2E3340] transition-colors"
            >
              <Share2 className="w-4 h-4 text-[#60A5FA]" />
              <span>Bagikan (Share)</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#B84A27] hover:bg-[#9A3B1C] text-xs font-bold text-white transition-all shadow-md active:scale-95"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Download className="w-4 h-4" />}
              <span>{isCopied ? 'Tersimpan!' : 'Unduh Gambar PNG'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
