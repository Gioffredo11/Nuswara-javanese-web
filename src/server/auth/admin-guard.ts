import { UnauthorizedError, ForbiddenError } from '../http/errors';

/**
 * Validates admin authorization credentials from request headers.
 * Accepts:
 * 1. Bearer token matching ADMIN_PASSWORD from env
 * 2. Basic auth matching ADMIN_EMAIL:ADMIN_PASSWORD from env
 * 3. Custom 'x-admin-key' header matching ADMIN_PASSWORD
 *
 * SESSION_SECRET is intentionally NOT accepted here to prevent
 * cross-purpose secret reuse.
 */
export function verifyAdminAuth(authHeader: string | null, customKeyHeader?: string | null): void {
  const envAdminEmail = process.env.ADMIN_EMAIL;
  const envAdminPassword = process.env.ADMIN_PASSWORD;

  if (!envAdminEmail || !envAdminPassword) {
    throw new Error(
      '[admin-guard] ADMIN_EMAIL dan ADMIN_PASSWORD harus di-set di environment variables.'
    );
  }

  // 1. Check custom key header
  if (customKeyHeader) {
    if (customKeyHeader === envAdminPassword) {
      return;
    }
    throw new ForbiddenError('Header x-admin-key tidak valid.');
  }

  if (!authHeader) {
    throw new UnauthorizedError('Header otorisasi admin diperlukan.');
  }

  // 2. Bearer Token
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === envAdminPassword) {
      return;
    }
    throw new ForbiddenError('Token otorisasi admin tidak valid.');
  }

  // 3. Basic Auth
  if (authHeader.startsWith('Basic ')) {
    const base64Credentials = authHeader.substring(6).trim();
    const decoded = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const colonIdx = decoded.indexOf(':');
    if (colonIdx === -1) throw new ForbiddenError('Format Basic Auth tidak valid.');
    const email = decoded.substring(0, colonIdx);
    const password = decoded.substring(colonIdx + 1);

    if (email === envAdminEmail && password === envAdminPassword) {
      return;
    }
    throw new ForbiddenError('Email atau password admin tidak cocok.');
  }

  throw new UnauthorizedError('Skema otorisasi tidak didukung (harus Bearer atau Basic).');
}
