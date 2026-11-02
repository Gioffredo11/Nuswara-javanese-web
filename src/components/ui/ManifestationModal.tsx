'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';
import { ManifestationClient } from '@/app/manifestation/ManifestationClient';

interface ManifestationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManifestationModal({ isOpen, onClose }: ManifestationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 180);
  }, [onClose]);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Prevent background body scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manifestation-modal-title"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
    >
      {/* Backdrop with smooth blur & fade */}
      <div
        className={`fixed inset-0 bg-black/85 transition-opacity duration-200 cursor-pointer ${
          closing ? 'opacity-0' : 'opacity-100 backdrop-blur-md animate-in fade-in'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-radial from-[#C5A059]/15 via-black/40 to-black/90 pointer-events-none" />
      </div>

      {/* Modal Dialog Card with Scale Animation */}
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#14110E] border border-[#C5A059]/40 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-auto transition-all duration-200 ${
          closing
            ? 'opacity-0 scale-95 translate-y-3'
            : 'opacity-100 scale-100 translate-y-0 animate-in zoom-in-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Flare */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Background Subtle Batik Watermark */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] select-none"
          style={{
            backgroundImage: "url('/images/patterns/parang-kencana.svg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#C5A059]/20 shrink-0 bg-[#0C0A08]/95 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#C5A059] animate-pulse">❖</span>
            <span
              id="manifestation-modal-title"
              className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5A059] font-bold"
            >
              PIWULANG LUHUR • KARTU HARIAN
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C5A059]/15 text-[#ECC47E] border border-[#C5A059]/30">
              <Sparkles className="w-2.5 h-2.5 text-[#ECC47E]" />
              <span>EDISI 24 JAM</span>
            </span>
          </div>

          {/* Close & Back to Landing Page Button (NO sound button) */}
          <button
            type="button"
            onClick={handleClose}
            className="px-3 py-1.5 rounded-full text-[#ECC47E] hover:text-[#FFF8E7] bg-[#1F1710] hover:bg-[#2A1F16] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer active:scale-95 shadow-sm"
            aria-label="Tutup dan Kembali ke Beranda"
            title="Tutup dan Kembali ke Beranda"
          >
            <span>Tutup</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body: Embed ManifestationClient */}
        <div className="relative z-10 p-3 sm:p-5 overflow-y-auto flex-1 bg-[#14110E]/95">
          <ManifestationClient isModal={true} onClose={handleClose} />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ManifestationModal;
