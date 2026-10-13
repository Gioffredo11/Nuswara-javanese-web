/**
 * Pure date utilities for Javanese calendar calculations.
 * Timezone reference: Asia/Jakarta (WIB = UTC+7).
 * Zero I/O, zero external dependencies.
 */

export type DayCutoffMode = 'midnight' | 'maghrib';

export interface CalendarDateInput {
  year: number;
  month: number; // 1-12
  day: number;   // 1-31
  hours?: number; // 0-23
  minutes?: number; // 0-59
}

export const DAY_NAMES = [
  'Minggu', // 0
  'Senin',  // 1
  'Selasa', // 2
  'Rabu',   // 3
  'Kamis',  // 4
  'Jumat',  // 5
  'Sabtu',  // 6
] as const;

export type DayName = typeof DAY_NAMES[number];

/**
 * Parses YYYY-MM-DD string into CalendarDateInput
 */
export function parseDateString(dateStr: string): { year: number; month: number; day: number } {
  const parts = dateStr.trim().split('-');
  if (parts.length !== 3) {
    throw new Error(`Format tanggal tidak valid (harus YYYY-MM-DD): ${dateStr}`);
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error(`Nilai tanggal numerik tidak valid: ${dateStr}`);
  }

  // Basic Gregorian boundary check
  if (month < 1 || month > 12) {
    throw new Error(`Bulan tidak valid: ${month}`);
  }
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (day < 1 || day > daysInMonth) {
    throw new Error(`Hari tidak valid (${day}) untuk bulan ${month} tahun ${year}`);
  }

  return { year, month, day };
}

/**
 * Parses optional time string HH:mm
 */
export function parseTimeString(timeStr?: string): { hours: number; minutes: number } {
  if (!timeStr) {
    return { hours: 12, minutes: 0 };
  }
  const parts = timeStr.trim().split(':');
  if (parts.length < 2) {
    throw new Error(`Format jam tidak valid (harus HH:mm): ${timeStr}`);
  }
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error(`Jam lahir di luar jangkauan valid (00:00 - 23:59): ${timeStr}`);
  }
  return { hours, minutes };
}

/**
 * Adjusts calendar date if Maghrib cutoff is active (>= 18:00 WIB).
 * In traditional Javanese reckoning, the day changes at sunset (Maghrib ~18:00 WIB).
 */
export function resolveEffectiveDate(
  year: number,
  month: number,
  day: number,
  hours: number,
  cutoff: DayCutoffMode = 'midnight'
): { year: number; month: number; day: number; shiftedByMaghrib: boolean } {
  if (cutoff === 'maghrib' && hours >= 18) {
    // Add 1 day
    const nextDate = new Date(Date.UTC(year, month - 1, day + 1));
    return {
      year: nextDate.getUTCFullYear(),
      month: nextDate.getUTCMonth() + 1,
      day: nextDate.getUTCDate(),
      shiftedByMaghrib: true,
    };
  }

  return { year, month, day, shiftedByMaghrib: false };
}

/**
 * Gets day of week (Minggu = 0, ..., Sabtu = 6)
 */
export function getDayOfWeek(year: number, month: number, day: number): DayName {
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const dayIndex = utcDate.getUTCDay();
  return DAY_NAMES[dayIndex];
}
