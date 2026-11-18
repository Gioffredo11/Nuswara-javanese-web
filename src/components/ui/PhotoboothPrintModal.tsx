'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Printer, Check, Copy, FileText, Scissors, Info } from 'lucide-react';

export type PhotoboothPrintMode = 'double' | 'single';

interface PhotoboothPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  stripUrl: string | null;
  frameName: string;
}

/**
 * Trigger browser native printing for a photobooth strip via an isolated iframe.
 * Supports:
 * - 'double': 2 identical strips side-by-side with scissors cutting guide (standard 4x6 / A6 / A4 photobooth format)
 * - 'single': 1 vertical strip centered (standard 2x6 / thermal photo printer format)
 */
export function printPhotoboothStrip(stripDataUrl: string, mode: PhotoboothPrintMode = 'double') {
  if (typeof window === 'undefined') return;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  const html = `
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <title>Nuswara Photobooth Strip - Cetak</title>
        <style>
          @page {
            size: auto;
            margin: 0;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .page-wrapper {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 4mm;
          }
          ${
            mode === 'single'
              ? `
            .single-strip {
              max-height: 98vh;
              max-width: 95vw;
              width: auto;
              height: auto;
              object-fit: contain;
              display: block;
              margin: auto;
            }
          `
              : `
            .dual-wrapper {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              height: 98vh;
              gap: 4mm;
              margin: auto;
            }
            .strip-img {
              max-height: 98vh;
              max-width: 46vw;
              width: auto;
              height: auto;
              object-fit: contain;
              display: block;
            }
            .cut-guide {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 90vh;
              color: #777;
              font-family: monospace;
              font-size: 11px;
              user-select: none;
            }
            .cut-line {
              flex: 1;
              width: 1px;
              border-left: 1.5px dashed #888;
            }
            .cut-icon {
              padding: 4px 0;
              line-height: 1;
              font-size: 13px;
            }
          `
          }
          @media print {
            html, body {
              background: transparent;
            }
            .page-wrapper {
              height: 100%;
              padding: 0;
              page-break-inside: avoid;
            }
            img {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="page-wrapper">
          ${
            mode === 'single'
              ? `<img src="${stripDataUrl}" class="single-strip" alt="Nuswara Photo Strip" id="strip-img" />`
              : `
            <div class="dual-wrapper">
              <img src="${stripDataUrl}" class="strip-img" alt="Nuswara Photo Strip 1" id="strip-img-1" />
              <div class="cut-guide">
                <div class="cut-line"></div>
                <div class="cut-icon">✂</div>
                <div class="cut-line"></div>
              </div>
              <img src="${stripDataUrl}" class="strip-img" alt="Nuswara Photo Strip 2" id="strip-img-2" />
            </div>
          `
          }
        </div>
        <script>
          function triggerPrint() {
            setTimeout(function() {
              window.focus();
              window.print();
            }, 300);
          }
          var img = document.getElementById('strip-img') || document.getElementById('strip-img-1');
          if (img && img.complete) {
            triggerPrint();
          } else if (img) {
            img.onload = triggerPrint;
          } else {
            triggerPrint();
          }
        </script>
      </body>
    </html>
  `;

  doc.open();
  doc.write(html);
  doc.close();

  // Safety cleanup iframe after print process
  setTimeout(() => {
    if (document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
  }, 120000);
}

export function PhotoboothPrintModal({
  isOpen,
  onClose,
  stripUrl,
  frameName,
}: PhotoboothPrintModalProps) {
  const [mounted, setMounted] = useState(false);
  const [printMode, setPrintMode] = useState<PhotoboothPrintMode>('double');
  const [isPrinting, setIsPrinting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleStartPrint = useCallback(() => {
    if (!stripUrl) return;
    setIsPrinting(true);
    setPrintSuccess(false);

    try {
      printPhotoboothStrip(stripUrl, printMode);
      setPrintSuccess(true);
      setTimeout(() => {
        setIsPrinting(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to trigger print dialog:', err);
      setIsPrinting(false);
    }
  }, [stripUrl, printMode]);

  if (!mounted || !isOpen || !stripUrl) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg bg-[#0F0D0A] border border-[#C5A059]/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(197,160,89,0.15)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#C5A059]/20 bg-[#14110E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#ECC47E]">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#F4EFE6] font-serif tracking-wide">
                Cetak ke Printer
              </h3>
              <p className="text-[11px] text-[#A89F91] font-mono truncate max-w-[240px] sm:max-w-xs">
                Bingkai: {frameName} (4-Cut)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A89F91] hover:text-[#F4EFE6] hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Format Selector Label */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block mb-2 font-bold">
              1. Pilih Format Tata Letak Kertas:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Option 1: 2 Strip Kembar (Rekomendasi Photobooth) */}
              <button
                type="button"
                onClick={() => setPrintMode('double')}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  printMode === 'double'
                    ? 'border-[#C5A059] bg-[#1E1712] text-[#F4EFE6] ring-1 ring-[#C5A059]'
                    : 'border-[#C5A059]/20 bg-[#120F0C] text-[#A89F91] hover:border-[#C5A059]/40 hover:bg-[#16130F]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#ECC47E]" />
                    <span className="text-xs font-bold text-[#F4EFE6] font-mono">
                      2 Strip Kembar
                    </span>
                  </div>
                  {printMode === 'double' && (
                    <span className="w-4 h-4 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0C0A08] text-[10px]">
                      ✓
                    </span>
                  )}
                </div>

                {/* Mini Visual Diagram (2 strips side-by-side) */}
                <div className="w-full h-16 bg-[#080705] rounded-lg border border-[#C5A059]/25 flex items-center justify-center gap-2 p-1.5 mb-2">
                  <div className="h-full w-5 rounded-xs bg-[#C5A059]/30 border border-[#C5A059]/50 flex flex-col justify-around py-0.5">
                    <div className="w-3 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                    <div className="w-3 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                    <div className="w-3 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                    <div className="w-3 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                  </div>
                  <div className="h-full flex flex-col justify-between items-center text-[8px] text-[#A89F91]/70">
                    <span className="h-full border-l border-dashed border-[#C5A059]/40" />
                  </div>
                  <div className="h-full w-5 rounded-xs bg-[#C5A059]/30 border border-[#C5A059]/50 flex flex-col justify-around py-0.5">
                    <div className="w-3 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                    <div className="w-3 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                    <div className="w-3 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                    <div className="w-3 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                  </div>
                </div>

                <p className="text-[10px] text-[#A89F91] leading-tight">
                  Format photobooth 4×6" / A4. Dua strip kembar dengan garis potong untuk dibagi berdua.
                </p>
              </button>

              {/* Option 2: 1 Strip Tunggal */}
              <button
                type="button"
                onClick={() => setPrintMode('single')}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  printMode === 'single'
                    ? 'border-[#C5A059] bg-[#1E1712] text-[#F4EFE6] ring-1 ring-[#C5A059]'
                    : 'border-[#C5A059]/20 bg-[#120F0C] text-[#A89F91] hover:border-[#C5A059]/40 hover:bg-[#16130F]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#ECC47E]" />
                    <span className="text-xs font-bold text-[#F4EFE6] font-mono">
                      1 Strip Tunggal
                    </span>
                  </div>
                  {printMode === 'single' && (
                    <span className="w-4 h-4 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0C0A08] text-[10px]">
                      ✓
                    </span>
                  )}
                </div>

                {/* Mini Visual Diagram (1 strip centered) */}
                <div className="w-full h-16 bg-[#080705] rounded-lg border border-[#C5A059]/25 flex items-center justify-center p-1.5 mb-2">
                  <div className="h-full w-6 rounded-xs bg-[#C5A059]/30 border border-[#C5A059]/50 flex flex-col justify-around py-0.5">
                    <div className="w-4 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                    <div className="w-4 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                    <div className="w-4 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                    <div className="w-4 h-2 bg-[#ECC47E]/60 mx-auto rounded-[1px]" />
                  </div>
                </div>

                <p className="text-[10px] text-[#A89F91] leading-tight">
                  Format 2×6" tunggal di tengah kertas. Cocok untuk printer foto saku atau kertas strip.
                </p>
              </button>
            </div>
          </div>

          {/* Quick Printer Tips Callout */}
          <div className="p-3.5 rounded-xl bg-[#14110E] border border-[#C5A059]/25 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#ECC47E] shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#A89F91] space-y-1">
              <span className="font-bold text-[#ECC47E] block font-mono">
                Tips Kualitas Cetak Terbaik:
              </span>
              <ul className="list-disc pl-3.5 space-y-0.5 text-[10.5px]">
                <li>
                  Centang opsi <strong className="text-[#F4EFE6]">"Grafis Latar Belakang" (Background graphics)</strong> di jendela print agar corak batik tercetak utuh.
                </li>
                <li>
                  Atur <strong className="text-[#F4EFE6]">Margin ke "None" atau "Minimum"</strong> agar strip tercetak proporsional.
                </li>
                <li>
                  Gunakan kertas foto glossy ukuran <strong className="text-[#F4EFE6]">4×6 inci (10×15 cm)</strong> atau <strong className="text-[#F4EFE6]">A4</strong>.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-[#C5A059]/20 bg-[#14110E] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#C5A059]/30 text-xs font-mono text-[#A89F91] hover:text-[#F4EFE6] hover:bg-white/5 transition-colors cursor-pointer"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleStartPrint}
            disabled={isPrinting}
            className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D5B36E] text-[#0C0A08] text-xs font-mono uppercase font-bold tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-75"
          >
            {printSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#0C0A08]" />
                <span>Dialog Print Terbuka</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4 text-[#0C0A08]" />
                <span>{isPrinting ? 'Mempersiapkan...' : 'Buka Dialog Print'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
