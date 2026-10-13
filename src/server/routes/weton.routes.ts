import { Router, Request, Response, NextFunction } from 'express';
import { wetonService } from '../services/weton.service';
import { WetonDateParamSchema, WetonQuerySchema } from '../validators/weton.validators';
import { sendSuccess } from '../http/express-helpers';

export const wetonRouter = Router();

// GET /api/weton/:date
wetonRouter.get('/weton/:date', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = WetonDateParamSchema.parse(req.params);
    const query = WetonQuerySchema.parse({
      time: req.query.time || undefined,
      cutoff: req.query.cutoff || undefined,
    });
    const result = await wetonService.getWetonDetail({
      dateStr: date,
      timeStr: query.time,
      cutoff: query.cutoff,
    });
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
});
