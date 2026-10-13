import { UnauthorizedError, ForbiddenError } from '../http/errors';

/**
 * Validates admin authorization credentials from request headers.
 * Accepts:
 * 1. Bearer token matching ADMIN_PASSWORD or SESSION_SECRET from env
 * 2. Basic auth matching ADMIN_EMAIL:ADMIN_PASSWORD from env
 * 3. Custom 'x-admin-key' header
 */
export function verifyAdminAuth(authHeader: string | null, customKeyHeader?: string | null): void {
  const envAdminEmail = process.env.ADMIN_EMAIL || 'admin@nuswara.id';
  const envAdminPassword = process.env.ADMIN_PASSWORD || 'PariwaraJawa2026!';
  const envSessionSecret = process.env.SESSION_SECRET;

  // 1. Check custom key header
  if (customKeyHeader) {
    if (
      customKeyHeader === envAdminPassword ||
      (envSessionSecret && customKeyHeader === envSessionSecret)
    ) {
      return; // Authorized
    }
  }

  if (!authHeader) {
    throw new UnauthorizedError('Header otorisasi admin diperlukan.');
  }

  // 2. Bearer Token
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (
      token === envAdminPassword ||
      (envSessionSecret && token === envSessionSecret)
    ) {
      return; // Authorized
    }
    throw new ForbiddenError('Token otorisasi admin tidak valid.');
  }

  // 3. Basic Auth
  if (authHeader.startsWith('Basic ')) {
    const base64Credentials = authHeader.substring(6).trim();
    const decoded = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [email, password] = decoded.split(':');

    if (email === envAdminEmail && password === envAdminPassword) {
      return; // Authorized
    }
    throw new ForbiddenError('Email atau password admin tidak cocok.');
  }

  throw new UnauthorizedError('Skema otorisasi tidak didukung (harus Bearer atau Basic).');
}
