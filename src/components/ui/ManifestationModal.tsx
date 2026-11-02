'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ManifestationClient } from '@/app/manifestation/ManifestationClient';
import { playGamelanBell, isSoundMuted, setSoundMuted } from '@/lib/audio/sacredSounds';

interface ManifestationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManifestationModal({ isOpen, onClose }: ManifestationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMuted(isSoundMuted());
  }, []);

  // Play welcome gamelan chime when modal opens
  useEffect(() => {
    if (isOpen) {
      // Gentle chime with slight delay so browser allows audio context
      const timer = setTimeout(() => {
        playGamelanBell(528);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
    if (!next) {
      playGamelanBell(660);
    }
  };

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
      {/* Backdrop with blur, radial glow & darken */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      >
        {/* Sacred Golden Ambient Flare in Center */}
        <div className="absolute inset-0 bg-radial from-[#C5A059]/15 via-black/40 to-black/90 pointer-events-none" />
      </div>

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#14110E] border border-[#C5A059]/40 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 animate-in zoom-in-95 duration-300 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="p-1.5 rounded-full text-[#A89F91] hover:text-[#ECC47E] bg-[#14110E] hover:bg-[#1C1610] border border-[#C5A059]/30 transition-colors cursor-pointer"
              title={muted ? 'Aktifkan Suara Gamelan' : 'Bisukan Suara'}
              aria-label={muted ? 'Aktifkan Suara Gamelan' : 'Bisukan Suara'}
            >
              {muted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-[#ECC47E]" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#A89F91] hover:text-[#F4EFE6] bg-[#14110E] hover:bg-[#1C1610] border border-[#C5A059]/30 transition-colors cursor-pointer"
              aria-label="Tutup Dialog Manifestasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Embed ManifestationClient */}
        <div className="relative z-10 p-3 sm:p-5 overflow-y-auto flex-1 bg-[#14110E]/95">
          <ManifestationClient isModal={true} onClose={onClose} />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ManifestationModal;
