import { prisma } from '../db';

export class PhotoboothRepository {
  async getActiveFrames() {
    return prisma.photoboothFrame.findMany({
      where: { isActive: true },
      orderBy: { id: 'asc' },
    });
  }

  async getActiveFilters() {
    return prisma.photoboothFilter.findMany({
      where: { isActive: true },
      orderBy: { id: 'asc' },
    });
  }

  async findFrameBySlug(slug: string) {
    return prisma.photoboothFrame.findUnique({
      where: { slug },
    });
  }

  async findFilterBySlug(slug: string) {
    return prisma.photoboothFilter.findUnique({
      where: { slug },
    });
  }
}

export const photoboothRepository = new PhotoboothRepository();
