'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Smartphone, ChevronDown, ChevronUp, Delete, CornerDownLeft, Space } from 'lucide-react';
import { playLontarClickSound } from '@/lib/audio/woodClick';

interface VirtualKeyItem {
  glyph: string;
  label: string;
  category?: string;
}

const NGLEGENA_KEYS: VirtualKeyItem[] = [
  { glyph: 'ꦲ', label: 'ha' }, { glyph: 'ꦤ', label: 'na' }, { glyph: 'ꦕ', label: 'ca' },
  { glyph: 'ꦫ', label: 'ra' }, { glyph: 'ꦏ', label: 'ka' }, { glyph: 'ꦢ', label: 'da' },
  { glyph: 'ꦠ', label: 'ta' }, { glyph: 'ꦱ', label: 'sa' }, { glyph: 'ꦮ', label: 'wa' },
  { glyph: 'ꦭ', label: 'la' }, { glyph: 'ꦥ', label: 'pa' }, { glyph: 'ꦝ', label: 'dha' },
  { glyph: 'ꦗ', label: 'ja' }, { glyph: 'ꦪ', label: 'ya' }, { glyph: 'ꦚ', label: 'nya' },
  { glyph: 'ꦩ', label: 'ma' }, { glyph: 'ꦒ', label: 'ga' }, { glyph: 'ꦧ', label: 'ba' },
  { glyph: 'ꦛ', label: 'tha' }, { glyph: 'ꦔ', label: 'nga' }
];

const PASANGAN_KEYS: VirtualKeyItem[] = [
  { glyph: '꧀ꦲ', label: 'p. ha' }, { glyph: '꧀ꦤ', label: 'p. na' }, { glyph: '꧀ꦕ', label: 'p. ca' },
  { glyph: '꧀ꦫ', label: 'p. ra' }, { glyph: '꧀ꦏ', label: 'p. ka' }, { glyph: '꧀ꦢ', label: 'p. da' },
  { glyph: '꧀ꦠ', label: 'p. ta' }, { glyph: '꧀ꦱ', label: 'p. sa' }, { glyph: '꧀ꦮ', label: 'p. wa' },
  { glyph: '꧀ꦭ', label: 'p. la' }, { glyph: '꧀ꦥ', label: 'p. pa' }, { glyph: '꧀ꦝ', label: 'p. dha' },
  { glyph: '꧀ꦗ', label: 'p. ja' }, { glyph: '꧀ꦪ', label: 'p. ya' }, { glyph: '꧀ꦚ', label: 'p. nya' },
  { glyph: '꧀ꦩ', label: 'p. ma' }, { glyph: '꧀ꦒ', label: 'p. ga' }, { glyph: '꧀ꦧ', label: 'p. ba' },
  { glyph: '꧀ꦛ', label: 'p. tha' }, { glyph: '꧀ꦔ', label: 'p. nga' }
];

const SANDHANGAN_KEYS: VirtualKeyItem[] = [
  { glyph: 'ꦶ', label: 'wulu (-i)' },
  { glyph: 'ꦸ', label: 'suku (-u)' },
  { glyph: 'ꦺ', label: 'taling (é)' },
  { glyph: 'ꦼ', label: 'pepet (ě)' },
  { glyph: 'ꦺꦴ', label: 'tal. tarung (-o)' },
  { glyph: 'ꦂ', label: 'layar (-r)' },
  { glyph: 'ꦃ', label: 'wignyan (-h)' },
  { glyph: 'ꦁ', label: 'cecak (-ng)' },
  { glyph: 'ꦿ', label: 'cakra (-ra)' },
  { glyph: 'ꦾ', label: 'pengkal (-ya)' },
  { glyph: 'ꦽ', label: 'keret (-rě)' },
  { glyph: '꧀', label: 'pangkon' }
];

