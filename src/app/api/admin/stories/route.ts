import { NextRequest } from 'next/server';
import { storyService } from '@/server/services/story.service';
import { verifyAdminAuth } from '@/server/auth/admin-guard';
import { AdminStoryCreateSchema } from '@/server/validators/admin.validators';
import { successResponse, errorResponse } from '@/server/http/response';

export async function GET(request: NextRequest) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const stories = await storyService.listStories();
    return successResponse(stories);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    verifyAdminAuth(request.headers.get('authorization'), request.headers.get('x-admin-key'));

    const rawBody = await request.json().catch(() => ({}));
    const validated = AdminStoryCreateSchema.parse(rawBody);

    const created = await storyService.createStory(validated);
    return successResponse(created, undefined, 201);
  } catch (err) {
    return errorResponse(err);
  }
}
