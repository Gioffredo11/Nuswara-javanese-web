import { describe, it, expect } from 'vitest';
import {
  generateShareCode,
  isValidShareCode,
  UNAMBIGUOUS_CHARSET,
} from '@/server/domain/share/generateShareCode';

describe('Domain: Share - Cryptographic Unambiguous Code Generator', () => {
  it('generates codes with default length 8', () => {
    const code = generateShareCode();
    expect(code).toHaveLength(8);
    expect(isValidShareCode(code)).toBe(true);
  });

  it('generates codes with custom specified length >= 8', () => {
    const code10 = generateShareCode(10);
    const code16 = generateShareCode(16);
    expect(code10).toHaveLength(10);
    expect(code16).toHaveLength(16);
  });

  it('rejects requested length less than 8 for cryptographic safety', () => {
    expect(() => generateShareCode(7)).toThrow(/minimal 8 karakter/);
    expect(() => generateShareCode(4)).toThrow(/minimal 8 karakter/);
  });

  it('uses ONLY unambiguous characters and excludes confusing glyphs (0, O, o, 1, I, l)', () => {
    const excludedGlyphs = ['0', 'O', 'o', '1', 'I', 'l'];

    for (let i = 0; i < 500; i++) {
      const code = generateShareCode(12);
      for (const char of code) {
        expect(UNAMBIGUOUS_CHARSET).toContain(char);
        expect(excludedGlyphs).not.toContain(char);
      }
    }
  });

  it('has zero collisions across 10,000 uniquely generated codes', () => {
    const sampleSize = 10000;
    const generated = new Set<string>();

    for (let i = 0; i < sampleSize; i++) {
      generated.add(generateShareCode(8));
    }

    expect(generated.size).toBe(sampleSize);
  });

  it('validates share code format correctly with isValidShareCode', () => {
    expect(isValidShareCode('23456789')).toBe(true);
    expect(isValidShareCode('abcABC89')).toBe(true);

    // Invalid: contains ambiguous characters
    expect(isValidShareCode('01234567')).toBe(false); // contains 0, 1
    expect(isValidShareCode('ABCDEFO1')).toBe(false); // contains O, 1
    expect(isValidShareCode('abcdefgl')).toBe(false); // contains l

    // Invalid: too short
    expect(isValidShareCode('123')).toBe(false);
    expect(isValidShareCode('')).toBe(false);
  });
});
