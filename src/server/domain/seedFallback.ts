import wetonSeed from '../../../prisma/seed-data/weton.json';
import charactersSeed from '../../../prisma/seed-data/characters.json';
import philosophiesSeed from '../../../prisma/seed-data/philosophies.json';
import storiesSeed from '../../../prisma/seed-data/stories.json';
import relationshipsSeed from '../../../prisma/seed-data/relationships.json';
import weaponsSeed from '../../../prisma/seed-data/weapons.json';
import characterWeaponsSeed from '../../../prisma/seed-data/character-weapons.json';
import { CharacterDetailDTO, DailyManifestationDTO, FamilyTreeGraphDTO } from '@/types/dtos';
import { RelationshipType } from '@prisma/client';

export interface FallbackWetonTrait {
  id: number;
  wetonId: number;
  trait: string;
  description: string;
  kind: 'STRENGTH' | 'CHALLENGE' | 'ELEMENT';
}

export interface FallbackWeton {
  id: number;
  dayName: string;
  pasaran: string;
  neptu: number;
  name: string;
  auraTitle: string;
  summary: string;
  characterSlug: string;
  matchReason: string;
  compatibilityAdvice: string;
  traits: FallbackWetonTrait[];
  rules: any[];
}

export function getFallbackWeton(dayName: string, pasaran: string): FallbackWeton | null {
  const normalizedDay = dayName.trim().toLowerCase();
  const normalizedPasaran = pasaran.trim().toLowerCase();

  const idx = wetonSeed.findIndex(
    (w) =>
      w.dayName.toLowerCase() === normalizedDay &&
      w.pasaran.toLowerCase() === normalizedPasaran
  );

  if (idx === -1) return null;
  const raw = wetonSeed[idx];

  return {
    id: idx + 1,
    dayName: raw.dayName,
    pasaran: raw.pasaran,
    neptu: raw.neptu,
    name: raw.name,
    auraTitle: raw.auraTitle,
    summary: raw.summary,
    characterSlug: raw.characterSlug,
    matchReason: raw.matchReason,
    compatibilityAdvice: raw.compatibilityAdvice,
    traits: raw.traits.map((t, tIdx) => ({
      id: tIdx + 1,
      wetonId: idx + 1,
      trait: t.trait,
      description: t.description,
      kind: t.kind as 'STRENGTH' | 'CHALLENGE' | 'ELEMENT',
    })),
    rules: [],
  };
}

export function getFallbackCharactersForOracle() {
  return charactersSeed.map((c, idx) => ({
    id: idx + 1,
    slug: c.slug,
    name: c.name,
    javaneseName: c.javaneseName ?? null,
    title: c.title ?? null,
    shortDescription: c.shortDescription,
    personality: c.personality,
    uniqueFacts: c.uniqueFacts ?? null,
    storySummary: c.storySummary ?? null,
    lineArtKey: c.lineArtKey ?? null,
    traitTags: c.traitTags,
    neptuAffinity: c.neptuAffinity ?? null,
    kingdom: c.kingdom ?? null,
  }));
}

export function getFallbackCharactersWithCategories() {
  const catLookup: Record<string, { id: number; slug: string; name: string }> = {
    pandawa: { id: 1, slug: 'pandawa', name: 'Pandawa Lima' },
    kurawa: { id: 2, slug: 'kurawa', name: 'Wangsa Kurawa' },
    punokawan: { id: 3, slug: 'punokawan', name: 'Punokawan' },
    'kesatria-dewa': { id: 4, slug: 'kesatria-dewa', name: 'Kesatria & Pahlawan' },
    ksatria: { id: 4, slug: 'kesatria-dewa', name: 'Kesatria & Pahlawan' },
  };

  return charactersSeed.map((c, idx) => ({
    id: idx + 1,
    slug: c.slug,
    name: c.name,
    javaneseName: c.javaneseName ?? null,
    title: c.title ?? null,
    shortDescription: c.shortDescription,
    personality: c.personality,
    uniqueFacts: c.uniqueFacts ?? null,
    storySummary: c.storySummary ?? null,
    lineArtKey: c.lineArtKey ?? null,
    traitTags: c.traitTags,
    neptuAffinity: c.neptuAffinity ?? null,
    kingdom: c.kingdom ?? null,
    category: catLookup[c.categorySlug] || { id: 4, slug: c.categorySlug, name: 'Kesatria & Pahlawan' },
  }));
}

