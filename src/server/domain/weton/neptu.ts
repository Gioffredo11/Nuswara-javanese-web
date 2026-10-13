import { DayName } from './date';
import { PasaranName } from './pasaran';

/**
 * Standard Neptu values in Javanese numerology (Petungan Jawa).
 * Verified against Serat Centhini & Primbon Betaljemur Adammakna.
 */
export const HARI_NEPTU: Record<DayName, number> = {
  Minggu: 5,
  Senin: 4,
  Selasa: 3,
  Rabu: 7,
  Kamis: 8,
  Jumat: 6,
  Sabtu: 9,
};

export const PASARAN_NEPTU: Record<PasaranName, number> = {
  Legi: 5,
  Pahing: 9,
  Pon: 7,
  Wage: 4,
  Kliwon: 8,
};

export interface NeptuResult {
  neptuHari: number;
  neptuPasaran: number;
  totalNeptu: number;
}

/**
 * Computes individual and total Neptu for given day and pasaran.
 */
export function getNeptu(day: DayName, pasaran: PasaranName): NeptuResult {
  const neptuHari = HARI_NEPTU[day];
  const neptuPasaran = PASARAN_NEPTU[pasaran];

  if (neptuHari === undefined) {
    throw new Error(`Nama hari tidak valid: ${day}`);
  }
  if (neptuPasaran === undefined) {
    throw new Error(`Nama pasaran tidak valid: ${pasaran}`);
  }

  return {
    neptuHari,
    neptuPasaran,
    totalNeptu: neptuHari + neptuPasaran,
  };
}
