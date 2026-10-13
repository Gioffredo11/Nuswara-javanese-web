import { generateShareCode } from '../domain/share/generateShareCode';
import { shareRepository } from '../repositories/share.repository';
import { NotFoundError, BadRequestError, UnprocessableEntityError } from '../http/errors';
import { ShareCreateDTO, ShareResultDTO } from '@/types/dtos';
import { ShareType, Prisma } from '@prisma/client';

export class ShareService {
  async createShareLink(dto: ShareCreateDTO): Promise<ShareResultDTO> {
    const ttlDays = parseInt(process.env.SHARE_TTL_DAYS || '30', 10);
    const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

    // Collision retry loop
    let attempts = 0;
    while (attempts < 5) {
      attempts++;
      const code = generateShareCode(8);

      try {
        const link = await shareRepository.create({
          shortCode: code,
          type: dto.type,
          referenceId: dto.referenceId || null,
          snapshotData: dto.payload ? (dto.payload as unknown as Prisma.InputJsonValue) : undefined,
          expiresAt,
        });

        const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';
        return {
          shortCode: link.shortCode,
          shareUrl: `${baseUrl}/share/${link.shortCode}`,
          type: link.type,
          referenceId: link.referenceId,
          snapshotData: link.snapshotData,
          createdAt: link.createdAt,
          expiresAt: link.expiresAt,
        };
      } catch (err: unknown) {
        const isCollision =
          typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === 'P2002';
        if (isCollision && attempts < 5) {
          continue; // Retry with fresh random code on rare collision
        }
        throw err;
      }
    }

    throw new BadRequestError('Gagal membuat tautan share unik. Coba sesaat lagi.');
  }

  async getShareByCode(code: string): Promise<ShareResultDTO> {
    const link = await shareRepository.findByCode(code);
    if (!link) {
      throw new NotFoundError(`Tautan dengan kode '${code}' tidak ditemukan.`);
    }

    // Check expiration
    if (link.expiresAt && link.expiresAt.getTime() < Date.now()) {
      throw new NotFoundError('Tautan ini sudah kedaluwarsa dan tidak dapat diakses lagi.');
    }

    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';
    return {
      shortCode: link.shortCode,
      shareUrl: `${baseUrl}/share/${link.shortCode}`,
      type: link.type,
      referenceId: link.referenceId,
      snapshotData: link.snapshotData,
      createdAt: link.createdAt,
      expiresAt: link.expiresAt,
    };
  }

  async createPhotoShare(data: {
    mimeType: string;
    sizeBytes: number;
    buffer: Buffer;
  }) {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimes.includes(data.mimeType)) {
      throw new UnprocessableEntityError(
        'Format gambar tidak didukung. Harap unggah format JPG, PNG, atau WEBP.'
      );
    }

    const maxBytes = parseInt(process.env.UPLOAD_MAX_BYTES || '5242880', 10); // 5MB default
    if (data.sizeBytes > maxBytes) {
      throw new UnprocessableEntityError(
        `Ukuran berkas terlalu besar (${Math.round(data.sizeBytes / 1024)} KB). Maksimal ${Math.round(
          maxBytes / (1024 * 1024)
        )} MB.`
      );
    }

    const ttlDays = parseInt(process.env.SHARE_TTL_DAYS || '7', 10);
    const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

    const shareCode = generateShareCode(10);
    const storageKey = `photos/${shareCode}-${Date.now()}.${data.mimeType.split('/')[1]}`;

    const link = await shareRepository.create({
      shortCode: shareCode,
      type: ShareType.PHOTO,
      referenceId: storageKey,
      snapshotData: { mimeType: data.mimeType, sizeBytes: data.sizeBytes },
      expiresAt,
    });

    const photoAsset = await shareRepository.createPhotoAsset({
      shareLinkId: link.id,
      storageKey,
      mimeType: data.mimeType,
      sizeBytes: data.sizeBytes,
      expiresAt,
    });

    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';
    return {
      shortCode: link.shortCode,
      shareUrl: `${baseUrl}/share/${link.shortCode}`,
      photoAssetId: photoAsset.id,
      storageKey: photoAsset.storageKey,
      expiresAt: photoAsset.expiresAt,
    };
  }
}

export const shareService = new ShareService();
