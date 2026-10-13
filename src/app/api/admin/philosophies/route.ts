import { NextRequest } from 'next/server';
import { philosophyService } from '@/server/services/philosophy.service';
import { verifyAdminAuth } from '@/server/auth/admin-guard';
import { AdminPhilosophyCreateSchema } from '@/server/validators/admin.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(request: NextRequest) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const philosophies = await philosophyService.listPhilosophies();
    return successResponse(philosophies);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const rawBody = await request.json().catch(() => ({}));
    const validated = AdminPhilosophyCreateSchema.parse(rawBody);

    const created = await philosophyService.createPhilosophy(validated);
    return successResponse(created, undefined, 201);
  } catch (err) {
    return errorResponse(err);
  }
}
