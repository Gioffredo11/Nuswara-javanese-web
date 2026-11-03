'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PenTool,
  BookOpen,
  GraduationCap,
  Bookmark,
  Search,
  Sun,
  Moon,
  Volume2,
  Sparkles,
  Command,
} from 'lucide-react';
import { TransliterationStudio } from '@/components/aksara/TransliterationStudio';
import { KamusAksaraView } from '@/components/aksara/KamusAksaraView';
import { WiyataQuizView } from '@/components/aksara/WiyataQuizView';
import { SavedPhrasebookView } from '@/components/aksara/SavedPhrasebookView';
import { CommandPaletteModal } from '@/components/aksara/CommandPaletteModal';
import { CalligraphicCardModal } from '@/components/aksara/CalligraphicCardModal';
import { playLontarClickSound } from '@/lib/audio/woodClick';

export default function AksaraPage() {
  const [activeTab, setActiveTab] = useState<'studio' | 'kamus' | 'kuis' | 'tersimpan'>('studio');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [loadedStudioText, setLoadedStudioText] = useState('budi pekerti luhur');
  const [cardModalAksara, setCardModalAksara] = useState('');
  const [cardModalLatin, setCardModalLatin] = useState('');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdKOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Theme synchronization with data-theme attribute
  const toggleTheme = () => {
    playLontarClickSound();
    const nextTheme = !isDarkTheme;
    setIsDarkTheme(nextTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', nextTheme ? 'dark' : 'light');
    }
  };

  const handleSelectFromAtlas = (latin: string) => {
    setLoadedStudioText(latin);
    setActiveTab('studio');
  };

  const handleOpenCardModal = (aksara: string, latin: string) => {
    setCardModalAksara(aksara);
    setCardModalLatin(latin);
    setIsCardModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#121316] text-[#181615] dark:text-[#F4F1EA] transition-colors pb-24 md:pb-12">
      {/* =========================================================
          DESKTOP TOP STICKY HEADER (64px)
          ========================================================= */}
      <header className="sticky top-0 z-40 w-full h-16 bg-[#FBF9F5]/90 dark:bg-[#121316]/90 backdrop-blur-md border-b border-[#E5DEC9] dark:border-[#2E3340] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl h-full mx-auto flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[#181615] dark:text-[#F4F1EA] hover:opacity-85 transition-opacity"
            >
              <div className="w-9 h-9 rounded-lg bg-[#B84A27] dark:bg-[#E06D44] flex items-center justify-center text-white shadow-md">
                <span className="aksara-jawa text-xl font-bold">ꦤꦸ</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-serif font-black text-lg tracking-tight">NUSWARA</span>
                  <span className="aksara-jawa text-sm text-[#B84A27] dark:text-[#E06D44]">ꦤꦸꦱ꧀ꦮꦫ</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#78716C] dark:text-[#8C857B] uppercase mt-0.5">
                  Studio Aksara Jawa
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center bg-[#F3EFE6] dark:bg-[#1A1D24] p-1 rounded-xl border border-[#E5DEC9] dark:border-[#2E3340] text-xs font-semibold">
            {[
              { id: 'studio', label: 'Studio Alih Aksara', icon: PenTool },
              { id: 'kamus', label: 'Kamus Aksara', icon: BookOpen },
              { id: 'kuis', label: 'Wiyata & Kuis', icon: GraduationCap },
              { id: 'tersimpan', label: 'Tersimpan', icon: Bookmark },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playLontarClickSound();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white dark:bg-[#222630] text-[#B84A27] dark:text-[#E06D44] shadow-sm font-bold'
                      : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#181615] dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Controls: Cmd+K Trigger & Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playLontarClickSound();
                setIsCmdKOpen(true);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F3EFE6] dark:bg-[#1A1D24] hover:bg-[#E5DEC9] dark:hover:bg-[#222630] border border-[#E5DEC9] dark:border-[#2E3340] text-xs text-[#57534E] dark:text-[#A8A29E] transition-colors"
              aria-label="Buka pencarian global Cmd+K"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cari aksara...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-[#121316] border border-[#E5DEC9] dark:border-[#2E3340] text-[10px] font-mono text-[#78716C] dark:text-[#8C857B]">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[#F3EFE6] dark:bg-[#1A1D24] hover:bg-[#E5DEC9] dark:hover:bg-[#222630] border border-[#E5DEC9] dark:border-[#2E3340] text-[#57534E] dark:text-[#A8A29E] transition-colors"
              title={isDarkTheme ? 'Ganti ke Tema Lontar (Terang)' : 'Ganti ke Tema Kraton (Gelap)'}
              aria-label="Ganti tema warna"
            >
              {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#1E3A5F]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Active Tab Content */}
      <main className="flex-1">
        {activeTab === 'studio' && (
          <TransliterationStudio
            initialLatinText={loadedStudioText}
            onNavigateToTab={(tab) => setActiveTab(tab as typeof activeTab)}
          />
        )}

        {activeTab === 'kamus' && (
          <KamusAksaraView onSelectSpecimen={handleSelectFromAtlas} />
        )}

        {activeTab === 'kuis' && <WiyataQuizView />}

        {activeTab === 'tersimpan' && (
          <SavedPhrasebookView
            onLoadPhrase={(latin) => {
              setLoadedStudioText(latin);
              setActiveTab('studio');
            }}
            onOpenCardModal={handleOpenCardModal}
          />
        )}
      </main>

      {/* =========================================================
          MOBILE BOTTOM THUMB-ZONE TAB BAR (<768px, >=44px touch)
          ========================================================= */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FBF9F5]/95 dark:bg-[#121316]/95 backdrop-blur-md border-t border-[#E5DEC9] dark:border-[#2E3340] px-3 pb-[env(safe-area-inset-bottom)]"
        aria-label="Navigasi Bawah Mobile"
      >
        <div className="grid grid-cols-4 h-16">
          {[
            { id: 'studio', label: 'Studio', icon: PenTool },
            { id: 'kamus', label: 'Aksara', icon: BookOpen },
            { id: 'kuis', label: 'Latihan', icon: GraduationCap },
            { id: 'tersimpan', label: 'Tersimpan', icon: Bookmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playLontarClickSound();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[48px] select-none ${
                  isActive
                    ? 'text-[#B84A27] dark:text-[#E06D44] font-bold'
                    : 'text-[#78716C] dark:text-[#8C857B] hover:text-[#181615]'
                }`}
                aria-label={`Tab navigasi ${tab.label}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] leading-none tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Global Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
        onSelectSpecimen={(text) => {
          setLoadedStudioText(text);
          setActiveTab('studio');
        }}
        onExportPng={() => setIsCardModalOpen(true)}
        onCopyUnicode={() => {
          // Handled inside studio
        }}
        onClearWorkspace={() => setLoadedStudioText('')}
        onToggleTheme={toggleTheme}
        isDarkTheme={isDarkTheme}
      />

      {/* Calligraphic Exporter Modal */}
      <CalligraphicCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        aksaraText={cardModalAksara || 'ꦤꦸꦱ꧀ꦮꦫ'}
        latinText={cardModalLatin || loadedStudioText}
      />
    </div>
  );
}

