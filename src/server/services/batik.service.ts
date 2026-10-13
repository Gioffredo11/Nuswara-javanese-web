import { batikRepository } from '../repositories/batik.repository';
import { NotFoundError } from '../http/errors';
import { ContentStatus } from '@prisma/client';

export class BatikService {
  async listBatikPatterns(status?: ContentStatus) {
    return batikRepository.findAll({ status });
  }

  async getBatikBySlug(slug: string) {
    const batik = await batikRepository.findBySlug(slug);
    if (!batik) {
      throw new NotFoundError(`Motif batik '${slug}' tidak ditemukan.`);
    }
    return batik;
  }

  async createBatik(data: Parameters<typeof batikRepository.create>[0]) {
    return batikRepository.create(data);
  }

  async updateBatik(slug: string, data: Parameters<typeof batikRepository.update>[1]) {
    const existing = await batikRepository.findBySlug(slug);
    if (!existing) {
      throw new NotFoundError(`Motif batik '${slug}' tidak ditemukan untuk diperbarui.`);
    }
    return batikRepository.update(slug, data);
  }

  async deleteBatik(slug: string) {
    const existing = await batikRepository.findBySlug(slug);
    if (!existing) {
      throw new NotFoundError(`Motif batik '${slug}' tidak ditemukan untuk dihapus.`);
    }
    return batikRepository.delete(slug);
  }
}

export const batikService = new BatikService();
