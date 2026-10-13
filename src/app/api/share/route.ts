import { NextRequest } from 'next/server';
import { shareService } from '@/server/services/share.service';
import { ShareCreateSchema } from '@/server/validators/share.validators';
import { successResponse, errorResponse } from '@/server/http/response';
import { enforceRateLimit } from '@/server/http/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    await enforceRateLimit(`share:create:${ip}`, 20, 60 * 1000);

    // 2. Validate Body
    const rawBody = await request.json().catch(() => ({}));
    const validated = ShareCreateSchema.parse(rawBody);

    // 3. Service Call
    const result = await shareService.createShareLink(validated);

    return successResponse(result, undefined, 201);
  } catch (err) {
    return errorResponse(err);
  }
}
