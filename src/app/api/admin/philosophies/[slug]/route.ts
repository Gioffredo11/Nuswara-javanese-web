import { NextRequest } from 'next/server';
import { philosophyService } from '@/server/services/philosophy.service';
import { verifyAdminAuth } from '@/server/auth/admin-guard';
import { SlugParamSchema } from '@/server/validators/common.validators';
import { AdminPhilosophyUpdateSchema } from '@/server/validators/admin.validators';
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
    const validated = AdminPhilosophyUpdateSchema.parse(rawBody);

    const updated = await philosophyService.updatePhilosophy(slug, validated);
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

    const deleted = await philosophyService.deletePhilosophy(slug);
    return successResponse({ deleted: true, philosophy: deleted });
  } catch (err) {
    return errorResponse(err);
  }
}
