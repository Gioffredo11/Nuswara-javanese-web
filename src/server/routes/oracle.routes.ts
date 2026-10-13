import { Router, Request, Response, NextFunction } from 'express';
import { oracleService } from '../services/oracle.service';
import { OracleCalculateSchema } from '../validators/oracle.validators';
import { enforceRateLimit } from '../http/rate-limiter';
import { sendSuccess } from '../http/express-helpers';

export const oracleRouter = Router();

// POST /api/oracle/calculate
oracleRouter.post('/oracle/calculate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = (req.headers['x-forwarded-for'] as string) || req.ip || '127.0.0.1';
    await enforceRateLimit(`oracle:${ip}`, 10, 60 * 1000);

    const validated = OracleCalculateSchema.parse(req.body);
    const guestToken = req.guestToken;

    const result = await oracleService.calculate(validated, guestToken);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
});
