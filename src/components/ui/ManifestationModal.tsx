'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';
import { ManifestationClient } from '@/app/manifestation/ManifestationClient';

interface ManifestationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManifestationModal({ isOpen, onClose }: ManifestationModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
      {/* Backdrop with blur & darken */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#120F0C] border border-[#C59B53]/40 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Border Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#ECC47E] to-transparent shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#C59B53]/20 shrink-0 bg-[#16120E]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ECC47E] animate-pulse" />
            <span
              id="manifestation-modal-title"
              className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C59B53] font-semibold"
            >
              PIWULANG LUHUR • KARTU HARIAN
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#B9B0A3] hover:text-white bg-[#1A140F] hover:bg-[#281F17] border border-[#C59B53]/30 transition-all cursor-pointer"
            aria-label="Tutup Dialog Manifestasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Embed ManifestationClient */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1">
          <ManifestationClient isModal={true} onClose={onClose} />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ManifestationModal;
