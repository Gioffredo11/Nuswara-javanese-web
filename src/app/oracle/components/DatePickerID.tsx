'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DatePickerIDProps {
  id?: string;
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  minYear?: number;
  maxYear?: number;
  error?: string | null;
  required?: boolean;
}

const INDONESIAN_MONTHS = [
  { value: '01', label: 'Januari' },
  { value: '02', label: 'Februari' },
  { value: '03', label: 'Maret' },
  { value: '04', label: 'April' },
  { value: '05', label: 'Mei' },
  { value: '06', label: 'Juni' },
  { value: '07', label: 'Juli' },
  { value: '08', label: 'Agustus' },
  { value: '09', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Desember' },
];

export function DatePickerID({
  id = 'date-picker-id',
  value,
  onChange,
  minYear = 1950,
  maxYear = new Date().getFullYear(),
  error,
}: DatePickerIDProps) {
  // Parse initial YYYY-MM-DD
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');

  useEffect(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split('-');
      setYear(y);
      setMonth(m);
      setDay(d);
    } else if (!value) {
      setYear('');
      setMonth('');
      setDay('');
    }
  }, [value]);

  // Calculate maximum valid days for the chosen year and month
  const getDaysInMonth = (yStr: string, mStr: string): number => {
    const yNum = Number(yStr) || 2000;
    const mNum = Number(mStr) || 1;
    return new Date(yNum, mNum, 0).getDate();
  };

  const daysInCurrentMonth = getDaysInMonth(year, month);

  // When year or month changes, validate day doesn't exceed max days (e.g. 31 Feb)
  const updateDate = (newDay: string, newMonth: string, newYear: string) => {
    let finalDay = newDay;
    if (newYear && newMonth && newDay) {
      const maxDays = getDaysInMonth(newYear, newMonth);
      if (Number(newDay) > maxDays) {
        finalDay = String(maxDays).padStart(2, '0');
        setDay(finalDay);
      }
    }

    if (finalDay && newMonth && newYear) {
      const formatted = `${newYear}-${newMonth.padStart(2, '0')}-${finalDay.padStart(2, '0')}`;
      onChange(formatted);
    } else {
      onChange('');
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDay(val);
    updateDate(val, month, year);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setMonth(val);
    updateDate(day, val, year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setYear(val);
    updateDate(day, month, val);
  };

  // Generate Year options descending (e.g. 2026 down to 1950)
  const yearOptions: number[] = [];
  for (let y = maxYear; y >= minYear; y--) {
    yearOptions.push(y);
  }

  // Generate Day options (1..31 or clamped)
  const dayOptions: number[] = [];
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    dayOptions.push(d);
  }

  return (
    <div className="space-y-1.5" id={id}>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Dropdown Tanggal */}
        <div className="relative">
          <label htmlFor={`${id}-day`} className="sr-only">
            Tanggal
          </label>
          <select
            id={`${id}-day`}
            value={day}
            onChange={handleDayChange}
            aria-label="Pilih tanggal lahir"
            className="w-full appearance-none bg-[#1C0A04] hover:bg-[#250E06] text-amber-100 text-xs sm:text-sm font-sans font-medium px-3 py-2.5 sm:py-3 pr-8 rounded-xl border border-amber-500/30 hover:border-amber-400/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all cursor-pointer shadow-inner"
          >
            <option value="" disabled className="bg-[#1C0A04] text-stone-400">
              Tanggal
            </option>
            {dayOptions.map((d) => {
              const val = String(d).padStart(2, '0');
              return (
                <option key={d} value={val} className="bg-[#1C0A04] text-amber-100 py-1">
                  {d}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-amber-400/70">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Dropdown Bulan */}
        <div className="relative">
          <label htmlFor={`${id}-month`} className="sr-only">
            Bulan
          </label>
          <select
            id={`${id}-month`}
            value={month}
            onChange={handleMonthChange}
            aria-label="Pilih bulan lahir"
            className="w-full appearance-none bg-[#1C0A04] hover:bg-[#250E06] text-amber-100 text-xs sm:text-sm font-sans font-medium px-3 py-2.5 sm:py-3 pr-8 rounded-xl border border-amber-500/30 hover:border-amber-400/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all cursor-pointer shadow-inner truncate"
          >
            <option value="" disabled className="bg-[#1C0A04] text-stone-400">
              Bulan
            </option>
            {INDONESIAN_MONTHS.map((m) => (
              <option key={m.value} value={m.value} className="bg-[#1C0A04] text-amber-100 py-1">
                {m.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-amber-400/70">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Dropdown Tahun */}
        <div className="relative">
          <label htmlFor={`${id}-year`} className="sr-only">
            Tahun
          </label>
          <select
            id={`${id}-year`}
            value={year}
            onChange={handleYearChange}
            aria-label="Pilih tahun lahir"
            className="w-full appearance-none bg-[#1C0A04] hover:bg-[#250E06] text-amber-100 text-xs sm:text-sm font-sans font-medium px-3 py-2.5 sm:py-3 pr-8 rounded-xl border border-amber-500/30 hover:border-amber-400/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all cursor-pointer shadow-inner"
          >
            <option value="" disabled className="bg-[#1C0A04] text-stone-400">
              Tahun
            </option>
            {yearOptions.map((y) => (
              <option key={y} value={String(y)} className="bg-[#1C0A04] text-amber-100 py-1">
                {y}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-amber-400/70">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-[11px] text-red-400 font-sans tracking-wide pt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default DatePickerID;
