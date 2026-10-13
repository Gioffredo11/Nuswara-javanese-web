import { describe, it, expect, beforeAll } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as oracleCalculatePost } from '@/app/api/oracle/calculate/route';
import { POST as manifestationDrawPost } from '@/app/api/manifestation/draw/route';
import { GET as characterGet } from '@/app/api/characters/[slug]/route';
import { GET as shareGet } from '@/app/api/share/[code]/route';
import { prisma } from '@/server/db';
import { rateLimiter } from '@/server/http/rate-limiter';
import { GUEST_COOKIE_NAME } from '@/server/auth/guest-session';
import { generateShareCode } from '@/server/domain/share/generateShareCode';

describe('API Route Handlers Integration Tests', () => {
  beforeAll(async () => {
    // Ensure database connection
    await prisma.$connect();
  });

  describe('POST /api/oracle/calculate', () => {
    it('returns 422 VALIDATION_ERROR when birthDate is invalid', async () => {
      const req = new NextRequest('http://localhost:3000/api/oracle/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Budi Santoso',
          birthDate: 'invalid-date-format', // invalid YYYY-MM-DD
        }),
      });

      const res = await oracleCalculatePost(req);
      const json = await res.json();

      expect(res.status).toBe(422);
      expect(json.error).toBeDefined();
      expect(json.error.code).toBe('VALIDATION_ERROR');
      expect(json.error.message).toMatch(/Tanggal lahirmu belum valid/i);
    });

    it('returns 422 VALIDATION_ERROR when name is empty or exceeds 60 characters', async () => {
      const req = new NextRequest('http://localhost:3000/api/oracle/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'A'.repeat(61), // exceeds 60 characters
          birthDate: '1995-05-15',
        }),
      });

      const res = await oracleCalculatePost(req);
      const json = await res.json();

      expect(res.status).toBe(422);
      expect(json.error.code).toBe('VALIDATION_ERROR');
      expect(json.error.message).toMatch(/maksimal 60 karakter/i);
    });
  });

  describe('GET /api/characters/:slug', () => {
    it('returns 404 NOT_FOUND when character slug does not exist', async () => {
      const req = new NextRequest('http://localhost:3000/api/characters/tokoh-fiktif-tidak-ada');
      const res = await characterGet(req, {
        params: Promise.resolve({ slug: 'tokoh-fiktif-tidak-ada' }),
      });
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBeDefined();
      expect(json.error.code).toBe('NOT_FOUND');
      expect(json.error.message).toMatch(/tidak ditemukan/);
    });

    it('returns 200 with character details and related entities when slug exists', async () => {
      const req = new NextRequest('http://localhost:3000/api/characters/arjuna');
      const res = await characterGet(req, {
        params: Promise.resolve({ slug: 'arjuna' }),
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.data).toBeDefined();
      expect(json.data.slug).toBe('arjuna');
      expect(json.data.weapons).toBeDefined();
      expect(json.data.philosophies).toBeDefined();
      expect(json.data.relationships).toBeDefined();
    });
  });

  describe('POST /api/manifestation/draw - Idempotency', () => {
    it('returns the exact same manifestation card on repeated draw calls for the same user and date', async () => {
      const testGuestToken = 'test-guest-token-' + Date.now();

      // First call
      const req1 = new NextRequest('http://localhost:3000/api/manifestation/draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${GUEST_COOKIE_NAME}=${testGuestToken}`,
        },
        body: JSON.stringify({ date: '2026-10-06' }),
      });

      const res1 = await manifestationDrawPost(req1);
      const json1 = await res1.json();
      expect(res1.status).toBe(200);
      expect(json1.data.philosophy).toBeDefined();

      // Second call (same user, same date)
      const req2 = new NextRequest('http://localhost:3000/api/manifestation/draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${GUEST_COOKIE_NAME}=${testGuestToken}`,
        },
        body: JSON.stringify({ date: '2026-10-06' }),
      });

      const res2 = await manifestationDrawPost(req2);
      const json2 = await res2.json();
      expect(res2.status).toBe(200);

      // Idempotency assertion: identical philosophy card
      expect(json1.data.philosophy.id).toBe(json2.data.philosophy.id);
      expect(json1.data.philosophy.slug).toBe(json2.data.philosophy.slug);
      expect(json1.data.philosophy.textJawa).toBe(json2.data.philosophy.textJawa);
    });
  });

  describe('GET /api/share/:code - Expiry & Not Found', () => {
    it('returns 404 when share code does not exist', async () => {
      const req = new NextRequest('http://localhost:3000/api/share/XYZ99999');
      const res = await shareGet(req, {
        params: Promise.resolve({ code: 'XYZ99999' }),
      });
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error.code).toBe('NOT_FOUND');
    });

    it('returns 404/410 when share code has expired', async () => {
      // Insert an expired share link directly in DB with guaranteed unambiguous charset
      const expiredCode = generateShareCode(10);
      await prisma.shareLink.create({
        data: {
          shortCode: expiredCode,
          type: 'ORACLE',
          referenceId: '1',
          expiresAt: new Date(Date.now() - 3600000), // 1 hour ago
        },
      });

      const req = new NextRequest(`http://localhost:3000/api/share/${expiredCode}`);
      const res = await shareGet(req, {
        params: Promise.resolve({ code: expiredCode }),
      });
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error.code).toBe('NOT_FOUND');
      expect(json.error.message).toMatch(/kedaluwarsa/i);
    });
  });

  describe('Rate Limiter', () => {
    it('returns 429 RATE_LIMIT_EXCEEDED when rate limit threshold is exceeded', async () => {
      const clientIp = '192.168.100.99';
      const rateLimitKey = `oracle:${clientIp}`;

      // Reset limiter for test key
      await rateLimiter.reset(rateLimitKey);

      // Limit is 10 requests per minute
      for (let i = 0; i < 10; i++) {
        const req = new NextRequest('http://localhost:3000/api/oracle/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': clientIp,
          },
          body: JSON.stringify({
            name: 'Raden Arjuna',
            birthDate: '1995-05-15',
          }),
        });
        const res = await oracleCalculatePost(req);
        expect(res.status).toBe(200);
      }

      // 11th request must trigger rate limit (429)
      const blockedReq = new NextRequest('http://localhost:3000/api/oracle/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': clientIp,
        },
        body: JSON.stringify({
          name: 'Raden Arjuna',
          birthDate: '1995-05-15',
        }),
      });

      const blockedRes = await oracleCalculatePost(blockedReq);
      const json = await blockedRes.json();

      expect(blockedRes.status).toBe(429);
      expect(json.error.code).toBe('RATE_LIMIT_EXCEEDED');
      expect(json.error.message).toMatch(/Terlalu banyak permintaan/i);

      // Clean up after test
      await rateLimiter.reset(rateLimitKey);
    });
  });
});
