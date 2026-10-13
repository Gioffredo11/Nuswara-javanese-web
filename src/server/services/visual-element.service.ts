import { visualElementRepository } from '../repositories/visual-element.repository';
import { VisualElementKind } from '@prisma/client';

export class VisualElementService {
  async listVisualElements(kind?: VisualElementKind) {
    return visualElementRepository.findAll({ kind });
  }
}

export const visualElementService = new VisualElementService();
