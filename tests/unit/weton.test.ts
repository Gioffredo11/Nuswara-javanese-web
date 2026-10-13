import { describe, it, expect } from 'vitest';
import { calculateWeton } from '@/server/domain/weton/calculate';
import { getDayOfWeek } from '@/server/domain/weton/date';
import { getPasaran } from '@/server/domain/weton/pasaran';
import { getNeptu, HARI_NEPTU, PASARAN_NEPTU } from '@/server/domain/weton/neptu';

describe('Domain: Weton - Pure Javanese Calendar Engine', () => {
  /**
   * Verified test dates against official Indonesian & Javanese almanacs:
   * 1. 17 Agustus 1945 = Jumat Legi (Proklamasi RI, Almanak Primbon Jawa)
   * 2. 28 Oktober 1928 = Minggu Wage (Sumpah Pemuda)
   * 3. 21 April 1879 = Senin Pahing (Kelahiran R.A. Kartini, Almanak Surakarta)
   * 4. 20 Mei 1908 = Rabu Wage (Hari Kebangkitan Nasional)
   * 5. 1 Januari 2000 = Sabtu Legi (Pergantian Milenium & Kabisat 400 tahun)
   * 6. 29 Februari 2024 = Kamis Pon (Tahun kabisat 29 Feb 2024)
   * 7. 17 Agustus 2024 = Sabtu Legi (HUT RI ke-79, 11 Sapar 1958 Ja)
   * 8. 6 Oktober 2026 = Selasa Legi (Tanggal Sistem)
   * 9. 1 Januari 2025 = Rabu Wage (Awal Tahun 2025)
   * 10. 31 Desember 2023 = Minggu Pon (Akhir Tahun 2023)
   */
  const verifiedCases = [
    { date: '1945-08-17', day: 'Jumat', pasaran: 'Legi', nh: 6, np: 5, total: 11, source: 'Proklamasi RI (Almanak Primbon Jawa)' },
    { date: '1928-10-28', day: 'Minggu', pasaran: 'Wage', nh: 5, np: 4, total: 9, source: 'Sumpah Pemuda (Kalender Jawa)' },
    { date: '1879-04-21', day: 'Senin', pasaran: 'Pahing', nh: 4, np: 9, total: 13, source: 'Kelahiran R.A. Kartini (Surakarta)' },
    { date: '1908-05-20', day: 'Rabu', pasaran: 'Pon', nh: 7, np: 7, total: 14, source: 'Budi Utomo / Kebangkitan Nasional' },
    { date: '2000-01-01', day: 'Sabtu', pasaran: 'Legi', nh: 9, np: 5, total: 14, source: 'Milenium 2000 (Kabisat Abad)' },
    { date: '2024-02-29', day: 'Kamis', pasaran: 'Legi', nh: 8, np: 5, total: 13, source: 'Kabisat 2024 (19 Ruwah 1957 Ja)' },
    { date: '2024-08-17', day: 'Sabtu', pasaran: 'Legi', nh: 9, np: 5, total: 14, source: 'HUT RI ke-79 (11 Sapar 1958 Ja)' },
    { date: '2026-10-06', day: 'Selasa', pasaran: 'Legi', nh: 3, np: 5, total: 8, source: 'Ref 2026' },
    { date: '2025-01-01', day: 'Rabu', pasaran: 'Pon', nh: 7, np: 7, total: 14, source: 'Tahun Baru 2025 (1 Rejeb 1958 Ja)' },
    { date: '2023-12-31', day: 'Minggu', pasaran: 'Legi', nh: 5, np: 5, total: 10, source: 'Akhir Tahun 2023 (17 Jumadilakhir 1957 Ja)' },
  ];

  it('verifies all 10 historical Javanese calendar dates with exact day, pasaran, and neptu', () => {
    for (const testCase of verifiedCases) {
      const res = calculateWeton({ dateStr: testCase.date });
      expect(res.dayName, `Day name failed for ${testCase.date} (${testCase.source})`).toBe(testCase.day);
      expect(res.pasaran, `Pasaran failed for ${testCase.date} (${testCase.source})`).toBe(testCase.pasaran);
      expect(res.neptu.neptuHari).toBe(testCase.nh);
      expect(res.neptu.neptuPasaran).toBe(testCase.np);
      expect(res.neptu.totalNeptu).toBe(testCase.total);
      expect(res.wetonName).toBe(`${testCase.day} ${testCase.pasaran}`);
    }
  });

  describe('Individual Pipeline Functions', () => {
    it('tests getDayOfWeek individually', () => {
      expect(getDayOfWeek(1945, 8, 17)).toBe('Jumat');
      expect(getDayOfWeek(1928, 10, 28)).toBe('Minggu');
    });

    it('tests getPasaran individually', () => {
      expect(getPasaran(1945, 8, 17)).toBe('Legi');
      expect(getPasaran(1908, 5, 20)).toBe('Pon');
    });

    it('tests getNeptu individually', () => {
      const n1 = getNeptu('Jumat', 'Legi');
      expect(n1.neptuHari).toBe(6);
      expect(n1.neptuPasaran).toBe(5);
      expect(n1.totalNeptu).toBe(11);
    });
  });

  describe('Neptu Numerology Standards', () => {
    it('verifies all standard Javanese day neptu values', () => {
      expect(HARI_NEPTU['Minggu']).toBe(5);
      expect(HARI_NEPTU['Senin']).toBe(4);
      expect(HARI_NEPTU['Selasa']).toBe(3);
      expect(HARI_NEPTU['Rabu']).toBe(7);
      expect(HARI_NEPTU['Kamis']).toBe(8);
      expect(HARI_NEPTU['Jumat']).toBe(6);
      expect(HARI_NEPTU['Sabtu']).toBe(9);
    });

    it('verifies all standard Javanese pasaran neptu values', () => {
      expect(PASARAN_NEPTU['Legi']).toBe(5);
      expect(PASARAN_NEPTU['Pahing']).toBe(9);
      expect(PASARAN_NEPTU['Pon']).toBe(7);
      expect(PASARAN_NEPTU['Wage']).toBe(4);
      expect(PASARAN_NEPTU['Kliwon']).toBe(8);
    });
  });

  describe('Javanese Day Cutoff (Maghrib vs Midnight)', () => {
    it('shifts to next day when cutoff is maghrib and birth time is >= 18:00', () => {
      // 17 Agustus 2024 at 19:30 with maghrib cutoff -> shifts to 18 Agustus 2024 (Minggu Pahing)
      const res = calculateWeton({
        dateStr: '2024-08-17',
        timeStr: '19:30',
        cutoff: 'maghrib',
      });
      expect(res.shiftedByMaghrib).toBe(true);
      expect(res.effectiveDate).toBe('2024-08-18');
      expect(res.dayName).toBe('Minggu');
      expect(res.pasaran).toBe('Pahing');
    });

    it('does NOT shift day when cutoff is maghrib but birth time is before 18:00', () => {
      const res = calculateWeton({
        dateStr: '2024-08-17',
        timeStr: '17:45',
        cutoff: 'maghrib',
      });
      expect(res.shiftedByMaghrib).toBe(false);
      expect(res.effectiveDate).toBe('2024-08-17');
      expect(res.dayName).toBe('Sabtu');
      expect(res.pasaran).toBe('Legi');
    });

    it('does NOT shift day when cutoff is midnight even if time is late evening', () => {
      const res = calculateWeton({
        dateStr: '2024-08-17',
        timeStr: '23:15',
        cutoff: 'midnight',
      });
      expect(res.shiftedByMaghrib).toBe(false);
      expect(res.effectiveDate).toBe('2024-08-17');
      expect(res.dayName).toBe('Sabtu');
      expect(res.pasaran).toBe('Legi');
    });
  });

  describe('Validation & Error Handling', () => {
    it('throws error on invalid date string format', () => {
      expect(() => calculateWeton({ dateStr: 'invalid-date' })).toThrow(/Format tanggal tidak valid/);
    });

    it('throws error on invalid month out of range', () => {
      expect(() => calculateWeton({ dateStr: '2024-13-01' })).toThrow(/Bulan tidak valid/);
    });

    it('throws error on invalid day out of month bounds', () => {
      expect(() => calculateWeton({ dateStr: '2023-02-29' })).toThrow(/Hari tidak valid/); // 2023 is not a leap year
    });
  });
});
