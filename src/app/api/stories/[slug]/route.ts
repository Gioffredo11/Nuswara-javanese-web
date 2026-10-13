import { NextRequest } from 'next/server';
import { storyService } from '@/server/services/story.service';
import { SlugParamSchema } from '@/server/validators/common.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const rawParams = await params;
    const { slug } = SlugParamSchema.parse(rawParams);

    const story = await storyService.getStoryBySlug(slug);

    return successResponse(story);
  } catch (err) {
    return errorResponse(err);
  }
}
