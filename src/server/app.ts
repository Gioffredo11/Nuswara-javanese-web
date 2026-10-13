import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes';
import { guestSessionMiddleware, expressErrorHandler } from './http/express-helpers';
import { NotFoundError } from './http/errors';

export function createApp(): express.Application {
  const app = express();

  // Basic security and parsing middlewares
  app.use(
    cors({
      origin: process.env.APP_BASE_URL || true,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Apply guest session automatically across requests
  app.use(guestSessionMiddleware);

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'jawa-epic-backend',
      timestamp: new Date().toISOString(),
    });
  });

  // Mount API endpoints
  app.use('/api', apiRouter);

  // 404 Handler for undefined API routes
  app.use('/api', (req: Request, _res: Response, next) => {
    next(new NotFoundError(`Endpoint '${req.method} ${req.originalUrl}' tidak ditemukan.`));
  });

  // Global uniform error handler
  app.use(expressErrorHandler);

  return app;
}

export const app = createApp();
