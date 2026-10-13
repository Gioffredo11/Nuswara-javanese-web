import { Router, Request, Response, NextFunction } from 'express';
import { visualElementService } from '../services/visual-element.service';
import { VisualElementKind } from '@prisma/client';
import { sendSuccess } from '../http/express-helpers';

export const visualElementsRouter = Router();

// GET /api/visual-elements
visualElementsRouter.get('/visual-elements', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const kind = req.query.kind as VisualElementKind | undefined;
    const elements = await visualElementService.listVisualElements(kind);
    return sendSuccess(res, elements);
  } catch (error) {
    next(error);
  }
});
