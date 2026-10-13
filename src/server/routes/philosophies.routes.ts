import { Router, Request, Response, NextFunction } from 'express';
import { philosophyService } from '../services/philosophy.service';
import { sendSuccess } from '../http/express-helpers';

export const philosophiesRouter = Router();

// GET /api/philosophies/daily
philosophiesRouter.get('/philosophies/daily', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const featured = await philosophyService.getDailyFeatured();
    return sendSuccess(res, featured);
  } catch (error) {
    next(error);
  }
});

// GET /api/philosophies
philosophiesRouter.get('/philosophies', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const philosophies = await philosophyService.listPhilosophies(category);
    return sendSuccess(res, philosophies);
  } catch (error) {
    next(error);
  }
});
