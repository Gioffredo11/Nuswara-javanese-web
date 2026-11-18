'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Compass, ChevronUp, ChevronDown } from 'lucide-react';

interface SectionItem {
  id: string;
  num: string;
  label: string;
  subtitle: string;
  route?: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'beranda', num: '01', label: 'Beranda', subtitle: 'Pameran Utama' },
  { id: 'sejarah', num: '02', label: 'Sejarah', subtitle: 'Kronik Peradaban' },
  { id: 'tokoh', num: '03', label: 'Tokoh', subtitle: 'Ksatria & Pahlawan', route: '/tokoh' },
  { id: 'budaya', num: '04', label: 'Budaya', subtitle: 'Wayangpedia & Silsilah' },
  { id: 'kuliner', num: '05', label: 'Kuliner', subtitle: 'Cita Rasa Tradisi', route: '/kuliner' },
  { id: 'monumen', num: '06', label: 'Tempat Sakral', subtitle: 'Candi & Monumen', route: '/tempat-sakral' },
  { id: 'oracle', num: '07', label: 'Weton Oracle', subtitle: 'Filsafat Primbon', route: '/oracle' },
  { id: 'photobooth', num: '08', label: 'Photobooth', subtitle: 'Studio 4-Cut', route: '/photobooth' },
];

