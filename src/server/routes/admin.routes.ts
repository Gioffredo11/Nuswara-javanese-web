import { Router, Request, Response, NextFunction } from 'express';
import { adminGuardMiddleware, sendSuccess } from '../http/express-helpers';
import { characterService } from '../services/character.service';
import { storyService } from '../services/story.service';
import { philosophyService } from '../services/philosophy.service';
import { batikService } from '../services/batik.service';
import {
  AdminCharacterCreateSchema,
  AdminCharacterUpdateSchema,
  AdminStoryCreateSchema,
  AdminStoryUpdateSchema,
  AdminPhilosophyCreateSchema,
  AdminPhilosophyUpdateSchema,
  AdminBatikCreateSchema,
  AdminBatikUpdateSchema,
} from '../validators/admin.validators';
import { SlugParamSchema } from '../validators/common.validators';

export const adminRouter = Router();

// Apply admin guard to all /admin/* routes
adminRouter.use(adminGuardMiddleware);

// --- CHARACTERS ---
adminRouter.get('/admin/characters', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await characterService.listCharacters({ limit: 100 });
    return sendSuccess(res, result.characters, { total: result.total });
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/admin/characters', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = AdminCharacterCreateSchema.parse(req.body);
    const created = await characterService.createCharacter(validated);
    return sendSuccess(res, created, undefined, 201);
  } catch (error) {
    next(error);
  }
});

adminRouter.put('/admin/characters/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const validated = AdminCharacterUpdateSchema.parse(req.body);
    const updated = await characterService.updateCharacter(slug, validated);
    return sendSuccess(res, updated);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete('/admin/characters/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const deleted = await characterService.deleteCharacter(slug);
    return sendSuccess(res, { deleted: true, character: deleted });
  } catch (error) {
    next(error);
  }
});

// --- STORIES ---
adminRouter.get('/admin/stories', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stories = await storyService.listStories();
    return sendSuccess(res, stories);
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/admin/stories', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = AdminStoryCreateSchema.parse(req.body);
    const created = await storyService.createStory(validated);
    return sendSuccess(res, created, undefined, 201);
  } catch (error) {
    next(error);
  }
});

adminRouter.put('/admin/stories/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const validated = AdminStoryUpdateSchema.parse(req.body);
    const updated = await storyService.updateStory(slug, validated);
    return sendSuccess(res, updated);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete('/admin/stories/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const deleted = await storyService.deleteStory(slug);
    return sendSuccess(res, { deleted: true, story: deleted });
  } catch (error) {
    next(error);
  }
});

// --- PHILOSOPHIES ---
adminRouter.get('/admin/philosophies', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const philosophies = await philosophyService.listPhilosophies();
    return sendSuccess(res, philosophies);
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/admin/philosophies', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = AdminPhilosophyCreateSchema.parse(req.body);
    const created = await philosophyService.createPhilosophy(validated);
    return sendSuccess(res, created, undefined, 201);
  } catch (error) {
    next(error);
  }
});

adminRouter.put('/admin/philosophies/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const validated = AdminPhilosophyUpdateSchema.parse(req.body);
    const updated = await philosophyService.updatePhilosophy(slug, validated);
    return sendSuccess(res, updated);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete('/admin/philosophies/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const deleted = await philosophyService.deletePhilosophy(slug);
    return sendSuccess(res, { deleted: true, philosophy: deleted });
  } catch (error) {
    next(error);
  }
});

// --- BATIK PATTERNS ---
adminRouter.get('/admin/batik-patterns', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const patterns = await batikService.listBatikPatterns();
    return sendSuccess(res, patterns);
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/admin/batik-patterns', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = AdminBatikCreateSchema.parse(req.body);
    const created = await batikService.createBatik(validated);
    return sendSuccess(res, created, undefined, 201);
  } catch (error) {
    next(error);
  }
});

adminRouter.put('/admin/batik-patterns/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const validated = AdminBatikUpdateSchema.parse(req.body);
    const updated = await batikService.updateBatik(slug, validated);
    return sendSuccess(res, updated);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete('/admin/batik-patterns/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const deleted = await batikService.deleteBatik(slug);
    return sendSuccess(res, { deleted: true, batik: deleted });
  } catch (error) {
    next(error);
  }
});
