'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const totalHeight = scrollHeight - windowHeight;

      if (scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollProgress(progress);

        // Check if user has reached bottom (>= 96% or within 40px of page bottom)
        const atBottom = progress >= 96 || scrollY + windowHeight >= scrollHeight - 40;
        setIsAtBottom(atBottom);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  // Circle radius 18, circumference 2 * pi * 18 ~ 113.1
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const displayProgress = isAtBottom ? 100 : scrollProgress;
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 pointer-events-auto">
      {/* iOS-style ambient bloom glow behind the capsule */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none transform-gpu ${
          isAtBottom
            ? 'bg-[#ECC47E]/25 blur-xl scale-110 opacity-100'
            : 'bg-[#C59B53]/15 blur-md scale-90 opacity-40'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      />

      {/* Main Interactive Button with iOS Dynamic Island spring physics */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`relative flex items-center h-12 rounded-full cursor-pointer select-none outline-none border transition-all duration-500 transform-gpu ${
          isAtBottom
            ? 'pl-4 pr-1.5 bg-[#17130E]/95 border-[#ECC47E]/80 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.8),0_0_28px_rgba(236,196,126,0.35)] ring-1 ring-[#ECC47E]/30'
            : 'px-1.5 bg-[#14110E]/90 border-[#C59B53]/40 shadow-[0_8px_24px_rgba(0,0,0,0.6)] ring-1 ring-white/5 hover:border-[#ECC47E]/70 hover:shadow-[0_8px_30px_rgba(197,155,83,0.3)]'
        } backdrop-blur-2xl hover:scale-[1.03] active:scale-[0.92] group`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        aria-label={isAtBottom ? 'Yeyy selesai! Kembali ke atas' : 'Kembali ke atas halaman'}
        title={isAtBottom ? 'Yeyy selesai! Klik untuk kembali ke atas' : `Kembali ke atas (${Math.round(scrollProgress)}%)`}
      >
        {/* iOS Dynamic Island expanding track (0fr -> 1fr grid) */}
        <div
          className="grid transition-[grid-template-columns] duration-500 overflow-hidden"
          style={{
            gridTemplateColumns: isAtBottom ? '1fr' : '0fr',
            transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div
              className={`flex items-center gap-2 pr-3 whitespace-nowrap transition-all duration-500 transform-gpu ${
                isAtBottom
                  ? 'opacity-100 translate-x-0 scale-100 blur-0 delay-100'
                  : 'opacity-0 -translate-x-3 scale-90 blur-[2px]'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              {/* Sparkle badge with gentle iOS pulsing glow */}
              <div className="w-5 h-5 rounded-full bg-[#ECC47E]/15 border border-[#ECC47E]/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-3 h-3 text-[#ECC47E] animate-pulse" />
              </div>

              {/* Text styled with Apple HIG aesthetics */}
              <span className="text-[13px] font-medium tracking-tight text-[#FFF8EC] font-sans">
                Yeyy selesai!
              </span>

              <span className="text-xs">🎉</span>
            </div>
          </div>
        </div>

        {/* Circular Progress & Arrow — Always centered & fixed size */}
        <div className="relative w-9 h-9 flex items-center justify-center shrink-0 rounded-full">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="rgba(197, 155, 83, 0.2)"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="#ECC47E"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-300"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            />
          </svg>

          {/* Center Arrow with subtle spring hover */}
          <ArrowUp
            className={`w-4 h-4 text-[#ECC47E] transition-all duration-300 ${
              isAtBottom
                ? '-translate-y-0.5 text-[#FFF8EC]'
                : 'group-hover:-translate-y-0.5'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          />
        </div>
      </button>
    </div>
  );
}

export default ScrollToTop;
