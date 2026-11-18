'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/components/common/Link';
import {
  Sparkles,
  BookOpen,
  Camera,
  GitFork,
  Compass,
  Layers,
  Heart,
  Home,
  Users,
  Utensils,
  Landmark,
} from 'lucide-react';
import { ManifestationModal } from '@/components/ui/ManifestationModal';
import { getTarotImagePath } from '@/components/ui/WayangVectors';

interface DrawnManifestationState {
  characterSlug: string;
  characterName: string;
  philosophyTitle: string;
  localDate?: string;
}

// Primary Navigation Links matching hero architecture & mobile icon dock
export const PRIMARY_NAV_LINKS = [
  { sectionId: 'beranda', label: 'Beranda', shortLabel: 'Beranda', icon: Home },
  { sectionId: 'sejarah', label: 'Sejarah', shortLabel: 'Sejarah', icon: BookOpen },
  { sectionId: 'tokoh', label: 'Tokoh', shortLabel: 'Tokoh', icon: Users },
  { sectionId: 'budaya', label: 'Budaya', shortLabel: 'Budaya', icon: Layers },
  { sectionId: 'kuliner', label: 'Kuliner', shortLabel: 'Kuliner', icon: Utensils },
  { sectionId: 'monumen', label: 'Tempat Sakral', shortLabel: 'Sakral', icon: Landmark },
] as const;

export const ALL_MOBILE_NAV_LINKS = [
  { sectionId: 'beranda', label: 'Beranda (Pameran)', icon: Home },
  { sectionId: 'sejarah', label: 'Sejarah Jawa Tengah', icon: BookOpen },
  { sectionId: 'tokoh', label: 'Tokoh & Pahlawan', icon: Users },
  { sectionId: 'budaya', label: 'Budaya & Wayangpedia', icon: Layers },
  { sectionId: 'kuliner', label: 'Khazanah Kuliner Jawa', icon: Utensils },
  { sectionId: 'monumen', label: 'Tempat Sakral & Candi', icon: Landmark },
  { sectionId: 'family-tree', label: 'Silsilah Purwa', icon: GitFork },
  { sectionId: 'ragam-rupa', label: 'Ragam Rupa Wayang', icon: Layers },
  { sectionId: 'oracle', label: 'Javanese Oracle (Weton)', icon: Sparkles },
  { sectionId: 'photobooth', label: 'Web Photobooth 4-Cut', icon: Camera },
];

// Compatibility aliases for hot reloading and external references
export const primaryNavLinks = PRIMARY_NAV_LINKS;
export const allMobileNavLinks = ALL_MOBILE_NAV_LINKS;

