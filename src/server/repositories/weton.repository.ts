import { prisma } from '../db';

export class WetonRepository {
  async findByDayAndPasaran(dayName: string, pasaran: string) {
    return prisma.weton.findUnique({
      where: {
        dayName_pasaran: {
          dayName,
          pasaran,
        },
      },
      include: {
        traits: true,
        rules: {
          include: {
            character: {
              select: {
                id: true,
                slug: true,
                name: true,
                title: true,
                shortDescription: true,
                lineArtKey: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllRules() {
    return prisma.wetonCharacterRule.findMany({
      orderBy: { priority: 'desc' },
    });
  }

  async findAllWithTraits() {
    return prisma.weton.findMany({
      include: {
        traits: true,
        rules: {
          include: {
            character: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });
  }
}

export const wetonRepository = new WetonRepository();
