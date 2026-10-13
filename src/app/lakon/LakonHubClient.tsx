'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/components/common/Link';
import { Layers, Clock, ArrowRight } from 'lucide-react';
import storiesSeed from '../../../prisma/seed-data/stories.json';

interface StoryItem {
  id: number;
  slug: string;
  title: string;
  summary: string;
  theme?: string;
  chapters?: any[];
}

export function LakonHubClient({
  initialStories,
}: {
  initialStories?: StoryItem[];
} = {}) {
  const [stories, setStories] = useState<StoryItem[]>(() => {
    if (initialStories && initialStories.length > 0) return initialStories;
    return (storiesSeed as any[]).map((s, idx) => ({
      id: idx + 1,
      slug: s.slug,
      title: s.title,
      summary: s.summary,
      theme: s.theme || 'Kisah Luhur Wayang',
      chapters: s.chapters || [],
    }));
  });

  useEffect(() => {
    if (initialStories && initialStories.length > 0) {
      setStories(initialStories);
    } else {
      fetch('/api/stories')
        .then((res) => res.json())
        .then((json) => {
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setStories(json.data);
          }
        })
        .catch(() => {});
    }
  }, [initialStories]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B99A60]">
          <Layers className="w-4 h-4 text-[#ECC47E]" />
          <span>Lakon Hub : Digital Storytelling</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-royal font-bold text-[#F0E6D4] tracking-tight">
          Lakon Cerita Pewayangan
        </h2>
        <p className="text-sm sm:text-base text-[#A89F91] leading-relaxed font-sans">
          Membaca lakon wayang kini tidak perlu berjam-jam semalam suntuk. Disajikan dalam format ringkas dengan penuturan kontemporer yang mengungkap filosofi di balik setiap tindakan sang ksatria.
        </p>
      </div>

      {/* Editorial Stories Layout: Featured Hero Story + Balanced Secondary Grid */}
      {stories.length > 0 && (() => {
        const featuredStory = stories[0];
        const secondaryStories = stories.slice(1);
        const featuredChapters = featuredStory.chapters || [];
        const featuredEstimatedMinutes = Math.max(
          1,
          Math.round(
            featuredChapters.reduce(
              (acc: number, c: any) => acc + (c.estimatedReadSeconds || 120),
              0
            ) / 60
          )
        );

        return (
          <div className="space-y-10">
            {/* 1. Featured Epic Story Card */}
            <div className="bg-[#14110E] rounded-3xl border border-[#C59B53]/45 overflow-hidden shadow-2xl relative group hover:border-[#ECC47E] transition-all">
              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Narrative & Titles */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#ECC47E] bg-[#241B12] px-3 py-1 rounded-full border border-[#C59B53]/40 font-semibold">
                      LAKON UTAMA • SOROTAN ADILUHUNG
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-[#A89F91]">
                      <Clock className="w-3.5 h-3.5 text-[#B99A60]" />
                      <span>~{featuredEstimatedMinutes} Menit Membaca</span>
                    </span>
                  </div>

                  <h3 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0E6D4] group-hover:text-[#ECC47E] transition-colors leading-tight">
                    {featuredStory.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#D8C8AD] leading-relaxed font-sans font-light max-w-2xl">
                    {featuredStory.summary}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/lakon/${featuredStory.slug}`}
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xl cursor-pointer"
                    >
                      <span>Mulai Membaca Epos</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right: Chapter Breakdown Box */}
                <div className="lg:col-span-5 bg-[#18130E] rounded-2xl border border-[#C59B53]/25 p-5 sm:p-6 space-y-3.5 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-mono text-[#C59B53] border-b border-[#C59B53]/20 pb-2">
                    <span className="uppercase font-semibold tracking-wider">Struktur Babak ({featuredChapters.length})</span>
                    <span>Tema: {featuredStory.theme}</span>
                  </div>

                  <div className="space-y-2">
                    {featuredChapters.map((ch: any) => (
                      <div
                        key={ch.id || ch.order}
                        className="text-xs p-2.5 rounded-xl bg-[#14100C] border border-[#C59B53]/20 flex items-center justify-between hover:border-[#C59B53]/50 transition-colors"
                      >
                        <span className="font-medium text-[#F5EFE6]">
                          Babak {ch.order}: {ch.title}
                        </span>
                        <span className="text-[10px] text-[#A89F91] font-mono">
                          {ch.scenes?.length || 0} Adegan
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Secondary Stories Grid */}
            {secondaryStories.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-px bg-[#B99A60]" aria-hidden="true" />
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B99A60] font-semibold">
                    KHAZANAH CERITA PEWAYANGAN LAINNYA
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {secondaryStories.map((story) => {
                    const chapters = story.chapters || [];
                    const totalScenes = chapters.reduce(
                      (acc: number, ch: any) => acc + (ch.scenes?.length || 0),
                      0
                    );
                    const totalEstimatedMinutes = Math.max(
                      1,
                      Math.round(
                        chapters.reduce(
                          (acc: number, c: any) => acc + (c.estimatedReadSeconds || 120),
                          0
                        ) / 60
                      )
                    );

                    return (
                      <div
                        key={story.id}
                        className="bg-[#14110E] rounded-2xl border border-[#C59B53]/35 overflow-hidden hover:border-[#ECC47E] transition-all flex flex-col group shadow-xl justify-between"
                      >
                        {/* Header Banner */}
                        <div className="p-6 bg-[#18130E] border-b border-[#C59B53]/25">
                          <div className="flex items-center justify-between text-xs font-mono text-[#A89F91] mb-2">
                            <span className="text-[#ECC47E] font-semibold">{story.theme}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#B99A60]" />
                              <span>~{totalEstimatedMinutes} Menit</span>
                            </span>
                          </div>

                          <h4 className="font-royal text-xl font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors line-clamp-1">
                            {story.title}
                          </h4>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                          <p className="text-xs text-[#A89F91] leading-relaxed font-sans line-clamp-3">
                            {story.summary}
                          </p>

                          {/* Chapters preview */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C59B53] block font-semibold">
                              Babak ({chapters.length})
                            </span>
                            {chapters.slice(0, 2).map((ch: any) => (
                              <div
                                key={ch.id || ch.order}
                                className="text-xs p-2 rounded-lg bg-[#1B1611] border border-[#C59B53]/20 flex items-center justify-between"
                              >
                                <span className="font-medium text-[#F5EFE6] truncate pr-2">
                                  Babak {ch.order}: {ch.title}
                                </span>
                                <span className="text-[10px] text-[#A89F91] font-mono shrink-0">
                                  {ch.scenes?.length || 0} Adegan
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Footer Action */}
                          <div className="pt-4 border-t border-[#C59B53]/20 flex items-center justify-between">
                            <span className="text-xs font-mono text-[#A89F91]">
                              {totalScenes} Adegan
                            </span>
                            <Link
                              href={`/lakon/${story.slug}`}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                            >
                              <span>Baca Lakon</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

export default LakonHubClient;