const MURDA_SWARA_KEYS: VirtualKeyItem[] = [
  { glyph: 'ꦟ', label: 'M. Na' }, { glyph: 'ꦑ', label: 'M. Ka' }, { glyph: 'ꦡ', label: 'M. Ta' },
  { glyph: 'ꦯ', label: 'M. Sa' }, { glyph: 'ꦦ', label: 'M. Pa' }, { glyph: 'ꦘ', label: 'M. Nya' },
  { glyph: 'ꦓ', label: 'M. Ga' }, { glyph: 'ꦨ', label: 'M. Ba' },
  { glyph: 'ꦄ', label: 'Sw. A' }, { glyph: 'ꦆ', label: 'Sw. I' }, { glyph: 'ꦈ', label: 'Sw. U' },
  { glyph: 'ꦌ', label: 'Sw. E' }, { glyph: 'ꦎ', label: 'Sw. O' },
  { glyph: 'ꦲ꦳', label: 'Rek. Ha' }, { glyph: 'ꦏ꦳', label: 'Rek. Kha' }, { glyph: 'ꦢ꦳', label: 'Rek. Dza' },
  { glyph: 'ꦗ꦳', label: 'Rek. Za' }, { glyph: 'ꦥ꦳', label: 'Rek. Fa' }
];

const ANGKA_PADA_KEYS: VirtualKeyItem[] = [
  { glyph: '꧑', label: '1' }, { glyph: '꧒', label: '2' }, { glyph: '꧓', label: '3' },
  { glyph: '꧔', label: '4' }, { glyph: '꧕', label: '5' }, { glyph: '꧖', label: '6' },
  { glyph: '꧗', label: '7' }, { glyph: '꧘', label: '8' }, { glyph: '꧙', label: '9' },
  { glyph: '꧐', label: '0' },
  { glyph: '꧋', label: 'Adeg-adeg' },
  { glyph: '꧈', label: 'Pada Lingsa' },
  { glyph: '꧉', label: 'Pada Lungsi' },
  { glyph: '꧊', label: 'Pada Pangkat' },
  { glyph: '꧅', label: 'Pada Luhur' },
  { glyph: '꧄', label: 'Pada Madya' },
  { glyph: '꧁', label: 'Rerenggan Ki' },
  { glyph: '꧂', label: 'Rerenggan Ka' }
];

