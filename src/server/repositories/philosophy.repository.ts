import { prisma } from '../db';
import { ContentStatus, Prisma } from '@prisma/client';

export class PhilosophyRepository {
  async findAll(params: { category?: string; status?: ContentStatus } = {}) {
    const where: Prisma.PhilosophyWhereInput = {};
    if (params.category) where.category = params.category;
    if (params.status) where.status = params.status;

    return prisma.philosophy.findMany({
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
  }

  async findBySlug(slug: string) {
    return prisma.philosophy.findUnique({
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
  }

  async getAllForManifestation() {
    return prisma.philosophy.findMany({
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
  }

  async findDailyFeatured() {
    // Featured philosophy for general view
    return prisma.philosophy.findFirst({
      where: { status: ContentStatus.REVIEWED },
      include: {
        primaryCharacter: true,
      },
      orderBy: { id: 'asc' },
    });
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
