import { calculateWeton } from '../domain/weton/calculate';
import { matchCharacter } from '../domain/oracle/matchCharacter';
import { wetonRepository } from '../repositories/weton.repository';
import { characterRepository } from '../repositories/character.repository';
import { storyRepository } from '../repositories/story.repository';
import { philosophyRepository } from '../repositories/philosophy.repository';
import { oracleRepository } from '../repositories/oracle.repository';
import { userRepository } from '../repositories/user.repository';
import { NotFoundError } from '../http/errors';
import {
  getFallbackWeton,
  getFallbackCharactersForOracle,
  getFallbackRules,
  getFallbackStoriesForCharacter,
  getFallbackPhilosophies,
} from '../domain/seedFallback';
import { OracleCalculateInputDTO, OracleResultDTO } from '@/types/dtos';
import { ContentStatus, Prisma } from '@prisma/client';

export class OracleService {
  async calculate(
    input: OracleCalculateInputDTO,
    guestToken?: string
  ): Promise<OracleResultDTO> {
    // 1. Pure domain Weton calculation
    const calc = calculateWeton({
      dateStr: input.birthDate,
      timeStr: input.birthTime,
      cutoff: input.cutoff,
    });

    // 2. Fetch weton traits & data from DB or seed fallback
    let dbWeton: any = null;
    let allCharacters: any[] = [];
    let allRules: any[] = [];

    try {
      dbWeton = await wetonRepository.findByDayAndPasaran(calc.dayName, calc.pasaran);
      if (dbWeton) {
        [allCharacters, allRules] = await Promise.all([
          characterRepository.getAllForOracle(),
          wetonRepository.getAllRules(),
        ]);
      }
    } catch (dbErr) {
      console.warn('[OracleService] DB query failed, using static seed fallback:', dbErr);
    }

    if (!dbWeton) {
      dbWeton = getFallbackWeton(calc.dayName, calc.pasaran);
      allCharacters = getFallbackCharactersForOracle();
      allRules = getFallbackRules();
    }

    if (!dbWeton) {
      throw new NotFoundError(
        `Data weton ${calc.dayName} ${calc.pasaran} belum tercatat di sistem.`
      );
    }

    if (!allCharacters || allCharacters.length === 0) {
      allCharacters = getFallbackCharactersForOracle();
    }
    if (!allRules || allRules.length === 0) {
      allRules = getFallbackRules();
    }

    // 4. Pure matching engine
    const match = matchCharacter(
      {
        id: dbWeton.id,
        name: dbWeton.name,
        dayName: dbWeton.dayName,
        pasaran: dbWeton.pasaran,
        neptu: dbWeton.neptu,
        auraTitle: dbWeton.auraTitle,
        summary: dbWeton.summary,
      },
      allCharacters,
      allRules
    );

    // 5. Fetch related story & philosophy for rich presentation
    let relatedStories: any[] = [];
    let relatedPhilosophies: any[] = [];

    try {
      [relatedStories, relatedPhilosophies] = await Promise.all([
        storyRepository.findByCharacterId(match.character.id),
        philosophyRepository.findAll({ status: ContentStatus.REVIEWED }),
      ]);
    } catch {
      relatedStories = getFallbackStoriesForCharacter(match.character.slug);
      relatedPhilosophies = getFallbackPhilosophies();
    }

    if (!relatedStories || relatedStories.length === 0) {
      relatedStories = getFallbackStoriesForCharacter(match.character.slug);
    }
    if (!relatedPhilosophies || relatedPhilosophies.length === 0) {
      relatedPhilosophies = getFallbackPhilosophies();
    }

    const primaryStory = relatedStories[0] || null;
    const primaryPhilo =
      relatedPhilosophies.find((p) => p.primaryCharacterId === match.character.id) ||
      relatedPhilosophies[0] ||
      null;

    // 6. Ensure user exists for guest session
    let userId = 1; // Fallback
    if (guestToken) {
      try {
        const user = await userRepository.getOrCreateGuest(guestToken);
        userId = user.id;
      } catch {
        userId = 1;
      }
    }

    // 7. Assemble result DTO
    const resultDto: OracleResultDTO = {
      name: input.name,
      birthDate: input.birthDate,
      effectiveDate: calc.effectiveDate,
      weton: {
        name: dbWeton.name,
        dayName: dbWeton.dayName,
        pasaran: dbWeton.pasaran,
        neptu: calc.neptu,
        auraTitle: dbWeton.auraTitle,
        summary: dbWeton.summary,
        traits: dbWeton.traits.map((t: any) => ({
          trait: t.trait,
          description: t.description,
          kind: t.kind,
        })),
      },
      characterMatch: {
        slug: match.character.slug,
        name: match.character.name,
        title: match.character.title ?? null,
        shortDescription: match.character.shortDescription,
        lineArtKey: match.character.lineArtKey ?? null,
        matchReason: match.matchReason,
        compatibilityAdvice: match.compatibilityAdvice,
        confidenceScore: match.confidenceScore,
      },
      relatedStory: primaryStory
        ? {
            slug: primaryStory.slug,
            title: primaryStory.title,
            summary: primaryStory.summary,
          }
        : null,
      relatedPhilosophy: primaryPhilo
        ? {
            slug: primaryPhilo.slug,
            title: primaryPhilo.title,
            textJawa: primaryPhilo.textJawa,
            meaning: primaryPhilo.meaning,
            modernInterpretation: primaryPhilo.modernInterpretation,
          }
        : null,
      ctaUrl: `/wayangpedia/${match.character.slug}`,
      interpretationType: 'MODERN_INTERPRETATION',
    };

    // 8. Persist Oracle Result asynchronously/safely
    try {
      const birthDateObj = new Date(`${input.birthDate}T12:00:00Z`);
      const saved = await oracleRepository.saveResult({
        userId,
        name: input.name,
        birthDate: birthDateObj,
        wetonId: dbWeton.id,
        characterId: match.character.id,
        resultJson: resultDto as unknown as Prisma.InputJsonValue,
      });
      resultDto.id = saved.id;
    } catch (saveErr) {
      console.warn('[OracleService] Could not persist oracle_results:', saveErr);
    }

    return resultDto;
  }
}

export const oracleService = new OracleService();
