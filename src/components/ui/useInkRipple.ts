'use client';

import { useCallback } from 'react';

/**
 * useInkRipple — Returns a click handler that spawns a gold ink-spread
 * ripple at the pointer's position, then auto-removes it after animation.
 *
 * Usage:
 *   const onRipple = useInkRipple();
 *   <button onClick={onRipple} className="relative overflow-hidden ...">
 */
export function useInkRipple() {
  const onRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    // Skip if reduced motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - rect.left - 30}px`;
    ripple.style.top = `${e.clientY - rect.top - 30}px`;
    btn.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }, []);

  return onRipple;
}
