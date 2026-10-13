import { prisma } from '../db';
import { User, UserRole } from '@prisma/client';

export class UserRepository {
  async findByGuestToken(token: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { guestToken: token },
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createGuest(guestToken: string): Promise<User> {
    return prisma.user.create({
      data: {
        guestToken,
        role: UserRole.USER,
      },
    });
  }

  async getOrCreateGuest(guestToken: string): Promise<User> {
    try {
      const existing = await this.findByGuestToken(guestToken);
      if (existing) {
        return existing;
      }
      return await this.createGuest(guestToken);
    } catch (err) {
      console.warn('[UserRepository] Could not query or create guest in DB, using fallback guest session:', err);
      // Generate deterministic fallback ID from guestToken
      let hash = 0;
      for (let i = 0; i < guestToken.length; i++) {
        hash = (hash << 5) - hash + guestToken.charCodeAt(i);
        hash |= 0;
      }
      const fallbackId = Math.abs(hash) || 1;

      return {
        id: fallbackId,
        email: null,
        passwordHash: null,
        guestToken,
        role: UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }
}

export const userRepository = new UserRepository();
