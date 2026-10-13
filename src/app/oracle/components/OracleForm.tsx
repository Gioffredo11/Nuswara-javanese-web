'use client';

import React from 'react';
import { User, Sparkles, RefreshCw, Calendar, Dices } from 'lucide-react';
import { DatePickerID } from './DatePickerID';

interface OracleFormProps {
  name: string;
  birthDate: string;
  loading: boolean;
  error: string | null;
  onNameChange: (val: string) => void;
  onBirthDateChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRandomize?: () => void;
}

// Decorative Kawung/Parang corner flourish SVG (pure vector, no external assets)
function CornerOrnament({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const transform = {
    'top-left': '',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }[position];

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-amber-400/50 pointer-events-none"
      style={{ transform }}
      aria-hidden="true"
    >
      <path d="M2 30 V6 C2 3.79 3.79 2 6 2 H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 25 V10 C7 8.34 8.34 7 10 7 H25" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="6" cy="6" r="2" fill="currentColor" />
      {/* Kawung Petal curve */}
      <path d="M14 2 C14 8 8 14 2 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function OracleForm({
  name,
  birthDate,
  loading,
  error,
  onNameChange,
  onBirthDateChange,
  onSubmit,
  onRandomize,
}: OracleFormProps) {
  return (
    <div className="relative w-full bg-gradient-to-b from-[#240E06] via-[#1B0903] to-[#120502] rounded-2xl border border-amber-500/35 p-6 sm:p-8 shadow-xl shadow-amber-950/20">
      {/* Subtle Batik Parang Texture Overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-15 bg-repeat overflow-hidden"
        style={{
          backgroundImage: "url('/images/batik-parang.png')",
          backgroundSize: '120px 120px',
        }}
      />

      {/* 4 Corner Ornaments */}
      <div className="absolute top-2.5 left-2.5">
        <CornerOrnament position="top-left" />
      </div>
      <div className="absolute top-2.5 right-2.5">
        <CornerOrnament position="top-right" />
      </div>
      <div className="absolute bottom-2.5 left-2.5">
        <CornerOrnament position="bottom-left" />
      </div>
      <div className="absolute bottom-2.5 right-2.5">
        <CornerOrnament position="bottom-right" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Form Title & Optional Randomizer Action */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-amber-100 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Masukkan Data Kelahiran</span>
            </h4>
            <p className="text-xs text-amber-200/70 font-sans">
              Kombinasi nama dan tanggal lahirmu menghubungkan perhitungan weton dengan watak wayang.
            </p>
          </div>

          {onRandomize && (
            <button
              type="button"
              onClick={onRandomize}
              disabled={loading}
              title="Isi acak nama dan tanggal lahir untuk menguji arketipe weton lainnya"
              className="self-center sm:self-auto inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans font-medium text-amber-300 hover:text-amber-100 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 rounded-lg shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
            >
              <Dices className="w-3.5 h-3.5 text-amber-400" />
              <span>Acak Tanggal</span>
            </button>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Input Nama */}
          <div className="space-y-1.5">
            <label
              htmlFor="oracle-visitor-name"
              className="block text-xs font-sans uppercase tracking-wider text-amber-200/90 font-semibold"
            >
              Nama Lengkap / Panggilan
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400/70">
                <User className="w-4 h-4" />
              </div>
              <input
                id="oracle-visitor-name"
                type="text"
                required
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Contoh: Raden Bagus..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#150602] hover:bg-[#1C0A04] border border-amber-600/35 focus:border-amber-400 rounded-xl text-sm font-sans text-amber-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Input Tanggal Kelahiran (3 Dropdown: Tanggal, Bulan ID, Tahun) */}
          <div className="space-y-1.5">
            <label
              htmlFor="oracle-birthdate"
              className="block text-xs font-sans uppercase tracking-wider text-amber-200/90 font-semibold flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Tanggal Kelahiran</span>
            </label>
            <DatePickerID
              id="oracle-birthdate"
              value={birthDate}
              onChange={onBirthDateChange}
              required
            />
          </div>

          {/* Error Alert */}
          {error && (
            <div
              role="alert"
              className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-xs text-red-200 font-sans animate-in fade-in duration-200 flex items-start gap-2"
            >
              <span className="text-red-400 font-bold shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* CTA Button: Gold Gradient with Subtle Glow & Lift */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 disabled:opacity-50 text-stone-950 font-extrabold text-sm sm:text-base rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.55)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C0A04] flex items-center justify-center gap-2 cursor-pointer border border-amber-300/80 active:translate-y-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-stone-950 stroke-[2.5]" />
                <span className="tracking-wide">Membaca primbon...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span className="tracking-wide">Hitung Oracle & Temukan Tokohmu ↗</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OracleForm;
