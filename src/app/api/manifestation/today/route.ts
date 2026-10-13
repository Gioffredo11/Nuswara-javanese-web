import { NextRequest } from 'next/server';
import { manifestationService } from '@/server/services/manifestation.service';
import { userRepository } from '@/server/repositories/user.repository';
import { successResponse, errorResponse } from '@/server/http/response';
import {
  GUEST_COOKIE_NAME,
  GUEST_COOKIE_OPTIONS,
  generateGuestToken,
} from '@/server/auth/guest-session';
import { NotFoundError } from '@/server/http/errors';

export async function GET(request: NextRequest) {
  try {
    let guestToken = request.cookies.get(GUEST_COOKIE_NAME)?.value;
    let isNewGuest = false;
    if (!guestToken) {
      guestToken = generateGuestToken();
      isNewGuest = true;
    }

    const user = await userRepository.getOrCreateGuest(guestToken);

    try {
      const todayCard = await manifestationService.getToday(user.id);
      const response = successResponse(todayCard);
      if (isNewGuest) {
        response.cookies.set(GUEST_COOKIE_NAME, guestToken, GUEST_COOKIE_OPTIONS);
      }
      return response;
    } catch (err) {
      if (err instanceof NotFoundError) {
        // User hasn't drawn yet today
        const response = successResponse({
          hasDrawnToday: false,
          message: 'Kamu belum menarik kartu manifestasi hari ini.',
        });
        if (isNewGuest) {
          response.cookies.set(GUEST_COOKIE_NAME, guestToken, GUEST_COOKIE_OPTIONS);
        }
        return response;
      }
      throw err;
    }
  } catch (err) {
    return errorResponse(err);
  }
}
