import { z } from 'zod';
import { UNAMBIGUOUS_CHARSET } from '../domain/share/generateShareCode';

export const ShareCreateSchema = z
  .object({
    type: z.enum(['ORACLE', 'MANIFESTATION', 'PHOTO'], {
      message: 'Tipe share harus salah satu dari: ORACLE, MANIFESTATION, atau PHOTO',
    }),
    referenceId: z.string().trim().max(100).optional(),
    payload: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export const ShareCodeParamSchema = z
  .object({
    code: z
      .string()
      .trim()
      .min(8, 'Kode share minimal 8 karakter')
      .max(32, 'Kode share maksimal 32 karakter')
      .refine(
        (val) => val.split('').every((char) => UNAMBIGUOUS_CHARSET.includes(char)),
        'Kode share mengandung karakter yang tidak valid'
      ),
  })
  .strict();
