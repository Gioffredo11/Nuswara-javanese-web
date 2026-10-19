import { prisma } from '../db';
import { getFallbackWeton, getFallbackRules } from '../domain/seedFallback';
import wetonSeed from '../../../prisma/seed-data/weton.json';

export class WetonRepository {
  async findByDayAndPasaran(dayName: string, pasaran: string) {
    try {
      const weton = await prisma.weton.findUnique({
        where: {
          dayName_pasaran: {
            dayName,
            pasaran,
          },
        },
        include: {
          traits: true,
          rules: {
            include: {
              character: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                  title: true,
                  shortDescription: true,
                  lineArtKey: true,
                },
              },
            },
          },
        },
      });
      if (weton) return weton;
    } catch {
      // Fallback
    }

    return getFallbackWeton(dayName, pasaran) as any;
  }

  async getAllRules() {
    try {
      const rules = await prisma.wetonCharacterRule.findMany({
        orderBy: { priority: 'desc' },
      });
      if (rules && rules.length > 0) return rules;
    } catch {
      // Fallback
    }

    return getFallbackRules() as any;
  }

  async findAllWithTraits() {
    try {
      const wetons = await prisma.weton.findMany({
        include: {
          traits: true,
          rules: {
            include: {
              character: true,
            },
          },
        },
        orderBy: { id: 'asc' },
      });
      if (wetons && wetons.length > 0) return wetons;
    } catch {
      // Fallback
    }

    return (wetonSeed as any[]).map((w, idx) => ({
      id: idx + 1,
      dayName: w.dayName,
      pasaran: w.pasaran,
      neptu: w.neptu,
      name: w.name,
      auraTitle: w.auraTitle,
      summary: w.summary,
      characterSlug: w.characterSlug,
      matchReason: w.matchReason,
      compatibilityAdvice: w.compatibilityAdvice,
      traits: (w.traits || []).map((t: any, tIdx: number) => ({
        id: tIdx + 1,
        wetonId: idx + 1,
        trait: t.trait,
        description: t.description,
        kind: t.kind,
      })),
      rules: [],
    })) as any;
  }
}

export const wetonRepository = new WetonRepository();
