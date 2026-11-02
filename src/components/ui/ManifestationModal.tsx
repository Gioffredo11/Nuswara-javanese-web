'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';
import { ManifestationClient } from '@/app/manifestation/ManifestationClient';

interface ManifestationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManifestationModal({ isOpen, onClose }: ManifestationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync isOpen prop to rendered lifecycle with entrance/exit transitions
  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setShouldRender(true);
      setIsClosing(false);
    } else {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setShouldRender(false);
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      onClose();
    }, 220);
  }, [isClosing, onClose]);

  // Clean up any pending timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    if (!shouldRender || isClosing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shouldRender, isClosing, handleClose]);

  // Prevent background body scrolling while modal is open
  useEffect(() => {
    if (shouldRender) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [shouldRender]);

  if (!shouldRender || !mounted) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manifestation-modal-title"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
    >
      {/* Backdrop with cinematic entrance/exit blur & fade */}
      <div
        className={`fixed inset-0 bg-black/85 cursor-pointer ${
          isClosing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-radial from-[#C5A059]/15 via-black/40 to-black/90 pointer-events-none" />
      </div>

      {/* Modal Dialog Card with smooth spring-like entrance & clean exit */}
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#14110E] border border-[#C5A059]/45 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(197,160,89,0.15)] overflow-hidden z-10 my-auto ${
          isClosing ? 'modal-card-exit' : 'modal-card-enter'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mystic Golden Flare that blooms on opening */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#ECC47E]/25 via-[#C5A059]/15 to-transparent rounded-full blur-3xl pointer-events-none modal-aura-bloom" />

        {/* Traditional Corner Ornaments */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C5A059]/40 pointer-events-none rounded-tl-sm" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C5A059]/40 pointer-events-none rounded-tr-sm" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#C5A059]/40 pointer-events-none rounded-bl-sm" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C5A059]/40 pointer-events-none rounded-br-sm" />

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
        <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#C5A059]/20 shrink-0 bg-[#0C0A08]/95 backdrop-blur-xs modal-header-enter">
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

          {/* Close & Back to Landing Page Button */}
          <button
            type="button"
            onClick={handleClose}
            className="px-3.5 py-1.5 rounded-full text-[#ECC47E] hover:text-[#FFF8E7] bg-[#1F1710] hover:bg-[#2A1F16] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer active:scale-95 shadow-sm hover:shadow-[0_0_12px_rgba(197,160,89,0.3)]"
            aria-label="Tutup dan Kembali ke Beranda"
            title="Tutup dan Kembali ke Beranda"
          >
            <span>Tutup</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body: Embed ManifestationClient with staggered entrance */}
        <div className="relative z-10 p-3 sm:p-5 overflow-y-auto flex-1 bg-[#14110E]/95 modal-body-enter">
          <ManifestationClient isModal={true} onClose={handleClose} />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ManifestationModal;
