'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, BookOpen, Download, Copy, Moon, Sun, Trash2, X, Command } from 'lucide-react';
import { CHARACTER_ATLAS } from './KamusAksaraView';
import { CULTURAL_PRESETS } from '@/lib/transliteration/javaneseEngine';
import { playLontarClickSound } from '@/lib/audio/woodClick';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpecimen: (text: string) => void;
  onExportPng: () => void;
  onCopyUnicode: () => void;
  onClearWorkspace: () => void;
  onToggleTheme: () => void;
  isDarkTheme: boolean;
}

interface PaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onSelectSpecimen,
  onExportPng,
  onCopyUnicode,
  onClearWorkspace,
  onToggleTheme,
  isDarkTheme,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Command items
  const actionItems: PaletteItem[] = [
    {
      id: 'copy-unicode',
      title: 'Salin Teks Aksara (Unicode)',
      category: 'Aksi Studio',
      icon: Copy,
      action: () => { onCopyUnicode(); onClose(); },
    },
    {
      id: 'export-png',
      title: 'Unduh Kartu Kaligrafi (High-DPI PNG)',
      category: 'Aksi Studio',
      icon: Download,
      action: () => { onExportPng(); onClose(); },
    },
    {
      id: 'toggle-theme',
      title: isDarkTheme ? 'Ganti ke Tema Lontar (Terang)' : 'Ganti ke Tema Kraton (Gelap)',
      category: 'Tampilan',
      icon: isDarkTheme ? Sun : Moon,
      action: () => { onToggleTheme(); onClose(); },
    },
    {
      id: 'clear-editor',
      title: 'Bersihkan Editor Transliterasi',
      category: 'Aksi Studio',
      icon: Trash2,
      action: () => { onClearWorkspace(); onClose(); },
    },
  ];

  const presetItems: PaletteItem[] = CULTURAL_PRESETS.map((p) => ({
    id: `preset-${p.title}`,
    title: p.title,
    subtitle: `${p.latin} • ${p.aksara}`,
    category: 'Pustaka Sastra',
    icon: Sparkles,
    action: () => { onSelectSpecimen(p.latin); onClose(); },
  }));

  const characterItems: PaletteItem[] = CHARACTER_ATLAS.slice(0, 20).map((c) => ({
    id: `char-${c.latin}`,
    title: `Aksara ${c.latin} (${c.glyph})`,
    subtitle: `${c.description} • ${c.codepoint}`,
    category: 'Kamus Aksara',
    icon: BookOpen,
    action: () => { onSelectSpecimen(c.latin); onClose(); },
  }));

  const allItems: PaletteItem[] = [...actionItems, ...presetItems, ...characterItems];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((idx) => (idx + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((idx) => (idx - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      playLontarClickSound();
      filteredItems[selectedIndex].action();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian Global Cmd+K"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#181615] border border-[#2E3340] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2E3340] bg-[#121316]">
          <Search className="w-5 h-5 text-[#8C857B]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Cari aksara, sandhangan, peribahasa, atau aksi studio..."
            className="flex-1 bg-transparent text-sm text-[#F4F1EA] placeholder:text-[#8C857B] focus:outline-none font-medium"
          />
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8C857B] bg-[#222630] px-2 py-0.5 rounded">
            <span>ESC</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8C857B] hover:text-white"
            aria-label="Tutup pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#2E3340]/40">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#8C857B]">
              Tidak ada hasil yang cocok dengan &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playLontarClickSound();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                    isSelected ? 'bg-[#E06D44]/20 border border-[#E06D44]/40' : 'hover:bg-[#222630]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#E06D44] text-white' : 'bg-[#222630] text-[#A8A29E]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#F4F1EA]">
                        {item.title}
                      </div>
                      {'subtitle' in item && item.subtitle && (
                        <div className="text-xs text-[#8C857B] mt-0.5">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C857B] px-2 py-0.5 rounded bg-[#121316]">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#121316] border-t border-[#2E3340] text-[11px] font-mono text-[#8C857B]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigasi</span>
            <span>↵ Pilih</span>
          </div>
          <span>Nuswara Cmd+K Search</span>
        </div>
      </div>
    </div>
  );
}
