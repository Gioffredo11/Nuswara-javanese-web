import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { AppError } from './errors';
import { ApiResponseSuccess, ApiResponseError } from '@/types/api';

/**
 * Creates uniform success response: { data, meta? }
 */
export function successResponse<T>(
  data: T,
  meta?: ApiResponseSuccess<T>['meta'],
  status = 200,
  headers?: HeadersInit
): NextResponse<ApiResponseSuccess<T>> {
  const body: ApiResponseSuccess<T> = { data };
  if (meta) {
    body.meta = meta;
  }
  return NextResponse.json(body, { status, headers });
}

/**
 * Creates uniform error response: { error: { code, message, details? } }
 * Translates Zod errors to 422 with friendly messages.
 * Never leaks internal stack trace or raw SQL errors in production.
 */
export function errorResponse(err: unknown): NextResponse<ApiResponseError> {
  // 1. Zod Validation Errors
  if (err instanceof ZodError) {
    const issues = err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    }));
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: issues[0]?.message || 'Ada data input yang belum sesuai.',
          details: issues,
        },
      },
      { status: 422 }
    );
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
    return NextResponse.json({ error: errorPayload }, { status: err.statusCode });
  }

  // 3. Database Connection Errors (Prisma / MySQL)
  if (
    err &&
    typeof err === 'object' &&
    ('name' in err && (err as any).name === 'PrismaClientInitializationError' ||
     String(err).includes("Can't reach database server"))
  ) {
    console.error('[Database Connection Error]: MySQL is not reachable on port 3306.');
    return NextResponse.json(
      {
        error: {
          code: 'DATABASE_CONNECTION_ERROR',
          message:
            'Gagal terhubung ke database MySQL (port 3306). Pastikan Apache & MySQL di XAMPP/Laragon sudah dijalankan.',
        },
      },
      { status: 503 }
    );
  }

  // 4. Fallback for unexpected system errors
  console.error('[Unhandled Server Error]:', err);
  return NextResponse.json(
    {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Maaf, terjadi kendala pada sistem. Tim kami sedang menanganinya.',
      },
    },
    { status: 500 }
  );
}
