import { describe, it, expect } from 'vitest';
import {
  matchCharacter,
  CharacterData,
  WetonData,
  WetonCharacterRuleData,
} from '@/server/domain/oracle/matchCharacter';

describe('Domain: Oracle - Pure Deterministic Character Matcher', () => {
  const mockCharacters: CharacterData[] = [
    {
      id: 1,
      slug: 'arjuna',
      name: 'Raden Arjuna',
      shortDescription: 'Ksatria panengah Pandawa berparas rupawan dan ahli memanah.',
      neptuAffinity: 14,
    },
    {
      id: 2,
      slug: 'bima',
      name: 'Raden Bima (Werkudara)',
      shortDescription: 'Ksatria perkasa pelindung kebenaran berbadan kekar.',
      neptuAffinity: 15,
    },
    {
      id: 8,
      slug: 'semar',
      name: 'Kyai Semar Badranaya',
      shortDescription: 'Lurah Karangtumaritis, pamong para ksatria berhati mulia.',
      neptuAffinity: 11,
    },
  ];

  const mockRules: WetonCharacterRuleData[] = [
    {
      wetonId: 1, // Jumat Legi
      characterId: 8, // Semar
      matchReason: 'Jumat Legi memiliki karakter mengayomi dan tenang seperti Kyai Semar.',
      compatibilityAdvice: 'Gunakan kebijaksanaan batinmu untuk membimbing sesama tanpa menghakimi.',
      priority: 10,
    },
    {
      wetonId: 2, // Sabtu Legi
      characterId: 1, // Arjuna
      matchReason: 'Sabtu Legi memiliki aura ketenangan dan daya tarik estetika tinggi seperti Arjuna.',
      compatibilityAdvice: 'Asah fokus dan integritas pribadimu agar tidak mudah goyah oleh pujian.',
      priority: 10,
    },
  ];

  it('matches character using explicit rule if rule exists for weton', () => {
    const wetonJumatLegi: WetonData = {
      id: 1,
      dayName: 'Jumat',
      pasaran: 'Legi',
      neptu: 11,
      name: 'Jumat Legi',
    };

    const result = matchCharacter(wetonJumatLegi, mockCharacters, mockRules);

    expect(result.character.slug).toBe('semar');
    expect(result.character.name).toBe('Kyai Semar Badranaya');
    expect(result.matchMethod).toBe('EXPLICIT_RULE');
    expect(result.confidenceScore).toBe(0.95);
    expect(result.interpretationType).toBe('MODERN_INTERPRETATION');
    expect(result.matchReason).toContain('Kyai Semar');
  });

  it('always tags the output with MODERN_INTERPRETATION', () => {
    const wetonSabtuLegi: WetonData = {
      id: 2,
      dayName: 'Sabtu',
      pasaran: 'Legi',
      neptu: 14,
      name: 'Sabtu Legi',
    };

    const result = matchCharacter(wetonSabtuLegi, mockCharacters, mockRules);
    expect(result.interpretationType).toBe('MODERN_INTERPRETATION');
    expect(result.character.slug).toBe('arjuna');
  });

  it('falls back to neptu affinity matching when no explicit rule exists', () => {
    const wetonUnknown: WetonData = {
      id: 99,
      dayName: 'Kamis',
      pasaran: 'Pon',
      neptu: 15,
      name: 'Kamis Pon',
    };

    // No rule for wetonId 99 -> should pick Bima (neptuAffinity 15, diff = 0)
    const result = matchCharacter(wetonUnknown, mockCharacters, mockRules);

    expect(result.character.slug).toBe('bima');
    expect(result.matchMethod).toBe('NEPTU_TRAIT_AFFINITY');
    expect(result.confidenceScore).toBe(1); // 100 - 0 = 100 / 100 = 1
    expect(result.interpretationType).toBe('MODERN_INTERPRETATION');
    expect(result.matchReason).toContain('Kamis Pon');
  });

  it('is completely deterministic across multiple invocations', () => {
    const weton: WetonData = {
      id: 5,
      dayName: 'Senin',
      pasaran: 'Kliwon',
      neptu: 12,
      name: 'Senin Kliwon',
    };

    const res1 = matchCharacter(weton, mockCharacters, mockRules);
    const res2 = matchCharacter(weton, mockCharacters, mockRules);
    const res3 = matchCharacter(weton, mockCharacters, mockRules);

    expect(res1.character.id).toBe(res2.character.id);
    expect(res2.character.id).toBe(res3.character.id);
    expect(res1.confidenceScore).toBe(res2.confidenceScore);
  });

  it('throws an error if characters list is empty', () => {
    const weton: WetonData = {
      id: 1,
      dayName: 'Jumat',
      pasaran: 'Legi',
      neptu: 11,
      name: 'Jumat Legi',
    };

    expect(() => matchCharacter(weton, [], mockRules)).toThrow(
      /Daftar karakter tidak boleh kosong/
    );
  });
});

import { OracleCalculateSchema } from '@/server/validators/oracle.validators';

describe('Validator: OracleCalculateSchema - Birth Date Range Constraints', () => {
  it('accepts valid dates from year 1950 onwards', () => {
    const valid1950 = OracleCalculateSchema.safeParse({
      name: 'Eyang Kakung',
      birthDate: '1950-01-01',
    });
    expect(valid1950.success).toBe(true);

    const valid2015 = OracleCalculateSchema.safeParse({
      name: 'Adik Kecil',
      birthDate: '2015-02-20',
    });
    expect(valid2015.success).toBe(true);

    const valid2026 = OracleCalculateSchema.safeParse({
      name: 'Generasi Baru',
      birthDate: '2026-10-08',
    });
    expect(valid2026.success).toBe(true);
  });

  it('rejects years before 1950 to prevent invalid inputs', () => {
    const invalid1949 = OracleCalculateSchema.safeParse({
      name: 'Orang Iseng',
      birthDate: '1949-12-31',
    });
    expect(invalid1949.success).toBe(false);
    if (!invalid1949.success) {
      expect(invalid1949.error.issues[0].message).toContain('Tahun kelahiran minimal tahun 1950');
    }

    const invalidAncient = OracleCalculateSchema.safeParse({
      name: 'Orang Iseng',
      birthDate: '1800-01-01',
    });
    expect(invalidAncient.success).toBe(false);
  });
});

