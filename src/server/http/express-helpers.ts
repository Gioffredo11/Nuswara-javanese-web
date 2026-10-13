import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from './errors';
import { ApiResponseSuccess, ApiResponseError } from '@/types/api';
import { GUEST_COOKIE_NAME, GUEST_COOKIE_OPTIONS, generateGuestToken } from '../auth/guest-session';
import { verifyAdminAuth } from '../auth/admin-guard';

// Extend Express Request type to include guestToken
declare global {
  namespace Express {
    interface Request {
      guestToken?: string;
    }
  }
}

/**
 * Sends uniform success response: { data, meta? }
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  meta?: ApiResponseSuccess<T>['meta'],
  status = 200
): Response {
  const body: any = {
    success: true,
    data,
  };
  if (meta) {
    body.meta = meta;
  }
  return res.status(status).json(body);
}

/**
 * Formats and sends uniform error response: { error: { code, message, details? } }
 */
export function sendError(res: Response, err: unknown): Response {
  // 1. Zod Validation Errors
  if (err instanceof ZodError) {
    const issues = err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    }));
    const message = issues[0]?.message || 'Ada data input yang belum sesuai.';
    const errorBody: any = {
      success: false,
      message,
      error: {
        code: 'VALIDATION_ERROR',
        message,
        details: issues,
      },
    };
    return res.status(422).json(errorBody);
  }

  // 1b. Express body-parser SyntaxError
  if (err instanceof SyntaxError && 'status' in err && (err as any).status === 400) {
    return res.status(400).json({
      success: false,
      message: 'Format payload JSON tidak valid.',
      error: {
        code: 'INVALID_JSON',
        message: 'Format payload JSON tidak valid.',
      },
    });
  }

  // 2. Custom AppErrors
  if (err instanceof AppError) {
    const errorPayload: ApiResponseError['error'] = {
      code: err.code,
      message: err.message,
    };
    if (err.details !== undefined) {
      errorPayload.details = err.details;
    }
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: errorPayload,
    });
  }

  // 3. Prisma / Database connection errors
  const isDbConnectionError =
    (err as any)?.code === 'P1001' ||
    (err as any)?.name === 'PrismaClientInitializationError' ||
    (typeof (err as any)?.message === 'string' &&
      ((err as any).message.includes("Can't reach database server") ||
        (err as any).message.includes('connect ECONNREFUSED')));

  if (isDbConnectionError) {
    console.error('[Database Connection Error]: Server MySQL tidak dapat dihubungi di 127.0.0.1:3306');
    const dbMessage = 'Database MySQL tidak dapat dihubungi. Pastikan MySQL di XAMPP atau Laragon telah dijalankan.';
    return res.status(503).json({
      success: false,
      message: dbMessage,
      error: {
        code: 'DATABASE_CONNECTION_ERROR',
        message: dbMessage,
      },
    });
  }

  // 4. Fallback for unhandled errors
  console.error('[Unhandled Express Error]:', err);
  const message = 'Maaf, terjadi kendala pada sistem. Tim kami sedang menanganinya.';
  const errorBody: any = {
    success: false,
    message,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message,
    },
  };
  return res.status(500).json(errorBody);
}

/**
 * Express Global Error Handling Middleware
 */
export function expressErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  sendError(res, err);
}

/**
 * Express Middleware to ensure guestToken exists in cookie or is generated and set.
 */
export function guestSessionMiddleware(req: Request, res: Response, next: NextFunction): void {
  let token = req.cookies?.[GUEST_COOKIE_NAME];
  if (!token || typeof token !== 'string' || token.trim() === '') {
    token = generateGuestToken();
    res.cookie(GUEST_COOKIE_NAME, token, {
      httpOnly: GUEST_COOKIE_OPTIONS.httpOnly,
      sameSite: GUEST_COOKIE_OPTIONS.sameSite,
      secure: GUEST_COOKIE_OPTIONS.secure,
      path: GUEST_COOKIE_OPTIONS.path,
      maxAge: GUEST_COOKIE_OPTIONS.maxAge * 1000,
    });
  }
  req.guestToken = token;
  next();
}

/**
 * Express Middleware for Admin Guard
 */
export function adminGuardMiddleware(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = (req.headers.authorization as string) || null;
    const customKey = (req.headers['x-admin-key'] as string) || null;
    verifyAdminAuth(authHeader, customKey);
    next();
  } catch (error) {
    next(error);
  }
}
