'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * PageTransition — Cinematic ink-wash fade overlay that plays on every
 * route change. Uses a translucent obsidian veil that fades in/out
 * (350ms each) so page content appears to "breathe" rather than hard-cut.
 *
 * Implementation strategy:
 * — A fixed full-screen div sits at z-[200] but is pointer-events-none
 *   so it never blocks interaction.
 * — Pathname changes trigger opacity: 0 → 1 → 0 via CSS transitions.
 * — Respects prefers-reduced-motion by skipping entirely.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef<string>(pathname);
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  useEffect(() => {
    // Skip on first render or when motion is reduced
    if (pathname === prevPathRef.current || reducedMotion.current) {
      prevPathRef.current = pathname;
      return;
    }
    prevPathRef.current = pathname;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Flash in quickly, then fade out
    overlay.style.transition = 'none';
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';

    const timer = setTimeout(() => {
      overlay.style.transition = 'opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Ink-wash veil */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background:
            'radial-gradient(ellipse at center, rgba(28,16,8,0.97) 0%, rgba(13,12,10,0.99) 100%)',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      {children}
    </>
  );
}

export default PageTransition;
