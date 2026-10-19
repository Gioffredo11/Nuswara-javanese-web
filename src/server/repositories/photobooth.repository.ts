import { prisma } from '../db';
import photoboothSeed from '../../../prisma/seed-data/photobooth.json';

export class PhotoboothRepository {
  async getActiveFrames() {
    try {
      const frames = await prisma.photoboothFrame.findMany({
        where: { isActive: true },
        orderBy: { id: 'asc' },
      });
      if (frames && frames.length > 0) return frames;
    } catch {
      // Fallback
    }

    return (photoboothSeed.frames as any[]).map((f, idx) => ({
      id: idx + 1,
      ...f,
    }));
  }

  async getActiveFilters() {
    try {
      const filters = await prisma.photoboothFilter.findMany({
        where: { isActive: true },
        orderBy: { id: 'asc' },
      });
      if (filters && filters.length > 0) return filters;
    } catch {
      // Fallback
    }

    return (photoboothSeed.filters as any[]).map((f, idx) => ({
      id: idx + 1,
      ...f,
    }));
  }

  async findFrameBySlug(slug: string) {
    try {
      const frame = await prisma.photoboothFrame.findUnique({
        where: { slug },
      });
      if (frame) return frame;
    } catch {
      // Fallback
    }

    const found = photoboothSeed.frames.find((f) => f.slug === slug);
    return found ? ({ id: 1, ...found } as any) : null;
  }

  async findFilterBySlug(slug: string) {
    try {
      const filter = await prisma.photoboothFilter.findUnique({
        where: { slug },
      });
      if (filter) return filter;
    } catch {
      // Fallback
    }

    const found = photoboothSeed.filters.find((f) => f.slug === slug);
    return found ? ({ id: 1, ...found } as any) : null;
  }
}

export const photoboothRepository = new PhotoboothRepository();
