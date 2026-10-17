import { RateLimitError } from './errors';

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetMs: number;
}

export interface IRateLimiter {
  consume(key: string, limit: number, windowMs: number): Promise<RateLimitResult>;
  reset(key: string): Promise<void>;
}

interface WindowBucket {
  count: number;
  resetAt: number;
}

/**
 * In-memory sliding window rate limiter.
 * Designed behind IRateLimiter interface for seamless drop-in replacement with Redis.
 */
export class InMemoryRateLimiter implements IRateLimiter {
  private buckets = new Map<string, WindowBucket>();

  async consume(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    const now = Date.now();
    const existing = this.buckets.get(key);

    if (!existing || now >= existing.resetAt) {
      // Window expired or new key
      const resetAt = now + windowMs;
      this.buckets.set(key, { count: 1, resetAt });
      return {
        success: true,
        remaining: limit - 1,
        resetMs: windowMs,
      };
    }

    if (existing.count >= limit) {
      return {
        success: false,
        remaining: 0,
        resetMs: Math.max(0, existing.resetAt - now),
      };
    }

    existing.count += 1;
    return {
      success: true,
      remaining: limit - existing.count,
      resetMs: Math.max(0, existing.resetAt - now),
    };
  }

  async reset(key: string): Promise<void> {
    this.buckets.delete(key);
  }

  // Periodic cleanup helper
  cleanup(): void {
    const now = Date.now();
    for (const [key, bucket] of this.buckets.entries()) {
      if (now >= bucket.resetAt) {
        this.buckets.delete(key);
      }
    }
  }
}

// Global singleton rate limiter instance
export const rateLimiter: IRateLimiter = new InMemoryRateLimiter();

// Periodic cleanup every 5 minutes to prevent unbounded Map growth
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    (rateLimiter as InMemoryRateLimiter).cleanup();
  }, 5 * 60 * 1000).unref?.(); // .unref() so it doesn't keep the process alive
}


/**
 * Convenience helper to enforce rate limit or throw RateLimitError.
 */
export async function enforceRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const result = await rateLimiter.consume(key, limit, windowMs);
  if (!result.success) {
    throw new RateLimitError(
      `Terlalu banyak permintaan. Silakan tunggu sekitar ${Math.ceil(result.resetMs / 1000)} detik sebelum mencoba lagi.`
    );
  }
  return result;
}
