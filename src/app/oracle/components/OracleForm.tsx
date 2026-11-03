'use client';

import React from 'react';
import { User, RefreshCw, Calendar, Dices } from 'lucide-react';
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

// Decorative corner reticle vectors
function CornerOrnament({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const transform = {
    'top-left': '',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }[position];

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#C5A059]/60 pointer-events-none"
      style={{ transform }}
      aria-hidden="true"
    >
      <path d="M2 22 V4 C2 2.9 2.9 2 4 2 H22" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="5" r="1.5" fill="currentColor" />
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
    <div className="relative w-full bg-[#14110E] border border-[#C5A059]/35 p-6 sm:p-8 shadow-2xl rounded-2xl">
      {/* 4 Corner Ornaments */}
      <div className="absolute top-2 left-2">
        <CornerOrnament position="top-left" />
      </div>
      <div className="absolute top-2 right-2">
        <CornerOrnament position="top-right" />
      </div>
      <div className="absolute bottom-2 left-2">
        <CornerOrnament position="bottom-left" />
      </div>
      <div className="absolute bottom-2 right-2">
        <CornerOrnament position="bottom-right" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Form Title & Randomizer Action */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#C5A059]/20 pb-4">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A059] font-bold block">
              [ LEMBAR ARSIP PRIMBON ]
            </span>
            <h4 className="text-lg font-royal font-bold text-[#F4EFE6]">
              Masukkan Data Kelahiran
            </h4>
            <p className="text-xs text-[#A89F91] font-sans">
              Kombinasi nama dan tanggal lahirmu menghubungkan perhitungan weton dengan watak wayang.
            </p>
          </div>

          {onRandomize && (
            <button
              type="button"
              onClick={onRandomize}
              disabled={loading}
              title="Isi acak nama dan tanggal lahir"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-[#C5A059] hover:text-[#0C0A08] bg-[#0C0A08] hover:bg-[#C5A059] border border-[#C5A059]/40 rounded-full transition-colors cursor-pointer shrink-0"
            >
              <Dices className="w-3.5 h-3.5" />
              <span>Acak Tanggal</span>
            </button>
          )}
        </div>

        {/* Quick Historical Figure Presets */}
        <div className="p-4 bg-[#0C0A08] border border-[#C5A059]/20 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A89F91] font-medium">
            <span className="text-[#C5A059] font-bold uppercase tracking-wider">
              Coba Weton Tokoh Bangsa:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'R.A. Kartini', date: '1879-04-21', label: 'R.A. Kartini (21 Apr 1879)' },
              { name: 'Ir. Soekarno', date: '1901-06-06', label: 'Soekarno (6 Jun 1901)' },
              { name: 'Ki Hadjar Dewantara', date: '1889-05-02', label: 'Dewantara (2 Mei 1889)' },
              { name: 'Pangeran Diponegoro', date: '1785-11-11', label: 'Diponegoro (11 Nov 1785)' },
            ].map((tokoh) => (
              <button
                key={tokoh.name}
                type="button"
                onClick={() => {
                  onNameChange(tokoh.name);
                  onBirthDateChange(tokoh.date);
                }}
                className="px-3 py-1.5 bg-[#14110E] hover:bg-[#C5A059] border border-[#C5A059]/30 hover:border-[#C5A059] text-[#A89F91] hover:text-[#0C0A08] text-[11px] font-mono rounded-full transition-all cursor-pointer shadow-xs"
              >
                {tokoh.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Input Nama */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="oracle-visitor-name"
                className="block text-xs font-mono uppercase tracking-wider text-[#A89F91] font-bold"
              >
                Nama Lengkap / Panggilan
              </label>
              <span className="text-[10px] font-mono text-[#C5A059]/80">
                (Hanya huruf)
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C5A059]/70">
                <User className="w-4 h-4" />
              </div>
              <input
                id="oracle-visitor-name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  // Filter out any numbers automatically
                  const lettersOnly = e.target.value.replace(/[0-9]/g, '');
                  onNameChange(lettersOnly);
                }}
                onKeyDown={(e) => {
                  // Prevent entering numeric digits directly
                  if (/^[0-9]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                pattern="^[A-Za-zÀ-ÿ\s'.\-]+$"
                title="Nama hanya boleh berisi huruf (tidak boleh mengandung angka)"
                placeholder="Contoh: Raden Dananjaya..."
                className="w-full pl-10 pr-4 py-3 bg-[#0C0A08] border border-[#C5A059]/30 focus:border-[#C5A059] rounded-xl text-xs font-mono text-[#F4EFE6] placeholder-[#A89F91]/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Input Tanggal Kelahiran */}
          <div className="space-y-1.5">
            <label
              htmlFor="oracle-birthdate"
              className="block text-xs font-mono uppercase tracking-wider text-[#A89F91] font-bold flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
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
              className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-xs text-red-200 font-mono animate-in fade-in duration-200 flex items-start gap-2"
            >
              <span className="text-red-400 font-bold shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* CTA Button: Antique Gold Metal Plate Style */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-[#C5A059] hover:bg-[#D5B36E] disabled:opacity-50 text-[#0C0A08] font-bold text-xs uppercase font-mono tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#8C6D32]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#0C0A08]" />
                <span>Membaca Primbon...</span>
              </>
            ) : (
              <>
                <span className="text-[#0C0A08]">❖</span>
                <span>Hitung Oracle &amp; Temukan Tokohmu</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OracleForm;