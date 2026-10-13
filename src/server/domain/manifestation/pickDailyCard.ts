/**
 * Pure, deterministic Daily Manifestation card picker.
 * Resets at midnight Asia/Jakarta (WIB), NOT rolling 24 hours.
 * Uses a stable 32-bit FNV-1a hash to deterministically pick a card for (userId, localDate).
 */

export interface PhilosophyCard {
  id: number;
  slug: string;
  title: string;
  textJawa: string;
  meaning: string; // Konteks budaya
  modernInterpretation: string; // Interpretasi modern
  category: string;
  primaryCharacterId?: number | null;
  primaryCharacter?: {
    id: number;
    slug: string;
    name: string;
  } | null;
}

/**
 * Returns current date formatted as YYYY-MM-DD in Asia/Jakarta (WIB) timezone.
 */
export function getWibDateString(now = new Date()): string {
  // Asia/Jakarta is UTC+7
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const wibMs = utcMs + 7 * 3600000;
  const wibDate = new Date(wibMs);

  const year = wibDate.getFullYear();
  const month = String(wibDate.getMonth() + 1).padStart(2, '0');
  const day = String(wibDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Fast 32-bit FNV-1a deterministic hash.
 */
export function stableHash(input: string): number {
  let hash = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash;
}

/**
 * Pure function: picks a daily card deterministically for a user on a given WIB date.
 */
export function pickDailyCard(
  userId: number | string,
  localDate: string,
  cards: PhilosophyCard[]
): PhilosophyCard {
  if (!cards || cards.length === 0) {
    throw new Error('Daftar kartu filosofi tidak boleh kosong.');
  }

  const seed = `manifestation:${userId}:${localDate}`;
  const hashVal = stableHash(seed);
  const selectedIndex = hashVal % cards.length;

  return cards[selectedIndex];
}
