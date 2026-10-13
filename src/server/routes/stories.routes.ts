import { Router, Request, Response, NextFunction } from 'express';
import { storyService } from '../services/story.service';
import { SlugParamSchema } from '../validators/common.validators';
import { sendSuccess } from '../http/express-helpers';

export const storiesRouter = Router();

// GET /api/stories
storiesRouter.get('/stories', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stories = await storyService.listStories();
    return sendSuccess(res, stories);
  } catch (error) {
    next(error);
  }
});

// GET /api/stories/:slug
storiesRouter.get('/stories/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const story = await storyService.getStoryBySlug(slug);
    return sendSuccess(res, story);
  } catch (error) {
    next(error);
  }
});
