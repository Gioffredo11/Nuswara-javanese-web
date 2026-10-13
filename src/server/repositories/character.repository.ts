import { prisma } from '../db';
import { Character, ContentStatus, Prisma } from '@prisma/client';
import { getFallbackCharactersWithCategories } from '../domain/seedFallback';

export interface CharacterFindAllParams {
  q?: string;
  category?: string;
  status?: ContentStatus;
  page?: number;
  limit?: number;
}

export class CharacterRepository {
  async findAll(params: CharacterFindAllParams = {}) {
    const { q, category, status, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.CharacterWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (q) {
      where.OR = [
        { name: { contains: q } },
        { javaneseName: { contains: q } },
        { shortDescription: { contains: q } },
        { uniqueFacts: { contains: q } },
      ];
    }

    try {
      const [characters, total] = await Promise.all([
        prisma.character.findMany({
          where,
          skip,
          take: limit,
          orderBy: [{ order: 'asc' }, { id: 'asc' }],
          include: {
            category: {
              select: {
                id: true,
                slug: true,
                name: true,
              },
            },
          },
        }),
        prisma.character.count({ where }),
      ]);

      if (characters && characters.length > 0) {
        return {
          characters,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        };
      }
    } catch (err) {
      console.warn('[CharacterRepository] DB findAll failed, falling back to seed data:', err);
    }

    // Fallback to static seed data
    const allFallback = getFallbackCharactersWithCategories();
    let filtered = allFallback;

    if (category) {
      filtered = filtered.filter(
        (c) =>
          c.category.slug === category ||
          (category === 'ksatria' && (c.category.slug === 'kesatria-dewa' || c.category.slug === 'ksatria'))
      );
    }

    if (q) {
      const queryLower = q.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(queryLower) ||
          (c.javaneseName && c.javaneseName.toLowerCase().includes(queryLower)) ||
          c.shortDescription.toLowerCase().includes(queryLower)
      );
    }

    const paged = filtered.slice(skip, skip + limit);

    return {
      characters: paged as any,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  }

  async findBySlug(slug: string) {
    return prisma.character.findUnique({
      where: { slug },
      include: {
        category: true,
        weapons: {
          include: {
            weapon: true,
          },
        },
        philosophies: {
          include: {
            philosophy: true,
          },
        },
        relationshipsFrom: {
          include: {
            to: {
              select: {
                id: true,
                slug: true,
                name: true,
                title: true,
                lineArtKey: true,
              },
            },
          },
        },
        relationshipsTo: {
          include: {
            from: {
              select: {
                id: true,
                slug: true,
                name: true,
                title: true,
                lineArtKey: true,
              },
            },
          },
        },
        stories: {
          include: {
            story: {
              select: {
                id: true,
                slug: true,
                title: true,
                summary: true,
                coverKey: true,
              },
            },
          },
        },
        visualElements: true,
      },
    });
  }

  async findById(id: number): Promise<Character | null> {
    return prisma.character.findUnique({
      where: { id },
    });
  }

  async getAllForOracle() {
    return prisma.character.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        javaneseName: true,
        title: true,
        shortDescription: true,
        personality: true,
        uniqueFacts: true,
        storySummary: true,
        lineArtKey: true,
        traitTags: true,
        neptuAffinity: true,
        kingdom: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  async getRelationshipsGraph() {
    const [characters, relationships] = await Promise.all([
      prisma.character.findMany({
        select: {
          id: true,
          slug: true,
          name: true,
          javaneseName: true,
          title: true,
          shortDescription: true,
          category: { select: { slug: true, name: true } },
          generationLevel: true,
          kingdom: true,
          lineArtKey: true,
        },
        orderBy: [{ generationLevel: 'asc' }, { order: 'asc' }],
      }),
      prisma.characterRelationship.findMany({
        include: {
          from: { select: { id: true, slug: true, name: true } },
          to: { select: { id: true, slug: true, name: true } },
        },
      }),
    ]);

    const edges = relationships.map((r) => ({
      id: r.id,
      fromId: r.fromId,
      toId: r.toId,
      fromSlug: r.from.slug,
      toSlug: r.to.slug,
      fromName: r.from.name,
      toName: r.to.name,
      type: r.type,
      note: r.note,
    }));

    return {
      nodes: characters.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        javaneseName: c.javaneseName,
        title: c.title,
        shortDescription: c.shortDescription,
        category: c.category.name,
        categorySlug: c.category.slug,
        generationLevel: c.generationLevel,
        kingdom: c.kingdom,
        lineArtKey: c.lineArtKey,
      })),
      edges,
      links: edges, // Backward compatibility alias
    };
  }

  async create(data: Prisma.CharacterUncheckedCreateInput) {
    return prisma.character.create({ data });
  }

  async update(slug: string, data: Prisma.CharacterUncheckedUpdateInput) {
    return prisma.character.update({
      where: { slug },
      data,
    });
  }

  async delete(slug: string) {
    return prisma.character.delete({
      where: { slug },
    });
  }
}

export const characterRepository = new CharacterRepository();
