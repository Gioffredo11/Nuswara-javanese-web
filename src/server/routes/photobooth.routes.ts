import { Router, Request, Response, NextFunction } from 'express';
import { photoboothService } from '../services/photobooth.service';
import { sendSuccess } from '../http/express-helpers';

export const photoboothRouter = Router();

// GET /api/photobooth/frames
photoboothRouter.get('/photobooth/frames', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const frames = await photoboothService.getFrames();
    return sendSuccess(res, frames);
  } catch (error) {
    next(error);
  }
});

// GET /api/photobooth/filters
photoboothRouter.get('/photobooth/filters', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = await photoboothService.getFilters();
    return sendSuccess(res, filters);
  } catch (error) {
    next(error);
  }
});
