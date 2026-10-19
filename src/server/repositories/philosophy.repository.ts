import { prisma } from '../db';
import { ContentStatus, Prisma } from '@prisma/client';
import {
  getFallbackPhilosophies,
  getFallbackPhilosophiesForManifestation,
} from '../domain/seedFallback';

export class PhilosophyRepository {
  async findAll(params: { category?: string; status?: ContentStatus } = {}) {
    const where: Prisma.PhilosophyWhereInput = {};
    if (params.category) where.category = params.category;
    if (params.status) where.status = params.status;

    try {
      const results = await prisma.philosophy.findMany({
        where,
        include: {
          primaryCharacter: {
            select: {
              id: true,
              slug: true,
              name: true,
              title: true,
            },
          },
        },
        orderBy: { id: 'asc' },
      });
      if (results && results.length > 0) {
        return results;
      }
    } catch {
      // Fallback to static seed data
    }

    const fallbacks = getFallbackPhilosophies();
    if (params.category) {
      return fallbacks.filter((p) => p.category === params.category) as any;
    }
    return fallbacks as any;
  }

  async findBySlug(slug: string) {
    try {
      const p = await prisma.philosophy.findUnique({
        where: { slug },
        include: {
          primaryCharacter: true,
          stories: {
            select: {
              id: true,
              slug: true,
              title: true,
              summary: true,
            },
          },
        },
      });
      if (p) return p;
    } catch {
      // Fallback to static seed data
    }

    const fallbacks = getFallbackPhilosophies();
    return (fallbacks.find((item) => item.slug === slug) as any) ?? null;
  }

  async getAllForManifestation() {
    try {
      const items = await prisma.philosophy.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          textJawa: true,
          meaning: true,
          modernInterpretation: true,
          category: true,
          primaryCharacterId: true,
          primaryCharacter: {
            select: {
              id: true,
              slug: true,
              name: true,
            },
          },
        },
        orderBy: { id: 'asc' },
      });
      if (items && items.length > 0) return items;
    } catch {
      // Fallback to static seed data
    }

    return getFallbackPhilosophiesForManifestation() as any;
  }

  async findDailyFeatured() {
    try {
      const featured = await prisma.philosophy.findFirst({
        where: { status: ContentStatus.REVIEWED },
        include: {
          primaryCharacter: true,
        },
        orderBy: { id: 'asc' },
      });
      if (featured) return featured;
    } catch {
      // Fallback
    }

    const fallbacks = getFallbackPhilosophies();
    return (fallbacks[0] as any) ?? null;
  }

  async create(data: Prisma.PhilosophyCreateInput) {
    return prisma.philosophy.create({ data });
  }

  async update(slug: string, data: Prisma.PhilosophyUpdateInput) {
    return prisma.philosophy.update({
      where: { slug },
      data,
    });
  }

  async delete(slug: string) {
    return prisma.philosophy.delete({
      where: { slug },
    });
  }
}

export const philosophyRepository = new PhilosophyRepository();
