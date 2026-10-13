import { characterRepository, CharacterFindAllParams } from '../repositories/character.repository';
import { NotFoundError } from '../http/errors';
import { CharacterDetailDTO, CharacterSummaryDTO, FamilyTreeGraphDTO } from '@/types/dtos';
import {
  getFallbackFamilyTreeGraph,
  getFallbackCharactersWithCategories,
  getFallbackCharacterDetailBySlug,
} from '../domain/seedFallback';

export class CharacterService {
  async listCharacters(params: CharacterFindAllParams) {
    const result = await characterRepository.findAll(params);

    const mapped: CharacterSummaryDTO[] = result.characters.map((c: any) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      javaneseName: c.javaneseName,
      title: c.title,
      category: {
        id: c.category.id,
        slug: c.category.slug,
        name: c.category.name,
      },
      shortDescription: c.shortDescription,
      lineArtKey: c.lineArtKey,
      neptuAffinity: c.neptuAffinity,
      traitTags: Array.isArray(c.traitTags) ? (c.traitTags as string[]) : [],
    }));

    return {
      characters: mapped,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async getCharacterBySlug(slug: string): Promise<CharacterDetailDTO> {
    let c = null;
    try {
      c = await characterRepository.findBySlug(slug);
    } catch (err) {
      console.warn(`[CharacterService] DB findBySlug failed for '${slug}', falling back to seed:`, err);
    }

    if (!c) {
      const fallback = getFallbackCharacterDetailBySlug(slug);
      if (fallback) {
        return fallback;
      }
      throw new NotFoundError(`Tokoh wayang dengan slug '${slug}' tidak ditemukan.`);
    }

    // Combine relationships from both directions
    const relationships = [
      ...c.relationshipsFrom.map((r) => ({
        id: r.id,
        character: r.to,
        direction: 'FROM' as const,
        type: r.type,
        note: r.note,
      })),
      ...c.relationshipsTo.map((r) => ({
        id: r.id,
        character: r.from,
        direction: 'TO' as const,
        type: r.type,
        note: r.note,
      })),
    ];

    return {
      id: c.id,
      slug: c.slug,
      name: c.name,
      javaneseName: c.javaneseName,
      title: c.title,
      category: {
        id: c.category.id,
        slug: c.category.slug,
        name: c.category.name,
      },
      shortDescription: c.shortDescription,
      personality: Array.isArray(c.personality) ? (c.personality as string[]) : [],
      uniqueFacts: c.uniqueFacts,
      storySummary: c.storySummary,
      lineArtKey: c.lineArtKey,
      neptuAffinity: c.neptuAffinity,
      kingdom: c.kingdom,
      traitTags: Array.isArray(c.traitTags) ? (c.traitTags as string[]) : [],
      weapons: c.weapons.map((w) => ({
        id: w.weapon.id,
        slug: w.weapon.slug,
        name: w.weapon.name,
        description: w.weapon.description,
        power: w.weapon.power,
      })),
      philosophies: c.philosophies.map((p) => ({
        id: p.philosophy.id,
        slug: p.philosophy.slug,
        title: p.philosophy.title,
        textJawa: p.philosophy.textJawa,
        meaning: p.philosophy.meaning,
        modernInterpretation: p.philosophy.modernInterpretation,
      })),
      relationships,
      stories: c.stories.map((s) => ({
        id: s.story.id,
        slug: s.story.slug,
        title: s.story.title,
        role: s.role,
      })),
    };
  }

  async getFamilyTreeGraph(): Promise<FamilyTreeGraphDTO> {
    try {
      const graph = await characterRepository.getRelationshipsGraph();
      if (!graph.nodes || graph.nodes.length === 0) {
        return getFallbackFamilyTreeGraph();
      }
      return graph;
    } catch (dbErr) {
      console.warn('[CharacterService] DB query failed for family tree, using static seed fallback:', dbErr);
      return getFallbackFamilyTreeGraph();
    }
  }

  // Admin Methods
  async createCharacter(data: Parameters<typeof characterRepository.create>[0]) {
    return characterRepository.create(data);
  }

  async updateCharacter(slug: string, data: Parameters<typeof characterRepository.update>[1]) {
    const existing = await characterRepository.findBySlug(slug);
    if (!existing) {
      throw new NotFoundError(`Tokoh wayang '${slug}' tidak ditemukan untuk diperbarui.`);
    }
    return characterRepository.update(slug, data);
  }

  async deleteCharacter(slug: string) {
    const existing = await characterRepository.findBySlug(slug);
    if (!existing) {
      throw new NotFoundError(`Tokoh wayang '${slug}' tidak ditemukan untuk dihapus.`);
    }
    return characterRepository.delete(slug);
  }
}

export const characterService = new CharacterService();
