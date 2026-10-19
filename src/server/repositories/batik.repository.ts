import { prisma } from '../db';
import { ContentStatus, Prisma } from '@prisma/client';
import batikSeed from '../../../prisma/seed-data/batik.json';

function getFallbackBatikList() {
  return (batikSeed as any[]).map((b, idx) => ({
    id: idx + 1,
    slug: b.slug,
    name: b.name,
    originRegion: b.originRegion,
    shortHistory: b.shortHistory,
    philosophy: b.philosophy,
    usage: b.usage,
    vectorKey: b.vectorKey,
    colorPalette: b.colorPalette,
    source: b.source,
    status: b.status || ContentStatus.REVIEWED,
    relatedCharacters: (b.relatedCharacterSlugs || []).map((cSlug: string, cIdx: number) => ({
      id: cIdx + 1,
      character: {
        id: cIdx + 1,
        slug: cSlug,
        name: cSlug.charAt(0).toUpperCase() + cSlug.slice(1),
        title: null,
      },
    })),
  }));
}

export class BatikRepository {
  async findAll(params: { status?: ContentStatus } = {}) {
    const where: Prisma.BatikPatternWhereInput = {};
    if (params.status) where.status = params.status;

    try {
      const items = await prisma.batikPattern.findMany({
        where,
        include: {
          relatedCharacters: {
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
          },
        },
        orderBy: { id: 'asc' },
      });
      if (items && items.length > 0) return items;
    } catch {
      // Fallback
    }

    const fallbacks = getFallbackBatikList();
    if (params.status) {
      return fallbacks.filter((b) => b.status === params.status) as any;
    }
    return fallbacks as any;
  }

  async findBySlug(slug: string) {
    try {
      const item = await prisma.batikPattern.findUnique({
        where: { slug },
        include: {
          relatedCharacters: {
            include: {
              character: true,
            },
          },
        },
      });
      if (item) return item;
    } catch {
      // Fallback
    }

    const fallbacks = getFallbackBatikList();
    return (fallbacks.find((b) => b.slug === slug) as any) ?? null;
  }

  async findByCharacterId(characterId: number) {
    try {
      const items = await prisma.batikPattern.findMany({
        where: {
          relatedCharacters: {
            some: { characterId },
          },
        },
        select: {
          id: true,
          slug: true,
          name: true,
          philosophy: true,
          vectorKey: true,
        },
      });
      if (items && items.length > 0) return items;
    } catch {
      // Fallback
    }

    const fallbacks = getFallbackBatikList();
    return fallbacks.slice(0, 2).map((b) => ({
      id: b.id,
      slug: b.slug,
      name: b.name,
      philosophy: b.philosophy,
      vectorKey: b.vectorKey,
    })) as any;
  }

  async create(data: Prisma.BatikPatternCreateInput) {
    return prisma.batikPattern.create({ data });
  }

  async update(slug: string, data: Prisma.BatikPatternUpdateInput) {
    return prisma.batikPattern.update({
      where: { slug },
      data,
    });
  }

  async delete(slug: string) {
    return prisma.batikPattern.delete({
      where: { slug },
    });
  }
}

export const batikRepository = new BatikRepository();
