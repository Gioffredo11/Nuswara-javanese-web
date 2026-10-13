import { calculateWeton, CalculateWetonOptions } from '../domain/weton/calculate';
import { wetonRepository } from '../repositories/weton.repository';
import { NotFoundError } from '../http/errors';

export class WetonService {
  async getWetonDetail(options: CalculateWetonOptions) {
    // 1. Pure domain calculation
    const calc = calculateWeton(options);

    // 2. Fetch traits and rules from repository
    const dbWeton = await wetonRepository.findByDayAndPasaran(calc.dayName, calc.pasaran);
    if (!dbWeton) {
      throw new NotFoundError(
        `Data weton untuk ${calc.dayName} ${calc.pasaran} belum tercatat di database.`
      );
    }

    return {
      inputDate: calc.inputDate,
      effectiveDate: calc.effectiveDate,
      shiftedByMaghrib: calc.shiftedByMaghrib,
      weton: {
        id: dbWeton.id,
        name: dbWeton.name,
        dayName: dbWeton.dayName,
        pasaran: dbWeton.pasaran,
        neptu: calc.neptu,
        auraTitle: dbWeton.auraTitle,
        summary: dbWeton.summary,
        traits: dbWeton.traits.map((t) => ({
          id: t.id,
          trait: t.trait,
          description: t.description,
          kind: t.kind,
        })),
        matchedCharacters: dbWeton.rules.map((r) => ({
          character: r.character,
          matchReason: r.matchReason,
          compatibilityAdvice: r.compatibilityAdvice,
        })),
      },
    };
  }
}

export const wetonService = new WetonService();
