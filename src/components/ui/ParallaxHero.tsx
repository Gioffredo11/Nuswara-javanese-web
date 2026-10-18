'use client';

import React, { useEffect, useRef } from 'react';

interface ParallaxHeroProps {
  /** How much to offset the image as a fraction of scroll (0.15 = 15%) */
  speed?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * ParallaxHero — wraps hero section children and applies a subtle CSS-transform
 * parallax to any child with the `data-parallax` attribute.
 *
 * The parallax layer translates upward as the user scrolls down, creating
 * depth between foreground content and the background image.
 *
 * Uses rAF + passive scroll listener for 60fps performance.
 * Skips entirely for prefers-reduced-motion.
 */
export function ParallaxHero({
  speed = 0.18,
  children,
  className = '',
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const currentOffset = useRef(0);
  const targetOffset = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    const parallaxLayer = container.querySelector<HTMLElement>('[data-parallax]');
    if (!parallaxLayer) return;

    // Smooth lerp toward target
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      // Only animate when visible
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      targetOffset.current = window.scrollY * speed;
    };

    const tick = () => {
      currentOffset.current = lerp(currentOffset.current, targetOffset.current, 0.07);
      if (parallaxLayer) {
        parallaxLayer.style.transform = `translate3d(0, ${currentOffset.current}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export default ParallaxHero;
