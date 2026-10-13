import { Router, Request, Response, NextFunction } from 'express';
import { manifestationService } from '../services/manifestation.service';
import { userRepository } from '../repositories/user.repository';
import { ManifestationDrawSchema } from '../validators/manifestation.validators';
import { enforceRateLimit } from '../http/rate-limiter';
import { NotFoundError } from '../http/errors';
import { sendSuccess } from '../http/express-helpers';

export const manifestationRouter = Router();

// POST /api/manifestation/draw
manifestationRouter.post('/manifestation/draw', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = (req.headers['x-forwarded-for'] as string) || req.ip || '127.0.0.1';
    await enforceRateLimit(`manifestation:draw:${ip}`, 15, 60 * 1000);

    const guestToken = req.guestToken || 'guest_default';
    const user = await userRepository.getOrCreateGuest(guestToken);

    const validated = ManifestationDrawSchema.parse(req.body || {});
    const result = await manifestationService.draw(user.id, validated.date);

    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
});

// GET /api/manifestation/today
manifestationRouter.get('/manifestation/today', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guestToken = req.guestToken || 'guest_default';
    const user = await userRepository.getOrCreateGuest(guestToken);

    try {
      const todayCard = await manifestationService.getToday(user.id);
      return sendSuccess(res, todayCard);
    } catch (err) {
      if (err instanceof NotFoundError) {
        return sendSuccess(res, {
          hasDrawnToday: false,
          message: 'Kamu belum menarik kartu manifestasi hari ini.',
        });
      }
      throw err;
    }
  } catch (error) {
    next(error);
  }
});
