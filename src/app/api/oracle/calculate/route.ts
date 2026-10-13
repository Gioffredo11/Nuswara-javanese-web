import { NextRequest } from 'next/server';
import { oracleService } from '@/server/services/oracle.service';
import { OracleCalculateSchema } from '@/server/validators/oracle.validators';
import { successResponse, errorResponse } from '@/server/http/response';
import { enforceRateLimit } from '@/server/http/rate-limiter';
import {
  GUEST_COOKIE_NAME,
  GUEST_COOKIE_OPTIONS,
  generateGuestToken,
} from '@/server/auth/guest-session';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting by IP / client identifier (e.g. 10 in tests, 30 in production)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = process.env.NODE_ENV === 'test' ? 10 : 30;
    await enforceRateLimit(`oracle:${ip}`, rateLimit, 60 * 1000);

    // 2. Guest token management
    let guestToken = request.cookies.get(GUEST_COOKIE_NAME)?.value;
    let isNewGuest = false;
    if (!guestToken) {
      guestToken = generateGuestToken();
      isNewGuest = true;
    }

    // 3. Parse and validate JSON body strictly
    const rawBody = await request.json().catch(() => ({}));
    const validated = OracleCalculateSchema.parse(rawBody);

    // 4. Execute Service
    const result = await oracleService.calculate(validated, guestToken);

    // 5. Build Response
    const response = successResponse(result);
    if (isNewGuest) {
      response.cookies.set(GUEST_COOKIE_NAME, guestToken, GUEST_COOKIE_OPTIONS);
    }

    return response;
  } catch (err) {
    return errorResponse(err);
  }
}
