'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    setMuted(isSoundMuted());
  }, []);

  // Smooth Enter and Exit State Machine
  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setIsRendered(true);
      setIsClosing(false);

      // Play soft opening gamelan chime
      const timer = setTimeout(() => {
        playGamelanBell(528);
      }, 150);
      return () => clearTimeout(timer);
    } else if (isRendered && !isClosing) {
      // Parent closed modal: trigger exit transition before unmounting
      setIsClosing(true);
      closeTimerRef.current = setTimeout(() => {
        setIsRendered(false);
        setIsClosing(false);
      }, 280);
      return () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      };
    }
  }, [isOpen, isRendered, isClosing]);

  // Request close with smooth exit animation
  const handleRequestClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    // Subtle closing tone
    playGamelanBell(396);
    closeTimerRef.current = setTimeout(() => {
      onClose();
      setIsRendered(false);
      setIsClosing(false);
    }, 280);
  }, [isClosing, onClose]);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
    if (!next) {
      playGamelanBell(660);
    }
  };

  // Handle escape key to close modal with animation
  useEffect(() => {
    if (!isOpen || isClosing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleRequestClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isClosing, handleRequestClose]);

  // Prevent background body scrolling while modal is active
  useEffect(() => {
    if (isRendered) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isRendered]);

  if (!isRendered || !mounted) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manifestation-modal-title"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
    >
      {/* Backdrop with smooth blur, radial glow & fade in/out */}
      <div
        className={`fixed inset-0 bg-black/85 transition-all duration-300 ease-out cursor-pointer ${
          isClosing
            ? 'opacity-0 backdrop-blur-none pointer-events-none'
            : 'opacity-100 backdrop-blur-md'
        }`}
        onClick={handleRequestClose}
        aria-hidden="true"
      >
        {/* Sacred Golden Ambient Flare in Center */}
        <div
          className={`absolute inset-0 bg-radial from-[#C5A059]/20 via-black/40 to-black/95 transition-opacity duration-300 pointer-events-none ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Modal Dialog Card with Scale & Float Enter/Exit Animation */}
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#14110E] border border-[#C5A059]/40 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-auto transition-all duration-300 ${
          isClosing
            ? 'opacity-0 scale-95 translate-y-4 ease-in'
            : 'opacity-100 scale-100 translate-y-0 ease-out shadow-[0_0_60px_rgba(197,160,89,0.25)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Expanding Golden Aura Bloom on Entrance */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

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
              onClick={handleRequestClose}
              className="p-1.5 rounded-full text-[#A89F91] hover:text-[#F4EFE6] bg-[#14110E] hover:bg-[#1C1610] border border-[#C5A059]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Tutup Dialog Manifestasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Embed ManifestationClient */}
        <div className="relative z-10 p-3 sm:p-5 overflow-y-auto flex-1 bg-[#14110E]/95">
          <ManifestationClient isModal={true} onClose={handleRequestClose} />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ManifestationModal;
