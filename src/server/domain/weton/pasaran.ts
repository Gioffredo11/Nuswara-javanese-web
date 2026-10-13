/**
 * Pure Pasaran calculation based on 5-day Pancawara cycle.
 *
 * DOCUMENTED ANCHOR DATE:
 * 17 Agustus 1945 (1945-08-17) is verified in the Javanese calendar (Almanak Primbon Jawa)
 * as falling on JUMAT LEGI.
 *
 * Cycle order:
 * 0: Legi
 * 1: Pahing
 * 2: Pon
 * 3: Wage
 * 4: Kliwon
 */

export const PASARAN_NAMES = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'] as const;

export type PasaranName = typeof PASARAN_NAMES[number];

/**
 * Anchor timestamp in UTC milliseconds: 1945-08-17 00:00:00 UTC.
 * Verified historical pasaran: Legi (index 0).
 */
export const ANCHOR_DATE_UTC = Date.UTC(1945, 7, 17); // Month index 7 = August
export const ANCHOR_PASARAN_INDEX = 0; // Legi

const MS_PER_DAY = 86400000;

/**
 * Computes the Pasaran name for a calendar date (year, month 1-12, day 1-31).
 * Pure arithmetic, no I/O.
 */
export function getPasaran(year: number, month: number, day: number): PasaranName {
  const targetUtc = Date.UTC(year, month - 1, day);
  const diffDays = Math.round((targetUtc - ANCHOR_DATE_UTC) / MS_PER_DAY);

  // Modulo 5 with positive offset handling
  const pasaranIndex = ((diffDays % 5) + 5) % 5;
  return PASARAN_NAMES[pasaranIndex];
}
