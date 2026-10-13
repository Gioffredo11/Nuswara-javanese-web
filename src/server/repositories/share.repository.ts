import { prisma } from '../db';
import { ShareType, Prisma } from '@prisma/client';

export class ShareRepository {
  async findByCode(shortCode: string) {
    return prisma.shareLink.findUnique({
      where: { shortCode },
      include: {
        photoAssets: true,
      },
    });
  }

  async create(data: {
    shortCode: string;
    type: ShareType;
    referenceId?: string | null;
    snapshotData?: Prisma.InputJsonValue;
    expiresAt?: Date | null;
  }) {
    return prisma.shareLink.create({
      data: {
        shortCode: data.shortCode,
        type: data.type,
        referenceId: data.referenceId || null,
        snapshotData: data.snapshotData || Prisma.JsonNull,
        expiresAt: data.expiresAt || null,
      },
    });
  }

  async createPhotoAsset(data: {
    shareLinkId: number;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    expiresAt: Date;
  }) {
    return prisma.photoAsset.create({
      data: {
        shareLinkId: data.shareLinkId,
        storageKey: data.storageKey,
        mimeType: data.mimeType,
        sizeBytes: data.sizeBytes,
        expiresAt: data.expiresAt,
      },
    });
  }
}

export const shareRepository = new ShareRepository();
