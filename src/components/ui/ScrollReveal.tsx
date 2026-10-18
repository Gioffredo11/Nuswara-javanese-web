'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  distance?: number;
  once?: boolean;
  threshold?: number;
}

/**
 * ScrollReveal — Spring-physics scroll-triggered entrance animation.
 * Uses cubic-bezier(0.22, 1, 0.36, 1) — equivalent to back.out(1.2) —
 * for a natural, native-feeling settle. Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 680,
  direction = 'up',
  distance = 22,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [settled, setSettled] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Immediately visible if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      setSettled(true);
      return;
    }

    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Release GPU layer once animation finishes
          timerRef.current = setTimeout(
            () => setSettled(true),
            duration + delay + 120
          );
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
          setSettled(false);
        }
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [once, duration, delay, threshold]);

  const getInitialTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':    return `translate3d(0, ${distance}px, 0) scale(0.986)`;
      case 'down':  return `translate3d(0, -${distance}px, 0) scale(0.986)`;
      case 'left':  return `translate3d(${distance}px, 0, 0)`;
      case 'right': return `translate3d(-${distance}px, 0, 0)`;
      case 'scale': return 'scale(0.88)';
      case 'fade':  return 'translate3d(0, 0, 0)';
      default:      return `translate3d(0, ${distance}px, 0) scale(0.986)`;
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getInitialTransform(),
        // Spring-physics easing: fast out, natural settle
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        // Promote to GPU only during animation; release afterwards
        willChange: settled ? 'auto' : 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
