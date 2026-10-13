import { prisma } from '../db';

export class ManifestationRepository {
  async findByUserAndDate(userId: number, localDate: string) {
    return prisma.dailyManifestation.findUnique({
      where: {
        userId_localDate: {
          userId,
          localDate,
        },
      },
      include: {
        philosophy: {
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
        },
        characters: {
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
    });
  }

  /**
   * Saves daily manifestation. Handled with race condition catch in caller service.
   */
  async create(data: { userId: number; localDate: string; philosophyId: number }) {
    return prisma.dailyManifestation.create({
      data: {
        userId: data.userId,
        localDate: data.localDate,
        philosophyId: data.philosophyId,
      },
      include: {
        philosophy: {
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
        },
        characters: {
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
    });
  }
}

export const manifestationRepository = new ManifestationRepository();
