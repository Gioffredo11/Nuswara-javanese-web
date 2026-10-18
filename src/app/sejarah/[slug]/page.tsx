import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@/components/common/Link';
import {
  sejarahArticles,
  getSejarahArticleBySlug,
} from '@/data/sejarahArticles';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Compass,
  Sparkles,
  Share2,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar';
import { ArticleShareBar } from '@/components/ui/ArticleShareBar';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return sejarahArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getSejarahArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Sejarah Tidak Ditemukan • NUSWARA',
    };
  }

  return {
    title: `${article.title} • Kilas Sejarah NUSWARA`,
    description: article.shortSummary,
    openGraph: {
      title: `${article.title} • NUSWARA`,
      description: article.shortSummary,
      images: [
        {
          url: article.heroImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function SejarahArticleDetailPage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = getSejarahArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const currentIndex = sejarahArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? sejarahArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < sejarahArticles.length - 1
      ? sejarahArticles[currentIndex + 1]
      : null;

  return (
    <article className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-24 selection:bg-[#C59B53]/30 selection:text-[#ECC47E]">
      <ReadingProgressBar />

      {/* Top Header / Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <Link
            href="/#sejarah"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C59B53] hover:text-[#ECC47E] transition-colors py-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Kilas Sejarah</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A89F91]">
            <Clock className="w-3.5 h-3.5 text-[#C59B53]" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Era Tag & Headline */}
        <ScrollReveal direction="up" distance={30}>
          <header className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18130E] border border-[#C59B53]/40 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-[#C59B53]" />
              <span>
                {article.eraNumber}. {article.eraSubheading} • {article.eraPeriod}
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F5EFE6] leading-[1.15] tracking-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-xl text-[#D8C8AD] leading-relaxed font-sans pt-2">
              {article.leadParagraph}
            </p>
          </header>
        </ScrollReveal>

        {/* Hero Archival Image */}
        <ScrollReveal direction="up" distance={35} delay={150}>
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-[#C59B53]/40 shadow-2xl bg-[#14110E]">
              <Image
                src={article.heroImage}
                alt={article.heroImageAlt}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <p className="text-xs font-editorial italic text-[#A89F91] text-center sm:text-left px-2 leading-relaxed">
              {article.heroImageCaption}
            </p>
          </div>
        </ScrollReveal>

        {/* Article Body Content */}
        <div className="space-y-10 pt-4 text-[#E6DCce] font-sans">
          {article.sections.map((section, idx) => (
            <ScrollReveal key={idx} direction="up" distance={30} delay={100}>
              <section className="space-y-4">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6] tracking-tight border-b border-[#C59B53]/20 pb-2">
                  {section.title}
                </h2>

                <div className="space-y-4 leading-relaxed text-sm sm:text-base text-[#D4C8B8]">
                  {section.content.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {section.highlightQuote && (
                  <div className="my-6 p-5 sm:p-6 rounded-r-2xl bg-[#14110E] border-l-4 border-[#C59B53] shadow-lg">
                    <blockquote className="font-editorial italic text-base sm:text-lg text-[#ECC47E] leading-relaxed">
                      &ldquo;{section.highlightQuote}&rdquo;
                    </blockquote>
                  </div>
                )}
              </section>
            </ScrollReveal>
          ))}
        </div>

        {/* Key Takeaways & Historical Figures Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#C59B53]/25">
          {/* Key Takeaways */}
          <ScrollReveal direction="up" distance={30} delay={100} className="h-full">
            <div className="p-6 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 space-y-3 shadow-xl h-full">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold">
                <Sparkles className="w-4 h-4 text-[#C59B53]" />
                <span>Intisari & Nilai Luhur</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D8C8AD]">
                {article.keyTakeaways.map((point, kIdx) => (
                  <li key={kIdx} className="flex items-start gap-2">
                    <span className="text-[#C59B53] mt-1 shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Historical Figures */}
          <ScrollReveal direction="up" distance={30} delay={250} className="h-full">
            <div className="p-6 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 space-y-3 shadow-xl h-full">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold">
                <BookOpen className="w-4 h-4 text-[#C59B53]" />
                <span>Tokoh Berpengaruh</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D8C8AD]">
                {article.historicalFigures.map((fig, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59B53] shrink-0" />
                    <span>{fig}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Interactive Social & Messaging Share Bar */}
        <ScrollReveal direction="up" distance={20}>
          <ArticleShareBar
            title={`Sejarah Jawa Tengah: ${article.title} (${article.eraPeriod})`}
            summary={article.shortSummary}
            categoryLabel={`Era ${article.eraNumber} • ${article.eraPeriod}`}
          />
        </ScrollReveal>

        {/* Navigation to Prev/Next Eras */}
        <ScrollReveal direction="up" distance={25} delay={100}>
          <div className="pt-8 border-t border-[#C59B53]/30">
            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4">
              {prevArticle ? (
                <Link
                  href={`/sejarah/${prevArticle.slug}`}
                  className="flex-1 p-4 rounded-xl bg-[#14110E] border border-[#C59B53]/30 hover:border-[#C59B53] transition-all group flex flex-col justify-between"
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#C59B53] flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    <span>Era Sebelumnya</span>
                  </div>
                  <div className="font-editorial text-sm sm:text-base font-bold text-[#F5EFE6] mt-1 group-hover:text-[#ECC47E] transition-colors">
                    {prevArticle.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}

              {nextArticle ? (
                <Link
                  href={`/sejarah/${nextArticle.slug}`}
                  className="flex-1 p-4 rounded-xl bg-[#14110E] border border-[#C59B53]/30 hover:border-[#C59B53] transition-all group flex flex-col justify-between text-right"
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#C59B53] flex items-center justify-end gap-1">
                    <span>Era Selanjutnya</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="font-editorial text-sm sm:text-base font-bold text-[#F5EFE6] mt-1 group-hover:text-[#ECC47E] transition-colors">
                    {nextArticle.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}
            </div>

            {/* Related Explore CTA */}
            <div className="mt-8 text-center pt-6 border-t border-[#C59B53]/15">
              <Link
                href={article.relatedPath}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C59B53] hover:bg-[#ECC47E] text-[#0D0C0A] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-102"
              >
                <span>{article.relatedLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
