import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes';
import { guestSessionMiddleware, expressErrorHandler } from './http/express-helpers';
import { NotFoundError } from './http/errors';

function buildAllowedOrigins(): string[] {
  const base = process.env.APP_BASE_URL;
  const extra = process.env.EXTRA_ALLOWED_ORIGINS; // comma-separated optional

  const origins: string[] = [];
  if (base) origins.push(base);
  if (extra) origins.push(...extra.split(',').map((o) => o.trim()).filter(Boolean));

  // In development, also allow localhost variants
  if (process.env.NODE_ENV !== 'production') {
    origins.push('http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000');
  }

  return origins;
}

export function createApp(): express.Application {
  const app = express();
  const allowedOrigins = buildAllowedOrigins();

  app.use(
    cors({
      origin: (requestOrigin, callback) => {
        // Allow requests with no origin (e.g. server-to-server, health checks)
        if (!requestOrigin) return callback(null, true);
        if (allowedOrigins.includes(requestOrigin)) {
          return callback(null, true);
        }
        callback(new Error(`Origin '${requestOrigin}' tidak diizinkan oleh CORS.`));
      },
      credentials: true,
    })
  );
  app.use(cookieParser());
  // Reduce body limit: admin endpoints need at most ~500KB for image URLs, not 10MB
  app.use(express.json({ limit: '500kb' }));
  app.use(express.urlencoded({ extended: true, limit: '500kb' }));

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
