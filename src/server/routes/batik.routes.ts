import { Router, Request, Response, NextFunction } from 'express';
import { batikService } from '../services/batik.service';
import { SlugParamSchema } from '../validators/common.validators';
import { sendSuccess } from '../http/express-helpers';

export const batikRouter = Router();

const handleGetBatikList = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const patterns = await batikService.listBatikPatterns();
    return sendSuccess(res, patterns);
  } catch (error) {
    next(error);
  }
};

batikRouter.get('/batik-patterns', handleGetBatikList);
batikRouter.get('/batik', handleGetBatikList);

// GET /api/batik-patterns/:slug
batikRouter.get('/batik-patterns/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const batik = await batikService.getBatikBySlug(slug);
    return sendSuccess(res, batik);
  } catch (error) {
    next(error);
  }
});
