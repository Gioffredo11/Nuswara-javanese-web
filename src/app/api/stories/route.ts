import { NextRequest } from 'next/server';
import { storyService } from '@/server/services/story.service';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(_request: NextRequest) {
  try {
    const stories = await storyService.listStories();
    return successResponse(stories);
  } catch (err) {
    return errorResponse(err);
  }
}
