import { NextRequest } from 'next/server';
import { characterService } from '@/server/services/character.service';
import { verifyAdminAuth } from '@/server/auth/admin-guard';
import { AdminCharacterCreateSchema } from '@/server/validators/admin.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(request: NextRequest) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const result = await characterService.listCharacters({ limit: 100 });
    return successResponse(result.characters, { total: result.total });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const rawBody = await request.json().catch(() => ({}));
    const validated = AdminCharacterCreateSchema.parse(rawBody);

    const created = await characterService.createCharacter(validated);
    return successResponse(created, undefined, 201);
  } catch (err) {
    return errorResponse(err);
  }
}
