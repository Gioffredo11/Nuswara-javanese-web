import { NextRequest } from 'next/server';
import { characterService } from '@/server/services/character.service';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(_request: NextRequest) {
  try {
    const graph = await characterService.getFamilyTreeGraph();
    return successResponse(graph);
  } catch (err) {
    return errorResponse(err);
  }
}
