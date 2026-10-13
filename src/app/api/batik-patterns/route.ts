import { NextRequest } from 'next/server';
import { batikService } from '@/server/services/batik.service';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(_request: NextRequest) {
  try {
    const patterns = await batikService.listBatikPatterns();
    return successResponse(patterns);
  } catch (err) {
    return errorResponse(err);
  }
}
