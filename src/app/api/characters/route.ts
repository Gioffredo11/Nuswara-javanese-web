import { NextRequest } from 'next/server';
import { characterService } from '@/server/services/character.service';
import { CharacterQuerySchema } from '@/server/validators/character.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = CharacterQuerySchema.parse({
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      q: searchParams.get('q') || undefined,
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
    });

    const result = await characterService.listCharacters(query);

    return successResponse(result.characters, {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
