import { Router, Request, Response, NextFunction } from 'express';
import { characterService } from '../services/character.service';
import { recommendationService } from '../services/recommendation.service';
import { CharacterQuerySchema, CharacterRecommendationQuerySchema } from '../validators/character.validators';
import { SlugParamSchema } from '../validators/common.validators';
import { sendSuccess } from '../http/express-helpers';

export const charactersRouter = Router();

// GET /api/characters
charactersRouter.get('/characters', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = CharacterQuerySchema.parse({
      page: req.query.page,
      limit: req.query.limit,
      q: req.query.q,
      category: req.query.category,
      status: req.query.status,
    });
    const result = await characterService.listCharacters(query);
    return sendSuccess(res, result.characters, {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/characters/:slug/recommendations
charactersRouter.get('/characters/:slug/recommendations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const query = CharacterRecommendationQuerySchema.parse({
      limit: req.query.limit,
    });
    const recommendations = await recommendationService.getRecommendations(slug, query.limit);
    return sendSuccess(res, recommendations);
  } catch (error) {
    next(error);
  }
});

// GET /api/characters/:slug
charactersRouter.get('/characters/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = SlugParamSchema.parse(req.params);
    const character = await characterService.getCharacterBySlug(slug);
    return sendSuccess(res, character);
  } catch (error) {
    next(error);
  }
});

// GET /api/character-relationships
charactersRouter.get('/character-relationships', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const graph = await characterService.getFamilyTreeGraph();
    return sendSuccess(res, graph);
  } catch (error) {
    next(error);
  }
});

// GET /api/family-tree
charactersRouter.get('/family-tree', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const graph = await characterService.getFamilyTreeGraph();
    return sendSuccess(res, graph);
  } catch (error) {
    next(error);
  }
});
