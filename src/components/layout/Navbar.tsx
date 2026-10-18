'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Link } from '@/components/common/Link';
import { Menu, X, Sparkles, BookOpen, Camera, GitFork, Compass, Layers, Heart } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [isScrolled, setIsScrolled] = useState(false);

  // Primary Navigation Links matching reference_hero.png 1:1
  const primaryNavLinks = [
    { sectionId: 'beranda', label: 'Beranda' },
    { sectionId: 'sejarah', label: 'Sejarah' },
    { sectionId: 'tokoh', label: 'Tokoh' },
    { sectionId: 'budaya', label: 'Budaya' },
    { sectionId: 'kuliner', label: 'Kuliner' },
    { sectionId: 'monumen', label: 'Tempat Sakral' },
  ];

  const allMobileNavLinks = [
    { sectionId: 'beranda', label: 'Beranda (Pameran)', icon: Compass },
    { sectionId: 'sejarah', label: 'Sejarah Jawa Tengah', icon: BookOpen },
    { sectionId: 'tokoh', label: 'Tokoh & Pahlawan', icon: Compass },
    { sectionId: 'budaya', label: 'Budaya & Wayangpedia', icon: BookOpen },
    { sectionId: 'family-tree', label: 'Silsilah Purwa', icon: GitFork },
    { sectionId: 'ragam-rupa', label: 'Ragam Rupa Wayang', icon: Layers },
    { sectionId: 'kuliner', label: 'Khazanah Kuliner Jawa', icon: Layers },
    { sectionId: 'monumen', label: 'Tempat Sakral & Candi', icon: Compass },
    { sectionId: 'oracle', label: 'Javanese Oracle (Weton)', icon: Sparkles, highlight: true },
    { sectionId: 'manifestasi', label: 'Manifestasi Harian', icon: Compass },
    { sectionId: 'photobooth', label: 'Web Photobooth 4-Cut', icon: Camera, highlight: true },
  ];

  // Track scroll position to transition header background and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (pathname !== '/') return;

      const scrollPos = window.scrollY + 200;

      // Bottom of page highlights photobooth
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 150
      ) {
        setActiveSection('photobooth');
        return;
      }

      if (window.scrollY < 200) {
        setActiveSection('beranda');
        return;
      }

      const sectionMappings: { id: string; target: string }[] = [
        { id: 'photobooth', target: 'photobooth' },
        { id: 'monumen', target: 'monumen' },
        { id: 'kuliner', target: 'kuliner' },
        { id: 'manifestasi', target: 'oracle' },
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);


    // Direct route targets
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
    setMobileMenuOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      setActiveSection('beranda');
    }
  };

  const isLinkActive = (sectionId: string) => {
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
    if (sectionId === 'budaya' && (pathname.startsWith('/wayangpedia') || pathname.startsWith('/family-tree') || pathname.startsWith('/lakon') || pathname.startsWith('/ragam-rupa'))) {
      return true;
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0C0A]/90 backdrop-blur-md border-b border-[#C59B53]/20 py-4 shadow-2xl'
          : 'bg-transparent py-6 sm:py-8'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Left: Brand "NUSWARA" matching photo typography */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="font-royal text-2xl sm:text-3xl tracking-[0.18em] text-[#F0E6D4] hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B53] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0C0A]"
        >
          NUSWARA
        </Link>

        {/* Right: Desktop Links & Actions */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <nav className="flex items-center gap-4 xl:gap-6.5" aria-label="Navigasi Utama">
            {primaryNavLinks.map((item) => {
              const active = isLinkActive(item.sectionId);
              return (
                <button
                  key={item.sectionId}
                  type="button"
                  onClick={() => handleNavClick(item.sectionId)}
                  className={`relative text-xs xl:text-sm tracking-wide transition-colors py-1 cursor-pointer font-serif whitespace-nowrap ${
                    active ? 'text-[#F0E6D4] font-medium' : 'text-[#B9B0A3] hover:text-[#F0E6D4]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#B99A60]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Interactive Feature Quick Actions */}
          <div className="flex items-center gap-2 pl-3 border-l border-[#C59B53]/25">
            <button
              type="button"
              onClick={() => handleNavClick('oracle')}
              className={`px-3 py-1.5 text-xs font-mono rounded-full flex items-center gap-1.5 transition-all cursor-pointer border ${
                isLinkActive('oracle')
                  ? 'bg-[#B99A60] text-[#100D0A] font-bold border-[#C59B53] shadow-md'
                  : 'text-[#ECC47E] hover:text-white bg-[#17130E] hover:bg-[#231A12] border-[#C59B53]/40'
              }`}
              title="Javanese Oracle (Weton Matcher)"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weton</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('photobooth')}
              className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                isLinkActive('photobooth')
                  ? 'bg-[#E5C17D] text-[#100D0A] ring-2 ring-[#ECC47E]'
                  : 'bg-[#C5A063] hover:bg-[#D4AF37] text-[#100D0A]'
              }`}
              title="Web Photobooth 4-Cut"
            >
              <Camera className="w-3.5 h-3.5 text-[#100D0A]" />
              <span>Photobooth</span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavClick('oracle')}
            className="sm:hidden px-2.5 py-1 text-[11px] font-semibold text-[#ECC47E] bg-[#17130E] border border-[#C59B53]/40 rounded-full flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#ECC47E]" />
            <span>Weton</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('photobooth')}
            className="sm:hidden p-1.5 rounded-full bg-[#B99A60] text-[#100D0A] cursor-pointer"
            title="Photobooth"
            aria-label="Photobooth"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#F0E6D4] hover:text-white hover:bg-[#241E15] focus:outline-none focus:ring-2 focus:ring-[#C59B53] cursor-pointer transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Buka Menu Navigasi"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay to close on outside tap */}
          <div
            className="lg:hidden fixed inset-0 bg-black/75 backdrop-blur-sm z-40 transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed inset-x-4 top-20 bg-[#120F0C]/98 border border-[#C59B53]/35 rounded-2xl p-5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-3 duration-200 z-50">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#B99A60] pb-2 border-b border-[#C59B53]/20 flex items-center justify-between">
              <span>MUSEUM DIGITAL JAWA TENGAH</span>
              <span>NUSWARA</span>
            </div>


          <div className="space-y-1 mt-3 max-h-[60vh] overflow-y-auto">
            {allMobileNavLinks.map((item) => {
              const active = isLinkActive(item.sectionId);
              const Icon = item.icon;
              return (
                <button
                  key={item.sectionId}
                  type="button"
                  onClick={() => handleNavClick(item.sectionId)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                    active
                      ? 'bg-[#B99A60] text-[#100D0A] font-bold shadow-md'
                      : 'text-[#EAE0D0] hover:bg-[#1F1912] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-[#100D0A]' : 'text-[#ECC47E]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && !active && (
                    <span className="text-[9px] font-mono bg-[#241A0E] text-[#ECC47E] border border-[#C59B53]/40 px-2 py-0.5 rounded-full">
                      Interaktif
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 grid grid-cols-2 gap-2 border-t border-[#C59B53]/20 mt-3">
            <button
              type="button"
              onClick={() => handleNavClick('oracle')}
              className="py-2.5 px-3 text-xs font-semibold border border-[#C59B53]/40 rounded-xl text-[#ECC47E] bg-[#1C160F] hover:bg-[#2A2015] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ECC47E]" />
              <span>Cek Weton</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('photobooth')}
              className="py-2.5 px-3 text-xs font-bold bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-[#100D0A]" />
              <span>Photobooth</span>
            </button>
          </div>
        </div>
      </>
    )}
  </header>
  );
}

export default Navbar;
