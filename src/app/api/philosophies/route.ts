import { NextRequest } from 'next/server';
import { philosophyService } from '@/server/services/philosophy.service';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;

    const philosophies = await philosophyService.listPhilosophies(category);
    return successResponse(philosophies);
  } catch (err) {
    return errorResponse(err);
  }
}
