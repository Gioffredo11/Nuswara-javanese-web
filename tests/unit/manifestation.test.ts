import { describe, it, expect } from 'vitest';
import {
  pickDailyCard,
  getWibDateString,
  stableHash,
  PhilosophyCard,
} from '@/server/domain/manifestation/pickDailyCard';

describe('Domain: Manifestation - Pure Deterministic Daily Card Picker', () => {
  const mockCards: PhilosophyCard[] = [
    {
      id: 1,
      slug: 'urip-iku-urub',
      title: 'Urip Iku Urub',
      textJawa: 'Urip iku urub, migunani tumraping liyan.',
      meaning: 'Konteks budaya: Hidup adalah nyala api yang menerangi sesama.',
      modernInterpretation: 'Interpretasi modern: Kontribusi nyata dalam komunitas memberikan arti hidup.',
      category: 'KEHIDUPAN',
    },
    {
      id: 2,
      slug: 'sura-dira-jayaningrat',
      title: 'Sura Dira Jayaningrat',
      textJawa: 'Sura dira jayaningrat, lebur dening pangastuti.',
      meaning: 'Konteks budaya: Angkara murka akan lebur oleh kelembutan budi pekerti.',
      modernInterpretation: 'Interpretasi modern: Kerendahan hati dan empati lebih efektif melunakkan konflik.',
      category: 'KEBIJAKSANAAN',
    },
    {
      id: 3,
      slug: 'ajining-diri',
      title: 'Ajining Diri Saka Lathi',
      textJawa: 'Ajining dhiri dumunung ana ing lathi.',
      meaning: 'Konteks budaya: Kehormatan seseorang terletak pada kata-katanya.',
      modernInterpretation: 'Interpretasi modern: Integritas digital dan ucapan mencerminkan reputasi diri.',
      category: 'INTEGRITAS',
    },
  ];

  describe('WIB Date formatting and midnight reset boundary', () => {
    it('returns date in Asia/Jakarta (UTC+7) timezone', () => {
      // 2026-10-06 05:00:00 UTC -> 2026-10-06 12:00:00 WIB
      const dateUtc = new Date(Date.UTC(2026, 9, 6, 5, 0, 0));
      expect(getWibDateString(dateUtc)).toBe('2026-10-06');
    });

    it('crosses into next day at 17:00:00 UTC (00:00:00 WIB midnight)', () => {
      // 2026-10-06 16:59:59 UTC -> 2026-10-06 23:59:59 WIB (still Oct 6)
      const beforeMidnight = new Date(Date.UTC(2026, 9, 6, 16, 59, 59));
      expect(getWibDateString(beforeMidnight)).toBe('2026-10-06');

      // 2026-10-06 17:00:00 UTC -> 2026-10-07 00:00:00 WIB (resets to Oct 7)
      const atMidnight = new Date(Date.UTC(2026, 9, 6, 17, 0, 0));
      expect(getWibDateString(atMidnight)).toBe('2026-10-07');
    });
  });

  describe('Deterministic Stable Hash', () => {
    it('produces repeatable 32-bit unsigned integer', () => {
      const h1 = stableHash('manifestation:user-1:2026-10-06');
      const h2 = stableHash('manifestation:user-1:2026-10-06');
      expect(h1).toBe(h2);
      expect(h1).toBeGreaterThanOrEqual(0);
    });

    it('differs for different seeds', () => {
      const h1 = stableHash('manifestation:user-1:2026-10-06');
      const h2 = stableHash('manifestation:user-2:2026-10-06');
      expect(h1).not.toBe(h2);
    });
  });

  describe('Deterministic Card Selection', () => {
    it('returns the same card for the same user on the same localDate', () => {
      const card1 = pickDailyCard('user-alpha', '2026-10-06', mockCards);
      const card2 = pickDailyCard('user-alpha', '2026-10-06', mockCards);
      const card3 = pickDailyCard('user-alpha', '2026-10-06', mockCards);

      expect(card1.id).toBe(card2.id);
      expect(card2.id).toBe(card3.id);
      expect(card1.slug).toBe(card2.slug);
    });

    it('distinctly separates cultural meaning vs modern interpretation', () => {
      const card = pickDailyCard('user-alpha', '2026-10-06', mockCards);
      expect(card.meaning).toContain('Konteks budaya');
      expect(card.modernInterpretation).toContain('Interpretasi modern');
    });

    it('throws error when cards collection is empty', () => {
      expect(() => pickDailyCard('user-1', '2026-10-06', [])).toThrow(
        /Daftar kartu filosofi tidak boleh kosong/
      );
    });
  });
});
