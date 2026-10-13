import { NextRequest } from 'next/server';
import { batikService } from '@/server/services/batik.service';
import { SlugParamSchema } from '@/server/validators/common.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const rawParams = await params;
    const { slug } = SlugParamSchema.parse(rawParams);

    const batik = await batikService.getBatikBySlug(slug);

    return successResponse(batik);
  } catch (err) {
    return errorResponse(err);
  }
}
