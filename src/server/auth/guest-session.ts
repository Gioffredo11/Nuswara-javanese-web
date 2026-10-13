import * as crypto from 'crypto';

export const GUEST_COOKIE_NAME = 'jawa_epic_guest_token';

export const GUEST_COOKIE_OPTIONS = {
  name: GUEST_COOKIE_NAME,
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 365 * 24 * 60 * 60, // 1 year
};

/**
 * Generates a cryptographically strong guest token string.
 */
export function generateGuestToken(): string {
  return 'gst_' + crypto.randomBytes(24).toString('hex');
}
