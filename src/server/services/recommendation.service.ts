import { characterRepository } from '../repositories/character.repository';
import { NotFoundError } from '../http/errors';

export interface CharacterRecommendationResult {
  targetCharacter: {
    id: number;
    slug: string;
    name: string;
  };
  recommendedCharacters: Array<{
    id: number;
    slug: string;
    name: string;
    title: string | null;
    lineArtKey: string | null;
    score: number;
    connectionType: string;
  }>;
  relatedStories: Array<{
    id: number;
    slug: string;
    title: string;
    summary: string;
  }>;
  relatedWeapons: Array<{
    id: number;
    slug: string;
    name: string;
    description: string;
  }>;
  relatedPhilosophies: Array<{
    id: number;
    slug: string;
    title: string;
    meaning: string;
  }>;
}

export class RecommendationService {
  /**
   * Deterministic recommendation engine based on relational proximity and category affinities.
   * Scoring weights:
   * - Kinship / Family direct relation (PARENT, SIBLING, SPOUSE): 50 pts
   * - Alliance / Rivalry direct relation (ALLY, RIVAL, TEACHER): 40 pts
   * - Same category / faction: 20 pts
   */
  async getRecommendations(slug: string, limit = 5): Promise<CharacterRecommendationResult> {
    const target = await characterRepository.findBySlug(slug);
    if (!target) {
      throw new NotFoundError(`Tokoh wayang '${slug}' tidak ditemukan.`);
    }

    const allCharacters = await characterRepository.findAll({ limit: 50 });
    interface ScoredCharacterRef {
      id: number;
      slug: string;
      name: string;
      title: string | null;
      lineArtKey: string | null;
    }
    const scoredMap = new Map<number, { score: number; connectionType: string; character: ScoredCharacterRef }>();

    // 1. Direct Relations (From)
    for (const rel of target.relationshipsFrom) {
      const weight = ['PARENT', 'SIBLING', 'SPOUSE'].includes(rel.type) ? 50 : 40;
      scoredMap.set(rel.to.id, {
        score: weight,
        connectionType: `Relasi Langsung: ${rel.type}`,
        character: rel.to,
      });
    }

    // 2. Direct Relations (To)
    for (const rel of target.relationshipsTo) {
      const weight = ['PARENT', 'SIBLING', 'SPOUSE'].includes(rel.type) ? 50 : 40;
      scoredMap.set(rel.from.id, {
        score: weight,
        connectionType: `Relasi Langsung: ${rel.type}`,
        character: rel.from,
      });
    }

    // 3. Category Members
    for (const c of allCharacters.characters) {
      if (c.id === target.id) continue;
      if (c.category.id === target.categoryId && !scoredMap.has(c.id)) {
        scoredMap.set(c.id, {
          score: 20,
          connectionType: `Kelompok Seirama: ${target.category.name}`,
          character: c,
        });
      }
    }

    // Sort by score desc, tie-break by character id
    const ranked = Array.from(scoredMap.values())
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.character.id - b.character.id;
      })
      .slice(0, limit);

    return {
      targetCharacter: {
        id: target.id,
        slug: target.slug,
        name: target.name,
      },
      recommendedCharacters: ranked.map((r) => ({
        id: r.character.id,
        slug: r.character.slug,
        name: r.character.name,
        title: r.character.title || null,
        lineArtKey: r.character.lineArtKey || null,
        score: r.score,
        connectionType: r.connectionType,
      })),
      relatedStories: target.stories.map((s) => ({
        id: s.story.id,
        slug: s.story.slug,
        title: s.story.title,
        summary: s.story.summary,
      })),
      relatedWeapons: target.weapons.map((w) => ({
        id: w.weapon.id,
        slug: w.weapon.slug,
        name: w.weapon.name,
        description: w.weapon.description,
      })),
      relatedPhilosophies: target.philosophies.map((p) => ({
        id: p.philosophy.id,
        slug: p.philosophy.slug,
        title: p.philosophy.title,
        meaning: p.philosophy.meaning,
      })),
    };
  }
}

export const recommendationService = new RecommendationService();
