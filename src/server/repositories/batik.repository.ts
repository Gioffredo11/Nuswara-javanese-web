import { prisma } from '../db';
import { ContentStatus, Prisma } from '@prisma/client';

export class BatikRepository {
  async findAll(params: { status?: ContentStatus } = {}) {
    const where: Prisma.BatikPatternWhereInput = {};
    if (params.status) where.status = params.status;

    return prisma.batikPattern.findMany({
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
  }

  async findBySlug(slug: string) {
    return prisma.batikPattern.findUnique({
      where: { slug },
      include: {
        relatedCharacters: {
          include: {
            character: true,
          },
        },
      },
    });
  }

  async findByCharacterId(characterId: number) {
    return prisma.batikPattern.findMany({
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
