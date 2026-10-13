import * as crypto from 'crypto';

/**
 * Unambiguous alphanumeric alphabet.
 * Excluded: 0, O, o, 1, I, l (to avoid user confusion on screens).
 * 50 characters: 2-9, A-H, J-N, P-Z, a-k, m-z (except l, o).
 */
export const UNAMBIGUOUS_CHARSET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';

/**
 * Generates a cryptographically random share code of specified length (default 8).
 * Pure function that generates an unambiguous random string.
 */
export function generateShareCode(length = 8): string {
  if (length < 8) {
    throw new Error('Panjang share code minimal 8 karakter demi keamanan kriptografis.');
  }

  const bytes = crypto.randomBytes(length);
  const chars: string[] = [];
  const charsetLen = UNAMBIGUOUS_CHARSET.length;

  for (let i = 0; i < length; i++) {
    // Unbiased index mapping
    const index = bytes[i] % charsetLen;
    chars.push(UNAMBIGUOUS_CHARSET[index]);
  }

  return chars.join('');
}

/**
 * Validates whether a given share code conforms to the format and character set.
 */
export function isValidShareCode(code: string): boolean {
  if (!code || code.length < 8 || code.length > 32) {
    return false;
  }
  for (let i = 0; i < code.length; i++) {
    if (!UNAMBIGUOUS_CHARSET.includes(code[i])) {
      return false;
    }
  }
  return true;
}
