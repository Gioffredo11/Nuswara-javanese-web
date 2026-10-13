import { NextRequest } from 'next/server';
import { characterService } from '@/server/services/character.service';
import { verifyAdminAuth } from '@/server/auth/admin-guard';
import { SlugParamSchema } from '@/server/validators/common.validators';
import { AdminCharacterUpdateSchema } from '@/server/validators/admin.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const rawParams = await params;
    const { slug } = SlugParamSchema.parse(rawParams);

    const rawBody = await request.json().catch(() => ({}));
    const validated = AdminCharacterUpdateSchema.parse(rawBody);

    const updated = await characterService.updateCharacter(slug, validated);
    return successResponse(updated);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const rawParams = await params;
    const { slug } = SlugParamSchema.parse(rawParams);

    const deleted = await characterService.deleteCharacter(slug);
    return successResponse({ deleted: true, character: deleted });
  } catch (err) {
    return errorResponse(err);
  }
}
