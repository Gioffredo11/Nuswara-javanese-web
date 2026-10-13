import { z } from 'zod';

export const WetonDateParamSchema = z
  .object({
    date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD'),
  })
  .strict();

export const WetonQuerySchema = z
  .object({
    time: z
      .string()
      .trim()
      .regex(/^\d{2}:\d{2}$/, 'Format jam harus HH:mm (contoh: 18:30)')
      .optional(),
    cutoff: z.enum(['midnight', 'maghrib']).default('midnight'),
  })
  .strict();
