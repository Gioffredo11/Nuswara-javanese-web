import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@/components/common/Link';
import {
  tempatSakralArticles,
  getTempatSakralArticleBySlug,
  getAllTempatSakralSlugs,
} from '@/data/tempatSakralArticles';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Compass,
  MapPin,
  Sparkles,
  Mountain,
  ShieldCheck,
  Building,
  HelpCircle,
  Eye,
  CheckCircle2,
  Calendar,
  Share2,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface TempatSakralArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllTempatSakralSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: TempatSakralArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getTempatSakralArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Tempat Sakral Tidak Ditemukan • NUSWARA',
    };
  }

  return {
    title: `${article.name}: ${article.spiritualTheme} • Tempat Sakral Jawa Tengah NUSWARA`,
    description: article.shortSummary,
    openGraph: {
      title: `${article.name} (${article.spiritualTheme}) • NUSWARA`,
      description: article.shortSummary,
      images: [
        {
          url: article.heroImage,
          width: 1200,
          height: 630,
          alt: article.heroImageAlt,
        },
      ],
    },
  };
}

export default async function TempatSakralArticleDetailPage({
  params,
}: TempatSakralArticlePageProps) {
  const { slug } = await params;
  const article = getTempatSakralArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const currentIndex = tempatSakralArticles.findIndex((a) => a.slug === slug);
  const prevArticle =
    currentIndex > 0 ? tempatSakralArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < tempatSakralArticles.length - 1
      ? tempatSakralArticles[currentIndex + 1]
      : null;

  return (
    <article className="min-h-screen bg-[#0D0C0A] text-[#F5EFE6] pt-28 sm:pt-32 pb-24 selection:bg-[#C59B53]/30 selection:text-[#ECC47E]">
      {/* Top Header / Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <Link
            href="/tempat-sakral"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C59B53] hover:text-[#ECC47E] transition-colors py-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Daftar Situs Sakral</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A89F91]">
            <Clock className="w-3.5 h-3.5 text-[#C59B53]" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title, Category & Lead */}
        <ScrollReveal direction="up" distance={30}>
          <header className="space-y-5 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-[#18130E] border border-[#C59B53]/40 text-[#ECC47E] text-xs font-mono tracking-widest uppercase">
                {article.categoryLabel}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14110E] border border-[#C59B53]/25 text-[#D8C8AD] text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#C59B53]" />
                <span>
                  {article.city} • {article.region}
                </span>
              </span>
              {article.locationDetails.elevation && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#14110E] border border-[#C59B53]/25 text-[#ECC47E] text-xs font-mono">
                  <Mountain className="w-3.5 h-3.5" />
                  <span>{article.locationDetails.elevation}</span>
                </span>
              )}
            </div>

            <div>
              <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE6] leading-tight">
                {article.name}
              </h1>
              {article.javaneseName && (
                <p className="font-editorial italic text-base sm:text-lg text-[#ECC47E] mt-1.5">
                  {article.javaneseName}
                </p>
              )}
            </div>

            {/* Spiritual Theme Banner */}
            <div className="p-4 rounded-xl bg-[#16120D] border-l-4 border-[#C59B53] shadow-md">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ECC47E] block mb-1">
                TEMA SPIRITUAL & MAKNA RUANG
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#F5EFE6] leading-snug">
                &ldquo;{article.spiritualTheme}&rdquo;
              </p>
            </div>
          </header>
        </ScrollReveal>

        {/* Hero Image */}
        <ScrollReveal direction="up" distance={30} delay={100}>
          <div className="rounded-2xl overflow-hidden border border-[#C59B53]/40 shadow-2xl bg-[#14110E]">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={article.heroImage}
                alt={article.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            <div className="p-4 sm:p-5 bg-[#14110E] border-t border-[#C59B53]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#A89F91]">
              <p className="font-serif italic text-[#D8C8AD]">
                {article.heroImageCaption}
              </p>
              <span className="font-mono text-[10px] text-[#ECC47E] shrink-0 uppercase tracking-widest">
                Dokumentasi Budaya NUSWARA
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Highlights Pills Grid */}
        <ScrollReveal direction="up" distance={25} delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {article.highlights.map((hl, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#14110E] border border-[#C59B53]/30 text-center flex flex-col items-center justify-center gap-1"
              >
                <Sparkles className="w-4 h-4 text-[#ECC47E]" />
                <span className="text-xs font-mono text-[#F5EFE6] font-medium leading-tight">
                  {hl}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Lead Paragraph */}
        <ScrollReveal direction="up" distance={25}>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 shadow-xl">
            <p className="font-serif text-base sm:text-lg text-[#F5EFE6] leading-relaxed italic">
              {article.leadParagraph}
            </p>
          </div>
        </ScrollReveal>

        {/* History and Spiritual Narratives */}
        <div className="space-y-8">
          {article.spiritualAndHistoricalNarrative.map((narrative, idx) => (
            <ScrollReveal key={idx} direction="up" distance={30} delay={idx * 50}>
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#18130E] border border-[#C59B53]/50 text-[#ECC47E] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
                    {narrative.title}
                  </h2>
                </div>
                <div className="space-y-3.5 pl-11 text-sm sm:text-base text-[#D8C8AD] leading-relaxed font-sans">
                  {narrative.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        {/* Philosophical Meaning Card */}
        <ScrollReveal direction="up" distance={30}>
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1C160F] to-[#120F0C] border border-[#C59B53]/40 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <Compass className="w-6 h-6 text-[#ECC47E]" />
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
                {article.philosophicalMeaning.title}
              </h2>
            </div>

            <blockquote className="p-4 rounded-xl bg-[#0D0C0A]/70 border-l-4 border-[#ECC47E] font-serif italic text-[#ECC47E] text-base sm:text-lg leading-relaxed">
              &ldquo;{article.philosophicalMeaning.quote}&rdquo;
            </blockquote>

            <div className="space-y-3 text-sm text-[#D8C8AD] leading-relaxed">
              {article.philosophicalMeaning.content.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C59B53] mt-2 shrink-0" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Sacred Architecture & Relics */}
        <ScrollReveal direction="up" distance={30}>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-[#ECC47E]" />
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
                Simbolisme Arsitektur & Benda Sakral
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-[#1C1712] border border-[#C59B53]/25 text-xs sm:text-sm text-[#ECC47E] font-mono">
              <strong>Simbolisme Utama:</strong> {article.sacredArchitecture.symbolism}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold">
                  Keunikan Ciri Arsitektur
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#D8C8AD]">
                  {article.sacredArchitecture.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C59B53] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold">
                  Pusaka / Artefak Keramat
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#D8C8AD]">
                  {article.sacredArchitecture.sacredRelicsOrArtifacts.map((relic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#ECC47E] mt-0.5 shrink-0" />
                      <span>{relic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Spiritual Etiquette / Laku Ziarah */}
        <ScrollReveal direction="up" distance={30}>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#16120D] border border-[#C59B53]/35 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#ECC47E]" />
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5EFE6]">
                Etika Laku Spiritual & Ketertiban Ziarah
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0D0C0A] border border-[#C59B53]/20 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC47E] block">
                  SIKAP BATIN (MINDSET)
                </span>
                <p className="text-xs sm:text-sm text-[#D8C8AD] leading-relaxed">
                  {article.spiritualEtiquette.mindset}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0C0A] border border-[#C59B53]/20 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC47E] block">
                  BUSANA PENGHORMATAN (DRESS CODE)
                </span>
                <p className="text-xs sm:text-sm text-[#D8C8AD] leading-relaxed">
                  {article.spiritualEtiquette.dressCode}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold mb-2.5">
                Pantangan & Aturan Kawasan Sakral
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#D8C8AD]">
                {article.spiritualEtiquette.prohibitionsAndRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59B53] mt-2 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Location & Historical Era Details */}
        <ScrollReveal direction="up" distance={30}>
          <div className="p-6 rounded-2xl bg-[#14110E] border border-[#C59B53]/30 shadow-xl space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C59B53]" />
              Informasi Situs & Waktu Berkunjung Terbaik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#D8C8AD]">
              <div>
                <span className="text-[#A89F91] block">Alamat / Lokasi:</span>
                <span className="text-[#F5EFE6] font-sans font-medium">{article.locationDetails.address}</span>
              </div>
              <div>
                <span className="text-[#A89F91] block">Era Pembangunan:</span>
                <span className="text-[#ECC47E]">{article.locationDetails.historicalEra}</span>
              </div>
              <div>
                <span className="text-[#A89F91] block">Pembangun / Dinasti:</span>
                <span className="text-[#F5EFE6]">{article.locationDetails.builtBy}</span>
              </div>
              <div>
                <span className="text-[#A89F91] block">Waktu Terbaik untuk Kontemplasi:</span>
                <span className="text-[#ECC47E] font-sans">{article.locationDetails.bestTimeToVisit}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Key Takeaways */}
        <ScrollReveal direction="up" distance={25}>
          <div className="p-6 rounded-2xl bg-[#18130E] border border-[#C59B53]/40 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#ECC47E] font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ECC47E]" />
              Intisari Warisan Batin
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#D8C8AD]">
              {article.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#ECC47E] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Prev / Next Article Navigation */}
        <div className="pt-8 border-t border-[#C59B53]/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {prevArticle ? (
            <Link
              href={`/tempat-sakral/${prevArticle.slug}`}
              className="p-4 rounded-xl bg-[#14110E] border border-[#C59B53]/25 hover:border-[#ECC47E] transition-all group flex-1"
            >
              <div className="text-[10px] font-mono text-[#A89F91] flex items-center gap-1 uppercase">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                <span>Situs Sebelumnya</span>
              </div>
              <div className="font-royal text-base font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors mt-1">
                {prevArticle.name}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextArticle ? (
            <Link
              href={`/tempat-sakral/${nextArticle.slug}`}
              className="p-4 rounded-xl bg-[#14110E] border border-[#C59B53]/25 hover:border-[#ECC47E] transition-all group flex-1 text-right"
            >
              <div className="text-[10px] font-mono text-[#A89F91] flex items-center justify-end gap-1 uppercase">
                <span>Situs Berikutnya</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-royal text-base font-bold text-[#F5EFE6] group-hover:text-[#ECC47E] transition-colors mt-1">
                {nextArticle.name}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </article>
  );
}
