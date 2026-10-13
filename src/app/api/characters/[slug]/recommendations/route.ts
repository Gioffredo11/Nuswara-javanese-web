import { NextRequest } from 'next/server';
import { recommendationService } from '@/server/services/recommendation.service';
import { SlugParamSchema } from '@/server/validators/common.validators';
import { CharacterRecommendationQuerySchema } from '@/server/validators/character.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const rawParams = await params;
    const { slug } = SlugParamSchema.parse(rawParams);

    const { searchParams } = new URL(request.url);
    const query = CharacterRecommendationQuerySchema.parse({
      limit: searchParams.get('limit') || undefined,
    });

    const recommendations = await recommendationService.getRecommendations(slug, query.limit);

    return successResponse(recommendations);
  } catch (err) {
    return errorResponse(err);
  }
}
