import { z } from 'zod';

export const OracleCalculateSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Namamu tidak boleh kosong ya.')
      .max(60, 'Nama maksimal 60 karakter.'),
    birthDate: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Tanggal lahirmu belum valid. Coba cek lagi format YYYY-MM-DD ya.')
      .refine(
        (val) => {
          const year = parseInt(val.split('-')[0], 10);
          return !isNaN(year) && year >= 1950;
        },
        { message: 'Tahun kelahiran minimal tahun 1950 ya.' }
      ),
    birthTime: z
      .string()
      .trim()
      .regex(/^\d{2}:\d{2}$/, 'Format jam lahir harus HH:mm (contoh: 08:30 atau 19:45).')
      .optional(),
    cutoff: z.enum(['midnight', 'maghrib']).default('midnight'),
  })
  .strict();