export function getFallbackRules() {
  return wetonSeed.map((w, wIdx) => {
    const charIdx = charactersSeed.findIndex((c) => c.slug === w.characterSlug);
    return {
      wetonId: wIdx + 1,
      characterId: charIdx >= 0 ? charIdx + 1 : 1,
      matchReason: w.matchReason,
      compatibilityAdvice: w.compatibilityAdvice,
      priority: 10,
    };
  });
}

export function getFallbackStoriesForCharacter(characterSlug: string) {
  const matched = storiesSeed.filter((s) =>
    s.characters.some((sc) => sc.characterSlug === characterSlug)
  );

  if (matched.length > 0) {
    return matched.map((s, idx) => ({
      id: idx + 1,
      slug: s.slug,
      title: s.title,
      summary: s.summary,
    }));
  }

  // Fallback to first story
  return storiesSeed.slice(0, 1).map((s, idx) => ({
    id: idx + 1,
    slug: s.slug,
    title: s.title,
    summary: s.summary,
  }));
}

export function getFallbackPhilosophies() {
  const characters = getFallbackCharactersForOracle();
  return philosophiesSeed.map((p, idx) => {
    const matchedChar = characters.find((c) => c.slug === p.primaryCharacterSlug);
    return {
      id: idx + 1,
      slug: p.slug,
      title: p.title,
      textJawa: p.textJawa,
      meaning: p.meaning,
      modernInterpretation: p.modernInterpretation,
      category: p.category,
      primaryCharacterId: matchedChar ? matchedChar.id : null,
      primaryCharacter: matchedChar
        ? {
            id: matchedChar.id,
            slug: matchedChar.slug,
            name: matchedChar.name,
            title: matchedChar.title,
          }
        : null,
    };
  });
}

export function getFallbackPhilosophiesForManifestation() {
  const characters = getFallbackCharactersForOracle();
  return philosophiesSeed.map((p, idx) => {
    const matchedChar = characters.find((c) => c.slug === p.primaryCharacterSlug);
    return {
      id: idx + 1,
      slug: p.slug,
      title: p.title,
      textJawa: p.textJawa,
      meaning: p.meaning,
      modernInterpretation: p.modernInterpretation,
      category: p.category,
      primaryCharacterId: matchedChar ? matchedChar.id : null,
      primaryCharacter: matchedChar
        ? {
            id: matchedChar.id,
            slug: matchedChar.slug,
            name: matchedChar.name,
          }
        : null,
    };
  });
}

// In-memory cache for daily manifestations when database is unavailable
const memoryManifestationStore = new Map<string, DailyManifestationDTO>();

export function getFallbackManifestation(userId: number, localDate: string): DailyManifestationDTO | null {
  const key = `${userId}:${localDate}`;
  return memoryManifestationStore.get(key) || null;
}

export function saveFallbackManifestation(
  userId: number,
  localDate: string,
  data: DailyManifestationDTO
): void {
  const key = `${userId}:${localDate}`;
  memoryManifestationStore.set(key, data);
}

