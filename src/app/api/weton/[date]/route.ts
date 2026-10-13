import { NextRequest } from 'next/server';
import { wetonService } from '@/server/services/weton.service';
import { WetonDateParamSchema, WetonQuerySchema } from '@/server/validators/weton.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const rawParams = await params;
    const { date } = WetonDateParamSchema.parse(rawParams);

    const { searchParams } = new URL(request.url);
    const query = WetonQuerySchema.parse({
      time: searchParams.get('time') || undefined,
      cutoff: searchParams.get('cutoff') || undefined,
    });

    const result = await wetonService.getWetonDetail({
      dateStr: date,
      timeStr: query.time,
      cutoff: query.cutoff,
    });

    return successResponse(result);
  } catch (err) {
    return errorResponse(err);
  }
}
