'use client';

import React, { useState } from 'react';
import { Link } from '@/components/common/Link';
import Image from 'next/image';
import { getTarotImagePath } from '@/components/ui/WayangVectors';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
  Users,
  HelpCircle,
  Trophy,
  RotateCcw,
  Quote,
  GraduationCap,
  ScrollText,
  Lightbulb,
  ExternalLink,
  Flame,
  Check,
  X,
} from 'lucide-react';
import { lakonQuizzesData } from '@/data/lakonQuizzes';
import { lakonEnrichmentData } from '@/data/lakonCharacterStories';

interface Scene {
  id: number;
  order?: number;
  sceneNumber?: number;
  narration: string;
  speakerName: string | null;
  culturalNote: string | null;
}

interface Chapter {
  id: number;
  order?: number;
  chapterNumber?: number;
  title: string;
  subtitle: string | null;
  summary: string | null;
  scenes: Scene[];
}

interface StoryDetail {
  id: number;
  title: string;
  slug: string;
  summary: string;
  theme: string;
  estimatedReadMinutes?: number;
  chapters: Chapter[];
  characters: Array<{
    role?: string;
    character: {
      id: number;
      name: string;
      slug: string;
      title?: string | null;
    };
  }>;
}

export function LakonViewerClient({ story }: { story: StoryDetail }) {
  // Navigation & Tab state
  const [activeTab, setActiveTab] = useState<'read' | 'characters' | 'context' | 'quiz'>('read');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  // Quiz interactive state
  const quiz = lakonQuizzesData[story.slug] || lakonQuizzesData['bima-suci'];
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Character enrichment data
  const enrichment = lakonEnrichmentData[story.slug];

  const totalChapters = story.chapters?.length || 0;
  const activeChapter = story.chapters?.[currentChapterIndex] || story.chapters?.[0];

  // Estimated reading minutes
  const totalReadMinutes = Math.max(
    2,
    Math.round(
      (story.chapters || []).reduce(
        (acc, ch) =>
          acc + (ch.scenes || []).reduce((scAcc) => scAcc + 60, 0),
        0
      ) / 60
    )
  );

  const renderCharacterVector = (slug: string, _className = 'w-16 h-20') => {
    return (
      <div className="relative w-full h-full aspect-[2/3] rounded-xl overflow-hidden border border-[#ECC47E]/40 shadow-md">
        <Image
          src={getTarotImagePath(slug)}
          alt={slug}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
    );
  };

  const handleSelectQuizOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    if (quiz && index === quiz.questions[quizQuestionIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (!quiz) return;
    if (quizQuestionIndex < quiz.questions.length - 1) {
      setQuizQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-20 sm:pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#C59B53]/20">
          <Link
            href="/#lakon"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A89F91] hover:text-[#ECC47E] transition-colors py-1.5 group"
          >
            <ArrowLeft className="w-4 h-4 text-[#B99A60] transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Lakon Hub</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#ECC47E] bg-[#18130E] border border-[#C59B53]/30 px-3.5 py-1.5 rounded-full shadow-inner">
              <Clock className="w-3.5 h-3.5 text-[#B99A60]" />
              <span>~{totalReadMinutes} Menit Baca Lengkap</span>
            </span>
          </div>
        </div>

        {/* Story Hero Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E] bg-[#241B12] px-4 py-1.5 rounded-full border border-[#C59B53]/40 font-semibold shadow-md">
            <Flame className="w-3.5 h-3.5 text-[#B99A60]" />
            <span>{story.theme}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-royal font-bold text-[#F0E6D4] tracking-tight max-w-4xl mx-auto leading-tight">
            {story.title}
          </h1>

          <p className="text-sm sm:text-base text-[#D8C8AD] max-w-2xl mx-auto leading-relaxed font-sans font-light">
            {story.summary}
          </p>

          {/* Quick Character Tags */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
            <span className="text-xs font-mono text-[#A89F91] mr-1">Tokoh Utama:</span>
            {story.characters.map(({ character, role }) => (
              <Link
                key={character.id}
                href={`/wayangpedia/${character.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono bg-[#16120E] hover:bg-[#251B12] text-[#ECC47E] hover:text-white px-3 py-1 rounded-lg border border-[#C59B53]/30 hover:border-[#ECC47E] transition-all shadow-sm"
              >
                <span>{character.name}</span>
                {role && (
                  <span className="text-[10px] text-[#A89F91] border-l border-[#C59B53]/25 pl-1.5">
                    {role}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Multi-Section Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 p-1.5 bg-[#14100C] rounded-2xl border border-[#C59B53]/30 max-w-3xl mx-auto shadow-xl">
          <button
            type="button"
            onClick={() => setActiveTab('read')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'read'
                ? 'bg-[#B99A60] text-[#100D0A] shadow-md scale-102'
                : 'text-[#D8C8AD] hover:text-white hover:bg-[#1D1711]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Naskah Lakon ({totalChapters} Babak)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('characters')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'characters'
                ? 'bg-[#B99A60] text-[#100D0A] shadow-md scale-102'
                : 'text-[#D8C8AD] hover:text-white hover:bg-[#1D1711]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kisah & Motif Tokoh</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('context')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'context'
                ? 'bg-[#B99A60] text-[#100D0A] shadow-md scale-102'
                : 'text-[#D8C8AD] hover:text-white hover:bg-[#1D1711]'
            }`}
          >
            <ScrollText className="w-4 h-4" />
            <span>Konteks & Makna</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-[#DFB873] to-[#ECC47E] text-[#100D0A] shadow-lg scale-102 font-bold animate-pulse'
                : 'text-[#ECC47E] hover:text-white hover:bg-[#1D1711]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#B99A60]" />
            <span>Kuis Seru Lakon</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: BACA NASKAH LAKON                                      */}
        {/* ============================================================== */}
        {activeTab === 'read' && (
          <div className="space-y-8">
            {/* Chapter Pill Buttons */}
            {totalChapters > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
                {story.chapters.map((ch, idx) => (
                  <button
                    key={ch.id || ch.order || idx}
                    type="button"
                    onClick={() => setCurrentChapterIndex(idx)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      idx === currentChapterIndex
                        ? 'bg-[#B99A60] text-[#100D0A] font-bold shadow-xl scale-102'
                        : 'bg-[#18130E] text-[#D8C8AD] border border-[#C59B53]/25 hover:border-[#C59B53]/60'
                    }`}
                  >
                    Babak {ch.chapterNumber ?? ch.order ?? idx + 1}: {ch.title}
                  </button>
                ))}
              </div>
            )}

            {/* Active Chapter Intro Banner */}
            {activeChapter && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#14110E] border border-[#C59B53]/40 space-y-3 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#C59B53]/10 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between text-xs font-mono text-[#ECC47E] font-semibold">
                  <span>
                    BABAK {activeChapter.chapterNumber ?? activeChapter.order ?? currentChapterIndex + 1} DARI {totalChapters}
                  </span>
                  <span className="text-[#A89F91]">{activeChapter.subtitle || 'Adegan Pewayangan'}</span>
                </div>
                <h2 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0E6D4]">
                  {activeChapter.title}
                </h2>
                {activeChapter.summary && (
                  <p className="text-xs sm:text-sm text-[#D8C8AD] leading-relaxed font-sans font-light">
                    {activeChapter.summary}
                  </p>
                )}
              </div>
            )}

            {/* Vertical Storytelling Stream (Scenes): Archival Parchment Manuscript */}
            {activeChapter && (
              <div className="space-y-8">
                {activeChapter.scenes.map((scene, scIdx) => (
                  <article
                    key={scene.id || scIdx}
                    className="p-6 sm:p-10 rounded-3xl bg-[#FAF6EE] text-[#241E17] border border-[#D4AF37]/50 shadow-2xl space-y-6 relative overflow-hidden transition-all hover:border-[#D4AF37]"
                  >
                    {/* Scene Top Badge */}
                    <div className="flex items-center justify-between border-b border-[#E5DACB] pb-3">
                      <span className="text-[11px] font-mono font-semibold text-[#7C6B53] uppercase tracking-wider">
                        Adegan #{scene.sceneNumber ?? scene.order ?? scIdx + 1}
                      </span>
                      {scene.speakerName && (
                        <span className="text-xs font-serif font-bold text-[#422910] bg-[#EFE3CF] px-3.5 py-1 rounded-full border border-[#D5C2A4] shadow-xs">
                          {scene.speakerName}
                        </span>
                      )}
                    </div>

                    {/* Rich Literary Narration */}
                    <div className="relative">
                      <p className="text-base sm:text-lg lg:text-xl text-[#2A231B] leading-relaxed sm:leading-loose font-serif max-w-prose selection:bg-[#E2C799] selection:text-[#1F1710]">
                        {scene.narration}
                      </p>
                    </div>

                    {/* Cultural & Philosophical Context Note */}
                    {scene.culturalNote && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#F0E6D2] border border-[#D9C4A1] text-xs sm:text-sm text-[#4A3D2D] flex items-start gap-3.5 shadow-sm">
                        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#8A5A2B] mt-0.5 shrink-0" />
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] sm:text-xs uppercase font-bold text-[#8A5A2B] block tracking-wider">
                            Konteks Budaya & Makna Filosofis
                          </span>
                          <p className="leading-relaxed font-sans text-xs sm:text-sm">
                            {scene.culturalNote}
                          </p>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}

            {/* Chapter Navigation Footer */}
            <div className="mt-12 pt-8 border-t border-[#C59B53]/25 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentChapterIndex((idx) => Math.max(0, idx - 1))}
                disabled={currentChapterIndex === 0}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#C59B53]/40 text-xs sm:text-sm font-medium text-[#D8C8AD] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#18130E] hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#B99A60]" />
                <span>Babak Sebelumnya</span>
              </button>

              <span className="text-xs sm:text-sm font-mono text-[#ECC47E] font-semibold">
                Babak {currentChapterIndex + 1} / {totalChapters}
              </span>

              {currentChapterIndex < totalChapters - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentChapterIndex((idx) => idx + 1)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer"
                >
                  <span>Babak Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab('quiz')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#DFB873] via-[#ECC47E] to-[#C59B53] text-[#100D0A] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-2xl hover:scale-102 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Selesai Membaca • Ikuti Kuis Seru!</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: KISAH & MOTIF TOKOH DI LAKON INI                         */}
        {/* ============================================================== */}
        {activeTab === 'characters' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B99A60] font-semibold">
                SOROTAN DINAMIKA BATIN
              </span>
              <h2 className="text-2xl sm:text-4xl font-royal font-bold text-[#F0E6D4]">
                Kisah & Motif Tokoh di Balik Lakon
              </h2>
              <p className="text-xs sm:text-sm text-[#A89F91]">
                Setiap tindakan di atas panggung pakeliran lahir dari pergulatan jiwa yang mendalam. Pelajari motif rahasia para tokoh dalam lakon ini.
              </p>
            </div>

            {enrichment?.characterInsights && enrichment.characterInsights.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {enrichment.characterInsights.map((char) => (
                  <div
                    key={char.slug}
                    className="p-6 sm:p-8 rounded-3xl bg-[#14110E] border border-[#C59B53]/35 flex flex-col justify-between space-y-6 shadow-2xl hover:border-[#ECC47E] transition-all group"
                  >
                    <div>
                      {/* Character Card Header */}
                      <div className="flex items-start gap-4 border-b border-[#C59B53]/20 pb-5">
                        <div className="w-16 h-24 shrink-0 flex items-center justify-center rounded-xl bg-[#1C1611] border border-[#C59B53]/35 shadow-md group-hover:border-[#ECC47E] transition-colors">
                          {renderCharacterVector(char.slug)}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#ECC47E] bg-[#241B12] px-2.5 py-0.5 rounded-full border border-[#C59B53]/30 font-semibold inline-block">
                            {char.roleLabel}
                          </span>
                          <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#F0E6D4] group-hover:text-[#ECC47E] transition-colors">
                            {char.name}
                          </h3>
                          <p className="text-xs text-[#A89F91] font-editorial italic">
                            {char.title}
                          </p>
                        </div>
                      </div>

                      {/* Motivation & Conflict */}
                      <div className="mt-5 space-y-4">
                        <div className="p-3.5 rounded-xl bg-[#19130D] border border-[#C59B53]/20 space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#B99A60] font-bold block">
                            🎯 Motivasi Batin & Sikap Kunci
                          </span>
                          <p className="text-xs text-[#E2D5C3] leading-relaxed">
                            {char.motivation}
                          </p>
                        </div>

                        {/* Backstory in this lakon */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#B99A60] font-bold block">
                            📖 Kisah & Peran di Lakon Ini
                          </span>
                          <p className="text-xs sm:text-sm text-[#D8C8AD] leading-relaxed font-sans font-light">
                            {char.storyInLakon}
                          </p>
                        </div>

                        {/* Iconic Dialogue */}
                        {char.keyDialogue && (
                          <div className="p-3.5 rounded-xl bg-[#1A140F] border border-[#ECC47E]/30 space-y-1.5 shadow-sm">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#ECC47E] uppercase font-bold">
                              <Quote className="w-3 h-3 text-[#B99A60]" />
                              <span>Kutipan Ikonik</span>
                            </div>
                            <p className="text-xs sm:text-sm font-editorial italic text-[#F5EFE6] leading-relaxed">
                              {char.keyDialogue}
                            </p>
                          </div>
                        )}

                        {/* Piwulang */}
                        {char.piwulang && (
                          <div className="text-xs text-[#B9B0A3] flex items-start gap-2 pt-2 border-t border-[#C59B53]/15">
                            <GraduationCap className="w-4 h-4 text-[#ECC47E] shrink-0 mt-0.5" />
                            <p className="leading-relaxed">
                              <strong className="text-[#ECC47E] font-medium">Refleksi Hidup: </strong>
                              {char.piwulang}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Link to full Wayangpedia profile */}
                    <div className="pt-4 border-t border-[#C59B53]/20">
                      <Link
                        href={`/wayangpedia/${char.slug}`}
                        className="inline-flex items-center justify-between w-full p-2.5 rounded-xl bg-[#1D1610] hover:bg-[#2A1E13] text-xs font-mono text-[#ECC47E] hover:text-white border border-[#C59B53]/25 hover:border-[#ECC47E] transition-all"
                      >
                        <span>Jelajahi Profil Lengkap {char.name}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 rounded-2xl bg-[#14110E] border border-[#C59B53]/30">
                <Users className="w-8 h-8 text-[#B99A60] mx-auto mb-3" />
                <p className="text-sm text-[#A89F91]">
                  Data tokoh untuk lakon ini sedang dirangkum oleh dewan kurasi.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: KONTEKS SASTRA & MAKNA FILOSOFIS                        */}
        {/* ============================================================== */}
        {activeTab === 'context' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Literary Origin Card */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#14110E] border border-[#C59B53]/35 space-y-4 shadow-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E] bg-[#241B12] px-3.5 py-1 rounded-full border border-[#C59B53]/30">
                <ScrollText className="w-3.5 h-3.5 text-[#B99A60]" />
                <span>Asal-Usul Sastra & Naskah Kuno</span>
              </div>
              <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#F0E6D4]">
                Konteks Sejarah & Sumber Kakawin
              </h3>
              <p className="text-sm sm:text-base text-[#D8C8AD] leading-relaxed font-sans font-light">
                {enrichment?.historicalContext ||
                  'Lakon ini berakar dari wiracarita Mahabharata Jawa Purwa yang diadaptasi secara adiluhung oleh para empu dan pujangga keraton Nusantara dengan memasukkan kearifan lokal Kejawen.'}
              </p>
            </div>

            {/* Core Moral Pillar */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#19130D] border border-[#ECC47E]/30 space-y-3 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B99A60] font-bold block">
                🌱 Intisari Ajaran Luhur (Piwulang)
              </span>
              <p className="text-base sm:text-lg text-[#F5EFE6] font-editorial italic leading-relaxed">
                &ldquo;{enrichment?.moralCore}&rdquo;
              </p>
            </div>

            {/* Fun Facts Accordion/Pills */}
            {enrichment?.funFacts && enrichment.funFacts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ECC47E] font-semibold">
                  <Lightbulb className="w-4 h-4 text-[#B99A60]" />
                  <span>Fakta Unik & Rahasia di Balik Layar Pakeliran</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {enrichment.funFacts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#14110E] border border-[#C59B53]/25 space-y-2 shadow-md hover:border-[#ECC47E]/60 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#241B12] text-[#ECC47E] text-xs font-mono font-bold flex items-center justify-center border border-[#C59B53]/30">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-[#D8C8AD] leading-relaxed">
                        {fact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: KUIS SERU & ASAH KEARIFAN (HAVE FUN QUIZ)                */}
        {/* ============================================================== */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto space-y-8">
            {!isQuizCompleted ? (
              <div className="p-6 sm:p-10 rounded-3xl bg-[#14110E] border border-[#C59B53]/45 shadow-2xl space-y-6 relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#C59B53]/15 to-transparent pointer-events-none" />

                {/* Quiz Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C59B53]/20 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B99A60] font-bold block">
                      KUIS INTERAKTIF LAKON
                    </span>
                    <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#F0E6D4]">
                      {quiz.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#ECC47E] bg-[#241B12] px-3 py-1 rounded-full border border-[#C59B53]/30">
                    <Sparkles className="w-3.5 h-3.5 text-[#B99A60]" />
                    <span>
                      Pertanyaan {quizQuestionIndex + 1} / {quiz.questions.length}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#1F1711] h-2 rounded-full overflow-hidden border border-[#C59B53]/20">
                  <div
                    className="bg-gradient-to-r from-[#DFB873] to-[#ECC47E] h-full transition-all duration-300"
                    style={{
                      width: `${((quizQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Question Text */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-[#ECC47E] uppercase font-bold tracking-wider">
                    Soal #{quizQuestionIndex + 1}
                  </span>
                  <p className="text-base sm:text-lg text-[#F5EFE6] font-medium leading-relaxed font-sans">
                    {quiz.questions[quizQuestionIndex].question}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {quiz.questions[quizQuestionIndex].options.map((option, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === quiz.questions[quizQuestionIndex].correctIndex;

                    let optionStyle =
                      'bg-[#19140F] hover:bg-[#251B12] text-[#D8C8AD] border-[#C59B53]/25 hover:border-[#ECC47E]';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        optionStyle =
                          'bg-[#142E1B] text-[#D4F5DC] border-[#22C55E] font-medium shadow-md';
                      } else if (isSelected && !isCorrect) {
                        optionStyle =
                          'bg-[#341617] text-[#FCD5D7] border-[#EF4444] font-medium';
                      } else {
                        optionStyle = 'bg-[#19140F] text-[#786D5E] border-transparent opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectQuizOption(optIdx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer text-xs sm:text-sm ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-[#241A12] text-[#ECC47E] text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-[#C59B53]/30">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{option}</span>
                        </div>

                        {isAnswerSubmitted && isCorrect && (
                          <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <X className="w-5 h-5 text-[#EF4444] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box (Revealed after answer) */}
                {isAnswerSubmitted && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#1A140F] border border-[#C59B53]/35 space-y-2 shadow-inner animate-fade-in">
                    <div className="flex items-center gap-2">
                      {selectedOption === quiz.questions[quizQuestionIndex].correctIndex ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#22C55E] font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Jawaban Kamu Tepat!</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F59E0B] font-bold">
                          <HelpCircle className="w-4 h-4" />
                          <span>Kurang Tepat, Jangan Patah Semangat!</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#E2D5C3] leading-relaxed font-sans">
                      {quiz.questions[quizQuestionIndex].funExplanation}
                    </p>
                  </div>
                )}

                {/* Next Question Button */}
                {isAnswerSubmitted && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuizQuestion}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer"
                    >
                      <span>
                        {quizQuestionIndex < quiz.questions.length - 1
                          ? 'Pertanyaan Selanjutnya'
                          : 'Lihat Hasil Akhir Kuis!'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Completion Scoreboard */
              <div className="p-8 sm:p-12 rounded-3xl bg-[#14110E] border border-[#C59B53]/50 text-center space-y-6 shadow-2xl relative overflow-hidden">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-[#241A12] border border-[#ECC47E] flex items-center justify-center shadow-xl animate-bounce">
                  <Trophy className="w-10 h-10 text-[#ECC47E]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B99A60] font-bold block">
                    GELAR KEHORMATAN DIANUGERAHKAN
                  </span>
                  <h3 className="font-royal text-2xl sm:text-4xl font-bold text-[#F0E6D4]">
                    {quiz.badgeTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A89F91]">
                    Selamat! Kamu telah menyelesaikan kuis interaktif dengan penuh kearifan.
                  </p>
                </div>

                {/* Score Counter */}
                <div className="inline-flex items-center gap-3 bg-[#1B140D] px-6 py-3 rounded-2xl border border-[#C59B53]/35 shadow-inner">
                  <span className="text-xs font-mono text-[#D8C8AD]">Skor Akhir:</span>
                  <span className="text-2xl sm:text-3xl font-royal font-bold text-[#ECC47E]">
                    {score} / {quiz.questions.length}
                  </span>
                  <span className="text-xs font-mono text-[#A89F91]">
                    ({Math.round((score / quiz.questions.length) * 100)}%)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#D8C8AD] max-w-md mx-auto leading-relaxed">
                  {score === quiz.questions.length
                    ? 'Luar biasa sempurna! Pemahamanmu terhadap kedalaman filosofi tokoh dan lakon ini setara dengan para resi pewayangan.'
                    : 'Permainan yang menyenangkan! Teruslah membaca khazanah lakon wayang untuk memperkaya wawasan budaya dan batin.'}
                </p>

                {/* Actions */}
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRestartQuiz}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#C59B53]/40 hover:bg-[#1C150F] text-xs font-semibold text-[#D8C8AD] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-[#B99A60]" />
                    <span>Ulangi Kuis</span>
                  </button>

                  <Link
                    href="/#lakon"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B99A60] hover:bg-[#C9A96E] text-[#100D0A] text-xs font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Jelajahi Lakon Lainnya</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LakonViewerClient;
