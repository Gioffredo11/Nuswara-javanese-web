import { philosophyRepository } from '../repositories/philosophy.repository';
import { NotFoundError } from '../http/errors';
import { ContentStatus } from '@prisma/client';

export class PhilosophyService {
  async listPhilosophies(category?: string, status?: ContentStatus) {
    return philosophyRepository.findAll({ category, status });
  }

  async getPhilosophyBySlug(slug: string) {
    const philosophy = await philosophyRepository.findBySlug(slug);
    if (!philosophy) {
      throw new NotFoundError(`Filosofi Jawa '${slug}' tidak ditemukan.`);
    }
    return philosophy;
  }

  async getDailyFeatured() {
    const featured = await philosophyRepository.findDailyFeatured();
    if (!featured) {
      throw new NotFoundError('Belum ada filosofi harian yang tersedia.');
    }
    return featured;
  }

  async createPhilosophy(data: Parameters<typeof philosophyRepository.create>[0]) {
    return philosophyRepository.create(data);
  }

  async updatePhilosophy(slug: string, data: Parameters<typeof philosophyRepository.update>[1]) {
    const existing = await philosophyRepository.findBySlug(slug);
    if (!existing) {
      throw new NotFoundError(`Filosofi '${slug}' tidak ditemukan untuk diperbarui.`);
    }
    return philosophyRepository.update(slug, data);
  }

  async deletePhilosophy(slug: string) {
    const existing = await philosophyRepository.findBySlug(slug);
    if (!existing) {
      throw new NotFoundError(`Filosofi '${slug}' tidak ditemukan untuk dihapus.`);
    }
    return philosophyRepository.delete(slug);
  }
}

export const philosophyService = new PhilosophyService();