interface VirtualAksaraKeyboardProps {
  onInsertGlyph: (glyph: string) => void;
  onBackspace: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function VirtualAksaraKeyboard({
  onInsertGlyph,
  onBackspace,
  isOpen,
  onToggleOpen,
}: VirtualAksaraKeyboardProps) {
  const [activeTab, setActiveTab] = useState<'nglegena' | 'pasangan' | 'sandhangan' | 'murda' | 'angka'>('nglegena');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(24);

  const handleKeyPress = (glyph: string) => {
    if (soundEnabled) {
      playLontarClickSound();
    }
    if (hapticEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
    onInsertGlyph(glyph);
  };

  const currentKeySet = {
    nglegena: NGLEGENA_KEYS,
    pasangan: PASANGAN_KEYS,
    sandhangan: SANDHANGAN_KEYS,
    murda: MURDA_SWARA_KEYS,
    angka: ANGKA_PADA_KEYS,
  }[activeTab];

  return (
    <div className="w-full bg-[#181615] text-[#F4F1EA] border-t border-[#3E4556]/60 shadow-2xl transition-all duration-200">
      {/* Top Header Drawer Bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 bg-[#121316] border-b border-[#2E3340]">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleOpen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#222630] hover:bg-[#2E3340] text-xs font-semibold tracking-wider uppercase transition-colors"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Tutup papan ketik Aksara Jawa" : "Buka papan ketik Aksara Jawa"}
          >
            {isOpen ? <ChevronDown className="w-4 h-4 text-[#E06D44]" /> : <ChevronUp className="w-4 h-4 text-[#E06D44]" />}
            <span className="hidden sm:inline">Papan Ketik Aksara Jawa</span>
            <span className="sm:hidden">Keyboard</span>
          </button>

          {/* Quick tab counters */}
          <span className="text-[11px] font-mono text-[#8C857B] hidden md:inline">
            5 Tab Standar • U+A980–U+A9DF
          </span>
        </div>

        {/* Right action toggles: Sound, Haptics, Font size, Collapse */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-md transition-colors ${
              soundEnabled ? 'text-[#E06D44] bg-[#E06D44]/15' : 'text-[#8C857B] hover:bg-[#222630]'
            }`}
            title={soundEnabled ? 'Suara Kayu Lontar Aktif' : 'Suara Senyap'}
            aria-label="Pengaturan Suara Ketukan"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setHapticEnabled(!hapticEnabled)}
            className={`p-2 rounded-md transition-colors ${
              hapticEnabled ? 'text-[#E06D44] bg-[#E06D44]/15' : 'text-[#8C857B] hover:bg-[#222630]'
            }`}
            title={hapticEnabled ? 'Getar Haptik Aktif' : 'Getar Mati'}
            aria-label="Pengaturan Getaran Haptik"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center border border-[#2E3340] rounded-md overflow-hidden text-xs">
            <button
              onClick={() => setFontSize(Math.max(18, fontSize - 2))}
              className="px-2 py-1 bg-[#1A1D24] hover:bg-[#2E3340] text-[#A8A29E]"
              aria-label="Kecilkan font keyboard"
            >
              A-
            </button>
            <span className="px-2 py-1 bg-[#121316] text-[11px] font-mono text-[#F4F1EA]">
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(Math.min(32, fontSize + 2))}
              className="px-2 py-1 bg-[#1A1D24] hover:bg-[#2E3340] text-[#A8A29E]"
              aria-label="Besarkan font keyboard"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Body (Collapsible) */}
      {isOpen && (
        <div className="p-3 sm:p-5 max-w-5xl mx-auto">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-[#2E3340] no-scrollbar">
            {[
              { id: 'nglegena', label: 'Nglegena (20)' },
              { id: 'pasangan', label: 'Pasangan (20)' },
              { id: 'sandhangan', label: 'Sandhangan (12)' },
              { id: 'murda', label: 'Murda & Swara (18)' },
              { id: 'angka', label: 'Angka & Pada (18)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#E06D44] text-white shadow-md'
                    : 'bg-[#1A1D24] text-[#A8A29E] hover:text-[#F4F1EA] hover:bg-[#222630]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Key Grid (Strict 48px biometric minimum) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-2 mb-3">
            {currentKeySet.map((keyItem, idx) => (
              <button
                key={`${keyItem.glyph}-${idx}`}
                onClick={() => handleKeyPress(keyItem.glyph)}
                className="group flex flex-col items-center justify-center p-2 rounded-lg bg-[#222630] hover:bg-[#2E3340] active:scale-95 border border-[#2E3340] hover:border-[#E06D44]/50 transition-all duration-100 select-none shadow-sm min-w-[48px] min-h-[52px]"
                aria-label={`Huruf ${keyItem.label}, aksara Jawa ${keyItem.glyph}`}
              >
                <span
                  className="aksara-jawa font-normal text-white group-hover:text-[#F0825B] transition-colors leading-none"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {keyItem.glyph}
                </span>
                <span className="text-[10px] font-mono text-[#A8A29E] group-hover:text-white mt-1 leading-none tracking-tight">
                  {keyItem.label}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom Utility Keys: Space, Backspace, Clear */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#2E3340]">
            <button
              onClick={() => handleKeyPress(' ')}
              className="flex-1 flex items-center justify-center gap-2 h-11 rounded-lg bg-[#1A1D24] hover:bg-[#222630] active:scale-98 text-xs font-semibold text-[#F4F1EA] border border-[#2E3340] transition-all"
              aria-label="Spasi"
            >
              <Space className="w-4 h-4 text-[#A8A29E]" />
              <span>Spasi (Space)</span>
            </button>

            <button
              onClick={() => {
                if (soundEnabled) playLontarClickSound();
                if (hapticEnabled && typeof navigator !== 'undefined') navigator.vibrate?.(10);
                onBackspace();
              }}
              className="flex items-center justify-center gap-1.5 px-5 h-11 rounded-lg bg-[#B91C1C]/20 hover:bg-[#B91C1C]/35 text-[#F87171] border border-[#B91C1C]/40 active:scale-95 text-xs font-semibold transition-all"
              aria-label="Hapus karakter (Backspace)"
            >
              <Delete className="w-4 h-4" />
              <span className="hidden sm:inline">Hapus</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

