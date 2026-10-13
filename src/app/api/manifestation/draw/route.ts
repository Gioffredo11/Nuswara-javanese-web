import { NextRequest } from 'next/server';
import { manifestationService } from '@/server/services/manifestation.service';
import { userRepository } from '@/server/repositories/user.repository';
import { ManifestationDrawSchema } from '@/server/validators/manifestation.validators';
import { successResponse, errorResponse } from '@/server/http/response';
import { enforceRateLimit } from '@/server/http/rate-limiter';
import {
  GUEST_COOKIE_NAME,
  GUEST_COOKIE_OPTIONS,
  generateGuestToken,
} from '@/server/auth/guest-session';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    await enforceRateLimit(`manifestation:draw:${ip}`, 15, 60 * 1000);

    // 2. Guest user session
    let guestToken = request.cookies.get(GUEST_COOKIE_NAME)?.value;
    let isNewGuest = false;
    if (!guestToken) {
      guestToken = generateGuestToken();
      isNewGuest = true;
    }

    const user = await userRepository.getOrCreateGuest(guestToken);

    // 3. Optional body parsing (custom date)
    const rawBody = await request.json().catch(() => ({}));
    const validated = ManifestationDrawSchema.parse(rawBody);

    // 4. Service call (idempotent per user per WIB date)
    const result = await manifestationService.draw(user.id, validated.date);

    // 5. Response
    const response = successResponse(result);
    if (isNewGuest) {
      response.cookies.set(GUEST_COOKIE_NAME, guestToken, GUEST_COOKIE_OPTIONS);
    }

    return response;
  } catch (err) {
    return errorResponse(err);
  }
}
