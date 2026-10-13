import { prisma } from '../db';
import { Prisma } from '@prisma/client';

export interface SaveOracleResultParams {
  userId: number;
  name: string;
  birthDate: Date;
  wetonId: number;
  characterId: number;
  resultJson: Prisma.InputJsonValue;
  shareLinkId?: number | null;
}

export class OracleRepository {
  async saveResult(data: SaveOracleResultParams) {
    return prisma.oracleResult.create({
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
  }

  async findById(id: number) {
    return prisma.oracleResult.findUnique({
      where: { id },
      include: {
        weton: { include: { traits: true } },
        character: true,
        user: true,
        shareLink: true,
      },
    });
  }
}

export const oracleRepository = new OracleRepository();
