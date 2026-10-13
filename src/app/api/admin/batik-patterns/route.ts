import { NextRequest } from 'next/server';
import { batikService } from '@/server/services/batik.service';
import { verifyAdminAuth } from '@/server/auth/admin-guard';
import { AdminBatikCreateSchema } from '@/server/validators/admin.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(request: NextRequest) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const patterns = await batikService.listBatikPatterns();
    return successResponse(patterns);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const rawBody = await request.json().catch(() => ({}));
    const validated = AdminBatikCreateSchema.parse(rawBody);

    const created = await batikService.createBatik(validated);
    return successResponse(created, undefined, 201);
  } catch (err) {
    return errorResponse(err);
  }
}
