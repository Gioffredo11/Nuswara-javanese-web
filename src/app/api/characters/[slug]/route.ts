import { NextRequest } from 'next/server';
import { characterService } from '@/server/services/character.service';
import { SlugParamSchema } from '@/server/validators/common.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const rawParams = await params;
    const { slug } = SlugParamSchema.parse(rawParams);

    const character = await characterService.getCharacterBySlug(slug);

    return successResponse(character);
  } catch (err) {
    return errorResponse(err);
  }
}
