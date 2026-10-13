import { z } from 'zod';

export const AdminCharacterCreateSchema = z
  .object({
    slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/),
    name: z.string().trim().min(2).max(100),
    javaneseName: z.string().trim().max(100).optional(),
    title: z.string().trim().max(150).optional(),
    categoryId: z.number().int().positive(),
    shortDescription: z.string().trim().min(10),
    personality: z.array(z.string().trim()).optional(),
    uniqueFacts: z.string().trim().optional(),
    storySummary: z.string().trim().optional(),
    lineArtKey: z.string().trim().optional(),
    traitTags: z.array(z.string().trim()).optional(),
    neptuAffinity: z.number().int().min(7).max(18).optional(),
    kingdom: z.string().trim().max(100).optional(),
    source: z.string().trim().optional(),
    status: z.enum(['DRAFT', 'REVIEWED']).default('DRAFT'),
    variantNote: z.string().trim().optional(),
  })
  .strict();

export const AdminCharacterUpdateSchema = AdminCharacterCreateSchema.partial();

export const AdminPhilosophyCreateSchema = z
  .object({
    slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/),
    title: z.string().trim().min(2).max(150),
    textJawa: z.string().trim().min(5),
    meaning: z.string().trim().min(10),
    modernInterpretation: z.string().trim().min(10),
    primaryCharacterId: z.number().int().positive().nullable().optional(),
    category: z.string().trim().default('KEARIFAN'),
    source: z.string().trim().optional(),
    status: z.enum(['DRAFT', 'REVIEWED']).default('DRAFT'),
    variantNote: z.string().trim().optional(),
  })
  .strict();

export const AdminPhilosophyUpdateSchema = AdminPhilosophyCreateSchema.partial();

export const AdminStoryCreateSchema = z
  .object({
    slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/),
    title: z.string().trim().min(2).max(150),
    summary: z.string().trim().min(10),
    coverKey: z.string().trim().optional(),
    philosophyId: z.number().int().positive().nullable().optional(),
    theme: z.string().trim().default('Kepahlawanan'),
    source: z.string().trim().optional(),
    status: z.enum(['DRAFT', 'REVIEWED']).default('DRAFT'),
    variantNote: z.string().trim().optional(),
  })
  .strict();

export const AdminStoryUpdateSchema = AdminStoryCreateSchema.partial();

export const AdminBatikCreateSchema = z
  .object({
    slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/),
    name: z.string().trim().min(2).max(100),
    originRegion: z.string().trim().default('Jawa Tengah'),
    shortHistory: z.string().trim().min(10),
    philosophy: z.string().trim().min(10),
    usage: z.string().trim().min(5),
    vectorKey: z.string().trim().optional(),
    colorPalette: z.array(z.string().trim()).optional(),
    source: z.string().trim().optional(),
    status: z.enum(['DRAFT', 'REVIEWED']).default('DRAFT'),
    variantNote: z.string().trim().optional(),
  })
  .strict();

export const AdminBatikUpdateSchema = AdminBatikCreateSchema.partial();
