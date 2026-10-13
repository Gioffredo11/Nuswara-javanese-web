import { NextRequest } from 'next/server';
import { shareService } from '@/server/services/share.service';
import { ShareCodeParamSchema } from '@/server/validators/share.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const rawParams = await params;
    const { code } = ShareCodeParamSchema.parse(rawParams);

    const share = await shareService.getShareByCode(code);

    return successResponse(share);
  } catch (err) {
    return errorResponse(err);
  }
}
