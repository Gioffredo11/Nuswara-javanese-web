import { NextRequest } from 'next/server';
import { visualElementService } from '@/server/services/visual-element.service';
import { successResponse, errorResponse } from '@/server/http/response';
import { VisualElementKind } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kind = searchParams.get('kind') as VisualElementKind | null;

    const elements = await visualElementService.listVisualElements(kind || undefined);
    return successResponse(elements);
  } catch (err) {
    return errorResponse(err);
  }
}
