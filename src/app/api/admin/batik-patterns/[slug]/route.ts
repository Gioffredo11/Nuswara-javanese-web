import { NextRequest } from 'next/server';
import { batikService } from '@/server/services/batik.service';
import { verifyAdminAuth } from '@/server/auth/admin-guard';
import { SlugParamSchema } from '@/server/validators/common.validators';
import { AdminBatikUpdateSchema } from '@/server/validators/admin.validators';
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
    const validated = AdminBatikUpdateSchema.parse(rawBody);

    const updated = await batikService.updateBatik(slug, validated);
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

    const deleted = await batikService.deleteBatik(slug);
    return successResponse({ deleted: true, batik: deleted });
  } catch (err) {
    return errorResponse(err);
  }
}
