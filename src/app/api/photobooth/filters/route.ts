import { NextRequest } from 'next/server';
import { photoboothService } from '@/server/services/photobooth.service';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(_request: NextRequest) {
  try {
    const filters = await photoboothService.getFilters();
    return successResponse(filters);
  } catch (err) {
    return errorResponse(err);
  }
}
