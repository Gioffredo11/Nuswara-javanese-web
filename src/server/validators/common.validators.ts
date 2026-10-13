import { z } from 'zod';

export const SlugParamSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(1, 'Slug tidak boleh kosong')
      .max(100, 'Slug terlalu panjang')
      .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)'),
  })
  .strict();

export const PaginationQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    q: z.string().trim().max(100).optional(),
    category: z.string().trim().max(50).optional(),
  })
  .strict();
