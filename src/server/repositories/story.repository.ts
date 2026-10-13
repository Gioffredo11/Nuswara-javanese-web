import { prisma } from '../db';
import { ContentStatus, Prisma } from '@prisma/client';
import storiesSeed from '../../../prisma/seed-data/stories.json';

function getFallbackAllStories() {
  return (storiesSeed as any[]).map((s, idx) => ({
    id: idx + 1,
    slug: s.slug,
    title: s.title,
    summary: s.summary,
    theme: s.theme || 'Kepahlawanan',
    source: s.source || null,
    status: s.status || ContentStatus.REVIEWED,
    philosophy: s.philosophySlug ? { id: idx + 1, slug: s.philosophySlug, title: s.philosophySlug } : null,
    characters: (s.characters || []).map((sc: any, cIdx: number) => ({
      id: cIdx + 1,
      role: sc.role || 'PROTAGONIST',
      character: {
        id: cIdx + 1,
        slug: sc.characterSlug,
        name: sc.characterSlug.charAt(0).toUpperCase() + sc.characterSlug.slice(1),
        title: null,
        lineArtKey: `lineart-${sc.characterSlug}`,
      },
    })),
    chapters: (s.chapters || []).map((ch: any, chIdx: number) => ({
      id: chIdx + 1,
      order: ch.order,
      chapterNumber: ch.order,
      title: ch.title,
      subtitle: ch.subtitle || null,
      summary: ch.summary || null,
      estimatedReadSeconds: ch.estimatedReadSeconds || 120,
      scenes: (ch.scenes || []).map((sc: any, scIdx: number) => ({
        id: scIdx + 1,
        order: sc.order,
        sceneNumber: sc.order,
        narration: sc.narration,
        speakerName: sc.speakerName || null,
        culturalNote: sc.culturalNote || null,
      })),
    })),
    _count: {
      chapters: (s.chapters || []).length,
    },
  }));
}

function getFallbackStoryBySlug(slug: string) {
  const s = (storiesSeed as any[]).find((item) => item.slug === slug);
  if (!s) return null;
  return {
    id: 1,
    slug: s.slug,
    title: s.title,
    summary: s.summary,
    theme: s.theme || 'Kepahlawanan',
    source: s.source || null,
    status: s.status || ContentStatus.REVIEWED,
    philosophy: s.philosophySlug ? { id: 1, slug: s.philosophySlug, title: s.philosophySlug } : null,
    characters: (s.characters || []).map((sc: any, idx: number) => ({
      id: idx + 1,
      role: sc.role || 'PROTAGONIST',
      character: {
        id: idx + 1,
        slug: sc.characterSlug,
        name: sc.characterSlug.charAt(0).toUpperCase() + sc.characterSlug.slice(1),
        title: null,
        lineArtKey: `lineart-${sc.characterSlug}`,
      },
    })),
    chapters: (s.chapters || []).map((ch: any, chIdx: number) => ({
      id: chIdx + 1,
      order: ch.order,
      chapterNumber: ch.order,
      title: ch.title,
      subtitle: ch.subtitle || null,
      summary: ch.summary || null,
      estimatedReadSeconds: ch.estimatedReadSeconds || 120,
      scenes: (ch.scenes || []).map((sc: any, scIdx: number) => ({
        id: scIdx + 1,
        order: sc.order,
        sceneNumber: sc.order,
        narration: sc.narration,
        speakerName: sc.speakerName || null,
        culturalNote: sc.culturalNote || null,
      })),
    })),
  };
}

export class StoryRepository {
  async findAll(params: { status?: ContentStatus } = {}) {
    const where: Prisma.StoryWhereInput = {};
    if (params.status) where.status = params.status;

    try {
      const stories = await prisma.story.findMany({
        where,
        include: {
          philosophy: {
            select: {
              id: true,
              slug: true,
              title: true,
            },
          },
          characters: {
            include: {
              character: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                  lineArtKey: true,
                },
              },
            },
          },
          chapters: {
            orderBy: { order: 'asc' },
            include: {
              scenes: {
                orderBy: { order: 'asc' },
              },
            },
          },
          _count: {
            select: { chapters: true },
          },
        },
        orderBy: { id: 'asc' },
      });

      if (stories && stories.length > 0) {
        return stories;
      }
    } catch (err) {
      console.warn('[StoryRepository] DB findAll failed, using static seed fallback:', err);
    }

    return getFallbackAllStories();
  }

  async findBySlug(slug: string) {
    try {
      const story = await prisma.story.findUnique({
        where: { slug },
        include: {
          philosophy: true,
          characters: {
            include: {
              character: {
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
          chapters: {
            orderBy: { order: 'asc' },
            include: {
              scenes: {
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      });

      if (story) return story;
    } catch (err) {
      console.warn(`[StoryRepository] DB findBySlug failed for '${slug}', using static seed fallback:`, err);
    }

    return getFallbackStoryBySlug(slug);
  }

  async findByCharacterId(characterId: number) {
    try {
      return await prisma.story.findMany({
        where: {
          characters: {
            some: { characterId },
          },
        },
        select: {
          id: true,
          slug: true,
          title: true,
          summary: true,
          coverKey: true,
        },
      });
    } catch (err) {
      console.warn(`[StoryRepository] DB findByCharacterId failed for ${characterId}:`, err);
      return [];
    }
  }

  async create(data: Prisma.StoryUncheckedCreateInput) {
    return prisma.story.create({ data });
  }

  async update(slug: string, data: Prisma.StoryUncheckedUpdateInput) {
    return prisma.story.update({
      where: { slug },
      data,
    });
  }

  async delete(slug: string) {
    return prisma.story.delete({
      where: { slug },
    });
  }
}

export const storyRepository = new StoryRepository();