export function getFallbackFamilyTreeGraph(): FamilyTreeGraphDTO {
  const catLookup: Record<string, string> = {
    pandawa: 'Pandawa Lima',
    kurawa: 'Wangsa Kurawa',
    punokawan: 'Punokawan',
    'kesatria-dewa': 'Kesatria & Pahlawan',
    ksatria: 'Kesatria & Pahlawan',
  };

  const sortedChars = [...charactersSeed].sort((a, b) => {
    if (a.generationLevel !== b.generationLevel) {
      return a.generationLevel - b.generationLevel;
    }
    return (a.order ?? 0) - (b.order ?? 0);
  });

  const charMap = new Map<string, { id: number; name: string }>();
  const nodes = sortedChars.map((c, idx) => {
    const id = idx + 1;
    charMap.set(c.slug, { id, name: c.name });
    return {
      id,
      slug: c.slug,
      name: c.name,
      javaneseName: c.javaneseName ?? null,
      title: c.title ?? null,
      shortDescription: c.shortDescription ?? null,
      category: catLookup[c.categorySlug] || 'Tokoh Wayang',
      categorySlug: c.categorySlug,
      generationLevel: c.generationLevel,
      kingdom: c.kingdom ?? null,
      lineArtKey: c.lineArtKey ?? null,
    };
  });

  const edges = relationshipsSeed.map((r, idx) => {
    const from = charMap.get(r.fromSlug);
    const to = charMap.get(r.toSlug);
    return {
      id: idx + 1,
      fromId: from?.id ?? 0,
      toId: to?.id ?? 0,
      fromSlug: r.fromSlug,
      toSlug: r.toSlug,
      fromName: from?.name ?? r.fromSlug,
      toName: to?.name ?? r.toSlug,
      type: r.type as RelationshipType,
      note: r.note ?? null,
    };
  });

  return {
    nodes,
    edges,
    links: edges,
  };
}

export function getFallbackCharacterDetailBySlug(slug: string): CharacterDetailDTO | null {
  const charactersWithCat = getFallbackCharactersWithCategories();
  const c = charactersWithCat.find((ch) => ch.slug === slug);
  if (!c) return null;

  const weaponSlugs = characterWeaponsSeed
    .filter((cw) => cw.characterSlug === slug)
    .map((cw) => cw.weaponSlug);

  const weapons = weaponsSeed
    .filter((w) => weaponSlugs.includes(w.slug))
    .map((w, idx) => ({
      id: idx + 1,
      slug: w.slug,
      name: w.name,
      description: w.description,
      power: (w as any).power ?? null,
    }));

  const philosophies = philosophiesSeed
    .filter((p) => p.primaryCharacterSlug === slug)
    .map((p, idx) => ({
      id: idx + 1,
      slug: p.slug,
      title: p.title,
      textJawa: p.textJawa,
      meaning: p.meaning,
      modernInterpretation: p.modernInterpretation,
    }));

  const relationships = relationshipsSeed
    .filter((r) => r.fromSlug === slug || r.toSlug === slug)
    .map((r, idx) => {
      const isFrom = r.fromSlug === slug;
      const targetSlug = isFrom ? r.toSlug : r.fromSlug;
      const targetChar = charactersWithCat.find((ch) => ch.slug === targetSlug);
      return {
        id: idx + 1,
        character: {
          id: targetChar?.id ?? 0,
          slug: targetSlug,
          name: targetChar?.name ?? targetSlug,
        },
        direction: (isFrom ? 'FROM' : 'TO') as 'FROM' | 'TO',
        type: r.type as RelationshipType,
        note: r.note ?? null,
      };
    });

  const stories = storiesSeed
    .filter((s) => s.characters.some((sc) => sc.characterSlug === slug))
    .map((s, idx) => {
      const charRole = s.characters.find((sc) => sc.characterSlug === slug)?.role || 'Tokoh Wayang';
      return {
        id: idx + 1,
        slug: s.slug,
        title: s.title,
        role: charRole,
      };
    });

  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    javaneseName: c.javaneseName,
    title: c.title,
    category: c.category,
    shortDescription: c.shortDescription,
    personality: c.personality,
    uniqueFacts: c.uniqueFacts,
    storySummary: c.storySummary,
    lineArtKey: c.lineArtKey,
    neptuAffinity: c.neptuAffinity,
    kingdom: c.kingdom,
    traitTags: c.traitTags,
    weapons,
    philosophies,
    relationships,
    stories,
  };
}

