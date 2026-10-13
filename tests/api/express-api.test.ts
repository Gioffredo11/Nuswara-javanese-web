import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '@/server/app';
import { prisma } from '@/server/db';
import { rateLimiter } from '@/server/http/rate-limiter';
import { GUEST_COOKIE_NAME } from '@/server/auth/guest-session';
import { generateShareCode } from '@/server/domain/share/generateShareCode';

describe('Express API Endpoints Integration Tests', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  describe('GET /health', () => {
    it('returns 200 with service status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('POST /api/oracle/calculate', () => {
    it('returns 422 VALIDATION_ERROR when birthDate is invalid', async () => {
      const res = await request(app)
        .post('/api/oracle/calculate')
        .send({
          name: 'Budi Santoso',
          birthDate: 'invalid-date-format',
        });

      expect(res.status).toBe(422);
      expect(res.body.error).toBeDefined();
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
      expect(res.body.error.message).toMatch(/Tanggal lahirmu belum valid/i);
    });

    it('returns 422 VALIDATION_ERROR when name exceeds 60 characters', async () => {
      const res = await request(app)
        .post('/api/oracle/calculate')
        .send({
          name: 'A'.repeat(61),
          birthDate: '1995-05-15',
        });

      expect(res.status).toBe(422);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
      expect(res.body.error.message).toMatch(/maksimal 60 karakter/i);
    });
  });

  describe('GET /api/characters/:slug', () => {
    it('returns 404 NOT_FOUND when character slug does not exist', async () => {
      const res = await request(app).get('/api/characters/tokoh-fiktif-tidak-ada');
      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('returns 200 with character details when slug exists', async () => {
      const res = await request(app).get('/api/characters/arjuna');
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.slug).toBe('arjuna');
      expect(res.body.data.weapons).toBeDefined();
      expect(res.body.data.philosophies).toBeDefined();
      expect(res.body.data.relationships).toBeDefined();
    });
  });

  describe('POST /api/manifestation/draw - Idempotency', () => {
    it('returns the exact same manifestation card on repeated draw calls for the same user and date', async () => {
      const testGuestToken = 'test-gst-token-' + Date.now();

      // First call
      const res1 = await request(app)
        .post('/api/manifestation/draw')
        .set('Cookie', `${GUEST_COOKIE_NAME}=${testGuestToken}`)
        .send({ date: '2026-10-06' });

      expect(res1.status).toBe(200);
      expect(res1.body.data.philosophy).toBeDefined();

      // Second call (same user, same date)
      const res2 = await request(app)
        .post('/api/manifestation/draw')
        .set('Cookie', `${GUEST_COOKIE_NAME}=${testGuestToken}`)
        .send({ date: '2026-10-06' });

      expect(res2.status).toBe(200);
      expect(res1.body.data.philosophy.id).toBe(res2.body.data.philosophy.id);
      expect(res1.body.data.philosophy.slug).toBe(res2.body.data.philosophy.slug);
    });
  });

  describe('GET /api/share/:code - Expiry & Not Found', () => {
    it('returns 404 when share code does not exist', async () => {
      const res = await request(app).get('/api/share/XYZ99999');
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('returns 404 when share code has expired', async () => {
      const expiredCode = generateShareCode(10);
      await prisma.shareLink.create({
        data: {
          shortCode: expiredCode,
          type: 'ORACLE',
          referenceId: '1',
          expiresAt: new Date(Date.now() - 3600000), // 1 hour ago
        },
      });

      const res = await request(app).get(`/api/share/${expiredCode}`);
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
      expect(res.body.error.message).toMatch(/kedaluwarsa/i);
    });
  });

  describe('Rate Limiter', () => {
    it('returns 429 RATE_LIMIT_EXCEEDED when rate limit threshold is exceeded', async () => {
      const clientIp = '192.168.100.99';
      const rateLimitKey = `oracle:${clientIp}`;

      await rateLimiter.reset(rateLimitKey);

      // Consume up to limit (10)
      for (let i = 0; i < 10; i++) {
        const res = await request(app)
          .post('/api/oracle/calculate')
          .set('X-Forwarded-For', clientIp)
          .send({
            name: 'Raden Arjuna',
            birthDate: '1995-05-15',
          });
        expect(res.status).toBe(200);
      }

      // 11th request triggers 429
      const blockedRes = await request(app)
        .post('/api/oracle/calculate')
        .set('X-Forwarded-For', clientIp)
        .send({
          name: 'Raden Arjuna',
          birthDate: '1995-05-15',
        });

      expect(blockedRes.status).toBe(429);
      expect(blockedRes.body.error.code).toBe('RATE_LIMIT_EXCEEDED');

      await rateLimiter.reset(rateLimitKey);
    });
  });
});
