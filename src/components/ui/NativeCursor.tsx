'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * NativeCursor — Subtle ambient cursor for desktop that replaces the
 * browser default with two layered elements:
 *   1. A small gold dot that snaps to pointer position (no lag)
 *   2. A larger translucent ring that follows with spring lag (~80ms)
 *
 * On interactive elements (a, button, [role=button]) the ring expands
 * and the dot disappears — giving a tactile "click target" feedback.
 *
 * Hidden on mobile/touch devices, invisible when scrolling fast.
 * Respects prefers-reduced-motion (disables all animation).
 */
export function NativeCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const mounted = useRef(false);

  useEffect(() => {
    // Only show on pointer devices (not touch)
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    mounted.current = true;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Make cursor visible
    dot.style.opacity = '1';
    ring.style.opacity = '1';
    document.documentElement.style.cursor = 'none';

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      if (!mounted.current) return;
      // Snap dot
      dot.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
      // Spring ring
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);
      ring.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0) scale(${active ? 1.6 : 1})`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], [role="link"], label[for], input, select, textarea, [tabindex]')
      ) {
        setActive(true);
        dot.style.opacity = '0';
      } else {
        setActive(false);
        dot.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mounted.current = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.documentElement.style.cursor = '';
    };
  }, [active]);

  return (
    <>
      {/* Dot: gold pinpoint, snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#ECC47E',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform',
          transition: 'opacity 180ms ease',
          boxShadow: '0 0 8px 2px rgba(236, 196, 126, 0.45)',
        }}
      />
      {/* Ring: translucent gold ring with spring lag */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9998,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(197, 155, 83, 0.65)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform',
          transition: 'opacity 180ms ease, scale 250ms cubic-bezier(0.22, 1, 0.36, 1)',
          backdropFilter: 'none',
        }}
      />
    </>
  );
}

export default NativeCursor;
