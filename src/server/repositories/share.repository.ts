import { prisma } from '../db';
import { ShareType, Prisma } from '@prisma/client';

// In-memory store for fallback when database is offline
const memoryShareLinks = new Map<string, any>();
let nextShareId = 100;

export class ShareRepository {
  async findByCode(shortCode: string) {
    try {
      const link = await prisma.shareLink.findUnique({
        where: { shortCode },
        include: {
          photoAssets: true,
        },
      });
      if (link) return link;
    } catch {
      // Fallback
    }

    return memoryShareLinks.get(shortCode) || null;
  }

  async create(data: {
    shortCode: string;
    type: ShareType;
    referenceId?: string | null;
    snapshotData?: Prisma.InputJsonValue;
    expiresAt?: Date | null;
  }) {
    try {
      return await prisma.shareLink.create({
        data: {
          shortCode: data.shortCode,
          type: data.type,
          referenceId: data.referenceId || null,
          snapshotData: data.snapshotData || Prisma.JsonNull,
          expiresAt: data.expiresAt || null,
        },
      });
    } catch {
      // Fallback in-memory link
      const fallbackRecord = {
        id: ++nextShareId,
        shortCode: data.shortCode,
        type: data.type,
        referenceId: data.referenceId || null,
        snapshotData: data.snapshotData || null,
        expiresAt: data.expiresAt || null,
        createdAt: new Date(),
        updatedAt: new Date(),
        photoAssets: [],
      };
      memoryShareLinks.set(data.shortCode, fallbackRecord);
      return fallbackRecord as any;
    }
  }

  async createPhotoAsset(data: {
    shareLinkId: number;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    expiresAt: Date;
  }) {
    try {
      return await prisma.photoAsset.create({
        data: {
          shareLinkId: data.shareLinkId,
          storageKey: data.storageKey,
          mimeType: data.mimeType,
          sizeBytes: data.sizeBytes,
          expiresAt: data.expiresAt,
        },
      });
    } catch {
      return {
        id: Date.now(),
        shareLinkId: data.shareLinkId,
        storageKey: data.storageKey,
        mimeType: data.mimeType,
        sizeBytes: data.sizeBytes,
        expiresAt: data.expiresAt,
        createdAt: new Date(),
      } as any;
    }
  }
}

export const shareRepository = new ShareRepository();
