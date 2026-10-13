import { photoboothRepository } from '../repositories/photobooth.repository';
import { PhotoboothFrameDTO, PhotoboothFilterDTO } from '@/types/dtos';

export class PhotoboothService {
  async getFrames(): Promise<PhotoboothFrameDTO[]> {
    const frames = await photoboothRepository.getActiveFrames();
    return frames.map((f) => ({
      id: f.id,
      slug: f.slug,
      name: f.name,
      assetKey: f.assetKey,
      config: f.config,
      isActive: f.isActive,
    }));
  }

  async getFilters(): Promise<PhotoboothFilterDTO[]> {
    const filters = await photoboothRepository.getActiveFilters();
    return filters.map((fl) => ({
      id: fl.id,
      slug: fl.slug,
      name: fl.name,
      assetKey: fl.assetKey,
      config: fl.config,
      isActive: fl.isActive,
    }));
  }
}

export const photoboothService = new PhotoboothService();
