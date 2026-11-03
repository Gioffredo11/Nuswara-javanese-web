'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import {
  ArrowLeftRight,
  Copy,
  Check,
  Download,
  Bookmark,
  Volume2,
  Trash2,
  Sliders,
  Keyboard,
  Info,
  Sparkles,
  Clipboard,
  Layers,
  HelpCircle,
} from 'lucide-react';
import {
  latinToAksara,
  aksaraToLatin,
  VowelMode,
  TransliterationOptions,
  TransliterationResult,
  WordToken,
  CULTURAL_PRESETS,
} from '@/lib/transliteration/javaneseEngine';
import { speakJavanesePhonetics, playLontarClickSound } from '@/lib/audio/woodClick';
import { VirtualAksaraKeyboard } from './VirtualAksaraKeyboard';
import { CalligraphicCardModal } from './CalligraphicCardModal';

interface TransliterationStudioProps {
  initialLatinText?: string;
  onNavigateToTab?: (tab: string) => void;
}

export function TransliterationStudio({
  initialLatinText = '',
  onNavigateToTab,
}: TransliterationStudioProps) {
  // Studio Core States
  const [direction, setDirection] = useState<'latin-to-jawa' | 'jawa-to-latin'>('latin-to-jawa');
  const [inputText, setInputText] = useState(initialLatinText || 'budi pekerti luhur');
  const [vowelMode, setVowelMode] = useState<VowelMode>('ketik');
  const [tanpaSpasi, setTanpaSpasi] = useState<boolean>(true);
  const [useMurda, setUseMurda] = useState<boolean>(false);
  const [useSwara, setUseSwara] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(36);

  // Inspector and selection
  const [selectedWordToken, setSelectedWordToken] = useState<WordToken | null>(null);
  const [hoveredWordToken, setHoveredWordToken] = useState<WordToken | null>(null);

  // Modal and drawers
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [copySuccessToast, setCopySuccessToast] = useState(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isPending, startTransition] = useTransition();

  // Transliterate output synchronously
  const translitResult: TransliterationResult = React.useMemo(() => {
    if (direction === 'latin-to-jawa') {
      return latinToAksara(inputText, {
        vowelMode,
        tanpaSpasi,
        useMurda,
        useSwara,
      });
    } else {
      const converted = aksaraToLatin(inputText);
      return {
        aksara: converted,
        tokens: [],
      };
    }
  }, [inputText, direction, vowelMode, tanpaSpasi, useMurda, useSwara]);

  // Keep first token inspected by default if available
  useEffect(() => {
    if (translitResult.tokens.length > 0 && !selectedWordToken) {
      setSelectedWordToken(translitResult.tokens[0]);
    } else if (translitResult.tokens.length === 0) {
      setSelectedWordToken(null);
    }
  }, [translitResult.tokens, selectedWordToken]);

  // Insert character at cursor in textarea
  const insertAtCursor = (textToInsert: string) => {
    playLontarClickSound();
    const textarea = textareaRef.current;
    if (!textarea) {
      setInputText((prev) => prev + textToInsert);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previous = inputText;
    const updated = previous.substring(0, start) + textToInsert + previous.substring(end);

    setInputText(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 10);
  };

  const handleBackspace = () => {
    playLontarClickSound();
    const textarea = textareaRef.current;
    if (!textarea) {
      setInputText((prev) => prev.slice(0, -1));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end && start > 0) {
      const updated = inputText.substring(0, start - 1) + inputText.substring(end);
      setInputText(updated);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start - 1, start - 1);
      }, 10);
    } else if (start !== end) {
      const updated = inputText.substring(0, start) + inputText.substring(end);
      setInputText(updated);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start);
      }, 10);
    }
  };

  const handleCopyUnicode = () => {
    playLontarClickSound();
    navigator.clipboard.writeText(translitResult.aksara);
    setCopySuccessToast(true);
    setTimeout(() => setCopySuccessToast(false), 2400);
  };

  const handleSavePhrase = () => {
    playLontarClickSound();
    if (!inputText.trim() || !translitResult.aksara.trim()) return;

    try {
      const existing = localStorage.getItem('nuswara_saved_phrases');
      const list = existing ? JSON.parse(existing) : [];
      const newPhrase = {
        id: `saved-${Date.now()}`,
        aksara: translitResult.aksara,
        latin: inputText,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      const updated = [newPhrase, ...list.slice(0, 49)];
      localStorage.setItem('nuswara_saved_phrases', JSON.stringify(updated));
      setSaveSuccessToast(true);
      setTimeout(() => setSaveSuccessToast(false), 2400);
    } catch {}
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
      }
    } catch {}
  };

  const activeInspectedToken = hoveredWordToken || selectedWordToken;

  return (
    <div className="w-full bg-[#FBF9F5] dark:bg-[#121316] text-[#181615] dark:text-[#F4F1EA] transition-colors duration-200">
      {/* Sticky Mobile Live Preview Ribbon (Visible on small screens when typing) */}
      <div className="md:hidden sticky top-16 z-30 w-full px-4 py-2 bg-[#F3EFE6]/95 dark:bg-[#1A1D24]/95 backdrop-blur border-b border-[#E5DEC9] dark:border-[#2E3340] shadow-sm">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#78716C] dark:text-[#8C857B] mb-1">
          <span>Pratinjau Langsung (Mobile)</span>
          <span className="text-[#B84A27] dark:text-[#E06D44] font-semibold">Hanacaraka</span>
        </div>
        <div className="max-h-[76px] overflow-x-auto overflow-y-hidden whitespace-nowrap py-1">
          <span className="aksara-jawa text-2xl text-[#181615] dark:text-[#F4F1EA]">
            {translitResult.aksara || 'ꦤꦸꦱ꧀ꦮꦫ'}
          </span>
        </div>
      </div>

      <div className="archival-studio-container px-4 sm:px-6 lg:px-8 py-6">
        {/* Clarity Header Banner & Direction Switcher */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5DEC9] dark:border-[#2E3340]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold tracking-wide bg-[#B84A27]/12 text-[#B84A27] dark:bg-[#E06D44]/15 dark:text-[#E06D44]">
                ❖ Alat Alih Aksara (Transliterasi Latin ↔ Aksara Jawa)
              </span>
              <span className="text-xs font-mono text-[#78716C] dark:text-[#8C857B]">
                Standar Kongres Aksara Jawa
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E]">
              Transliterasi fonetik huruf demi huruf, bukan terjemahan kosakata. Tuladha Jejeg & Noto Sans Javanese v2 beresolusi tinggi.
            </p>
          </div>

          {/* Direction Switcher Segmented Control */}
          <div className="flex items-center bg-[#F3EFE6] dark:bg-[#1A1D24] p-1 rounded-xl border border-[#E5DEC9] dark:border-[#2E3340] shadow-inner text-xs font-semibold">
            <button
              onClick={() => {
                playLontarClickSound();
                setDirection('latin-to-jawa');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                direction === 'latin-to-jawa'
                  ? 'bg-white dark:bg-[#222630] text-[#B84A27] dark:text-[#E06D44] shadow-sm font-bold'
                  : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#181615] dark:hover:text-white'
              }`}
            >
              <span>Latin</span>
              <ArrowLeftRight className="w-3.5 h-3.5 opacity-60" />
              <span>Aksara Jawa</span>
            </button>

            <button
              onClick={() => {
                playLontarClickSound();
                setDirection('jawa-to-latin');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                direction === 'jawa-to-latin'
                  ? 'bg-white dark:bg-[#222630] text-[#B84A27] dark:text-[#E06D44] shadow-sm font-bold'
                  : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#181615] dark:hover:text-white'
              }`}
            >
              <span>Aksara Jawa</span>
              <ArrowLeftRight className="w-3.5 h-3.5 opacity-60" />
              <span>Latin</span>
            </button>
          </div>
        </div>

        {/* 12-Column Card-Less Split Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5DEC9] dark:border-[#2E3340] rounded-2xl overflow-hidden bg-white dark:bg-[#1A1D24] shadow-xl">
          {/* =========================================================
              LEFT PANE (COLUMNS 1–6): Input Editor & Phonetic Assist
              ========================================================= */}
          <div className="lg:col-span-6 flex flex-col p-5 sm:p-6 lg:border-r border-[#E5DEC9] dark:border-[#2E3340] bg-[#FBF9F5]/40 dark:bg-[#1A1D24]">
            {/* Vowel Mapping Mode Switcher with hover preview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#E5DEC9] dark:border-[#2E3340]">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#181615] dark:text-[#F4F1EA]">
                  Kaidah Vokal &lsquo;E&rsquo;:
                </span>
                <div className="group relative">
                  <HelpCircle className="w-3.5 h-3.5 text-[#78716C] dark:text-[#8C857B] cursor-pointer" />
                  <div className="invisible group-hover:visible absolute left-0 bottom-full mb-2 w-64 p-3 rounded-lg bg-[#181615] text-[#F4F1EA] text-[11px] shadow-2xl z-50 border border-[#3E4556]">
                    <strong>Perbedaan Kaidah:</strong>
                    <br />
                    • Ketik Cepat: &lsquo;e&rsquo; = taling (ꦺ), &lsquo;x&rsquo; = pepet (ꦼ).
                    <br />
                    • Mode Salin: &lsquo;e&rsquo; = pepet (ꦼ), &lsquo;é&rsquo; / &lsquo;è&rsquo; = taling (ꦺ).
                  </div>
                </div>
              </div>

              {/* Segmented Vowel Switcher */}
              <div className="flex items-center bg-[#F3EFE6] dark:bg-[#121316] p-0.5 rounded-lg border border-[#E5DEC9] dark:border-[#2E3340] text-xs">
                <button
                  onClick={() => {
                    playLontarClickSound();
                    setVowelMode('ketik');
                  }}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    vowelMode === 'ketik'
                      ? 'bg-[#B84A27] dark:bg-[#E06D44] text-white font-bold'
                      : 'text-[#57534E] dark:text-[#A8A29E]'
                  }`}
                  title="e = taling (ꦺ), x = pepet (ꦼ)"
                >
                  Mode Ketik Cepat
                </button>
                <button
                  onClick={() => {
                    playLontarClickSound();
                    setVowelMode('kopas');
                  }}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    vowelMode === 'kopas'
                      ? 'bg-[#B84A27] dark:bg-[#E06D44] text-white font-bold'
                      : 'text-[#57534E] dark:text-[#A8A29E]'
                  }`}
                  title="e = pepet (ꦼ), é/è = taling (ꦺ)"
                >
                  Mode Salin-Tempel (Kopas)
                </button>
              </div>
            </div>

            {/* Orthographic Rule Toggles */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
              <label
                className="flex items-center gap-2 cursor-pointer select-none"
                title="Menyambung pasangan antar-kata tanpa memunculkan pangkon mati di tengah kalimat"
              >
                <input
                  type="checkbox"
                  checked={tanpaSpasi}
                  onChange={(e) => setTanpaSpasi(e.target.checked)}
                  className="rounded text-[#B84A27] focus:ring-[#B84A27] w-4 h-4"
                />
                <span className="font-semibold text-[#181615] dark:text-[#F4F1EA]">
                  Tanpa Spasi (Scriptio Continua)
                </span>
              </label>

              <label
                className="flex items-center gap-2 cursor-pointer select-none"
                title="Menggunakan aksara kehormatan Murda untuk huruf kapital proper noun"
              >
                <input
                  type="checkbox"
                  checked={useMurda}
                  onChange={(e) => setUseMurda(e.target.checked)}
                  className="rounded text-[#B84A27] focus:ring-[#B84A27] w-4 h-4"
                />
                <span className="text-[#57534E] dark:text-[#A8A29E]">
                  Aksara Murda (Kapital)
                </span>
              </label>

              <label
                className="flex items-center gap-2 cursor-pointer select-none"
                title="Menggunakan aksara vokal mandiri Swara"
              >
                <input
                  type="checkbox"
                  checked={useSwara}
                  onChange={(e) => setUseSwara(e.target.checked)}
                  className="rounded text-[#B84A27] focus:ring-[#B84A27] w-4 h-4"
                />
                <span className="text-[#57534E] dark:text-[#A8A29E]">
                  Aksara Swara
                </span>
              </label>
            </div>

            {/* Quick-Insert Diacritic & Punctuation Bar (Min 44px touch target) */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#78716C] dark:text-[#8C857B] mb-1.5">
                <span>Sisipkan Karakter Khusus & Tanda Baca:</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { char: 'ě', label: 'pepet' },
                  { char: 'é', label: 'taling' },
                  { char: 'è', label: 'è' },
                  { char: 'ḍ', label: 'dha' },
                  { char: 'ṭ', label: 'tha' },
                  { char: 'ŋ', label: 'cecak' },
                  { char: 'ñ', label: 'nya' },
                  { char: '꧋', label: 'adeg' },
                  { char: '꧈', label: 'lingsa' },
                  { char: '꧉', label: 'lungsi' },
                  { char: '꧁', label: 'rerenggan' },
                  { char: '꧂', label: 'rerenggan' },
                ].map((item) => (
                  <button
                    key={item.char + item.label}
                    onClick={() => insertAtCursor(item.char)}
                    className="flex flex-col items-center justify-center min-h-[44px] px-3 rounded-lg bg-[#F3EFE6] dark:bg-[#222630] hover:bg-[#E5DEC9] dark:hover:bg-[#2E3340] border border-[#E5DEC9] dark:border-[#2E3340] text-xs font-semibold text-[#181615] dark:text-[#F4F1EA] transition-transform active:scale-95 shrink-0"
                    aria-label={`Sisipkan karakter ${item.label}`}
                  >
                    <span className="font-serif text-sm">{item.char}</span>
                    <span className="text-[9px] font-mono text-[#78716C] dark:text-[#8C857B] leading-none">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Input Textarea */}
            <div className="relative flex-1 flex flex-col mb-4">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  direction === 'latin-to-jawa'
                    ? 'Ketik teks huruf Latin di sini (contoh: budi pekerti luhur)...'
                    : 'Ketik atau tempel teks Aksara Jawa di sini...'
                }
                rows={6}
                className="w-full flex-1 p-4 rounded-xl bg-white dark:bg-[#121316] text-[#181615] dark:text-[#F4F1EA] text-base border border-[#E5DEC9] dark:border-[#2E3340] focus:border-[#B84A27] focus:outline-none resize-none transition-colors font-sans placeholder:text-[#78716C]"
              />

              {/* Textarea Toolbar (Clear, Paste, Keyboard Drawer Toggle) */}
              <div className="flex items-center justify-between pt-2 text-xs text-[#78716C] dark:text-[#8C857B]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playLontarClickSound();
                      setInputText('');
                    }}
                    className="flex items-center gap-1 hover:text-[#B91C1C] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Teks</span>
                  </button>
                  <span>•</span>
                  <button
                    onClick={handlePaste}
                    className="flex items-center gap-1 hover:text-[#B84A27] dark:hover:text-[#E06D44] transition-colors"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Tempel (Paste)</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsKeyboardOpen(!isKeyboardOpen)}
                    className="flex items-center gap-1 text-[#B84A27] dark:text-[#E06D44] font-semibold hover:underline"
                  >
                    <Keyboard className="w-4 h-4" />
                    <span>{isKeyboardOpen ? 'Sembunyikan Keyboard' : 'Papan Ketik Aksara'}</span>
                  </button>
                  <span className="font-mono text-[11px]">{inputText.length} karakter</span>
                </div>
              </div>
            </div>

            {/* Cultural Presets Chips (Pustaka Sastra) */}
            <div>
              <span className="text-[11px] font-mono text-[#78716C] dark:text-[#8C857B] uppercase block mb-2 font-bold tracking-wider">
                Pustaka Sastra • Pilihan Peribahasa Adiluhung:
              </span>
              <div className="flex flex-wrap gap-2">
                {CULTURAL_PRESETS.map((preset) => (
                  <button
                    key={preset.title}
                    onClick={() => {
                      playLontarClickSound();
                      setInputText(preset.latin);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#F3EFE6] dark:bg-[#222630] hover:bg-[#B84A27]/12 dark:hover:bg-[#E06D44]/15 border border-[#E5DEC9] dark:border-[#2E3340] text-xs text-[#181615] dark:text-[#F4F1EA] text-left transition-all active:scale-95"
                    title={preset.meaning}
                  >
                    <span className="font-bold block text-[11px] text-[#B84A27] dark:text-[#E06D44]">
                      {preset.title}
                    </span>
                    <span className="text-[10px] text-[#57534E] dark:text-[#A8A29E] truncate block max-w-[200px]">
                      {preset.meaning}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT PANE (COLUMNS 7–12): Live Aksara Canvas & Syllable X-Ray
              ========================================================= */}
          <div className="lg:col-span-6 flex flex-col p-5 sm:p-6 bg-white dark:bg-[#1A1D24]">
            {/* Header: Font Scale Slider & Clear Visual Hierarchy */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5DEC9] dark:border-[#2E3340]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#181615] dark:text-[#F4F1EA]">
                  Kanvas Hasil Aksara Jawa
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F3EFE6] dark:bg-[#222630] text-[#78716C] dark:text-[#8C857B]">
                  Anti-Clipping 2.35 LH
                </span>
              </div>

              {/* Font Size Slider */}
              <div className="flex items-center gap-2 text-xs">
                <Sliders className="w-3.5 h-3.5 text-[#78716C] dark:text-[#8C857B]" />
                <span className="text-[11px] font-mono text-[#78716C] dark:text-[#8C857B]">{fontSize}px</span>
                <input
                  type="range"
                  min={28}
                  max={64}
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                  className="w-24 accent-[#B84A27]"
                  aria-label="Ukuran font aksara Jawa"
                />
              </div>
            </div>

            {/* Aksara Output Canvas (Interactive Word Tokens) */}
            <div className="flex-1 min-h-[220px] p-5 rounded-xl bg-[#FBF9F5] dark:bg-[#121316] border border-[#E5DEC9] dark:border-[#2E3340] mb-4 overflow-y-auto">
              {translitResult.tokens.length > 0 ? (
                <div
                  className="aksara-jawa text-[#181615] dark:text-[#F4F1EA] select-text"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {translitResult.tokens.map((token) => {
                    const isSelected = selectedWordToken?.id === token.id;
                    const isHovered = hoveredWordToken?.id === token.id;
                    return (
                      <button
                        key={token.id}
                        type="button"
                        onClick={() => {
                          playLontarClickSound();
                          setSelectedWordToken(token);
                        }}
                        onMouseEnter={() => setHoveredWordToken(token)}
                        onMouseLeave={() => setHoveredWordToken(null)}
                        className={`aksara-word-token aksara-jawa ${
                          isSelected || isHovered ? 'is-active' : ''
                        }`}
                        aria-label={`Aksara Jawa untuk kata ${token.latin}, klik untuk melihat rincian suku kata`}
                      >
                        {token.aksara}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-sm text-[#78716C] dark:text-[#8C857B]">
                  {inputText.trim() ? (
                    <span className="aksara-jawa text-3xl">{translitResult.aksara}</span>
                  ) : (
                    'Ketik kalimat pada panel kiri untuk menghasilkan aksara Jawa secara instan.'
                  )}
                </div>
              )}
            </div>

            {/* Interactive Syllable X-Ray Inspector Card */}
            {activeInspectedToken && (
              <div className="p-4 rounded-xl bg-[#F3EFE6] dark:bg-[#1A1D24] border border-[#E5DEC9] dark:border-[#2E3340] mb-4 transition-all">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E5DEC9] dark:border-[#2E3340]">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#1E3A5F] dark:text-[#60A5FA]" />
                    <span className="text-xs font-bold text-[#181615] dark:text-[#F4F1EA]">
                      Inspektur Suku Kata (X-Ray) • &ldquo;{activeInspectedToken.latin}&rdquo;
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      playLontarClickSound();
                      speakJavanesePhonetics(activeInspectedToken.latin);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#222630] text-xs font-medium text-[#181615] dark:text-[#F4F1EA] hover:text-[#B84A27] dark:hover:text-[#E06D44] shadow-sm transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#B84A27] dark:text-[#E06D44]" />
                    <span>Dengarkan Pelafalan</span>
                  </button>
                </div>

                {/* Syllable Breakdown Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {activeInspectedToken.syllables.map((syl, sIdx) => (
                    <div
                      key={syl.id + sIdx}
                      className="p-2.5 rounded-lg bg-white dark:bg-[#121316] border border-[#E5DEC9] dark:border-[#2E3340] text-xs"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] text-[#78716C] dark:text-[#8C857B] uppercase">
                          Suku {sIdx + 1}: &ldquo;{syl.latin}&rdquo;
                        </span>
                        <span className="aksara-jawa text-lg font-bold text-[#181615] dark:text-[#F4F1EA]">
                          {syl.aksara}
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px]">
                        <div className="flex items-center justify-between text-[#57534E] dark:text-[#A8A29E]">
                          <span>Dasar:</span>
                          <span className="font-bold text-[#181615] dark:text-[#F4F1EA]">
                            {syl.base.glyph} ({syl.base.name})
                          </span>
                        </div>

                        {syl.sandhangan.map((sand, idx) => (
                          <div
                            key={sand.glyph + idx}
                            className="flex items-center justify-between text-[#B84A27] dark:text-[#E06D44]"
                          >
                            <span>Sandhangan:</span>
                            <span className="font-semibold">
                              {sand.glyph} ({sand.name})
                            </span>
                          </div>
                        ))}

                        {syl.anuswara && (
                          <div className="flex items-center justify-between text-[#1E3A5F] dark:text-[#60A5FA]">
                            <span>Anuswara:</span>
                            <span className="font-semibold">
                              {syl.anuswara.glyph} ({syl.anuswara.name})
                            </span>
                          </div>
                        )}

                        {syl.pangkon && (
                          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                            <span>Pangkon:</span>
                            <span className="font-semibold">{syl.pangkon.glyph} (Virama)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar: Copy Unicode, Export PNG, Save */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5DEC9] dark:border-[#2E3340]">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSavePhrase}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F3EFE6] dark:bg-[#222630] hover:bg-[#E5DEC9] dark:hover:bg-[#2E3340] text-xs font-semibold text-[#181615] dark:text-[#F4F1EA] transition-colors"
                >
                  {saveSuccessToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5" />}
                  <span>{saveSuccessToast ? 'Tersimpan ke Koleksi!' : 'Simpan Frasa'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyUnicode}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F3EFE6] dark:bg-[#222630] hover:bg-[#E5DEC9] dark:hover:bg-[#2E3340] text-xs font-semibold text-[#181615] dark:text-[#F4F1EA] transition-colors"
                  aria-label="Salin teks Unicode aksara Jawa"
                >
                  {copySuccessToast ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 dark:text-emerald-300">Tersalin ke Papan Klip!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Teks Unicode</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    playLontarClickSound();
                    setIsCardModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#B84A27] dark:bg-[#E06D44] hover:bg-[#9A3B1C] dark:hover:bg-[#F0825B] text-white text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Kartu Gambar (PNG)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Virtual Keyboard Drawer */}
        <div className="mt-6">
          <VirtualAksaraKeyboard
            isOpen={isKeyboardOpen}
            onToggleOpen={() => setIsKeyboardOpen(!isKeyboardOpen)}
            onInsertGlyph={insertAtCursor}
            onBackspace={handleBackspace}
          />
        </div>
      </div>

      {/* High-DPI Calligraphic Card Exporter Modal */}
      <CalligraphicCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        aksaraText={translitResult.aksara}
        latinText={inputText}
      />
    </div>
  );
}