export function Navbar() {
  const primaryNavLinks = PRIMARY_NAV_LINKS;
  const allMobileNavLinks = ALL_MOBILE_NAV_LINKS;

  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [isScrolled, setIsScrolled] = useState(false);
  const [manifestModalOpen, setManifestModalOpen] = useState(false);
  const [drawnManifestation, setDrawnManifestation] = useState<DrawnManifestationState | null>(null);

  // Lock scroll-triggered activeSection updates during programmatic click-to-scroll
  const isNavigatingRef = useRef<NodeJS.Timeout | null>(null);

  const startNavigatingLock = useCallback((duration = 1100) => {
    if (isNavigatingRef.current) {
      clearTimeout(isNavigatingRef.current);
    }
    isNavigatingRef.current = setTimeout(() => {
      isNavigatingRef.current = null;
    }, duration);
  }, []);

  // Cancel navigation lock immediately if user manually interacts (wheel or touch)
  useEffect(() => {
    const cancelNavigationLock = () => {
      if (isNavigatingRef.current) {
        clearTimeout(isNavigatingRef.current);
        isNavigatingRef.current = null;
      }
    };

    window.addEventListener('wheel', cancelNavigationLock, { passive: true });
    window.addEventListener('touchmove', cancelNavigationLock, { passive: true });
    return () => {
      window.removeEventListener('wheel', cancelNavigationLock);
      window.removeEventListener('touchmove', cancelNavigationLock);
    };
  }, []);

  // Synchronize drawn manifestation from localStorage and API
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nuswara_daily_manifestation');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.characterSlug) {
          setDrawnManifestation(parsed);
        }
      }
    } catch {}

    async function checkTodayManifestation() {
      try {
        const res = await fetch('/api/manifestation/today');
        if (!res.ok) return;
        const json = await res.json();
        const payload = json.data || json;
        if (payload && payload.philosophy) {
          const char = payload.relatedCharacters?.[0];
          const slug = char?.slug || payload.philosophy?.primaryCharacter?.slug || 'gatotkaca';
          const name = char?.name || payload.philosophy?.primaryCharacter?.name || 'Wayang Piwulang';
          const data: DrawnManifestationState = {
            characterSlug: slug,
            characterName: name,
            philosophyTitle: payload.philosophy.title,
            localDate: payload.localDate,
          };
          setDrawnManifestation(data);
          try {
            localStorage.setItem('nuswara_daily_manifestation', JSON.stringify(data));
          } catch {}
        }
      } catch {}
    }
    checkTodayManifestation();

    const handleUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<DrawnManifestationState>;
      if (customEvent.detail && customEvent.detail.characterSlug) {
        setDrawnManifestation(customEvent.detail);
      }
    };
    window.addEventListener('nuswara-manifestation-drawn', handleUpdated);
    return () => {
      window.removeEventListener('nuswara-manifestation-drawn', handleUpdated);
    };
  }, []);

  // Track scroll position to transition header background and active section
  useEffect(() => {
    const handleScroll = () => {
      const isNowScrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== isNowScrolled ? isNowScrolled : prev));

      if (pathname !== '/') return;

      // Ignore scroll-driven active section changes during programmatic smooth navigation
      if (isNavigatingRef.current) return;

      const scrollPos = window.scrollY + 200;

      // Bottom of page highlights Tempat Sakral (including photobooth)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 150
      ) {
        setActiveSection((prev) => (prev !== 'monumen' ? 'monumen' : prev));
        return;
      }

      if (window.scrollY < 200) {
        setActiveSection((prev) => (prev !== 'beranda' ? 'beranda' : prev));
        return;
      }

      const sectionMappings = [
        { id: 'photobooth', target: 'monumen' },
        { id: 'monumen', target: 'monumen' },
        { id: 'kuliner', target: 'kuliner' },
        { id: 'oracle', target: 'budaya' },
        { id: 'family-tree', target: 'budaya' },
        { id: 'wayangpedia', target: 'budaya' },
        { id: 'budaya', target: 'budaya' },
        { id: 'tokoh', target: 'tokoh' },
        { id: 'sejarah', target: 'sejarah' },
      ];

      for (const item of sectionMappings) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection((prev) => (prev !== item.target ? item.target : prev));
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Support open-manifestation-modal event across components
  useEffect(() => {
    const handleOpenModal = () => setManifestModalOpen(true);
    window.addEventListener('open-manifestation-modal', handleOpenModal);
    return () => window.removeEventListener('open-manifestation-modal', handleOpenModal);
  }, []);

  const handleNavClick = (sectionId: string) => {
    // Direct route targets
    if (sectionId === 'manifestasi' || sectionId === 'manifestation') {
      setManifestModalOpen(true);
      return;
    }
    if (sectionId === 'oracle') {
      router.push('/oracle');
      return;
    }
    if (sectionId === 'photobooth') {
      router.push('/photobooth');
      return;
    }
    if (sectionId === 'family-tree') {
      router.push('/family-tree');
      return;
    }
    if (sectionId === 'lakon') {
      router.push('/lakon');
      return;
    }
    if (sectionId === 'ragam-rupa' || sectionId === 'batik') {
      router.push('/ragam-rupa');
      return;
    }

    if (pathname === '/') {
      if (sectionId === 'beranda') {
        startNavigatingLock(1100);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setActiveSection('beranda');
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) {
        startNavigatingLock(1100);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${sectionId}`);
        setActiveSection(sectionId);
        return;
      }
    }

    if (sectionId === 'beranda') {
      router.push('/');
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      startNavigatingLock(1100);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      setActiveSection('beranda');
    }
  };

  const isLinkActive = useCallback(
    (sectionId: string) => {
      if (
        (sectionId === 'manifestasi' || sectionId === 'manifestation') &&
        pathname.startsWith('/manifestation')
      ) {
        return true;
      }
      if (sectionId === 'tokoh' && pathname.startsWith('/tokoh')) return true;
      if (sectionId === 'sejarah' && pathname.startsWith('/sejarah')) return true;
      if (sectionId === 'kuliner' && pathname.startsWith('/kuliner')) return true;
      if (
        sectionId === 'monumen' &&
        (pathname.startsWith('/tempat-sakral') ||
          pathname.startsWith('/monumen') ||
          pathname.startsWith('/photobooth'))
      ) {
        return true;
      }
      if (
        sectionId === 'budaya' &&
        (pathname.startsWith('/wayangpedia') ||
          pathname.startsWith('/family-tree') ||
          pathname.startsWith('/lakon') ||
          pathname.startsWith('/ragam-rupa') ||
          pathname.startsWith('/oracle'))
      ) {
        return true;
      }
      if (pathname === '/') {
        return activeSection === sectionId;
      }
      return false;
    },
    [pathname, activeSection]
  );

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
    height: number;
    opacity: number;
    duration: number;
  }>({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
    duration: 380,
  });

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const activeItem = PRIMARY_NAV_LINKS.find((item) => isLinkActive(item.sectionId));
    if (!activeItem) {
      setIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      return;
    }

    const btn = itemRefs.current[activeItem.sectionId];
    if (!btn) {
      setIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const nextLeft = btnRect.left - navRect.left;
    const nextWidth = btnRect.width;
    const nextHeight = btnRect.height;

    setIndicator((prev) => {
      if (
        prev.opacity === 1 &&
        Math.abs(prev.left - nextLeft) < 0.5 &&
        Math.abs(prev.width - nextWidth) < 0.5 &&
        Math.abs(prev.height - nextHeight) < 0.5
      ) {
        return prev;
      }

      const distance = prev.opacity === 0 ? 0 : Math.abs(nextLeft - prev.left);
      // Dynamic duration based on travel distance across navbar:
      // ~380ms for adjacent items up to ~620ms for skipping across multiple items (longkap-longkap)
      const duration =
        prev.opacity === 0 ? 0 : Math.min(620, Math.max(380, 320 + Math.round(distance * 0.75)));

      return {
        left: nextLeft,
        width: nextWidth,
        height: nextHeight,
        opacity: 1,
        duration,
      };
    });
  }, [isLinkActive]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const onResize = () => updateIndicator();
    window.addEventListener('resize', onResize);
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(onResize);
    }
    return () => window.removeEventListener('resize', onResize);
  }, [updateIndicator]);

  return (
    <>
      {/* ============================================================ */}
      {/* 1. TOP HEADER (Desktop Floating Pill & Mobile Minimal Header) */}
      {/* ============================================================ */}
      <header
        className="fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center pointer-events-none px-3 sm:px-6 transition-all duration-300"
      >
        <div
          className={`pointer-events-auto relative w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 ${
            isScrolled
              ? 'bg-[#0D0C0A]/95 backdrop-blur-2xl border border-[#C59B53]/45'
              : 'bg-[#0D0C0A]/80 backdrop-blur-xl border border-[#C59B53]/25'
          }`}
        >
          {/* Brand "NUSWARA" Official Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group relative flex items-center rounded-full py-0.5 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B53]"
            aria-label="NUSWARA - Beranda"
          >
            <div className="relative h-7 sm:h-8 w-auto aspect-[870/250] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo/nuswara-logo.png"
                alt="NUSWARA"
                width={125}
                height={36}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAV: Pill Links & Daily Manifestation Tarot Card */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <nav
              ref={navRef}
              className="relative flex items-center gap-1 xl:gap-1.5 p-0.5 rounded-full"
              aria-label="Navigasi Utama"
            >
              {/* Liquid Glass Sliding Active Pill Indicator */}
              <div
                className="absolute top-0.5 left-0 rounded-full pointer-events-none will-change-transform z-0"
                style={{
                  transform: `translate3d(${indicator.left}px, 0, 0)`,
                  width: `${indicator.width}px`,
                  height: `${indicator.height}px`,
                  opacity: indicator.opacity,
                  transitionProperty: 'transform, width, height, opacity',
                  transitionDuration: `${indicator.duration}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Luminous Liquid Glass Core with Warm Amber Glow Shadow */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#F5DE9B]/35 via-[#C59B53]/25 to-[#7E5718]/40 border border-[#ECC47E]/65 backdrop-blur-md shadow-[0_0_18px_rgba(236,196,126,0.45),inset_0_1px_1.5px_rgba(255,245,220,0.65)] overflow-hidden">
                  {/* Top Specular Sheen (Curved Glass Highlight) */}
                  <div className="absolute inset-x-2 top-0.5 h-[42%] rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                  {/* Ambient Amber Core */}
                  <div className="absolute inset-0 bg-radial from-[#ECC47E]/20 to-transparent pointer-events-none" />
                </div>
                {/* Ambient gold glow bloom behind the active pill */}
                <div className="absolute -inset-1 rounded-full bg-[#ECC47E]/25 blur-sm pointer-events-none -z-10" />
              </div>

              {PRIMARY_NAV_LINKS.map((item) => {
                const active = isLinkActive(item.sectionId);
                return (
                  <button
                    key={item.sectionId}
                    ref={(el) => {
                      itemRefs.current[item.sectionId] = el;
                    }}
                    type="button"
                    onClick={() => handleNavClick(item.sectionId)}
                    className={`relative z-10 px-4 py-1.5 rounded-full text-xs xl:text-sm tracking-wide transition-colors duration-300 cursor-pointer font-sans whitespace-nowrap select-none ${
                      active
                        ? 'text-[#FFF2DC] font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
                        : 'text-[#B9B0A3] hover:text-[#F0E6D4]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Tarot Card Button */}
            <div className="flex items-center pl-2 border-l border-[#C59B53]/25">
              <button
                type="button"
                onClick={() => setManifestModalOpen(true)}
                className={`group relative w-8.5 h-11 rounded-[6px] border ${
                  drawnManifestation
                    ? 'border-[#ECC47E] hover:border-[#FFF0D4]'
                    : 'border-[#C59B53]/80 hover:border-[#ECC47E]'
                } bg-gradient-to-b from-[#2E2014] via-[#1B130D] to-[#100A06] p-[2.5px] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden press-scale`}
                title={
                  drawnManifestation
                    ? `Kartu Manifestasi Hari Ini: ${drawnManifestation.characterName} (${drawnManifestation.philosophyTitle})`
                    : 'Buka Kartu Manifestasi Harian'
                }
                aria-label={
                  drawnManifestation
                    ? `Kartu Manifestasi Hari Ini: ${drawnManifestation.characterName}`
                    : 'Buka Kartu Manifestasi Harian'
                }
              >
                {drawnManifestation ? (
                  <div className="relative w-full h-full rounded-[3px] overflow-hidden border border-[#ECC47E]/70 bg-[#0D0B09]">
                    <Image
                      src={getTarotImagePath(drawnManifestation.characterSlug)}
                      alt={drawnManifestation.characterName}
                      fill
                      sizes="34px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute inset-0 border border-[#ECC47E]/40 rounded-[2px] pointer-events-none" />
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#ECC47E] z-10 animate-pulse" />
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none z-10" />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-[3px] border border-[#C59B53]/45 bg-[#17110C] flex flex-col items-center justify-between p-1 relative overflow-hidden group-hover:border-[#ECC47E]/80 transition-colors">
                    <span className="w-1 h-1 rounded-full bg-[#ECC47E]/90" />
                    <Sparkles className="w-3.5 h-3.5 text-[#ECC47E] group-hover:scale-125 transition-transform duration-300" />
                    <span className="w-2.5 h-[1.5px] bg-[#C59B53]/70 rounded-full" />
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* MOBILE TOP CONTROLS: Manifestasi Tarot Card Only (No Hamburger) */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setManifestModalOpen(true)}
              className={`group relative w-7.5 h-9 rounded-[5px] border ${
                drawnManifestation
                  ? 'border-[#ECC47E]'
                  : 'border-[#C59B53]/80 hover:border-[#ECC47E]'
              } bg-gradient-to-b from-[#2E2014] via-[#1B130D] to-[#100A06] p-[2px] active:scale-95 cursor-pointer overflow-hidden`}
              title={
                drawnManifestation
                  ? `Kartu Manifestasi: ${drawnManifestation.characterName}`
                  : 'Buka Kartu Manifestasi Harian'
              }
              aria-label={
                drawnManifestation
                  ? `Kartu Manifestasi: ${drawnManifestation.characterName}`
                  : 'Buka Kartu Manifestasi Harian'
              }
            >
              {drawnManifestation ? (
                <div className="relative w-full h-full rounded-[2px] overflow-hidden border border-[#ECC47E]/70 bg-[#0D0B09]">
                  <Image
                    src={getTarotImagePath(drawnManifestation.characterSlug)}
                    alt={drawnManifestation.characterName}
                    fill
                    sizes="32px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                  <span className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-[#ECC47E] z-10" />
                </div>
              ) : (
                <div className="w-full h-full rounded-[2px] border border-[#C59B53]/50 bg-[#17110C] flex flex-col items-center justify-between p-1 relative overflow-hidden">
                  <span className="w-1 h-1 rounded-full bg-[#ECC47E]" />
                  <Sparkles className="w-3 h-3 text-[#ECC47E]" />
                  <span className="w-2 h-[1px] bg-[#C59B53]/70 rounded-full" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MOBILE BOTTOM NAVIGATION DOCK (Spacious, Airy & Native) */}
      {/* ============================================================ */}
      <nav
        aria-label="Navigasi Bawah Ponsel"
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 pointer-events-auto sm:bottom-3 sm:inset-x-4 sm:max-w-lg sm:mx-auto transition-all duration-300"
      >
        <div className="relative w-full sm:rounded-2xl bg-[#0D0C0A]/96 backdrop-blur-2xl border-t sm:border border-[#C59B53]/30 px-1.5 sm:px-3 pt-2 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] sm:pb-2 flex items-center justify-between">
          {PRIMARY_NAV_LINKS.map((item) => {
            const active = isLinkActive(item.sectionId);
            const Icon = item.icon;
            return (
              <button
                key={item.sectionId}
                type="button"
                onClick={() => handleNavClick(item.sectionId)}
                className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 cursor-pointer select-none group ${
                  active
                    ? 'text-[#FFF2DC] bg-[#C59B53]/25 border border-[#ECC47E]/40'
                    : 'text-[#8C8273] hover:text-[#ECC47E] hover:bg-white/[0.02] border border-transparent'
                }`}
                aria-current={active ? 'page' : undefined}
                aria-label={item.label}
              >
                {/* Active Top Accent Bar */}
                {active && (
                  <span className="absolute top-0 inset-x-2 sm:inset-x-3 h-[2px] rounded-full bg-gradient-to-r from-[#C59B53] via-[#ECC47E] to-[#C59B53]" />
                )}
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    active ? 'scale-110 text-[#ECC47E]' : 'text-[#8C8273] group-hover:scale-105 group-hover:text-[#C59B53]'
                  }`}
                />
                <span
                  className={`text-[10px] sm:text-[10.5px] font-sans tracking-tight leading-none mt-1 truncate max-w-full ${
                    active ? 'font-semibold text-[#ECC47E]' : 'font-medium text-[#8C8273] group-hover:text-[#C59B53]'
                  }`}
                >
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Manifestation Modal (Rendered outside header) */}
      <ManifestationModal
        isOpen={manifestModalOpen}
        onClose={() => setManifestModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
