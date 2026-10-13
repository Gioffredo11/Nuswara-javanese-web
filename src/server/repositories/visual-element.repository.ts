import { prisma } from '../db';
import { VisualElement, VisualElementKind, Prisma } from '@prisma/client';

export class VisualElementRepository {
  async findAll(params: { kind?: VisualElementKind; characterId?: number } = {}) {
    const where: Prisma.VisualElementWhereInput = {};
    if (params.kind) where.kind = params.kind;
    if (params.characterId) where.characterId = params.characterId;

    return prisma.visualElement.findMany({
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
  }

  async findBySlug(slug: string): Promise<VisualElement | null> {
    return prisma.visualElement.findUnique({
      where: { slug },
      include: {
        character: true,
      },
    });
  }

  async findByCharacterId(characterId: number): Promise<VisualElement[]> {
    return prisma.visualElement.findMany({
      where: { characterId },
    });
  }
}

export const visualElementRepository = new VisualElementRepository();