export function ScrollProgressSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('beranda');

  // Calculate scroll progress percentage and active section
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const totalScrollable = scrollHeight - windowHeight;

    if (totalScrollable > 0) {
      const progress = (scrollY / totalScrollable) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    } else {
      setScrollProgress(0);
    }

    // Determine active section if on homepage
    if (pathname === '/') {
      if (window.innerHeight + scrollY >= scrollHeight - 120) {
        setActiveSection('photobooth');
        return;
      }

      if (scrollY < 200) {
        setActiveSection('beranda');
        return;
      }

      const scrollPos = scrollY + 220;
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
            setActiveSection(item.target);
            return;
          }
        }
      }
    } else {
      // Subpage active identification
      if (pathname.startsWith('/oracle')) setActiveSection('oracle');
      else if (pathname.startsWith('/photobooth')) setActiveSection('photobooth');
      else if (pathname.startsWith('/tokoh')) setActiveSection('tokoh');
      else if (pathname.startsWith('/kuliner')) setActiveSection('kuliner');
      else if (pathname.startsWith('/sejarah')) setActiveSection('sejarah');
      else if (pathname.startsWith('/monumen') || pathname.startsWith('/tempat-sakral')) setActiveSection('monumen');
      else if (
        pathname.startsWith('/wayangpedia') ||
        pathname.startsWith('/family-tree') ||
        pathname.startsWith('/lakon') ||
        pathname.startsWith('/ragam-rupa')
      ) {
        setActiveSection('budaya');
      } else {
        setActiveSection('');
      }
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const handleNavigate = (id: string, route?: string) => {
    if (pathname === '/') {
      if (id === 'beranda') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setActiveSection('beranda');
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${id}`);
        setActiveSection(id);
        return;
      }
    }

    // Direct routing
    if (route && pathname !== route) {
      router.push(route);
      return;
    }

    if (id === 'beranda') {
      router.push('/');
    } else {
      router.push(`/#${id}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pathname === '/') {
      window.history.pushState(null, '', '/');
      setActiveSection('beranda');
    }
  };

  const scrollToNext = () => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    const nextIndex = (currentIndex + 1) % SECTIONS.length;
    handleNavigate(SECTIONS[nextIndex].id, SECTIONS[nextIndex].route);
  };

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <aside
      aria-label="Navigasi Progres Gulir Halaman"
      className="fixed right-4 sm:right-6 lg:right-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none"
    >
      <div className="relative py-4 px-2 sm:px-2.5 rounded-full bg-[#0D0C0A]/85 backdrop-blur-2xl border border-[#C59B53]/30 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(197,155,83,0.12)] flex flex-col items-center gap-2 hover:border-[#ECC47E]/55 transition-all duration-300 group/sidebar">
        {/* Top: Compass / Quick Scroll to Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="relative group/top p-1.5 rounded-full text-[#C59B53] hover:text-[#ECC47E] hover:bg-[#C59B53]/15 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ECC47E]"
          title="Menuju ke Paling Atas"
          aria-label="Menuju ke Paling Atas"
        >
          <Compass className="w-4 h-4 transition-transform duration-300 group-hover/top:rotate-45" />

          {/* Tooltip flyout */}
          <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/top:opacity-100 translate-x-2 group-hover/top:translate-x-0 pointer-events-none transition-all duration-200 z-50">
            <div className="px-3 py-1.5 rounded-xl bg-[#120F0C]/95 border border-[#C59B53]/40 shadow-[0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-md whitespace-nowrap text-xs font-serif text-[#ECC47E] flex items-center gap-2">
              <ChevronUp className="w-3.5 h-3.5 text-[#C59B53]" />
              <span>Kembali ke Atas</span>
            </div>
          </div>
        </button>

        {/* Divider */}
        <div className="w-3 h-px bg-[#C59B53]/25" />

        {/* Vertical Scroll Progress Track & Section Nodes */}
        <div className="relative flex flex-col items-center gap-3.5 py-1">
          {/* Continuous Track Background Line */}
          <div className="absolute top-2 bottom-2 w-[2px] bg-[#C59B53]/20 rounded-full" />

          {/* Dynamic Scroll Progress Fill Line */}
          <div
            className="absolute top-2 w-[2px] bg-gradient-to-b from-[#C59B53] via-[#ECC47E] to-[#FFF0D4] rounded-full shadow-[0_0_8px_#ECC47E] transition-all duration-150"
            style={{
              height: `${Math.min(100, Math.max(0, scrollProgress))}%`,
              maxHeight: 'calc(100% - 16px)',
            }}
          />

          {/* Section Checkpoints */}
          {SECTIONS.map((section, idx) => {
            const isActive = activeSection === section.id;
            const isPassed = activeIndex !== -1 && idx < activeIndex;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleNavigate(section.id, section.route)}
                className="relative group/node flex items-center justify-center w-6 h-6 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ECC47E] rounded-full"
                aria-label={`Navigasi ke ${section.label}`}
                title={`${section.num} · ${section.label}`}
              >
                {/* Checkpoint Dot with Glow */}
                <span
                  className={`relative z-10 transition-all duration-300 ${
                    isActive
                      ? 'w-3.5 h-3.5 rounded-full bg-[#ECC47E] ring-4 ring-[#ECC47E]/30 shadow-[0_0_14px_#ECC47E] scale-110'
                      : isPassed
                      ? 'w-2 h-2 rounded-full bg-[#C59B53] hover:scale-130'
                      : 'w-2 h-2 rounded-full bg-[#8C8273]/50 group-hover/node:bg-[#ECC47E]/80 group-hover/node:scale-130'
                  }`}
                />

                {/* Flying Tooltip to the Left */}
                <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/node:opacity-100 translate-x-2 group-hover/node:translate-x-0 pointer-events-none transition-all duration-200 z-50">
                  <div className="px-3.5 py-2 rounded-xl bg-[#120F0C]/95 border border-[#C59B53]/40 shadow-[0_8px_24px_rgba(0,0,0,0.85)] backdrop-blur-md flex items-center gap-3 whitespace-nowrap">
                    <span className="text-[10px] font-mono text-[#ECC47E] font-bold px-1.5 py-0.5 rounded bg-[#C59B53]/20 border border-[#C59B53]/30">
                      {section.num}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-serif text-[#F4EFE6] font-semibold tracking-wide">
                        {section.label}
                      </span>
                      <span className="text-[10px] font-sans text-[#A89F91]">
                        {section.subtitle}
                      </span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ECC47E] animate-ping" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-3 h-px bg-[#C59B53]/25" />

        {/* Bottom: Live Scroll Percentage Readout & Next Button */}
        <button
          type="button"
          onClick={scrollToNext}
          className="relative group/bottom flex flex-col items-center gap-0.5 p-1 rounded-full text-[#C59B53] hover:text-[#ECC47E] hover:bg-[#C59B53]/15 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ECC47E]"
          title="Lanjut ke Bagian Berikutnya"
          aria-label="Lanjut ke Bagian Berikutnya"
        >
          <span className="text-[9px] font-mono font-bold text-[#ECC47E] tracking-tighter">
            {Math.round(scrollProgress)}%
          </span>
          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover/bottom:translate-y-0.5" />

          {/* Tooltip flyout */}
          <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/bottom:opacity-100 translate-x-2 group-hover/bottom:translate-x-0 pointer-events-none transition-all duration-200 z-50">
            <div className="px-3 py-1.5 rounded-xl bg-[#120F0C]/95 border border-[#C59B53]/40 shadow-[0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-md whitespace-nowrap text-xs font-serif text-[#ECC47E] flex items-center gap-2">
              <ChevronDown className="w-3.5 h-3.5 text-[#C59B53]" />
              <span>Bagian Berikutnya ({Math.round(scrollProgress)}%)</span>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}

export default ScrollProgressSidebar;
