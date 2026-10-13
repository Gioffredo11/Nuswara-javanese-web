import { NextRequest } from 'next/server';
import { philosophyService } from '@/server/services/philosophy.service';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(_request: NextRequest) {
  try {
    const featured = await philosophyService.getDailyFeatured();
    return successResponse(featured);
  } catch (err) {
    return errorResponse(err);
  }
}
