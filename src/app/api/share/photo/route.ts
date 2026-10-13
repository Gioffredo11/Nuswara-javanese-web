import { NextRequest } from 'next/server';
import { shareService } from '@/server/services/share.service';
import { successResponse, errorResponse } from '@/server/http/response';
import { enforceRateLimit } from '@/server/http/rate-limiter';
import { UnprocessableEntityError } from '@/server/http/errors';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    await enforceRateLimit(`share:photo:${ip}`, 10, 60 * 1000);

    // 2. Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      throw new UnprocessableEntityError('Berkas foto tidak ditemukan dalam form data (field: file).');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type;
    const sizeBytes = buffer.length;

    // 3. Service Call (validates allowed MIME image/jpeg|png|webp, max bytes, creates share + photo asset)
    const result = await shareService.createPhotoShare({
      buffer,
      mimeType,
      sizeBytes,
    });

    return successResponse(result, undefined, 201);
  } catch (err) {
    return errorResponse(err);
  }
}
