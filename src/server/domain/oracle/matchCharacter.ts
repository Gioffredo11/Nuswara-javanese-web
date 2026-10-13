/**
 * Pure, deterministic Character Matching Domain Engine.
 * Zero I/O, zero database queries. Rules and characters are passed in as data.
 */

export interface CharacterData {
  id: number;
  slug: string;
  name: string;
  javaneseName?: string | null;
  title?: string | null;
  shortDescription: string;
  personality?: unknown;
  uniqueFacts?: string | null;
  storySummary?: string | null;
  lineArtKey?: string | null;
  traitTags?: unknown;
  neptuAffinity?: number | null;
  kingdom?: string | null;
}

export interface WetonData {
  id: number;
  dayName: string;
  pasaran: string;
  neptu: number;
  name: string;
  auraTitle?: string | null;
  summary?: string | null;
}

export interface WetonCharacterRuleData {
  wetonId: number;
  characterId: number;
  matchReason: string;
  compatibilityAdvice: string;
  priority: number;
}

export interface CharacterMatchResult {
  character: CharacterData;
  matchReason: string;
  compatibilityAdvice: string;
  confidenceScore: number;
  matchMethod: 'EXPLICIT_RULE' | 'NEPTU_TRAIT_AFFINITY';
  interpretationType: 'MODERN_INTERPRETATION';
}

/**
 * Pure function: matches a weton with a character deterministically based on provided data rules.
 */
export function matchCharacter(
  weton: WetonData,
  characters: CharacterData[],
  rules: WetonCharacterRuleData[]
): CharacterMatchResult {
  if (!characters || characters.length === 0) {
    throw new Error('Daftar karakter tidak boleh kosong untuk pencocokan Oracle.');
  }

  // 1. Check explicit rules from weton_character_rules data
  const wetonRules = rules
    .filter((r) => r.wetonId === weton.id)
    .sort((a, b) => b.priority - a.priority);

  if (wetonRules.length > 0) {
    const topRule = wetonRules[0];
    const matchedChar = characters.find((c) => c.id === topRule.characterId);
    if (matchedChar) {
      return {
        character: matchedChar,
        matchReason: topRule.matchReason,
        compatibilityAdvice: topRule.compatibilityAdvice,
        confidenceScore: 0.95,
        matchMethod: 'EXPLICIT_RULE',
        interpretationType: 'MODERN_INTERPRETATION',
      };
    }
  }

  // 2. Fallback: deterministic affinity scoring based on neptu difference & stable sort
  const scored = characters.map((c) => {
    const affinity = c.neptuAffinity ?? 12;
    const diff = Math.abs(affinity - weton.neptu);
    const score = Math.max(10, 100 - diff * 15);
    return { character: c, score, diff };
  });

  // Sort by highest score (lowest diff), tie-break by character ID
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.character.id - b.character.id;
  });

  const best = scored[0];
  return {
    character: best.character,
    matchReason: `Aura weton ${weton.name} lu tuh beresonansi kuat banget sama karakter ${best.character.name}. Karismatik, tangguh, dan punya prinsip hidup yang gak gampang goyah!`,
    compatibilityAdvice: `Saran Oracle: Jaga fokus dan energi positifmu. Kurangi overthinking dan maksimalkan potensi terbaikmu!`,
    confidenceScore: Math.round(best.score) / 100,
    matchMethod: 'NEPTU_TRAIT_AFFINITY',
    interpretationType: 'MODERN_INTERPRETATION',
  };
}
