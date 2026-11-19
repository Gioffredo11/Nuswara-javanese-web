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
  Search,
} from 'lucide-react';
import { ManifestationModal } from '@/components/ui/ManifestationModal';
import { getTarotImagePath } from '@/components/ui/WayangVectors';
import { NavbarSearchBar, MobileSearchModal } from './NavbarSearchBar';

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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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

  const desktopNavRef = useRef<HTMLElement>(null);
  const desktopItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [desktopIndicator, setDesktopIndicator] = useState<{
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

  const mobileNavRef = useRef<HTMLElement>(null);
  const mobileItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [mobileIndicator, setMobileIndicator] = useState<{
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
    const activeItem = PRIMARY_NAV_LINKS.find((item) => isLinkActive(item.sectionId));

    // 1. Update Desktop Indicator
    const dNav = desktopNavRef.current;
    if (dNav && activeItem) {
      const btn = desktopItemRefs.current[activeItem.sectionId];
      if (btn) {
        const navRect = dNav.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const nextLeft = btnRect.left - navRect.left;
        const nextWidth = btnRect.width;
        const nextHeight = btnRect.height;

        setDesktopIndicator((prev) => {
          if (
            prev.opacity === 1 &&
            Math.abs(prev.left - nextLeft) < 0.5 &&
            Math.abs(prev.width - nextWidth) < 0.5 &&
            Math.abs(prev.height - nextHeight) < 0.5
          ) {
            return prev;
          }
          const distance = prev.opacity === 0 ? 0 : Math.abs(nextLeft - prev.left);
          const duration =
            prev.opacity === 0 ? 0 : Math.min(620, Math.max(380, 320 + Math.round(distance * 0.75)));
          return { left: nextLeft, width: nextWidth, height: nextHeight, opacity: 1, duration };
        });
      } else {
        setDesktopIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      }
    }

    // 2. Update Mobile Indicator
    const mNav = mobileNavRef.current;
    if (mNav && activeItem) {
      const btn = mobileItemRefs.current[activeItem.sectionId];
      if (btn) {
        const navRect = mNav.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const nextLeft = btnRect.left - navRect.left;
        const nextWidth = btnRect.width;
        const nextHeight = btnRect.height;

        setMobileIndicator((prev) => {
          if (
            prev.opacity === 1 &&
            Math.abs(prev.left - nextLeft) < 0.5 &&
            Math.abs(prev.width - nextWidth) < 0.5 &&
            Math.abs(prev.height - nextHeight) < 0.5
          ) {
            return prev;
          }
          const distance = prev.opacity === 0 ? 0 : Math.abs(nextLeft - prev.left);
          const duration =
            prev.opacity === 0 ? 0 : Math.min(620, Math.max(380, 320 + Math.round(distance * 0.75)));
          return { left: nextLeft, width: nextWidth, height: nextHeight, opacity: 1, duration };
        });
      } else {
        setMobileIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      }
    }
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
      {/* 1. TOP HEADER (Desktop Floating Pill Only - Hidden on Mobile) */}
      {/* ============================================================ */}
      <header
        className="hidden lg:flex fixed top-3 sm:top-5 inset-x-0 z-40 justify-center pointer-events-none px-3 sm:px-6 transition-all duration-300"
      >
        <div
          className={`pointer-events-auto relative w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 ${
            isScrolled
              ? 'bg-[#0D0C0A]/95 backdrop-blur-2xl border border-[#C59B53]/45'
              : 'bg-[#0D0C0A]/80 backdrop-blur-xl border border-[#C59B53]/25'
          }`}
        >
          {/* Brand Logo & Navbar Quick Search */}
          <div className="flex items-center gap-2 sm:gap-3.5 flex-1 min-w-0 mr-2 sm:mr-3">
            {/* Brand Logo - Gunungan Emblem Icon Only (No Text) */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="group relative flex items-center shrink-0 rounded-full p-0.5 sm:p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B53]"
              aria-label="NUSWARA - Beranda"
            >
              <div className="relative h-7.5 w-7.5 sm:h-8.5 sm:w-8.5 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logo/nuswara-emblem.png"
                  alt="NUSWARA Emblem"
                  width={36}
                  height={36}
                  priority
                  className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(197,155,83,0.35)]"
                />
              </div>
            </Link>

            {/* Quick Search Bar */}
            <NavbarSearchBar />
          </div>

          {/* DESKTOP NAV: Pill Links & Daily Manifestation Tarot Card */}
          <div className="flex items-center gap-2 xl:gap-3">
            <nav
              ref={desktopNavRef}
              className="relative flex items-center gap-1 xl:gap-1.5 p-0.5 rounded-full"
              aria-label="Navigasi Utama"
            >
              {/* Liquid Glass Sliding Active Pill Indicator */}
              <div
                className="absolute top-0.5 left-0 rounded-full pointer-events-none will-change-transform z-0"
                style={{
                  transform: `translate3d(${desktopIndicator.left}px, 0, 0)`,
                  width: `${desktopIndicator.width}px`,
                  height: `${desktopIndicator.height}px`,
                  opacity: desktopIndicator.opacity,
                  transitionProperty: 'transform, width, height, opacity',
                  transitionDuration: `${desktopIndicator.duration}ms`,
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
                      desktopItemRefs.current[item.sectionId] = el;
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
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MOBILE BOTTOM FLOATING NAVBAR PILL (Unified Single Pill) */}
      {/* ============================================================ */}
      <div
        className="lg:hidden fixed bottom-3 inset-x-2 sm:bottom-4 sm:inset-x-6 sm:max-w-lg sm:mx-auto z-50 pointer-events-auto transition-all duration-300"
      >
        <div className="relative w-full rounded-full bg-[#0D0C0A]/95 backdrop-blur-2xl border border-[#C59B53]/45 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(197,155,83,0.15)] px-1.5 sm:px-3 py-1 sm:py-1.5 flex items-center justify-between">
          {/* Mobile Nav Links with Liquid Glass Sliding Active Pill */}
          <nav
            ref={mobileNavRef}
            className="relative flex items-center justify-between flex-1 gap-0.5 p-0.5 rounded-full"
            aria-label="Navigasi Utama Ponsel"
          >
            {/* Liquid Glass Sliding Active Pill Indicator for Mobile */}
            <div
              className="absolute top-0.5 left-0 rounded-full pointer-events-none will-change-transform z-0"
              style={{
                transform: `translate3d(${mobileIndicator.left}px, 0, 0)`,
                width: `${mobileIndicator.width}px`,
                height: `${mobileIndicator.height}px`,
                opacity: mobileIndicator.opacity,
                transitionProperty: 'transform, width, height, opacity',
                transitionDuration: `${mobileIndicator.duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Luminous Liquid Glass Core */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#F5DE9B]/35 via-[#C59B53]/25 to-[#7E5718]/40 border border-[#ECC47E]/65 backdrop-blur-md shadow-[0_0_15px_rgba(236,196,126,0.45),inset_0_1px_1.5px_rgba(255,245,220,0.65)] overflow-hidden">
                <div className="absolute inset-x-1.5 top-0.5 h-[40%] rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-[#ECC47E]/20 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -inset-0.5 rounded-full bg-[#ECC47E]/20 blur-xs pointer-events-none -z-10" />
            </div>

            {PRIMARY_NAV_LINKS.map((item) => {
              const active = isLinkActive(item.sectionId);
              const Icon = item.icon;
              return (
                <button
                  key={item.sectionId}
                  ref={(el) => {
                    mobileItemRefs.current[item.sectionId] = el;
                  }}
                  type="button"
                  onClick={() => handleNavClick(item.sectionId)}
                  className={`relative z-10 flex flex-col items-center justify-center flex-1 py-1 px-0.5 rounded-full text-center transition-colors duration-300 cursor-pointer select-none ${
                    active
                      ? 'text-[#FFF2DC] font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                      : 'text-[#8C8275] hover:text-[#ECC47E]'
                  }`}
                  aria-label={item.label}
                >
                  <Icon
                    className={`w-3.5 h-3.5 mb-0.5 transition-transform duration-300 ${
                      active ? 'scale-110 text-[#ECC47E]' : 'text-[#8C8275]'
                    }`}
                  />
                  <span className="text-[8.5px] sm:text-[9.5px] font-sans font-medium tracking-tight leading-none whitespace-nowrap">
                    {item.shortLabel}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Utilities: Search & Tarot Card */}
          <div className="flex items-center gap-1 sm:gap-1.5 pl-1 sm:pl-2 ml-0.5 sm:ml-1 border-l border-[#C59B53]/30 shrink-0">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              className="w-7 h-8 sm:w-7.5 sm:h-8.5 rounded-full bg-[#18110B] hover:bg-[#251A10] border border-[#C59B53]/40 flex items-center justify-center text-[#C59B53] hover:text-[#ECC47E] transition-colors cursor-pointer"
              title="Cari tempat sakral, kuliner, dan tokoh"
              aria-label="Cari"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Tarot Card Button */}
            <button
              type="button"
              onClick={() => setManifestModalOpen(true)}
              className={`group relative w-6.5 h-8 sm:w-7 sm:h-8.5 rounded-[5px] border ${
                drawnManifestation
                  ? 'border-[#ECC47E]'
                  : 'border-[#C59B53]/80 hover:border-[#ECC47E]'
              } bg-gradient-to-b from-[#2E2014] via-[#1B130D] to-[#100A06] p-[2px] active:scale-95 cursor-pointer overflow-hidden shrink-0`}
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
                    sizes="28px"
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
      </div>

      {/* Mobile Search Modal */}
      <MobileSearchModal
        isOpen={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      />

      {/* Manifestation Modal (Rendered outside header) */}
      <ManifestationModal
        isOpen={manifestModalOpen}
        onClose={() => setManifestModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
