import { z } from 'zod';

export const CharacterQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
    q: z.string().trim().max(100).optional(),
    category: z.string().trim().max(50).optional(),
    status: z.enum(['DRAFT', 'REVIEWED']).optional(),
  })
  .strict();

export const CharacterRecommendationQuerySchema = z
  .object({
    limit: z.coerce.number().int().min(1).max(20).default(5),
  })
  .strict();
