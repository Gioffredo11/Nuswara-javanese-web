import React from 'react';
import { notFound } from 'next/navigation';
import { storyService } from '@/server/services/story.service';
import { LakonViewerClient } from './LakonViewerClient';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const story = await storyService.getStoryBySlug(slug);
    return {
      title: `${story.title}: Lakon Hub | NUSWARA`,
      description: story.summary,
    };
  } catch {
    return { title: 'Lakon Tidak Ditemukan | NUSWARA' };
  }
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let story;
  try {
    story = await storyService.getStoryBySlug(slug);
  } catch {
    notFound();
  }

  return <LakonViewerClient story={story as any} />;
}
