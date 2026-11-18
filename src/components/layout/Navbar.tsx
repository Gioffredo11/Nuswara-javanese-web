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

      const scrollPos = window.scrollY + 200;

      // Bottom of page highlights photobooth
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 150
      ) {
        setActiveSection((prev) => (prev !== 'photobooth' ? 'photobooth' : prev));
        return;
      }

      if (window.scrollY < 200) {
        setActiveSection((prev) => (prev !== 'beranda' ? 'beranda' : prev));
        return;
      }

      const sectionMappings = [
        { id: 'photobooth', target: 'photobooth' },
        { id: 'monumen', target: 'monumen' },
        { id: 'kuliner', target: 'kuliner' },
        { id: 'oracle', target: 'oracle' },
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setActiveSection('beranda');
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) {
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
      if (sectionId === 'oracle' && pathname.startsWith('/oracle')) return true;
      if (sectionId === 'photobooth' && pathname.startsWith('/photobooth')) return true;
      if (sectionId === 'tokoh' && pathname.startsWith('/tokoh')) return true;
      if (sectionId === 'family-tree' && pathname.startsWith('/family-tree')) return true;
      if (sectionId === 'lakon' && pathname.startsWith('/lakon')) return true;
      if ((sectionId === 'ragam-rupa' || sectionId === 'batik') && pathname.startsWith('/ragam-rupa')) return true;
      if (sectionId === 'sejarah' && pathname.startsWith('/sejarah')) return true;
      if (sectionId === 'kuliner' && pathname.startsWith('/kuliner')) return true;
      if (sectionId === 'monumen' && (pathname.startsWith('/tempat-sakral') || pathname.startsWith('/monumen'))) return true;
      if (pathname === '/') {
        return activeSection === sectionId;
      }
      if (
        sectionId === 'budaya' &&
        (pathname.startsWith('/wayangpedia') ||
          pathname.startsWith('/family-tree') ||
          pathname.startsWith('/lakon') ||
          pathname.startsWith('/ragam-rupa'))
      ) {
        return true;
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
  }>({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
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
      return {
        left: nextLeft,
        width: nextWidth,
        height: nextHeight,
        opacity: 1,
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
              ? 'bg-[#0D0C0A]/95 backdrop-blur-2xl border border-[#C59B53]/45 shadow-[0_12px_44px_rgba(0,0,0,0.85),0_0_24px_rgba(197,155,83,0.15)]'
              : 'bg-[#0D0C0A]/80 backdrop-blur-xl border border-[#C59B53]/25 shadow-[0_8px_32px_rgba(0,0,0,0.65)]'
          }`}
        >
          {/* Brand "NUSWARA" */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="font-royal text-xl sm:text-2xl tracking-[0.18em] text-[#F0E6D4] hover:text-[#ECC47E] transition-colors rounded-full px-2 py-0.5 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B53]"
          >
            <span>NUSWARA</span>
          </Link>

          {/* DESKTOP NAV: Pill Links & Daily Manifestation Tarot Card */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <nav
              ref={navRef}
              className="relative flex items-center gap-1 xl:gap-1.5 p-0.5 rounded-full"
              aria-label="Navigasi Utama"
            >
              {/* Refined Matte Antique Gold Sliding Pill Indicator */}
              <div
                className="absolute top-0.5 left-0 rounded-full pointer-events-none transition-all will-change-transform z-0"
                style={{
                  transform: `translate3d(${indicator.left}px, 0, 0)`,
                  width: `${indicator.width}px`,
                  height: `${indicator.height}px`,
                  opacity: indicator.opacity,
                  transitionProperty: 'transform, width, height, opacity',
                  transitionDuration: '380ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className="w-full h-full rounded-full bg-[#C59B53]/15 border border-[#C59B53]/40 shadow-[0_2px_12px_rgba(0,0,0,0.5)]" />
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
                    className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs xl:text-sm tracking-wide transition-colors duration-200 cursor-pointer font-serif whitespace-nowrap select-none ${
                      active
                        ? 'text-[#ECC47E] font-medium'
                        : 'text-[#A89F91] hover:text-[#F4EFE6]'
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
                    ? 'border-[#ECC47E] shadow-[0_0_16px_rgba(236,196,126,0.5)] hover:shadow-[0_0_24px_rgba(236,196,126,0.8)] hover:border-[#FFF0D4]'
                    : 'border-[#C59B53]/80 hover:border-[#ECC47E] shadow-md hover:shadow-[0_0_20px_rgba(236,196,126,0.5)]'
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
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#ECC47E] shadow-[0_0_6px_#ECC47E] z-10 animate-pulse" />
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none z-10" />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-[3px] border border-[#C59B53]/45 bg-[#17110C] flex flex-col items-center justify-between p-1 relative overflow-hidden group-hover:border-[#ECC47E]/80 transition-colors">
                    <span className="w-1 h-1 rounded-full bg-[#ECC47E]/90 shadow-[0_0_4px_rgba(236,196,126,0.8)]" />
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
              className={`group relative w-8 h-10 rounded-[5px] border ${
                drawnManifestation
                  ? 'border-[#ECC47E] shadow-[0_0_12px_rgba(236,196,126,0.45)]'
                  : 'border-[#C59B53]/80 hover:border-[#ECC47E] shadow-sm'
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
                  <span className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-[#ECC47E] shadow-[0_0_4px_#ECC47E] z-10" />
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
      {/* 2. MOBILE BOTTOM NAVIGATION DOCK (Icons side-by-side) */}
      {/* ============================================================ */}
      <nav
        aria-label="Navigasi Bawah Ponsel"
        className="lg:hidden fixed bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-6 max-w-lg mx-auto z-50 pointer-events-auto"
      >
        <div className="relative w-full rounded-2xl bg-[#0D0C0A]/95 backdrop-blur-2xl border border-[#C59B53]/35 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(197,155,83,0.12)] px-1 sm:px-2 py-1.5 flex items-center justify-between gap-1">
          {PRIMARY_NAV_LINKS.map((item) => {
            const active = isLinkActive(item.sectionId);
            const Icon = item.icon;
            return (
              <button
                key={item.sectionId}
                type="button"
                onClick={() => handleNavClick(item.sectionId)}
                className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-0.5 rounded-xl transition-all duration-200 cursor-pointer select-none ${
                  active
                    ? 'text-[#ECC47E] bg-[#C59B53]/15 border border-[#C59B53]/35 shadow-sm'
                    : 'text-[#A89F91] hover:text-[#F4EFE6] hover:bg-white/[0.03] border border-transparent'
                }`}
                aria-current={active ? 'page' : undefined}
                aria-label={item.label}
              >
                {/* Active Glowing Pip */}
                {active && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#ECC47E] shadow-[0_0_6px_#ECC47E]" />
                )}
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    active ? 'scale-110 text-[#ECC47E]' : 'text-[#A89F91]'
                  }`}
                />
                <span
                  className={`text-[9.5px] sm:text-[10px] tracking-tight leading-tight mt-1 truncate max-w-full font-serif ${
                    active ? 'font-semibold text-[#ECC47E]' : 'text-[#A89F91]'
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
