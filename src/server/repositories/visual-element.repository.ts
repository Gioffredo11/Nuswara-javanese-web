import { prisma } from '../db';
import { VisualElement, VisualElementKind, Prisma } from '@prisma/client';
import visualElementsSeed from '../../../prisma/seed-data/visual-elements.json';

function getFallbackVisualElements() {
  return (visualElementsSeed as any[]).map((v, idx) => ({
    id: idx + 1,
    slug: v.slug,
    kind: v.kind as VisualElementKind,
    name: v.name,
    meaning: v.meaning,
    characterId: idx + 1,
    character: {
      id: idx + 1,
      slug: v.characterSlug,
      name: v.characterSlug ? v.characterSlug.charAt(0).toUpperCase() + v.characterSlug.slice(1) : 'Tokoh',
      title: null,
    },
    source: v.source,
    status: v.status || 'REVIEWED',
  }));
}

export class VisualElementRepository {
  async findAll(params: { kind?: VisualElementKind; characterId?: number } = {}) {
    const where: Prisma.VisualElementWhereInput = {};
    if (params.kind) where.kind = params.kind;
    if (params.characterId) where.characterId = params.characterId;

    try {
      const items = await prisma.visualElement.findMany({
        where,
        include: {
          character: {
            select: {
              id: true,
              slug: true,
              name: true,
              title: true,
            },
          },
        },
        orderBy: [{ kind: 'asc' }, { id: 'asc' }],
      });
      if (items && items.length > 0) return items;
    } catch {
      // Fallback
    }

    let fallbacks = getFallbackVisualElements();
    if (params.kind) {
      fallbacks = fallbacks.filter((v) => v.kind === params.kind);
    }
    if (params.characterId) {
      fallbacks = fallbacks.filter((v) => v.characterId === params.characterId);
    }
    return fallbacks as any;
  }

  async findBySlug(slug: string): Promise<VisualElement | null> {
    try {
      const item = await prisma.visualElement.findUnique({
        where: { slug },
        include: {
          character: true,
        },
      });
      if (item) return item;
    } catch {
      // Fallback
    }

    const fallbacks = getFallbackVisualElements();
    return (fallbacks.find((v) => v.slug === slug) as any) ?? null;
  }

  async findByCharacterId(characterId: number): Promise<VisualElement[]> {
    try {
      const items = await prisma.visualElement.findMany({
        where: { characterId },
      });
      if (items && items.length > 0) return items;
    } catch {
      // Fallback
    }

    const fallbacks = getFallbackVisualElements();
    return fallbacks.filter((v) => v.characterId === characterId) as any;
  }
}

export const visualElementRepository = new VisualElementRepository();
