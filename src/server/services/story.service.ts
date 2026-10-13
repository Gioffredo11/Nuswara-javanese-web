import { storyRepository } from '../repositories/story.repository';
import { NotFoundError } from '../http/errors';
import { ContentStatus } from '@prisma/client';

export class StoryService {
  async listStories(status?: ContentStatus) {
    return storyRepository.findAll({ status });
  }

  async getStoryBySlug(slug: string) {
    const story = await storyRepository.findBySlug(slug);
    if (!story) {
      throw new NotFoundError(`Cerita lakon '${slug}' tidak ditemukan.`);
    }
    return story;
  }

  async createStory(data: Parameters<typeof storyRepository.create>[0]) {
    return storyRepository.create(data);
  }

  async updateStory(slug: string, data: Parameters<typeof storyRepository.update>[1]) {
    const existing = await storyRepository.findBySlug(slug);
    if (!existing) {
      throw new NotFoundError(`Cerita lakon '${slug}' tidak ditemukan untuk diperbarui.`);
    }
    return storyRepository.update(slug, data);
  }

  async deleteStory(slug: string) {
    const existing = await storyRepository.findBySlug(slug);
    if (!existing) {
      throw new NotFoundError(`Cerita lakon '${slug}' tidak ditemukan untuk dihapus.`);
    }
    return storyRepository.delete(slug);
  }
}

export const storyService = new StoryService();
