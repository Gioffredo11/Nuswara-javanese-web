import { getWibDateString, pickDailyCard } from '../domain/manifestation/pickDailyCard';
import { manifestationRepository } from '../repositories/manifestation.repository';
import { philosophyRepository } from '../repositories/philosophy.repository';
import {
  getFallbackPhilosophiesForManifestation,
  getFallbackManifestation,
  saveFallbackManifestation,
} from '../domain/seedFallback';
import { DailyManifestationDTO } from '@/types/dtos';
import { NotFoundError } from '../http/errors';

export class ManifestationService {
  async getToday(userId: number, customDate?: string): Promise<DailyManifestationDTO> {
    const localDate = customDate || getWibDateString();
    let existing = null;

    try {
      existing = await manifestationRepository.findByUserAndDate(userId, localDate);
    } catch (dbErr) {
      console.warn('[ManifestationService] DB findByUserAndDate error, checking fallback cache:', dbErr);
    }

    if (!existing) {
      const cached = getFallbackManifestation(userId, localDate);
      if (cached) {
        return cached;
      }
      throw new NotFoundError(
        'Kamu belum menarik kartu manifestasi hari ini. Tekan tombol Ambil Kartu Hari Ini ya!'
      );
    }

    return {
      id: existing.id,
      localDate: existing.localDate,
      philosophy: {
        id: existing.philosophy.id,
        slug: existing.philosophy.slug,
        title: existing.philosophy.title,
        textJawa: existing.philosophy.textJawa,
        meaning: existing.philosophy.meaning, // Konteks budaya
        modernInterpretation: existing.philosophy.modernInterpretation, // Interpretasi modern
        category: existing.philosophy.category,
      },
      relatedCharacters: this.extractRelatedCharacters(existing.characters, existing.philosophy),
      isFirstDrawToday: false,
    };
  }

  private extractRelatedCharacters(characters: any[], philosophy: any) {
    if (characters && characters.length > 0) {
      return characters.map((c: any) => ({
        id: c.character?.id || c.id,
        slug: c.character?.slug || c.slug,
        name: c.character?.name || c.name,
        title: c.character?.title || c.title || 'Peneladan Nilai',
      }));
    }
    if (philosophy?.primaryCharacter) {
      return [
        {
          id: philosophy.primaryCharacter.id,
          slug: philosophy.primaryCharacter.slug,
          name: philosophy.primaryCharacter.name,
          title: philosophy.primaryCharacter.title || 'Peneladan Nilai',
        },
      ];
    }
    return [];
  }

  /**
   * Idempotent daily card draw.
   * If record for (userId, localDate) exists, returns existing card.
   * If not, picks card deterministically and creates record.
   * Handles concurrency race conditions by catching unique constraint error (P2002) and re-reading.
   */
  async draw(userId: number, customDate?: string): Promise<DailyManifestationDTO> {
    const localDate = customDate || getWibDateString();

    // 1. Check existing record from DB or Fallback Cache
    try {
      const existing = await manifestationRepository.findByUserAndDate(userId, localDate);
      if (existing) {
        return {
          id: existing.id,
          localDate: existing.localDate,
          philosophy: {
            id: existing.philosophy.id,
            slug: existing.philosophy.slug,
            title: existing.philosophy.title,
            textJawa: existing.philosophy.textJawa,
            meaning: existing.philosophy.meaning,
            modernInterpretation: existing.philosophy.modernInterpretation,
            category: existing.philosophy.category,
          },
          relatedCharacters: this.extractRelatedCharacters(existing.characters, existing.philosophy),
          isFirstDrawToday: false,
        };
      }
    } catch (dbErr) {
      console.warn('[ManifestationService] DB findByUserAndDate error, checking fallback cache:', dbErr);
    }

    const cached = getFallbackManifestation(userId, localDate);
    if (cached) {
      return { ...cached, isFirstDrawToday: false };
    }

    // 2. Load all available philosophies for manifestation
    let cards: any[] = [];
    try {
      cards = await philosophyRepository.getAllForManifestation();
    } catch (dbErr) {
      console.warn('[ManifestationService] DB getAllForManifestation error, using fallback seed data:', dbErr);
    }

    if (!cards || cards.length === 0) {
      cards = getFallbackPhilosophiesForManifestation();
    }

    if (cards.length === 0) {
      throw new NotFoundError('Belum ada kartu filosofi yang terdaftar di database.');
    }

    // 3. Pure deterministic selection
    const pickedCard = pickDailyCard(userId, localDate, cards);

    // 4. Save to DB with race-condition catch or fallback to memory
    try {
      const created = await manifestationRepository.create({
        userId,
        localDate,
        philosophyId: pickedCard.id,
      });

      return {
        id: created.id,
        localDate: created.localDate,
        philosophy: {
          id: created.philosophy.id,
          slug: created.philosophy.slug,
          title: created.philosophy.title,
          textJawa: created.philosophy.textJawa,
          meaning: created.philosophy.meaning,
          modernInterpretation: created.philosophy.modernInterpretation,
          category: created.philosophy.category,
        },
        relatedCharacters: this.extractRelatedCharacters(created.characters, created.philosophy),
        isFirstDrawToday: true,
      };
    } catch (err: unknown) {
      // Prisma P2002: Unique constraint failed on (userId, localDate)
      const isUniqueError =
        typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === 'P2002';
      if (isUniqueError) {
        try {
          const reRead = await manifestationRepository.findByUserAndDate(userId, localDate);
          if (reRead) {
            return {
              id: reRead.id,
              localDate: reRead.localDate,
              philosophy: {
                id: reRead.philosophy.id,
                slug: reRead.philosophy.slug,
                title: reRead.philosophy.title,
                textJawa: reRead.philosophy.textJawa,
                meaning: reRead.philosophy.meaning,
                modernInterpretation: reRead.philosophy.modernInterpretation,
                category: reRead.philosophy.category,
              },
              relatedCharacters: this.extractRelatedCharacters(reRead.characters, reRead.philosophy),
              isFirstDrawToday: false,
            };
          }
        } catch {
          // ignore and proceed to fallback
        }
      }

      console.warn('[ManifestationService] DB persist failed, using in-memory manifestation result:', err);
      const fallbackResult: DailyManifestationDTO = {
        id: Math.abs(pickedCard.id * 1000 + userId) || 1,
        localDate,
        philosophy: {
          id: pickedCard.id,
          slug: pickedCard.slug,
          title: pickedCard.title,
          textJawa: pickedCard.textJawa,
          meaning: pickedCard.meaning,
          modernInterpretation: pickedCard.modernInterpretation,
          category: pickedCard.category,
        },
        relatedCharacters: pickedCard.primaryCharacter
          ? [
              {
                id: pickedCard.primaryCharacter.id || 1,
                slug: pickedCard.primaryCharacter.slug,
                name: pickedCard.primaryCharacter.name,
                title: 'Peneladan Nilai',
              },
            ]
          : [],
        isFirstDrawToday: true,
      };

      saveFallbackManifestation(userId, localDate, fallbackResult);
      return fallbackResult;
    }
  }
}

export const manifestationService = new ManifestationService();
