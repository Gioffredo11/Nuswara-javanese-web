import { prisma } from '../db';
import { Prisma } from '@prisma/client';
import { getFallbackWeton, getFallbackCharactersForOracle } from '../domain/seedFallback';

export interface SaveOracleResultParams {
  userId: number;
  name: string;
  birthDate: Date;
  wetonId: number;
  characterId: number;
  resultJson: Prisma.InputJsonValue;
  shareLinkId?: number | null;
}

const memoryOracleResults = new Map<number, any>();
let nextOracleId = 5000;

export class OracleRepository {
  async saveResult(data: SaveOracleResultParams) {
    try {
      return await prisma.oracleResult.create({
        data: {
          userId: data.userId,
          name: data.name,
          birthDate: data.birthDate,
          wetonId: data.wetonId,
          characterId: data.characterId,
          resultJson: data.resultJson,
          shareLinkId: data.shareLinkId || null,
        },
      });
    } catch {
      // Fallback
      const record = {
        id: ++nextOracleId,
        userId: data.userId,
        name: data.name,
        birthDate: data.birthDate,
        wetonId: data.wetonId,
        characterId: data.characterId,
        resultJson: data.resultJson,
        shareLinkId: data.shareLinkId || null,
        createdAt: new Date(),
      };
      memoryOracleResults.set(record.id, record);
      return record as any;
    }
  }

  async findById(id: number) {
    try {
      const result = await prisma.oracleResult.findUnique({
        where: { id },
        include: {
          weton: { include: { traits: true } },
          character: true,
          user: true,
          shareLink: true,
        },
      });
      if (result) return result;
    } catch {
      // Fallback
    }

    const mem = memoryOracleResults.get(id);
    if (!mem) return null;

    const weton = getFallbackWeton('Jumat', 'Wage');
    const chars = getFallbackCharactersForOracle();
    const character = chars.find((c) => c.id === mem.characterId) || chars[0];

    return {
      ...mem,
      weton,
      character,
      user: { id: mem.userId, email: null, role: 'USER' },
      shareLink: null,
    };
  }
}

export const oracleRepository = new OracleRepository();
